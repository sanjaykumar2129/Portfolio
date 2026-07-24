document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mouse Follower / Interactive Glow
    // ==========================================
    const glow = document.querySelector('.interactive-glow');
    if (glow) {
        // Only run on desktop devices with hover cursor capabilities
        if (window.matchMedia('(hover: hover)').matches) {
            document.addEventListener('mousemove', (e) => {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            });
        }
    }

    // ==========================================
    // 2. Typing Banner Text Animation
    // ==========================================
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = [
            'Computer Science Engineer',
            'Generative AI Enthusiast',
            'App Developer',
            'Web Developer'
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIdx];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 40; // Faster deletion speed
            } else {
                typingText.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIdx === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1800; // Pause at the end of word
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 400; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }
        
        // Start animation
        setTimeout(type, 800);
    }

    // ==========================================
    // 3. Header Scrolled State Indicator
    // ==========================================
    const header = document.querySelector('header');
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once initially

    // ==========================================
    // 4. Mobile Menu Toggler
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close menu when clicking items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // ==========================================
    // 5. Active Section Indicator on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 180)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 6. Contact Form simulated handler
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-message-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showStatus('Name, Email, and Message are required.', 'error');
                return;
            }

            // Set sending status
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            formMsg.textContent = '';

            setTimeout(() => {
                showStatus(`Thank you, ${name}! Your inquiry has been sent successfully.`, 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            }, 1500);
        });
    }

    function showStatus(text, type) {
        if (!formMsg) return;
        formMsg.textContent = text;
        formMsg.className = 'form-msg ' + type;
    }

    // ==========================================
    // 7. Scroll-reveal Observer Elements
    // ==========================================
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealSelectors = [
        '.about-text', '.stat-card', '.education-card', 
        '.skill-category-card', '.project-showcase-card', 
        '.internship-card', '.cert-item-card', 
        '.contact-info-panel', '.contact-form-panel'
    ];

    const elementsToReveal = document.querySelectorAll(revealSelectors.join(','));
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-ready');
        revealObserver.observe(el);
    });

    // Append reveal helper styles dynamically to match pure stylesheet separation
    const revealStyle = document.createElement('style');
    revealStyle.innerHTML = `
        .reveal-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);
});
