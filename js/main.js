const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3wS6chz-GGIOQLb9XyLq3MLLEnG7Kg4phXD2RcK9nvdC6RTTOzMZkrjGVtrEZu0az/exec';

async function sendToGoogleSheets(data) {
    console.log('Отправка в Google Sheets:', data);
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Ответ получен');
        return true;
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return false;
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Форма отправлена');
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    const formData = {
        name: form.querySelector('input[type="text"]')?.value || '',
        phone: form.querySelector('input[type="tel"]')?.value || '',
        service: form.querySelector('select')?.value || ''
    };
    
    console.log('Данные формы:', formData);
    
    if (!formData.name || !formData.phone) {
        alert('Заполните имя и телефон');
        return;
    }
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    const success = await sendToGoogleSheets(formData);
    
    if (success) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
            closeModal();
            showToast();
        }, 2000);
    } else {
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Ошибка';
        submitBtn.style.background = '#ef4444';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }
}

const reviewsData = [
    {
        name: "Игорь Васильев",
        car: "Toyota Camry 2015",
        text: "Коробка начала пинаться, думал придётся менять всю АКПП. Ребята заменили соленоиды и масло — вышло в 5 раз дешевле. Езжу уже 8 месяцев, всё отлично!",
        rating: 5
    },
    {
        name: "Сергей Михайлов",
        car: "BMW X5 E70",
        text: "Полный отказ задней передачи. Нашли износ фрикционов и трещину в гидроблоке. Сделали за 4 дня с гарантией 2 года. Очень доволен сервисом!",
        rating: 5
    },
    {
        name: "Алексей Петров",
        car: "Nissan X-Trail",
        text: "Долго искал специалистов по вариаторам. Здесь провели полную диагностику, объяснили причину и предложили оптимальное решение. Качество на высоте!",
        rating: 5
    },
    {
        name: "Мария Соколова",
        car: "Kia Sportage",
        text: "Отличный сервис! Быстро заменили масло в АКПП, дали рекомендации по эксплуатации. Теперь только сюда. Спасибо за профессионализм!",
        rating: 5
    },
    {
        name: "Дмитрий Волков",
        car: "Honda CR-V 2018",
        text: "Обратился с проблемой рывков при переключении. Диагностика показала износ фрикционов. Заменили за 3 дня, теперь коробка работает как новая. Цена адекватная!",
        rating: 5
    },
    {
        name: "Елена Смирнова",
        car: "Mazda CX-5",
        text: "Перестала включаться задняя передача. В другом сервисе сказали менять коробку целиком. Здесь нашли проблему в гидроблоке, отремонтировали за разумные деньги. Огромное спасибо!",
        rating: 5
    },
    {
        name: "Павел Орлов",
        car: "Ford Focus 2017",
        text: "Появился гул при движении. Оказался изношен подшипник. Заменили быстро, дали гарантию. Цены ниже чем у дилера в 2 раза. Рекомендую!",
        rating: 5
    },
    {
        name: "Наталья Иванова",
        car: "Hyundai Tucson",
        text: "Машина перестала ехать на горячую. Приехала на эвакуаторе, сразу взяли в работу. Диагностика бесплатно, ремонт за 2 дня. Очень благодарна за оперативность!",
        rating: 5
    },
    {
        name: "Андрей Козлов",
        car: "Volkswagen Passat B7",
        text: "DSG коробка дергалась на малых скоростях. Сделали адаптацию и заменили масло — проблема ушла. Не пришлось менять сцепление. Честные ребята!",
        rating: 5
    },
    {
        name: "Ольга Морозова",
        car: "Toyota RAV4 2019",
        text: "Вариатор начал гудеть на скорости. Здесь быстро определили причину — износ подшипников. Заменили, теперь тишина. Спасибо за качественную работу!",
        rating: 5
    },
    {
        name: "Виктор Лебедев",
        car: "Mercedes E-Class",
        text: "АКПП 7G-Tronic переключалась с ударами. Полная диагностика показала проблемы с гидротрансформатором. Восстановили за 5 дней. Машина едет идеально!",
        rating: 5
    },
    {
        name: "Татьяна Соловьева",
        car: "Skoda Octavia A7",
        text: "Появилась вибрация при разгоне. Оказался износ шруса, а не коробки. Честно сказали и не взяли лишних денег. Редкая порядочность!",
        rating: 5
    },
    {
        name: "Григорий Федоров",
        car: "BMW 3 Series F30",
        text: "Коробка ZF 8HP переключалась с рывками. Заменили масло с фильтром, сделали адаптацию. Теперь переключения не чувствуются. Рекомендую этот сервис!",
        rating: 5
    },
    {
        name: "Юлия Виноградова",
        car: "Lexus RX 350",
        text: "Обратилась с подозрением на неисправность АКПП. Диагностика показала, что всё в порядке, только нужно заменить масло. Не развели на дорогой ремонт!",
        rating: 5
    }
];

