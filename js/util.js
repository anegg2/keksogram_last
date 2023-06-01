export const generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getRandomArrayElement = (arr) => {
    return arr[generateNumber(0, arr.length - 1)];
};
export const getRandomArrayElements = (arr, n) => {
    const res = Array(n).fill(0);
    let len = arr.length;
    const elements = Array.from(arr);
    for (let i = 0; i < n; i++){
        const index = generateNumber(0, len - 1);
        res[i] = elements[index];
        elements.splice(index, 1);
        len--;
    }
    return res;
};
export const makeElem = (tagName, className, text) => {
    const el = document.createElement(tagName);
    if (className){
        el.classList.add(className);
    };
    if (text){
        el.textContent = text;
    }
    return el;
};
export const debounce = (callback, timeoutDelay) => {
    let timeoutId;
    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
  };