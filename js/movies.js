


async function loadMovies() {
  const movies = await apiRequest('/api/movies');
  const container = document.getElementById('movie-list');
  container.innerHTML = movies.map(m => `
    <div class="card" onclick="viewMovie(${m.id})">
      <img src="${m.portada_url}" alt="${m.titulo}">
      <h3>${m.titulo}</h3>
    </div>
  `).join('');
}

function viewMovie(id) {
  localStorage.setItem('movieId', id);
  window.location.href = 'movie.html';
}

async function loadMovieDetail() {
  const id = localStorage.getItem('movieId');
  const movie = await apiRequest(`/api/movies/${id}`);
  const container = document.getElementById('movie-detail');
  container.innerHTML = `
    <h2>${movie.titulo}</h2>
    <img src="${movie.portada_url}" alt="${movie.titulo}" width="300">
    <p>${movie.descripcion}</p>
    <button onclick="rentMovie(${movie.id})">Rentar</button>
  `;
}

async function rentMovie(movieId) {
  const res = await apiRequest('/api/rents', 'POST', { movieId });
  console.log(res)
  if (res.message == "Película rentada correctamente"){
    window.location.href = 'rentadas.html';
  }else{
    alert(res.message);
  }
}
