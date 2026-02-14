/* ================================================
   PORTFOLIO - Main JavaScript
   Advanced GSAP Animations & Premium Interactions
   ================================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initCustomCursor();
    initNavigation();
    initHeroAnimations();
    initTypingEffect();
    initScrollProgress();
    initScrollReveal();
    initProjectFilter();
    initContactForm();
    initCounterAnimation();
    initParticles();
    initSmoothScroll();
    initCurrentYear();
    initMagneticButtons();
    initTiltCards();
    initTextSplit();
    initParallaxEffects();
    initJourneySection();
    initExperienceModal();
    initProjectModal();
    initCardImages();
});

/* ------------------------------------------------
   Page Loader & Initial Animation
   ------------------------------------------------ */
function initLoader() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial page load animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Fade in body
    tl.to('body', {
        opacity: 1,
        duration: 0.1
    });

    // Animate background grid
    gsap.from('.bg-grid', {
        opacity: 0,
        duration: 2,
        ease: 'power2.out'
    });
}

/* ------------------------------------------------
   Custom Cursor
   ------------------------------------------------ */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    if (!cursor || !cursorFollower) return;

    // Check if device has touch (disable cursor on touch devices)
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        return;
    }

    // Direct mouse tracking - no lag
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .filter-btn, .form-input, .nav__toggle');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--hover');
            cursorFollower.classList.add('cursor-follower--hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--hover');
            cursorFollower.classList.remove('cursor-follower--hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor--click');
        cursorFollower.classList.add('cursor-follower--click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor--click');
        cursorFollower.classList.remove('cursor-follower--click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

/* ------------------------------------------------
   Navigation
   ------------------------------------------------ */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav__link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

    // Scroll behavior - add/remove scrolled class
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animate nav on load
    gsap.from('.nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
}

/* ------------------------------------------------
   Hero Section Animations
   ------------------------------------------------ */
function initHeroAnimations() {
    const heroTl = gsap.timeline({ delay: 0.5 });

    // Set initial states
    gsap.set('.hero__greeting, .hero__name-first, .hero__name-last, .hero__description, .hero__cta', {
        opacity: 0,
        y: 50
    });

    gsap.set('.hero__title', {
        opacity: 0,
        y: 30
    });

    gsap.set('.hero__visual', {
        opacity: 0,
        scale: 0.8,
        rotate: -5
    });

    gsap.set('.hero__social-link', {
        opacity: 0,
        x: -30
    });

    gsap.set('.hero__scroll', {
        opacity: 0,
        y: 20
    });

    // Animate hero elements with stagger
    heroTl
        .to('.hero__greeting', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out'
        })
        .to('.hero__name-first', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.6')
        .to('.hero__name-last', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.7')
        .to('.hero__title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.hero__description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.hero__cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.hero__visual', {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.8)'
        }, '-=0.8')
        .to('.hero__social-link', {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero__scroll', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3');

    // Floating animation for hero visual
    gsap.to('.hero__visual', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });

    // Animate hero orbs
    gsap.to('.hero__orb--1', {
        x: 50,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.hero__orb--2', {
        x: -40,
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.hero__orb--3', {
        x: 30,
        y: 40,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Parallax effect on scroll
    gsap.to('.hero__gradient', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 150,
        opacity: 0.3
    });

    // Scale down hero on scroll
    gsap.to('.hero__content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        scale: 0.9,
        opacity: 0.5
    });

    // Arabic name background - scroll fade effect
    const arabicName = document.getElementById('arabicName');
    if (arabicName) {
        // Set initial state
        gsap.set('.hero__arabic-name', { opacity: 1 });

        // Scroll effect - fades out going down, fades back in going up
        ScrollTrigger.create({
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set('.hero__arabic-name', {
                    opacity: 1 - progress,
                    y: -50 * progress
                });
            }
        });
    }
}

/* ------------------------------------------------
   Text Split Animation
   ------------------------------------------------ */
function initTextSplit() {
    // Animate section titles with character split
    const titles = document.querySelectorAll('.section-header__title');

    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';

        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px) rotateX(-90deg)';
            title.appendChild(span);
        });

        gsap.to(title.querySelectorAll('span'), {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)'
        });
    });
}

/* ------------------------------------------------
   Typing Effect
   ------------------------------------------------ */
function initTypingEffect() {
    const typedElement = document.getElementById('typedText');
    const titles = [
        'Software Engineer',
        'AI Developer',
        'Research Assistant',
        'SAP GenAI Developer'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typedElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after hero animation
    setTimeout(type, 2000);
}

/* ------------------------------------------------
   Scroll Progress Bar
   ------------------------------------------------ */
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

/* ------------------------------------------------
   Scroll Reveal Animations
   ------------------------------------------------ */
function initScrollReveal() {
    // Reveal elements on scroll - faster animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    revealElements.forEach(element => {
        const direction = element.classList.contains('reveal-left') ? -30 :
                         element.classList.contains('reveal-right') ? 30 : 0;

        gsap.set(element, {
            opacity: 0,
            x: direction,
            y: element.classList.contains('reveal-up') ? 30 : 0
        });

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    // Simple fade-in for project rows
    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach((row, index) => {
        gsap.set(row, { opacity: 0, y: 20 });

        gsap.to(row, {
            scrollTrigger: {
                trigger: row,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: index * 0.05,
            ease: 'power2.out'
        });
    });

}

/* ------------------------------------------------
   Project Filter (Disabled - using simple list now)
   ------------------------------------------------ */
function initProjectFilter() {
    // Filter removed - projects displayed as simple list
}

/* ------------------------------------------------
   Contact Form
   ------------------------------------------------ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            // Shake animation for invalid form
            gsap.to(form, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: 'power2.out'
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            gsap.to(form, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: 'power2.out'
            });
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Loading animation
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.2
        });
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            // Success animation
            gsap.to(submitBtn, {
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });

            // Show success message with animation
            formSuccess.classList.add('show');
            gsap.from(formSuccess, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });

            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
                gsap.to(formSuccess, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    onComplete: () => {
                        formSuccess.classList.remove('show');
                        formSuccess.style.opacity = '';
                        formSuccess.style.transform = '';
                    }
                });
            }, 5000);
        }, 1500);
    });

    // Enhanced focus animations for form inputs
    const inputs = form.querySelectorAll('.form-input');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                boxShadow: '0 0 30px rgba(255, 107, 107, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/* ------------------------------------------------
   Counter Animation
   ------------------------------------------------ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.about__stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);

        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                counter.textContent = Math.round(this.targets()[0].textContent) + '+';
            }
        });
    });
}

/* ------------------------------------------------
   Particles Background
   ------------------------------------------------ */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create floating particles
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 107, 107, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${size * 2}px rgba(255, 107, 107, 0.3);
        `;
        particlesContainer.appendChild(particle);

        // Complex movement animation
        gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-50, 50)`,
            duration: `random(4, 8)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 3
        });

        // Pulsing glow
        gsap.to(particle, {
            opacity: `random(0.2, 0.8)`,
            scale: `random(0.8, 1.5)`,
            duration: `random(2, 4)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2
        });
    }
}

