import { bigPictureCopy } from './big-picture.js';

const COMMENTS_SHOWN_COUNT_CURRENT = 5;

const showCountComments = (comments) => {
  const commentsContainer = bigPictureCopy.querySelector('.social__comments');
  const commentShownCount = bigPictureCopy.querySelector('.social__comment-shown-count');
  const commentTotalCount = bigPictureCopy.querySelector('.social__comment-total-count');
  const commentsLoader = bigPictureCopy.querySelector('.comments-loader');

  if (comments.length <= commentsContainer.childElementCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentShownCount.textContent = commentsContainer.childElementCount;commentTotalCount.textContent = comments.length;
};


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

const addNextComments = (comments, shownComments) => {
  const commentsContainer = bigPictureCopy.querySelector('.social__comments');
  comments.slice(shownComments - COMMENTS_SHOWN_COUNT_CURRENT, shownComments).forEach((comment) => {
    commentsContainer.append(createCommentItem(comment));
  });
  showCountComments(comments);
};

const createComments = (comments, shownComments) => {
  const commentsContainer = bigPictureCopy.querySelector('.social__comments');
  const commentsLoader = bigPictureCopy.querySelector('.comments-loader');

  shownComments = COMMENTS_SHOWN_COUNT_CURRENT;

  commentsContainer.innerHTML = '';

  addNextComments(comments, shownComments);

  commentsLoader.addEventListener('click', () => {
    addNextComments(comments, shownComments += COMMENTS_SHOWN_COUNT_CURRENT);
  });
};

export { createComments };
