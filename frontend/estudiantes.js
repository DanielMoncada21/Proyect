const API_URL = 'http://localhost:3000/api/estudiantes';

const form = document.getElementById('form-estudiante');
const tabla = document.getElementById('tabla-estudiantes');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = form.id.value;
  const data = {
    nombre: form.nombre.value,
    correo: form.correo.value
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  form.reset();
  loadEstudiantes();
});

async function loadEstudiantes() {
  const res = await fetch(API_URL);
  const estudiantes = await res.json();
  tabla.innerHTML = '';

  estudiantes.forEach(est => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${est.id}</td>
      <td>${est.nombre}</td>
      <td>${est.correo}</td>
      <td>
        <button onclick='editar(${JSON.stringify(est)})'>Editar</button>
        <button onclick='eliminar(${est.id})'>Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function editar(est) {
  form.id.value = est.id;
  form.nombre.value = est.nombre;
  form.correo.value = est.correo;
}

async function eliminar(id) {
  if (confirm('¿Deseas eliminar este estudiante?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadEstudiantes();
  }
}

loadEstudiantes();
