const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const uploadElement = document.querySelector('.img-upload');
const scaleControlSmaller = uploadElement.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadElement.querySelector('.scale__control--bigger');
const scaleControlValue = uploadElement.querySelector('.scale__control--value');
const uploadPreview = uploadElement.querySelector('.img-upload__preview').querySelector('img');

const scaleImage = (value) => {
  uploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const changeScale = (change) => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.min(Math.max(currentValue + change, SCALE_MIN), SCALE_MAX);
  scaleImage(newValue);
};

const onControlSmallerClick = () => changeScale(-SCALE_STEP);
const onControlBiggerClick = () => changeScale(SCALE_STEP);

const resetScale = () => scaleImage(SCALE_DEFAULT);

scaleControlSmaller.addEventListener('click', onControlSmallerClick);
scaleControlBigger.addEventListener('click', onControlBiggerClick);

export { resetScale };
