async function loadRentedMovies() {
  const rents = await apiRequest('/api/rents');
  const container = document.getElementById('rented-list');
  container.innerHTML = rents.map(r => `
    <div class="card">
      <img src="${r.portada_url}" alt="${r.titulo}">
      <h3>${r.titulo}</h3>
      <p>Rentada el: ${new Date(r.fecha_renta).toLocaleDateString()}</p>
      <button onclick="returnMovie(${r.id})">Devolver</button>
    </div>
  `).join('');
}

async function returnMovie(id) {
  const res = await apiRequest(`/api/rents/${id}`, 'DELETE');
  alert(res.message);
  loadRentedMovies();
}
