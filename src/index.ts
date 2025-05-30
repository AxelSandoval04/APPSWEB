import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import connect from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

// Usar las rutas de autenticación
app.use("/api/auth", authRoutes);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});