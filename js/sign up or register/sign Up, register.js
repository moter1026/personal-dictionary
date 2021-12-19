const linkRegistr = $("#link_of_registration"); // на странице с авторизацией
const linkSignUp = $("#link_of_sign_up");       // на странице с регистрацией
const pageOfSignUp = $("#Sign_Up");
const pageOfRegistration = $("#Register");
const blockOfErrors = $("#error_register_or_login");
const ErrorText  = '';
let USER = '';
let resText = '';

linkRegistr.on('click', () => {
    pageOfSignUp.attr('class', 'none');
    pageOfRegistration.attr('class', 'block');
})
linkSignUp.on('click', () => {
    pageOfRegistration.attr('class', 'none');
    pageOfSignUp.attr('class', 'block');
})


//      ----------РБОЧИЙ AJAX ЗАПРОС----------

// const BttnLogin = $("#loginSubmit");
// BttnLogin.on("click", (e) => {
//     e.preventDefault();
//     let forms = document.forms["form_of_sign_up"];
//     let user = JSON.stringify({
//         loginNick: forms.loginNick.value,
//         loginPassword: forms.loginPassword.value       
//     })
//     let request = new XMLHttpRequest();
//     request.open('POST', '/login', true);
//     request.setRequestHeader(
//         'Content-Type',
//         'application/json'
//       );
//     request.addEventListener('load', () => {
//         let NodeResponse = JSON.parse(request.response);
//         resText = NodeResponse.resText;
//         USER = NodeResponse.UserNick;
//     });
//     request.send(user);
//     console.log(resText);

//     blockOfErrors.prepend(`<p>${resText}</p>`);
// });


