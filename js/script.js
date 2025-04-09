document.addEventListener('DOMContentLoaded', () => {
    // Animasi untuk elemen yang masuk
    const elements = document.querySelectorAll('.animate-fadeIn');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Form Booking
    const bookingForm = document.getElementById('bookingForm');
    const konfirmasi = document.getElementById('konfirmasi');
    const loading = document.getElementById('loading');
    const namaError = document.getElementById('namaError');
    const teleponError = document.getElementById('teleponError');
    const kendaraanError = document.getElementById('kendaraanError');
    const waktuError = document.getElementById('waktuError');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

        
            [namaError, teleponError, kendaraanError, waktuError].forEach(error => error.classList.add('hidden'));
            konfirmasi.classList.add('hidden');
            loading.classList.remove('hidden');

            
            const nama = document.getElementById('nama').value.trim();
            if (!nama) {
                namaError.classList.remove('hidden');
                isValid = false;
            }

            const telepon = document.getElementById('telepon').value.trim();
            if (!/^\d+$/.test(telepon)) {
                teleponError.classList.remove('hidden');
                isValid = false;
            }

            const jeniskendaraan = document.getElementById('jeniskendaraan').value;
            if (!jeniskendaraan) {
                kendaraanError.classList.remove('hidden');
                isValid = false;
            }

            const waktu = document.getElementById('waktu').value;
            if (!waktu) {
                waktuError.classList.remove('hidden');
                isValid = false;
            }

            if (isValid) {
                setTimeout(() => {
                    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                    bookings.push({ nama, telepon, jeniskendaraan, waktu });
                    localStorage.setItem('bookings', JSON.stringify(bookings));

                    konfirmasi.classList.remove('hidden');
                    konfirmasi.innerHTML = `
                        <div class="bg-green-100 p-4 rounded-lg">
                            <h3 class="font-bold">Terima kasih, ${nama}!</h3>
                            <p>Pemesanan Anda telah disimpan dengan detail berikut:</p>
                            <ul class="list-disc pl-5 mt-2">
                                <li><strong>Nama:</strong> ${nama}</li>
                                <li><strong>Telepon:</strong> ${telepon}</li>
                                <li><strong>Jenis Kendaraan:</strong> ${jeniskendaraan}</li>
                                <li><strong>Waktu:</strong> ${new Date(waktu).toLocaleString('id-ID')}</li>
                            </ul>
                            <p class="mt-2">Kami akan segera menghubungi Anda untuk konfirmasi.</p>
                        </div>
                    `;
                    loading.classList.add('hidden');
                    bookingForm.reset();
                }, 1000); 
            } else {
                loading.classList.add('hidden');
            }
        });
    }

    // Tampilkan Jadwal 
    const daftarBooking = document.getElementById('daftarBooking');
    const searchBooking = document.getElementById('searchBooking');
    const loadingSchedule = document.getElementById('loading');

    function displayBookings(bookings) {
        loadingSchedule.classList.add('hidden');
        daftarBooking.innerHTML = '';
        if (bookings.length === 0) {
            daftarBooking.innerHTML = '<p class="text-center text-gray-500">Belum ada jadwal booking.</p>';
        } else {
            bookings.forEach((booking, index) => {
                const div = document.createElement('div');
                div.className = 'bg-white p-4 rounded-lg shadow-md';
                div.innerHTML = `
                    <p><strong>Nama:</strong> ${booking.nama}</p>
                    <p><strong>Telepon:</strong> ${booking.telepon}</p>
                    <p><strong>Jenis Kendaraan:</strong> ${booking.jeniskendaraan}</p>
                    <p><strong>Waktu:</strong> ${new Date(booking.waktu).toLocaleString('id-ID')}</p>
                `;
                daftarBooking.appendChild(div);
            });
        }
    }

    if (daftarBooking) {
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        loadingSchedule.classList.remove('hidden');
        setTimeout(() => {
            displayBookings(bookings);
        }, 500);

        searchBooking.addEventListener('input', () => {
            loadingSchedule.classList.remove('hidden');
            const searchTerm = searchBooking.value.toLowerCase();
            setTimeout(() => {
                const filteredBookings = bookings.filter(booking => 
                    booking.nama.toLowerCase().includes(searchTerm)
                );
                displayBookings(filteredBookings);
            }, 300);
        });
    }

    // Hamburger Menu 
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Animasi saat scroll card
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
});