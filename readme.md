# Catalog-API

API para administrar uma empresa de catálogos, lida com categorias, anúncios de cada categoria e seus respectivos arquivos como imagens e vídeos.

## Requisitos e Regras de Negócio

- Categorias possuem níveis de relação entre outras categorias, pois não é possível definir quantas categorias e subcategorias existem até os anúncios das categorias;
- Anúncios de categoria são onde os anunciantes publicam seus arquivos (imagens e vídeos) com conteúdo referente ao marketing de sua marca;
- Uma categoria que tiver um ou mais anúncios não pode ter mais subcategorias
- /níveis maiores;
- Imagens dos anúncios vão ser dois tamanhos, o original e thumbnail (150px/150px), ambos convertidos para `.webp`;
- Peso máximo dos vídeos dos anúncios -> ` bytes`;
- Listar categorias por proximidade do usuário, aquelas que tiverem anúncios de empresas próximas a ele;
- Anúncios de categorias devem ser vinculadas a clientes, para que eles possam editá-los posteriormente.

## Como Usar

- `git pull` -> atualizar repositório;
- `npm install` -> instalar dependências;
- `cp .env.example .env` -> copiar variáveis de ambiente e populá-las;
- `npm run build` -> criar banco de dados e rodar migrations;
- `npm run dev` -> iniciar API em ambiente de desenvolvimento;
- `npm run prod` -> iniciar API em ambiente de produção, para isso antes rode: `npx tsc`.

## Usuário Administrador Padrão

- E-mail: admin@admin.com
- Senha: 1234

## Rotas

| URL                                 | MÉTODO   | HEADERS                                   | DESCRIÇÃO                                                                 |
| ----------------------------------- | -------- | ----------------------------------------- | ------------------------------------------------------------------------- |
| `/admin/login`                      | `POST`   |                                           | Se autenticar para ter permissão administrativa para executar as rotinas. |
| `/admin`                            | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo usuário administrativo.                                        |
| `/admin/{id}`                       | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar usuário administrativo.                                         |
| `/admin/{id}/password`              | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar senha do usuário administrativo.                                |
| `/admin`                            | `GET`    | `{ "Authorization": "Bearer sometoken" }` | Listar usuários administrativos.                                          |
| `/admin/{id}`                       | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover usuário administrativo.                                           |
| `/admin/{id}/restore`               | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Restaurar usuário administrativo.                                         |
| `/users`                            | `POST`   |                                           | Criar novo usuário do aplicativo.                                         |
| `/users/login`                      | `POST`   |                                           | Se autenticar para ter permissões do usuário.                             |
| `/users/{id}`                       | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar usuário do aplicativo.                                          |
| `/users`                            | `GET`    | `{ "Authorization": "Bearer sometoken" }` | Listar usuários do aplicativo.                                            |
| `/customers/login`                  | `POST`   |                                           | Se autenticar para ter permissão do cliente para executar as rotinas.     |
| `/customers`                        | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo cliente.                                                       |
| `/customers/{id}`                   | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar cliente.                                                        |
| `/customers/{id}/password`          | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar senha do cliente.                                               |
| `/customers`                        | `GET`    | `{ "Authorization": "Bearer sometoken" }` | Listar clientes.                                                          |
| `/customers/{id}`                   | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover cliente.                                                          |
| `/customers/{id}/restore`           | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Restaurar cliente.                                                        |
| `/categories`                       | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar nova categoria.                                                     |
| `/categories/{id}`                  | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar categoria.                                                      |
| `/categories`                       | `GET`    |                                           | Listar categorias.                                                        |
| `/categories/{id}/ads`              | `GET`    |                                           | Listar anúncios da categoria.                                             |
| `/categories/ads/{id}`              | `GET`    |                                           | Consultar anúncio da categoria.                                           |
| `/categories/{id}`                  | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover categoria.                                                        |
| `/categories/{id}/restore`          | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Restaurar categoria.                                                      |
| `/categories/{id}/ads`              | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo anúncio da categoria.                                          |
| `/categories/ads/{id}`              | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar anúncio da categoria.                                           |
| `/categories/ads/{id}`              | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover anúncio da categoria.                                             |
| `/categories/ads/{id}/restore`      | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Restaurar anúncio da categoria.                                           |
| `/categories/ads/{id}/files/{type}` | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo arquivo para o anúncio da categoria.                           |
| `/categories/ads/files/{id}`        | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar o arquivo do anúncio da categoria.                              |
| `/categories/ads/files/{id}`        | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover arquivo do anúncio da categoria.                                  |
| `/categories/ads/{id}/phones`       | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo telefone para o anúncio da categoria.                          |
| `/categories/ads/phones/{id}`       | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover telefone do anúncio da categoria.                                 |
| `/categories/ads/{id}/addresses`    | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo endereço para o anúncio da categoria.                          |
| `/categories/ads/addresses/{id}`    | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover endereço do anúncio da categoria.                                 |
| `/categories/ads/{id}/actions`      | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar nova ação no anúncio da categoria.                                  |
| `/categories/ads/actions`           | `GET`    | `{ "Authorization": "Bearer sometoken" }` | Listar as ações em todos os anúncios de uma categoria.                    |
| `/contacts`                         | `POST`   |                                           | Criar nova mensagem de contato.                                           |
| `/address/zipcode`                  | `GET`    |                                           | Consultar endereço pelo CEP.                                              |
| `/address`                          | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo endereço.                                                      |
| `/address/{id}`                     | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Atualizar endereço.                                                       |
| `/address`                          | `GET`    | `{ "Authorization": "Bearer sometoken" }` | Listar endereços.                                                         |
| `/address/{id}`                     | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover endereço.                                                         |
| `/address/{id}/restore`             | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Restaurar endereço.                                                       |
| `/icons/{name}`                     | `POST`   | `{ "Authorization": "Bearer sometoken" }` | Criar novo ícone.                                                         |
| `/icons`                            | `GET`    | `{ "Authorization": "Bearer sometoken" }` | Listar ícones.                                                            |
| `/icons/{id}`                       | `DELETE` | `{ "Authorization": "Bearer sometoken" }` | Remover ícone.                                                            |
