<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    // بيانات تجريبية - في التطبيق الحقيقي استخدم قاعدة بيانات
    if ($username === 'admin' && $password === '123456') {
        $_SESSION['user'] = $username;
        header('Location: dashboard.html');
        exit;
    } else {
        echo "<!DOCTYPE html>
<html lang='ar' dir='rtl'>
<head>
    <meta charset='UTF-8'>
    <link href='https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap' rel='stylesheet'>
    <style>
        body { font-family: 'Cairo', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f8f9fa; }
        .box { background: white; padding: 2rem; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .box p { color: #ff4757; font-size: 1.2rem; margin-bottom: 1rem; }
        a { color: #667eea; text-decoration: none; font-weight: 600; }
    </style>
</head>
<body>
    <div class='box'>
        <p>❌ بيانات الدخول خاطئة</p>
        <a href='index.html'>← العودة للرئيسية</a>
    </div>
    <script>setTimeout(() => window.history.back(), 2000);</script>
</body>
</html>";
        exit;
    }
}

// إذا وصل بـ GET بدون POST يرجع للرئيسية
header('Location: index.html');
exit;
?>
