const divForLogOut = $("#log-out");

// Проверяет какое кол-во времени авторизован пользователь
function checkTimeOfAuth () {
    let dateNow = Date.now();
    if (dateNow - localStorage.LastAuth > 24*3600*1000 ) {
        logOut();
        document.location.href = "./index.html";
    }
}
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
                    <td>${ArrayOfWords[i].word}</td>
                    <td>${ArrayOfWords[i].values}</td>
                    </tr>`;
                }
                $("#table_with_all_words > tbody").append(toHTML);

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