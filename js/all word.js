$(document).ready( ()=> {

    // __________Добавляем слушатели на кнопки__________
    linkAllWords.on('click', () => {
        visibleDarkBackground();
        allWordWindow.css('display','block');
    })

    CloseAllWord.on('click', () => {
        hiddenDarkBackground();
        allWordWindow.css('display','none');
    })
})