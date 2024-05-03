import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { linksAPIObj } from './js/linksAPI.js';

const select = new SlimSelect({
  select: '#single',
  settings: {
    showSearch: false,
  },
});

renderCats();
linksAPIObj.refs.breedSelectEl.addEventListener('change', renderDescriptionCat);

function renderCats() {
  fetchBreeds()
    .then(data => {
      const cats = data.map(({ id, name }) => {
        return { text: name, value: id };
      });

      select.setData([...cats]);

      linksAPIObj.addBreedSelect();
      linksAPIObj.removeLoader();
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      linksAPIObj.removeLoader();
    });
}
function renderDescriptionCat(e) {
  linksAPIObj.refs.catInfoEl.innerHTML = '';

  fetchCatByBreed(e.currentTarget.value)
    .then(data => {
      const { url, breeds } = data;
      const { name, description, temperament } = breeds[0];

      linksAPIObj.refs.catInfoEl.innerHTML = `<img src="${url}" alt="" class="cat-info__img" width="40%"/>
      <div class="cat-info__meta">
        <h1 class="cat-info__title">${name}</h1>
        <p class="cat-info__description">${description}</p>
        <p class="cat-info__temperament">${temperament}</p>
      </div>`;

      linksAPIObj.removeLoader();
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      linksAPIObj.removeBreedSelect;
    });
}