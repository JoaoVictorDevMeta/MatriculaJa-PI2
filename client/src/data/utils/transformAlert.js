export const transformData = (data) => {
  return data?.map((alert) => {
    let targetGroup = "TODOS";

    if (alert?.alertasUsuarios) {
      const userProfiles = alert.alertasUsuarios.map(
        (au) => au.usuario.perfil.nome_perfil
      );
      const uniqueProfiles = [...new Set(userProfiles)];

      if (uniqueProfiles.length === 1 && uniqueProfiles[0] === "Aluno") {
        targetGroup = "ALUNOS";
      } else if (
        uniqueProfiles.length === 1 &&
        uniqueProfiles.includes("Escola")
      ) {
        targetGroup = "ESCOLAS";
      }
    } else {
        targetGroup = "ALUNOS";
    }

    return {
      id: alert.id,
      data: new Date(alert.datahora_envio).toLocaleDateString("pt-BR"),
      tipo: alert.categoria_alerta.nome_categoria,
      target_group: targetGroup,
      name: alert.titulo,
      descricao: alert.descricao,
    };
  });
};
