const db = require('../db');

async function getAllAsignaturasImpartidas() {
  const [rows] = await db.query('SELECT * FROM asignaturas_impartidas');
  return rows;
}

async function createAsignaturaImpartida(data) {
  // Solo toma las propiedades válidas
  const asignatura = {
    profesor_id: data.profesor_id,
    asignaturas_id: data.asignaturas_id,
    grupo: data.grupo,
    horario: data.horario
  };
  const [result] = await db.execute(
    'INSERT INTO asignaturas_impartidas SET ?',
    [asignatura]
  );
  return result.insertId;
}

module.exports = {
  getAllAsignaturasImpartidas,
  createAsignaturaImpartida
};