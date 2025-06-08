// Cambia la URL si tu backend está en otro puerto o dominio
const API = "http://localhost:3000/api";

// ----------- ESTUDIANTES -----------
const formEst = document.getElementById('form-estudiante');
const listaEst = document.getElementById('lista-estudiantes');

formEst.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    await fetch(`${API}/estudiantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, edad })
    });
    formEst.reset();
    cargarEstudiantes();
});

async function cargarEstudiantes() {
    listaEst.innerHTML = '';
    const res = await fetch(`${API}/estudiantes`);
    const estudiantes = await res.json();
    estudiantes.forEach(est => {
        const li = document.createElement('li');
        li.textContent = `${est.nombre} ${est.apellido} (${est.edad} años)`;
        listaEst.appendChild(li);
    });
}
cargarEstudiantes();

// ----------- ASIGNATURAS -----------
const formAsig = document.getElementById('form-asignatura');
const listaAsig = document.getElementById('lista-asignaturas');

formAsig.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre-asig').value;
    const creditos = document.getElementById('creditos').value;
    await fetch(`${API}/asignaturas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, creditos })
    });
    formAsig.reset();
    cargarAsignaturas();
});

async function cargarAsignaturas() {
    listaAsig.innerHTML = '';
    const res = await fetch(`${API}/asignaturas`);
    const asignaturas = await res.json();
    asignaturas.forEach(asig => {
        const li = document.createElement('li');
        li.textContent = `${asig.nombre} (${asig.creditos} créditos)`;
        listaAsig.appendChild(li);
    });
}
cargarAsignaturas();

// ----------- PROFESORES -----------
const formProf = document.getElementById('form-profesor');
const listaProf = document.getElementById('lista-profesores');

formProf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre-prof').value;
    const apellido = document.getElementById('apellido-prof').value;
    await fetch(`${API}/profesores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido })
    });
    formProf.reset();
    cargarProfesores();
});

async function cargarProfesores() {
    listaProf.innerHTML = '';
    const res = await fetch(`${API}/profesores`);
    const profesores = await res.json();
    profesores.forEach(prof => {
        const li = document.createElement('li');
        li.textContent = `${prof.nombre} ${prof.apellido}`;
        listaProf.appendChild(li);
    });
}
cargarProfesores();