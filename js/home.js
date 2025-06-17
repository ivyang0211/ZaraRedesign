document.addEventListener('DOMContentLoaded', () => {
    // Ensure ALL_PRODUCTS_DATA is available (from products_data.js)
    if (typeof ALL_PRODUCTS_DATA === 'undefined') {
        console.error('ALL_PRODUCTS_DATA not found. Make sure js/products_data.js is loaded before home.js');
        return;
    }

    // --- Header & Navbar Interactions ---
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

    // --- Product Card Interactions ---
    document.querySelectorAll('.product-card').forEach(card => {
        const heartIcon = card.querySelector('.product-card-heart');
        const colorSwatches = card.querySelectorAll('.swatch');
        const productLinkElement = card.querySelector('a');
        const productNameElement = card.querySelector('.product-name');

        // Toggle favorite status
        if (heartIcon) {
            heartIcon.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card navigation
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
                event.stopPropagation(); // Prevent card navigation
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

        if (productLinkElement) {
            card.addEventListener('click', (event) => {
                if (event.target.closest('a') !== productLinkElement) {
                    window.location.href = productLinkElement.href;
                }
            });
        }
    });

    // Highlight navbar active
    const path = window.location.pathname;
    const currentParams = new URLSearchParams(window.location.search);
    const currentCatParam = currentParams.get('cat');
    const navLinks = document.querySelectorAll('.main-nav .nav-item');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkUrl = new URL(link.href);
        const linkPath = linkUrl.pathname;
        const linkParams = new URLSearchParams(linkUrl.search);
        const linkCatParam = linkParams.get('cat');

        if (path.endsWith('home.html') && linkPath.endsWith('home.html')) {
            link.classList.add('active');
        } else if (path.endsWith('product.html')) {
            if (currentCatParam && linkCatParam === currentCatParam) {
                link.classList.add('active');
            } else if (!currentCatParam && linkPath.endsWith('product.html')) {
                if (link.href.includes("product.html?cat=WOMAN")) {
                     link.classList.add('active');
                }
            }
        } else if (path.endsWith('product_detail.html')) { 
            const productId = currentParams.get('id');
            const product = ALL_PRODUCTS_DATA.find(p => p.id === productId);
            if (product && linkCatParam === product.category) {
                link.classList.add('active');
            }
        }
    });

    // --- FAVORITE (LIKE) SYNC LOGIC ---

    function getFavoriteProductIds() {
        return JSON.parse(localStorage.getItem('favorite_product_ids') || '[]');
    }
    function setFavoriteProductIds(ids) {
        localStorage.setItem('favorite_product_ids', JSON.stringify(ids));
    }
    function isProductFavorited(productId) {
        const ids = getFavoriteProductIds();
        return ids.includes(productId);
    }
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
                    // Set heart icon color to pink using CSS filter
                    heart.style.filter = 'invert(22%) sepia(97%) saturate(7496%) hue-rotate(320deg) brightness(97%) contrast(101%)';
                } else {
                    heart.classList.remove('favorited');
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

    console.log("Homepage interactivity loaded!");
});