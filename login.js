// دالة لفتح المودال
function openModal(id) {
    // إغلاق أي مودال مفتوح أولاً
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'block';
}

// دالة لإغلاق المودال
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

// دالة لتبديل عرض كلمة المرور
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// إدارة بيانات المستخدمين في LocalStorage
const STORAGE_KEY = 'blood_donation_users';

function getUsers() {
    const users = localStorage.getItem(STORAGE_KEY);
    const defaultUsers = [
        { username: 'eslam', password: '123456', fullName: 'إسلام منير العقلة', phone: '0933111222', city: 'دمشق', birthDate: '1995-01-01', bloodType: 'A+' },
        { username: 'mohammad', password: '123456', fullName: 'محمد معين الحلقي', phone: '0955666777', city: 'درعا', birthDate: '1998-11-20', bloodType: 'O+' },
        { username: 'ali', password: '123456', fullName: 'علي رضا الرفاعي', phone: '0944333444', city: 'حلب', birthDate: '1990-05-10', bloodType: 'B+' },
        { username: 'tariq', password: '123456', fullName: 'طارق حبيب', phone: '0999888777', city: 'حمص', birthDate: '1992-03-15', bloodType: 'AB+' }
    ];
    
    if (!users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    return JSON.parse(users);
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// تسجيل الدخول
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();
    const errorMsg = document.getElementById('loginError');

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.href = 'profile.html';
    } else {
        errorMsg.style.display = 'block';
        errorMsg.textContent = '❌ اسم المستخدم أو كلمة المرور غير صحيحة';
    }
}

// إنشاء حساب جديد
function handleSignup(e) {
    e.preventDefault();
    const fullName = document.getElementById('signupFullName').value.trim();
    const username = document.getElementById('signupUsername').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const city = document.getElementById('signupCity').value;
    const birthDate = document.getElementById('signupBirthDate').value;
    const errorMsg = document.getElementById('signupError');

    const users = getUsers();
    if (users.find(u => u.username === username)) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = '❌ اسم المستخدم موجود مسبقاً، اختر اسماً آخر';
        return;
    }

    const newUser = { fullName, username, password, phone, city, birthDate, bloodType: '' };
    users.push(newUser);
    saveUsers(users);

    alert('✅ تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
    closeModal('signupModal');
    openModal('loginModal');
}

// استعادة كلمة المرور
let userToReset = null;

function handleForgot(e) {
    e.preventDefault();
    const username = document.getElementById('forgotUsername').value.trim().toLowerCase();
    const phone = document.getElementById('forgotPhone').value.trim();
    const birthDate = document.getElementById('forgotBirthDate').value;
    const statusMsg = document.getElementById('forgotStatus');

    const users = getUsers();
    const user = users.find(u => u.username === username && u.phone === phone && u.birthDate === birthDate);

    if (user) {
        userToReset = user;
        statusMsg.style.display = 'block';
        statusMsg.style.color = '#2ecc71';
        statusMsg.textContent = '✅ تم التحقق من البيانات. أدخل كلمة المرور الجديدة أدناه:';
        document.getElementById('newPasswordSection').style.display = 'block';
        document.getElementById('verifyBtn').style.display = 'none';
    } else {
        statusMsg.style.display = 'block';
        statusMsg.style.color = '#ff4757';
        statusMsg.textContent = '❌ البيانات المدخلة غير متطابقة مع أي حساب.';
    }
}

function resetPassword() {
    const newPass = document.getElementById('newPassword').value.trim();
    if (newPass.length < 4) {
        alert('كلمة المرور يجب أن تكون 4 خانات على الأقل');
        return;
    }

    const users = getUsers();
    const index = users.findIndex(u => u.username === userToReset.username);
    if (index !== -1) {
        users[index].password = newPass;
        saveUsers(users);
        alert('✅ تم تحديث كلمة المرور بنجاح!');
        closeModal('forgotModal');
        openModal('loginModal');
        
        // إعادة تصفير الواجهة للمرة القادمة
        document.getElementById('newPasswordSection').style.display = 'none';
        document.getElementById('verifyBtn').style.display = 'block';
        document.getElementById('forgotStatus').style.display = 'none';
        document.getElementById('forgotForm').reset();
    }
}

// تهيئة الأحداث
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotForm = document.getElementById('forgotForm');

    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (forgotForm) forgotForm.addEventListener('submit', handleForgot);

    // ربط أزرار تسجيل الدخول في الهيدر
    document.querySelectorAll('[href="#login"], [data-action="login"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (sessionStorage.getItem('loggedUser')) {
                window.location.href = 'profile.html';
            } else {
                openModal('loginModal');
            }
        });
    });

    // إغلاق المودال عند النقر خارجه
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // تحديث الهيدر إذا كان المستخدم مسجلاً
    const loggedUser = sessionStorage.getItem('loggedUser');
    if (loggedUser) {
        const user = JSON.parse(loggedUser);
        document.querySelectorAll('[data-action="login"], [href="#login"]').forEach(btn => {
            btn.textContent = '👤 ' + user.fullName.split(' ')[0];
            btn.href = 'profile.html';
            btn.removeAttribute('data-action');
        });
    }
});
