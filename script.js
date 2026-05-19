// بيانات المحافظات السورية
const governorates = {
    'دمشق': {
        icon: 'fas fa-mosque',
        emergencies: [
            { name: 'محمد أحمد - 7 سنوات', blood: 'AB-', reason: 'حادث مروري', phone: '0933 123 456', hospital: 'مستشفى الأطفال' },
            { name: 'فاطمة علي', blood: 'O-', reason: 'عملية طارئة', phone: '0991 222 333', hospital: 'مستشفى الأسد' }
        ],
        centers: [
            { name: 'مركز الدم الوطني', address: 'ميدان البريد - باب توما', phone: '011-333 1234' },
            { name: 'مستشفى الأسد الجامعي', address: 'كفرسوسة', phone: '011-222 5678' },
            { name: 'مستشفى الأطفال باسل الأسد', address: 'المزة الشرقية', phone: '011-444 9999' }
        ]
    },
    'حلب': {
        icon: 'fas fa-university',
        emergencies: [
            { name: 'علي حسن - 32 سنة', blood: 'B-', reason: 'حروق', phone: '0932 444 555', hospital: 'مستشفى الجامعي' }
        ],
        centers: [
            { name: 'مستشفى الجامعي', address: 'الجامعة - حلب', phone: '021-222 3333' },
            { name: 'مركز دم حلب', address: 'ساحة الساعة', phone: '021-465 7777' }
        ]
    },
    'حمص': {
        icon: 'fas fa-hospital',
        emergencies: [
            { name: 'خالد محمود', blood: 'A-', reason: 'حادث', phone: '0944 555 777', hospital: 'مستشفى البعث' }
        ],
        centers: [
            { name: 'مستشفى البعث', address: 'الزهراء', phone: '031-522 1111' },
            { name: 'مركز دم حمص', address: 'الرستن', phone: '031-533 4444' }
        ]
    },
    'درعا': {
        icon: 'fas fa-landmark',
        emergencies: [
            { name: 'أسماء خضر - 25 سنة', blood: 'O+', reason: 'ولادة معقدة', phone: '0955 666 888', hospital: 'مستشفى درعا الوطني' }
        ],
        centers: [
            { name: 'مستشفى درعا الوطني', address: 'وسط المدينة', phone: '015-322 1111' },
            { name: 'مركز دم درعا', address: 'بصرى الشام', phone: '015-333 2222' },
            { name: 'مستشفى السنمین', address: 'السنمین', phone: '015-444 5555' }
        ]
    },
    'اللاذقية': {
        icon: 'fas fa-anchor',
        emergencies: [],
        centers: [
            { name: 'مستشفى طرطوس الوطني', address: 'اللاذقية', phone: '041-233 5555' },
            { name: 'مركز دم الساحل', address: 'طرطوس', phone: '043-321 9999' }
        ]
    },
    'دير الزور': {
        icon: 'fas fa-tree',
        emergencies: [],
        centers: [
            { name: 'مستشفى دير الزور الوطني', address: 'الرصافة', phone: '051-322 6666' }
        ]
    }
};

// =====================
// Login Modal
// =====================
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');

document.querySelectorAll('[href="#login"], [data-action="login"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// =====================
// Load Governorates Grid
// =====================
function loadGovernoratesGrid() {
    const grid = document.getElementById('governoratesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.keys(governorates).forEach(gov => {
        const card = document.createElement('div');
        card.className = 'governorate-card';
        card.innerHTML = `
            <i class="${governorates[gov].icon}"></i>
            <h3>${gov}</h3>
            <p>${governorates[gov].centers.length} مركز دم</p>
            <p>${governorates[gov].emergencies.length} حالة طارئة</p>
        `;
        card.onclick = () => {
            window.location.href = 'hospitals.html?gov=' + encodeURIComponent(gov);
        };
        grid.appendChild(card);
    });
}

// =====================
// Initialize on DOMContentLoaded
// =====================
document.addEventListener('DOMContentLoaded', () => {
    loadGovernoratesGrid();

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling للروابط الداخلية فقط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#login') return; // المودال يتكفل به
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Form validation
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const username = loginForm.username.value;
            const password = loginForm.password.value;
            if (username.length < 3 || password.length < 3) {
                e.preventDefault();
                alert('يرجى إدخال بيانات صحيحة');
            }
        });
    }
});
