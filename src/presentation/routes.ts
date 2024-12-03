import { Router } from "express";
import {UsuarioRoutes, SuscripcionRoutes, PagoRoutes} from "./todos/routes";


export class AppRoutes{
    static  routes(): Router{
    
        const router = Router();

        router.use('/usuario', UsuarioRoutes.routes());
        router.use('/suscripciones', SuscripcionRoutes.routes());
        router.use('/pago', PagoRoutes.routes());

        
        return router;
    }

}