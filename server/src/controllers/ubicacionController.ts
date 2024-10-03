import { Request, Response } from 'express';
import pool from '../database';

class UbicacionController {
  public async guardarUbicacion(req: Request, res: Response): Promise<void> {
    const { idUsuario, latitud, longitud, fechaRegistro } = req.body;
    if (!idUsuario || !latitud || !longitud || !fechaRegistro) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' }); // Aquí estamos devolviendo una respuesta
      return; // Importante retornar después de enviar la respuesta
    }
    try {
      await pool.query('INSERT INTO Ubicacion (IdUsuario, Latitud, Longitud, FechaRegistro) VALUES (?, ?, ?, ?)', [idUsuario, latitud, longitud, fechaRegistro]);
      res.json({ message: 'Ubicación almacenada correctamente' }); // Aquí estamos devolviendo una respuesta
    } catch (error) {
      console.error('Error al insertar ubicación:', error);
      res.status(500).send('Error al almacenar la ubicación'); // Aquí estamos devolviendo una respuesta
    }
  }

  public async obtenerHistorialUbicacion(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.params;
    try {
      const historial = await pool.query('SELECT * FROM Ubicacion WHERE IdUsuario = ?', [idUsuario]);
      res.json(historial); // Aquí estamos devolviendo una respuesta
    } catch (error) {
      console.error('Error al obtener historial de ubicaciones:', error);
      res.status(500).send('Error al obtener historial de ubicaciones'); // Aquí estamos devolviendo una respuesta
    }
  }
}

export const ubicacionController = new UbicacionController();
