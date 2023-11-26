const create_account = document.getElementById('create_account');
const email = document.getElementById('email');
const password = document.getElementById('password');

function validate() {
    if (!email.value) {
        email.style.outlineColor = 'red';
        email.focus();
        return false; 
    }

    if (!password.value) {
        password.style.outlineColor = 'red';
        password.focus();
        return false; 
    }

    return true; 
}

create_account.addEventListener('click', function() {
    if (validate()) { 
        let exit = false;

        let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        if (data.length) {
            data.forEach(user => {
               
                if (user.emailinput == email.value && user.paswordinput == password.value) {
                    exit = true;
                    window.location.href = `./user.html?user=${user.email}`;
                    return;
                }
            });
        }
        if (!exit) {
            alert('Parol yoki foydalanuvchi nomi xato');
            password.value = ""; 
        }
    }
});
 