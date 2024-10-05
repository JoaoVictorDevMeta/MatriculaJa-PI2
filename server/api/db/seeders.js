import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

//funçao pra injetar dados iniciais
//não esta escalavel por que n precisa kkkk
async function main() {
  const data = JSON.parse(fs.readFileSync("api/db/data/seed.json", "utf-8"));

  // Seed Perfils
  const perfils = [];
  const users = [];
  for (const perfil of data.perfils) {
    const newPerfil = await prisma.perfil.create({
      data: perfil,
    });
    perfils.push(newPerfil);
  }

  const escolas = [];
  for (const escola of data.escolas) {
    const newData = await prisma.escola.create({
      data: escola,
    });
    escolas.push(newData);
  }

  const turmas = [];
  for (const turma of data.turmas) {
    const { escola, ...turmaData } = turma;

    const newData = await prisma.turma.create({
      data: {
        ...turmaData,
        id_escola_fk: escolas.find((e) => e.nome_escola === escola).id,
      },
    });

    turmas.push(newData);
  }

  // Seed Usuarios
  for (const usuario of data.usuarios) {
    //busca o id do perfil que foi escolhido
    const perfilUser = await prisma.perfil.findFirst({
      where: {
        nome_perfil: usuario.perfil,
      },
    });

    const { perfil, ...userData } = usuario;

    let newUser;
    if(perfilUser.nome_perfil === "Aluno"){
      newUser = await prisma.usuario.create({
        data: {
          ...userData,
          id_perfil_fk: perfilUser.id,
          id_turma_fk: turmas[0].id,
        },
      });
    }else {
      newUser = await prisma.usuario.create({
        data: {
          ...userData,
          id_perfil_fk: perfilUser.id,
        },
      });
    }
    //cria o usuario com o relacionamento com perfil (obrigatório)
  
    const ss = await prisma.usuario.findFirst({
      where: {
        id: newUser.id,
      },
      include: {
        perfil: true,
      },
    });

    users.push(ss);
  }

  // Seed Configuracoes
  for (const configuracao of data.configuracoes) {
    await prisma.configuracao.create({
      data: {
        ...configuracao,
        id_responsavel_alteracao: users[0].id,
      },
    });
  }

  // Seed CategoriaAlertas
  const categoriaAlertas = [];
  for (const categoriaAlerta of data.categoriaAlertas) {
    const newCategoriaAlerta = await prisma.categoriaAlerta.create({
      data: categoriaAlerta,
    });
    categoriaAlertas.push(newCategoriaAlerta);
  }

  // Seed Alertas
  const alertas = [];
  for (const alerta of data.alertas) {
    const { categoria, target_group, datahora_envio, ...alertData } = alerta;

    const newData = await prisma.alerta.create({
      data: {
        ...alertData,
        datahora_envio: new Date(datahora_envio),
        id_categoria_alerta_fk: categoriaAlertas.find(
          (ca) => ca.nome_categoria === categoria
        ).id,
      },
    });

    alertas.push({target_group, newData});
  }

  //seed for alerta usuarios
  for (const alerta of alertas) {
    if (alerta.target_group === "TODOS") {
      for (const user of users) {
        await prisma.alertaUsuarios.create({
          data: {
            id_alerta_fk: alerta.newData.id,
            id_usuario_fk: user.id,
          },
        });
      }
    } else if (alerta.target_group === "ESCOLAS") {
      for (const user of users) {
        if (user.perfil.nome_perfil === "Escola") {
          await prisma.alertaUsuarios.create({
            data: {
              id_alerta_fk: alerta.newData.id,
              id_usuario_fk: user.id,
            },
          });
        }
      }
    } else {
      //console.log(alerta)
      for (const user of users) {
        //console.log("teste", user)
        if (user.perfil.nome_perfil === "Aluno") {
          await prisma.alertaUsuarios.create({
            data: {
              id_alerta_fk: alerta.newData.id,
              id_usuario_fk: user.id,
            },
          });
        }
      }
    }
  }

  // Seed TipoComunicacoes
  const tipoComunicacoes = [];
  for (const tipoComunicacao of data.tipoComunicacoes) {
    const newTipoComunicacao = await prisma.tipoComunicacao.create({
      data: tipoComunicacao,
    });
    tipoComunicacoes.push(newTipoComunicacao);
  }

  // Seed ComunicacaoSites
  const comunicacaoSites = [];
  for (const comunicacaoSite of data.comunicacaoSites) {
    const { tipo, ...comunData } = comunicacaoSite;

    const newData = await prisma.comunicacaoSite.create({
      data: {
        ...comunData,
        id_tipo_comunicacao_fk: tipoComunicacoes.find(
          (tc) => tc.nome_comunicacao === tipo
        ).id,
      },
    });
    comunicacaoSites.push(newData);
  }

  // Seed RespostasComunicacao
  for (const respostaComunicacao of data.respostasComunicacao) {
    await prisma.respostasComunicacao.create({
      data: {
        ...respostaComunicacao,
        id_comunicacao_fk: comunicacaoSites[0].id,
        id_respondente_fk: users[0].id,
      },
    });
  }

  // seeds novas
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
