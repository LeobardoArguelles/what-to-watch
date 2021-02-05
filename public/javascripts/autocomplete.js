const search = document.getElementById('input');


// Search movies.json and filter it
const searchMovies = async searchText => {
  const res = await fetch('../../files/movies.json');
  const movies = await res.json();

  // Get matches for current text input
  console.log(search.value);
}

search.addEventListener('input', () => searchMovies(search.value));