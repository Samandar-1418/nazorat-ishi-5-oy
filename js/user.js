const main = document.querySelector('main');
const fragment = document.createDocumentFragment();
document.addEventListener('DOMContentLoaded', function () {
    let data = JSON.parse(localStorage.getItem('savedMovies'));
    createCards(data);
});

function createCards(data) {
  

    data.forEach((movie) => {
        let card = document.createElement('div');
        card.classList.add('div');


        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
        img.alt = movie.title;
        card.appendChild(img)

        let titleParagraph = document.createElement('p');
        titleParagraph.textContent = `Title: ${movie.title}`;
        card.appendChild(titleParagraph);

        let overviewParagraph = document.createElement('p');
        overviewParagraph.textContent = `Overview: ${movie.overview}`;
        card.appendChild(overviewParagraph);

        let releaseDateParagraph = document.createElement('p');
        releaseDateParagraph.textContent = `Release Date: ${movie.release_date}`;
        card.appendChild(releaseDateParagraph);

        let popularityParagraph = document.createElement('p');
        popularityParagraph.textContent = `Popularity: ${movie.popularity}`;
        card.appendChild(popularityParagraph);

        fragment.appendChild(card);
    });

    main.appendChild(fragment);
}
