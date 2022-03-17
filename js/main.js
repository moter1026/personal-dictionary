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

// Отчищает localstorge чтобы выйти из аккаунта
function logOut () {
    localStorage.clear();
}
// Проверяет какое кол-во времени авторизован пользователь
function checkTimeOfAuth () {
    let dateNow = Date.now();
    if (dateNow - localStorage.LastAuth > 24*3600*1000 ) {
        logOut();
    }
}
checkTimeOfAuth();


// Тёмный фон для всплывающего окна виден
function visibleDarkBackground() {
    darkBackground.css('display','block');
}
function hiddenDarkBackground() {
    darkBackground.css('display','none');
}


function warningOrSuccessBlock( jqueryElem ,text) {
    jqueryElem[0].textContent = text;
    jqueryElem.show(600)
    setTimeout(() => {jqueryElem.hide(600)}, 3000)
}


// функция создавалась для того, чтобы
// предотвратить отправку формы по нажатии на Enter
function dontSubmit(event) {
    event.preventDefault();
    return false;
}


function checkAuth(func) {
    try {
        if (!localStorage.userName){
            warningOrSuccessBlock($("#warning_main_window"), "Авторизуйтесь для работы с сайтом")
            throw new Error("Авторизуйтесь для работы с сайтом");
        } else {
            func()
        }
    } catch (e) {
        console.log(e.name + ": " + e.message);
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
function closeWindowOfNewWords () {
    hiddenDarkBackground();
    newWordWindow.css('display','none');
    $("#word")[0].value = "";
    $("#new_word-form-input_text")[0].value = "";
    $("#new_word-word_list")[0].innerHTML = "";
    $("#word")[0].focus();
}
// При нажатии на затемнённый фон всплывающее окно закроется
darkBackground.on("click", (ev) => {
    ev.preventDefault();
    closeWindowOfNewWords()
})

// Прекращение всплытия события дальше, всплавающего окна
newWordWindow.on("click", (ev) => {
    ev.stopPropagation();
})


