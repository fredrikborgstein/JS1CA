import router from "../main.js";

export default function AllProductsPage() {
    return {
        render: () => `
            <div>
      <!-- TITLE SECTION -->
      <section id="title-section">
        <h1>All Products</h1>
      </section>
      <!-- FILTER SECTION -->
      <section id="filter-section">
        <h2>Filter</h2>
        <div id="filters">
          <style>
            #search {
              padding: 8px;
            }
            #clear-filter {
              padding: 8px;
            }
          </style>
          <label for="search">Search:</label>
          <input id="search" name="search" type="search" />
          <label for="genre">Genre:</label>
          <select name="genre" id="genre">
            <option value="Genre" disabled selected>Genre</option>
          </select>
          <label for="sortby">Sort By:</label>
          <select name="sortby" id="sortby">
            <option value="Sortby" disabled selected>Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
            <option value="release">Release Date</option>
          </select>
          <a class="btn" href="#" id="clear-filter">Clear Filter</a>
        </div>
      </section>
      <section id="product-grid">
      </section>
    </div>
        `,
        onMount: () => {
            const baseApiUrl = "https://v2.api.noroff.dev/";
            const genreFilter = document.getElementById("genre");
            const sortBy = document.getElementById("sortby");
            const searchBox = document.getElementById("search");
            const productGrid = document.getElementById("product-grid");
            const searchInput = document.getElementById("search");
            const clearFilterBtn = document.getElementById("clear-filter");
            let products = [];
            let filteredProducts = [];
            const cacheKey = "productsCache";
            const cacheExpiration = 60 * 60 * 1000;

            genreFilter.addEventListener("change", (e) => {
                e.preventDefault();
                const selectedGenre = e.target.value;

                if (selectedGenre === "All") {
                    filteredProducts = [...this.products];
                } else {
                    filteredProducts = this.products.filter(
                      product => product.genre === selectedGenre
                    );
                }

                processProducts(filteredProducts);
            });

            sortBy.addEventListener("change", (e) => {
                e.preventDefault();
                sortProducts(e.target.value, filteredProducts);
            });

            searchInput.addEventListener("input", (e) => {
                const query = e.target.value.toLowerCase();
                showDropdownSuggestions(query, this.filteredProducts);
            });

            clearFilterBtn.addEventListener("click", (e) => {
                e.preventDefault();
                clearFilters();
            });

            async function getAllProducts() {
                try {
                    const cachedData = localStorage.getItem(cacheKey);
                    const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

                    if (cachedData && cachedTimestamp) {
                        const now = Date.now();
                        if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
                            const cachedObject = JSON.parse(cachedData);
                            let products = cachedObject.data;
                            if (Array.isArray(products)) {
                                products = products;
                                filteredProducts = [...products];
                                sortProducts("name", filteredProducts);
                                populateGenreDropDown(products);
                                return;
                            }
                        }
                    }

                    const response = await fetch(`${baseApiUrl}gamehub`);
                    if (!response.ok) throw new Error("Failed to fetch products");
                    const data = await response.json();

                    let products = data.data;
                    if (Array.isArray(products)) {
                        localStorage.setItem(cacheKey, JSON.stringify(data));
                        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
                        products = products;
                        filteredProducts = [...products];
                        sortProducts("name", filteredProducts);
                        populateGenreDropDown(products);
                    } else {
                        throw new Error("Invalid product data");
                    }
                } catch (error) {
                }
            }

            function processProducts(products) {
                productGrid.innerHTML = "";
                products.forEach((product) => {
                    const card = createProductCard(product);
                    productGrid.appendChild(card);
                });
                addButtonEventListeners();
            }

            function createProductCard(product) {
                const card = document.createElement("div");
                card.classList.add("card");

                const titleContainer = document.createElement("div");
                titleContainer.classList.add("card-title");
                const cardTitle = document.createElement("h3");
                cardTitle.innerText = product.title;
                titleContainer.appendChild(cardTitle);
                card.appendChild(titleContainer);

                const cardImageContainer = document.createElement("div");
                cardImageContainer.classList.add("card-image");
                const cardImage = document.createElement("img");
                cardImage.src = product.image.url;
                cardImage.alt = product.image.alt;
                cardImageContainer.appendChild(cardImage);
                card.appendChild(cardImageContainer);

                const cardInfoContainer = document.createElement("div");
                cardInfoContainer.classList.add("card-info");
                const cardPrice = document.createElement("p");
                cardPrice.innerText = `${product.price} $`;
                cardInfoContainer.appendChild(cardPrice);
                card.appendChild(cardInfoContainer);

                const cardButtonContainer = document.createElement("div");
                cardButtonContainer.classList.add("card-button");
                const cardButton = document.createElement("a");
                cardButton.classList.add("card-text");
                cardButton.href = "#";
                cardButton.setAttribute("data-id", product.id);
                cardButton.innerText = "Add to cart";
                cardButtonContainer.appendChild(cardButton);
                card.appendChild(cardButtonContainer);

                return card;
            }

            function populateGenreDropDown(products) {
                genreFilter.innerHTML = "";
                const defaultOption = createOption("Genre", "Genre", true, true);
                genreFilter.appendChild(defaultOption);

                const allOption = createOption("All", "All", false, true);
                genreFilter.appendChild(allOption);

                const genres = [...new Set(products.map((product) => product.genre))];
                genres.forEach((genre) => {
                    const option = createOption(genre, genre);
                    genreFilter.appendChild(option);
                });
            }

            function createOption(value, text, disabled = false, selected = false) {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = text;
                if (disabled) option.setAttribute("disabled", true);
                if (selected) option.setAttribute("selected", true);
                return option;
            }

            function sortProducts(sortBy, products) {
                const sortedProducts = [...products];
                switch (sortBy) {
                    case "price":
                        sortedProducts.sort((a, b) => a.price - b.price);
                        break;
                    case "popularity":
                        sortedProducts.sort((a, b) => b.favorite - a.favorite);
                        break;
                    case "release":
                        sortedProducts.sort((a, b) => parseInt(b.released) - parseInt(a.released));
                        break;
                    case "name":
                    default:
                        sortedProducts.sort((a, b) => {
                            const nameA = a.title.trim().toLowerCase();
                            const nameB = b.title.trim().toLowerCase();
                            return nameA.localeCompare(nameB);
                        });
                        break;
                }

                processProducts(sortedProducts);
            }

            function addButtonEventListeners() {
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

            function showDropdownSuggestions(query, products) {
                let dropdown = document.getElementById("search-dropdown");
                if (!dropdown) {
                    dropdown = document.createElement("div");
                    dropdown.id = "search-dropdown";
                    dropdown.style.position = "absolute";
                    dropdown.style.backgroundColor = "#fff";
                    dropdown.style.border = "1px solid #ccc";
                    dropdown.style.width = "200px";
                    document.getElementById("search").parentElement.appendChild(dropdown);
                }
                dropdown.innerHTML = "";

                if (!query.trim()) {
                    dropdown.style.display = "none";
                    return;
                }

                const matches = products.filter(product =>
                  product.title.toLowerCase().includes(query)
                );

                matches.forEach(product => {
                    const suggestion = document.createElement("div");
                    suggestion.textContent = product.title;
                    suggestion.style.padding = "8px";
                    suggestion.style.cursor = "pointer";

                    suggestion.addEventListener("click", () => {
                        router.navigate(`/productpage/${product.id}`);
                    });

                    dropdown.appendChild(suggestion);
                });

                dropdown.style.display = matches.length > 0 ? "block" : "none";
            }

            function clearFilters() {
                genreFilter.value = "All";
                sortBy.value = "name";
                searchBox.value = "";

                filteredProducts = [...products];

                const dropdown = document.getElementById("search-dropdown");
                if (dropdown) dropdown.innerHTML = "";

                processProducts(products);
            }

            void getAllProducts();
        },
        onDismount: () => {

        },
    };
};