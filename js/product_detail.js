document.addEventListener('DOMContentLoaded', () => {
    if (typeof ALL_PRODUCTS_DATA === 'undefined') {
        console.error('ALL_PRODUCTS_DATA not found. Make sure js/products_data.js is loaded before product_detail.js');
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

    // --- Product Detail Page - Dynamic Content Loading ---

    const productId = new URLSearchParams(window.location.search).get('id');
    const mainContentArea = document.querySelector('.product-detail-main-content');
    const similarProductsGrid = document.getElementById('similarProductsGrid');

    if (!productId || !mainContentArea) {
        mainContentArea.innerHTML = '<p style="text-align: center; padding: 50px;">Product not found. <a href="home.html">Go to Homepage</a></p>';
        if (similarProductsGrid) similarProductsGrid.closest('section').style.display = 'none';
        return;
    }

    const product = ALL_PRODUCTS_DATA.find(p => p.id === productId);

    if (product) {
        mainContentArea.innerHTML = `
            <div class="product-image-gallery">
                <img class="product-main-image" src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info-column">
                <h1 class="product-name">${product.name}</h1>
                <p class="product-price">Rp${product.price.toLocaleString('id-ID')}</p>

                <div class="product-options">
                    <div class="option-group color-option-group">
                        <p class="option-label">COLOR: <span id="selectedColor">${product.colors[0].label}</span></p>
                        <div class="color-swatches">
                            ${product.colors.map((c, index) => `
                                <div class="swatch ${index === 0 ? 'active' : ''}"
                                     data-color="${c.code}" data-label="${c.label}"
                                     style="background-color: ${c.code}; border-color: ${c.code === 'white' ? '#ccc' : c.code === 'black' ? '#000' : c.code === 'gray' ? '#808080' : c.code};"></div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="option-group size-option-group">
                        <p class="option-label">SIZE: <span id="selectedSize">${product.sizes[0]}</span></p>
                        <div class="size-options">
                            ${product.sizes.map((s, index) => `
                                <div class="size-box ${index === 0 ? 'active' : ''}" data-size="${s}">${s}</div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="quantity-selector">
                        <button class="qty-btn" id="decreaseQty">-</button>
                        <span class="qty-display" id="productQty">1</span>
                        <button class="qty-btn" id="increaseQty">+</button>
                    </div>

                    <div class="add-to-cart-section">
                        <button class="add-to-cart-btn" id="addToCartBtn">ADD TO CART</button>
                        <img class="heart-product-page" src="assets/heartIcon.svg" alt="Add to Favorites">
                    </div>
                </div>

                <div class="product-info-details">
                    <div class="info-accordion">
                        <div class="accordion-header">PRODUCT DETAIL <span class="accordion-icon">+</span></div>
                        <div class="accordion-content">
                            <p>${product.description}</p>
                            <ul>
                                <li>Material: ${product.material}</li>
                                <li>Care: ${product.care}</li>
                                <li>Origin: ${product.origin}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="accordion-divider"></div>

                    <div class="info-accordion">
                        <div class="accordion-header">SIZING GUIDE <span class="accordion-icon">+</span></div>
                        <div class="accordion-content">
                            <p>Find your perfect fit with our comprehensive sizing guide. Measurements are in centimeters.</p>
                            <table>
                                <thead><tr><th>Size</th><th>Waist</th><th>Hip</th></tr></thead>
                                <tbody>
                                    <tr><td>XS</td><td>60-64</td><td>88-92</td></tr>
                                    <tr><td>S</td><td>65-69</td><td>93-97</td></tr>
                                    <tr><td>M</td><td>70-74</td><td>98-102</td></tr>
                                    <tr><td>L</td><td>75-79</td><td>103-107</td></tr>
                                    <tr><td>XL</td><td>80-84</td><td>108-112</td></tr>
                                    <tr><td>XXL</td><td>85-89</td><td>113-117</td></tr>
                                    <tr><td>3XL</td><td>90-94</td><td>118-122</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="accordion-divider"></div>
                </div>
            </div>
        `;

        setupProductPageListeners();
        renderSimilarProducts(product.category, productId);
    } else {
        mainContentArea.innerHTML = '<p style="text-align: center; padding: 50px;">Product details not found. <a href="home.html">Go to Homepage</a></p>';
        if (similarProductsGrid) similarProductsGrid.closest('section').style.display = 'none';
    }


    function setupProductPageListeners() {
        const decreaseQtyBtn = document.getElementById('decreaseQty');
        const increaseQtyBtn = document.getElementById('increaseQty');
        const productQtyDisplay = document.getElementById('productQty');
        let currentQty = parseInt(productQtyDisplay.textContent);

        if (decreaseQtyBtn && increaseQtyBtn && productQtyDisplay) {
            decreaseQtyBtn.addEventListener('click', () => {
                if (currentQty > 1) {
                    currentQty--;
                    productQtyDisplay.textContent = currentQty;
                }
            });

            increaseQtyBtn.addEventListener('click', () => {
                currentQty++;
                productQtyDisplay.textContent = currentQty;
            });
        }

        const colorSwatches = document.querySelectorAll('.color-swatches .swatch');
        const selectedColorDisplay = document.getElementById('selectedColor');

        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                colorSwatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                if (selectedColorDisplay) selectedColorDisplay.textContent = swatch.dataset.label;
            });
        });

        const sizeBoxes = document.querySelectorAll('.size-options .size-box');
        const selectedSizeDisplay = document.getElementById('selectedSize');

        sizeBoxes.forEach(box => {
            box.addEventListener('click', () => {
                sizeBoxes.forEach(b => b.classList.remove('active'));
                box.classList.add('active');
                if (selectedSizeDisplay) selectedSizeDisplay.textContent = box.dataset.size;
            });
        });

        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const selectedColor = document.querySelector('.color-swatches .swatch.active')?.dataset.label || 'Not selected';
                const selectedSize = document.querySelector('.size-options .size-box.active')?.dataset.size || 'Not selected';
                const productName = document.querySelector('.product-name').textContent;
                const productPrice = product.price; // Get the actual price from the product object
                const productImage = product.image; // Get image for cart item display

                if (selectedColor === 'Not selected' || selectedSize === 'Not selected') {
                    alert('Please select a color and size before adding to cart.');
                    return;
                }

                // --- Add/Update item in localStorage cart ---
                let cartItemsArray = JSON.parse(localStorage.getItem('cart_items') || '[]');

                const existingItemIndex = cartItemsArray.findIndex(item =>
                    item.id === product.id &&
                    item.color === selectedColor &&
                    item.size === selectedSize
                );

                if (existingItemIndex > -1) {
                    cartItemsArray[existingItemIndex].quantity += currentQty;
                } else {
                    cartItemsArray.push({
                        id: product.id,
                        name: productName,
                        image: productImage,
                        color: selectedColor,
                        size: selectedSize,
                        price: productPrice,
                        quantity: currentQty
                    });
                }

                localStorage.setItem('cart_items', JSON.stringify(cartItemsArray));
                syncHeaderCounts();

                alert(`${currentQty} x "${productName}" (${selectedColor}, ${selectedSize}) added to cart!`);
            });
        }

        const productPageHeartIcon = document.querySelector('.heart-product-page');
        if (productPageHeartIcon) {
            productPageHeartIcon.addEventListener('click', () => {
                const isFavorited = productPageHeartIcon.classList.toggle('favorited');
                let favorites = parseInt(localStorage.getItem('favorites') || '0');
                if (isFavorited) {
                    favorites++;
                    alert('Added to favorites!');
                } else {
                    favorites = Math.max(0, favorites - 1);
                    alert('Removed from favorites!');
                }
                localStorage.setItem('favorites', favorites);
                syncHeaderCounts();
            });
        }

        document.querySelectorAll('.info-accordion').forEach(accordion => {
            const header = accordion.querySelector('.accordion-header');
            const content = accordion.querySelector('.accordion-content');
            const icon = accordion.querySelector('.accordion-icon');

            if (header && content && icon) {
                header.addEventListener('click', () => {
                    header.classList.toggle('active');
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            }
        });
    }


    // Utility: Get 4 random products (excluding current product)
    function getRandomSimilarProducts(currentProductId, count = 4) {
        if (!window.ALL_PRODUCTS_DATA) return [];
        const filtered = ALL_PRODUCTS_DATA.filter(p => p.id !== currentProductId);
        // Shuffle array
        for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        return filtered.slice(0, count);
    }

    // Render similar products section
    function renderSimilarProducts(currentProductId) {
        const grid = document.getElementById('similarProductsGrid');
        if (!grid) return;
        const products = getRandomSimilarProducts(currentProductId, 4);
        grid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-product-id', product.id);
            card.innerHTML = `
                <a href="product_detail.html?id=${product.id}">
                    <img class="product-thumbnail" src="${product.image}" alt="${product.name}">
                </a>
                <div class="color-swatches-small">
                    ${product.colors.map(c => `<div class="swatch-small" data-color="${c.code}"></div>`).join('')}
                </div>
                <p class="product-meta product-category">${product.category}</p>
                <p class="product-meta product-name">${product.name}</p>
                <p class="product-meta product-price">Rp${product.price.toLocaleString('id-ID')}</p>
                <p class="product-meta product-size-small">${product.sizes.join(', ')}</p>
                <img class="product-card-heart-small" src="assets/heartIcon.svg" alt="Add to Favorites">
            `;
            grid.appendChild(card);
        });
    }

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
        } else if (path.endsWith('product.html')) {
            if (currentCatParam && linkCatParam === currentCatParam) {
                link.classList.add('active');
            } else if (!currentCatParam && linkPath.endsWith('product.html')) {
                if (link.href.includes("product.html?cat=WOMAN")) {
                     link.classList.add('active');
                }
            }
        } else if (path.endsWith('product_detail.html')) {
            const product = ALL_PRODUCTS_DATA.find(p => p.id === productId);
            if (product && linkCatParam === product.category) {
                link.classList.add('active');
            }
        }
    });

    console.log("Product detail page interactivity loaded!");
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

