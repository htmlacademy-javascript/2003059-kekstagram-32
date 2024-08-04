import { createThumbnails } from './thumbnail.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { setOnFormSubmit, closeModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { initFilter, getFilteredPictures } from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedCreateThumbnails = debounce(createThumbnails);
  initFilter(data, debouncedCreateThumbnails);
  createThumbnails(getFilteredPictures());
} catch {
  showAlert();
}
