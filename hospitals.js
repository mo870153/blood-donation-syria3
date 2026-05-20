// نفس بيانات المحافظات
const governorates = {
    'دمشق': {
        icon: 'fas fa-mosque',
        emergencies: [
            { name: 'محمد أحمد - 7 سنوات', blood: 'AB-', reason: 'حادث مروري', phone: '0933 123 456', hospital: 'مستشفى الأطفال' },
            { name: 'فاطمة علي', blood: 'O-', reason: 'عملية طارئة', phone: '0991 222 333', hospital: 'مستشفى المزة' }
        ],
        centers: [
            { name: 'مركز الدم الوطني', address: 'ميدان البريد - باب توما', phone: '011-333 1234' },
            { name: 'مستشفى  الجامعي', address: 'كفرسوسة', phone: '011-222 5678' },
            { name: 'مستشفى الأطفال ', address: 'المزة الشرقية', phone: '011-444 9999' }
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
            { name: 'مستشفى جاسم الوطني', address: 'جاسم', phone: '015-444 5555' }
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

function loadGovernorateData() {
    const selector = document.getElementById('govSelector');
    const gov = selector.value;
    const contentArea = document.getElementById('contentArea');
    const govTitle = document.getElementById('govTitle');

    if (!gov || !governorates[gov]) {
        govTitle.textContent = 'اختر محافظتك';
        contentArea.innerHTML = `
            <div class="container">
                <div class="empty-state">
                    <i class="fas fa-map-marker-alt"></i>
                    <h2>اختر محافظتك من القائمة</h2>
                    <p>ستظهر لك مراكز الدم والحالات الطارئة في محافظتك</p>
                </div>
            </div>
        `;
        return;
    }

    govTitle.textContent = gov + ' - مراكز الدم والطوارئ';

    const data = governorates[gov];
    contentArea.innerHTML = `
        <div class="emergency-section">
            <div class="section-header">
                <h2><i class="fas fa-exclamation-triangle"></i> حالات طارئة</h2>
            </div>
            ${data.emergencies.length > 0 ? `
                <div class="emergency-cards">
                    ${data.emergencies.map(emergency => `
                        <div class="emergency-card urgent">
                            <div class="urgency-badge">🚨 عاجل</div>
                            <h3>${emergency.name}</h3>
                            <p><strong>الزمرة: ${emergency.blood}</strong><br>${emergency.reason}</p>
                            <div class="contact">
                                <strong>📞 ${emergency.phone}</strong>
                                <span class="hospital">🏥 ${emergency.hospital}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : '<p class="no-emergencies">لا توجد حالات طارئة حالياً - شكراً لمتابعتكم</p>'}
        </div>

        <div class="centers-section">
            <div class="section-header">
                <h2><i class="fas fa-clinic-medical"></i> مراكز التبرع</h2>
            </div>
            <div class="hospitals-list">
                ${data.centers.map(center => `
                    <div class="location">
                        <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
                            <div style="flex: 1;">
                                <h4>${center.name}</h4>
                                <p>${center.address}</p>
                                <p><strong>☎️ ${center.phone}</strong></p>
                            </div>
                            <a href="book-appointment.html?hospital=${encodeURIComponent(center.name)}&gov=${encodeURIComponent(gov)}" class="book-btn-small">
                                <i class="fas fa-calendar-check"></i> حجز موعد
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// تحميل المحافظة من الـ URL عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const govParam = urlParams.get('gov');
    const selector = document.getElementById('govSelector');

    if (govParam && governorates[govParam] && selector) {
        selector.value = govParam;
        loadGovernorateData();
    }

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
