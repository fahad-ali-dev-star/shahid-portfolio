const elements = document.querySelectorAll("[data-animate]");

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("animated");
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const menuToggle = document.getElementById('menuToggle');
            const nav = document.querySelector('nav');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
            this.setAttribute('aria-expanded', 'true');
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
            this.setAttribute('aria-expanded', 'false');
        }
    });
}

document.addEventListener('click', function(event) {
    if (nav && nav.classList.contains('active') &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)) {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

window.addEventListener('resize', function() {
    if (nav && window.innerWidth > 768) {
        nav.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const termsCheckbox = document.getElementById("terms");
        const statusMsg = document.getElementById("statusMsg");
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;

        if (!termsCheckbox.checked) {
            statusMsg.textContent = "Please agree to the Terms and Conditions to proceed.";
            statusMsg.style.color = "#ff4444";
            return;
        }

        statusMsg.textContent = "Sending message...";
        statusMsg.style.color = "#FFD700";
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const formData = new FormData(this);

        formData.append("terms", termsCheckbox.checked ? "Yes" : "No");

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            const result = await response.json();

            if (result.success) {
                statusMsg.textContent = "Message sent successfully! I'll get back to you soon.";
                statusMsg.style.color = "#4CAF50";
                contactForm.reset();
            } else {
                statusMsg.textContent = "Failed to send message. Please try again or contact directly.";
                statusMsg.style.color = "#ff4444";
                console.log("Error:", result);
            }
        })
        .catch((error) => {
            statusMsg.textContent = "Network error. Please try again.";
            statusMsg.style.color = "#ff4444";
            console.log("Fetch error:", error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
}

function downloadPDF() {
    console.log('Attempting to download PDF...');
    try {
        const link = document.createElement('a');
        link.href = 'Muhammad_Shahid_Portfolio.pdf';
        link.download = 'Muhammad_Shahid_Portfolio.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Download initiated');
    } catch (error) {
        console.log('Download error:', error);
        window.open('Muhammad_Shahid_Portfolio.pdf', '_blank');
    }
}

const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
    revealOnScroll();
});

document.querySelectorAll('.service-box, .case-box, .testimonial').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

elements.forEach(el => observer.observe(el));

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadPDF();
        });
    }

    revealOnScroll();

    window.addEventListener('scroll', revealOnScroll);

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = ripple.style.height = '0';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

console.log("Enhanced Portfolio Loaded Successfully");
