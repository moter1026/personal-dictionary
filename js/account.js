const divForLogOut = $("#log-out");

function pushNameInHeader(name) {
    let divUserName = $("#authed-name");
    let textName = document.createTextNode(name); 
    divUserName.append(textName);
}
pushNameInHeader(localStorage.userName);

divForLogOut.on("click", () => {
    logOut();
    document.location.href = "./index.html";
});

function countWords() {
    $.ajax({
        url: "auth/countWords",
        headers: {
            authorization : `Bearer ${localStorage.token}`
        },
        success: (data) => {
            console.log(data);
            let block = $("#count_words-count");
            let textToHtml = '';
            if (data[data.length - 1] == 1) {
                textToHtml += `${data} слово`
            } else if ( data[data.length - 1] == 2 || 
                        data[data.length - 1] == 3 ||  
                        data[data.length - 1] == 4  ) {
                textToHtml += `${data} слова`
            } else if ( data[data.length - 1] == 5 || 
                        data[data.length - 1] == 6 || 
                        data[data.length - 1] == 7 || 
                        data[data.length - 1] == 8 || 
                        data[data.length - 1] == 9 || 
                        data[data.length - 1] == 0) {
                textToHtml += `${data} слов`
            }
            block[0].textContent = textToHtml;
        }
    })
}
countWords();