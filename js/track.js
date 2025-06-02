// File: js/track.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menginisialisasi semua interaksi di halaman lacak pesanan
    function initializeTrackOrderInteractions() {
        setupBackButton();
        // Interaktivitas progress bar utama dikendalikan oleh CSS (animasi)
        // dan kelas .active/.completed pada HTML.
        // JavaScript akan digunakan di aplikasi nyata untuk *mengatur* kelas-kelas ini
        // secara dinamis berdasarkan data status pesanan dari server.
        // Contoh:
        // updateOrderStatusFromServer(); 
    }

    // Fungsi untuk tombol kembali
    function setupBackButton() {
        const backLink = document.querySelector('.back-link');
        if (backLink) {
            backLink.addEventListener('click', function(event) {
                event.preventDefault(); // Mencegah perilaku default jika ini adalah tautan '#'
                history.back(); // Kembali ke halaman sebelumnya dalam riwayat browser
            });
        }
    }

    /*
    // Contoh fungsi (tidak aktif) untuk memperbarui status pesanan secara dinamis
    function updateOrderStatusFromServer() {
        // Misalkan Anda mengambil data status dari API
        // const orderStatus = fetchOrderStatusAPI(); 
        const orderStatus = "IN TRANSIT"; // Contoh data statis

        const steps = document.querySelectorAll('.progress-step');
        const connectors = document.querySelectorAll('.progress-connector');
        const statusMap = ["ORDER PLACED", "ORDER PACKED", "IN TRANSIT", "OUT OF DELIVERY", "DELIVERED"];
        
        let currentStatusIndex = statusMap.indexOf(orderStatus.toUpperCase());

        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            const label = step.querySelector('.progress-label').textContent.trim().toUpperCase();
            if (index < currentStatusIndex) {
                step.classList.add('completed');
            } else if (index === currentStatusIndex) {
                step.classList.add('active');
            }
        });
        
        connectors.forEach((connector, index) => {
            connector.classList.remove('active', 'completed');
            if (index < currentStatusIndex) {
                connector.classList.add('completed'); // Atau 'active' jika ingin konektor sebelum tahap aktif juga menyala
            }
        });
    }
    */

    // Panggil fungsi inisialisasi utama
    initializeTrackOrderInteractions();
});
