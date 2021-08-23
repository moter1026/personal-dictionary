const darkBackground = $("#dark_background");   // Тёмный фон

const bttnPlus = $("#button_plus>img");         // картинка плюс(она же кнопка)
const newWordWindow = $("#new_word-window");    // Окно добавления нового слова
const ClosePlus = $("#new_word-close");
const bttnReady = $("#new_word-ready");

const linkAllWords = $("#all_words_link");      // Кнопка просмотра всех слов
const allWordWindow = $("#all_word_window");    // Окно просмотра всех слов
const CloseAllWord = $("#all_word-close");

let buttonsClose = $(".close_window");

// Тёмный фон для всплывающего окна виден
function visibleDarkBackground() {
    darkBackground.css('display','block');
}
function hiddenDarkBackground() {
    darkBackground.css('display','none');
}


// newWordWindow.on('wheel', () => {
//     console.log('OK');
// })

// buttonsClose.on('click', (e) => {
//     hiddenDarkBackground();
//     if (e.target == ClosePlus) {
//         newWordWindow.css('display','none');
//     } else {
//         allWordWindow.css('display','none');
//     }
// })
