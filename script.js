// Scroll reveal animation
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const menuToggle = document.getElementById('menuToggle');
            const nav = document.querySelector('nav');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
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

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (nav && nav.classList.contains('active') &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)) {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Add resize event listener for responsiveness
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (nav && window.innerWidth > 768) {
        nav.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Contact form submission with Web3Forms
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Check if terms checkbox is checked
        const termsCheckbox = document.getElementById("terms");
        const statusMsg = document.getElementById("statusMsg");
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        if (!termsCheckbox.checked) {
            statusMsg.textContent = "Please agree to the Terms and Conditions to proceed.";
            statusMsg.style.color = "#ff4444";
            return;
        }

        // Show loading message
        statusMsg.textContent = "Sending message...";
        statusMsg.style.color = "#FFD700";
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Create FormData object
        const formData = new FormData(this);
        
        // Add terms checkbox value
        formData.append("terms", termsCheckbox.checked ? "Yes" : "No");

        // Submit to Web3Forms
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            const result = await response.json();
            
            if (result.success) {
                statusMsg.textContent = "Message sent successfully! I'll get back to you soon.";
                statusMsg.style.color = "green";
                // Reset form
                contactForm.reset();
            } else {
                statusMsg.textContent = "Failed to send message. Please try again or contact directly.";
                statusMsg.style.color = "red";
                console.log("Error:", result);
            }
        })
        .catch((error) => {
            statusMsg.textContent = "Network error. Please try again.";
            statusMsg.style.color = "red";
            console.log("Fetch error:", error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
}

// PDF Download functionality
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
        // Fallback to opening in new tab
        window.open('Muhammad_Shahid_Portfolio.pdf', '_blank');
    }
}

// Add click event to the download button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadPDF();
        });
    }
    
    // Initialize animations
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
});

// Console log for debugging
console.log("Portfolio Loaded Successfully");