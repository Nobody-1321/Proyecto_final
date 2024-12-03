import { Prisma } from '@prisma/client';
import {prisma} from '../../data/postgress/prisma';
import { Request, Response } from 'express';

/*
export class TodosController {

    public getTodos(req: Request, res: Response) {
        res.json(todos);
    }

    public getTodoById(req: Request, res: Response) {
        if (isNaN(parseInt(req.params.id))) {
            res.status(400).json({ message: 'Invalid ID supplied' });
            return;
        }
        const todo = todos.find(todo => todo.id === parseInt(req.params.id));

        (todo) ? res.json(todo) : res.status(404).json({ message: 'Todo not found' });
    }

    public createTodo(req: Request, res: Response) {
        const { text } = req.body;

        if (!text) {
            res.status(400).json({ message: 'Title is required' });
            return;
        }

        prisma.user.create({
            data: { text }  
        }).then((todo) => {
            res.json(todo);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });

    }

    public updateTodoById(req: Request, res: Response) {
        if (isNaN(parseInt(req.params.id))) {
            res.status(400).json({ message: 'Invalid ID supplied' });
            return;
        }

        const todo = todos.find(todo => todo.id === parseInt(req.params.id));

        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }

        const { title } = req.body;

        if (!title) {
            res.status(400).json({ message: 'Title is required' });
            return;
        }

        todo.title = title;

        res.json(todo);
    }

    public deleteTodoById(req: Request, res: Response) {
        if (isNaN(parseInt(req.params.id))) {
            res.status(400).json({ message: 'Invalid ID supplied' });
            return;
        }

        const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));

        if (todoIndex === -1) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }

        todos.splice(todoIndex, 1);

        res.json({ message: 'Todo deleted successfully' });
    }
}
*/

export class UsuarioController{
    public getUsuarioById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        prisma.usuario.findUnique({
            where: { id_usuario: parseInt(id) }
        }).then((usuario) => {
            if (!usuario) {
                res.status(404).json({ message: 'Usuario not found' });
                return;
            }
            res.json(usuario);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public createUsuario(req: Request, res: Response) {
        const { nombre, apellido, email, telefono, direccion } = req.body;

        if (!nombre || !apellido || !email  || !telefono || !direccion) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }
        
        const {calle, numero, colonia, codigoPostal} = direccion;

        if (!calle || !numero || !colonia || !codigoPostal) {
            res.status(400).json({ message: 'Todos los campos de direccion son requeridos' });
            return;
        }

        const usuarioInput: Prisma.UsuarioCreateInput = {
            informacionPersonal: {
                create: {
                    nombres: nombre,
                    apellidos: apellido,
                    telefono,
                    email,
                    direccion: {
                        create: {
                            calle,
                            numero,
                            colonia,
                            codigoPostal
                        }
                    },
                }
            },
            fechaRegistro: new Date(),
            observaciones: 'Usuario registrado desde la API'
        }

        const usuario = prisma.usuario.create({
            data: usuarioInput
        }).then((usuario) => {
            res.json(usuario);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public updateUsuarioById(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, apellido, email, telefono, direccion } = req.body;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        if (!nombre || !apellido || !email || !telefono || !direccion) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        const {calle, numero, colonia, codigoPostal} = direccion;

        if (!calle || !numero || !colonia || !codigoPostal) {
            res.status(400).json({ message: 'Todos los campos de direccion son requeridos' });
            return;
        }

        const usuarioInput: Prisma.UsuarioUpdateInput = {
            informacionPersonal: {
                update: {
                    nombres: nombre,
                    apellidos: apellido,
                    telefono,
                    email,
                    direccion: {
                        update: {
                            calle,
                            numero,
                            colonia,
                            codigoPostal
                        }
                    },
                }
            },
            observaciones: 'Usuario actualizado desde la API'
        }

        prisma.usuario.update({
            where: { id_usuario: parseInt(id) },
            data: usuarioInput
        }).then((usuario) => {
            res.json(usuario);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public deleteUsuarioById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        prisma.usuario.delete({
            where: { id_usuario: parseInt(id) }
        }).then(() => {
            res.json({ message: 'Usuario eliminado correctamente' });
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
    });
    }
}

export class SuscripcionesController{
    public getSuscripcionById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        prisma.sucripcion.findUnique({
            where: { id_suscripcion: parseInt(id) }
        }).then((suscripcion) => {
            if (!suscripcion) {
                res.status(404).json({ message: 'Suscripcion not found' });
                return;
            }
            res.json(suscripcion);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public createSuscripcion(req: Request, res: Response) {
        const { id_usuario, id_plan, fechaInicio, fechaFin } = req.body;

        if (!id_usuario || !id_plan || !fechaInicio || !fechaFin) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        const suscripcionInput: Prisma.SucripcionCreateInput = {
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
            usuario: {
                connect: { id_usuario }
            },
        }

        prisma.sucripcion .create({
            data: suscripcionInput
        }).then((suscripcion) => {
            res.json(suscripcion);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public updateSuscripcionById(req: Request, res: Response) {
        const { id } = req.params;
        const { id_usuario, id_plan, fechaInicio, fechaFin } = req.body;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        if (!id_usuario || !id_plan || !fechaInicio || !fechaFin) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        const suscripcionInput: Prisma.SucripcionUpdateInput = {
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
            usuario: {
                connect: { id_usuario }
            },
        }

        prisma.sucripcion.update({
            where: { id_suscripcion: parseInt(id) },
            data: suscripcionInput
        }).then((suscripcion) => {
            res.json(suscripcion);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public deleteSuscripcionById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        prisma.sucripcion.delete({
            where: { id_suscripcion: parseInt(id) }
        }).then(() => {
            res.json({ message: 'Suscripcion eliminada correctamente' });
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

}

export class PagoController{
    public getPagoById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        prisma.pago.findUnique({
            where: { id_pago: parseInt(id) }
        }).then((pago) => {
            if (!pago) {
                res.status(404).json({ message: 'Pago not found' });
                return;
            }
            res.json(pago);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
    });
    }

    public createPago(req: Request, res: Response) {
        const { id_suscripcion, fechaPago, monto, observaciones } = req.body;

        if (!id_suscripcion || !fechaPago || !monto || !observaciones) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        const pagoInput: Prisma.PagoCreateInput = {
            fechaPago: new Date(fechaPago),
            monto,
            suscripcion: {
                connect: { id_suscripcion }
            },
        }

        prisma.pago.create({
            data: pagoInput
        }).then((pago) => {
            res.json(pago);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public updatePagoById(req: Request, res: Response) {
        const { id } = req.params;
        const { id_suscripcion, fechaPago, monto, observaciones } = req.body;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        if (!id_suscripcion || !fechaPago || !monto || !observaciones) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        const pagoInput: Prisma.PagoUpdateInput = {
            fechaPago: new Date(fechaPago),
            monto,
            suscripcion: {
                connect: { id_suscripcion }
            },
        }

        prisma.pago.update({
            where: { id_pago: parseInt(id) },
            data: pagoInput
        }).then((pago) => {
            res.json(pago);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }
    
    public deletePagoById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }

        prisma.pago.delete({
            where: { id_pago: parseInt(id) }
        }).then(() => {
            res.json({ message: 'Pago eliminado correctamente' });
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

}