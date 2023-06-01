let picturesPlaceholder;
let picTemplate;
let picture;

const loadRes = () => {
    picturesPlaceholder = document.querySelector('.pictures');
    picTemplate = document.querySelector('#picture').content;
    picture = picTemplate.querySelector('.picture')
};


const createPicture = (data) => {
    const pic = picture.cloneNode(true);
    const img = pic.querySelector('.picture__img');
    img.src = data.url;
    const pictureInfo = pic.querySelector('.picture__info');
    const likes = pictureInfo.querySelector('.picture__likes');
    likes.textContent = data.likes;
    const comments = pictureInfo.querySelector('.picture__comments');
    comments.textContent = data.comments.length;
    if (data.size){
        img.style.transform = data.size;
    }
    if(data.filter){
        img.style.filter = data.filter;
    }
    return pic;
};

export const displayPictures = (photos) => {
    loadRes();
    while(picturesPlaceholder.lastChild.classList && picturesPlaceholder.lastChild.classList.contains('picture')){
        picturesPlaceholder.removeChild(picturesPlaceholder.lastChild);
    }
    for (let i = 0; i < photos.length; i++){
        const photo = photos[i];
        const pic = createPicture(photo);
        picturesPlaceholder.appendChild(pic);
    };
};