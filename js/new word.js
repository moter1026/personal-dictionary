// jQuery(document).ready(() => {

    // __________Добавляем слушателb на кнопки__________
    bttnPlus.on('click', () => {
        visibleDarkBackground();
        newWordWindow.css('display','block');
    });

    ClosePlus.on('click', () => {
        hiddenDarkBackground();
        newWordWindow.css('display','none');
    });
    
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