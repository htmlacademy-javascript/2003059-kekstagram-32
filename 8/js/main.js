import { getPictures } from './data.js';
import { createThumbnails } from './thumbnail.js';
import './form.js';

createThumbnails(getPictures());
