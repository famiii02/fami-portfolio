// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate skill bars when in view
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    observer.observe(bar);
});

// Custom themed notification
function showNotification(message, isSuccess = true) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.background = isSuccess
        ? "linear-gradient(90deg, var(--neon-green), var(--neon-blue))"
        : "linear-gradient(90deg, red, var(--neon-pink))";
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 4000); // Hide after 4 seconds
}

// EmailJS integration
(function () {
    emailjs.init("l0lQMuLDuRkhY_8gg"); // 🔁 Replace with your actual PUBLIC KEY from EmailJS
})();

const form = document.querySelector('.contact-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_geyzc2g', 'template_exlga65', form)
        .then(function(response) {
            showNotification("✅ Message sent successfully!", true);
            form.reset();
        }, function(error) {
            console.error(error);
            showNotification("❌ Failed to send message. Please try again.", false);
        });
});
