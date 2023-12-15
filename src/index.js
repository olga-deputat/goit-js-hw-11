import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

import { PhotoAPI } from './js/api';
import { photoTemplate } from './js/template';

const Form = document.querySelector(".js-search-form");
const loadMore = document.querySelector(".js-load-more");
const galleryList = document.querySelector(".gallery");



const photoAPI = new PhotoAPI();

async function searchFotos(e) {
    e.preventDefault();
    photoAPI.page = 1;
    const query = e.target.elements.searchQuery.value;
    photoAPI.searchQuery = query;
    if (photoAPI.searchQuery === '') {
        clearPhotos();
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
    photoAPI
        .getPhotos()
        .then(data => {
            clearPhotos();
            const photoArray = data.hits;
            const totalHits = data.totalHits;
            galleryList.insertAdjacentHTML(
                'beforeend',
                photoTemplate(photoArray)
            );
            if (photoArray.length > 1) {
                Notify.success(`Hooray! We found ${totalHits} images`);
            }
            if (photoAPI.getPage() < Math.ceil(totalHits / 40)) {
                loadMore.classList.remove('is-hidden');
            }
        })
        .catch(error => {
            Notify.failure(error.message)
            loadMore.classList.add('is-hidden')
        })
};
Form.addEventListener("submit", searchFotos);
function clearPhotos() {
    galleryList.innerHTML = '';
    loadMore.classList.add('is-hidden')
}

loadMore.addEventListener("click", onloadMore);

function onloadMore(e) {
    photoAPI.incrementPage();
    photoAPI
        .getPhotos()
        .then(data => {
            const photoArray = data.hits;
            const markup = photoTemplate(photoArray);
            galleryList.insertAdjacentHTML('beforeend', markup);
            const totalHits = data.totalHits;
            if (photoAPI.getPage() === Math.ceil(totalHits / 40)) {
                loadMore.classList.add('is-hidden');
                Notify.warning('We are sorry, but you have reached the end of search result.');
            }
        })
        .catch(error => {
            Notify.failure(error.message);
            loadMore.classList.add('is-hidden');
        })
}