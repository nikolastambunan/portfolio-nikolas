/* ============================================
   SUPER PORTFOLIO JS - NICOLAS TAMBUNAN
   VERSION 2.0 WITH DARK MODE & PREMIUM FEATURES
   ============================================ */

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }, 2000);
  }
  
  // Initialize all components
  initAOS();
  initParticles();
  initTypingAnimation();
  initCounters();
  initSkillBars();
  initRadarChart();
  initSwiper();
  initThemeToggle();
  initMusicToggle();
  initScrollTop();
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavLink();
  initGalleryFilter();
  initLightbox();
  initProjectModals();
  initContactForm();
  initScrollReveal();
  initParallax();
  initPreloadImages();
  
  // Initialize Vanilla Tilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.3,
      scale: 1.05
    });
  }
});

// ============================================
// AOS INITIALIZATION
// ============================================
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
      disable: 'mobile'
    });
  }
}

// ============================================
// PARTICLE BACKGROUND
// ============================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let particleCount = 80;
  let animationId;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = `rgba(230, 126, 34, ${Math.random() * 0.4 + 0.1})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(230, 126, 34, ${0.08 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function init() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    animate();
  }
  
  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.draw());
    connectParticles();
    particles.forEach(particle => particle.update());
    animationId = requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  });
  
  init();
  
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
}

// ============================================
// TYPING ANIMATION
// ============================================
function initTypingAnimation() {
  const typingElement = document.getElementById('typing');
  if (!typingElement) return;
  
  const texts = ['Mahasiswa TRPL 2025', 'Future Developer', 'Problem Solver', 'Tech Enthusiast', 'From Sigotom'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeText, 500);
    } else {
      setTimeout(typeText, isDeleting ? 50 : 100);
    }
  }
  
  typeText();
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  if (!skillBars.length) return;
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const parent = bar.closest('.modern-skill');
        if (parent) {
          const skillValue = parseInt(parent.getAttribute('data-skill'));
          const percentSpan = parent.querySelector('.skill-percent');
          
          setTimeout(() => {
            bar.style.width = skillValue + '%';
            if (percentSpan) {
              let currentPercent = 0;
              const increment = skillValue / 50;
              const interval = setInterval(() => {
                currentPercent += increment;
                if (currentPercent >= skillValue) {
                  percentSpan.textContent = skillValue + '%';
                  clearInterval(interval);
                } else {
                  percentSpan.textContent = Math.floor(currentPercent) + '%';
                }
              }, 30);
            }
          }, 200);
        }
        skillObserver.unobserve(bar);
      }
    });
  }, observerOptions);
  
  skillBars.forEach(bar => skillObserver.observe(bar));
}

// ============================================
// RADAR CHART
// ============================================
function initRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas || typeof Chart === 'undefined') return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HTML/CSS', 'JavaScript', 'Python', 'Database', 'React.js', 'Node.js'],
      datasets: [{
        label: 'Skill Level',
        data: [90, 75, 70, 65, 60, 55],
        backgroundColor: 'rgba(230, 126, 34, 0.2)',
        borderColor: '#e67e22',
        borderWidth: 2,
        pointBackgroundColor: '#e67e22',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#e67e22',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            backdropColor: 'transparent',
            color: '#6b7280'
          },
          grid: {
            color: '#e5e7eb'
          },
          pointLabels: {
            font: {
              size: 11
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 11
            }
          }
        }
      }
    }
  });
}

// ============================================
// SWIPER TESTIMONIAL
// ============================================
function initSwiper() {
  const swiperEl = document.querySelector('.testimonial-slider');
  if (!swiperEl || typeof Swiper === 'undefined') return;
  
  new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
}

// ============================================
// DARK/LIGHT MODE TOGGLE
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-mode');
  }
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      showToast('☀️ Light Mode Aktif');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      showToast('🌙 Dark Mode Aktif');
    }
  });
}

// ============================================
// MUSIC TOGGLE - Dengan file bg-music.mp3
// ============================================
// ============================================
// MUSIC TOGGLE - Dengan 2 Lagu (Playlist)
// ============================================
let audio = null;
let isMusicPlaying = false;
let currentSongIndex = 0;

// Daftar playlist lagu
const playlist = [
  {
    name: 'Lagu 1',
    file: '/music/bg-music.mp3'
  },
  {
    name: 'Lagu 2',
    file: '/music/bg-music2.mp3'
  }
];

function initMusicToggle() {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;
  
  // Buat audio element
  audio = new Audio();
  audio.volume = 0.5; // Volume 50%
  
  // Fungsi untuk memuat lagu berdasarkan index
  function loadSong(index) {
    const song = playlist[index];
    if (!song) return;
    
    audio.src = song.file;
    audio.load();
    
    audio.addEventListener('canplaythrough', () => {
      console.log(`✅ Musik berhasil dimuat: ${song.file}`);
    });
    
    audio.addEventListener('error', () => {
      console.error(`❌ Gagal memuat musik: ${song.file}`);
      showToast(`⚠️ File ${song.file} tidak ditemukan`);
    });
  }
  
  // Fungsi untuk memutar lagu berikutnya
  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    
    if (isMusicPlaying) {
      audio.play().then(() => {
        showToast(`🎵 Berganti ke: ${playlist[currentSongIndex].name}`);
      }).catch(error => {
        console.log('Play error:', error);
      });
    }
  }
  
  // Event ketika lagu selesai, otomatis pindah ke lagu berikutnya
  audio.addEventListener('ended', () => {
    if (isMusicPlaying) {
      playNextSong();
    }
  });
  
  // Load lagu pertama
  loadSong(0);
  
  // Tambahkan tooltip untuk menampilkan lagu yang sedang diputar
  function updateTooltip() {
    const existingTooltip = musicToggle.querySelector('.music-tooltip');
    if (existingTooltip) existingTooltip.remove();
    
    if (isMusicPlaying) {
      const tooltip = document.createElement('span');
      tooltip.className = 'music-tooltip';
      tooltip.innerHTML = `<i class="fas fa-music"></i> ${playlist[currentSongIndex].name} sedang diputar`;
      tooltip.style.cssText = `
        position: absolute;
        bottom: 60px;
        right: 0;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 12px;
        white-space: nowrap;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-color);
        pointer-events: none;
        z-index: 1001;
        font-weight: 500;
      `;
      musicToggle.appendChild(tooltip);
      
      setTimeout(() => {
        if (tooltip) tooltip.remove();
      }, 2500);
    }
  }
  
  // Event klik tombol musik (Play/Pause)
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!audio.src) {
      showToast('🎵 Memuat musik...');
      loadSong(0);
      return;
    }
    
    if (isMusicPlaying) {
      // Pause musik
      audio.pause();
      isMusicPlaying = false;
      musicToggle.style.animation = 'none';
      const icon = musicToggle.querySelector('i');
      if (icon) icon.style.color = '';
      showToast('🔇 Musik dihentikan');
    } else {
      // Play musik
      audio.play().then(() => {
        isMusicPlaying = true;
        musicToggle.style.animation = 'pulse 2s infinite';
        const icon = musicToggle.querySelector('i');
        if (icon) icon.style.color = '#e67e22';
        showToast(`🎵 Memutar: ${playlist[currentSongIndex].name}`);
        updateTooltip();
      }).catch((error) => {
        console.log('Autoplay ditolak:', error);
        showToast('⚠️ Klik halaman terlebih dahulu untuk memutar musik');
      });
    }
  });
  
  // Double click untuk ganti lagu manual
  musicToggle.addEventListener('dblclick', () => {
    if (isMusicPlaying) {
      playNextSong();
      updateTooltip();
    } else {
      showToast('🎵 Aktifkan musik terlebih dahulu untuk ganti lagu');
    }
  });
  
  console.log('🎵 Playlist siap dengan 2 lagu: bg-music.mp3 dan bg-music2.mp3');
}
  
  // Fungsi untuk memuat lagu
  function loadSong(index) {
    const song = playlist[index];
    if (!song) return;
    
    // Coba load dari URL utama
    audio.src = song.url;
    audio.load();
    
    // Tambahkan event listener untuk error (fallback)
    audio.addEventListener('error', function onError() {
      audio.removeEventListener('error', onError);
      console.log(`Gagal memuat ${song.name}, mencoba fallback...`);
      audio.src = song.fallback;
      audio.load();
    });
    
    audio.addEventListener('canplaythrough', () => {
      console.log(`Berhasil memuat: ${song.name}`);
    });
  }
  
  // Fungsi untuk memutar lagu berikutnya
  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play().then(() => {
      updateSongDisplay();
      showToast(`🎵 Sekarang: ${playlist[currentSongIndex].name} - ${playlist[currentSongIndex].artist}`);
    }).catch(error => {
      console.log('Autoplay error:', error);
    });
  }
  
  // Fungsi untuk memutar lagu sebelumnya
  function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play().then(() => {
      updateSongDisplay();
      showToast(`🎵 Sekarang: ${playlist[currentSongIndex].name} - ${playlist[currentSongIndex].artist}`);
    }).catch(error => {
      console.log('Autoplay error:', error);
    });
  }
  
  // Event ketika lagu selesai, pindah ke lagu berikutnya
  audio.addEventListener('ended', () => {
    if (isMusicPlaying) {
      playNextSong();
    }
  });
  
  // Load lagu pertama
  loadSong(0);
  
  // Handle klik tombol musik (Play/Pause)
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!audio.src) {
      showToast('🎵 Memuat musik... Silakan coba lagi');
      loadSong(0);
      return;
    }
    
    if (isMusicPlaying) {
      audio.pause();
      isMusicPlaying = false;
      musicToggle.style.animation = 'none';
      const icon = musicToggle.querySelector('i');
      if (icon) icon.style.color = '';
      showToast('🔇 Musik dihentikan');
    } else {
      audio.play().then(() => {
        isMusicPlaying = true;
        musicToggle.style.animation = 'pulse 2s infinite';
        const icon = musicToggle.querySelector('i');
        if (icon) icon.style.color = '#e67e22';
        showToast(`🎵 Memutar: ${playlist[currentSongIndex].name} - ${playlist[currentSongIndex].artist}`);
        updateSongDisplay();
      }).catch((error) => {
        console.log('Autoplay ditolak:', error);
        showToast('⚠️ Klik halaman terlebih dahulu untuk memutar musik');
      });
    }
  });
  
  // Double click untuk ganti lagu (opsional)
  musicToggle.addEventListener('dblclick', () => {
    if (isMusicPlaying) {
      playNextSong();
    } else {
      showToast('🎵 Aktifkan musik terlebih dahulu');
    }
  });
  
  // Tambahkan kontrol tambahan dengan right click (opsional)
  musicToggle.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (isMusicPlaying) {
      playPrevSong();
    } else {
      showToast('🎵 Aktifkan musik terlebih dahulu');
    }
  });
  
  console.log('🎵 Playlist siap: Laskar Pelangi & Marsada Marbisuk');


// ============================================
// SCROLL TO TOP
// ============================================
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.getElementById('menuToggle');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = menuToggle?.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });
}

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');
  
  if (!sections.length || !navItems.length) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// GALLERY FILTER
// ============================================
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!filterButtons.length || !galleryItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      galleryItems.forEach((item, index) => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`;
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// LIGHTBOX GALLERY
// ============================================
let currentImageIndex = 0;
let galleryImagesList = [];

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  if (!lightbox) return;
  
  function updateGalleryImages() {
    galleryImagesList = [];
    const visibleItems = document.querySelectorAll('.gallery-item');
    visibleItems.forEach(item => {
      const img = item.querySelector('img');
      if (img && img.src) {
        galleryImagesList.push({
          src: img.src,
          caption: item.querySelector('.gallery-info h3')?.innerText || 'Foto',
          description: item.querySelector('.gallery-info p')?.innerText || ''
        });
      }
    });
  }
  
  window.openLightbox = function(index) {
    updateGalleryImages();
    if (galleryImagesList.length === 0) return;
    
    currentImageIndex = index;
    const image = galleryImagesList[currentImageIndex];
    if (image) {
      lightboxImg.src = image.src;
      lightboxCaption.innerHTML = `<strong>${image.caption}</strong><br><small>${image.description}</small>`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function nextImage() {
    if (currentImageIndex < galleryImagesList.length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0;
    }
    const image = galleryImagesList[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxCaption.innerHTML = `<strong>${image.caption}</strong><br><small>${image.description}</small>`;
  }
  
  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = galleryImagesList.length - 1;
    }
    const image = galleryImagesList[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxCaption.innerHTML = `<strong>${image.caption}</strong><br><small>${image.description}</small>`;
  }
  
  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', prevImage);
  nextBtn?.addEventListener('click', nextImage);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  });
}

