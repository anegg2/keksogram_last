import { generateNumber } from "./util.js";

const descriptions = ["Restaurant", "Street", "House"];
const messages = ["Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];

export const getPhotos = async () => {
    const res = await fetch('https://28.javascript.pages.academy/kekstagram/data');
    return await res.json();
};


const createComments = (num) => {
    const comments = [];
    for (let i = 0; i < num; i++){
        const avatar = '/img/avatar-' + generateNumber(1, 6) + '.svg';
        const message = messages[Math.floor(Math.random() * messages.length)];
        const name = 'Alex';
        comments.push({
            id: i,
            avatar: avatar,
            message: message,
            name: name
        });
    };
    return comments;
}
export const createPhotos = (num) => {
    const photos = [];
    for (let i = 1; i <= num; i++){
        const url = '/photos/' + i + '.jpg';
        const description = descriptions[generateNumber(0, descriptions.length)]
        const likes = generateNumber(0, 100);
        const comments = createComments(generateNumber(7, 14));
        photos.push({
            id: i,
            url: url,
            description: description,
            likes: likes,
            comments: comments
        });
    }
    return photos;
};