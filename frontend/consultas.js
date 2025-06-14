const API_URL = 'http://localhost:3000/api';

async function buscarAsignaturasPorProfesor() {
  const id = document.getElementById('profesorId').value;
  const contenedor = document.getElementById('resultadoAsignaturas');
  contenedor.innerHTML = '';

  try {
    const res = await fetch(`${API_URL}/profesores/${id}/asignaturas`);
    const data = await res.json();

    if (!data.AsignaturasImpartidas || data.AsignaturasImpartidas.length === 0) {
      contenedor.innerHTML = 'Este profesor no dicta asignaturas.';
      return;
    }

    const lista = data.AsignaturasImpartidas.map(a =>
      `<li>${a.Asignatura.nombre} (${a.Asignatura.creditos} créditos) - Grupo: ${a.grupo}, Horario: ${a.horario}</li>`
    ).join('');

    contenedor.innerHTML = `<ul>${lista}</ul>`;
  } catch (error) {
    contenedor.innerHTML = 'Error al obtener asignaturas.';
    console.error(error);
  }
}

async function buscarProfesoresPorAsignatura() {
  const id = document.getElementById('asignaturaId').value;
  const contenedor = document.getElementById('resultadoProfesores');
  contenedor.innerHTML = '';

  try {
    const res = await fetch(`${API_URL}/asignaturas/${id}/profesores`);
    const data = await res.json();

    if (!data.AsignaturasImpartidas || data.AsignaturasImpartidas.length === 0) {
      contenedor.innerHTML = 'No hay profesores que dicten esta asignatura.';
      return;
    }

    const lista = data.AsignaturasImpartidas.map(p =>
      `<li>${p.Profesore.nombre} - Correo: ${p.Profesore.correo} - Grupo: ${p.grupo}, Horario: ${p.horario}</li>`
    ).join('');

    contenedor.innerHTML = `<ul>${lista}</ul>`;
  } catch (error) {
    contenedor.innerHTML = 'Error al obtener profesores.';
    console.error(error);
  }
}
