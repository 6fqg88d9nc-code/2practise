// ===== 1. Hello, World! — консольге =====
console.log("Hello, World!");

document.addEventListener("DOMContentLoaded", () => {

    // ----- 1.1. Header-ге scroll кезінде көлеңке -----
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        header.style.boxShadow = window.scrollY > 20
            ? "0 8px 30px rgba(0, 0, 0, 0.4)"
            : "none";
    });

    // ----- 1.2. "Толығырақ" батырмасы — тегіс scroll -----
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // ----- 1.3. Карточкалардың пайда болу анимациясы -----
    const cards = document.querySelectorAll(".service-card, .stat");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition =
            `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ----- 1.4. Навигацияда белсенді сілтеме -----
    const navLinks = document.querySelectorAll(".navigation a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.forEach((l) => (l.style.color = ""));
            link.style.color = "#818cf8";
        });
    });

    // ----- 1.5. Байланыс формасы -----
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.name.value.trim();

            // Әдемі хабарлама (alert-сыз)
            const toast = document.createElement("div");
            toast.textContent = `Рахмет, ${name || "дос"}! Хабарламаңыз жіберілді ✅`;
            Object.assign(toast.style, {
                position: "fixed",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%) translateY(20px)",
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                color: "white",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: "600",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                opacity: "0",
                transition: "all 0.4s ease",
                zIndex: "9999",
            });
            document.body.appendChild(toast);

            requestAnimationFrame(() => {
                toast.style.opacity = "1";
                toast.style.transform = "translateX(-50%) translateY(0)";
            });

            setTimeout(() => {
                toast.style.opacity = "0";
                toast.style.transform = "translateX(-50%) translateY(20px)";
                setTimeout(() => toast.remove(), 400);
            }, 3000);

            form.reset();
        });
    }

});