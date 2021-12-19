// jQuery(document).ready(() => {
// const newWordFormInputText = $("#new_word-form-input_text").value;
// const fs = require("fs");
const bttnNewValue = $("#new_word-form-add-a-value");
const blockNewValues = $("#new_word-word_list");
    // __________Добавляем слушателb на кнопки__________
    bttnPlus.on('click', () => {
        let word = document.getElementById("word").value;
        console.log(word);
        let newWord = document.getElementById("new_word");
        newWord.textContent = word;
        visibleDarkBackground();
        newWordWindow.css('display','block');
    });

    ClosePlus.on('click', () => {
        hiddenDarkBackground();
        newWordWindow.css('display','none');
    });
    
    bttnNewValue.on('click', () => {
        let value = document.getElementById("new_word-form-input_text").value;
        let htmlText = `<p>${value}</p>`;
        blockNewValues.prepend(htmlText);
    })
    // bttnReady.on('mousedown', () => {
    //     bttnReady.css({transform: "translate3d(-1px, -1px, 0px)",
    //     boxShadow: "4px 4px 0 #808080"
    //     });
    // });
    // bttnReady.on('mouseup', () => {
    //     bttnReady.css({transform: "translate3d(0, 0, 0)",
    //     boxShadow: "none"
    //     });
    // });
// })