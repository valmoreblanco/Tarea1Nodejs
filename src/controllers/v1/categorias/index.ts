import { PrismaClient,Prisma } from '@prisma/client';
import { constants } from 'buffer';
import {Request, Response} from 'express';

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const getCategorias = async (req:Request,res:Response) => {
    try {
        const result = await prisma.categorias.findMany();
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const getCategoria = async (req:Request,res:Response) => {
    const{id} = req.params;
    try {
        const result = await prisma.categorias.findUnique({
            where: {id:parseInt(id)}  
        });
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const postCategoria = async (req:Request,res:Response) => {
    // req.body.fecha_actualizacion = new Date(); Se reemplaza esto por el middleware
    try {
        const result = await prisma.categorias.create({data:req.body});
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}
 
const putCategoria = async (req:Request,res:Response) => {
    const {id} = req.params;
    const {body} = req;
    try {
        const result = await prisma.categorias.update({where:{id:parseInt(id)}, data:body});
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const deleteCategoria = async (req:Request,res:Response) => {
    const{id} = req.params;
    try {
        const result = await prisma.categorias.delete({
            where: {id:parseInt(id)}  
        });
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

export {
    getCategorias,
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}