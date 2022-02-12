const bttnNewValue = $("#tooltip_link-for-button");
const buttonReadyAddNewWords = $("#new_word-ready");
const newWordForm = $("#new_word-form");
    // не изменять на const!!!
let blockNewValues = $("#new_word-word_list");
let word = $("#word");
// При загрузке страницы сразу устанавливаю фокус
// на инпут ввода слов
word[0].focus();

function haveContent(value) {
    if (value.length == 0 || !value.trim()) {
        return false;
    } 
}

function addNewWord () {
    let word = $("#word")[0].value;
    check = haveContent(word);
    if( check == 0) {
        throw new Error("Введите слово, значения к которому вы хотите добавить!!!");
    }
    console.log(word);
    let newWord = $("#new_word");
    newWord[0].textContent = word;
    visibleDarkBackground();
    newWordWindow.css('display','block');
    $("#new_word-form-input_text").focus()
}



function addValue(value) {
    let arrValues = value.split(",");
    let htmlText = "";
    for (let i = 0; i < arrValues.length; i++) {
        arrValues[i] = arrValues[i].trim();
        htmlText += `<p>${arrValues[i]}</p>`;
    }
    // let htmlText = `<p>${value}</p>`;
    blockNewValues.prepend(htmlText);
    return "";
}




    // __________Добавляем слушатель на кнопки__________
    
        // Слушатели для открытия и закрытия окна с вводом слов
    bttnPlus.on('click', () => {
        checkAuth(addNewWord);              // функция "checkAuth" находится в main.js
    });
    formOfAddingNewWord.on("submit", (event) => {
        try {
            dontSubmit(event);              // функции "dontSubmit" находится в main.js
            // if (event.key == "Enter") {
                checkAuth(addNewWord);      // функции "checkAuth" находится в main.js
            // }
        } catch (err) {
            console.log(err);
        }
    })

    // Код для закрытия окна по нижитию на Escape находится в main.js
    ClosePlus.on('click', closeWindowOfNewWords);
    
        //--------------------
        
    
    function addValueAndResetInput() {
        if ($("#new_word-form-input_text")[0].value.trim() != "")
        {
            $("#new_word-form-input_text")[0].value =
                addValue($("#new_word-form-input_text")[0].value.trim());
        }
    }
    bttnNewValue.on('click', addValueAndResetInput);
    newWordForm.on("submit", (event) => {
        dontSubmit(event);
        addValueAndResetInput();
    });

    

    buttonReadyAddNewWords.on("click", () => {
        try {
            // document.getElementById("new_word-word_list").childNodes
            let tegsFromWordList = $("#new_word-word_list")[0].children;
            if (tegsFromWordList.length == 0) {
                $("#warning_havent_values").show(600);
                setTimeout(() => {$("#warning_havent_values").hide(600)}, 3000)
                throw new Error("Добавьте хотя бы одно значение для слова!");
            }
            let arrWithTextValuesFromWordList = [];
            for (let i = 0; i < tegsFromWordList.length; i++) {
                if (arrWithTextValuesFromWordList.
                    indexOf(tegsFromWordList[i].textContent.toLowerCase()) == -1) {
                    arrWithTextValuesFromWordList.push(tegsFromWordList[i].textContent.toLowerCase());  
                }
            }
            arrWithTextValuesFromWordList = encodeURI(arrWithTextValuesFromWordList);
            console.log(arrWithTextValuesFromWordList);
            // const jsonArr = JSON.stringify(arrWithTextValuesFromWordList);
            $.ajax({
                url: "account/newWord",
                headers: {
                    authorization : `Bearer ${localStorage.token}`,
                    newword: document.getElementById("word").value.toLowerCase(),
                    wordvalues: arrWithTextValuesFromWordList
                },
                success: (data) => {
                    console.log(data.message);
                }
            });
            closeWindowOfNewWords();
                // Обнуляем все поля 
            

            // console.log(divWithWordValues);
        } catch (e) {
            console.log(e);
        }
    })

