console.log("Hello This is my Movie Search App");

const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=32c0cf4441f1b3199ca9ebb902da6b47&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=32c0cf4441f1b3199ca9ebb902da6b47&query=';

const main = document.querySelector("#section");
const form = document.querySelector( "form" );
const search = document.querySelector( "#query" );

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url)
      .then(res => res.json())
      .then(function (data) {
          console.log(data.results);
          data.results.forEach(element => {
              const div_card = document.createElement('div');
              div_card.setAttribute('class', 'card');

              const div_row = document.createElement('div');
              div_row.setAttribute('class', 'row');

              const div_column = document.createElement('div');
              div_column.setAttribute('class', 'column');

              const image = document.createElement('img');
              image.setAttribute('class', 'thumbnail');

              // Assign a unique ID for each image
              image.setAttribute('id', `image-${element.id}`);

              const title = document.createElement('h3');
              title.setAttribute('class', 'title');

              const center = document.createElement('center');

              title.innerHTML = `${element.title}`;
              image.src = IMG_PATH + element.poster_path;

              center.appendChild(image);
              div_card.appendChild(center);
              div_card.appendChild(title);
              div_column.appendChild(div_card);
              div_row.appendChild(div_column);

              main.appendChild(div_row);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value.trim(); // Trim whitespace from the search query

  if (searchItem) {
      returnMovies(SEARCHAPI + searchItem);
      search.value = "";
  }
});