function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursorGlow) return;
    
    if (window.innerWidth > 768) {
        cursorGlow.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    hidePreloader();
    initNavigation();
    initSmoothScroll();
    initAnimations();
    initReviewsSlider();
    initForms();
    initPhoneMask();
    initBackToTop();
    initActiveNavLink();
});

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

let currentSlide = 0;
let autoSlideInterval;

function initReviewsSlider() {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!track || !dotsContainer) return;
    
    reviewsData.forEach((review, index) => {
        const slide = document.createElement('div');
        slide.className = 'review-card';
        slide.innerHTML = `
            <div class="review-content">
                <div class="review-quote">"</div>
                <div class="review-stars">${'★'.repeat(review.rating)}</div>
                <p class="review-text">${review.text}</p>
                <div class="review-author">
                    <div class="review-avatar">${review.name.charAt(0)}</div>
                    <div class="review-info">
                        <h4>${review.name}</h4>
                        <p>${review.car}</p>
                    </div>
                </div>
            </div>
        `;
        track.appendChild(slide);
        
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    startAutoSlide();
}

function moveSlider(direction) {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;
    
    const slides = track.children;
    currentSlide += direction;
    
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function updateSlider() {
    const track = document.getElementById('reviewsTrack');
    const dots = document.querySelectorAll('.dot');
    
    if (!track) return;
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => moveSlider(1), 5000);
}

function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    startAutoSlide();
}

async function sendToGoogleSheets(data) {
    console.log('Отправка данных:', data);
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Ответ получен');
        return true;
    } catch (error) {
        console.error('Ошибка:', error);
        return false;
    }
}

function initForms() {
    const heroForm = document.getElementById('heroForm');
    const modalForm = document.getElementById('modalForm');
    
    console.log('heroForm:', heroForm);
    console.log('modalForm:', modalForm);
    
    if (heroForm) {
        heroForm.addEventListener('submit', handleFormSubmit);
        console.log('Обработчик для heroForm добавлен');
    }
    
    if (modalForm) {
        modalForm.addEventListener('submit', handleFormSubmit);
        console.log('Обработчик для modalForm добавлен');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Форма отправлена');
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    const formData = {
        name: form.querySelector('input[type="text"]')?.value || '',
        phone: form.querySelector('input[type="tel"]')?.value || '',
        service: form.querySelector('select')?.value || ''
    };
    
    console.log('Данные формы:', formData);

    if (!formData.name || !formData.phone) {
        alert('Пожалуйста, заполните имя и телефон');
        return;
    }
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    const success = await sendToGoogleSheets(formData);
    
    if (success) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
            closeModal();
            showToast();
        }, 2000);
    }
}

function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formatted = '+7 ';
                
                if (value.length > 0) formatted += '(' + value.substring(0, 3);
                if (value.length >= 4) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 7) formatted += '-' + value.substring(6, 8);
                if (value.length >= 9) formatted += '-' + value.substring(8, 10);
                
                this.value = formatted;
            }
        });
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function openModal(service) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (service) {
        modalTitle.textContent = `Записаться: ${service}`;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function initYandexMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            const mapElement = document.getElementById('map');
            if (!mapElement) return;
            
            try {
                const map = new ymaps.Map('map', {
                    center: [45.035470, 39.013390],
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl']
                });
                
                const placemark = new ymaps.Placemark(
                    [45.035470, 39.013390],
                    {
                        balloonContent: `
                            <strong>RemZona</strong><br>
                            Ремонт АКПП<br>
                            г. Краснодар, ул. Бершанской, 345/6<br>
                            <a href="tel:+79298253574">+7 (929) 825-35-74</a>
                        `,
                        hintContent: 'RemZona - Ремонт АКПП'
                    },
                    {
                        preset: 'islands#redAutoIcon',
                        iconColor: '#6366f1'
                    }
                );
                
                map.geoObjects.add(placemark);
            } catch (error) {
                console.error('Ошибка карты:', error);
                showMapFallback();
            }
        });
    } else {
        showMapFallback();
    }
}

function showMapFallback() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    mapElement.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 400px; background: linear-gradient(135deg, #1e3b4f, #2c4c63); color: white; padding: 2rem; text-align: center;">
            <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem; color: #818cf8;"></i>
            <p style="margin-bottom: 1rem; font-size: 1.2rem;">г. Краснодар, ул. Индустриальная, 42/3</p>
            <a href="https://yandex.ru/maps/?text=г. Краснодар, ул. Индустриальная, 42/3" target="_blank" style="color: white; background: #6366f1; padding: 0.8rem 1.5rem; border-radius: 30px; text-decoration: none; font-weight: 600;">
                Открыть в Яндекс.Картах
            </a>
        </div>
    `;
}

window.addEventListener('resize', () => {
    if (currentSlide > 0) {
        updateSlider();
    }
});