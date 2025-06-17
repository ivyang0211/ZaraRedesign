document.addEventListener('DOMContentLoaded', () => {
    // Ensure ALL_PRODUCTS_DATA is available (from products_data.js)
    if (typeof ALL_PRODUCTS_DATA === 'undefined') {
        console.error('ALL_PRODUCTS_DATA not found. Make sure js/products_data.js is loaded before product.js');
        return;
    }

    // --- Header & Navbar Interactions (Copied for consistency) ---
    const searchIcon = document.getElementById('searchIcon');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchButton = document.getElementById('closeSearch');
    const favCount = document.getElementById('favCount');
    const bagCount = document.getElementById('bagCount');

    // Sync counts from localStorage
    function syncHeaderCounts() {
        let favorites = parseInt(localStorage.getItem('favorites') || '0');
        let bagItems = 0;
        let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
        bagItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        if (favCount) favCount.textContent = favorites;
        if (bagCount) bagCount.textContent = bagItems;
    }
    syncHeaderCounts();

    let favorites = 0;
    let bagItems = 0;

    searchIcon.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.querySelector('.search-input-overlay').focus();
    });

    closeSearchButton.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    const logInText = document.querySelector('.log-in-text');
    const profileIcon = document.querySelector('.profile-icon');
    if (logInText) {
        logInText.addEventListener('click', () => alert('Redirecting to Log In / Register page...'));
    }
    if (profileIcon) {
        profileIcon.addEventListener('click', () => alert('Redirecting to Log In / Register page...'));
    }

    const shoppingCartIcon = document.querySelector('.bag-icon');
    if (shoppingCartIcon) {
        shoppingCartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    const favoritesIcon = document.querySelector('.heart-icon');
    if (favoritesIcon) {
        favoritesIcon.addEventListener('click', () => alert(`You have ${favorites} items in your favorites.`));
    }

    // --- Product Listing Page Specific Interactions ---

    // Function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get current category from URL (e.g., ?cat=WOMAN)
    let currentCategory = getQueryParam('cat') || 'WOMAN'; // Default to 'WOMAN' if no category is specified
    const categoryTitleElement = document.getElementById('categoryTitle');
    if (categoryTitleElement) {
        categoryTitleElement.textContent = currentCategory.toUpperCase();
    }


    // Function to render products in the grid
    function renderProducts(category) {
        const productGridElement = document.getElementById('productListingGrid');
        if (!productGridElement) return;

        productGridElement.innerHTML = ''; // Clear existing products

        // Filter products by category
        let filteredProducts = ALL_PRODUCTS_DATA;
        if (category && category.toUpperCase() !== 'ALL') {
            filteredProducts = ALL_PRODUCTS_DATA.filter(product => product.category.toUpperCase() === category.toUpperCase());
        }

        // Render each product card
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-product-id', product.id);

            // Generate color swatches HTML
            const colorSwatchesHtml = product.colors.map(color => `
                <div class="swatch" data-color="${color.code}" style="background-color: ${color.code}; border-color: ${color.code === 'white' ? '#ccc' : color.code === 'black' ? '#000' : color.code};"></div>
            `).join('');

            card.innerHTML = `
                <a href="product_detail.html?id=${product.id}"> <img class="product-thumbnail" src="${product.image}" alt="${product.name}">
                </a>
                <div class="color-swatches">
                    ${colorSwatchesHtml}
                </div>
                <div class="product-info-line">
                    <p class="product-meta product-category">${product.category}</p>
                    <p class="product-meta product-size">${product.sizes[0]}</p>
                </div>
                <p class="product-meta product-name">${product.name}</p>
                <p class="product-meta product-price">Rp${product.price.toLocaleString('id-ID')}</p>
                <img class="product-card-heart" src="assets/heartIcon.svg" alt="Add to Favorites">
            `;

            productGridElement.appendChild(card);
        });

        // Re-attach event listeners for newly rendered product cards
        setupProductCardListeners(productGridElement);
    }

    // Function to set up listeners for product cards (re-usable)
    function setupProductCardListeners(container) {
        container.querySelectorAll('.product-card').forEach(card => {
            const heartIcon = card.querySelector('.product-card-heart');
            const colorSwatches = card.querySelectorAll('.swatch');
            const productLinkElement = card.querySelector('a');
            const productNameElement = card.querySelector('.product-name');

            // Toggle favorite status
            if (heartIcon) {
                heartIcon.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const isFavorited = heartIcon.classList.toggle('favorited');
                    let favorites = parseInt(localStorage.getItem('favorites') || '0');
                    if (isFavorited) {
                        favorites++;
                    } else {
                        favorites = Math.max(0, favorites - 1);
                    }
                    localStorage.setItem('favorites', favorites);
                    syncHeaderCounts();
                    alert(isFavorited ? 'Added to favorites!' : 'Removed from favorites!');
                });
            }

            // Highlight active color swatch
            colorSwatches.forEach(swatch => {
                swatch.addEventListener('click', (event) => {
                    event.stopPropagation();
                    colorSwatches.forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                });
            });

            // Add to Cart on product name click (simulate add to cart)
            if (productNameElement) {
                productNameElement.addEventListener('click', (event) => {
                    event.stopPropagation();
                    // Get product info from ALL_PRODUCTS_DATA if possible
                    const productId = card.getAttribute('data-product-id');
                    let product = null;
                    if (window.ALL_PRODUCTS_DATA && productId) {
                        product = window.ALL_PRODUCTS_DATA.find(p => p.id === productId);
                    }
                    // Fallback: get info from DOM
                    const name = product ? product.name : productNameElement.textContent.trim();
                    const color = card.querySelector('.swatch.active')?.dataset.color || (product?.colors?.[0]?.label || '');
                    const size = card.querySelector('.product-size')?.textContent || (product?.sizes?.[0] || '');
                    const price = product ? product.price : parseInt(card.querySelector('.product-price')?.textContent.replace(/[^\d]/g, '')) || 0;
                    const img = product ? product.image : card.querySelector('.product-thumbnail')?.src || '';
                    const qty = 1;

                    // Add to localStorage cart_items (array of objects)
                    let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
                    // Check if same product/color/size exists
                    let found = cartItems.find(item =>
                        item.id === productId &&
                        item.color === color &&
                        item.size === size
                    );
                    if (found) {
                        found.quantity += qty;
                    } else {
                        cartItems.push({
                            id: productId,
                            name,
                            image: img,
                            color,
                            size,
                            price,
                            quantity: qty
                        });
                    }
                    localStorage.setItem('cart_items', JSON.stringify(cartItems));
                    syncHeaderCounts();
                    alert(`"${name}" added to bag!`);
                });
            }

            // Ensure the entire card is clickable to the product detail page
            if (productLinkElement) {
                card.addEventListener('click', (event) => {
                    if (event.target.closest('a') !== productLinkElement) {
                        window.location.href = productLinkElement.href;
                    }
                });
            }
        });
    }

    // --- Category Filter Buttons ---
    const categoryButtons = document.querySelectorAll('.category-filter-bar .category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            // Update URL without full page reload
            const newUrl = new URL(window.location.href);
            if (category === 'ALL') {
                newUrl.searchParams.delete('cat');
            } else {
                newUrl.searchParams.set('cat', category);
            }
            window.history.pushState({}, '', newUrl); // Update URL in browser history
            currentCategory = category; // Update currentCategory variable
            renderProducts(currentCategory); // Re-render products for new category

            // Highlight active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Set initial active category button based on URL param
    const initialActiveBtn = document.querySelector(`.category-btn[data-category="${currentCategory.toUpperCase()}"]`);
    if (initialActiveBtn) {
        initialActiveBtn.classList.add('active');
    } else {
        document.querySelector('.category-btn[data-category="WOMAN"]')?.classList.add('active');
    }


    // Sort Dropdown Functionality (remains mostly same, adapted to new structure)
    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortOptionsList = document.querySelector('.sort-options-list');
    const sortLabel = document.getElementById('sortLabel');

    if (sortDropdown) {
        sortDropdown.addEventListener('click', (event) => {
            event.stopPropagation();
            sortOptionsList.classList.toggle('active');
            document.querySelectorAll('.filter-content.active').forEach(content => {
                content.classList.remove('active');
                content.closest('.filter-dropdown').classList.remove('active');
            });
        });
    }

    if (sortOptionsList) {
        sortOptionsList.addEventListener('click', (event) => {
            if (event.target.classList.contains('sort-option')) {
                sortLabel.textContent = event.target.textContent;
                sortOptionsList.querySelectorAll('.sort-option').forEach(option => option.classList.remove('active'));
                event.target.classList.add('active');
                sortOptionsList.classList.remove('active');
                console.log('Sorting by:', event.target.dataset.sort);
                renderProducts(currentCategory);
            }
        });
    }

    // Filter Dropdown Functionality (remains mostly same, adapted to new structure)
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        const header = dropdown.querySelector('.filter-label, .filter-icon');
        const content = dropdown.querySelector('.filter-content');

        if (header && content) {
            header.addEventListener('click', (event) => {
                event.stopPropagation();

                sortOptionsList.classList.remove('active');
                document.querySelectorAll('.filter-content.active').forEach(otherContent => {
                    if (otherContent !== content) {
                        otherContent.classList.remove('active');
                        otherContent.closest('.filter-dropdown').classList.remove('active');
                    }
                });

                content.classList.toggle('active');
                dropdown.classList.toggle('active');
            });
        }
    });

    document.addEventListener('click', (event) => {
        if (sortDropdown && !sortDropdown.contains(event.target)) {
            sortOptionsList.classList.remove('active');
        }
        document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.querySelector('.filter-content').classList.remove('active');
                dropdown.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedFilters = {};
            document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                const filterType = dropdown.id.replace('Filter', '');
                selectedFilters[filterType] = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked'))
                                                  .map(cb => cb.value);
            });
            console.log('Active Filters:', selectedFilters);
            renderProducts(currentCategory);
        });
    });


    // Initial render of products for the current category on page load
    renderProducts(currentCategory);


    // Highlight navbar active
    const path = window.location.pathname;
    const currentUrlParams = new URLSearchParams(window.location.search);
    const currentCatParam = currentUrlParams.get('cat');
    const navLinks = document.querySelectorAll('.main-nav .nav-item');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkUrl = new URL(link.href);
        const linkPath = linkUrl.pathname;
        const linkParams = new URLSearchParams(linkUrl.search);
        const linkCatParam = linkParams.get('cat');

        if (path.endsWith('home.html') && linkPath.endsWith('home.html')) {
            link.classList.add('active');
        } else if (path.endsWith('product.html')) { // It's the main product listing page
            if (currentCatParam && linkCatParam === currentCatParam) {
                link.classList.add('active');
            } else if (!currentCatParam && linkPath.endsWith('product.html')) {
                if (link.href.includes("product.html?cat=WOMAN")) {
                     link.classList.add('active');
                }
            }
        } else if (path.endsWith('product_detail.html')) { // It's the single product detail page
            const productId = currentUrlParams.get('id');
            const product = ALL_PRODUCTS_DATA.find(p => p.id === productId);
            if (product && linkCatParam === product.category) {
                link.classList.add('active');
            }
        }
    });

    // --- FAVORITE (LIKE) SYNC LOGIC ---

    // Utility: Get/set favorite product IDs in localStorage
    function getFavoriteProductIds() {
        return JSON.parse(localStorage.getItem('favorite_product_ids') || '[]');
    }
    function setFavoriteProductIds(ids) {
        localStorage.setItem('favorite_product_ids', JSON.stringify(ids));
    }

    // Utility: Check if a product is favorited
    function isProductFavorited(productId) {
        const ids = getFavoriteProductIds();
        return ids.includes(productId);
    }

    // Utility: Toggle favorite for a product
    function toggleFavoriteProduct(productId) {
        let ids = getFavoriteProductIds();
        if (ids.includes(productId)) {
            ids = ids.filter(id => id !== productId);
        } else {
            ids.push(productId);
        }
        setFavoriteProductIds(ids);
        return ids.includes(productId);
    }

    // Render favorite state for all product cards
    function renderFavoriteStates() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.getAttribute('data-product-id');
            const heart = card.querySelector('.product-card-heart, .product-card-heart-small');
            if (heart) {
                if (isProductFavorited(productId)) {
                    heart.classList.add('favorited');
                    // Set heart icon color to pink
                    heart.style.filter = 'invert(22%) sepia(97%) saturate(7496%) hue-rotate(320deg) brightness(97%) contrast(101%)';
                } else {
                    heart.classList.remove('favorited');
                    // Set heart icon color to black (default)
                    heart.style.filter = '';
                }
            }
        });
    }

    // Attach click event to all product card hearts
    function setupFavoriteListeners() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.getAttribute('data-product-id');
            const heart = card.querySelector('.product-card-heart, .product-card-heart-small');
            if (heart) {
                heart.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isFav = toggleFavoriteProduct(productId);
                    renderFavoriteStates();
                    // Optionally update favCount in header
                    const favCount = document.getElementById('favCount');
                    if (favCount) {
                        favCount.textContent = getFavoriteProductIds().length;
                    }
                });
            }
        });
    }

    // On page load, sync favorite state
    renderFavoriteStates();
    setupFavoriteListeners();

    console.log("Product page interactivity loaded!");
});