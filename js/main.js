const darkBackground = $("#dark_background");   // Тёмный фон

const bttnPlus = $("#button_plus>img");         // картинка плюс(она же кнопка)
const newWordWindow = $("#new_word-window");    // Окно добавления нового слова
const CloseAllWord = $("#all_word-close");
const ClosePlus = $("#new_word-close");
const bttnReady = $("#new_word-ready");
const formOfAddingNewWord = $("#form_of_adding_new_word");
const windowOfAllWords = $("#all_word_window")[0];
const windowOfNewWords = $("#new_word-window")[0];

let buttonsClose = $(".close_window");

// Тёмный фон для всплывающего окна виден
function visibleDarkBackground() {
    darkBackground.css('display','block');
}
function hiddenDarkBackground() {
    darkBackground.css('display','none');
}
    // функция создавалась для того, чтобы
    // предотвратить отправку формы по нажатии на Enter
function dontSubmit(event) {
    event.preventDefault();
    return false;
}


function checkAuth(func) {
    try {
        if (!localStorage.userName)
            throw new Error("Авторизуйтесь для работы с сайтом");

        func();
    } catch (e) {
        return alert(e.name + ": " + e.message);
    }
}

//-------------------------
let accountOrRegistrationAndLogin = $("#account");
accountOrRegistrationAndLogin.on("click", () => {
    if (localStorage.userName) {
        accountOrRegistrationAndLogin.attr("href", "././account.html") 
    } else {
        accountOrRegistrationAndLogin.attr("href", "./sign Up, register.html")
    }
});

document.addEventListener("keydown", (event) => {
    try {
        if (event.key == "Escape") {
            console.log(getComputedStyle(windowOfAllWords).display);
            if (getComputedStyle(windowOfAllWords).display == "block") {
                closeWindowOfAllWords();            // closeWindowOfAllWords находится в "all word.js"
            } else if (getComputedStyle(windowOfNewWords).display == "block") {
                closeWindowOfNewWords();            // closeWindowOfAllWords находится в "all word.js"
            }
        }
    } catch (err) {
        console.log(err);
    }
});


