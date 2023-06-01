import { displayPictures } from "./displayPhotos.js";
import { imgFilterHandler } from "./imgFilter.js";
import { addEvtLst } from "./photoEvtLtn.js";
import { displayPopUp } from "./popUp.js";
import { send } from "./sendData.js";
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg'];
let imgForm, body, img, imgUploadOverlay, uploadFile, scaleValue, sliderContainer, slider, currEffect, textHashtags, commentField, successTemplate, errorTemplate, success, error;
const loadRes = () => {
    imgForm = document.querySelector('.img-upload__form');
    body = document.querySelector('body');
    uploadFile = imgForm.querySelector('.img-upload__input');
    img = imgForm.querySelector('img');
    imgUploadOverlay = imgForm.querySelector('.img-upload__overlay');
    scaleValue = imgForm.querySelector('.scale__control--value');
    sliderContainer = imgForm.querySelector('.img-upload__effect-level');
    slider = sliderContainer.querySelector('.effect-level__slider');
    textHashtags = imgForm.querySelector('[name="hashtags"]');
    commentField = imgForm.querySelector('[name="description"]');
    successTemplate = document.querySelector('#success').content;
    errorTemplate = document.querySelector('#error').content;
    success = successTemplate.querySelector('.success');
    error = errorTemplate.querySelector('.error');
};

export const imgFormHandler = (photos) => {
    loadRes();
    noUiSlider.create(slider, {
        range: {
          min: 0,
          max: 10,
        },
        step: 0.1,
        start: 1,
        connect: 'lower',
    });
    sliderContainer.classList.add('hidden');
    
    uploadFile.onchange = (evt) => {
        body.classList.add('modal-open');
        imgUploadOverlay.classList.remove('hidden');
        if(!loadFile()){
            return false;
        }
        setSize(scaleValue.value.slice(0, scaleValue.value.length - 1))
    };
    
    const uploadCancel = imgForm.querySelector('#upload-cancel');
    uploadCancel.onclick = (evt) =>  {
        evt.preventDefault();
        closeForm();
    };
    window.onkeydown = (evt) => {
        if (evt.keyCode == 27){
            console.log(document.activeElement)
            if (document.activeElement.name !== 'hashtags' && document.activeElement.name !== 'description'){
                closeForm();
            }
        }
    };
    
    const STEP = 0.25;
    imgForm.querySelector('.scale__control--smaller').onclick = () => {
        setSize(scaleValue.value.slice(0, scaleValue.value.length - 1) / 100 - STEP);
    };
    imgForm.querySelector('.scale__control--bigger').onclick = () => {
        setSize(scaleValue.value.slice(0, scaleValue.value.length - 1) / 100 + STEP);
    };
    const effects = document.querySelectorAll('.effects__radio');
    currEffect = '';
    for(const effect of effects){
        effect.onclick = () => {
            if (currEffect){
                img.classList.remove(currEffect);
            }
            if (effect.value !== 'none'){
                currEffect = 'effects__preview--' + effect.value;
                sliderContainer.classList.remove('hidden');
                if(effect.value === 'chrome' || effect.value === 'sepia'){
                    slider.noUiSlider.updateOptions({
                        range: {
                            min: 0,
                            max: 1,
                        },
                        start: 1,
                        step: 0.1,
                    });
                }else if (effect.value === 'marvin'){
                    slider.noUiSlider.updateOptions({
                        range: {
                            min: 0,
                            max: 100,
                        },
                        start: 100,
                        step: 1,
                    });
                }else if (effect.value === 'phobos'){
                    slider.noUiSlider.updateOptions({
                        range: {
                            min: 0,
                            max: 3,
                        },
                        start: 3,
                        step: 0.1,
                    });
                }else {
                    slider.noUiSlider.updateOptions({
                        range: {
                            min: 1,
                            max: 3,
                        },
                        start: 3,
                        step: 0.1,
                    });
                }
                img.classList.add(currEffect);
            }else{
                currEffect = '';
                img.style.filter = null;
                sliderContainer.classList.add('hidden');
            }
        };
    };
    const effectValue = document.querySelector('.effect-level__value');
    slider.noUiSlider.on('update', () => {
        effectValue.value = slider.noUiSlider.get();
        switch(currEffect){
            case 'effects__preview--chrome':
                img.style.filter = 'grayscale(' + effectValue.value + ')';
                break;
            case 'effects__preview--sepia':
                img.style.filter = 'sepia(' + effectValue.value + ')';
                break;
            case 'effects__preview--marvin':
                img.style.filter = 'invert(' + effectValue.value + '%)';
                break;
            case 'effects__preview--phobos':
                img.style.filter = 'blur(' + effectValue.value + 'px)';
                break;
            case 'effects__preview--heat':
                img.style.filter = 'brightness(' + effectValue.value + ')';
                break;
            default:
                img.style.filter = '';
        }
    });

    const pristine = new Pristine(imgForm, {
        classTo: 'img-upload__field-wrapper',   
        errorClass: 'form__item--invalid',
        successClass: 'form__item--valid',
        errorTextParent: 'img-upload__field-wrapper',
        errorTextTag: 'span',
        errorTextClass: 'form__error'
    });
    pristine.addValidator(textHashtags, validateHashtag);
    imgForm.onsubmit = async (evt) => {
        evt.preventDefault();
        const valid = pristine.validate();
        if (valid){
            const formData = new FormData(evt.target);
            imgForm.querySelector('#upload-submit').disabled = true;
            const res = await send(formData);
            if (res){
                imgForm.querySelector('#upload-submit').disabled = false;
            }
            photos.push({
                id: photos.length,
                url: img.src,
                likes: 0,
                comments: [],
                description: `${textHashtags.value} ${commentField.value}`,
                size: img.style.transform,
                filter: img.style.filter
            })
            displayPictures(photos);
            addEvtLst(photos, displayPopUp);
            imgFilterHandler(photos);
            formResponseHandler(res);
        };
    };
};

