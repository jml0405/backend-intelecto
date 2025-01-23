const Rating = require("../models/ratingModel");

// Obtener todas las reseñas
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("ID_Libro").populate("ID_Usuario");
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva reseña
exports.createRating = async (req, res) => {
  const { ID_Libro, ID_Usuario, Puntaje, Comentario } = req.body;

  try {
    const nuevoRating = new Rating({ ID_Libro, ID_Usuario, Puntaje, Comentario });
    const ratingGuardado = await nuevoRating.save();
    res.status(201).json({ message: "Rating creado correctamente", ratingId: ratingGuardado._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener reseñas por ID de libro
exports.getRatingsByLibro = async (req, res) => {
  try {
    const ratings = await Rating.find({ ID_Libro: req.params.idLibro })
      .populate("ID_Libro")
      .populate("ID_Usuario");
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una reseña por ID
exports.getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id).populate("ID_Libro").populate("ID_Usuario");
    if (!rating) return res.status(404).json({ error: "Rating no encontrado" });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una reseña por ID
exports.updateRating = async (req, res) => {
  try {
    const ratingActualizado = await Rating.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("ID_Libro").populate("ID_Usuario");
    if (!ratingActualizado) return res.status(404).json({ error: "Rating no encontrado" });
    res.status(200).json({ message: "Rating actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una reseña por ID
exports.deleteRating = async (req, res) => {
  try {
    const ratingEliminado = await Rating.findByIdAndDelete(req.params.id);
    if (!ratingEliminado) return res.status(404).json({ error: "Rating no encontrado" });
    res.status(200).json({ message: "Rating eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};