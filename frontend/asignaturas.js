const API_URL = 'http://localhost:3000/api/asignaturas';

const form = document.getElementById('form-asignatura');
const tabla = document.getElementById('tabla-asignaturas');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = form.id.value;
  const data = {
    nombre: form.nombre.value,
    codigo: form.codigo.value,
    creditos: form.creditos.value
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
  loadAsignaturas();
});

async function loadAsignaturas() {
  const res = await fetch(API_URL);
  const asignaturas = await res.json();
  tabla.innerHTML = '';

  asignaturas.forEach(asig => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${asig.id}</td>
      <td>${asig.nombre}</td>
      <td>${asig.codigo}</td>
      <td>${asig.creditos}</td>
      <td>
        <button onclick='editar(${JSON.stringify(asig)})'>Editar</button>
        <button onclick='eliminar(${asig.id})'>Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function editar(asig) {
  form.id.value = asig.id;
  form.nombre.value = asig.nombre;
  form.codigo.value = asig.codigo;
  form.creditos.value = asig.creditos;
}

async function eliminar(id) {
  if (confirm('¿Deseas eliminar esta asignatura?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadAsignaturas();
  }
}

loadAsignaturas();
