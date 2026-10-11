/**
 * BusSync Research Project Interactive Script
 * Formatted to match OptiTech single-page interactive experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // ─── 1. Sticky Navigation & Scroll Spy ───
    const nav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section[id], div.sub-section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link, .nav-links .dropdown-trigger');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Navbar appearance on scroll
        if (scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Scroll spy for active navbar section
        let currentId = 'Home';
        const mainSections = document.querySelectorAll('section[id]');
        mainSections.forEach(sec => {
            const top = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentId = sec.getAttribute('id');
            }
        });

        // Update active class
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    });

    // ─── 2. Mobile Drawer & Accordion Toggle ───
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDomainBtn = document.getElementById('mobileDomainBtn');
    const mobileDomainMenu = document.getElementById('mobileDomainMenu');
    const mobileDrawerLinks = document.querySelectorAll('#mobileDrawer a');

    function closeDrawer() {
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = 'auto';
            if (mobileToggle) {
                mobileToggle.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            }
        }
    }

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileDrawer.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
            mobileToggle.innerHTML = isOpen
                ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
                : `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        });

        if (mobileDomainBtn && mobileDomainMenu) {
            mobileDomainBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileDomainMenu.classList.toggle('open');
                const isExpanded = mobileDomainMenu.classList.contains('open');
                mobileDomainBtn.querySelector('svg').style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            });
        }

        // Close on link click
        mobileDrawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeDrawer();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeDrawer();
            }
        });

        // Close on resize > 768px
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeDrawer();
            }
        });
    }

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });

    // ─── 4. Contact Us Form Submission ───
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending message...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent to the BusSync research team and supervisors.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 700);
        });
    }
});
