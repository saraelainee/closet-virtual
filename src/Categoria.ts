import type { FastifyInstance } from "fastify";
import mysql from "mysql2/promise";

export async function categoriaRoutes(app: FastifyInstance) {
    ///////////////////////// GET (já existente)  //////////////////////
    app.get("/categoria", async (_request, reply) => {
        try {
            const conn = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "closetvirtual",
            });

            const [dados] = await conn.query("SELECT * FROM categoria");
            reply.send(dados);
        } catch (erro) {
            console.error("Erro ao buscar categorias:", erro);
            reply.status(500).send({ erro: "Erro ao buscar categorias" });
        }
    });

    ////////////////////// POST (novo)  //////////////////////////////

    type NovaCategoria = {
        nome_categoria: string;
        descricao: string;
        closet_idcloset: number;
    };

    app.post("/categoria", async (request, reply) => {
        const body = request.body as NovaCategoria;
        try {
            const { nome_categoria, descricao, closet_idcloset } = body;

            if (!nome_categoria || !descricao || !closet_idcloset) {
                return reply.status(400).send({ erro: "Dados incompletos" });
            }

            const conn = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "closetvirtual",
            });

            const sql = "INSERT INTO categoria (nome_categoria, descricao, closet_idcloset) VALUES (?, ?, ?)";
            const [resultado] = await conn.execute(sql, [nome_categoria, descricao, closet_idcloset]);

            reply.status(201).send({ mensagem: "Categoria criada com sucesso", id: (resultado as any).insertId });
        } catch (erro) {
            console.error("Erro ao criar categoria:", erro);
            reply.status(500).send({ erro: "Erro ao criar categoria" });
        }
    });

    /////////////////////////////  PUT (atualizar)  /////////////////////////////////////////
    app.put("/categoria/:id", async (request: any, reply: any) => {
        const { id } = request.params as any;
        const body = request.body as any;

        const { nome_categoria, descricao, closet_idcloset } = body;

        if (!nome_categoria || !descricao || !closet_idcloset) {
            return reply.status(400).send({ erro: "Dados incompletos para atualizar" });
        }

        try {
            const conn = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "closetvirtual",
            });

            const sql = `
        UPDATE categoria 
        SET nome_categoria = ?, descricao = ?, closet_idcloset = ? 
        WHERE idcategoria = ?
      `;

            const [resultado] = await conn.execute(sql, [
                nome_categoria,
                descricao,
                closet_idcloset,
                id,
            ]);

            const { affectedRows } = resultado as any;

            if (affectedRows === 0) {
                return reply.status(404).send({ erro: "Categoria não encontrada" });
            }

            reply.send({ mensagem: "Categoria atualizada com sucesso" });
        } catch (erro) {
            console.error("Erro ao atualizar categoria:", erro);
            reply.status(500).send({ erro: "Erro ao atualizar categoria" });
        }
    });

    // Categoria.ts

    ////////////////////  DELETE (apagar)  /////////////////////////////////
    app.delete("/categoria/:id", async (request, reply) => {
        const { id } = request.params as any;

        try {
            const conn = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "closetvirtual",
            });

            // CORREÇÃO: Usar idcategoria para deletar, não nome_categoria
            const sql = "DELETE FROM categoria WHERE idcategoria = ?";
            const [resultado] = await conn.execute(sql, [id]);

            const { affectedRows } = resultado as any;

            if (affectedRows === 0) {
                return reply.status(404).send({ erro: "Categoria não encontrada" });
            }

            reply.send({ mensagem: "Categoria excluída com sucesso" });
        } catch (erro: any) {
            console.error("Erro ao deletar categoria:", erro);

            // Esta parte já está ótima! Ela vai capturar o erro de chave estrangeira.
            if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
                return reply.status(409).send({
                    erro: "Essa categoria está sendo usada por um produto e não pode ser excluída.",
                });
            }

            reply.status(500).send({ erro: "Erro ao excluir categoria" });
        }
    })
}