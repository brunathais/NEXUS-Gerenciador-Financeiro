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


req.query permite pegar os parâmetros da URL, por exemplo:

/api/transacoes?tipo=Saída&categoria=Essenciais&dataInicio=2025-10-01&dataFim=2025-10-10


where é construído dinamicamente para filtrar conforme os parâmetros enviados.

Op.gte e Op.lte são operadores do Sequelize para "maior ou igual" e "menor ou igual", usados para filtrar datas.

Exemplo de uso

Buscar todas as saídas de “Essenciais” no mês de outubro:

GET /api/transacoes?tipo=Saída&categoria=Essenciais&dataInicio=2025-10-01&dataFim=2025-10-31


Buscar todas as entradas:

GET /api/transacoes?tipo=Entrada


Buscar todas as transações de uma categoria específica, sem filtro de data:

GET /api/transacoes?categoria=Imprevistos


arquivo TransactionForm.tsx

handleDuplicate que vai chamar a rota do backend para duplicar a transação. Essa função será chamada quando o botão "Duplicar" for clicado


rota /transacoes/duplicar no seu backend para copiar os dados da transação e criar uma nova com os mesmos dados, mas com uma data diferente, por exemplo, se você estiver criando uma transação mensal, a data será ajustada.

Função handleDuplicate no frontend envia uma requisição POST para /transacoes/duplicar com o ID da transação que você deseja duplicar.

No backend, a rota /duplicar recebe esse ID, encontra a transação correspondente no banco, e cria uma nova transação com os mesmos dados, mas com a data ajustada (exemplo: movendo um pagamento mensal para o próximo mês).

A nova transação é então salva no banco e a lista de transações no frontend é atualizada automaticamente.

Suponha que você tenha uma transação de pagamento de conta mensal:

Descrição: "Pagamento de luz"

Valor: 150.00

Tipo: "Saída"

Categoria: "Essenciais"

Data: "2025-10-05"

Quando o usuário clica no botão Duplicar:

A nova transação será criada com a mesma descrição, valor, tipo e categoria, mas com a data ajustada para o próximo mês ("2025-11-05").