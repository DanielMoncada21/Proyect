const INSCRIPCIONES_API = 'http://localhost:3000/api/inscripciones';
const formIns = document.getElementById('form-inscripcion');
const tablaIns = document.getElementById('tabla-inscripciones');

// Enviar formulario (crear o actualizar)
formIns.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = formIns.id.value;
  const data = {
    estudiante_id: formIns.estudianteId.value,
    asignatura_impartida_id: formIns.asignaturaId.value,
    n1: parseFloat(formIns.n1.value || 0),
    n2: parseFloat(formIns.n2.value || 0),
    n3: parseFloat(formIns.n3.value || 0)
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${INSCRIPCIONES_API}/${id}` : INSCRIPCIONES_API;

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    formIns.reset();
    formIns.id.value = ''; // Limpiar campo oculto
    cargarInscripciones();
  } catch (err) {
    console.error('Error al enviar el formulario:', err);
  }
});

// Cargar y mostrar inscripciones en la tabla
async function cargarInscripciones() {
  try {
    const res = await fetch(INSCRIPCIONES_API);
    const inscripciones = await res.json();
    tablaIns.innerHTML = '';

    inscripciones.forEach(i => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${i.estudiante_id}</td>
        <td>${i.Estudiante?.nombre || 'sin información'}</td>
        <td>${i.asignatura_impartida_id}</td>
        <td><input type="number" value="${i.n1}" step="0.1" onchange="actualizarNota(${i.id}, 'n1', this.value)"></td>
        <td><input type="number" value="${i.n2}" step="0.1" onchange="actualizarNota(${i.id}, 'n2', this.value)"></td>
        <td><input type="number" value="${i.n3}" step="0.1" onchange="actualizarNota(${i.id}, 'n3', this.value)"></td>
        <td>
          <button onclick="editarInscripcion(${i.id})">Editar</button>
          <button onclick="eliminarInscripcion(${i.id})">Eliminar</button>
        </td>
      `;
      tablaIns.appendChild(fila);
    });
  } catch (err) {
    console.error('Error al cargar inscripciones:', err);
  }
}

// Actualizar una nota individual
async function actualizarNota(id, campo, valor) {
  try {
    const res = await fetch(`${INSCRIPCIONES_API}/${id}`);
    if (!res.ok) throw new Error('No se encontró la inscripción');

    const inscripcion = await res.json();
    inscripcion[campo] = parseFloat(valor);

    await fetch(`${INSCRIPCIONES_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inscripcion)
    });
  } catch (err) {
    console.error(`Error al actualizar ${campo}:`, err);
  }
}

// Eliminar inscripción
async function eliminarInscripcion(id) {
  if (!confirm('¿Seguro que deseas eliminar esta inscripción?')) return;

  try {
    await fetch(`${INSCRIPCIONES_API}/${id}`, { method: 'DELETE' });
    cargarInscripciones();
  } catch (err) {
    console.error('Error al eliminar inscripción:', err);
  }
}

// Cargar inscripción en el formulario para editar
async function editarInscripcion(id) {
  try {
    const res = await fetch(`${INSCRIPCIONES_API}/${id}`);
    if (!res.ok) throw new Error('Error al obtener inscripción');

    const inscripcion = await res.json();

    formIns.id.value = inscripcion.id;
    formIns.estudianteId.value = inscripcion.estudiante_id;
    formIns.asignaturaId.value = inscripcion.asignatura_impartida_id;
    formIns.n1.value = inscripcion.n1;
    formIns.n2.value = inscripcion.n2;
    formIns.n3.value = inscripcion.n3;
  } catch (err) {
    console.error('Error al cargar inscripción para edición:', err);
    alert('No se pudo cargar la inscripción para edición.');
  }
}

cargarInscripciones();
