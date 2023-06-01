import { clearCommentField, displayComments } from "./displayComments.js";

let popup, body, displayCom, socialComC, comLoader;
const loadRes = () => {
    popup = document.querySelector(".big-picture");
    body = document.querySelector('body');
    popup.querySelector('.social__comment-count');
};
export const displayPopUp = (data) => {
    loadRes();
    popup.classList.remove('hidden');

    const img = popup.querySelector('.big-picture__img img');
    img.src = data.url;
    if(data.filter){
        img.style.filter = data.filter;
    };
    if(data.size){
        img.style.transform = data.size;
    };
    console.log(data)
    
    const likesCount = popup.querySelector('.likes-count');
    likesCount.textContent = data.likes;
    
    const commentCount = popup.querySelector('.comments-count');
    commentCount.textContent = data.comments.length;
    displayCom = displayNewGroupCom();
    
    const description = popup.querySelector('.social__caption');
    description.textContent = data.description;

    socialComC = popup.querySelector('.social__comment-count');
    comLoader = popup.querySelector('.comments-loader');

    const num = displayCom(data.comments);
    changeCommentCount(num);
    if (num == data.comments.length){
        comLoader.classList.add('hidden');
    };

    comLoader.onclick = () => {
        const num = displayCom(data.comments);
        changeCommentCount(num);
        if (num == data.comments.length){
            console.log('hi')
            comLoader.classList.add('hidden');
        };
    };
    
    const body = document.querySelector('body');
    body.classList.add('modal-open');

    window.addEventListener('keydown', (evt) => {
        if (evt.keyCode == 27){
            closePopUp();
        };
    });
    const closeBtn = popup.querySelector('.cancel');
    closeBtn.onclick = () => {
        closePopUp();
    };
};
const closePopUp = () => {
    popup.classList.add('hidden');
    body.classList.remove('modal-open');
    displayCom = displayNewGroupCom();
    clearCommentField();
    comLoader.classList.remove('hidden');
};
const displayNewGroupCom = () => {
    let i = 0;
    const step = 5;
    return (data) => {
        displayComments(data.slice(i, Math.min(i + step, data.length)));
        i = Math.min(i + step, data.length);
        return i;
    };
};

const changeCommentCount = (num) => {
    const content = socialComC.innerHTML.split(' ');
    content[0] = num;
    socialComC.innerHTML = content.join(' ');
};

