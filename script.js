// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Lenis Smooth Scrolling (Ultra Stabil & Enteng)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing khas premium
  direction: 'vertical', 
  gestureDirection: 'vertical', 
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false, // Jangan smooth di HP agar tidak lag
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Hubungkan Lenis dengan ScrollTrigger (Penting!)
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// 2. Preloader Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Animasi GSAP setelah loader hilang
    gsap.timeline()
        .to(preloader, { opacity: 0, duration: 1, delay: 0.5, onComplete: () => preloader.classList.add('hidden') })
        .from('.hero-title span', { opacity: 0, y: 100, duration: 1, stagger: 0.15, ease: 'power4.out' }, '-=0.5')
        .from('.gsap-reveal-hero p', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
        .from('.social-hero a', { opacity: 0, x: -30, stagger: 0.1, duration: 0.6 }, '-=0.4')
        .from('.btn-main', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5');
});

// 3. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('navbar');
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 4. GSAP ScrollReveal Animations (Stabil & Mengalir Sempurna)
// Reveal elemen bertahap saat masuk layar (stagger)
document.querySelectorAll('.gsap-reveal-stagger').forEach((section) => {
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: 'top 85%', // Mulai animasi saat section 85% terlihat dari atas
            toggleActions: 'play none none none', // Hanya play sekali
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2, // Jeda antar kartu
        ease: 'power3.out',
    });
});

// Reveal dari Kiri (About Image)
gsap.from('.gsap-reveal-left', {
    scrollTrigger: {
        trigger: '.gsap-reveal-left',
        start: 'top 80%',
    },
    opacity: 0,
    x: -80,
    duration: 1,
    ease: 'power3.out'
});

// Reveal dari Kanan (About Teks)
gsap.from('.gsap-reveal-right', {
    scrollTrigger: {
        trigger: '.gsap-reveal-right',
        start: 'top 80%',
    },
    opacity: 0,
    x: 80,
    duration: 1,
    delay: 0.2, // Sedikit jeda setelah gambar muncul
    ease: 'power3.out'
});

// Reveal Umum (Teks Section, Order Form)
document.querySelectorAll('.gsap-reveal').forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power2.out'
    });
});

// 5. Efek Magnetik Premium (Hanya di tombol utama & Card)
const magneticEls = document.querySelectorAll('.magnetic');
magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        // Pergerakan magnet yang lebih halus & terbatas
        gsap.to(el, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)' // Kembalikan dengan efek elastic
        });
    });
});