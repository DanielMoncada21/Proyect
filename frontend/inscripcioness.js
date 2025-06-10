const INSCRIPCIONES_API = 'http://localhost:3000/api/inscripciones';
const formIns = document.getElementById('form-inscripcion');
const tablaIns = document.getElementById('tabla-inscripciones');

formIns.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    estudianteId: formIns.estudianteId.value,
    asignaturaId: formIns.asignaturaId.value,
    profesorId: formIns.profesorId.value,
    grupo: formIns.grupo.value,
    n1: parseFloat(formIns.n1.value || 0),
    n2: parseFloat(formIns.n2.value || 0),
    n3: parseFloat(formIns.n3.value || 0)
  };

  await fetch(INSCRIPCIONES_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  formIns.reset();
  cargarInscripciones();
});

async function cargarInscripciones() {
  const res = await fetch(INSCRIPCIONES_API);
  const inscripciones = await res.json();
  tablaIns.innerHTML = '';

  inscripciones.forEach(i => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${i.estudianteId}</td>
      <td>${i.asignaturaId}</td>
      <td>${i.profesorId}</td>
      <td>${i.grupo}</td>
      <td><input type="number" value="${i.n1}" step="0.1" onchange="actualizarNota('${i.id}', 'n1', this.value)"></td>
      <td><input type="number" value="${i.n2}" step="0.1" onchange="actualizarNota('${i.id}', 'n2', this.value)"></td>
      <td><input type="number" value="${i.n3}" step="0.1" onchange="actualizarNota('${i.id}', 'n3', this.value)"></td>
      <td></td>
    `;
    tablaIns.appendChild(fila);
  });
}

async function actualizarNota(id, corte, valor) {
  const res = await fetch(`${INSCRIPCIONES_API}/${id}`);
  const actual = await res.json();
  actual[corte] = parseFloat(valor);
  await fetch(`${INSCRIPCIONES_API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actual)
  });
}

cargarInscripciones();