// ============================================
// PROJECT MODALS
// ============================================
function initProjectModals() {
  const project1Link = document.getElementById('project1Link');
  const project2Link = document.getElementById('project2Link');
  
  function showProjectModal(title, description, tech, features, status) {
    let modal = document.getElementById('projectModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'projectModal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="modal-close">&times;</span>
          <div id="modalBody"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <p><strong>✨ Fitur:</strong></p>
      <ul>
        ${features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div class="modal-tech">
        ${tech.map(t => `<span>${t}</span>`).join('')}
      </div>
      <p><strong>📌 Status:</strong> <span class="modal-status">${status}</span></p>
      <p><em>💡 Proyek ini adalah pengalaman pertama saya dalam membangun aplikasi. Masih banyak yang harus dipelajari, tapi ini awal yang baik!</em></p>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    };
  }
  
  if (project1Link) {
    project1Link.addEventListener('click', (e) => {
      e.preventDefault();
      showProjectModal(
        '🧮 Kalkulator Matriks',
        'Program kalkulator matriks berbasis Python yang dapat melakukan berbagai operasi matriks. Dibuat untuk tugas BTB (Basis Teknologi Baru).',
        ['Python', 'NumPy', 'CLI'],
        ['Penjumlahan Matriks', 'Pengurangan Matriks', 'Perkalian Matriks', 'Determinan Matriks', 'Transpose Matriks'],
        '✅ Selesai (Tugas BTB)'
      );
    });
  }
  
  if (project2Link) {
    project2Link.addEventListener('click', (e) => {
      e.preventDefault();
      showProjectModal(
        '🏪 Fly\'overs UMKM',
        'Website sederhana untuk mempromosikan produk UMKM lokal. Proyek ini mengajarkan saya tentang pentingnya web presence untuk usaha kecil.',
        ['HTML5', 'CSS3', 'JavaScript'],
        ['Landing Page yang menarik', 'Galeri produk UMKM', 'Informasi kontak penjual', 'Responsive design'],
        '✅ Selesai'
      );
    });
  }
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitButton.disabled = true;
    
    // Simulate form submission
    console.log('📧 New message from:', name);
    console.log('📧 Email:', email);
    console.log('📧 Message:', message);
    
    setTimeout(() => {
      showToast(`🙏 Terima kasih ${name}! Pesanmu sudah terkirim. Akan kubalas segera!`);
      contactForm.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 1500);
  });
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.about-content, .skills-container, .project-card, .contact-content, .gallery-item, .blog-card, .testimonial-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    floatingIcons.forEach((icon, index) => {
      icon.style.transform = `translateY(${scrolled * (0.05 + index * 0.02)}px)`;
    });
  });
}

