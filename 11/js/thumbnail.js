import { bigPictureOpen } from './big-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (picture) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = thumbnail.querySelector('.picture__img');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');

  thumbnailImg.src = picture.url;
  thumbnailImg.alt = picture.description;
  thumbnailLikes.textContent = picture.likes;
  thumbnailComments.textContent = picture.comments.length;
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPictureOpen(picture);
  });

  return thumbnail;
};

const createThumbnails = (pictures) => {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createThumbnail(picture));
  });

  picturesContainer.append(fragment);
};

export { createThumbnails };
