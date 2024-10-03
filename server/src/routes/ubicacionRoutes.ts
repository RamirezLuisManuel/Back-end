import { Router } from 'express';
import { ubicacionController } from '../controllers/ubicacionController';

class UbicacionRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post('/', ubicacionController.guardarUbicacion);
    this.router.get('/historial/:idUsuario', ubicacionController.obtenerHistorialUbicacion);
  }
}

export default new UbicacionRoutes().router;
