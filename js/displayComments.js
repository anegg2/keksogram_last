import { makeElem } from "./util.js";

let comPlaceholder;

const loadRes = () => {
    comPlaceholder = document.querySelector('.social__comments');
};

const createCom = (data) => {
    const li = makeElem('li', 'social__comment');
    const img = makeElem('img', 'social__picture');
    img.src = data.avatar;
    img.alt = data.name;
    img.style.width = 35;
    img.style.height = 35;
    const p = makeElem('p', 'social__text', data.message);
    
    li.appendChild(img);
    li.appendChild(p);
    return li;
};

export const displayComments = (commentsData) => {
    loadRes();
    for (let i = 0; i < commentsData.length; i++ ){
        const com = createCom(commentsData[i]);
        
        comPlaceholder.appendChild(com);
    };
};
export const clearCommentField = () => {
    for (const com of comPlaceholder.querySelectorAll('.social__comment')){
        com.remove();
    };
};