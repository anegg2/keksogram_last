import { getPhotos } from "./data.js";
import { displayPictures } from "./displayPhotos.js";
import { imgFilterHandler } from "./imgFilter.js";
import { addEvtLst } from "./photoEvtLtn.js";
import { displayPopUp } from "./popUp.js";
import { imgFormHandler } from "./uploadImg.js";


const init = async () => {
    const photos = await getPhotos();
    displayPictures(photos);
    addEvtLst(photos, displayPopUp);
    imgFormHandler(photos);
    imgFilterHandler(photos);
};

init();