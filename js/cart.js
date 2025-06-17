// File: js/cart.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menginisialisasi semua interaksi di halaman keranjang
    function initializeCartInteractions() {
        setupQuantityButtons();
        setupRemoveItemButtons();
        setupFavoriteToggles(); // Untuk ikon hati di "Similar Product"
        updateCartSummary(); // Panggil sekali saat load untuk inisialisasi
    }

    // Fungsi untuk menangani tombol kuantitas (+/-)
    function setupQuantityButtons() {
        const quantitySelectors = document.querySelectorAll('.cart-item .quantity-selector');

        quantitySelectors.forEach(selector => {
            const decreaseBtn = selector.querySelector('.qty-btn:first-child');
            const increaseBtn = selector.querySelector('.qty-btn:last-child');
            const qtyDisplay = selector.querySelector('.qty-display');
            const cartItem = selector.closest('.cart-item'); // Dapatkan elemen item keranjang terdekat
            const unitPriceElement = cartItem.querySelector('.cart-item-unit-price');
            const subtotalValueElement = cartItem.querySelector('.cart-item-subtotal-value');

            // Mengambil harga satuan dari teks (misal "RpXXX.XXX") dan membersihkannya
            // Ini adalah contoh sederhana dan mungkin perlu disesuaikan jika format harga kompleks
            const unitPrice = parsePrice(unitPriceElement ? unitPriceElement.textContent : 'Rp0');

            decreaseBtn.addEventListener('click', () => {
                let currentQty = parseInt(qtyDisplay.textContent);
                if (currentQty > 1) {
                    currentQty--;
                    qtyDisplay.textContent = currentQty;
                    updateItemSubtotal(currentQty, unitPrice, subtotalValueElement);
                    updateCartSummary();
                }
            });

            increaseBtn.addEventListener('click', () => {
                let currentQty = parseInt(qtyDisplay.textContent);
                currentQty++;
                qtyDisplay.textContent = currentQty;
                updateItemSubtotal(currentQty, unitPrice, subtotalValueElement);
                updateCartSummary();
            });
        });
    }

    // Fungsi untuk mengubah string harga menjadi angka
    function parsePrice(priceString) {
        if (!priceString) return 0;
        // Hapus "Rp", titik sebagai pemisah ribuan, dan ganti koma desimal jika ada
        const cleanedString = priceString.replace(/Rp|\./g, '').replace(',', '.');
        return parseFloat(cleanedString) || 0;
    }

    // Fungsi untuk memformat angka menjadi string harga
    function formatPrice(number) {
        // Format sederhana, Anda mungkin ingin menggunakan Intl.NumberFormat untuk format yang lebih baik
        return 'Rp' + number.toLocaleString('id-ID');
    }

    // Fungsi untuk memperbarui subtotal item
    function updateItemSubtotal(quantity, unitPrice, subtotalElement) {
        if (subtotalElement) {
            const itemSubtotal = quantity * unitPrice;
            subtotalElement.textContent = formatPrice(itemSubtotal);
        }
    }

    // Fungsi untuk menangani tombol hapus item
    function setupRemoveItemButtons() {
        const removeButtons = document.querySelectorAll('.cart-item .remove-item-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemToRemove = this.closest('.cart-item');
                const nextDivider = itemToRemove.nextElementSibling; // Dapatkan <hr> setelah item

                itemToRemove.remove();
                if (nextDivider && nextDivider.classList.contains('cart-item-divider')) {
                    nextDivider.remove(); // Hapus juga pembatasnya
                }
                updateCartSummary();
                // Tambahkan logika untuk menampilkan pesan jika keranjang kosong
                checkEmptyCart();
            });
        });
    }

    // Fungsi untuk menangani ikon favorit di "Similar Product"
    function setupFavoriteToggles() {
        const heartIcons = document.querySelectorAll('.similar-products-section .product-card-heart-small');
        heartIcons.forEach(heartIcon => {
            heartIcon.addEventListener('click', function(event) {
                event.preventDefault(); // Mencegah navigasi dari tautan <a>
                event.stopPropagation(); // Mencegah event bubble ke elemen parent
                this.classList.toggle('favorited');
                // Di sini Anda bisa menambahkan logika untuk menyimpan status favorit
                // atau memperbarui hitungan favorit di header jika ada.
                // const favCountElement = document.getElementById('favCount');
                // let currentFavCount = parseInt(favCountElement.textContent);
                // this.classList.contains('favorited') ? currentFavCount++ : currentFavCount--;
                // favCountElement.textContent = Math.max(0, currentFavCount); // Pastikan tidak negatif
            });
        });
    }

    // Fungsi untuk memperbarui ringkasan keranjang (total item dan harga)
    // Ini adalah versi sederhana. Perhitungan total harga yang sebenarnya akan lebih kompleks.
    function updateCartSummary() {
        const cartItems = document.querySelectorAll('.cart-items-section .cart-item');
        const summaryItemCountElement = document.getElementById('summaryItemCount');
        const summarySubtotalElement = document.querySelector('.order-summary-section .summary-row span:last-child'); // Asumsi ini adalah subtotal
        const summaryTotalElement = document.querySelector('.order-summary-section .summary-row.total span:last-child');

        if (summaryItemCountElement) {
            summaryItemCountElement.textContent = cartItems.length;
        }

        let overallSubtotal = 0;
        cartItems.forEach(item => {
            const subtotalValueElement = item.querySelector('.cart-item-subtotal-value');
            if (subtotalValueElement) {
                overallSubtotal += parsePrice(subtotalValueElement.textContent);
            }
        });

        // Contoh sederhana untuk VAT dan Order Total
        // Anda perlu logika yang lebih akurat untuk ini
        const vatPercentage = 0.11; // Contoh PPN 11%
        const vatAmount = overallSubtotal * vatPercentage;
        const orderTotal = overallSubtotal + vatAmount;

        if (document.querySelector('.order-summary-section')) {
             // Update Item(s) subtotal
            const itemsSubtotalRow = Array.from(document.querySelectorAll('.order-summary-section .summary-row'))
                                       .find(row => row.children[0].textContent.includes("Item(s) subtotal"));
            if (itemsSubtotalRow) itemsSubtotalRow.children[1].textContent = formatPrice(overallSubtotal);

            // Update VAT included (jika ada elemennya)
            const vatRow = Array.from(document.querySelectorAll('.order-summary-section .summary-row'))
                                       .find(row => row.children[0].textContent.includes("VAT included"));
            if (vatRow) vatRow.children[1].textContent = formatPrice(vatAmount);
            
            // Update ORDER TOTAL
            if (summaryTotalElement) summaryTotalElement.textContent = formatPrice(orderTotal);
        }
    }
    
    // Fungsi untuk memeriksa apakah keranjang kosong dan menampilkan pesan
    function checkEmptyCart() {
        const cartItemsSection = document.querySelector('.cart-items-section');
        const cartItems = cartItemsSection.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            let emptyCartMessage = cartItemsSection.querySelector('.empty-cart-message');
            if (!emptyCartMessage) {
                emptyCartMessage = document.createElement('p');
                emptyCartMessage.classList.add('empty-cart-message');
                emptyCartMessage.textContent = 'Your shopping cart is empty.';
                emptyCartMessage.style.textAlign = 'center';
                emptyCartMessage.style.padding = '20px';
                emptyCartMessage.style.fontSize = '18px';
                cartItemsSection.appendChild(emptyCartMessage);
            }
        } else {
            const emptyCartMessage = cartItemsSection.querySelector('.empty-cart-message');
            if (emptyCartMessage) {
                emptyCartMessage.remove();
            }
        }
    }


    // Panggil fungsi inisialisasi utama
    // initializeCartInteractions();
    // checkEmptyCart();
    // const CART_KEY = 'cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
    );
    if (existing) {
        existing.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    saveCart(cart);
}

