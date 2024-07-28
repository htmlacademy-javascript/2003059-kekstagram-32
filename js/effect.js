const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};


const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const uploadElement = document.querySelector('.img-upload');
//modalElement
const uploadPreview = uploadElement.querySelector('.img-upload__preview').querySelector('img');
//imageElement
const effects = uploadElement.querySelector('.effects');
//effectsElement
const effectLevelContainer = uploadElement.querySelector('.img-upload__effect-level');
//sliderContainerElement
const effectLevelSlider = uploadElement.querySelector('.effect-level__slider');
//sliderElement
const effectLevelValue = uploadElement.querySelector('.effect-level__value');
//effectLevelElement

let currentEffect = Effect.DEFAULT;

const isDefault = () => currentEffect === Effect.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    uploadPreview.style.filter = null;
    return;
  }

  const { value } = effectLevelValue;
  const { style, unit } = effectToFilter[currentEffect];
  uploadPreview.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  effectLevelContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevelContainer.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({min, max, step}) => {
  noUiSlider.create(effectLevelSlider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[currentEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  currentEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[currentEffect]);
  effects.addEventListener('change', onEffectChange);
};

export { init, reset };
