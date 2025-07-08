import mysql from 'mysql2/promise';
import fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import cors from '@fastify/cors'

const app = fastify()
app.register(cors)

//app.use

app.get("/", (_request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Fastify Funcionando!")
})
app.get("/categoria", async (_request: FastifyRequest, reply: FastifyReply) => {
   
    try {
        const conn = await mysql.createConnection( {
          host: "localhost",
          user: 'root',
          password: "",
          database: 'closetvirtual',
      });

      console.log("Conexão com o banco de dados estabelecida com sucesso!");
        const resultado = await conn.query("SELECT * FROM categoria")
        const [dados] = resultado
        reply.send(dados)


    } catch (erro:any) {
    
    }
})

app.listen({ port: 8000, host: "localhost" }, (erro, address) => {
    if (erro) {
        console.error("Erro ao iniciar o servidor:", erro);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
})