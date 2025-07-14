import type { FastifyInstance } from "fastify";
import mysql from "mysql2/promise";
import { databaseConfig } from "./databaseConfig";

export async function closetRoutes(app: FastifyInstance) {

///////////////////////// GET (já existente)  //////////////////////
    app.get("/closet", async (_request, reply) => {
        try {
            const conn = await mysql.createConnection(databaseConfig);

            const [dados] = await conn.query("SELECT * FROM closet");
            reply.send(dados);
        } catch (erro) {
            console.error("Erro ao buscar closets:", erro);
            reply.status(500).send({ erro: "Erro ao buscar closets: " + erro });
        }
    });

    ////////////////////// POST (novo)  //////////////////////////////
    type NovoCloset = {
        nome_closet: string;
        proprietario: string;
    };

    app.post("/closet", async (request, reply) => {
        const body = request.body as NovoCloset;
        try {
            const { nome_closet, proprietario } = body;

            if (!nome_closet || !proprietario) {
                return reply.status(400).send({ erro: "Dados incompletos" });
            }

            const conn = await mysql.createConnection(databaseConfig);

            const sql = "INSERT INTO closet (nome_closet, proprietario) VALUES (?, ?)";
            const [resultado] = await conn.execute(sql, [nome_closet, proprietario]);

            reply.status(201).send({ mensagem: "Closet criado com sucesso", id: (resultado as any).insertId });
        } catch (erro) {
            console.error("Erro ao criar closet:", erro);
            reply.status(500).send({ erro: "Erro ao criar closet: " + erro });
        }
    });


    /////////////////////////////  PUT (atualizar)  /////////////////////////////////////////
    app.put("/closet/:id", async (request: any, reply: any) => {
        const { id } = request.params as any;
        const body = request.body as any;

        const { nome_closet, proprietario } = body;

        if (!nome_closet || !proprietario) {
            return reply.status(400).send({ erro: "Dados incompletos para atualizar" });
        }
        try {
            const conn = await mysql.createConnection(databaseConfig);
        
                const sql = `
            UPDATE closet 
            SET nome_closet = ?, proprietario = ?
            WHERE idcloset = ?
            `;
        
                const [resultado] = await conn.execute(sql, [
                    nome_closet,
                    proprietario,
                    id,
                ]);
        
                const { affectedRows } = resultado as any;
        
                if (affectedRows === 0) {
                    return reply.status(404).send({ erro: "Closet não encontrado" });
                }
        
                reply.send({ mensagem: "Closet atualizado com sucesso" });
        } catch (erro) {
            console.error("Erro ao atualizar closet:", erro);
            reply.status(500).send({ erro: "Erro ao atualizar closet" });
        }
    });

    ////////////////////  DELETE (apagar)  /////////////////////////////////
    app.delete("/closet/:id", async (request, reply) => {
        const { id } = request.params as any;
    
        try {
            const conn = await mysql.createConnection(databaseConfig);

            // CORREÇÃO: Usar idcategoria para deletar, não nome_categoria
            const sql = "DELETE FROM closet WHERE idcloset = ?";
            const [resultado] = await conn.execute(sql, [id]);
    
            const { affectedRows } = resultado as any;
    
            if (affectedRows === 0) {
                return reply.status(404).send({ erro: "Closet não encontrado" });
            }
    
            reply.send({ mensagem: "Closet excluído com sucesso" });
        } catch (erro: any) {
            console.error("Erro ao deletar closet:", erro);
    
            if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
                return reply.status(409).send({
                    erro: "Esse closet está sendo usada por uma categoria e um por um produto e não pode ser excluído.",
                });
            }
    
            reply.status(500).send({ erro: "Erro ao excluir closet" });
        }
    })
}