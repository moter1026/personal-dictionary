const linkRegistr = $("#link_of_registration");         // На странице с авторизацией
const linkLogIn = $("#link_of_log_in");               // На странице с регистрацией
const pageOfLogIn = $("#Log_in");                     // Страница авторизации
const pageOfRegistration = $("#register");              // Страница регистрации
const formOfRegister = $("#form_of_registration");      // Форма регистрации
const formOfLogIn = $("#form_of_log_in");             // Форма авторизации


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

// function warningOrSuccessBlock( jqueryElem ,text) {
//     jqueryElem[0].textContent = text;
//     jqueryElem.show(600)
//     setTimeout(() => {jqueryElem.hide(600)}, 3000)
// }
function openLogInWindow() {
    pageOfRegistration.attr('class', 'none');
    pageOfLogIn.attr('class', 'block');
}
function openRegisterWindow() {
    pageOfLogIn.attr('class', 'none');
    pageOfRegistration.attr('class', 'block');
}

linkRegistr.on('click', () => {
    openRegisterWindow()
})
linkLogIn.on('click', () => {
    openLogInWindow()
})

// Прослушивает форму авторизации
formOfLogIn.on("submit", (event) => {
    try {
        $.post("auth/login", {
            loginNick : encodeURI(event.target[0].value),
            loginPassword : encodeURI(event.target[1].value)
            },
            (data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('LastAuth', Date.now());
                checkLoginAccount();
                document.location.href = "././account.html";
            })
            .fail((data) => {
                warningOrSuccessBlock($("#warning_register_or_login"), data.responseJSON.message)
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
                    warningOrSuccessBlock($("#success_register_or_login"), data.message);
                    openLogInWindow();
                })
                .fail((data) => {
                    warningOrSuccessBlock($("#warning_register_or_login"), data.responseJSON.message)
                    console.log(data.responseJSON.message);
                })
        }else {
            warningOrSuccessBlock( $("#warning_register_or_login"), 'Пароли не совпадают');
            throw new Error('Пароли не совпадают')
        }
        
    } catch (error) {
        console.log(error.name + ': ' + error.message);
    }
    return false;
})