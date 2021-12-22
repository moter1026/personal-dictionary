const linkAllWords = $("#all_words_link");      // Кнопка просмотра всех слов
const allWordWindow = $("#all_word_window");    // Окно просмотра всех слов
let wordList = $("#all_word-word_list");
let openedAllWords = false;
arrObjectsOfWordsInBrowser = [];


function getWords(number) {
    $.ajax({
        url: "account/getWords",
        headers: {
            authorization : `Bearer ${localStorage.token}`,
            numberofwords : number 
        },
        success: (data) => {
            arrObjectsOfWords = JSON.parse(data);
            arrObjectsOfWordsInBrowser = arrObjectsOfWords;
            // console.log(arrObjectsOfWords);
            let inHtml = '<ul>';
            let mainWordsArr = [];
            for (let i = 0; i < arrObjectsOfWords.length; i++) {
                mainWordsArr[i] = arrObjectsOfWords[i].word;
                inHtml += `<li class="personals-words">${arrObjectsOfWords[i].word}</li>`;
            }
            console.log(mainWordsArr);
            console.log(mainWordsArr.sort());
            inHtml += '</ul>';
            $("#all_word-main_searching_content_flex-h3").after(inHtml);
            openedAllWords = true;

            $(".personals-words").on('click', (event) => {
                word = event.target.textContent;
                
                $("#all_word-word_list > div").remove();
                pushValue(arrObjectsOfWordsInBrowser, arrObjectsOfWordsInBrowser.findIndex((item, index, array) => {
                    if(item.word == word) return true;
                }));
                

            })
        }
    })
}

function pushValue (arr, index) {
    values = arr[index].values;
    let pushHTML = '<div>'
    for (let i = 0; i < values.length; i++) {
        pushHTML += `<p>${values[i]}</p>`;
    }
    pushHTML += '</div>';
    $("#all_word-word_list").prepend(pushHTML);
}

    

// Код для закрытия окна по нижитию на Escape находится в main.js
function closeWindowOfAllWords () {
    hiddenDarkBackground();
    allWordWindow.css('display','none');
    if(document.querySelector("#all_word-main_searching_content_flex > div > ul")) {
        document.querySelector("#all_word-main_searching_content_flex > div > ul").remove();
        $("#all_word-word_list")[0].innerHTML = "";
        openedAllWords = false;
    }
}
CloseAllWord.on('click', closeWindowOfAllWords);

    // __________Добавляем слушатели на кнопки__________
linkAllWords.on('click', () => {
    if (openedAllWords != true) getWords(10);
    visibleDarkBackground();
    allWordWindow.css('display','block');
    console.log(arrObjectsOfWordsInBrowser);
})