function updateCartItem(id, size, color, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === id && i.size === size && i.color === color);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            // Remove item if quantity is zero or less
            const idx = cart.indexOf(item);
            cart.splice(idx, 1);
        }
        saveCart(cart);
    }
}

function removeCartItem(id, size, color) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === id && i.size === size && i.color === color);
    if (idx > -1) {
        cart.splice(idx, 1);
        saveCart(cart);
    }
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
}

// Export functions for use in other scripts
window.CartUtils = {
    getCart,
    saveCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
};

document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartSummary();
    updateCartCountBadge();
});

function renderCartItems() {
    const cart = CartUtils.getCart();
    const container = document.querySelector('.cart-items-section');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width:80px;">
            <div>
                <div>${item.name}</div>
                <div>Color: ${item.color} | Size: ${item.size}</div>
                <div>Price: Rp${item.price.toLocaleString('id-ID')}</div>
                <div>
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">Remove</button>
            </div>
            <div>Subtotal: Rp${itemTotal.toLocaleString('id-ID')}</div>
        `;
        container.appendChild(itemDiv);
    });

    container.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const { id, size, color, action } = btn.dataset;
            const cart = CartUtils.getCart();
            const item = cart.find(i => i.id === id && i.size === size && i.color === color);
            if (!item) return;
            if (action === 'increase') {
                CartUtils.updateCartItem(id, size, color, item.quantity + 1);
            } else if (action === 'decrease') {
                CartUtils.updateCartItem(id, size, color, item.quantity - 1);
            }
            renderCartItems();
            updateCartSummary();
            updateCartCountBadge();
        });
    });
    container.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const { id, size, color } = btn.dataset;
            CartUtils.removeCartItem(id, size, color);
            renderCartItems();
            updateCartSummary();
            updateCartCountBadge();
        });
    });
}

function updateCartSummary() {
    const cart = CartUtils.getCart();
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    document.getElementById('cartSubtotalValue').textContent = 'Rp' + subtotal.toLocaleString('id-ID');
}

function updateCartCountBadge() {
    const badge = document.getElementById('cartCountBadge');
    if (badge) badge.textContent = CartUtils.getCartCount();
}

// --- FAVORITE (LIKE) SYNC LOGIC FOR SIMILAR PRODUCTS IN CART ---

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
    // Also update the global favCount in header
    const favCount = document.getElementById('favCount');
    if (favCount) {
        favCount.textContent = getFavoriteProductIds().length;
    }
}
function setupFavoriteListenersForSimilar() {
    document.querySelectorAll('.similar-products-section .product-card').forEach(card => {
        const productId = card.getAttribute('data-product-id');
        const heart = card.querySelector('.product-card-heart-small');
        if (heart) {
            heart.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                toggleFavoriteProduct(productId);
                renderFavoriteStatesForSimilar();
            });
        }
    });
}

// Replace old similar-products-section like logic with sync logic
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    renderFavoriteStatesForSimilar();
    setupFavoriteListenersForSimilar();
    // ...existing code...
});

    // Render cart items from localStorage
    function renderCartItemsFromStorage() {
        const cartItemsSection = document.querySelector('.cart-items-section');
        if (!cartItemsSection) return;
        let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
        cartItemsSection.innerHTML = '';
        // Hide/show checkout button based on cart items
        const checkoutBtn = document.querySelector('.checkout-btn');
        const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
        if (cartItems.length === 0) {
            cartItemsSection.innerHTML = '<p class="empty-cart-message" style="text-align:center;padding:20px;font-size:18px;">Your shopping cart is empty.</p>';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
            if (continueShoppingBtn) continueShoppingBtn.textContent = 'Shop Now';
            renderOrderSummaryFromCart(cartItems);
            syncHeaderCounts();
            return;
        } else {
            if (checkoutBtn) checkoutBtn.style.display = '';
            if (continueShoppingBtn) continueShoppingBtn.textContent = 'Continue Shopping';
        }
        cartItems.forEach((item, idx) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img class="cart-item-image" src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-meta">COLOUR: ${item.color}</p>
                        <p class="cart-item-meta">SIZE: ${item.size}</p>
                        <p class="cart-item-unit-price">Rp${item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-quantity-section">
                            <span class="quantity-label">QUANTITY</span>
                            <div class="quantity-selector">
                                <button class="qty-btn">-</button>
                                <span class="qty-display">${item.quantity}</span>
                                <button class="qty-btn">+</button>
                            </div>
                        </div>
                        <div class="cart-item-subtotal-section">
                            <span class="subtotal-label">SUBTOTAL</span>
                            <p class="cart-item-subtotal-value">Rp${(item.price * item.quantity).toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </div>
                <button class="remove-item-btn" aria-label="Remove item">&times;</button>
            `;
            cartItemsSection.appendChild(cartItem);

            // Divider except after last item
            if (idx < cartItems.length - 1) {
                const divider = document.createElement('hr');
                divider.className = 'cart-item-divider';
                cartItemsSection.appendChild(divider);
            }

            // Quantity buttons
            const qtyBtns = cartItem.querySelectorAll('.qty-btn');
            const qtyDisplay = cartItem.querySelector('.qty-display');
            const subtotalValueElement = cartItem.querySelector('.cart-item-subtotal-value');
            qtyBtns[0].addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    qtyDisplay.textContent = item.quantity;
                    subtotalValueElement.textContent = 'Rp' + (item.price * item.quantity).toLocaleString('id-ID');
                    localStorage.setItem('cart_items', JSON.stringify(cartItems));
                    updateCartSummary();
                    renderCartItemsFromStorage();
                }
            });
            qtyBtns[1].addEventListener('click', () => {
                item.quantity++;
                qtyDisplay.textContent = item.quantity;
                subtotalValueElement.textContent = 'Rp' + (item.price * item.quantity).toLocaleString('id-ID');
                localStorage.setItem('cart_items', JSON.stringify(cartItems));
                updateCartSummary();
                renderCartItemsFromStorage();
            });

            // Remove button
            cartItem.querySelector('.remove-item-btn').addEventListener('click', () => {
                cartItems.splice(idx, 1);
                localStorage.setItem('cart_items', JSON.stringify(cartItems));
                renderCartItemsFromStorage();
                updateCartSummary();
            });
        });
        renderOrderSummaryFromCart(cartItems);
        syncHeaderCounts();
    }

    // --- Header Sync Function ---
    function syncHeaderCounts() {
        const favCountElement = document.getElementById('favCount');
        const bagCountElement = document.getElementById('bagCount');
        let favorites = parseInt(localStorage.getItem('favorites') || '0');
        let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
        let bagItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        if (favCountElement) favCountElement.textContent = favorites;
        if (bagCountElement) bagCountElement.textContent = bagItems;
    }

    // --- Render Cart Items and Order Summary from localStorage ---
    function renderCartItemsFromStorage() {
        const cartItemsSection = document.querySelector('.cart-items-section');
        if (!cartItemsSection) return;
        let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
        cartItemsSection.innerHTML = '';
        // Hide/show checkout button based on cart items
        const checkoutBtn = document.querySelector('.checkout-btn');
        const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
        if (cartItems.length === 0) {
            cartItemsSection.innerHTML = '<p class="empty-cart-message" style="text-align:center;padding:20px;font-size:18px;">Your shopping cart is empty.</p>';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
            if (continueShoppingBtn) continueShoppingBtn.textContent = 'Shop Now';
            renderOrderSummaryFromCart(cartItems);
            syncHeaderCounts();
            return;
        } else {
            if (checkoutBtn) checkoutBtn.style.display = '';
            if (continueShoppingBtn) continueShoppingBtn.textContent = 'Continue Shopping';
        }
        cartItems.forEach((item, idx) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img class="cart-item-image" src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-meta">COLOUR: ${item.color}</p>
                        <p class="cart-item-meta">SIZE: ${item.size}</p>
                        <p class="cart-item-unit-price">Rp${item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-quantity-section">
                            <span class="quantity-label">QUANTITY</span>
                            <div class="quantity-selector">
                                <button class="qty-btn">-</button>
                                <span class="qty-display">${item.quantity}</span>
                                <button class="qty-btn">+</button>
                            </div>
                        </div>
                        <div class="cart-item-subtotal-section">
                            <span class="subtotal-label">SUBTOTAL</span>
                            <p class="cart-item-subtotal-value">Rp${(item.price * item.quantity).toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </div>
                <button class="remove-item-btn" aria-label="Remove item">&times;</button>
            `;
            cartItemsSection.appendChild(cartItem);

            // Divider except after last item
            if (idx < cartItems.length - 1) {
                const divider = document.createElement('hr');
                divider.className = 'cart-item-divider';
                cartItemsSection.appendChild(divider);
            }

            // Quantity buttons
            const qtyBtns = cartItem.querySelectorAll('.qty-btn');
            const qtyDisplay = cartItem.querySelector('.qty-display');
            const subtotalValueElement = cartItem.querySelector('.cart-item-subtotal-value');
            qtyBtns[0].addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    qtyDisplay.textContent = item.quantity;
                    subtotalValueElement.textContent = 'Rp' + (item.price * item.quantity).toLocaleString('id-ID');
                    localStorage.setItem('cart_items', JSON.stringify(cartItems));
                    renderOrderSummaryFromCart(cartItems);
                    renderCartItemsFromStorage();
                    syncHeaderCounts();
                }
            });
            qtyBtns[1].addEventListener('click', () => {
                item.quantity++;
                qtyDisplay.textContent = item.quantity;
                subtotalValueElement.textContent = 'Rp' + (item.price * item.quantity).toLocaleString('id-ID');
                localStorage.setItem('cart_items', JSON.stringify(cartItems));
                renderOrderSummaryFromCart(cartItems);
                renderCartItemsFromStorage();
                syncHeaderCounts();
            });

            // Remove button
            cartItem.querySelector('.remove-item-btn').addEventListener('click', () => {
                cartItems.splice(idx, 1);
                localStorage.setItem('cart_items', JSON.stringify(cartItems));
                renderOrderSummaryFromCart(cartItems);
                renderCartItemsFromStorage();
                syncHeaderCounts();
            });
        });
        renderOrderSummaryFromCart(cartItems);
        syncHeaderCounts();
    }

    // --- Render Order Summary from cart_items ---
    function renderOrderSummaryFromCart(cartItems) {
        // If not passed, get from localStorage
        if (!cartItems) cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
        const summaryTitle = document.querySelector('.order-summary-section .summary-title');
        const summaryItemCountElement = document.getElementById('summaryItemCount');
        const itemsSubtotalRow = Array.from(document.querySelectorAll('.order-summary-section .summary-row'))
            .find(row => row.children[0].textContent.includes("Item(s) subtotal"));
       
        const subtotalRow = Array.from(document.querySelectorAll('.order-summary-section .summary-row'))
            .find(row => row.children[0].textContent.trim().toUpperCase() === "SUBTOTAL");
        
        const vatRow = Array.from(document.querySelectorAll('.order-summary-section .summary-row'))
            .find(row => row.children[0].textContent.includes("VAT included"));
        const orderTotalRow = Array.from(document.querySelectorAll('.order-summary-section .summary-row.total'));

        // Calculate
        let itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        let itemsSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Delivery cost logic (match checkout.js)
        let deliveryCost = 0;
        // If you want to match checkout's logic, you can check for a delivery option in localStorage or just keep it 0 here

        let subtotal = itemsSubtotal + deliveryCost;
        const vatPercentage = 0.11; 
        let vat = subtotal * vatPercentage;
        let orderTotal = subtotal + vat;

        // Update
        if (summaryTitle) summaryTitle.innerHTML = `ORDER SUMMARY | <span id="summaryItemCount">${itemCount}</span> ITEM(S)`;
        if (summaryItemCountElement) summaryItemCountElement.textContent = itemCount;
        if (itemsSubtotalRow) itemsSubtotalRow.children[1].textContent = 'Rp' + itemsSubtotal.toLocaleString('id-ID');
        if (subtotalRow) subtotalRow.children[1].textContent = 'Rp' + subtotal.toLocaleString('id-ID');
        if (vatRow) vatRow.children[1].textContent = 'Rp' + vat.toLocaleString('id-ID');
        if (orderTotalRow.length && orderTotalRow[0].children[1]) orderTotalRow[0].children[1].textContent = 'Rp' + orderTotal.toLocaleString('id-ID');
    }

    // If you have favorite (heart) icon logic in cart page, also update localStorage and call syncHeaderCounts()
    // Example for similar products section:
    document.querySelectorAll('.similar-products-section .product-card-heart-small').forEach(heartIcon => {
        heartIcon.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const isFavorited = this.classList.toggle('favorited');
            let favorites = parseInt(localStorage.getItem('favorites') || '0');
            if (isFavorited) {
                favorites++;
            } else {
                favorites = Math.max(0, favorites - 1);
            }
            localStorage.setItem('favorites', favorites);
            syncHeaderCounts();
        });
    });

    // Call on load
    syncHeaderCounts();
    renderCartItemsFromStorage();
    checkEmptyCart();
});
