// بيانات المحافظات السورية مع الإحداثيات
const governorates = {
    'دمشق': {
        icon: 'fas fa-mosque',
        coords: [33.5138, 36.2765],
        emergencies: [
            { name: 'محمد أحمد - 7 سنوات', blood: 'AB-', reason: 'حادث مروري', phone: '0933 123 456', hospital: 'مستشفى الأطفال' },
            { name: 'فاطمة علي', blood: 'O-', reason: 'عملية طارئة', phone: '0991 222 333', hospital: 'مستشفى المزة' }
        ],
        centers: [
            { name: 'مركز الدم الوطني', address: 'ميدان البريد - باب توما', phone: '011-333 1234', lat: 33.5100, lng: 36.3050 },
            { name: 'مستشفى الجامعي', address: 'كفرسوسة', phone: '011-222 5678', lat: 33.4950, lng: 36.2700 },
            { name: 'مستشفى الأطفال', address: 'المزة الشرقية', phone: '011-444 9999', lat: 33.5050, lng: 36.2400 }
        ]
    },
    'حلب': {
        icon: 'fas fa-university',
        coords: [36.2021, 37.1343],
        emergencies: [
            { name: 'علي حسن - 32 سنة', blood: 'B-', reason: 'حروق', phone: '0932 444 555', hospital: 'مستشفى الجامعي' }
        ],
        centers: [
            { name: 'مستشفى الجامعي', address: 'الجامعة - حلب', phone: '021-222 3333', lat: 36.2100, lng: 37.1400 },
            { name: 'مركز دم حلب', address: 'ساحة الساعة', phone: '021-465 7777', lat: 36.1980, lng: 37.1600 }
        ]
    },
    'حمص': {
        icon: 'fas fa-hospital',
        coords: [34.7324, 36.7137],
        emergencies: [
            { name: 'خالد محمود', blood: 'A-', reason: 'حادث', phone: '0944 555 777', hospital: 'مستشفى البعث' }
        ],
        centers: [
            { name: 'مستشفى البعث', address: 'الزهراء', phone: '031-522 1111', lat: 34.7400, lng: 36.7200 },
            { name: 'مركز دم حمص', address: 'الرستن', phone: '031-533 4444', lat: 34.9200, lng: 36.7300 }
        ]
    },
    'درعا': {
        icon: 'fas fa-landmark',
        coords: [32.6189, 36.1021],
        emergencies: [
            { name: 'أسماء خضر - 25 سنة', blood: 'O+', reason: 'ولادة معقدة', phone: '0955 666 888', hospital: 'مستشفى درعا الوطني' }
        ],
        centers: [
            { name: 'مستشفى درعا الوطني', address: 'وسط المدينة', phone: '015-322 1111', lat: 32.6200, lng: 36.1050 },
            { name: 'مركز دم درعا', address: 'بصرى الشام', phone: '015-333 2222', lat: 32.5200, lng: 36.4800 },
            { name: 'مستشفى جاسم الوطني', address: 'جاسم', phone: '015-444 5555', lat: 32.9900, lng: 36.0600 }
        ]
    },
    'اللاذقية': {
        icon: 'fas fa-anchor',
        coords: [35.5317, 35.7916],
        emergencies: [],
        centers: [
            { name: 'مستشفى اللاذقية الوطني', address: 'اللاذقية', phone: '041-233 5555', lat: 35.5400, lng: 35.7900 },
            { name: 'مركز دم الساحل', address: 'طرطوس', phone: '043-321 9999', lat: 34.8900, lng: 35.8900 }
        ]
    },
    'دير الزور': {
        icon: 'fas fa-tree',
        coords: [35.3360, 40.1408],
        emergencies: [],
        centers: [
            { name: 'مستشفى دير الزور الوطني', address: 'الرصافة', phone: '051-322 6666', lat: 35.3400, lng: 40.1450 }
        ]
    }
};

// =====================
// Leaflet Map
// =====================
let map = null;
let markersLayer = null;

function initMap(coords) {
    const mapSection = document.getElementById('map-section');
    mapSection.style.display = 'block';

    if (!map) {
        map = L.map('map').setView(coords, 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        markersLayer = L.layerGroup().addTo(map);
    } else {
        map.setView(coords, 12);
        markersLayer.clearLayers();
    }

    // مهم: بعد ما الـ div يصير مرئي
    setTimeout(() => map.invalidateSize(), 150);
}

function addCenterMarkers(centers) {
    centers.forEach(center => {
        if (center.lat && center.lng) {
            const bloodIcon = L.divIcon({
                html: `<div style="background:#ff4757;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 10px rgba(255,71,87,0.4);display:flex;align-items:center;justify-content:center"><i class="fas fa-tint" style="color:#fff;font-size:13px;transform:rotate(45deg)"></i></div>`,
                iconSize: [34, 34],
                iconAnchor: [17, 34],
                popupAnchor: [0, -38],
                className: ''
            });

            L.marker([center.lat, center.lng], { icon: bloodIcon })
                .addTo(markersLayer)
                .bindPopup(`
                    <div class="map-popup-title">🏥 ${center.name}</div>
                    <div class="map-popup-addr">📍 ${center.address}</div>
                    <div class="map-popup-phone">☎️ ${center.phone}</div>
                `);
        }
    });
}

// =====================
// Load Governorate Data
// =====================
function loadGovernorateData() {
    const selector = document.getElementById('govSelector');
    const gov = selector.value;
    const contentArea = document.getElementById('contentArea');
    const govTitle = document.getElementById('govTitle');

    if (!gov || !governorates[gov]) {
        govTitle.textContent = 'اختر محافظتك';
        document.getElementById('map-section').style.display = 'none';
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

    // تحميل الخريطة
    const data = governorates[gov];
    initMap(data.coords);
    addCenterMarkers(data.centers);

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
