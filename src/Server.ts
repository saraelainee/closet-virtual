//app.use

import fastify from 'fastify';
import cors from '@fastify/cors';
import { categoriaRoutes } from './Categoria';
//import { closetRoutes } from './Closet';
// import outros

const app = fastify();

await app.register(cors, {
  origin: "http://localhost:5173", // ou '*' para liberar tudo (cuidado!)
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
});

// registra rotas uma única vez
app.register(categoriaRoutes);
//app.register(closetRoutes);

app.listen({ port: 8000 }, (err, addr) => {
  if (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${addr}`);
});