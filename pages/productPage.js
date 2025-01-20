import Toaster from "../components/toaster.js";

export default function ProductPage() {
    return {
        render: () => `
            <div>
      <!-- PRODUCT INFO SECTION -->
      <section id="product-info">
        <div id="image-section">
          <img id="product-image"
            src=""
            alt=""
          />
        </div>
        <div id="product-details">
          <div id="product-title"><h1 id="page-title"></h1></div>

          <div id="product-description">
            <p id="product-desc">

            </p>
          </div>
          <div id="product-purchase">
            <p id="product-price"></p>
            <a
              id="purchase-button"
              class="purchase-button"
              href="#"
            >
              Add to cart <i class="fa-solid fa-cart-shopping"></i>
            </a>
          </div>
        </div>
      </section>
      <!-- FEATURED SECTION -->
      <section id="featured">
        <div id="featured-heading">
          <h2>You may also like</h2>
        </div>
        <div id="featured-grid">
          <div class="card">
            <div class="card-title">
              <h3>Super Duper</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers2.webp"
                alt="The cover of the Playbox game Super Duper"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£12.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
          <div class="card">
            <div class="card-title">
              <h3>Forge Legend</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers10.webp"
                alt="The cover of the Playbox game Forge Legend"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£39.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
          <div class="card">
            <div class="card-title">
              <h3>Furious</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers4.webp"
                alt="The cover of the Playbox game Furious"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£29.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
          <div class="card">
            <div class="card-title">
              <h3>Boxer</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers8.webp"
                alt="The cover of the Playbox game Boxer"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£22.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
        </div>
      </section>
    </div>
        `,
        onMount: () => {
            const path = window.location.pathname;
            const segments = path.split('/');
            const productId = segments[segments.length - 1];
            const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";
            const cacheExpiration = 60 * 60 * 1000;
            const toaster = new Toaster();

            async function init() {
                try {
                    const product = await getProduct(productId);
                    if (product) {
                        generateProductPage(product);
                        await generateFeaturedSection(product.genre);
                    } else {
                        toaster.show("Product data could not be retrieved.", "error", 5000);
                    }
                } catch (error) {
                    toaster.show("An error occurred while loading the product page.", "error", 5000);
                }
            }

            async function getProduct(productId) {
                try {
                    const cacheKey = `product-${productId}`;
                    const cachedData = localStorage.getItem(cacheKey);
                    const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

                    if (cachedData && cachedTimestamp) {
                        const now = Date.now();
                        if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
                            return JSON.parse(cachedData);
                        }
                    }

                    const response = await fetch(`${baseAPIUrl}${productId}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
                    }

                    const data = await response.json();
                    if (data && data.data) {
                        localStorage.setItem(cacheKey, JSON.stringify(data.data));
                        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
                        return data.data;
                    } else {
                        throw new Error("Invalid product data structure.");
                    }
                } catch (error) {
                    toaster.show("Failed to load product details. Please try again later.", "error", 5000);
                    return null;
                }
            }

            async function generateFeaturedSection(currentGenre) {
                const featuredGrid = document.getElementById('featured-grid');

                if (!featuredGrid) return;
                featuredGrid.innerHTML = '';

                try {
                    const data = await fetchAllGames();
                    const games = data.data || [];
                    const relatedGames = games.filter(
                      (game) => game.genre === currentGenre && game.id !== productId
                    );

                    if (relatedGames.length === 0) {
                        const noGamesMessage = document.createElement('p');
                        noGamesMessage.innerText = "No similar games available.";
                        featuredGrid.appendChild(noGamesMessage);
                        return;
                    }

                    relatedGames.forEach((game) => {
                        const card = document.createElement('div');
                        card.className = 'card';

                        card.innerHTML = `
                <div class="card-title">
                    <h3>${game.title}</h3>
                </div>
                <div class="card-image">
                    <img src="${game.image.url}" alt="${game.image.alt || `The cover of the game ${game.title}`}" />
                </div>
                <div class="card-info">
                    <p>${game.genre}</p>
                    <p>${game.price} $</p>
                </div>
                <div class="card-button">
                    <a href="/productpage.html?id=${game.id}" class="card-text">View Details</a>
                </div>
            `;
                        featuredGrid.appendChild(card);
                    });
                } catch (error) {
                    toaster.show("Failed to load related games. Please try again later.", "error", 5000);
                }
            }

            async function fetchAllGames() {
                const cacheKey = "productsCache";
                const cacheTimestampKey = `${cacheKey}-timestamp`;
                const cacheExpiration = 60 * 60 * 1000;

                try {
                    const cachedData = localStorage.getItem(cacheKey);
                    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

                    if (cachedData && cachedTimestamp) {
                        const now = Date.now();
                        if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
                            return JSON.parse(cachedData);
                        }
                    }

                    const response = await fetch(`${baseAPIUrl}`);
                    if (!response.ok) throw new Error("Failed to fetch games");

                    const data = await response.json();
                    if (Array.isArray(data)) {
                        localStorage.setItem(cacheKey, JSON.stringify(data));
                        localStorage.setItem(cacheTimestampKey, Date.now().toString());
                        return data;
                    } else {
                        throw new Error("Invalid data format");
                    }
                } catch (error) {
                    toaster.show("Failed to load games. Please check your connection.", "error", 5000);
                    return [];
                }
            }

            function generateProductPage(product) {
                document.title = product.title || "Product Page";

                const productImage = document.getElementById('product-image');
                if (productImage && product.image) {
                    productImage.src = product.image.url || "";
                    productImage.alt = product.image.alt || "Product image";
                }

                const pageTitle = document.getElementById('page-title');
                if (pageTitle) pageTitle.innerText = product.title || "Untitled";

                const productDescription = document.getElementById('product-desc');
                if (productDescription) productDescription.innerText = product.description || "No description available.";

                const productPrice = document.getElementById('product-price');
                if (productPrice) {
                    if (product.onSale && product.discountedPrice) {
                        productPrice.innerText = `Sale Price: ${product.discountedPrice} $ (Original: ${product.price} $)`;
                    } else {
                        productPrice.innerText = `${product.price} $`;
                    }
                }

                const purchaseBtn = document.getElementById('purchase-button');
                if (purchaseBtn) purchaseBtn.setAttribute('data-id', productId);

                const productTags = document.getElementById('product-tags');
                if (productTags && product.tags) {
                    productTags.innerText = `Tags: ${product.tags.join(", ")}`;
                }
            }

            void init();
        },
        onDismount: () => {

        },
    };
};