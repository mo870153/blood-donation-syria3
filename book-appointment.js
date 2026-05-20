// بيانات المواعيد المتاحة لكل مستشفى
const hospitalAppointments = {
    'مركز الدم الوطني': {
        gov: 'دمشق',
        times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
    },
    'مستشفى الأسد الجامعي': {
        gov: 'دمشق',
        times: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30']
    },
    'مستشفى الأطفال باسل الأسد': {
        gov: 'دمشق',
        times: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']
    },
    'مستشفى الجامعي': {
        gov: 'حلب',
        times: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00']
    },
    'مركز دم حلب': {
        gov: 'حلب',
        times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00']
    },
    'مستشفى البعث': {
        gov: 'حمص',
        times: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30']
    },
    'مركز دم حمص': {
        gov: 'حمص',
        times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00']
    },
    'مستشفى درعا الوطني': {
        gov: 'درعا',
        times: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00']
    },
    'مركز دم درعا': {
        gov: 'درعا',
        times: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30']
    },
    'مستشفى السنمین': {
        gov: 'درعا',
        times: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00']
    },
    'مستشفى طرطوس الوطني': {
        gov: 'اللاذقية',
        times: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00']
    },
    'مركز دم الساحل': {
        gov: 'اللاذقية',
        times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30']
    },
    'مستشفى دير الزور الوطني': {
        gov: 'دير الزور',
        times: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00']
    }
};

let selectedTime = null;

document.addEventListener('DOMContentLoaded', () => {
    const raw = sessionStorage.getItem('loggedUser');
    const content = document.getElementById('bookContent');
    const urlParams = new URLSearchParams(window.location.search);
    const hospital = urlParams.get('hospital');
    const gov = urlParams.get('gov');

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // إذا لم يكن مسجلاً للدخول
    if (!raw) {
        content.innerHTML = `
            <div class="book-card">
                <div class="not-logged">
                    <i class="fas fa-user-lock"></i>
                    <h2>يجب تسجيل الدخول أولاً</h2>
                    <p>يتطلب حجز موعد التبرع تسجيل الدخول إلى حسابك</p>
                    <button class="login-btn" onclick="window.location.href='index.html'">
                        <i class="fas fa-sign-in-alt"></i> سجل الدخول
                    </button>
                </div>
            </div>`;
        return;
    }

    const user = JSON.parse(raw);

    // إذا لم يتم تحديد مستشفى
    if (!hospital || !hospitalAppointments[hospital]) {
        content.innerHTML = `
            <div class="book-card">
                <div class="not-logged">
                    <i class="fas fa-exclamation-circle"></i>
                    <h2>خطأ في البيانات</h2>
                    <p>لم يتم تحديد المستشفى بشكل صحيح</p>
                    <button class="login-btn" onclick="window.location.href='hospitals.html'">
                        <i class="fas fa-arrow-right"></i> العودة للمحافظات
                    </button>
                </div>
            </div>`;
        return;
    }

    const hospitalData = hospitalAppointments[hospital];

    // عرض نموذج الحجز
    content.innerHTML = `
        <div class="book-card">
            <div class="book-header">
                <div class="book-icon">📅</div>
                <h2>حجز موعد للتبرع</h2>
                <p>يرجى ملء البيانات المطلوبة لإتمام الحجز</p>
            </div>

            <div class="hospital-info">
                <i class="fas fa-hospital"></i>
                <div class="hospital-info-text">
                    <h3>${hospital}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${gov}</p>
                </div>
            </div>

            <form class="book-form" id="bookForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>
                            <i class="fas fa-user" style="color:#4285f4"></i>
                            الاسم الكامل
                            <span class="required">*</span>
                        </label>
                        <input type="text" id="fullName" placeholder="أدخل اسمك الكامل" required value="${user.fullName || ''}">
                    </div>
                    <div class="form-group">
                        <label>
                            <i class="fas fa-venus-mars" style="color:#a142f4"></i>
                            الجنس
                            <span class="required">*</span>
                        </label>
                        <select id="gender" required>
                            <option value="">اختر الجنس</option>
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            <i class="fas fa-phone" style="color:#a142f4"></i>
                            رقم الهاتف
                            <span class="required">*</span>
                        </label>
                        <input type="tel" id="phone" placeholder="مثال: 0933 123 456" required value="${user.phone || ''}">
                    </div>
                    <div class="form-group">
                        <label>
                            <i class="fas fa-id-card" style="color:#fa7c17"></i>
                            رقم الهوية
                            <span class="required">*</span>
                        </label>
                        <input type="text" id="idNumber" placeholder="أدخل رقم هويتك" required>
                    </div>
                </div>

                <div class="form-group">
                    <label>
                        <i class="fas fa-map-marker-alt" style="color:#34a853"></i>
                        العنوان
                        <span class="required">*</span>
                    </label>
                    <input type="text" id="address" placeholder="أدخل عنوانك الكامل" required value="${user.city || ''}">
                </div>

                <div class="form-group">
                    <label>
                        <i class="fas fa-calendar-alt" style="color:#ff4757"></i>
                        اختر الموعد
                        <span class="required">*</span>
                    </label>
                    <div class="time-slots" id="timeSlots"></div>
                    <input type="hidden" id="selectedTime" required>
                </div>

                <div class="form-group">
                    <label>
                        <i class="fas fa-sticky-note" style="color:#999"></i>
                        ملاحظات إضافية (اختياري)
                    </label>
                    <textarea id="notes" placeholder="أضف أي ملاحظات إضافية..." rows="3" style="resize: vertical;"></textarea>
                </div>

                <div class="book-buttons">
                    <button type="submit" class="book-btn">
                        <i class="fas fa-check"></i> تأكيد الحجز
                    </button>
                    <button type="button" class="cancel-btn" onclick="window.location.href='hospitals.html'">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </form>
        </div>`;

    // ملء المواعيد المتاحة
    renderTimeSlots(hospitalData.times);

    // معالجة إرسال النموذج
    document.getElementById('bookForm').addEventListener('submit', handleBooking);
});

function renderTimeSlots(times) {
    const container = document.getElementById('timeSlots');
    container.innerHTML = times.map(time => `
        <div class="time-slot" onclick="selectTime('${time}', this)">
            ${time}
        </div>
    `).join('');
}

function selectTime(time, element) {
    // إزالة التحديد السابق
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    // تحديد الموعد الجديد
    element.classList.add('selected');
    selectedTime = time;
    document.getElementById('selectedTime').value = time;
}

function handleBooking(e) {
    e.preventDefault();

    if (!selectedTime) {
        alert('يرجى اختيار موعد');
        return;
    }

    const raw = sessionStorage.getItem('loggedUser');
    const user = JSON.parse(raw);

    const urlParams = new URLSearchParams(window.location.search);
    const hospital = urlParams.get('hospital');
    const gov = urlParams.get('gov');

    const appointment = {
        id: Date.now(),
        hospital: hospital,
        gov: gov,
        fullName: document.getElementById('fullName').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        idNumber: document.getElementById('idNumber').value,
        address: document.getElementById('address').value,
        time: selectedTime,
        date: new Date().toISOString().split('T')[0],
        notes: document.getElementById('notes').value,
        bookedAt: new Date().toISOString()
    };

    // حفظ الموعد في localStorage
    const key = 'appointments_' + user.username;
    let appointments = JSON.parse(localStorage.getItem(key)) || [];
    appointments.push(appointment);
    localStorage.setItem(key, JSON.stringify(appointments));

    // عرض رسالة النجاح والتوجيه للملف الشخصي
    alert('✅ تم حجز الموعد بنجاح!');
    window.location.href = 'profile.html';
}
