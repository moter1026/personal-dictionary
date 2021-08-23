const linkRegistr = $("#link_of_registration"); // на странице с авторизацией
const linkSignUp = $("#link_of_sign_up");       // на странице с регистрацией
const pageOfSignUp = $("#Sign_Up");
const pageOfRegistration = $("#Register");

linkRegistr.on('click', () => {
    pageOfSignUp.attr('class', 'none');
    pageOfRegistration.attr('class', 'block');
})
linkSignUp.on('click', () => {
    pageOfRegistration.attr('class', 'none');
    pageOfSignUp.attr('class', 'block');
})