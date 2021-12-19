const linkRegistr = $("#link_of_registration");         // На странице с авторизацией
const linkSignUp = $("#link_of_sign_up");               // На странице с регистрацией
const pageOfSignUp = $("#Sign_Up");                     // Страница авторизации
const pageOfRegistration = $("#register");              // Страница регистрации
const formOfRegister = $("#form_of_registration");      // Форма регистрации
const formOfSignUp = $("#form_of_sign_up");             // Форма авторизации


// Функция проверяет авторизован ли пользователь или нет
function checkLoginAccount () {
    $.get({
        url: "auth/authUser",
        headers: {
            authorization : `Bearer ${localStorage.token}`
        },
        success: (data) => {
            // console.log(data);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("userName", data.username);
            console.log(localStorage);      
        }
    })
}

linkRegistr.on('click', () => {
    pageOfSignUp.attr('class', 'none');
    pageOfRegistration.attr('class', 'block');
})
linkSignUp.on('click', () => {
    pageOfRegistration.attr('class', 'none');
    pageOfSignUp.attr('class', 'block');
})

// Прослушивает форму авторизации
formOfSignUp.on("submit", (event) => {
    try {
        $.post("auth/login", {loginNick : event.target[0].value,
            loginPassword : event.target[1].value},
            (data) => {
                localStorage.setItem('token', data.token);
                checkLoginAccount();
                document.location.href = "././account.html";
            })
            .fail((data) => {
                console.log(data.responseJSON.message);
            });;
    } catch (error) {
        console.log(error);
    }
    // return false нужно, чтобы страница не перезагружалась
    return false;
})

// Прослушивает форму регистрации
formOfRegister.on("submit", (event) => {
    try {
        if (event.target[1].value == event.target[2].value) {
            $.post("auth/registration", {
                registrNick: event.target[0].value,
                registrPassword: event.target[1].value},
                (data) => {
                    console.log(data);
                })
                .fail((data) => {
                    console.log(data.responseJSON.message);
                })
        }else {
            throw new Error('Пароли не совпадают')
        }
        
    } catch (error) {
        console.log(error.name + ': ' + error.message);
    }
    return false;
})