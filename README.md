# Projeto Matricula Ja

Esse projeto tem como objetivo suprir a nota qualificada para disciplina Projeto Integrador do Curso de Informática do IFPB, campus João Pessoa.

## Geral

Anualmente os órgãos públicos na esfera federal, estadual e municipal definem as
diretrizes para a execução das atividades educacionais nas escolas em cada município. Os
gestores públicos são responsáveis pela definição e divulgação do calendário de pré-matrícula
e matrícula nas escolas. As escolas anualmente definem as quantidades de turmas a serem
oferecidas em cada nível de ensino, assim como, definem a quantidade de alunos que cada
turma suporta, considerando a infra-estrutura e professores disponíveis.

A partir de 2024, o Governo do Estado da Paraíba automatizou o processo de matrícula
online, que tem por objetivo evitar que os estudantes, pais e responsáveis tenham que ir às
escolas para fazer a matrícula de forma presencial. Esse recurso é um avanço na gestão
pública educacional pois uma vez que o estudante tenha conhecimento da existência de vaga
disponível em uma determinada escola, não é mais necessário perder tempo em longas filas
para fazer a matrícula.

### Integrantes

O Projeto conta com a produção de cinco membros, além da mentoria de dois professores da disciplina, são eles:

- João Victor Gouveia
- Gustavo Marques
- Matheus Carvalho
- Endrel Daniel
- João Mateus

---

# Cliente (front-end)

## Setup Geral

> Front End feito em ReactJS

### Como utilizar

1. Faça dowload do cógido e ente em sua pasta principal

2. Faça download das dependencias utilzando o comando abaixo:
```shell
npm install
```

3. Execute no mesmo terminal em que fez a instalação o seguinte comando:
```shell
npm run dev
```
4. Caso tudo ocorra bem a mensagem abaixo irá aparecer
```shell
> scrumweb@0.0.0 dev
> vite


  VITE v4.4.9  ready in 1817 ms

  ➜  Local:   http://localhost:5173/PI---MatriculaJa/
  ➜  Network: use --host to expose
  ➜  press h to show help
```
5. Agora que o site está rondando basta abrir o link >>> http://localhost:5173/PI---MatriculaJa/

Obs: 1. Para parar o site aperte Ctrl + C. 2. O site só estara disponivel para sua máquina, dito isso, outros dispositivos são incapazes de acessá-lo.

---

# Servidor (back-end)

## Setup Geral

> Back End feito em ExpressJS

### Como utilizar

1. Faça dowload do cógido e ente em sua pasta principal

2. Faça download das dependencias utilzando o comando abaixo:
```shell
npm install
```

3. Inicie o banco de dados fazendo a migração e seeding dos dados com o seguinte comando:
```shell
npx prisma migrate dev --name init
```

4. Após isso pode iniciar o servidor com o comando:
```shell
npm run dev
```

---

# Módulos

> Utilizamos a organização de arquivos e pastas baseado em módulos, permitindo melhor controle de versão

## Funcionalidades

#### Módulo MONITORAMENTO
- **Inclusão de Respostas às comunicações recebidas através do site**
- **Visão ESCOLA**
  - **RN1: Total de Vagas Disponíveis**
  - **Total de Pré-Matrículas confirmadas**
  - **Total de Matrículas confirmadas**
- **Visão GESTOR**
  - **Total de Vagas Disponíveis na Rede**
  - **Total de Pré-Matrículas confirmadas na Rede**
  - **Total de Matrículas confirmadas na Rede**

#### Módulo ALERTAS
- **Emissão de Alertas**
  - Para todos os usuários ou apenas para alguns
- **Consulta de Alertas Enviados**

#### Módulo LOGIN
- **RN1**: A tela principal deverá disponibilizar acesso para uma área de login onde usuários previamente cadastrados poderão informar login e senha para acessar informações específicas de acordo com o seu perfil de usuário.
- **RN2**: Um usuário só poderá ter acesso às informações sensíveis do site se estiver ativo, e as credenciais (login e senha) forem válidos. Caso contrário, deverá ser emitida mensagem “Credenciais Inválidas!” e não deverá ser permitido o acesso à área controlada do site.
- **RN3**: Após realizar autenticação com sucesso, o usuário só deverá ter acesso às funcionalidades específicas do seu perfil:
  - **Perfil ADMINISTRADOR**: Poderá ter acesso aos módulos CONFIGURAÇÃO e ALERTAS.
  - **Perfil ALUNO**: Poderá ter acesso às funcionalidades do módulo ALUNO.
  - **Perfil GESTOR**: Poderá ter acesso às funcionalidades do módulo MONITORAMENTO e ALERTAS.
  - **Perfil ESCOLA**: Poderá ter acesso às funcionalidades do módulo MONITORAMENTO e ALERTAS.