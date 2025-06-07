// Cambia la URL si tu backend está en otro puerto o dominio
const API = "http://localhost:3000/api";

// --------- ESTUDIANTES ---------
document.getElementById("inscripcionForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    estudiante_id: document.getElementById("estudianteId").value,
    asignatura_impartida_id: document.getElementById("asignaturaId").value,
    n1: document.getElementById("nota1").value,
    n2: document.getElementById("nota2").value,
    n3: document.getElementById("nota3").value,
  };

  fetch("http://localhost:3000/api/inscripciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Inscripción registrada correctamente.");
        document.getElementById("inscripcionForm").reset();
      } else {
        alert("Error al registrar la inscripción.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error de conexión con el servidor.");
    });
});
