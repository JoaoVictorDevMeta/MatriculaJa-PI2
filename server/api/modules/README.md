# Projeto API

## Estrutura de Pastas

### Pasta `modules`

A pasta `modules` contém os principais módulos da aplicação, cada um responsável por uma funcionalidade específica. Dentro de cada módulo, temos subpastas que organizam o código de forma clara e modular:

- **controllers/**: Contém os controladores que lidam com as requisições HTTP e chamam os serviços apropriados. Eles são responsáveis por receber as requisições dos clientes, processar os dados de entrada, chamar os serviços necessários e retornar as respostas adequadas. Basicamente, os controladores atuam como intermediários entre as rotas e os serviços.
- **services/**: Contém a lógica de negócios da aplicação. Os serviços são responsáveis por implementar as regras de negócio e manipular os dados conforme necessário. Eles realizam operações como cálculos, validações e transformações de dados antes de passá-los para os repositórios ou retorná-los aos controladores. Os serviços garantem que a lógica de negócios esteja centralizada e reutilizável.
- **repository/**: ( NAO SEI SE VAMOS UTILIZAR )Responsáveis pelo acesso aos dados, seja em bancos de dados ou outras fontes. Os repositórios encapsulam a lógica de acesso a dados, permitindo que os serviços interajam com os dados de forma abstrata e desacoplada. Eles executam operações como consultas, inserções, atualizações e exclusões de dados, garantindo que a lógica de acesso a dados esteja separada da lógica de negócios.
- **routes/**: Define as rotas para cada requisição do módulo.

#### Módulos

- **monitoramento/**: Gerencia a inclusão de respostas às comunicações recebidas e fornece visões específicas para escolas e gestores.
  - **controllers/**: `escolaController.js`, `gestorController.js`
  - **services/**: `escolaService.js`, `gestorService.js`
  - **repositories/**: `escolaRepository.js`, `gestorRepository.js`
  - **routes/**: `escolaRoutes.js`, `gestorRoutes.js`

- **alertas/**: Responsável pela emissão e consulta de alertas.
  - **controllers/**: `alertasController.js`
  - **services/**: `alertasService.js`
  - **repositories/**: `alertasRepository.js`
  - **routes/**: `alertasRoutes.js`

- **login/**: Gerencia a autenticação dos usuários.
  - **controllers/**: `loginController.js`
  - **services/**: `loginService.js`
  - **repositories/**: `loginRepository.js`
  - **routes/**: `loginRoutes.js`

Essa estrutura modulariza bem o projeto, facilitando a manutenção e a adição de novas funcionalidades.