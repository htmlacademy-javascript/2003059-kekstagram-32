import { isEscapeKey } from './util.js';
import { createComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPicturePreview = bigPicture.querySelector('.big-picture__preview');
const bigPictureCopy = bigPicturePreview.cloneNode(true);

const bigPictureClose = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    bigPictureClose();
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
};

const bigPictureOpen = (picture) => {
  const bigPictureImg = bigPictureCopy.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = bigPictureCopy.querySelector('.likes-count');
  const bigPictureCancel = bigPictureCopy.querySelector('.big-picture__cancel');
  const bigPictureDescripion = bigPictureCopy.querySelector('.social__caption');

  bigPicturePreview.remove();

  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescripion.textContent = picture.description;

  createComments(picture.comments);

  bigPictureCancel.addEventListener('click', () => {
    bigPictureClose();
    document.removeEventListener('keydown', onDocumentEscKeydown);
  });

  bigPicture.append(bigPictureCopy);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
};

export { bigPictureOpen, bigPictureCopy };
