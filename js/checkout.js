// File: js/checkout.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menginisialisasi semua interaksi di halaman checkout
    function initializeCheckoutInteractions() {
        setupStepNavigation();
        setupDeliveryOptionSelection();
        setupActionButtons();
    }

    // Fungsi untuk menangani navigasi antar langkah checkout
    function setupStepNavigation() {
        const steps = document.querySelectorAll('.checkout-step');
        const continuePaymentBtn = document.querySelector('.continue-payment-btn');

        // Sembunyikan konten semua step kecuali yang pertama (jika belum di-handle CSS)
        steps.forEach((step, index) => {
            const content = step.querySelector('.step-content');
            if (index > 0 && content) { // Biarkan step pertama terbuka
                // content.style.display = 'none'; // Ini sudah di-handle di HTML dengan inline style
            }
        });

        if (continuePaymentBtn) {
            continuePaymentBtn.addEventListener('click', function() {
                // Asumsi: Setelah klik "CONTINUE TO PAYMENT", step 1 selesai, step 2 aktif
                const deliveryStep = document.getElementById('deliveryOptionStep');
                const paymentStep = document.getElementById('paymentOptionStep');

                if (deliveryStep && paymentStep) {
                    deliveryStep.classList.remove('active');
                    deliveryStep.querySelector('.step-content').style.display = 'none'; // Sembunyikan konten step 1

                    paymentStep.classList.add('active');
                    paymentStep.querySelector('.step-content').style.display = 'block'; // Tampilkan konten step 2
                }
                // Di sini Anda akan menambahkan validasi untuk step 1 sebelum melanjutkan
            });
        }

        // Opsi: Izinkan klik pada judul step untuk navigasi (jika diinginkan)
        steps.forEach(step => {
            const title = step.querySelector('.step-title');
            if (title) {
                title.addEventListener('click', function() {
                    // Hanya izinkan navigasi ke step yang sudah "selesai" atau step saat ini
                    // Untuk contoh ini, kita buat sederhana: toggle active
                    // Dalam aplikasi nyata, Anda perlu logika yang lebih kompleks
                    
                    // Nonaktifkan semua step lain
                    steps.forEach(s => {
                        s.classList.remove('active');
                        s.querySelector('.step-content').style.display = 'none';
                    });

                    // Aktifkan step yang diklik
                    step.classList.add('active');
                    step.querySelector('.step-content').style.display = 'block';
                });
            }
        });
    }

    // Fungsi untuk menangani pemilihan opsi pengiriman
    function setupDeliveryOptionSelection() {
        const deliveryRadios = document.querySelectorAll('input[name="deliveryOption"]');
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Contoh: tampilkan detail yang relevan atau ubah status
                console.log('Selected delivery option:', this.value);
                // Anda bisa menambahkan logika untuk menampilkan/menyembunyikan detail alamat
                // atau biaya pengiriman berdasarkan pilihan.
            });
        });
    }

    // Fungsi untuk menangani tombol aksi lainnya
    function setupActionButtons() {
        const editAddressBtn = document.querySelector('.edit-address-btn');
        const registerAddressBtn = document.querySelector('.register-address-btn');

        if (editAddressBtn) {
            editAddressBtn.addEventListener('click', function() {
                // Mock: Tampilkan form edit alamat atau modal
                alert('Functionality to edit address would be here.');
                console.log('Edit address button clicked.');
            });
        }

        if (registerAddressBtn) {
            registerAddressBtn.addEventListener('click', function() {
                // Mock: Arahkan ke halaman registrasi alamat atau tampilkan modal
                alert('Functionality to register a new address would be here.');
                console.log('Register new address button clicked.');
            });
        }
        
        // Tambahkan listener untuk tombol "Continue to Order Summary" jika ada di step pembayaran
        // dan tombol "Place Order" di step ringkasan.
    }

    // Panggil fungsi inisialisasi utama
    initializeCheckoutInteractions();
});
