/**
 * Ponmani Florist - Web Interactivity & Form Processing
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Scroll-Based Header Transitions ──
    const header = document.getElementById('main-header');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check immediately on load


    // ── 2. Mobile Menu Toggle ──
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        navContainer.classList.toggle('active');
    });

    // Close mobile menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
        });
    });


    // ── 3. Services Modal Data & Interactive Window ──
    const servicesData = {
        flowers: {
            title: "Indian Flowers & Pooja Strings",
            price: "Pricing: Varied by weight and seasonal import cost",
            image: "assets/flowers_strings.png",
            text: "Enhance your daily prayers, home altars, and festive ceremonies with our fresh flower strings. We provide meticulously woven Jasmine (Malli) and Mullai strings, fresh loose orange and yellow marigold flowers, and lotus buds. All flowers are imported fresh and stored in climate-controlled environments to guarantee longevity and rich natural fragrance. We also provide pooja items like brass diyas, authentic kumkum, incense sticks, and deity statues."
        },
        housewarming: {
            title: "Housewarming Flower Decorations (Grahapravesam)",
            price: "Pricing: Customized depending on entrance size and garland thickness",
            image: "assets/housewarming.png",
            text: "Make your new home look festive and traditional. Our custom Grahapravesam decors feature beautiful hanging marigold garlands, mango leaf strings (Toran), and artistic floor arrangements (Rangoli with flower petals). We work directly with you to measure your home entrance and design a custom layout. Requires booking at least 1-2 weeks in advance to ensure fresh coordinate arrivals."
        },
        wedding: {
            title: "Traditional Wedding Garlands (Kalyana Malai)",
            price: "Pricing: Custom-crafted package options",
            image: "assets/wedding_garlands.png",
            text: "Our specialty. We design and weave beautiful wedding garlands customized to match your bridal attire and ceremony colors. Crafted using premium red/pink roses, white jasmines, baby's breath, and decorative gold/silver accents. Every pair is woven on the morning of the ceremony to ensure perfect structure and peak freshness. Requires consultation and booking 3-4 weeks prior to the wedding date."
        },
        temple: {
            title: "Temple Deity & Altar Garlands",
            price: "Pricing: Flexible options for regular supply or special events",
            image: "assets/temple_services.png",
            text: "We provide dedicated flower services to temples in Cary and the Triangle area. From heavy, elaborate garlands (Vakshasthala Malai) for main deities to loose petals for archana services and decorations for major festivals (Diwali, Navratri, Ganesh Chaturthi). We follow traditional guidelines of purity and care in preparation."
        }
    };

    const modalOverlay = document.getElementById('service-modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalText = document.getElementById('modal-text');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCtaBtn = document.getElementById('modal-cta-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    function openModal(serviceKey) {
        const data = servicesData[serviceKey];
        if (!data) return;

        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalPrice.textContent = data.price;
        modalText.textContent = data.text;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scroll
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scroll
    }

    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent opening if they clicked a specific inner button that handles direct links
            if (e.target.closest('.service-learn-more') || e.target.closest('.service-card')) {
                const serviceKey = card.getAttribute('data-service');
                openModal(serviceKey);
            }
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    modalCtaBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });


    // ── 4. Form Processing & Validation ──
    const inquiryForm = document.getElementById('event-inquiry-form');
    const formToast = document.getElementById('form-toast');
    const toastMessage = document.getElementById('toast-message');
    const eventDateInput = document.getElementById('event-date');

    // Set minimum date in form to today
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.min = today;

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extra Validation: Check if selected date is in the future
        const selectedDate = new Date(eventDateInput.value);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        if (selectedDate < currentDate) {
            alert('Please select a valid future date for your event/order.');
            return;
        }

        // Collect Form Data
        const formData = new FormData(inquiryForm);
        const submission = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            eventType: formData.get('eventType'),
            eventDate: formData.get('eventDate'),
            flowerRequest: formData.get('flowerRequest'),
            message: formData.get('message')
        };

        // Log submission simulation
        console.log('Inquiry form submission received:', submission);

        // Show Success Toast
        showToast(`Thank you, ${submission.name}! Your inquiry for ${submission.eventType} has been sent successfully.`);

        // Reset Form
        inquiryForm.reset();
    });

    function showToast(message) {
        toastMessage.textContent = message;
        formToast.classList.add('active');
        
        setTimeout(() => {
            formToast.classList.remove('active');
        }, 5000);
    }

    // ── 5. Gallery Lightbox Modal ──
    const galleryCards = document.querySelectorAll('.gallery-card');
    const galleryModal = document.createElement('div');
    galleryModal.id = 'gallery-modal-overlay';
    galleryModal.className = 'modal-overlay';
    galleryModal.innerHTML = `
        <div class="gallery-modal-container">
            <button class="modal-close" id="gallery-modal-close-btn" aria-label="Close Gallery Modal">&times;</button>
            
            <button class="gallery-nav-btn prev-btn" id="gallery-prev-btn" aria-label="Previous Image">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            
            <img id="gallery-modal-img" src="" alt="Full size gallery image">
            
            <button class="gallery-nav-btn next-btn" id="gallery-next-btn" aria-label="Next Image">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            
            <div class="gallery-modal-info">
                <span id="gallery-modal-tag"></span>
                <h4 id="gallery-modal-title"></h4>
            </div>
        </div>
    `;
    document.body.appendChild(galleryModal);

    const galleryModalImg = document.getElementById('gallery-modal-img');
    const galleryModalTag = document.getElementById('gallery-modal-tag');
    const galleryModalTitle = document.getElementById('gallery-modal-title');
    const galleryModalClose = document.getElementById('gallery-modal-close-btn');
    const galleryPrevBtn = document.getElementById('gallery-prev-btn');
    const galleryNextBtn = document.getElementById('gallery-next-btn');

    let currentGalleryIndex = 0;
    const galleryItems = Array.from(galleryCards).map(card => {
        return {
            src: card.querySelector('img').src,
            alt: card.querySelector('img').alt,
            tag: card.querySelector('.gallery-tag').textContent,
            title: card.querySelector('.gallery-title').textContent
        };
    });

    function updateGalleryModal(index) {
        const item = galleryItems[index];
        if (item) {
            galleryModalImg.src = item.src;
            galleryModalImg.alt = item.alt;
            galleryModalTag.textContent = item.tag;
            galleryModalTitle.textContent = item.title;
            currentGalleryIndex = index;
        }
    }

    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            updateGalleryModal(index);
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeGalleryModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let prevIndex = currentGalleryIndex - 1;
        if (prevIndex < 0) prevIndex = galleryItems.length - 1;
        updateGalleryModal(prevIndex);
    });

    galleryNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let nextIndex = currentGalleryIndex + 1;
        if (nextIndex >= galleryItems.length) nextIndex = 0;
        updateGalleryModal(nextIndex);
    });

    galleryModalClose.addEventListener('click', closeGalleryModal);
    
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft') {
                let prevIndex = currentGalleryIndex - 1;
                if (prevIndex < 0) prevIndex = galleryItems.length - 1;
                updateGalleryModal(prevIndex);
            } else if (e.key === 'ArrowRight') {
                let nextIndex = currentGalleryIndex + 1;
                if (nextIndex >= galleryItems.length) nextIndex = 0;
                updateGalleryModal(nextIndex);
            }
        }
    });
});
