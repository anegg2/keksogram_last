let pictures;

const loadRes = () => {
    pictures = document.querySelectorAll('.picture');
};

export const addEvtLst = (photos, cb) => {
    loadRes();
    for (let i = 0; i < pictures.length; i++){
        pictures[i].onclick = (evt) => {
            evt.preventDefault();
            cb(photos[i]);
        };
    };
};