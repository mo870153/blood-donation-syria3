// بيانات المستخدمين الأساسية
const users = [
    { username: 'eslam',    password: '123456', fullName: 'إسلام منير العقلة' },
    { username: 'ali',      password: '123456', fullName: 'علي رضا الرفاعي' },
    { username: 'mohammad', password: '123456', fullName: 'محمد معين الحلقي' },
    { username: 'tariq',    password: '123456', fullName: 'طارق حبيب' }
];

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorMsg = document.getElementById('loginError');

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // تحقق إذا عنده بيانات محفوظة مسبقاً
        const saved = localStorage.getItem('profile_' + username);
        if (saved) {
            const profile = JSON.parse(saved);
            sessionStorage.setItem('loggedUser', JSON.stringify({ ...user, ...profile }));
            window.location.href = 'profile.html';
        } else {
            // أول مرة يدخل، احفظ بياناته الأساسية وروحه يكمل البروفايل
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            window.location.href = 'complete-profile.html';
        }
    } else {
        errorMsg.style.display = 'block';
        errorMsg.textContent = '❌ اسم المستخدم أو كلمة المرور غلط';
    }
}

function logout() {
    sessionStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    document.querySelectorAll('[href="#login"], [data-action="login"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (sessionStorage.getItem('loggedUser')) {
                window.location.href = 'profile.html';
                return;
            }
            modal.style.display = 'block';
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // تحديث زر الهيدر إذا مسجل دخول
    const raw = sessionStorage.getItem('loggedUser');
    if (raw) {
        const user = JSON.parse(raw);
        document.querySelectorAll('[data-action="login"], [href="#login"]').forEach(btn => {
            btn.textContent = '👤 ' + user.fullName.split(' ')[0];
            btn.href = 'profile.html';
            btn.removeAttribute('data-action');
        });
    }
});
