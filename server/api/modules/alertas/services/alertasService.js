import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//para que não fique repetitivo
const includeUserAlertQuery = {
  categoria_alerta: true,
  alertasUsuarios: {
    include: {
      usuario: {
        include: {
          perfil: true,
        },
      },
    },
  },
};

async function getAllAlerts() {
  return await prisma.alerta.findMany({
    include: includeUserAlertQuery,
  });
}

async function getAllUserAlerts(userId) {
  return await prisma.alerta.findMany({
    where: {
      alertasUsuarios: {
        some: {
          id_usuario_fk: userId,
        },
      },
    },
    include: {
      categoria_alerta: true,
    }
  });
}

async function getSchoolName(id) {
  return await prisma.escola.findUnique({
    where: {
      id,
    },
  });
}

// Essa query é especificamente para o tipo escola
// ela seleciona todos os alunos (ainda não filtrando por escola específica)
async function getAllStudentAlerts(schoolName) {
  return await prisma.alerta.findMany({
    where: {
      alertasUsuarios: {
        some: {
          usuario: {
            turma: {
              escola: {
                nome_escola: schoolName,
              },
            },
          },
        },
      },
    },
    include: {
      categoria_alerta: true,
    },
  });
}

async function getSingleAlert(id) {
  return await prisma.alerta.findUnique({
    where: {
      id,
    },
    include: includeUserAlertQuery,
  });
}

export async function createAlert(data) {
  return await prisma.alerta.create({
    data: {
      id_categoria_alerta_fk: data.id_categoria_alerta_fk,
      titulo: data.titulo,
      descricao: data.descricao,
    },
  });
}

export async function updateAlert(id, data) {
  return await prisma.alerta.update({
    where: {
      id,
    },
    data: {
      id_categoria_alerta_fk: data.id_categoria_alerta_fk,
      titulo: data.titulo,
      descricao: data.descricao,
    },
  });
}

export async function deleteAlert(id) {
  return await prisma.alerta.delete({
    where: {
      id,
    },
  });
}

const alertasService = {
  getAllAlerts,
  getSingleAlert,
  createAlert,
  updateAlert,
  deleteAlert,
  getAllUserAlerts,
  getAllStudentAlerts,
  getSchoolName,
  // outras funcoes para importação
};
export default alertasService;
