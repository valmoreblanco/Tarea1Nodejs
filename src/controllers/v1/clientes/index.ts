import { PrismaClient,Prisma } from '@prisma/client';
import { constants } from 'buffer';
import {Request, Response} from 'express';

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const getClientes = async (req:Request,res:Response) => {
    try {
        const result = await prisma.clientes.findMany();
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const getCliente = async (req:Request,res:Response) => {
    const{id} = req.params;
    try {
        const result = await prisma.clientes.findUnique({
            where: {id:parseInt(id)}  
        });
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const postCliente = async (req:Request,res:Response) => {
    // req.body.fecha_actualizacion = new Date(); Se reemplaza esto por el middleware
    try {
        const result = await prisma.clientes.create({data:req.body});
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}
 
const putCliente = async (req:Request,res:Response) => {
    const {id} = req.params;
    const {body} = req;
    try {
        const result = await prisma.clientes.update({where:{id:parseInt(id)}, data:body});
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const deleteCliente = async (req:Request,res:Response) => {
    const{id} = req.params;
    try {
        const result = await prisma.clientes.delete({
            where: {id:parseInt(id)}  
        });
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

export {
    getClientes,
    getCliente,
    postCliente,
    putCliente,
    deleteCliente
}