// ============================================
// PRELOAD IMAGES
// ============================================
function initPreloadImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.src && !img.complete) {
      img.addEventListener('load', () => {});
      img.addEventListener('error', () => {
        console.log('Image failed to load:', img.src);
      });
    }
  });
}

// ============================================
// CUSTOM CURSOR (Desktop only)
// ============================================
if (!('ontouchstart' in window)) {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .social-link, .gallery-item, .stat-card, .blog-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = `scale(1.5)`;
        cursorOutline.style.borderColor = '#e67e22';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = `scale(1)`;
        cursorOutline.style.borderColor = 'rgba(230, 126, 34, 0.5)';
      });
    });
  }
}

// ============================================
// WELCOME CONSOLE MESSAGE
// ============================================
console.log('%c✨ WELCOME TO NICOLAS TAMBUNAN SUPER PORTFOLIO ✨', 'color: #e67e22; font-size: 18px; font-weight: bold;');
console.log('%c🎓 Mahasiswa TRPL - Institut Teknologi Del | Angkatan 2025', 'color: #2c3e50; font-size: 14px;');
console.log('%c📍 Dari Sigotom Lobugoti untuk dunia! 🚀', 'color: #e67e22; font-size: 12px; font-style: italic;');
console.log('%c🎵 Playlist: Laskar Pelangi - Nidji | Marsada Marbisuk - Marsada', 'color: #4b5563; font-size: 12px;');
console.log('%c💡 Fitur Premium: Dark Mode | Gallery Lightbox | Radar Chart | Counter Animation | WhatsApp Float | Music Toggle', 'color: #4b5563; font-size: 12px;');

// ============================================
// PREVENT RIGHT CLICK ON IMAGES (Optional)
// ============================================
document.querySelectorAll('.gallery-image img, .image-placeholder img').forEach(img => {
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

// ============================================
// UPDATE FOOTER YEAR
// ============================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (typeof updateGalleryImages === 'function') {
      updateGalleryImages();
    }
  }, 250);
});

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================
window.showToast = showToast;