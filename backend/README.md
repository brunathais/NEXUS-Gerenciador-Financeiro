Aqui está o passo a passo para criar e rodar uma migração:

1. Instalar o Sequelize CLI (caso não tenha feito isso)

Se você ainda não tem o Sequelize CLI instalado, instale-o como uma dependência de desenvolvimento:

npm install --save-dev sequelize-cli


Ou, se estiver usando o yarn:

yarn add --dev sequelize-cli

2. Inicializar a configuração do Sequelize CLI

Se você ainda não tiver o arquivo de configuração do Sequelize CLI, execute o comando abaixo para inicializar:

npx sequelize-cli init


Isso criará a seguinte estrutura de diretórios:

config/
  config.json
models/
  index.js
migrations/
  (diretório vazio)
seeders/
  (diretório vazio)


O arquivo config/config.json contém as configurações de banco de dados.

O diretório migrations/ será usado para armazenar os arquivos de migração.

3. Criar um arquivo de migração

Agora que você tem a estrutura do Sequelize configurada, você pode gerar um arquivo de migração para adicionar ou alterar colunas no banco de dados.

Execute o seguinte comando para criar um novo arquivo de migração:

npx sequelize-cli migration:generate --name alter-categoria-column


O comando acima criará um arquivo de migração dentro da pasta migrations/ com um nome como 20251007000000-alter-categoria-column.js (o timestamp será gerado automaticamente).