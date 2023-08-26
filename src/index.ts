import express, { Request, Response } from 'express';
import dotenv from 'dotenv'; //Facilitar la lectura del archivo .env
import cors from 'cors';
import routesv1 from './routes/v1'

dotenv.config();

//Iniciar una instancia de express

const app = express();

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));  //agregar middleware a la aplicación.
app.use(express.json());

//Asociar rutas
app.use("/api/v1",routesv1);
app.use("/api/v2",routesv1);

export default app;
