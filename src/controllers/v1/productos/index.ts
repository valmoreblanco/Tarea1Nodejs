import { PrismaClient,Prisma } from '@prisma/client';
import { constants } from 'buffer';
import {Request, Response} from 'express';

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const getProductos = async (req:Request,res:Response) => {
    try {
        const result = await prisma.productos.findMany({include:{categoria:true}});
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const getProducto = async (req:Request,res:Response) => {
    const{id} = req.params;
    try {
        const result = await prisma.productos.findUnique({
            where: {id:parseInt(id)},
            include:{categoria:true} 
        });
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const postProducto = async (req:Request,res:Response) => {
    // req.body.fecha_actualizacion = new Date(); Se reemplaza esto por el middleware
    try {
        const result = await prisma.productos.create({data:req.body});
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}
 
const putProducto = async (req:Request,res:Response) => {
    const {id} = req.params;
    const {body} = req;
    try {
        const result = await prisma.productos.update({where:{id:parseInt(id)}, data:body});
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

const deleteProducto = async (req:Request,res:Response) => {
    const{id} = req.params;
    try {
        const result = await prisma.productos.delete({
            where: {id:parseInt(id)}  
        });
        res.status(200).json(result);
    } catch (error) {
        console.log("Se ha presentado un error ",error);
        res.status(500).json(error)
    }
}

export {
    getProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}