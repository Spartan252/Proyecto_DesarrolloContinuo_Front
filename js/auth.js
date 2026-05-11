async function register() {
  const nombre = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  // --- Validaciones ---
  if (!nombre) {
    alert('El nombre no puede estar vacío.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor ingresa un correo electrónico válido.');
    return;
  }

  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.');
    return;
  }

  // --- Registro ---
  const res = await fetch(`${CONFIG.BACKEND_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || 'Error al registrar usuario');
    return;
  }

  // --- Login automático ---
  const res_login = await fetch(`${CONFIG.BACKEND_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data_login = await res_login.json();

  if (data_login.token) {
    localStorage.setItem('token', data_login.token);
    window.location.href = 'home.html';
  } else {
    alert(data_login.message || 'Error al iniciar sesión después del registro');
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  // --- Validaciones ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor ingresa un correo electrónico válido.');
    return;
  }

  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.');
    return;
  }

  // --- Login ---
  const res = await fetch(`${CONFIG.BACKEND_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = 'home.html';
  } else {
    alert(data.message || 'Error al iniciar sesión');
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}
