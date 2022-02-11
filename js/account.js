const divForLogOut = $("#log-out");

// Проверяет какое кол-во времени авторизован пользователь
checkTimeOfAuth();

// Данная функция вставляет имя пользователя на сайт
function pushNameInHeader(name) {
    let divUserName = $("#authed-name");
    let textName = document.createTextNode(name); 
    divUserName.append(textName);
}  
pushNameInHeader(localStorage.userName);

// функция считает кол-во слов, записанных пользователем
function countWords() {
    $.ajax({
        url: "account/countWords",
        headers: {
            authorization : `Bearer ${localStorage.token}`
        },
        success: (data) => {

            console.log(data);
            let block = $("#count_words-count");
            let textToHtml = '';
            if (data[data.length - 1] == 1) {
                textToHtml += `${data} слово`
            } else if ( 2 <= data[data.length - 1] &
                        data[data.length - 1] <= 4  ) {
                textToHtml += `${data} слова`
            } else if ( (5 <= data[data.length - 1] & 
                        data[data.length - 1]<= 9) || 
                        data[data.length - 1] == 0) {
                textToHtml += `${data} слов`
            }
            block[0].textContent = textToHtml;
        }
    })
}
countWords();

function getAllWords() {
    try {
        $.get({
            url: "account/getAllWords",
            headers: {
                authorization : `Bearer ${localStorage.token}`
            },
            success: (dataArray) => {
                ArrayOfWords = JSON.parse(dataArray);
                let toHTML = ``;
                for (let i = 0; i < ArrayOfWords.length; i++) {
                    toHTML += `<tr>
                    <td class="tdBlockWithWord">${ArrayOfWords[i].word}</td>
                    <td class="tdBlockWithValues">${ArrayOfWords[i].values}</td>
                    </tr>`;
                }
                $("#table_with_all_words > tbody").append(toHTML);

                let rowEl = document.querySelectorAll("#table_with_all_words tbody tr"); // $("#table_with_all_words tbody tr")
                let $pencilRedact = $(`<img src="./img/pencil.svg" class="pencil_redact hover_buttons" id="pencil_redact">`);
                let $deletebutton = $(`<img src="./img/delete.svg" class="delete_button hover_buttons" id="delete_button">`);
                for (let i = 0; i < rowEl.length; i++) {
                    rowEl[i].addEventListener("mouseenter", (event) => {
                        let tr = event.target; // .parentElement
                        if (tr.children[1].firstChild.nodeName == "#text") {
                            tr.children[1].append($pencilRedact[0]);
                            tr.children[1].append($deletebutton[0]);
                        }
                    })                    
                }

                $pencilRedact.on("click", (ev) => {
                    let tr = ev.target.parentElement.parentElement;
                    let word = tr.children[0].textContent;
                    let values = tr.children[1].textContent;
                    tr.children[1].textContent = '';
                        // Если есть уже инпуты для редактированияЮ то удалить его и 
                        // вставить новые для нужного слова
                    if ($("#redactWord")[0]) {
                        let valuesFromInput = $("#redactValue")[0].value;
                        let parentTR = $("#redactWord")[0].parentElement.parentElement;
                        $("#redactValue")[0].remove();
                        parentTR.children[1].textContent = valuesFromInput;
                    }
                    tr.children[1].append($(`<textarea name="redactValue" id="redactValue" cols="40">${values}</textarea>`)[0]);
                    tr.children[1].append($(`<a id="buttomSaveNewValues" class="buttonsWhenRedact" href="javascript:void(0);">Сохранить</a>`)[0]);
                    tr.children[1].append($(`<a id="buttonCancel" class="buttonsWhenRedact" href="javascript:void(0);">Отмена</a>`)[0]);
                    let buttomSaveNewValues = $("#buttomSaveNewValues");
                    let buttonCancel = $("#buttonCancel");

                    buttomSaveNewValues.on("click", () => {
                        let valuesFromInput = $("#redactValue")[0].value.toLowerCase();

                        $.get({
                            url: 'account/redact',
                            headers: {
                                authorization : `Bearer ${localStorage.token}`,
                                redactword: encodeURI(word),
                                redactvalues: encodeURI(valuesFromInput)
                            },
                            success: (data) => {
                                console.log(data.message);
                            }
                        });

                        $("#redactValue")[0].remove();
                        tr.children[1].textContent = valuesFromInput;
                    });
                    buttonCancel.on("click", () => {
                        $("#redactValue")[0].remove();
                        tr.children[1].textContent = values;
                    })
                });

                $deletebutton.on("click", (ev) => {
                    let tr = ev.target.parentElement.parentElement;
                    tr.remove();
                    let word = tr.children[0].textContent;
                    $.get({
                        url: "account/deleteWord",
                        headers: {
                            authorization : `Bearer ${localStorage.token}`,
                            deleteword: encodeURI(word)
                        },
                        success: (data) => {
                            warningOrSuccessBlock($("#success-in-account"), data);
                            let count = $("#count_words-count")[0].textContent.split(' ')[0] - 1;
                            let textToHtml = '';
                            if (count == 1) {
                                textToHtml += `${count} слово`
                            } else if ( 2 <= count &
                                        count <= 4  ) {
                                textToHtml += `${count} слова`
                            } else if ( (5 <= count & 
                                        count <= 9) || 
                                        count == 0) {
                                textToHtml += `${count} слов`
                            }
                            $("#count_words-count")[0].textContent = textToHtml;
                        }
                    });
                    
                })


                for (let i = 0; i < rowEl.length; i++) {
                    rowEl[i].addEventListener("mouseleave", (event) => {
                        let tr = event.target;
                        if (tr.children[1].firstChild.nodeName == "#text") {
                            tr.children[1].lastChild.remove();    
                            tr.children[1].lastChild.remove();    
                        }
                    })                    
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}
getAllWords()

// Слушатель события на ктопку выхода из аккаунта
divForLogOut.on("click", () => {
    logOut();
    document.location.href = "./index.html";
});