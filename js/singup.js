const textinput = document.getElementById('textInput');
const emailinput = document.getElementById('emailInput');
const paswordinput = document.getElementById('passwordInput');
const repasswordinput = document.getElementById('repasswordInput');
const signin = document.getElementById('signin');
signin.addEventListener('click', function () {
    validate();
    createobjectuser();
    clearvalue();
});

function clearvalue() {
    textinput.value = '';
    emailinput.value = '';
    paswordinput.value = '';
    repasswordinput.value = '';

}

function validate() {
    if (!textinput.value) {
        textinput.style.outlineColor = 'red';
        textinput.focus();
        return;
    }
    if (!emailinput.value) {
        emailinput.style.outlineColor = 'red';
        emailinput.focus();
        return;
    }
    if (!paswordinput.value) {
        paswordinput.style.outlineColor = 'red';
        paswordinput.focus();
        return;
    }
    if (repasswordinput.value !== paswordinput.value) {
        alert('parollar bir xil kiritilmadi..');
        repasswordinput.value = '';
        repasswordinput.value = '';
    }
}

function createobjectuser() {
    let user = {};
    user.textinput = textinput.value;
    user.emailinput = emailinput.value;
    user.paswordinput = paswordinput.value;     
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            if (el.emailinput == user.emailinput) {
                alert('bunday foydalanuvchi mavjud');
                emailinput.value = '';
                emailinput.focus(); 
                emailinput.style.outlineColor = 'red';
                return;
            }
        }
        
        window.location.href = `./Signin.html?user=${user.email}`;
        
     
    }
    data.push(user);
    localStorage.setItem('users', JSON.stringify(data));
}

