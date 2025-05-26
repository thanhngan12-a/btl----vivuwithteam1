// Toggle authentication buttons and display username
        function toggleAuthButtons() {
            const isLoggedIn = sessionStorage.getItem('trangthai') === 'hien';
            const username = sessionStorage.getItem('tk');
            const dangxuatBtn = document.getElementById('dangxuat');
            const dangnhapBtn = document.getElementById('dangnhap');
            const dangkyBtn = document.getElementById('dangky');
            const usernameDisplay = document.getElementById('username-display');
            const usernameSpan = document.getElementById('username');

            if (isLoggedIn && username) {
                dangxuatBtn.style.display = 'flex';
                dangnhapBtn.style.display = 'none';
                dangkyBtn.style.display = 'none';
                usernameDisplay.classList.add('visible');
                usernameSpan.textContent = username;
            } else {
                dangxuatBtn.style.display = 'none';
                dangnhapBtn.style.display = 'flex';
                dangkyBtn.style.display = 'flex';
                usernameDisplay.classList.remove('visible');
            }
        }

        // Logout function
        function m2() {
            alert('Đăng xuất thành công!');
            sessionStorage.removeItem('tk');
            sessionStorage.removeItem('mk');
            sessionStorage.removeItem('trangthai');
            toggleAuthButtons();
            try {
                window.location.href = './dangnhap.html';
            } catch (e) {
                console.error('Lỗi chuyển hướng:', e);
                alert('Không tìm thấy trang đăng nhập. Vui lòng kiểm tra dangnhap.html');
            }
        }

        // Initialize authentication buttons on page load
        window.addEventListener('load', toggleAuthButtons);

        // Initialize Leaflet map centered on Vietnam
        var map = L.map('vietnam-map').setView([16.0, 108.0], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Define destinations with type, details, and href
        const destinations = [
            { coords: [21.0278, 105.8342], name: 'Hoàng Thành Thăng Long', type: 'culture', province: 'Hà Nội', description: 'Di sản văn hóa thế giới tại Hà Nội.', image: 'https://static.vinwonders.com/production/hoang-thanh-thang-long-banner.jpg', href: 'hanoi.html' },
            { coords: [20.939, 107.068], name: 'Vịnh Hạ Long', type: 'sea', province: 'Quảng Ninh', description: 'Di sản UNESCO với hàng nghìn đảo đá vôi.', image: 'https://media.vietravel.com/images/Content/kinh-nghiem-du-lich-ha-long-01.jpg', href: 'quangninh.html' },
            { coords: [22.335, 103.844], name: 'Sapa', type: 'mountain', province: 'Lào Cai', description: 'Thị trấn núi nổi tiếng với Fansipan.', image: 'https://booking.muongthanh.com/upload_images/images/H%60/sa-pa-thi-tran-trong-suong.jpg', href: 'laocai.html' },
            { coords: [23.136, 104.979], name: 'Đồng Văn', type: 'mountain', province: 'Hà Giang', description: 'Cao nguyên đá độc đáo tại Hà Giang.', image: 'https://sinhtour.vn/wp-content/uploads/2023/12/pho-co-dong-van-ha-giang.jpg', href: 'hagiang.html' },
            { coords: [20.8449, 106.688], name: 'Đảo Cát Bà', type: 'sea', province: 'Hải Phòng', description: 'Vịnh Lan Hạ đẹp mê hồn tại Hải Phòng.', image: 'https://mia.vn/media/uploads/blog-du-lich/bai-tam-cat-co-1-1-1705444174.jpg', href: 'haiphong.html' },
            { coords: [16.054, 108.211], name: 'Bán đảo Sơn Trà', type: 'mountain', province: 'Đà Nẵng', description: 'Rừng nguyên sinh và chùa Linh Ứng.', image: 'https://ik.imagekit.io/tvlk/blog/2022/09/ban-dao-son-tra-2.png', href: 'danang.html' },
            { coords: [16.467, 107.579], name: 'Núi Ngự Bình', type: 'mountain', province: 'Thừa Thiên Huế', description: 'Biểu tượng thiên nhiên của Huế.', image: 'https://khamphadisan.com.vn/wp-content/uploads/2017/02/nui-ngu-binh-khamphadisan-2-e1488164889173.jpg', href: 'hue.html' },
            { coords: [18.684, 105.696], name: 'Vườn quốc gia Pù Mát', type: 'mountain', province: 'Nghệ An', description: 'Rừng nguyên sinh tại Nghệ An.', image: 'https://static.vinwonders.com/production/vi-tri-vuon-quoc-gia-pu-mat.jpg', href: 'nghean.html' },
            { coords: [15.880, 108.338], name: 'Phố Cổ Hội An', type: 'culture', province: 'Quảng Nam', description: 'Thị trấn cổ đẹp tại Quảng Nam.', image: 'https://hoiana.com/wp-content/uploads/2024/12/pho-co-hoi-an-ve-dem-16.webp', href: 'quangnam.html' },
            { coords: [19.733, 105.917], name: 'Khu danh thắng Sầm Sơn', type: 'sea', province: 'Thanh Hóa', description: 'Bãi biển trăng khuyết tại Thanh Hóa.', image: 'https://static.vinwonders.com/production/du-lich-sam-son-mua-nao-dep.jpg', href: 'thanhhoa.html' },
            { coords: [10.776, 106.701], name: 'Dinh Độc Lập', type: 'culture', province: 'TP. Hồ Chí Minh', description: 'Di tích lịch sử tại TP. Hồ Chí Minh.', image: 'https://image.nhandan.vn/Uploaded/2025/fdmzftmztpmf/2025_04_20/ndo_br_dat-14-7297-8083.jpg', href: 'hochiminh.html' },
            { coords: [9.193, 105.153], name: 'Chợ nổi Cái Răng', type: 'culture', province: 'Cần Thơ', description: 'Nét văn hóa sông nước tại Cần Thơ.', image: 'https://nguoiduatin.mediacdn.vn/84137818385850368/2024/9/25/base64-1727265825888848625527.jpeg', href: 'cantho.html' },
            { coords: [11.013, 106.717], name: 'Làng Tre Phú An', type: 'culture', province: 'Bình Dương', description: 'Làng nghề thủ công tại Bình Dương.', image: 'https://ik.imagekit.io/tvlk/blog/2023/09/lang-tre-phu-an-12.jpg', href: 'binhduong.html' },
            { coords: [10.543, 107.244], name: 'Hòn Bà', type: 'mountain', province: 'Bà Rịa Vũng Tàu', description: 'Đỉnh núi cao tại Bà Rịa Vũng Tàu.', image: 'https://chamkhanhhoa.com/wp-content/uploads/2022/03/hon-ba-cam-lam-khanh-hoa.jpg', href: 'baria.html' }
        ];

        // Store markers for filtering
        let markers = [];

        // Function to add markers based on filter
        function addMarkers(filter) {
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];
            destinations.forEach(dest => {
                if (filter === 'all' || dest.type === filter) {
                    const marker = L.marker(dest.coords).addTo(map)
                        .bindPopup(`
                            <div class="text-center">
                                <img src="${dest.image}" alt="${dest.name}" class="w-full h-auto object-cover mb-4">
                                <h3 class="font-bold text-lg">${dest.name}</h3>
                                <p>${dest.description}</p>
                                <a href="${dest.href}" class="text-blue-600 underline" aria-label="Xem chi tiết về ${dest.name}">Xem chi tiết</a>
                            </div>
                        `);
                    markers.push(marker);
                }
            });
        }

        // Initial load: show all markers
        addMarkers('all');

        // Filter buttons event listeners
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                addMarkers(filter);
            });
        });

        // Toggle hamburger menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('#div_dieuhuong');
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Improved search functionality
        const searchInput = document.querySelector('#searchInput');
        const clearSearch = document.querySelector('.clear-search');
        const destinationCards = document.querySelectorAll('.destination-card');

        // Hàm chuẩn hóa chuỗi: bỏ dấu tiếng Việt và chuyển thành chữ thường
        function normalizeString(str) {
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
                .toLowerCase()
                .trim();
        }

        searchInput.addEventListener('input', () => {
            const searchTerm = normalizeString(searchInput.value);
            let visibleCount = 0;

            destinationCards.forEach(card => {
                const title = normalizeString(card.querySelector('h4').textContent);
                const words = title.split(/\s+/);

                const matches = searchTerm === '' || words.some(word => word.includes(searchTerm));

                if (matches) {
                    card.classList.add('visible');
                    visibleCount++;
                } else {
                    card.classList.remove('visible');
                }
            });

            const noResults = document.querySelector('.no-results');
            if (visibleCount === 0 && searchTerm !== '') {
                noResults.classList.add('visible');
            } else {
                noResults.classList.remove('visible');
            }

            clearSearch.classList.toggle('visible', searchTerm !== '');
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            destinationCards.forEach(card => card.classList.add('visible'));
            const noResults = document.querySelector('.no-results');
            noResults.classList.remove('visible');
            clearSearch.classList.remove('visible');
        });

        // Lightbox functionality for destination cards and hero image
        const images = document.querySelectorAll('.card-image img, .hero-image img');
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');

        images.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = img.alt;
                lightbox.classList.add('active');
                lightbox.focus();
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });

        // Scroll-to-top functionality
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Feedback functionality
        const feedbackBtn = document.querySelector('.feedback-btn');
        const feedbackModal = document.querySelector('.feedback-modal');
        const feedbackModalClose = document.querySelector('.feedback-modal-close');
        const feedbackForm = document.querySelector('.feedback-form');
        const submitFeedbackBtn = document.querySelector('#submit-feedback');
        const successToast = document.querySelector('#success-toast');
        const emailError = document.querySelector('#email-error');
        const imageInput = document.querySelector('#feedback-image');
        const imagePreview = document.querySelector('#image-preview');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                feedbackBtn.classList.add('visible');
            } else {
                feedbackBtn.classList.remove('visible');
            }
        });

        feedbackBtn.addEventListener('click', () => {
            feedbackModal.classList.add('active');
        });

        feedbackModalClose.addEventListener('click', () => {
            feedbackModal.classList.remove('active');
            emailError.classList.remove('visible');
            imagePreview.classList.remove('visible');
            imagePreview.src = '';
        });

        feedbackModal.addEventListener('click', (e) => {
            if (e.target === feedbackModal) {
                feedbackModal.classList.remove('active');
                emailError.classList.remove('visible');
                imagePreview.classList.remove('visible');
                imagePreview.src = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && feedbackModal.classList.contains('active')) {
                feedbackModal.classList.remove('active');
                emailError.classList.remove('visible');
                imagePreview.classList.remove('visible');
                imagePreview.src = '';
            }
        });

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imagePreview.src = event.target.result;
                    imagePreview.classList.add('visible');
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.classList.remove('visible');
                imagePreview.src = '';
            }
        });

        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.querySelector('#feedback-name').value;
            const email = document.querySelector('#feedback-email').value;
            const message = document.querySelector('#feedback-message').value;
            const imageFile = imageInput.files[0];

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.classList.add('visible');
                return;
            }
            emailError.classList.remove('visible');

            const formData = { name, email, message };
            if (imageFile) formData.image = imageFile.name;
            console.log('Phản hồi:', formData);

            successToast.classList.add('visible');
            setTimeout(() => {
                successToast.classList.remove('visible');
            }, 1000);

            feedbackModal.classList.remove('active');
            feedbackForm.reset();
            imagePreview.classList.remove('visible');
            imagePreview.src = '';
        });

        document.querySelector('#dangky').addEventListener('click', () => {
            try {
                window.location.href = './dangky.html';
            } catch (e) {
                console.error('Lỗi chuyển hướng:', e);
                alert('Không tìm thấy trang đăng ký. Vui lòng kiểm tra dangky.html');
            }
        });

        document.querySelector('#dangnhap').addEventListener('click', () => {
            try {
                window.location.href = './dangnhap.html';
            } catch (e) {
                console.error('Lỗi chuyển hướng:', e);
                alert('Không tìm thấy trang đăng nhập. Vui lòng kiểm tra dangnhap.html');
            }
        });

        document.querySelector('#dangxuat').addEventListener('click', () => {
            alert('Đăng xuất thành công!');
            sessionStorage.removeItem('tk');
            sessionStorage.removeItem('mk');
            sessionStorage.removeItem('trangthai');
            toggleAuthButtons();
            try {
                window.location.href = './dangnhap.html';
            } catch (e) {
                console.error('Lỗi chuyển hướng:', e);
                alert('Không tìm thấy trang đăng nhập. Vui lòng kiểm tra dangnhap.html');
            }
        });

        // Slideshow functionality
        window.onload = () => {
            let slideIndex = 0;
            const slides = document.querySelectorAll('.hero-image img');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');

            if (!slides || slides.length === 0) {
                console.error('Không tìm thấy ảnh trong slideshow');
                return;
            }
            if (!prevBtn || !nextBtn) {
                console.error('Không tìm thấy nút prev hoặc next');
                return;
            }

            function showSlide(index) {
                if (index >= slides.length) {
                    slideIndex = 0;
                } else if (index < 0) {
                    slideIndex = slides.length - 1;
                } else {
                    slideIndex = index;
                }

                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === slideIndex) {
                        slide.classList.add('active');
                    }
                });
            }

            function nextSlide() {
                slideIndex++;
                showSlide(slideIndex);
            }
                        prevBtn.addEventListener('click', () => {
                slideIndex--;
                showSlide(slideIndex);
            });

            nextBtn.addEventListener('click', () => {
                slideIndex++;
                showSlide(slideIndex);
            });

            setInterval(nextSlide, 2000); // Auto-slide every 5 seconds
        };

                    // Location search functionality with immediate image display
            const locationSearch = document.querySelector('#locationSearch');
            locationSearch.addEventListener('input', () => {
                const searchTerm = normalizeString(locationSearch.value);
                markers.forEach(marker => map.removeLayer(marker));
                markers = [];

                if (searchTerm) {
                    const matchedDest = destinations.find(dest => 
                        normalizeString(dest.province).includes(searchTerm)
                    );

                    if (matchedDest) {
                        const marker = L.marker(matchedDest.coords).addTo(map)
                            .bindPopup(`
                                <div class="text-center">
                                    <img src="${matchedDest.image}" alt="${matchedDest.name}" class="w-full h-auto object-cover mb-4">
                                    <h3 class="font-bold text-lg">${matchedDest.name}</h3>
                                    <p>${matchedDest.description}</p>
                                    <a href="${matchedDest.href}" class="text-blue-600 underline" aria-label="Xem chi tiết về ${matchedDest.name}">Xem chi tiết</a>
                                </div>
                            `)
                            .openPopup(); // Mở popup ngay lập tức khi tìm thấy
                        markers.push(marker);
                        map.setView(matchedDest.coords, 10); // Zoom vào vị trí tìm thấy
                    }
                } else {
                    addMarkers('all'); // Hiển thị tất cả nếu không có từ khóa
                    map.setView([16.0, 108.0], 5); // Trở về vị trí mặc định
                }
            });