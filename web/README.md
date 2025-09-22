# API - AvaliacaoPratica-Techman

## Tecnologias
- Node.js
- Express
- Prisma ORM
- MySQL

## Instalação e Uso

1. **Clone o repositório e acesse a pasta da API:**
   ```
   bash
   git clone <url-do-repositorio>
   cd api
   ```

2. **Configure o banco de dados:**
   ```
   DATABASE_URL="mysql://root@localhost:3306/techman?schema=public&timezone=UTC"
   ```

3. **Instale as dependências:**
   ```
   npm install
   ```
4. **Execute as migrations:**
   ```
   npx prisma migrate dev --name init
   ```
5. **Popule o banco com os dados dos arquivos CSV (opcional):**
   ```
   node prisma/seed.js
   ```
6. **Inicie o servidor:**
   ```
   node server.js
   ```
            