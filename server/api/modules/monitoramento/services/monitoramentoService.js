import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getComunicacoes(tipo) {
  return await prisma.comunicacaoSite
    .findMany({
      where: {
        fechada: false,
        ...(tipo && { tipo_comunicacao: { nome_comunicacao: tipo } }),
      },
      include: {
        respostas: true,
        tipo_comunicacao: {
          select: {
            nome_comunicacao: true,
          },
        },
      },
      orderBy: {
        datahora_envio: 'asc', 
      },
    })
    //prisma nao oferece suporte para o atributo AS
    //dito isso é mapeado o objeto para que o atributo tipo_comunicacao seja renomeado para tipo
    .then((comunicacoes) => {
      return comunicacoes.map((comunicacao) => ({
        ...comunicacao,
        tipo: comunicacao.tipo_comunicacao.nome_comunicacao,
        tipo_comunicacao: undefined, // Remove the original tipo_comunicacao field
      }));
    });
}

async function createAwnserComunicacao(resposta, id, userId) {
  return await prisma.respostasComunicacao.create({
    data: {
      resposta,
      id_comunicacao_fk: id,
      id_respondente_fk: userId,
    },
  });
}

async function getComunicacaoId(id) {
  return await prisma.comunicacaoSite.findUnique({
    where: { id },
  });
}

async function getUserId(id) {
  return await prisma.usuario.findUnique({
    where: { id },
  });
}

async function closeComunicacao(id) {
  return await prisma.comunicacaoSite.update({
    where: { id },
    data: {
      fechada: true,
    },
  });
}

const monitoramentoServices = {
  getComunicacoes,
  createAwnserComunicacao,
  getComunicacaoId,
  getUserId,
  closeComunicacao,
};

export default monitoramentoServices;
