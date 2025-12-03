# Usar a imagem base do Node.js para build
FROM node:20-alpine AS build

# Diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY frontend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código e gerar o build
COPY frontend/ .
RUN npm run build

# Usar o Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copiar os arquivos do build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta para o frontend
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]