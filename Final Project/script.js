var loginButton = document.getElementById("authButton");
var avatarImage = document.getElementById("userAvatar");
var loginForm = document.getElementById("loginForm");
var registerForm = document.getElementById("registerForm");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");

function checkLoginStatus() {
    var isUserLoggedIn = localStorage.getItem('isLoggedIn');
    
    if(isUserLoggedIn === 'true') {
        avatarImage.style.display = 'block';
        loginButton.innerHTML = 'Logout';
    } else {
        avatarImage.style.display = 'none';
        loginButton.innerHTML = 'Login';
    }
}

function handleAuth() {
    var isUserLoggedIn = localStorage.getItem('isLoggedIn');

    if(isUserLoggedIn === 'true') {
        localStorage.setItem('isLoggedIn', 'false');
        avatarImage.style.display = 'none';
        loginButton.innerHTML = 'Login';
        location.reload();
    } else {
        window.location.href = 'login.html';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    var email = emailInput.value;
    var password = passwordInput.value;

    var registeredEmail = localStorage.getItem('registeredEmail');
    var registeredPassword = localStorage.getItem('registeredPassword');

    if(!email || !password) {
        showToast("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if((email === "admin@gmail.com" && password === "123456") || 
       (email === registeredEmail && password === registeredPassword)) {
        localStorage.setItem('isLoggedIn', 'true');
        showToast("Đăng nhập thành công!");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showToast("Email hoặc mật khẩu không đúng!");
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

function handleRegister(event) {
    event.preventDefault();
    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if(!name || !email || !password || !confirmPassword) {
        showToast("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if(password !== confirmPassword) {
        showToast("Mật khẩu xác nhận không khớp!");
        return;
    }

    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    showToast("Đăng ký thành công!");
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

var scrollButton = document.getElementById("scrollButton");

function handleScroll() {
    if(document.documentElement.scrollTop > 100) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
}

function scrollToTop() {
    document.documentElement.scrollTop = 0;
}

window.onload = function() {
    var currentPage = window.location.pathname;
    
    if(currentPage.includes('login.html')) {
        if(loginForm) {
            loginForm.onsubmit = handleLogin;
        }
    } else if(currentPage.includes('register.html')) {
        if(registerForm) {
            registerForm.onsubmit = handleRegister;
        }
    } else {
        checkLoginStatus();
        
        if(loginButton) loginButton.onclick = handleAuth;
        if(scrollButton) {
            scrollButton.onclick = scrollToTop;
            window.onscroll = handleScroll;
        }
    }
}

setTimeout(checkLoginStatus, 1000); 