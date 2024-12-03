import { Router } from "express";
import {UsuarioController, SuscripcionesController, PagoController } from "./controller";

/*
export class TodoRoutes{
    
    static routes(): Router{
    
        const router = Router();
        const todosController = new TodosController();

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodoById);
        router.delete('/:id', todosController.deleteTodoById);
        
        return router;
    }
}
*/

export class UsuarioRoutes {
    public static routes(): Router {
        
        const router = Router();
        const usuarioController = new UsuarioController();

        router.get('/:id', usuarioController.getUsuarioById);
        router.post('/', usuarioController.createUsuario);
        router.put('/:id', usuarioController.updateUsuarioById);
        router.delete('/:id', usuarioController.deleteUsuarioById);

        return router;
    }  
}

export class SuscripcionRoutes {
    public static routes(): Router {
        
        const router = Router();
        const suscripcionesController = new SuscripcionesController();

        router.get('/:id', suscripcionesController.getSuscripcionById);
        router.post('/', suscripcionesController.createSuscripcion);
        router.put('/:id', suscripcionesController.updateSuscripcionById);
        router.delete('/:id', suscripcionesController.deleteSuscripcionById);

        return router;
    }  
}

export class PagoRoutes {
    public static routes(): Router {
        
        const router = Router();
        const pagoController = new PagoController();

        router.get('/:id', pagoController.getPagoById);
        router.post('/', pagoController.createPago);
        router.put('/:id', pagoController.updatePagoById);
        router.delete('/:id', pagoController.deletePagoById);

        return router;
    }  
}