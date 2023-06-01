import { displayPictures } from "./displayPhotos.js";
import { addEvtLst } from "./photoEvtLtn.js";
import { displayPopUp } from "./popUp.js";
import { debounce, getRandomArrayElements } from "./util.js";

const RENDER_DELAY = 500;
export const imgFilterHandler = (photos) => {
    const imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    
    for(const filter of imgFilters.querySelectorAll('.img-filters__button')){
        filter.classList.remove('img-filters__button--active');
    }
    let currEl = imgFilters.querySelector('#filter-default');
    currEl.classList.add('img-filters__button--active');

    imgFilters.querySelector('#filter-default').onclick = (evt) => {
        currEl.classList.remove('img-filters__button--active');
        evt.srcElement.classList.add('img-filters__button--active')
        currEl = evt.srcElement;
        debounce(() => {displayPictures(photos); addEvtLst(photos, displayPopUp); }, RENDER_DELAY)();
    };
    imgFilters.querySelector('#filter-random').onclick = (evt) => {
        currEl.classList.remove('img-filters__button--active');
        evt.srcElement.classList.add('img-filters__button--active')
        currEl = evt.srcElement;
        const newList = getRandomArrayElements(photos, 10)
        debounce(() => {displayPictures(newList); addEvtLst(newList, displayPopUp); }, RENDER_DELAY)();
    };
    imgFilters.querySelector('#filter-discussed').onclick = (evt) => {
        currEl.classList.remove('img-filters__button--active');
        evt.srcElement.classList.add('img-filters__button--active')
        currEl = evt.srcElement;
        const sortedArray = Array.from(photos);
        sortedArray.sort(function(a, b) {return b.comments.length - a.comments.length;});
        debounce(() => {displayPictures(sortedArray); addEvtLst(sortedArray, displayPopUp); }, RENDER_DELAY)();
    };
};