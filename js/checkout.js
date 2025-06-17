// File: js/checkout.js
document.addEventListener('DOMContentLoaded', function() {
    if (typeof ALL_PRODUCTS_DATA === 'undefined') {
        console.error('ALL_PRODUCTS_DATA not found. Make sure js/products_data.js is loaded before checkout.js');
        return;
    }

    // --- Header & Navbar Interactions ---
    const searchIcon = document.getElementById('searchIcon');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchButton = document.getElementById('closeSearch');
    const favCount = document.getElementById('favCount');
    const bagCount = document.getElementById('bagCount');

    let favorites = parseInt(localStorage.getItem('favorites') || '0');
    favCount.textContent = favorites;
    
    let bagItems = 0; 
    const storedCart = JSON.parse(localStorage.getItem('cart_items') || '[]');
    bagItems = storedCart.reduce((total, item) => total + item.quantity, 0);
    bagCount.textContent = bagItems;

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
    // --- End Header & Navbar Interactions ---


    // --- Checkout Page Specific Interactions ---
    let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');

    function initializeCheckoutInteractions() {
        setupStepNavigation();
        setupDeliveryOptionSelection(); // Keep for delivery radio logic
        setupPaymentOptionSelection(); // New function for payment radio logic
        setupActionButtons();
        updateOrderSummary(); // Call this to fill XXs on load

        // Ensure Credit Card details are shown by default if it's checked
        const initialPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (initialPaymentMethod) {
            hideAllPaymentDetailsContent(); // Hide all first
            const contentId = initialPaymentMethod.value + 'DetailsContent';
            const contentElement = document.getElementById(contentId);
            if (contentElement) contentElement.style.display = 'block'; // Show default
        }
    }

    // Function to handle step navigation (accordion-like)
    function setupStepNavigation() {
        const steps = document.querySelectorAll('.checkout-step');
        
        steps.forEach(step => {
            const title = step.querySelector('.step-title');
            if (title) {
                title.addEventListener('click', function() {
                    // Deactivate all steps and hide content
                    steps.forEach(s => {
                        s.classList.remove('active');
                        const content = s.querySelector('.step-content');
                        if (content) content.style.display = 'none';
                    });

                    // Activate the clicked step and show its content
                    step.classList.add('active');
                    const content = step.querySelector('.step-content');
                    if (content) content.style.display = 'block';
                });
            }
        });
    }

    // Function to handle delivery option selection (radio buttons)
    function setupDeliveryOptionSelection() {
        const deliveryRadios = document.querySelectorAll('input[name="deliveryOption"]');
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                console.log('Selected delivery option:', this.value);
                updateOrderSummary();
            });
        });
    }

    // New: Function to handle payment option selection
    function setupPaymentOptionSelection() {
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                hideAllPaymentDetailsContent(); // Hide all detail sections
                const contentId = this.value + 'DetailsContent'; // Construct ID based on radio value
                const contentElement = document.getElementById(contentId);
                if (contentElement) {
                    contentElement.style.display = 'block'; // Show the selected one
                }
            });
        });
    }

    // Helper to hide all payment details content
    function hideAllPaymentDetailsContent() {
        document.querySelectorAll('.payment-details-content').forEach(content => {
            content.style.display = 'none';
        });
    }

    // Function to handle various action buttons
    function setupActionButtons() {
        const continueToPaymentBtn = document.getElementById('continueToPaymentBtn');
        const editAddressBtn = document.getElementById('editAddressBtn');
        const registerAddressBtn = document.getElementById('registerAddressBtn');
        const continueToOrderSummaryBtn = document.getElementById('continueToOrderSummaryBtn'); // New button
        const placeOrderBtn = document.getElementById('placeOrderBtn'); // New button

        if (continueToPaymentBtn) {
            continueToPaymentBtn.addEventListener('click', function() {
                const deliveryStep = document.getElementById('deliveryOptionStep');
                const paymentStep = document.getElementById('paymentOptionStep');

                if (deliveryStep && paymentStep) {
                    deliveryStep.classList.remove('active');
                    deliveryStep.querySelector('.step-content').style.display = 'none';

                    paymentStep.classList.add('active');
                    paymentStep.querySelector('.step-content').style.display = 'block';
                }
            });
        }

        if (editAddressBtn) {
            editAddressBtn.addEventListener('click', function() {
                alert('Edit address functionality would be implemented here.');
            });
        }

        if (registerAddressBtn) {
            registerAddressBtn.addEventListener('click', function() {
                alert('Register a new address functionality would be implemented here.');
            });
        }

        if (continueToOrderSummaryBtn) {
            continueToOrderSummaryBtn.addEventListener('click', function() {
                const paymentStep = document.getElementById('paymentOptionStep');
                const orderSummaryStep = document.getElementById('orderFinalSummaryStep');

                if (paymentStep && orderSummaryStep) {
                    paymentStep.classList.remove('active');
                    paymentStep.querySelector('.step-content').style.display = 'none';

                    orderSummaryStep.classList.add('active');
                    orderSummaryStep.querySelector('.step-content').style.display = 'block';
                    // You might dynamically populate the final order summary here
                    // e.g., orderSummaryStep.querySelector('.step-content').innerHTML = "Review of your order...";
                }
            });
        }

        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', function() {
                alert('Order Placed Successfully! Navigating to Track Order page.');
                // Save checked out products and delivery type for track page
                localStorage.setItem('last_checkout_items', localStorage.getItem('cart_items') || '[]');
                const selectedDeliveryOption = document.querySelector('input[name="deliveryOption"]:checked');
                localStorage.setItem('last_checkout_delivery', selectedDeliveryOption ? selectedDeliveryOption.value : 'ship');
                // Clear cart after successful order
                localStorage.removeItem('cart_items');
                localStorage.setItem('bagItems', 0); // Reset bag count
                window.location.href = 'track.html'; // Navigate to track.html
            });
        }
    }

    // Function to format numbers to price string (e.g., Rp1.234.567)
    function formatPrice(number) {
        return 'Rp' + number.toLocaleString('id-ID');
    }

    // --- Function to update the order summary with calculated values ---
    function updateOrderSummary() {
        // Always get latest cart items from localStorage for sync
        let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');

        const summaryItemCountElement = document.getElementById('summaryItemCount');
        const itemsSubtotalValueElement = document.getElementById('itemsSubtotalValue');
        const deliveryCostRow = document.querySelector('.order-summary-section .summary-row:nth-child(3)');
        const deliveryCostValueElement = document.getElementById('deliveryCostValue');
        const vatIncludedValueElement = document.getElementById('vatIncludedValue');
        const orderTotalValueElement = document.getElementById('orderTotalValue');

        let currentBagItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        let calculatedItemsSubtotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);

        let deliveryCost = 0;
        const selectedDeliveryOption = document.querySelector('input[name="deliveryOption"]:checked');
        if (selectedDeliveryOption && selectedDeliveryOption.value === 'ship') {
            deliveryCost = 12000;
            if (deliveryCostRow) deliveryCostRow.style.display = '';
        } else {
            if (deliveryCostRow) deliveryCostRow.style.display = 'none';
        }

        let calculatedSubtotal = calculatedItemsSubtotal + deliveryCost;
        const vatPercentage = 0.11;
        let calculatedVatAmount = calculatedSubtotal * vatPercentage;
        let calculatedOrderTotal = calculatedSubtotal + calculatedVatAmount;

        if (summaryItemCountElement) summaryItemCountElement.textContent = currentBagItemsCount;
        if (itemsSubtotalValueElement) itemsSubtotalValueElement.textContent = formatPrice(calculatedItemsSubtotal);
        if (deliveryCostValueElement) deliveryCostValueElement.textContent = deliveryCost > 0 ? formatPrice(deliveryCost) : '';
        if (vatIncludedValueElement) vatIncludedValueElement.textContent = formatPrice(calculatedVatAmount);
        if (orderTotalValueElement) orderTotalValueElement.textContent = formatPrice(calculatedOrderTotal);

        bagCount.textContent = currentBagItemsCount;
        localStorage.setItem('bagItems', currentBagItemsCount);
    }

    // Panggil fungsi inisialisasi utama
    initializeCheckoutInteractions();

    // Highlight navbar active (common across pages)
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
            const productId = currentUrlParams.get('id');
            const product = ALL_PRODUCTS_DATA.find(p => p.id === productId);
            if (product && linkCatParam === product.category) {
                link.classList.add('active');
            }
        } else if (path.endsWith('checkout.html')) {
            if (linkPath.endsWith('checkout.html')) { // Or check its purpose
                link.classList.add('active');
            }
        }
    });

    console.log("Checkout page interactivity loaded!");
});

window.addEventListener('DOMContentLoaded', () => {
    updateOrderSummary();
    renderOrderSummary();
});

function renderOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart_items') || '[]');
    const container = document.querySelector('.order-summary-section');
    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    let subtotal = 0;
    let itemsHTML = '';
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        itemsHTML += `
            <div class="summary-row">
                <span>${item.name} (${item.size}, ${item.color}) x${item.quantity}</span>
                <span>Rp${(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
        `;
    });
    // Example VAT and shipping
    const vat = Math.round(subtotal * 0.11);
    const shipping = 0; // Free shipping
    const total = subtotal + vat + shipping;
    container.innerHTML = `
        <h2 class="summary-title">ORDER SUMMARY</h2>
        ${itemsHTML}
        <hr class="summary-divider">
        <div class="summary-row">
            <span>Subtotal</span>
            <span>Rp${subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div class="summary-row">
            <span>VAT (11%)</span>
            <span>Rp${vat.toLocaleString('id-ID')}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : 'Rp' + shipping.toLocaleString('id-ID')}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>Rp${total.toLocaleString('id-ID')}</span>
        </div>
    `;
}