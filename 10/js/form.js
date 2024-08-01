import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect, initEffect } from './effect.js';

const HASHTAG_MAX_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Разрешено не более ${HASHTAG_MAX_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштег должен быть уникальным',
  INVALID_PATTERN: 'Некорректный хэштег',
};
const UploadButtonText = {
  DEFAULT: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const uploadFileField = uploadForm.querySelector('.img-upload__input');
const uploadHashtagField = uploadForm.querySelector('.text__hashtags');
const uploadCommentField = uploadForm.querySelector('.text__description');
const uploadButton = uploadForm.querySelector('img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const closeModal = () => {
  uploadForm.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const toggleUploadButton = (isDisabled) => {
  uploadButton.disabled = isDisabled;
  uploadButton.textContent = isDisabled ? UploadButtonText.SUBMITTING : UploadButtonText.DEFAULT;
};

const isTextFieldFocused = () => document.activeElement === uploadHashtagField || document.activeElement === uploadCommentField;

const normalizeHashtags = (hashtags) => hashtags.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const hasValidHashtags = (value) => normalizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const hasValidCount = (value) => normalizeHashtags(value).length <= HASHTAG_MAX_COUNT;

const hasUniqueHashtags = (value) => {
  const lowerCaseHashtags = normalizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

function onDocumentEscKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown) {
    evt.preventDefault();
    closeModal();
  }
}

const onCancelButtonClick = () => {
  closeModal();
};

const onFileInputChange = () => {
  openModal();
};

const setOnFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleUploadButton(true);
      await callback(new FormData(uploadForm));
      toggleUploadButton();
    }
  });
};

pristine.addValidator(
  uploadHashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  uploadHashtagField,
  hasValidHashtags,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

pristine.addValidator(
  uploadHashtagField,
  hasUniqueHashtags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);

uploadFileField.addEventListener('change', onFileInputChange);
uploadCancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', setOnFormSubmit);
initEffect();

export { setOnFormSubmit, closeModal };
