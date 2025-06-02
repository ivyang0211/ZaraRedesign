document.addEventListener('DOMContentLoaded', () => {
    // --- Header & Navbar Interactions (Copied from homepage.js for consistency) ---
    const searchIcon = document.getElementById('searchIcon');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchButton = document.getElementById('closeSearch');
    const favCount = document.getElementById('favCount');
    const bagCount = document.getElementById('bagCount');

    let favorites = 0; // In a real app, this would be loaded from user data
    let bagItems = 0; // In a real app, this would be loaded from user data

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
        shoppingCartIcon.addEventListener('click', () => alert(`You have ${bagItems} items in your shopping bag.`));
    }

    const favoritesIcon = document.querySelector('.heart-icon');
    if (favoritesIcon) {
        favoritesIcon.addEventListener('click', () => alert(`You have ${favorites} items in your favorites.`));
    }


    // --- Product Detail Page Interactions ---

    // Quantity Selector
    const decreaseQtyBtn = document.getElementById('decreaseQty');
    const increaseQtyBtn = document.getElementById('increaseQty');
    const productQtyDisplay = document.getElementById('productQty');
    let currentQty = parseInt(productQtyDisplay.textContent);

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

    // Color Selection
    const colorSwatches = document.querySelectorAll('.color-swatches .swatch');
    const selectedColorDisplay = document.getElementById('selectedColor');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active')); // Deactivate all
            swatch.classList.add('active'); // Activate clicked
            selectedColorDisplay.textContent = swatch.dataset.label; // Update text
            // In a real app, you might update the main product image based on selected color
        });
    });

    // Size Selection
    const sizeBoxes = document.querySelectorAll('.size-options .size-box');
    const selectedSizeDisplay = document.getElementById('selectedSize');

    sizeBoxes.forEach(box => {
        box.addEventListener('click', () => {
            sizeBoxes.forEach(b => b.classList.remove('active')); // Deactivate all
            box.classList.add('active'); // Activate clicked
            selectedSizeDisplay.textContent = box.dataset.size; // Update text
        });
    });

    // Add to Cart Button (Placeholder)
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
        const selectedColor = document.querySelector('.color-swatches .swatch.active')?.dataset.label || 'Not selected';
        const selectedSize = document.querySelector('.size-options .size-box.active')?.dataset.size || 'Not selected';
        const productName = document.querySelector('.product-name').textContent;

        if (selectedColor === 'Not selected' || selectedSize === 'Not selected') {
            alert('Please select a color and size before adding to cart.');
            return;
        }

        bagItems += currentQty; // Increment bag counter
        bagCount.textContent = bagItems;
        alert(`${currentQty} x "${productName}" (${selectedColor}, ${selectedSize}) added to cart!`);
        // In a real app, you'd send this data to a backend or update a cart object
    });

   // Heart Icon (Add to Favorites) on Product Page
    const productPageHeartIcon = document.querySelector('.heart-product-page');
    if (productPageHeartIcon) {
        productPageHeartIcon.addEventListener('click', () => {
            const isFavorited = productPageHeartIcon.classList.toggle('favorited');
            if (isFavorited) {
                favorites++;
                alert('Added to favorites!');
            } else {
                favorites = Math.max(0, favorites - 1);
                alert('Removed from favorites!');
            }
            favCount.textContent = favorites;
        });
    }

    // Accordion Functionality for Product Details & Sizing Guide
    document.querySelectorAll('.info-accordion').forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');
        const icon = accordion.querySelector('.accordion-icon');

        header.addEventListener('click', () => {
            header.classList.toggle('active'); // Toggle active class on header
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Expand
            }
        });
    });


    // Similar Products Heart Icon (replicated from homepage.js)
    document.querySelectorAll('.similar-products-section .product-card').forEach(card => {
        const heartIcon = card.querySelector('.product-card-heart-small');
        if (heartIcon) {
            heartIcon.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card click event from firing
                const isFavorited = heartIcon.classList.toggle('favorited');
                if (isFavorited) {
                    favorites++;
                    console.log('Similar product added to favorites!');
                } else {
                    favorites = Math.max(0, favorites - 1);
                    console.log('Similar product removed from favorites!');
                }
                favCount.textContent = favorites;
            });
        }
    });

    console.log("Catalogue page interactivity loaded!");
});