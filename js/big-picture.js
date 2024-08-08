import { isEscapeKey } from './util.js';

const COMMENTS_COUNT_TO_SHOW = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPicturePreview = bigPicture.querySelector('.big-picture__preview');
const bigPictureCopy = bigPicturePreview.cloneNode(true);
const bigPictureCancel = bigPictureCopy.querySelector('.big-picture__cancel');
const commentsContainer = bigPictureCopy.querySelector('.social__comments');
const commentShownCount = bigPictureCopy.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureCopy.querySelector('.social__comment-total-count');
const commentsLoader = bigPictureCopy.querySelector('.comments-loader');

let commentsShown = 0;
let comments = [];

const createCommentItem = (user) => {
  const item = document.createElement('li');
  const itemPicture = document.createElement('img');
  const itemText = document.createElement('p');

  item.classList.add('social__comment');
  itemPicture.classList.add('social__picture');
  itemText.classList.add('social__text');

  itemPicture.src = user.avatar;
  itemPicture.alt = user.name;
  itemText.textContent = user.message;

  item.append(itemPicture, itemText);

  return item;
};

const renderComments = () => {
  commentsShown += COMMENTS_COUNT_TO_SHOW;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createCommentItem(comments[i]);
    fragment.append(comment);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentShownCount.textContent = commentsShown;
  commentTotalCount.textContent = comments.length;
};

const bigPictureClose = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  commentsShown = 0;
};

function onDocumentEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    bigPictureClose();
  }
}

const onCancelButtonClick = () => {
  bigPictureClose();
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const bigPictureOpen = (picture) => {
  const bigPictureImg = bigPictureCopy.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = bigPictureCopy.querySelector('.likes-count');
  const bigPictureDescripion = bigPictureCopy.querySelector('.social__caption');

  bigPicturePreview.remove();

  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescripion.textContent = picture.description;

  comments = picture.comments;
  renderComments();

  bigPicture.append(bigPictureCopy);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
};

bigPictureCancel.addEventListener('click', onCancelButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { bigPictureOpen };
