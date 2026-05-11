
function getToken() {
  token = localStorage.getItem('token');
  if (token) return token
  else {
      window.location.href = 'index.html';
    return null
  }
}

async function apiRequest(path, method = 'GET', data) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  };
  if (data) options.body = JSON.stringify(data);
  const res = await fetch(`${CONFIG.BACKEND_URL}${path}`, options);
  if (res.status == 403) {
    localStorage.removeItem("token")
    window.location.href = 'index.html';
  }
  return await res.json();
}

