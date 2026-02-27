import { axiosInstance } from '../../services/axiosInstance.js';
import { validationError } from '../../utils/errors.js';
import imdbExtract from './imdbdata.js';

export default async function imdbHandler() {
  const exist = false;
  if (!exist) {
    const result = await axiosInstance('/imdb');
    if (!result.success) {
      throw new validationError(result.message);
    }
    const response = imdbExtract(result.data);
    return response;
  } else {
    const homePageData = await redis.get('/');
    if (homePageData) {
      return homePageData;
    }
    const result = await axiosInstance('/');
    if (!result.success) {
      throw new validationError(result.message);
    }
    const response = imdbExtract(result.data);
    await redis.set('/', JSON.stringify(response), {
      ex: 60 * 60 * 24,
    });
    return response;
  }
}
