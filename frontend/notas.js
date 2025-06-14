const API_URL = 'http://localhost:3000/api/';

async function buscarNotas() {
  const asignaturaId = document.getElementById('asignaturaId').value;
  const grupo = document.getElementById('grupo').value;
  const contenedor = document.getElementById('resultadoNotas');
  contenedor.innerHTML = '';

  if (!asignaturaId || !grupo) {
    contenedor.innerHTML = 'Por favor ingresa el ID de asignatura y grupo.';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/asignaturas/${asignaturaId}/grupo/${grupo}/estudiantes`);
    const data = await res.json();

    if (!data.estudiantes || data.estudiantes.length === 0) {
      contenedor.innerHTML = 'No se encontraron estudiantes para esta asignatura y grupo.';
      return;
    }

    let tabla = `
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.estudiantes.forEach(est => {
      tabla += `
        <tr>
          <td>${est.nombre}</td>
          <td>${est.correo}</td>
          <td>${est.nota}</td>
        </tr>
      `;
    });

    tabla += '</tbody></table>';
    contenedor.innerHTML = tabla;

  } catch (error) {
    console.error('Error al consultar las notas:', error);
    contenedor.innerHTML = 'Error al obtener los datos.';
  }
}