/* ------------------------------------------------
   Smooth Scroll
   ------------------------------------------------ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const offsetTop = target.offsetTop - 80;

            // Use native smooth scroll for better performance
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

/* ------------------------------------------------
   Set Current Year in Footer
   ------------------------------------------------ */
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ------------------------------------------------
   Magnetic Buttons
   ------------------------------------------------ */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .nav__link, .filter-btn');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

/* ------------------------------------------------
   Tilt Cards
   ------------------------------------------------ */
function initTiltCards() {
    // Tilt effect disabled for better performance
}

/* ------------------------------------------------
   Parallax Effects
   ------------------------------------------------ */
function initParallaxEffects() {
    // Simplified - removed heavy scrub animations for better performance
}

/* ------------------------------------------------
   Image lazy loading intersection observer
   ------------------------------------------------ */
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');

                // Animate image on load
                gsap.from(img, {
                    opacity: 0,
                    scale: 1.1,
                    duration: 0.6,
                    ease: 'power2.out'
                });

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ------------------------------------------------
   Journey Section Animations
   ------------------------------------------------ */
function initJourneySection() {
    // Animate education cards
    const educationGrid = document.querySelector('.journey__grid--education');
    const educationCards = educationGrid ? educationGrid.querySelectorAll('.journey__card') : [];

    // Animate experience timeline items
    const experienceTimeline = document.querySelector('.experience-timeline');
    const experienceItems = experienceTimeline ? experienceTimeline.querySelectorAll('.experience-timeline__item') : [];
    const timelineLine = document.querySelector('.experience-timeline__line');

    // Set initial state for education cards
    educationCards.forEach((card) => {
        gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.9
        });
    });

    // Animate education cards
    educationCards.forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: '.journey__grid--education',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out(1.4)'
        });
    });

    // Animate timeline line
    if (timelineLine) {
        gsap.set(timelineLine, { scaleX: 0, transformOrigin: 'left center' });

        gsap.to(timelineLine, {
            scrollTrigger: {
                trigger: '.experience-timeline',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out'
        });
    }

    // Set initial state for experience items
    experienceItems.forEach((item) => {
        const card = item.querySelector('.experience-timeline__card');
        const dot = item.querySelector('.experience-timeline__dot');

        gsap.set(card, {
            opacity: 0,
            y: 40,
            scale: 0.9
        });

        gsap.set(dot, {
            scale: 0
        });
    });

    // Animate experience items with stagger
    experienceItems.forEach((item, index) => {
        const card = item.querySelector('.experience-timeline__card');
        const dot = item.querySelector('.experience-timeline__dot');

        // Animate dot first
        gsap.to(dot, {
            scrollTrigger: {
                trigger: '.experience-timeline',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            scale: 1,
            duration: 0.4,
            delay: 0.3 + index * 0.1,
            ease: 'back.out(2)'
        });

        // Then animate card
        gsap.to(card, {
            scrollTrigger: {
                trigger: '.experience-timeline',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: 0.4 + index * 0.1,
            ease: 'back.out(1.4)'
        });
    });

    // Add hover interactions for education cards
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 107, 107, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: 'none',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

/* ------------------------------------------------
   Experience Modal
   ------------------------------------------------ */
function initExperienceModal() {
    const modal = document.getElementById('experienceModal');
    const modalBackdrop = modal?.querySelector('.experience-modal__backdrop');
    const modalClose = modal?.querySelector('.experience-modal__close');
    // Get both education cards and experience timeline items
    const educationCards = document.querySelectorAll('.journey__card');
    const experienceItems = document.querySelectorAll('.experience-timeline__item');
    const allClickableItems = [...educationCards, ...experienceItems];

    if (!modal || allClickableItems.length === 0) return;

    // Experience data from CV
    const experienceData = {
        // Experience
        1: {
            date: 'Jan 2026 - May 2026',
            title: 'Research Assistant',
            company: 'SDAIA-KFUPM Joint Research Center for AI (JRCAI)',
            description: `<p><strong>Project:</strong> Evaluating VLMs/LLMs Hallucination in Domain-Specific Tasks</p><p>Selected due to academic excellence. Designing controlled experiments to detect, categorize, and reduce hallucinations in Vision-Language Models for healthcare and education domains.</p><p><strong>Supervisor:</strong> Dr. Muzammil Behzad</p>`,
            cardImage: 'assets/images/sdaia-jrcai.png',
            modalImage: ''
        },
        2: {
            date: 'Oct 2025 - Present',
            title: 'SAP Generative AI Developer',
            company: 'SAP | Dual Study Program | Saudi Arabia',
            description: `<p>Part of SAP's prestigious Dual Study Program, working on Generative AI solutions for enterprise applications.</p><p>Earned <strong>SAP Certified Associate</strong> certification in Generative AI Development (2025), demonstrating expertise in building AI-powered business solutions.</p>`,
            cardImage: 'https://cdn.prod.website-files.com/66c8945bfb638155af230df6/66d5e83a7965368cd3bef0d4_SAP.png',
            modalImage: ''
        },
        3: {
            date: 'Aug 2025 - Present',
            title: 'Technical Lead Intern',
            company: 'Arkan | Remote',
            description: `<p>Worked on building a construction management SaaS platform.</p><p>Bridged business priorities with technical design, ensuring strategic alignment.</p><p>Advised leadership by combining technical expertise with understanding of business needs.</p>`,
            cardImage: 'assets/images/arkan.png',
            modalImage: ''
        },
        4: {
            date: 'Jan 2026',
            title: 'MENA ML Winter School 2026 Scholar',
            company: 'King Abdullah University of Science and Technology (KAUST) | Thuwal, Saudi Arabia',
            description: `<p>Selected among <strong>300 participants from 2,222 applicants</strong> (13.5% acceptance rate) for the prestigious ML school hosted by King Abdullah University of Science and Technology.</p><p>Featured lectures by <strong>Google DeepMind researchers</strong> covering cutting-edge machine learning topics.</p>`,
            cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte2-ZT_JSzcLjafdArm65XeFSrpA4sFkTdw&s',
            modalImage: ''
        },
        5: {
            date: 'Jun 2025 - Aug 2025',
            title: 'AI Engineer Trainee',
            company: 'Renad Al Majd Group | Riyadh, Saudi Arabia',
            description: `<p>Developed Retrieval-Augmented Generation (RAG) systems using <strong>LangChain & n8n</strong> for enterprise knowledge management and automation solutions.</p><p>Gained hands-on experience building production-ready AI systems for real business applications.</p>`,
            cardImage: 'https://www.rmg-sa.com/wp-content/uploads/2023/10/512.jpg',
            modalImage: ''
        },
        6: {
            date: 'Jun 2025 - Aug 2025',
            title: 'Project Management Assistant',
            company: 'Code Link | Riyadh, Saudi Arabia',
            description: `<p>Coordinated project tasks, deliverables, and stakeholder communication.</p><p>Gained valuable experience in project coordination and cross-functional team collaboration.</p>`,
            cardImage: 'assets/images/codelink.png',
            modalImage: ''
        },
        7: {
            date: 'Aug 2024 - Present',
            title: 'Peer Tutor',
            company: 'Assistant Deanship of Student Excellence and Success (SES) | KFUPM, Dhahran',
            description: `<p>Delivered <strong>140+ tutoring hours</strong> across 5 courses:</p><ul><li>ICS 108 - Object-Oriented Programming</li><li>ICS 253 - Discrete Structures</li><li>MATH 106 - Applied Calculus</li><li>ISE 291 - Introduction to Data Science</li><li>COE 292 - Introduction to Artificial Intelligence</li></ul>`,
            cardImage: 'assets/images/kfupm-ses.png',
            modalImage: ''
        },
        8: {
            date: 'Feb 2026 - Present',
            title: 'Vice President',
            company: 'Artificial Intelligence for All (AIFA) Club | KFUPM',
            description: `<p>Leading initiatives to democratize AI education on campus as Vice President of the AI for All (AIFA) Club.</p><p>Organizing workshops, seminars, and hands-on sessions to help students explore and learn about artificial intelligence.</p>`,
            cardImage: 'assets/images/aifa-club.png',
            modalImage: ''
        },
        9: {
            date: 'Mar 2025 - May 2025',
            title: 'Part Time',
            company: 'Net Zero | University Events',
            description: `<p>Part-time role supporting university events and initiatives related to sustainability and Net Zero goals.</p><p>Gained experience in event coordination and stakeholder engagement within an academic setting.</p>`,
            cardImage: 'assets/images/net-zero.png',
            modalImage: ''
        },
        // Education
        edu1: {
            date: 'Aug 2022 - Present',
            title: 'B.S. Software Engineering',
            company: 'King Fahd University of Petroleum & Minerals (KFUPM)',
            description: `<p><strong>GPA: 3.86/4.0</strong>, Dean's List</p><p>Pursuing a Bachelor's degree in Software Engineering at one of the top universities in the Middle East.</p><p><strong>Honors & Awards:</strong></p><ul><li>Physics 101 A+ Honor, SABIC Sponsored (Jun 2022)</li><li>Physics 102 A+ Honor, SABIC Sponsored (Jun 2022)</li></ul>`,
            cardImage: 'https://argaamplus.s3.amazonaws.com/be72021d-9734-4f0f-bb5d-dd27b437b815.png',
            modalImage: ''
        },
        edu2: {
            date: 'Aug 2025 - Jan 2026',
            title: 'Exchange Student - AI & Computer Science',
            company: 'Nanyang Technological University (NTU), Singapore',
            description: `<p><strong>First KFUPM student</strong> chosen to represent the university in Singapore at one of Asia's top universities.</p><p>Studied Machine Learning and Deep Learning courses, gaining international exposure and building a global network in the AI community.</p><p><strong>Projects completed:</strong></p><ul><li>LLM Human Preference Prediction (SC4000 Machine Learning)</li><li>Oxford Flowers Image Classification (SC4001 Deep Learning)</li></ul><p>GEM FAIR 2025 Letter of Participation</p>`,
            cardImage: 'https://i0.wp.com/postgrad.com.sg/wp-content/uploads/2019/10/NTU-School-Cover-Image-01.png?resize=760%2C497&ssl=1',
            modalImage: ''
        },
        edu3: {
            date: 'Jan - Feb 2025',
            title: 'AI Specialist Program',
            company: 'King Abdullah University of Science and Technology (KAUST)',
            description: `<p>Completed intensive AI specialist program at KAUST covering advanced topics in artificial intelligence.</p><p><strong>Topics Covered:</strong></p><ul><li>Intro to AI - Linear/Logistic Regression</li><li>Advanced AI - CNNs, Generative AI</li></ul><p>Gained hands-on experience with cutting-edge AI techniques from world-class researchers.</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/C5610AQFzWKdrzdRvPw/videocover-high/videocover-high/0/1702853309863/Kaust_Squaremp4?e=2147483647&v=beta&t=W7wZnYa2j-jU4-cgIMv47qmaLWfPtBc-_ppCWejUqjo',
            modalImage: ''
        }
    };

    // Open modal function
    function openModal(experienceId) {
        const data = experienceData[experienceId];
        if (!data) return;

        // Populate modal content
        modal.querySelector('.experience-modal__date').textContent = data.date;
        modal.querySelector('.experience-modal__title').textContent = data.title;
        modal.querySelector('.experience-modal__company').textContent = data.company;
        modal.querySelector('.experience-modal__description').innerHTML = data.description;

        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // GSAP animation for modal content
        gsap.fromTo(modal.querySelector('.experience-modal__content'),
            { scale: 0.9, y: 20, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }
        );
    }

    // Close modal function
    function closeModal() {
        gsap.to(modal.querySelector('.experience-modal__content'), {
            scale: 0.9,
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Event listeners for opening modal
    allClickableItems.forEach(item => {
        item.addEventListener('click', () => {
            const experienceId = item.dataset.experience;
            openModal(experienceId);
        });
    });

    // Event listeners for closing modal
    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    // Keyboard support - Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ------------------------------------------------
   Project Modal
   ------------------------------------------------ */
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBackdrop = modal?.querySelector('.project-modal__backdrop');
    const modalClose = modal?.querySelector('.project-modal__close');
    const projectCards = document.querySelectorAll('.project-row[data-project]');

    if (!modal || projectCards.length === 0) return;

    // Project data
    const projectData = {
        1: {
            category: 'AI/ML',
            title: 'Smart Sports Camera',
            description: `<p>AI League Finalist project that earned recognition for innovation in sports technology.</p>
            <p>Developed a YOLOv8-based smart camera system capable of tracking players in real-time and automatically generating sports highlight reels. The system uses computer vision to identify key moments in gameplay and creates compilation videos without manual intervention.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Real-time player detection and tracking</li>
                <li>Automated highlight generation</li>
                <li>Multi-camera support</li>
                <li>Performance analytics dashboard</li>
            </ul>`,
            tech: ['YOLOv8', 'Python', 'Computer Vision', 'OpenCV', 'PyTorch'],
            github: 'https://github.com/1Baleid',
            cardImage: '',
            modalImage: ''
        },
        2: {
            category: 'AI/ML',
            title: 'LLM Human Preference Prediction',
            description: `<p>NTU Machine Learning course project (SC4000) focused on understanding and predicting human preferences for Large Language Model outputs.</p>
            <p>Built a system that predicts which LLM-generated responses humans will prefer using knowledge distillation techniques from multiple state-of-the-art models including Gemma, LLaMA, and Qwen.</p>
            <p><strong>Techniques Used:</strong></p>
            <ul>
                <li>Knowledge distillation from multiple LLMs</li>
                <li>Preference learning and ranking</li>
                <li>Transformer fine-tuning</li>
                <li>Ensemble methods</li>
            </ul>`,
            tech: ['LLMs', 'NLP', 'PyTorch', 'Transformers', 'Knowledge Distillation'],
            github: 'https://github.com/1Baleid',
            cardImage: '',
            modalImage: ''
        },
        3: {
            category: 'AI/ML',
            title: 'Oxford Flowers Classification',
            description: `<p>NTU Deep Learning course project (SC4001) implementing advanced image classification techniques on the Oxford Flowers 102 dataset.</p>
            <p>Developed and optimized deep learning models for classifying 102 different flower species using PyTorch, achieving high accuracy through careful architecture selection and training strategies.</p>
            <p><strong>Achievements:</strong></p>
            <ul>
                <li>Implemented multiple CNN architectures</li>
                <li>Applied transfer learning from pretrained models</li>
                <li>Data augmentation and regularization techniques</li>
                <li>Hyperparameter optimization</li>
            </ul>`,
            tech: ['PyTorch', 'CNN', 'Deep Learning', 'Transfer Learning', 'Computer Vision'],
            github: 'https://github.com/1Baleid',
            cardImage: '',
            modalImage: ''
        },
        4: {
            category: 'Web Development',
            title: 'ReqFlow',
            description: `<p>A lightweight, web-based requirements management system designed specifically for small teams and startups who need a simple yet effective way to track project requirements.</p>
            <p>Features a clean, intuitive interface with role-based access control, requirement tracking, and team collaboration tools.</p>
            <p><strong>Features:</strong></p>
            <ul>
                <li>Role-based access control</li>
                <li>Requirement tracking and versioning</li>
                <li>Team collaboration tools</li>
                <li>Export to multiple formats</li>
                <li>Responsive design</li>
            </ul>`,
            tech: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'UI/UX'],
            github: 'https://github.com/1Baleid',
            cardImage: '',
            modalImage: ''
        },
        5: {
            category: 'AI/ML',
            title: 'RAG System Development',
            description: `<p>Developed enterprise-grade Retrieval-Augmented Generation (RAG) systems during my time at Renad Al Majd Group.</p>
            <p>Built knowledge management solutions using LangChain for orchestration and n8n for workflow automation, enabling organizations to leverage their internal documents with AI-powered search and question answering.</p>
            <p><strong>Components:</strong></p>
            <ul>
                <li>Document ingestion and processing pipelines</li>
                <li>Vector database integration</li>
                <li>LLM-powered query understanding</li>
                <li>Automated workflow triggers with n8n</li>
            </ul>`,
            tech: ['LangChain', 'RAG', 'n8n', 'Python', 'Vector Databases'],
            github: 'https://github.com/1Baleid',
            cardImage: '',
            modalImage: ''
        },
        6: {
            category: 'Research',
            title: 'VLM Hallucination Research',
            description: `<p>Research project at SDAIA-KFUPM Joint Research Center for AI (JRCAI) focusing on evaluating and reducing hallucinations in Vision-Language Models.</p>
            <p>Designing controlled experiments to detect, categorize, and mitigate hallucinations in VLMs when applied to domain-specific tasks in healthcare and education.</p>
            <p><strong>Research Focus:</strong></p>
            <ul>
                <li>Hallucination detection methodologies</li>
                <li>Domain-specific evaluation benchmarks</li>
                <li>Mitigation strategies for VLMs</li>
                <li>Healthcare and education applications</li>
            </ul>
            <p><strong>Supervisor:</strong> Dr. Muzammil Behzad</p>`,
            tech: ['VLMs', 'Research', 'Healthcare AI', 'Python', 'Evaluation'],
            github: 'https://github.com/1Baleid',
            cardImage: '',
            modalImage: ''
        }
    };

    // Open modal function
    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        // Populate modal content
        modal.querySelector('.project-modal__category').textContent = data.category;
        modal.querySelector('.project-modal__title').textContent = data.title;
        modal.querySelector('.project-modal__description').innerHTML = data.description;

        // Populate tech tags
        const techContainer = modal.querySelector('.project-modal__tech');
        techContainer.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for opening modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            openModal(projectId);
        });
    });

    // Event listeners for closing modal
    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    // Keyboard support - Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ------------------------------------------------
   Card Images Initialization
   Loads images from data objects into card containers
   ------------------------------------------------ */
function initCardImages() {
    // Experience data for card images (same as in initExperienceModal)
    const experienceCardImages = {
        1: 'assets/images/sdaia-jrcai.png',
        2: 'https://cdn.prod.website-files.com/66c8945bfb638155af230df6/66d5e83a7965368cd3bef0d4_SAP.png',
        3: 'assets/images/arkan.png',
        4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte2-ZT_JSzcLjafdArm65XeFSrpA4sFkTdw&s',
        5: 'https://www.rmg-sa.com/wp-content/uploads/2023/10/512.jpg',
        6: 'assets/images/codelink.png',
        7: 'assets/images/kfupm-ses.png',
        8: 'assets/images/aifa-club.png',
        9: 'assets/images/net-zero.png',
        edu1: 'https://argaamplus.s3.amazonaws.com/be72021d-9734-4f0f-bb5d-dd27b437b815.png',
        edu2: 'https://i0.wp.com/postgrad.com.sg/wp-content/uploads/2019/10/NTU-School-Cover-Image-01.png?resize=760%2C497&ssl=1',
        edu3: 'https://media.licdn.com/dms/image/v2/C5610AQFzWKdrzdRvPw/videocover-high/videocover-high/0/1702853309863/Kaust_Squaremp4?e=2147483647&v=beta&t=W7wZnYa2j-jU4-cgIMv47qmaLWfPtBc-_ppCWejUqjo'
    };

    // Certification data for card images (same as in initCertificationModal)
    const certificationCardImages = {
        1: 'https://media.licdn.com/dms/image/v2/D4E2DAQF57QCnL6IqZg/profile-treasury-document-images_1280/B4EZw3xPwlIkAU-/1/1770462185971?e=1772064000&v=beta&t=QlZIDxbqF4A7lyS7WuPdAsFx6mISBc00bsg1MLUjsmY',
        2: 'https://media.licdn.com/dms/image/v2/D4D2DAQH99wuPJnGt7w/profile-treasury-document-images_1280/B4DZX5vJ1OG8AY-/1/1743651645702?e=1772064000&v=beta&t=9XGS3-URBzvV-yOVOil7dpK1AxZI4Rhcqq5dwR9BYLE',
        3: 'https://media.licdn.com/dms/image/v2/D4D2DAQGOPOWmgv2UGA/profile-treasury-document-images_1280/B4DZX5uyxpGwAY-/1/1743651551471?e=1772064000&v=beta&t=KvVei5Y2ceXAeoCDF-wIQsnlcskwRStxMvYM7DxrBYU',
        4: 'https://media.licdn.com/dms/image/v2/D4D2DAQFVRLgetZJy-g/profile-treasury-image-shrink_800_800/B4DZbPfpVbGwAY-/0/1747237903123?e=1771671600&v=beta&t=G3cx-wdeyzhh06BkhO8vcei9Sa6x0OrV5Y_9EsBVrRo',
        5: 'https://media.licdn.com/dms/image/v2/D4D2DAQFFEsiGl6PbgA/profile-treasury-image-shrink_1280_1280/B4DZaxD5GRG8AQ-/0/1746727311944?e=1771671600&v=beta&t=tjWH8fbOP3sE0Ola3dgGgLI3pcLBwokKDXGkUxuyvl0',
        6: 'assets/images/mckinsey-forward.png',
        7: 'assets/images/a-phys101.jpg',
        8: 'assets/images/a-phys102.jpg',
        9: 'assets/images/gemfair.png',
        10: 'https://media.licdn.com/dms/image/v2/D4D2DAQH_iCuDAyiFyQ/profile-treasury-image-shrink_800_800/B4DZapAyQ.G4AY-/0/1746592278979?e=1771671600&v=beta&t=rHubdSi8VhHGcQF6N9xzce-RRXmTESvU-KHohpO0kUk',
        11: 'https://media.licdn.com/dms/image/v2/D4E2DAQFzsI1Pl5-6TQ/profile-treasury-image-shrink_1280_1280/B4EZw_As1sKAAQ-/0/1770583675605?e=1771671600&v=beta&t=a8e6jiM-qJ81Mxdos0CoQOgEFnZyah5lBdr3FZIBbHM'
    };

    // Load experience timeline card images
    document.querySelectorAll('.experience-timeline__item[data-experience]').forEach(item => {
        const id = item.dataset.experience;
        const imagePath = experienceCardImages[id];
        if (imagePath) {
            const container = item.querySelector('.experience-timeline__card-image');
            if (container) {
                container.innerHTML = `<img src="${imagePath}" alt="Card image" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
            }
        }
    });

    // Load journey/education card images
    document.querySelectorAll('.journey__card[data-experience]').forEach(card => {
        const id = card.dataset.experience;
        const imagePath = experienceCardImages[id];
        if (imagePath) {
            const container = card.querySelector('.journey__card-image');
            if (container) {
                container.innerHTML = `<img src="${imagePath}" alt="Card image" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
            }
        }
    });

    // Load certification card images
    document.querySelectorAll('.certification-card[data-cert]').forEach(card => {
        const id = card.dataset.cert;
        const imagePath = certificationCardImages[id];
        if (imagePath) {
            // Check if image container exists, create if not
            let container = card.querySelector('.certification-card__image');
            if (!container) {
                container = document.createElement('div');
                container.className = 'certification-card__image';
                card.insertBefore(container, card.firstChild);
            }
            container.innerHTML = `<img src="${imagePath}" alt="Card image" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
        }
    });
}

/* ------------------------------------------------
   Certification Modal
   ------------------------------------------------ */
function initCertificationModal() {
    const modal = document.getElementById('certificationModal');
    const modalBackdrop = modal?.querySelector('.certification-modal__backdrop');
    const modalClose = modal?.querySelector('.certification-modal__close');
    const certCards = document.querySelectorAll('.certification-card[data-cert]');

    if (!modal || certCards.length === 0) return;

    // Certification data with images
    const certificationData = {
        1: {
            date: 'Feb 2026',
            title: 'SAP Certified Associate',
            organization: 'SAP Generative AI Developer',
            description: `<p>Official SAP certification demonstrating expertise in building generative AI solutions using SAP technologies.</p><p>Validates skills in developing AI-powered business applications and integrating generative AI capabilities into enterprise systems.</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/D4E2DAQF57QCnL6IqZg/profile-treasury-document-images_1280/B4EZw3xPwlIkAU-/1/1770462185971?e=1772064000&v=beta&t=QlZIDxbqF4A7lyS7WuPdAsFx6mISBc00bsg1MLUjsmY',
            modalImage: ''
        },
        2: {
            date: 'Feb 2025',
            title: 'Advanced AI Course',
            organization: 'KAUST',
            description: `<p>Advanced AI certification covering Convolutional Neural Networks (CNNs) and Generative AI techniques.</p><p>Completed as part of the AI Specialist Program at King Abdullah University of Science and Technology.</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/D4D2DAQH99wuPJnGt7w/profile-treasury-document-images_1280/B4DZX5vJ1OG8AY-/1/1743651645702?e=1772064000&v=beta&t=9XGS3-URBzvV-yOVOil7dpK1AxZI4Rhcqq5dwR9BYLE',
            modalImage: ''
        },
        3: {
            date: 'Jan 2025',
            title: 'Intro to AI Course',
            organization: 'KAUST',
            description: `<p>Foundational AI certification covering Linear Regression and Logistic Regression.</p><p>Completed as part of the AI Specialist Program at King Abdullah University of Science and Technology.</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/D4D2DAQGOPOWmgv2UGA/profile-treasury-document-images_1280/B4DZX5uyxpGwAY-/1/1743651551471?e=1772064000&v=beta&t=KvVei5Y2ceXAeoCDF-wIQsnlcskwRStxMvYM7DxrBYU',
            modalImage: ''
        },
        4: {
            date: 'May 2025',
            title: 'Certificate of Appreciation',
            organization: 'AI League Finals - Tuwaiq Academy',
            description: `<p>Recognition for outstanding participation and achievement in the AI League Finals competition.</p><p>Developed a smart sports camera system using YOLOv8 for real-time player tracking and automated highlight generation.</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/D4D2DAQFVRLgetZJy-g/profile-treasury-image-shrink_800_800/B4DZbPfpVbGwAY-/0/1747237903123?e=1771671600&v=beta&t=G3cx-wdeyzhh06BkhO8vcei9Sa6x0OrV5Y_9EsBVrRo',
            modalImage: ''
        },
        5: {
            date: 'Nov 2024',
            title: 'IELTS Band 6.5 (B2)',
            organization: 'English Proficiency',
            description: `<p>International English Language Testing System certification demonstrating B2 level English proficiency.</p><p>Score of 6.5 indicates upper-intermediate English skills for academic and professional contexts.</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/D4D2DAQFFEsiGl6PbgA/profile-treasury-image-shrink_1280_1280/B4DZaxD5GRG8AQ-/0/1746727311944?e=1771671600&v=beta&t=tjWH8fbOP3sE0Ola3dgGgLI3pcLBwokKDXGkUxuyvl0',
            modalImage: ''
        },
        6: {
            date: 'Jul 2025',
            title: 'McKinsey Forward Program',
            organization: 'McKinsey & Company',
            description: `<p>Completed the McKinsey Forward program, a prestigious learning experience focused on developing problem-solving, communication, and professional skills.</p><p>Gained frameworks and methodologies used by McKinsey consultants in tackling complex business challenges.</p>`,
            cardImage: 'assets/images/mckinsey-forward.png',
            modalImage: ''
        },
        7: {
            date: 'Jun 2022',
            title: 'Physics 101 A+ Honor',
            organization: 'SABIC Sponsored - KFUPM Physics Department',
            description: `<p>Academic excellence award for achieving A+ grade in Physics 101 course at KFUPM.</p><p>Sponsored by SABIC in recognition of outstanding academic performance in physics.</p>`,
            cardImage: 'assets/images/a-phys101.jpg',
            modalImage: ''
        },
        8: {
            date: 'Jun 2022',
            title: 'Physics 102 A+ Honor',
            organization: 'SABIC Sponsored - KFUPM Physics Department',
            description: `<p>Academic excellence award for achieving A+ grade in Physics 102 course at KFUPM.</p><p>Sponsored by SABIC in recognition of outstanding academic performance in physics.</p>`,
            cardImage: 'assets/images/a-phys102.jpg',
            modalImage: ''
        },
        9: {
            date: '2025',
            title: 'GEM FAIR 2025',
            organization: 'Letter of Participation - NTU Singapore',
            description: `<p>Letter of Participation from Nanyang Technological University for participating in the Global Exchange Module (GEM) Fair 2025.</p><p>Recognized as part of the exchange program experience in Singapore.</p>`,
            cardImage: 'assets/images/gemfair.png',
            modalImage: ''
        },
        10: {
            date: 'Sep 2023',
            title: 'Community Work Fundamentals',
            organization: 'Al Fozan Academy + Aramco',
            description: `<p>Certification in community work fundamentals jointly offered by Al Fozan Academy and Aramco.</p><p>Covered principles of community engagement, volunteer management, and social impact initiatives.</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/D4D2DAQH_iCuDAyiFyQ/profile-treasury-image-shrink_800_800/B4DZapAyQ.G4AY-/0/1746592278979?e=1771671600&v=beta&t=rHubdSi8VhHGcQF6N9xzce-RRXmTESvU-KHohpO0kUk',
            modalImage: ''
        },
        11: {
            date: 'Jan 2026',
            title: 'MENA Machine Learning Winter School 2026',
            organization: 'King Abdullah University of Science and Technology (KAUST)',
            description: `<p>Certificate of Participation for active participation and successful completion of the <strong>MENA Machine Learning Winter School 2026 (MenaML)</strong>.</p><p>Held at King Abdullah University of Science and Technology, Saudi Arabia, from <strong>24 - 29 January 2026</strong>.</p><p>Selected among <strong>300 participants from 2,222 applicants</strong> (13.5% acceptance rate) for this prestigious ML school.</p><p>Featured lectures by <strong>Google DeepMind researchers</strong> covering cutting-edge machine learning topics.</p><p><strong>Directors:</strong> Dr. Safa Messaoud, Maria Abi</p>`,
            cardImage: 'https://media.licdn.com/dms/image/v2/D4E2DAQFzsI1Pl5-6TQ/profile-treasury-image-shrink_1280_1280/B4EZw_As1sKAAQ-/0/1770583675605?e=1771671600&v=beta&t=a8e6jiM-qJ81Mxdos0CoQOgEFnZyah5lBdr3FZIBbHM',
            modalImage: ''
        }
    };

    // Open modal function
    function openModal(certId, cardElement) {
        const data = certificationData[certId];
        if (!data) return;

        // Populate modal content
        modal.querySelector('.certification-modal__date').textContent = data.date;
        modal.querySelector('.certification-modal__title').textContent = data.title;
        modal.querySelector('.certification-modal__organization').textContent = data.organization;
        modal.querySelector('.certification-modal__description').innerHTML = data.description;

        // Handle image - get from card if available
        const imageContainer = modal.querySelector('.certification-modal__image');
        const cardImg = cardElement?.querySelector('img');

        if (cardImg) {
            // Use the image from the card
            imageContainer.innerHTML = `<img src="${cardImg.src}" alt="${data.title}">`;
        } else if (data.modalImage) {
            imageContainer.innerHTML = `<img src="${data.modalImage}" alt="${data.title}">`;
        } else {
            imageContainer.innerHTML = '';
        }

        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for opening modal
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const certId = card.dataset.cert;
            openModal(certId, card);
        });
    });

    // Event listeners for closing modal
    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    // Keyboard support - Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize certification modal
