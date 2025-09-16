exports.receiveData = async (req, res) => {
  // Recibe datos desde la extensión Qlik y responde
  const data = req.body;
  // Aquí podrías guardar en la base de datos si lo necesitas
  res.json({ mensaje: "Datos recibidos correctamente", recibido: data });
};
