const main = document.getElementById('main');
const searchForm = document.getElementById('form');
const searchInput = document.getElementById('searchinout'); 

let name;

fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=8")
    .then((data) => {
        return data.json();
    })
    .then((dataJson) => {
        name = dataJson.results;


        const fragment = document.createDocumentFragment();

        name.forEach((element) => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
            img.alt = element.title;

            const title = document.createElement('h3');
            title.textContent = element.title;

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${element.release_date}`;

            cardDiv.appendChild(img);
            cardDiv.appendChild(title);
            cardDiv.appendChild(releaseDate);
            fragment.appendChild(cardDiv);
        });

        main.appendChild(fragment);
        
    })
    .catch((error) => {
        console.log(error);
    });


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;

    if (searchTerm && searchTerm.trim() !== '') {
        const filteredMovies = name.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const fragment = document.createDocumentFragment();

        filteredMovies.forEach((element) => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
            img.alt = element.title;

            const title = document.createElement('h3');
            title.textContent = element.title;

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${element.release_date}`;

            cardDiv.appendChild(img);
            cardDiv.appendChild(title);
            cardDiv.appendChild(releaseDate);

            fragment.appendChild(cardDiv);
        });


        main.innerHTML = '';
        main.appendChild(fragment);
    } else {
        const fragment = document.createDocumentFragment();

        name.forEach((element) => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
            img.alt = element.title;

            const title = document.createElement('h3');
            title.textContent = element.title;

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${element.release_date}`;

            cardDiv.appendChild(img);
            cardDiv.appendChild(title);
            cardDiv.appendChild(releaseDate);

            fragment.appendChild(cardDiv);
        });

        main.innerHTML = '';
        main.appendChild(fragment);
    }
});
