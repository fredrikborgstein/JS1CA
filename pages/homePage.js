import router from '../main.js';

const HomePage = () => {
    return {
        render: () => `
            <div>
              <!-- HERO SECTION -->
              <section id="hero-section" class="homepage-section">
                <div id="hero-section-title">
                  <h1>50 % DISCOUNT FOR NEW MEMBERS!</h1>
                </div>
                <div id="hero-section-button">
                  <a href="/register" class="btn hero-section-button">Register</a>
                </div>
              </section>
              <!-- PROMOTIONS SECTION -->
              <section id="promotion-section" class="homepage-section">
                <!-- BESTSELLERS -->
                <div id="bestsellers" class="promotion-card-section">
                  <div class="card-section-header">
                    <h2>Bestsellers</h2>
                  </div>
                  <div class="card-section-body" id="bestsellers-cards-container">
                    <!-- This section is populated by javascript -->
                  </div>
                </div>
                <!-- NEW RELEASES -->
                <div id="new-releases">
                  <div class="card-section-header">
                    <h2>New Releases</h2>
                  </div>
                  <div class="card-section-body" id="new-releases-cards-container">
                    <!-- This section is populated by javascript -->
                  </div>
                </div>
              </section>
              <div id="promotion-section-button">
                <a href="/allProducts" class="btn promotion-section-btn">
                  Browse All Games
                </a>
              </div>
              <!-- MEMBERS SECTION -->
              <section id="members-info-section">
                <div id="members-section-title">
                  <h2>Become a member - enjoy the benefits!</h2>
                </div>
                <div class="members-section-body">
                  <div class="members-section-card">
                    <div class="members-section-card-title">
                      <h3>Free Shipping</h3>
                    </div>
                    <div class="members-section-card-image">
                      <i class="fa-solid fa-truck member-icon"></i>
                    </div>
                    <div class="members-section-card-info">
                      <p>
                        Enjoy the convenience of Free Shipping on all your orders as a
                        valued member! No matter the size of your purchase, we'll
                        deliver your items directly to your doorstep without any extra
                        shipping costs. Shop with ease and save more with every order!
                      </p>
                    </div>
                  </div>
                  <div class="members-section-card">
                    <div class="members-section-card-title">
                      <h3>Loyalty Bonus</h3>
                    </div>
                    <div class="members-section-card-image">
                      <i class="fa-solid member-icon fa-credit-card"></i>
                    </div>
                    <div class="members-section-card-info">
                      <p>
                        Unlock exclusive rewards with our Loyalty Bonus! As a member,
                        you'll earn points with every purchase, which can be redeemed
                        for discounts, special offers, or free products. The more you
                        shop, the more you save!
                      </p>
                    </div>
                  </div>
                  <div class="members-section-card">
                    <div class="members-section-card-title">
                      <h3>Early Access</h3>
                    </div>
                    <div class="members-section-card-image">
                      <i class="fa-solid member-icon fa-circle-check"></i>
                    </div>
                    <div class="members-section-card-info">
                      <p>
                        Be the first to shop with our Early Access benefit! As a member,
                        you'll get exclusive access to new products, special sales, and
                        limited-time offers before anyone else. Stay ahead of the crowd
                        and never miss out on the latest releases!
                      </p>
                    </div>
                  </div>
                </div>
                <div id="members-section-button">
                  <a href="/register" class="members-section-button-text btn">
                    Become a member
                  </a>
                </div>
              </section>
            </div>`,
        onMount: () => {
            const apiUrl = "https://v2.api.noroff.dev/";
            const newReleasesContainer = document.getElementById(
              "new-releases-cards-container"
            );
            const popularProductsContainer = document.getElementById(
              "bestsellers-cards-container"
            );

            async function getAllProducts() {
                const cacheKey = "productsCache";
                const cacheExpiration = 60 * 60 * 1000;

                const cachedData = localStorage.getItem(cacheKey);
                const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

                if (cachedData && cachedTimestamp) {
                    const now = Date.now();
                    if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
                        const cachedObject = JSON.parse(cachedData);
                        const products = cachedObject.data;
                        if (!Array.isArray(products)) {
                            return;
                        }
                        const bestSellers = products.slice(0, 3);
                        const newReleases = products.slice(3, 6);

                        processProducts({ bestSellers, newReleases });
                        return;
                    }
                }

                const response = await fetch(`${apiUrl}gamehub`);
                const data = await response.json();

                const products = data.data;
                if (!Array.isArray(products)) {
                    return;
                }

                const bestSellers = products.slice(0, 3);
                const newReleases = products.slice(3, 6);

                localStorage.setItem(cacheKey, JSON.stringify(data));
                localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
                processProducts({ bestSellers, newReleases });
            }


            function processProducts(products) {
                const newReleases = products.newReleases;
                const bestSellers = products.bestSellers;
                createHomePageProductCards(newReleases, "releases");
                createHomePageProductCards(bestSellers, "bestsellers");

                const productBtns = document.getElementsByClassName("card-text");
                for (const btn of productBtns) {
                    btn.addEventListener("click", (e) => {
                        e.preventDefault();
                        const productId = e.target.dataset.id;

                        if (productId) {
                            // Use the Router instance to navigate
                            router.navigate(`/productpage/${productId}`);
                        }
                    });
                }
            }

            function createHomePageProductCards (products, element)  {
                products.forEach((product) => {
                    const newReleaseCard = document.createElement("div");
                    newReleaseCard.classList.add("card");
                    newReleaseCard.id = product.id;
                    const tags = product.tags;

                    const newReleaseCardTitleContainer = document.createElement("div");
                    const newReleaseCardTitle = document.createElement("h3");
                    newReleaseCardTitle.innerText = product.title;
                    newReleaseCardTitleContainer.appendChild(newReleaseCardTitle);
                    newReleaseCard.appendChild(newReleaseCardTitleContainer);

                    const newReleaseImageContainer = document.createElement("div");
                    newReleaseImageContainer.classList.add("card-image");
                    const newReleaseCardImage = document.createElement("img");
                    newReleaseCardImage.src = product.image.url;
                    newReleaseCardImage.alt = product.image.alt;
                    newReleaseImageContainer.appendChild(newReleaseCardImage);
                    newReleaseCard.appendChild(newReleaseImageContainer);

                    const newReleaseCardDescriptionContainer = document.createElement("div");
                    newReleaseCardDescriptionContainer.classList.add("card-info");

                    const newReleaseCardTags = document.createElement("p");
                    tags.forEach((tag) => {
                        const newReleaseCardTag = document.createElement("span");
                        newReleaseCardTag.classList.add("card-tag");
                        newReleaseCardTag.style.fontSize = "0.8rem";
                        newReleaseCardTag.innerText = tag + " ";
                        newReleaseCardTags.appendChild(newReleaseCardTag);
                    });
                    newReleaseCardDescriptionContainer.appendChild(newReleaseCardTags);

                    const newReleaseCardDescriptionPrice = document.createElement("p");
                    newReleaseCardDescriptionPrice.innerText = product.price;
                    newReleaseCardDescriptionContainer.appendChild(
                      newReleaseCardDescriptionPrice
                    );
                    newReleaseCard.appendChild(newReleaseCardDescriptionContainer);

                    const newReleaseCardButtonContainer = document.createElement("div");
                    newReleaseCardButtonContainer.classList.add("card-button");
                    const newReleaseCardButton = document.createElement("a");
                    newReleaseCardButton.classList.add("card-text");
                    newReleaseCardButton.innerText = "View Product";
                    newReleaseCardButton.href = `#`;
                    newReleaseCardButton.setAttribute("data-id", product.id);
                    newReleaseCardButtonContainer.appendChild(newReleaseCardButton);
                    newReleaseCard.appendChild(newReleaseCardButtonContainer);

                    if (element === 'releases') {
                        newReleasesContainer.appendChild(newReleaseCard);
                    } else if (element === 'bestsellers') {
                        popularProductsContainer.appendChild(newReleaseCard);
                    }

                });
            }

            void getAllProducts();
        },
        onDismount: () => {
            // Actions to perform when the component is dismounted
        },
    };
};

export default HomePage;