const formResponseHandler = (res) => {
    if (res.ok){
        closeForm();
        const succ = success.cloneNode(true);
        succ.querySelector('.success__button').onclick = () => {
            body.removeChild(succ);
        };
        window.onkeydown = (evt) => {
            console.log(document.activeElement)
            if (evt.keyCode == 27 && document.activeElement.name !== 'filename'){
                body.removeChild(succ);
            }
        };
        body.appendChild(succ);
    }else{
        const err = error.cloneNode(true);
        err.querySelector('.error__button').onclick = () => {
            body.removeChild(err);
        };
        window.onkeydown = (evt) => {
            if (evt.keyCode == 27){
                body.removeChild(err);
            }
        };
        body.appendChild(err);
    }
};

const validateHashtag = (value) => {
    if(!value){
        return true;
    }
    const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
    const hashtags = {};
    for (const tag of value.split(' ')){
        if (!hashtag.test(tag.toLowerCase()) || hashtags[tag.toLowerCase()]){
            return false;
        }
        hashtags[tag.toLowerCase()] = true;
    };
    return value.split(' ').length <= 5;
};

const closeForm = () => {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value = '';
    if (currEffect){
        img.classList.remove(currEffect);
    }
    img.style.filter = null;
    sliderContainer.classList.add('hidden');
    textHashtags.value = '';
    commentField.value = '';
};

const setSize = (size) => {
    const MIN = 0.25;
    const MAX = 1;
    let newValue = size;
    newValue = Math.max(MIN, newValue);
    newValue = Math.min(MAX, newValue);
    scaleValue.value = Math.round(newValue * 100) + '%';
    img.style.transform = 'scale(' + newValue + ')';
};

const loadFile = () => {
    const file = uploadFile.files[0];
    img.file = file;
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
        img.src = URL.createObjectURL(file);
        return true;
    }
    return false;
};

