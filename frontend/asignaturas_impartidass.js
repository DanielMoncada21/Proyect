const API_URL = 'http://localhost:3000/api/asignaturas_impartidas';

const form = document.getElementById('form-asig-imp');
const tabla = document.getElementById('tabla-asig-imp');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = form.id.value;
  const data = {
    profesor_id: form.profesorId.value,
    asignaturas_id: form.asignaturaId.value,
    grupo: form.grupo.value,
    horario: form.horario.value
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
  cargar();
});

async function cargar() {
  const res = await fetch(API_URL);
  const registros = await res.json();
  tabla.innerHTML = '';

  registros.forEach(r => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${r.id}</td>
      <td>${r.profesor_id}</td>
      <td>${r.asignaturas_id}</td>
      <td>${r.grupo}</td>
      <td>${r.horario}</td>
      <td>
        <button onclick='editar(${JSON.stringify(r)})'>Editar</button>
        <button onclick='eliminar(${r.id})'>Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function editar(r) {
  form.id.value = r.id;
  form.profesorId.value = r.profesor_id;
  form.asignaturaId.value = r.asignaturas_id;
  form.grupo.value = r.grupo;
  form.horario.value = r.horario;
}

async function eliminar(id) {
  if (confirm('¿Deseas eliminar este registro?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargar();
  }
}
cargar();