// Render favorite state for main product
function renderFavoriteStateForDetail(productId) {
    const heart = document.querySelector('.heart-product-page');
    if (heart) {
        if (isProductFavorited(productId)) {
            heart.classList.add('favorited');
            heart.style.filter = 'invert(18%) sepia(91%) saturate(7483%) hue-rotate(359deg) brightness(99%) contrast(110%)';
        } else {
            heart.classList.remove('favorited');
            heart.style.filter = '';
        }
    }
}

// Attach click event to main product heart
function setupFavoriteListenerForDetail(productId) {
    const heart = document.querySelector('.heart-product-page');
    if (heart) {
        heart.addEventListener('click', function() {
            toggleFavoriteProduct(productId);
            renderFavoriteStateForDetail(productId);
            // Optionally update favCount in header
            const favCount = document.getElementById('favCount');
            if (favCount) {
                favCount.textContent = getFavoriteProductIds().length;
            }
        });
    }
}

// Render favorite state for similar products
function renderFavoriteStatesForSimilar() {
    document.querySelectorAll('.similar-products-section .product-card').forEach(card => {
        const productId = card.getAttribute('data-product-id');
        const heart = card.querySelector('.product-card-heart-small');
        if (heart) {
            if (isProductFavorited(productId)) {
                heart.classList.add('favorited');
                heart.style.filter = 'invert(22%) sepia(97%) saturate(7496%) hue-rotate(320deg) brightness(97%) contrast(101%)';
            } else {
                heart.classList.remove('favorited');
                heart.style.filter = '';
            }
        }
    });
}

// Attach click event to similar product hearts
function setupFavoriteListenersForSimilar() {
    document.querySelectorAll('.similar-products-section .product-card').forEach(card => {
        const productId = card.getAttribute('data-product-id');
        const heart = card.querySelector('.product-card-heart-small');
        if (heart) {
            heart.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFavoriteProduct(productId);
                renderFavoriteStatesForSimilar();
                // Optionally update favCount in header
                const favCount = document.getElementById('favCount');
                if (favCount) {
                    favCount.textContent = getFavoriteProductIds().length;
                }
            });
        }
    });
}

// On product detail page load, sync favorite state
document.addEventListener('DOMContentLoaded', function() {
    const productId = new URLSearchParams(window.location.search).get('id');
    renderFavoriteStateForDetail(productId);
    setupFavoriteListenerForDetail(productId);
    renderFavoriteStatesForSimilar();
    setupFavoriteListenersForSimilar();
});