initCertificationModal();

/* ------------------------------------------------
   Scroll-triggered animations for footer
   ------------------------------------------------ */
gsap.from('.footer__brand', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power2.out'
});

gsap.from('.footer__nav', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: 0.2,
    ease: 'power2.out'
});

gsap.from('.footer__social', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: 0.4,
    ease: 'power2.out'
});

/* ------------------------------------------------
   IMAGE ATTACHMENT MODE (Development Only)
   Set to false when all images are uploaded
   ------------------------------------------------ */
const DEV_MODE_IMAGE_ATTACH = false;

if (DEV_MODE_IMAGE_ATTACH) {
    initImageAttachmentMode();
}

function initImageAttachmentMode() {
    // Create styles for attachment buttons
    const style = document.createElement('style');
    style.textContent = `
        .attach-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.9);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .attach-btn:hover {
            background: rgba(59, 130, 246, 1);
            transform: scale(1.1);
        }
        .attach-btn svg {
            width: 16px;
            height: 16px;
            fill: white;
        }
        .attach-btn--modal {
            top: 12px;
            right: 12px;
            width: 40px;
            height: 40px;
        }
        .attach-btn--modal svg {
            width: 20px;
            height: 20px;
        }
        .experience-timeline__card-image,
        .journey__card-image,
        .project-row__image,
        .certification-card {
            position: relative;
        }
        .experience-modal__image,
        .project-modal__image,
        .certification-modal__image {
            position: relative;
        }
        .attach-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .attach-dialog {
            background: #1a1a2e;
            border-radius: 16px;
            padding: 32px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .attach-dialog__title {
            color: white;
            font-size: 1.25rem;
            margin-bottom: 8px;
        }
        .attach-dialog__subtitle {
            color: rgba(255,255,255,0.6);
            font-size: 0.875rem;
            margin-bottom: 24px;
        }
        .attach-dialog__input {
            width: 100%;
            padding: 12px 16px;
            border-radius: 8px;
            border: 2px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            color: white;
            font-size: 1rem;
            margin-bottom: 16px;
            box-sizing: border-box;
        }
        .attach-dialog__input:focus {
            outline: none;
            border-color: rgba(59, 130, 246, 0.5);
        }
        .attach-dialog__btns {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }
        .attach-dialog__btn {
            padding: 10px 20px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .attach-dialog__btn--cancel {
            background: rgba(255,255,255,0.1);
            color: white;
        }
        .attach-dialog__btn--cancel:hover {
            background: rgba(255,255,255,0.2);
        }
        .attach-dialog__btn--save {
            background: rgba(59, 130, 246, 1);
            color: white;
        }
        .attach-dialog__btn--save:hover {
            background: rgba(59, 130, 246, 0.8);
        }
        .attach-dialog__preview {
            margin-bottom: 16px;
            border-radius: 8px;
            overflow: hidden;
            background: rgba(255,255,255,0.05);
            min-height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .attach-dialog__preview img {
            max-width: 100%;
            max-height: 200px;
            object-fit: contain;
        }
        .attach-dialog__preview-placeholder {
            color: rgba(255,255,255,0.3);
            font-size: 0.875rem;
        }
    `;
    document.head.appendChild(style);

    // Create attach button SVG
    const attachSvg = `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`;

    // Add attach buttons to experience timeline cards
    document.querySelectorAll('.experience-timeline__card-image').forEach(container => {
        const item = container.closest('.experience-timeline__item');
        if (item) {
            const btn = createAttachButton();
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                showAttachDialog('experience', item.dataset.experience, 'card');
            });
            container.appendChild(btn);
        }
    });

    // Add attach buttons to journey/education cards
    document.querySelectorAll('.journey__card-image').forEach(container => {
        const item = container.closest('.journey__card');
        if (item) {
            const btn = createAttachButton();
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                showAttachDialog('experience', item.dataset.experience, 'card');
            });
            container.appendChild(btn);
        }
    });

    // Add attach buttons to project cards
    document.querySelectorAll('.project-row__image').forEach(container => {
        const item = container.closest('.project-row');
        if (item) {
            const btn = createAttachButton();
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                showAttachDialog('project', item.dataset.project, 'card');
            });
            container.appendChild(btn);
        }
    });

    // Add attach buttons to certification cards (they don't have image containers, so add to card)
    document.querySelectorAll('.certification-card').forEach(card => {
        const btn = createAttachButton();
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showAttachDialog('certification', card.dataset.cert, 'card');
        });
        card.appendChild(btn);
    });

    // Add attach button to experience modal
    const expModal = document.querySelector('.experience-modal__image');
    if (expModal) {
        const btn = createAttachButton(true);
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const activeId = getCurrentExperienceId();
            if (activeId) showAttachDialog('experience', activeId, 'modal');
        });
        expModal.appendChild(btn);
    }

    // Add attach button to project modal
    const projModal = document.querySelector('.project-modal__image');
    if (projModal) {
        const btn = createAttachButton(true);
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const activeId = getCurrentProjectId();
            if (activeId) showAttachDialog('project', activeId, 'modal');
        });
        projModal.appendChild(btn);
    }

    // Add attach button to certification modal
    const certModal = document.querySelector('.certification-modal__image');
    if (certModal) {
        const btn = createAttachButton(true);
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const activeId = getCurrentCertId();
            if (activeId) showAttachDialog('certification', activeId, 'modal');
        });
        certModal.appendChild(btn);
    }

    function createAttachButton(isModal = false) {
        const btn = document.createElement('button');
        btn.className = 'attach-btn' + (isModal ? ' attach-btn--modal' : '');
        btn.innerHTML = attachSvg;
        btn.title = 'Attach image';
        return btn;
    }

    function getCurrentExperienceId() {
        const modal = document.getElementById('experienceModal');
        if (!modal?.classList.contains('active')) return null;
        // Find which item triggered the modal by checking the title
        const title = modal.querySelector('.experience-modal__title')?.textContent;
        const items = [...document.querySelectorAll('.experience-timeline__item'), ...document.querySelectorAll('.journey__card')];
        for (const item of items) {
            const itemTitle = item.querySelector('.experience-timeline__title, .journey__card-title')?.textContent;
            if (itemTitle && title?.includes(itemTitle.trim())) {
                return item.dataset.experience;
            }
        }
        return null;
    }

    function getCurrentProjectId() {
        const modal = document.getElementById('projectModal');
        if (!modal?.classList.contains('active')) return null;
        const title = modal.querySelector('.project-modal__title')?.textContent;
        const cards = document.querySelectorAll('.project-row[data-project]');
        for (const card of cards) {
            const cardTitle = card.querySelector('.project-row__title')?.textContent;
            if (cardTitle && title?.includes(cardTitle.trim())) {
                return card.dataset.project;
            }
        }
        return null;
    }

    function getCurrentCertId() {
        const modal = document.getElementById('certificationModal');
        if (!modal?.classList.contains('active')) return null;
        const title = modal.querySelector('.certification-modal__title')?.textContent;
        const cards = document.querySelectorAll('.certification-card[data-cert]');
        for (const card of cards) {
            const cardTitle = card.querySelector('.certification-card__title')?.textContent;
            if (cardTitle && title?.includes(cardTitle.trim())) {
                return card.dataset.cert;
            }
        }
        return null;
    }

    // Watch for modals opening and apply saved modal images
    function setupModalObservers() {
        const modals = [
            { el: document.getElementById('experienceModal'), type: 'experience', getIdFn: getCurrentExperienceId },
            { el: document.getElementById('projectModal'), type: 'project', getIdFn: getCurrentProjectId },
            { el: document.getElementById('certificationModal'), type: 'certification', getIdFn: getCurrentCertId }
        ];

        modals.forEach(({ el, type, getIdFn }) => {
            if (!el) return;

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class' && el.classList.contains('active')) {
                        // Modal just opened, check for saved image
                        setTimeout(() => {
                            const id = getIdFn();
                            if (id) {
                                const savedPath = getSavedModalImage(type, id);
                                if (savedPath) {
                                    updateModalImage(type, savedPath);
                                }
                            }
                        }, 50);
                    }
                });
            });

            observer.observe(el, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // Initialize modal observers
    setupModalObservers();

    function showAttachDialog(type, id, target) {
        const overlay = document.createElement('div');
        overlay.className = 'attach-overlay';

        const dialog = document.createElement('div');
        dialog.className = 'attach-dialog';
        dialog.innerHTML = `
            <h3 class="attach-dialog__title">Attach Image</h3>
            <p class="attach-dialog__subtitle">${type.charAt(0).toUpperCase() + type.slice(1)} #${id} - ${target === 'card' ? 'Card Image' : 'Modal Image'}</p>
            <div class="attach-dialog__preview">
                <span class="attach-dialog__preview-placeholder">Image preview will appear here</span>
            </div>
            <input type="text" class="attach-dialog__input" placeholder="Enter image path (e.g., images/photo.jpg or https://...)" />
            <div class="attach-dialog__btns">
                <button class="attach-dialog__btn attach-dialog__btn--cancel">Cancel</button>
                <button class="attach-dialog__btn attach-dialog__btn--save">Save</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const input = dialog.querySelector('.attach-dialog__input');
        const preview = dialog.querySelector('.attach-dialog__preview');
        const cancelBtn = dialog.querySelector('.attach-dialog__btn--cancel');
        const saveBtn = dialog.querySelector('.attach-dialog__btn--save');

        // Preview image on input
        input.addEventListener('input', () => {
            const path = input.value.trim();
            if (path) {
                preview.innerHTML = `<img src="${path}" alt="Preview" onerror="this.parentElement.innerHTML='<span class=\\'attach-dialog__preview-placeholder\\'>Invalid image path</span>'" />`;
            } else {
                preview.innerHTML = `<span class="attach-dialog__preview-placeholder">Image preview will appear here</span>`;
            }
        });

        // Cancel
        cancelBtn.addEventListener('click', () => {
            overlay.remove();
        });

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        // Save
        saveBtn.addEventListener('click', () => {
            const path = input.value.trim();
            if (path) {
                saveImagePath(type, id, target, path);
                overlay.remove();
            }
        });

        // Focus input
        setTimeout(() => input.focus(), 100);
    }

    // Storage key for persisting images
    const STORAGE_KEY = 'dev_attached_images';

    // Load saved images from localStorage
    function loadSavedImages() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            const images = JSON.parse(saved);
            Object.entries(images).forEach(([key, path]) => {
                const [type, id, target] = key.split('_');
                if (target === 'card') {
                    updateCardImage(type, id, path);
                }
                // Modal images are loaded when modal opens
            });
            console.log('%c Loaded saved images from localStorage ', 'background: #8b5cf6; color: white; padding: 4px 8px; border-radius: 4px;');
        } catch (e) {
            console.error('Error loading saved images:', e);
        }
    }

    // Get saved modal image for a specific item
    function getSavedModalImage(type, id) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;
        try {
            const images = JSON.parse(saved);
            return images[`${type}_${id}_modal`] || null;
        } catch (e) {
            return null;
        }
    }

    function saveImagePath(type, id, target, path) {
        const imageKey = target === 'card' ? 'cardImage' : 'modalImage';

        // Save to localStorage for persistence
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        saved[`${type}_${id}_${target}`] = path;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

        // Log the update for easy copy-paste
        console.log(`%c IMAGE PATH UPDATE `, 'background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px;');
        console.log(`Type: ${type}, ID: ${id}, Target: ${target}`);
        console.log(`Path: "${path}"`);
        console.log(`Update the data object: ${type}Data[${id}].${imageKey} = '${path}'`);

        // Update the card image display
        if (target === 'card') {
            updateCardImage(type, id, path);
        } else {
            updateModalImage(type, path);
        }
    }

    // Export all saved images (call this in console when done)
    window.exportSavedImages = function() {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        console.log('%c ALL SAVED IMAGE PATHS ', 'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px;');
        console.log('Copy these into your data objects:\n');

        const byType = { experience: {}, project: {}, certification: {} };
        Object.entries(saved).forEach(([key, path]) => {
            const [type, id, target] = key.split('_');
            if (!byType[type][id]) byType[type][id] = {};
            byType[type][id][target === 'card' ? 'cardImage' : 'modalImage'] = path;
        });

        Object.entries(byType).forEach(([type, items]) => {
            if (Object.keys(items).length > 0) {
                console.log(`\n// ${type}Data updates:`);
                Object.entries(items).forEach(([id, images]) => {
                    Object.entries(images).forEach(([key, path]) => {
                        console.log(`${type}Data['${id}'].${key} = '${path}';`);
                    });
                });
            }
        });

        return saved;
    };

    // Clear all saved images
    window.clearSavedImages = function() {
        localStorage.removeItem(STORAGE_KEY);
        console.log('%c Cleared all saved images ', 'background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px;');
        console.log('Refresh the page to see the changes.');
    };

    function updateCardImage(type, id, path) {
        let container;

        if (type === 'experience') {
            const item = document.querySelector(`.experience-timeline__item[data-experience="${id}"]`) ||
                        document.querySelector(`.journey__card[data-experience="${id}"]`);
            container = item?.querySelector('.experience-timeline__card-image, .journey__card-image');
        } else if (type === 'project') {
            const item = document.querySelector(`.project-row[data-project="${id}"]`);
            container = item?.querySelector('.project-row__image');
        } else if (type === 'certification') {
            // Certifications don't have card images currently, but we can add one
            const card = document.querySelector(`.certification-card[data-cert="${id}"]`);
            if (card) {
                let imgContainer = card.querySelector('.certification-card__image');
                if (!imgContainer) {
                    imgContainer = document.createElement('div');
                    imgContainer.className = 'certification-card__image';
                    card.insertBefore(imgContainer, card.firstChild);
                }
                container = imgContainer;
            }
        }

        if (container) {
            // Keep the attach button
            const attachBtn = container.querySelector('.attach-btn');
            container.innerHTML = `<img src="${path}" alt="Card image" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
            if (attachBtn) container.appendChild(attachBtn);
        }
    }

    function updateModalImage(type, path) {
        let container;

        if (type === 'experience') {
            container = document.querySelector('.experience-modal__image');
        } else if (type === 'project') {
            container = document.querySelector('.project-modal__image');
        } else if (type === 'certification') {
            container = document.querySelector('.certification-modal__image');
        }

        if (container) {
            // Keep the attach button
            const attachBtn = container.querySelector('.attach-btn');
            container.innerHTML = `<img src="${path}" alt="Modal image" style="width:100%;height:100%;object-fit:contain;">`;
            if (attachBtn) container.appendChild(attachBtn);
        }
    }

    // Load saved images on init
    loadSavedImages();

    console.log('%c DEV MODE: Image Attachment Enabled ', 'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px;');
    console.log('Click the blue + buttons on cards and modals to attach images.');
    console.log('Images are now saved to localStorage and persist across refreshes!');
    console.log('');
    console.log('%c Commands: ', 'background: #6366f1; color: white; padding: 4px 8px; border-radius: 4px;');
    console.log('  exportSavedImages() - Export all paths to copy into code');
    console.log('  clearSavedImages()  - Clear all saved images');
    console.log('');
    console.log('When done, set DEV_MODE_IMAGE_ATTACH to false in main.js');
}
