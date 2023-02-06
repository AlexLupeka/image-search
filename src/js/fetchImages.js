const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30762289-c4fbd74d7c9928359623371dc';

export async function fetchImages(input, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${input}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`
    );
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
