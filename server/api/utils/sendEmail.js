import nodemailer from "nodemailer";

// Função para enviar email
// Transfere a mensagem especificada
export const sendMail = async (email, name, subject, text) => {
  try {
    const message = `
        Olá, ${name}
        ${subject}

        ${text}
    `;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      service: process.env.EMAIL_SERVICE,
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_SENHA,
      },
    });

    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });

    console.log("email sent");
  } catch (e) {
    console.log("email error");
    return new Error(e);
  }
};
