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
    initializeCartInteractions();
    checkEmptyCart(); // Periksa saat load juga
});
