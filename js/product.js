document.addEventListener('DOMContentLoaded', () => {
    // --- Header & Navbar Interactions (Copied for consistency) ---
    const searchIcon = document.getElementById('searchIcon');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchButton = document.getElementById('closeSearch');
    const headerSearchInput = document.getElementById('headerSearchInput'); // Added for potential use
    const overlaySearchInput = document.querySelector('.search-input-overlay'); // More specific selector

    const favCountEl = document.getElementById('favCount'); // Renamed for clarity
    const bagCountEl = document.getElementById('bagCount'); // Renamed for clarity

    let favorites = 0; // In a real app, this would be loaded from user data
    let bagItems = 0; // In a real app, this would be loaded from user data

    // Update counts initially if needed (e.g., from localStorage)
    if (favCountEl) favCountEl.textContent = favorites;
    if (bagCountEl) bagCountEl.textContent = bagItems;


    if (searchIcon && searchOverlay && overlaySearchInput) {
        searchIcon.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            overlaySearchInput.focus(); // Focus the overlay input
        });
    }
    
    if (closeSearchButton && searchOverlay) {
        closeSearchButton.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            // Close if clicked outside the input area (i.e., on the overlay itself)
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            }
        });
    }


    const logInText = document.querySelector('.log-in-text');
    const profileIcon = document.querySelector('.profile-icon');
    const userInteractionHandler = () => alert('Redirecting to Log In / Register page...');

    if (logInText) logInText.addEventListener('click', userInteractionHandler);
    if (profileIcon) profileIcon.addEventListener('click', userInteractionHandler);


    const shoppingCartIcon = document.querySelector('.bag-icon');
    if (shoppingCartIcon && bagCountEl) {
        shoppingCartIcon.addEventListener('click', () => {
            // In a real app, this would likely redirect to a cart page
            alert(`You have ${bagCountEl.textContent} items in your shopping bag.`);
        });
    }

    const favoritesIcon = document.querySelector('.heart-icon');
    if (favoritesIcon && favCountEl) {
        favoritesIcon.addEventListener('click', () => {
            // In a real app, this would likely redirect to a favorites page
            alert(`You have ${favCountEl.textContent} items in your favorites.`);
        });
    }


    // --- Product Listing Page Specific Interactions ---

    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortOptionsList = document.querySelector('.sort-options-list');
    const sortLabel = document.getElementById('sortLabel');

    if (sortDropdown && sortOptionsList && sortLabel) {
        sortDropdown.addEventListener('click', (event) => {
            event.stopPropagation();
            const isActive = sortOptionsList.classList.toggle('active');
            // Close other active filter dropdowns
            document.querySelectorAll('.filter-content.active').forEach(content => {
                content.classList.remove('active');
                content.closest('.filter-dropdown').classList.remove('active');
            });
            // Aria-expanded for accessibility
            sortDropdown.setAttribute('aria-expanded', isActive.toString());
        });

        sortOptionsList.addEventListener('click', (event) => {
            const targetOption = event.target.closest('.sort-option');
            if (targetOption) {
                sortLabel.textContent = targetOption.textContent;
                sortOptionsList.querySelectorAll('.sort-option').forEach(option => option.classList.remove('active'));
                targetOption.classList.add('active');
                sortOptionsList.classList.remove('active');
                sortDropdown.setAttribute('aria-expanded', 'false');
                console.log('Sorting by:', targetOption.dataset.sort);
                // Add actual sorting logic here
            }
        });
    }

    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        // Make the entire dropdown header clickable (label + icon)
        const clickableHeader = dropdown.querySelector('.filter-label, .filter-icon');
        // If only label/icon is desired, use that. For broader click, use dropdown itself, but be careful with nested clicks.
        // Let's make the div itself the primary click target for toggling.
        const content = dropdown.querySelector('.filter-content');

        if (dropdown && content) { // Ensure both exist
            dropdown.addEventListener('click', function(event) { // Use 'this' for the dropdown
                // Prevent toggling if a checkbox or label inside the content is clicked
                if (content.contains(event.target) && event.target.tagName !== 'LABEL' && event.target.tagName !== 'INPUT') {
                    return;
                }
                if (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') {
                     // Allow checkbox interaction without closing
                } else {
                    event.stopPropagation(); // Prevent document click from closing immediately
                }


                const isActive = content.classList.toggle('active');
                this.classList.toggle('active', isActive); // Add/remove 'active' on parent based on content
                this.setAttribute('aria-expanded', isActive.toString());


                // Close other dropdowns
                if (isActive) { // If this one was opened
                    if (sortOptionsList) sortOptionsList.classList.remove('active');
                    if (sortDropdown) sortDropdown.setAttribute('aria-expanded', 'false');

                    document.querySelectorAll('.filter-dropdown').forEach(otherDropdown => {
                        if (otherDropdown !== this) { // 'this' refers to the current dropdown
                            otherDropdown.querySelector('.filter-content').classList.remove('active');
                            otherDropdown.classList.remove('active');
                            otherDropdown.setAttribute('aria-expanded', 'false');
                        }
                    });
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (sortDropdown && sortOptionsList && !sortDropdown.contains(event.target)) {
            sortOptionsList.classList.remove('active');
            sortDropdown.setAttribute('aria-expanded', 'false');
        }
        document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.querySelector('.filter-content').classList.remove('active');
                dropdown.classList.remove('active');
                dropdown.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Handle filter checkbox changes
    document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedFilters = {};
            document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                const filterType = dropdown.id.replace('Filter', '').toLowerCase(); // e.g., size, color, price
                const checkedInputs = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked'));
                if (checkedInputs.length > 0) {
                    selectedFilters[filterType] = checkedInputs.map(cb => cb.value);
                }
            });
            console.log('Active Filters:', selectedFilters);
            // Add actual filtering logic here
        });
    });


    // Product Card Interactivity
    document.querySelectorAll('.product-card').forEach(card => {
        const heartIcon = card.querySelector('.product-card-heart');
        const colorSwatches = card.querySelectorAll('.color-swatches .swatch');
        const productLinkAnchor = card.querySelector('a'); // The main link of the card

        if (heartIcon && favCountEl) {
            heartIcon.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent navigation if heart is part of the link
                event.stopPropagation();
                const isFavorited = heartIcon.classList.toggle('favorited');
                if (isFavorited) {
                    favorites++;
                } else {
                    favorites = Math.max(0, favorites - 1); // Ensure favorites don't go below 0
                }
                favCountEl.textContent = favorites;
                // Add to actual favorites list logic here
            });
        }

        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent navigation
                event.stopPropagation();
                // Remove 'active' from sibling swatches within the same card
                swatch.closest('.color-swatches').querySelectorAll('.swatch').forEach(el => el.classList.remove('active'));
                swatch.classList.add('active');
                // Potentially update product image or variant based on color
                console.log(`Selected color for product: ${swatch.dataset.color}`);
            });
        });

        // Make the whole card clickable (if it has a link)
        // This is now handled by the <a> tag wrapping the image, which is good.
        // If you want text parts to also be clickable and navigate, ensure they are inside the <a>
        // or add a separate event listener to the card that triggers the link.
        // The current HTML structure has the image wrapped in <a>.
        // For better UX, often the entire card acts as a hit target for the primary link.
        if (productLinkAnchor) {
            card.addEventListener('click', (event) => {
                // Make sure the click is not on an interactive element like swatch or heart
                if (event.target.closest('.product-card-heart') || event.target.closest('.swatch')) {
                    return;
                }
                window.location.href = productLinkAnchor.href;
            });
        }
    });

    console.log("Product page interactivity loaded!");
});