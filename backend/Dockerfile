# Usar a imagem base do Node.js
FROM node:20-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY backend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código do backend
COPY backend/ .

# Expor a porta do servidor
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]