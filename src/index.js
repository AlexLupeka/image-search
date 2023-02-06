import { fetchImages } from './js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let simpleLightboxGallery = new SimpleLightbox('.gallery a');

loadMoreBtn.style.display = 'none';

let page = 1;

searchBtn.addEventListener('click', onSearch);
function onSearch(evt) {
  evt.preventDefault();
  cleanGallery();
  const trimValue = input.value.trim();
  if (trimValue !== '') {
    fetchImages(trimValue, page).then(data => {
      if (data.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImageList(data);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMoreBtn.style.display = 'block';
        simpleLightboxGallery.refresh();
      }
    });
  }
}

loadMoreBtn.addEventListener('click', loadMore);
function loadMore() {
  page++;
  const trimValue = input.value.trim();
  loadMoreBtn.style.display = 'none';
  fetchImages(trimValue, page).then(data => {
    if (data.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImageList(data);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      loadMoreBtn.style.display = 'block';
    }
  });
}

function renderImageList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card photo-link">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-data"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-data">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-data">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-data">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML += markup;
}

function cleanGallery() {
  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.style.display = 'none';
}
