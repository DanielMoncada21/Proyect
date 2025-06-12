const API_URL = 'http://localhost:3000/api/profesores';

const form = document.getElementById('form-profesor');
const tabla = document.getElementById('tabla-profesores');

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
  loadProfesores();
});

async function loadProfesores() {
  const res = await fetch(API_URL);
  const profesores = await res.json();
  tabla.innerHTML = '';

  profesores.forEach(prof => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${prof.id}</td>
      <td>${prof.nombre}</td>
      <td>${prof.correo}</td>
      <td>
        <button onclick='editar(${JSON.stringify(prof)})'>Editar</button>
        <button onclick='eliminar(${prof.id})'>Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function editar(prof) {
  form.id.value = prof.id;
  form.nombre.value = prof.nombre;
  form.correo.value = prof.correo;
}

async function eliminar(id) {
  if (confirm('¿Deseas eliminar este profesor?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadProfesores();
  }
}

loadProfesores();
