document.addEventListener('DOMContentLoaded', () => {
    // --- Header & Navbar Interactions ---
    const searchIcon = document.getElementById('searchIcon'); // This is now the header search icon
    const headerSearchInput = document.getElementById('headerSearchInput'); // New: input field in header
    const searchOverlay = document.getElementById('searchOverlay'); // Full-screen overlay
    const closeSearchButton = document.getElementById('closeSearch');
    const favCount = document.getElementById('favCount');
    const bagCount = document.getElementById('bagCount');

    let favorites = 0;
    let bagItems = 0;

    // Toggle full-screen search overlay
    // The search icon in the header now triggers the full-screen overlay,
    // not just the input field next to it.
    searchIcon.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is active
        document.querySelector('.search-input-overlay').focus(); // Focus on the overlay input
    });

    closeSearchButton.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close search overlay when clicking outside (on the overlay itself)
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle "Log In" click (placeholder)
    const logInText = document.querySelector('.log-in-text');
    const profileIcon = document.querySelector('.profile-icon'); // New: Target the profile icon

    if (logInText) {
        logInText.addEventListener('click', () => {
            alert('Redirecting to Log In / Register page...'); // Replace with actual login page redirect
            // window.location.href = 'login.html';
        });
    }
    if (profileIcon) {
        profileIcon.addEventListener('click', () => {
            alert('Redirecting to Log In / Register page...'); // Replace with actual login page redirect
            // window.location.href = 'login.html';
        });
    }


    // Handle Shopping Cart click (placeholder)
    const shoppingCartIcon = document.querySelector('.bag-icon');
    if (shoppingCartIcon) {
        shoppingCartIcon.addEventListener('click', () => {
            alert(`You have ${bagItems} items in your shopping bag.`);
            // window.location.href = 'cart.html'; // Redirect to cart page
        });
    }

    // Handle Favorites icon click (placeholder)
    const favoritesIcon = document.querySelector('.heart-icon');
    if (favoritesIcon) {
        favoritesIcon.addEventListener('click', () => {
            alert(`You have ${favorites} items in your favorites.`);
            // window.location.href = 'favorites.html'; // Redirect to favorites page
        });
    }


    // --- Product Component Interactions ---
    document.querySelectorAll('.product-card').forEach(card => {
        const heartIcon = card.querySelector('.product-card-heart');
        const colorSwatches = card.querySelectorAll('.swatch');
        const productNameElement = card.querySelector('.product-name');

        // Toggle favorite status
        if (heartIcon) {
            heartIcon.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card click event from firing
                const isFavorited = heartIcon.classList.toggle('favorited');
                if (isFavorited) {
                    favorites++;
                    console.log('Added to favorites!');
                } else {
                    favorites = Math.max(0, favorites - 1); // Ensure it doesn't go below 0
                    console.log('Removed from favorites!');
                }
                favCount.textContent = favorites;
            });
        }

        // Highlight active color swatch
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card click event from firing
                // Remove 'active' from all swatches in this card
                colorSwatches.forEach(el => el.classList.remove('active'));
                // Add 'active' to the clicked swatch
                swatch.classList.add('active');
                console.log(`Selected color: ${swatch.dataset.color}`);
                // In a real scenario, you'd update the product image based on the selected color
            });
        });

        // Add to Bag functionality (simulated by clicking product name)
        if (productNameElement) {
            productNameElement.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card click event from firing
                bagItems++;
                bagCount.textContent = bagItems;
                alert(`"${productNameElement.textContent}" added to bag! Total items: ${bagItems}`);
            });
        }

        // Handle entire product card click
        card.addEventListener('click', () => {
            const productLink = card.querySelector('a');
            if (productLink && productLink.href) {
                window.location.href = productLink.href; // Navigate to catalogue.html
            }
        });
    });

    console.log("Zara homepage interactivity loaded!");
});