document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

     // Mobile menu toggle
     const hamburger = document.querySelector('.hamburger');
     const nav = document.querySelector('nav');
     
     if (hamburger && nav) {
         hamburger.addEventListener('click', function() {
             this.classList.toggle('active');
             nav.classList.toggle('active');
         });
     }

    // Add scroll animations to elements
    const animateElements = document.querySelectorAll('.service-card, .formation-card, .testimonial-card, .team-member, .value-card, .post-card');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        animateOnScroll.observe(element);
    });

    // Stats counter animation with improved performance
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const time = 2000;
                    const increment = Math.ceil(countTo / (time / 30));
                    
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= countTo) {
                            clearInterval(timer);
                            target.textContent = countTo;
                        } else {
                            target.textContent = count;
                        }
                    }, 30);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Dynamic typing effect for page titles
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        const typingSpeed = 100;
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        typeWriter();
    }

    // Parallax effect for hero sections
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        });
    });

    // Enhanced form submission with validation feedback
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form first
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add shake animation to indicate error
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 500);
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Add success animation
                form.classList.add('submitted');
                
                // In a real implementation, you would send the form data to a server
                setTimeout(() => {
                    alert('Merci pour votre message ! Nous vous contacterons rapidement.');
                    form.reset();
                    form.classList.remove('submitted');
                }, 1000);
            }
        });
        
        // Remove error class on input
        const formInputs = form.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (input.value.trim()) {
                    input.classList.remove('error');
                }
            });
        });
    });

    // Interactive FAQ accordion with smooth animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQs with smooth animation
                faqItems.forEach(faq => {
                    const faqAnswer = faq.querySelector('.faq-answer');
                    if (faq.classList.contains('active')) {
                        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                        setTimeout(() => {
                            faqAnswer.style.maxHeight = '0px';
                        }, 10);
                        setTimeout(() => {
                            faq.classList.remove('active');
                        }, 300);
                    }
                });
                
                // If the clicked item wasn't active before, make it active with animation
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = '0px';
                    setTimeout(() => {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }, 10);
                }
            });
        });
    }

    // Formation filter with smooth transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    const formationCards = document.querySelectorAll('.formation-card');
    
    if (filterButtons.length > 0 && formationCards.length > 0) {
        formationCards.forEach(card => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button with scale effect
                button.classList.add('active');
                button.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
                
                const filter = button.getAttribute('data-filter');
                
                formationCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, 300);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Blog post filter
    const blogFilterButtons = document.querySelectorAll('.blog-filter .filter-btn');
    const blogPosts = document.querySelectorAll('.post-card');
    
    if (blogFilterButtons.length > 0 && blogPosts.length > 0) {
        blogFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                blogFilterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                blogPosts.forEach(post => {
                    if (filter === 'all' || post.getAttribute('data-category') === filter) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            alert('Merci pour votre message ! Nous vous contacterons rapidement.');
            contactForm.reset();
        });
    }

    const quickContactForm = document.getElementById('quick-contact');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            alert('Merci pour votre message ! Nous vous contacterons rapidement.');
            quickContactForm.reset();
        });
    }

    // Booking form
    const bookingForm = document.querySelector('.booking-form form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            alert('Votre réservation a été confirmée. Vous recevrez un email de confirmation.');
            bookingForm.reset();
        });
    }

    // Smooth scroll to section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video placeholder click handler
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    if (videoPlaceholders.length > 0) {
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', function() {
                // In a real implementation, this would open a video player or youtube embed
                alert('La vidéo serait lancée ici dans une implémentation réelle.');
            });
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            alert('Merci pour votre inscription à notre newsletter !');
            newsletterForm.reset();
        });
    }
});