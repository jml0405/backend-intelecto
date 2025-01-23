const express = require('express');
const router = express.Router();
const libroController = require('../controllers/bookController');

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener todos los libros
 *     description: Devuelve una lista de todos los libros registrados.
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Titulo:
 *                     type: string
 *                   Autor:
 *                     type: string
 *                   Editorial:
 *                     type: string
 *                   ISBN:
 *                     type: string
 *                   Paginas:
 *                     type: integer
 *                   Fecha_Publ:
 *                     type: string
 *                   Idioma:
 *                     type: string
 *                   Rating:
 *                     type: number
 *                   Portada:
 *                     type: string
 */
router.get('/libros', libroController.getLibros); // Obtener todos los libros

/**
 * @swagger
 * /api/libros:
 *   post:
 *     summary: Crear un nuevo libro
 *     description: Crea un nuevo libro en la base de datos con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Titulo:
 *                 type: string
 *               Autor:
 *                 type: string
 *               Editorial:
 *                 type: string
 *               ISBN:
 *                 type: string
 *               Paginas:
 *                 type: integer
 *               Fecha_Publ:
 *                 type: string
 *               Idioma:
 *                 type: string
 *               Rating:
 *                 type: number
 *               Portada:
 *                 type: string
 *     responses:
 *       201:
 *         description: Libro creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bookId:
 *                   type: string
 */
router.post('/libros', libroController.createLibro); // Crear un nuevo libro

/**
 * @swagger
 * /api/libros/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     description: Obtiene los datos de un libro por su ID, incluyendo sus géneros relacionados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 Titulo:
 *                   type: string
 *                 Autor:
 *                   type: string
 *                 Editorial:
 *                   type: string
 *                 ISBN:
 *                   type: string
 *                 Paginas:
 *                   type: integer
 *                 Fecha_Publ:
 *                   type: string
 *                 Idioma:
 *                   type: string
 *                 Rating:
 *                   type: number
 *                 Portada:
 *                   type: string
 *                 generos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de géneros asociados al libro.
 */
router.get('/libros/:id', libroController.getLibroById); // Obtener un libro por ID

/**
 * @swagger
 * /api/libros/{id}:
 *   put:
 *     summary: Actualizar un libro por ID
 *     description: Actualiza los datos de un libro en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Titulo:
 *                 type: string
 *               Autor:
 *                 type: string
 *               Editorial:
 *                 type: string
 *               ISBN:
 *                 type: string
 *               Paginas:
 *                 type: integer
 *               Fecha_Publ:
 *                 type: string
 *               Idioma:
 *                 type: string
 *               Rating:
 *                 type: number
 *               Portada:
 *                 type: string
 *     responses:
 *       200:
 *         description: Libro actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/libros/:id', libroController.updateLibro); // Actualizar un libro por ID

/**
 * @swagger
 * /api/libros/{id}:
 *   delete:
 *     summary: Eliminar un libro por ID
 *     description: Elimina un libro de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libro eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/libros/:id', libroController.deleteLibro); // Eliminar un libro por ID

/**
 * @swagger
 * /api/libros/{id}/portada:
 *   post:
 *     summary: Actualizar la portada de un libro
 *     description: Sube una nueva imagen de portada para un libro específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               portada:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Portada actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/libros/:id/portada', libroController.updatePortada); // Actualizar portada

module.exports = router;