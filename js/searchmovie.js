const main = document.getElementById('main');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const section = document.getElementById('section');
let name;

const pageNumbers = [17,14,8,2,18,6,9,17,7,8];




const fetchData = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`);
    const data = await response.json();
    return data;
};
const handleSave = (movie) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
 
    const isSaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);
    if (isSaved) {
        const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie.id !== movie.id);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    } else {
   
        savedMovies.push(movie);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }

    fetchDataForAllPages();
};

const createCard = (movie) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Nashr sanasi: ${movie.release_date}`;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Saqlash';
    saveButton.addEventListener('click', () => handleSave(movie));

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(releaseDate);
    card.appendChild(overview);
    card.appendChild(saveButton);

    return card;
};

const displayMovies = (movies) => {
    const main = document.getElementById('main');
    main.innerHTML = ''; 
    movies.forEach(movie => {
        const card = createCard(movie);
        main.appendChild(card);
    });
};

const fetchDataForAllPages = async () => {
    const results = await Promise.all(pageNumbers.map(page => fetchData(page)));
    const allMovies = results.flatMap(result => result.results);
    displayMovies(allMovies);
};

fetchDataForAllPages();
searchForm.addEventListener('input', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    
    if (searchTerm && searchTerm.trim() !== '') {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchTerm}`);
        const data = await response.json();
        displayMovies(data.results);
    } else {
        fetchDataForAllPages();
    }
});
 

