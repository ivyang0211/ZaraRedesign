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

    // Struktur data produk
    const products = [
        {
            id: 1,
            name: "Flowing Wide-leg Trousers",
            price: 749000,
            category: "WOMAN",
            image: "assets/clothes1.jpg",
            colors: ["black", "white", "green", "blue"],
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
            description: "Celana wanita dengan bahan nyaman dan potongan wide-leg.",
        },
        {
            id: 2,
            name: "Striped Midi Skirt",
            price: 699900,
            category: "WOMAN",
            image: "assets/clothes11.jpg",
            colors: ["black", "white", "red"],
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
            description: "Rok midi motif garis, cocok untuk acara formal dan kasual.",
        },
        {
            id: 3,
            name: "Men's Casual Shirt",
            price: 499900,
            category: "MAN",
            image: "assets/clothes21.jpg",
            colors: ["blue", "white", "gray"],
            sizes: ["S", "M", "L", "XL", "XXL"],
            description: "Kemeja pria lengan panjang bahan katun.",
        },
        {
            id: 4,
            name: "Kids Graphic Tee",
            price: 199900,
            category: "KIDS",
            image: "assets/kids1.jpg",
            colors: ["yellow", "green", "white"],
            sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
            description: "Kaos anak dengan motif lucu dan bahan adem.",
        },
        // Tambahkan produk lain sesuai kebutuhan
    ];

    // Simpan semua produk ke localStorage agar bisa diakses dari product.js
    localStorage.setItem('allProducts', JSON.stringify(products));

    function renderProducts(category = "ALL") {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = '';
        let filtered = category === "ALL" ? products : products.filter(p => p.category === category);
        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img class="product-thumbnail" src="${product.image}" alt="${product.name}" data-id="${product.id}">
                <div class="color-swatches-small">
                    ${product.colors.map(c => `<div class='swatch-small' data-color='${c}'></div>`).join('')}
                </div>
                <p class="product-meta product-category">${product.category}</p>
                <p class="product-meta product-name">${product.name}</p>
                <p class="product-meta product-price">Rp${product.price.toLocaleString('id-ID')}</p>
                <p class="product-meta product-size-small">${product.sizes.join(', ')}</p>
                <img class="product-card-heart-small" src="assets/heartIcon.svg" alt="Add to Favorites">
            `;
            // Saat klik produk, arahkan ke product.html dengan parameter kategori dan id produk
            card.querySelector('.product-thumbnail').addEventListener('click', () => {
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = `product.html?cat=${product.category}&id=${product.id}`;
            });
            grid.appendChild(card);
        });
    }

    // Ambil data produk dari localStorage jika ada
    // Ambil semua produk dari localStorage, atau generate jika belum ada
    let allProducts = JSON.parse(localStorage.getItem('allProducts'));
    if (!allProducts || allProducts.length === 0) {
        allProducts = [
            // WOMAN: clothes1 - clothes16
            ...Array.from({length: 16}, (_, i) => ({
                id: i + 1,
                name: `WOMAN Product ${i + 1}`,
                price: 499000 + (i * 20000),
                category: "WOMAN",
                image: `assets/clothes${i + 1}.jpg`,
                colors: ["black", "white", "beige", "blue"],
                sizes: ["XS-3XL"],
                description: `Deskripsi produk WOMAN ${i + 1}`
            })),
            // MAN: clothes30 - clothes45
            ...Array.from({length: 16}, (_, i) => ({
                id: 100 + i + 1,
                name: `MAN Product ${i + 1}`,
                price: 399000 + (i * 25000),
                category: "MAN",
                image: `assets/clothes${30 + i}.jpg`,
                colors: ["navy", "gray", "black", "white"],
                sizes: ["XS-3XL"],
                description: `Deskripsi produk MAN ${i + 1}`
            })),
            // KIDS: kids1 - kids17
            ...Array.from({length: 17}, (_, i) => ({
                id: 200 + i + 1,
                name: `KIDS Product ${i + 1}`,
                price: 199000 + (i * 10000),
                category: "KIDS",
                image: `assets/kids${i + 1}.jpg`,
                colors: ["yellow", "green", "white", "blue"],
                sizes: ["XS-3XL"],
                description: `Deskripsi produk KIDS ${i + 1}`
            })),
        ];
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    document.addEventListener('DOMContentLoaded', () => {
        let cat = getQueryParam('cat') || 'ALL';
        const id = getQueryParam('id');
        if (id) {
            // Individual product view
            // Cari produk hanya berdasarkan id saja, tidak perlu cek kategori
            const product = allProducts.find(p => String(p.id) === String(id));
            if (product) {
                // Render detail produk (ganti isi .catalogue-main-content)
                const main = document.querySelector('.catalogue-main-content');
                main.innerHTML = `
                    <div class="product-image-gallery">
                        <img class="product-main-image" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info-column">
                        <h1 class="product-name">${product.name}</h1>
                        <p class="product-price">Rp${product.price.toLocaleString('id-ID')}</p>
                        <div class="product-options">
                            <div class="option-group color-option-group">
                                <p class="option-label">COLOR: <span id="selectedColor">${product.colors[0].toUpperCase()}</span></p>
                                <div class="color-swatches">
                                    ${product.colors.map((c, i) => `<div class='swatch${i===0?' active':''}' data-color='${c}' data-label='${c.toUpperCase()}' style='background:${c}'></div>`).join('')}
                                </div>
                            </div>
                            <div class="option-group size-option-group">
                                <p class="option-label">SIZE: <span id="selectedSize">${product.sizes[0]}</span></p>
                                <div class="size-options">
                                    ${product.sizes.map((s, i) => `<div class='size-box${i===0?' active':''}' data-size='${s}'>${s}</div>`).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="add-to-cart-section">
                            <button class="add-to-cart-btn">ADD TO CART</button>
                            <img class="heart-product-page" src="assets/heartIcon.svg" alt="Add to Favorites">
                        </div>
                        <div class="product-info-details">
                            <div class="info-accordion">
                                <div class="accordion-header">PRODUCT DETAIL <span class="accordion-icon">+</span></div>
                                <div class="accordion-content">${product.description}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            // Jika tidak ada id, tampilkan pesan saja
            document.querySelector('.catalogue-main-content').innerHTML = '<p>Produk tidak ditemukan. <a href="product.html?cat='+cat+'">Kembali ke produk</a></p>';
        }
        // Render grid view jika tidak ada id di URL
        function renderProducts(category = "ALL") {
            const grid = document.getElementById('productGrid');
            if (!grid) return;
            grid.innerHTML = '';
            let filtered = category === "ALL" ? allProducts : allProducts.filter(p => p.category === category);
            filtered.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img class="product-thumbnail" src="${product.image}" alt="${product.name}" data-id="${product.id}">
                    <div class="color-swatches">
                        ${product.colors.map(c => `<div class='swatch' data-color='${c}'></div>`).join('')}
                    </div>
                    <div class="product-info-line">
                        <p class="product-meta product-category">${product.category}</p>
                        <p class="product-meta product-size">${product.sizes[0]}</p>
                    </div>
                    <p class="product-meta product-name">${product.name}</p>
                    <p class="product-meta product-price">Rp${product.price.toLocaleString('id-ID')}</p>
                    <img class="product-card-heart" src="assets/heartIcon.svg" alt="Add to Favorites">
                `;
                card.querySelector('.product-thumbnail').addEventListener('click', () => {
                    localStorage.setItem('selectedProduct', JSON.stringify(product));
                    window.location.href = `catalogue.html?cat=${product.category}&id=${product.id}`;
                });
                grid.appendChild(card);
            });
        }

        renderProducts(cat);
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = `catalogue.html?cat=${btn.dataset.category}`;
            });
        });

        console.log("Catalogue page interactivity loaded!");
    });

    // Highlight navbar active
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const navLinks = document.querySelectorAll('.main-nav .nav-item');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (path.endsWith('home.html') && link.href.includes('home.html')) link.classList.add('active');
        else if ((path.endsWith('product.html') || path.endsWith('catalogue.html')) && cat && link.href.includes(cat)) link.classList.add('active');
        else if (path.endsWith('product.html') && !cat && link.href.includes('product.html')) link.classList.add('active');
        else if (path.endsWith('catalogue.html') && !cat && link.href.includes('catalogue.html')) link.classList.add('active');
    });
});