import type { FastifyInstance } from "fastify";
import mysql from "mysql2/promise";
import { databaseConfig } from "./databaseConfig";

export async function produtoRoutes(app: FastifyInstance) {

///////////////////////// GET (já existente)  //////////////////////
    app.get("/produto", async (_request, reply) => {
        try {
            const conn = await mysql.createConnection(databaseConfig);

            const [dados] = await conn.query("SELECT * FROM produto");
            reply.send(dados);
        } catch (erro) {
            console.error("Erro ao buscar produtos:", erro);
            reply.status(500).send({ erro: "Erro ao buscar produtos: " + erro });
        }
    });

    ////////////////////// POST (novo)  //////////////////////////////
    type NovoProduto = {
        nome_produto: string;
        cor_produto: string;
        closet_idcloset: number;
        categoria_idcategoria: number;
    };

    app.post("/produto", async (request, reply) => {
        const body = request.body as NovoProduto;
        try {
            const { nome_produto, cor_produto, closet_idcloset, categoria_idcategoria } = body;
    
            if (!nome_produto || !cor_produto || !closet_idcloset || !categoria_idcategoria) {
                return reply.status(400).send({ erro: "Dados incompletos" });
            }
    
            const conn = await mysql.createConnection(databaseConfig);
    
            const sql = "INSERT INTO produto (nome_produto, cor_produto, closet_idcloset, categoria_idcategoria) VALUES (?, ?, ?, ?)";
            const [resultado] = await conn.execute(sql, [nome_produto, cor_produto, closet_idcloset, categoria_idcategoria]);
    
            reply.status(201).send({ mensagem: "Categoria criada com sucesso", id: (resultado as any).insertId });
        } catch (erro) {
            console.error("Erro ao criar categoria:", erro);
            reply.status(500).send({ erro: "Erro ao criar categoria: " + erro });
        }
    });

    /////////////////////////////  PUT (atualizar)  /////////////////////////////////////////
    app.put("/produto/:id", async (request: any, reply: any) => {
        const { id } = request.params as any;
        const body = request.body as any;
    
        const { nome_produto, cor_produto, closet_idcloset, categoria_idcategoria } = body;
    
        if (!nome_produto || !cor_produto || !closet_idcloset || !categoria_idcategoria) {
            return reply.status(400).send({ erro: "Dados incompletos para atualizar" });
        }
        try {
            const conn = await mysql.createConnection(databaseConfig);
            
                const sql = `
            UPDATE produto 
            SET nome_produto = ?, cor_produto = ?, closet_idcloset = ?, categoria_idcategoria = ?
            WHERE idproduto = ?
            `;
            
                const [resultado] = await conn.execute(sql, [
                    nome_produto,
                    cor_produto,
                    closet_idcloset,
                    categoria_idcategoria,
                    id,
                ]);
            
                const { affectedRows } = resultado as any;
            
                if (affectedRows === 0) {
                    return reply.status(404).send({ erro: "Produto não encontrado" });
                }
            
                reply.send({ mensagem: "Produto atualizado com sucesso" });
        } catch (erro) {
            console.error("Erro ao atualizar produto:", erro);
            reply.status(500).send({ erro: "Erro ao atualizar produto" });
        }
    });

    ////////////////////  DELETE (apagar)  /////////////////////////////////
    app.delete("/produto/:id", async (request, reply) => {
        const { id } = request.params as any;
        
        try {
            const conn = await mysql.createConnection(databaseConfig);
    
            // CORREÇÃO: Usar idcategoria para deletar, não nome_categoria
            const sql = "DELETE FROM produto WHERE idproduto = ?";
            const [resultado] = await conn.execute(sql, [id]);
        
            const { affectedRows } = resultado as any;
        
            if (affectedRows === 0) {
                return reply.status(404).send({ erro: "Produto não encontrado" });
            }
        
            reply.send({ mensagem: "Produto excluído com sucesso" });
        } catch (erro: any) {
            console.error("Erro ao deletar produto:", erro);
        
            // if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
            //     return reply.status(409).send({
            //         erro: "Esse produto não pode ser excluído.",
            //     });
            // }
    
            reply.status(500).send({ erro: "Erro ao excluir closet" });
        }
    })
}