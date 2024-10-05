import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function loginUser(email) {
  return await prisma.usuario.findUnique({
    where: {
        email
    },
    include: {
        perfil: true
    }
  });
}

const authServices = {
    loginUser
}
export default authServices