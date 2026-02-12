/* ================================================
   PORTFOLIO - Main JavaScript
   Advanced GSAP Animations & Premium Interactions
   ================================================ */

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
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    revealElements.forEach(element => {
        const direction = element.classList.contains('reveal-left') ? -100 :
                         element.classList.contains('reveal-right') ? 100 : 0;

        gsap.set(element, {
            opacity: 0,
            x: direction,
            y: element.classList.contains('reveal-up') ? 80 : 0
        });

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            delay: parseFloat(getComputedStyle(element).getPropertyValue('--delay') || 0),
            ease: 'power3.out'
        });
    });

    // Project cards stagger animation with 3D flip
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        gsap.set(card, {
            opacity: 0,
            y: 100,
            rotateX: 15,
            transformPerspective: 1000
        });

        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Skill categories animation with scale
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach((category, index) => {
        gsap.set(category, {
            opacity: 0,
            scale: 0.8,
            y: 50
        });

        gsap.to(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
        });
    });

    // Skill tags stagger animation
    skillCategories.forEach(category => {
        const tags = category.querySelectorAll('.skill-tag');

        gsap.set(tags, {
            opacity: 0,
            scale: 0,
            y: 20
        });

        gsap.to(tags, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(2)',
            delay: 0.3
        });
    });

    // Timeline items animation with line drawing effect
    const timelineItems = document.querySelectorAll('.timeline__item');

    timelineItems.forEach((item, index) => {
        gsap.set(item, {
            opacity: 0,
            x: -50
        });

        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });

        // Animate the marker
        const marker = item.querySelector('.timeline__marker');
        gsap.set(marker, { scale: 0 });

        gsap.to(marker, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 1,
            duration: 0.5,
            delay: index * 0.15 + 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
    });
}

/* ------------------------------------------------
   Project Filter
   ------------------------------------------------ */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: 'back.out(1.7)',
                        display: 'block'
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                        duration: 0.4,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
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

            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: offsetTop,
                    autoKill: false
                },
                ease: 'power3.inOut'
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
    const tiltCards = document.querySelectorAll('.project-card, .skill-category');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });
}

/* ------------------------------------------------
   Parallax Effects
   ------------------------------------------------ */
function initParallaxEffects() {
    // Parallax for about image
    gsap.to('.about__image-wrapper', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -50,
        rotation: -3
    });

    // Parallax for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        gsap.to(category, {
            scrollTrigger: {
                trigger: '.skills',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: (index % 2 === 0) ? -30 : 30
        });
    });

    // Parallax for timeline
    gsap.to('.timeline', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        backgroundPosition: '0% 100%'
    });

    // Section reveal animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            opacity: 0.5,
            duration: 1,
            ease: 'power2.out'
        });
    });
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
