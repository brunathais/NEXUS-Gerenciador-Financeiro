# Simple User System (SQL Server + TS/Express + Sequelize + React/Vite)

## Pré-requisitos

- Node 18+
- SQL Server rodando (local ou Docker)

## Subir SQL Server via Docker (opcional)

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong!Passw0rd"   -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2022-latest
```

## Criar database

```bash
docker exec -it mssql /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -C -Q "CREATE DATABASE SimpleUsers;"
```

## Backend

```bash
cd backend
npm i
npm run dev
```

## Testar

```bash
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"Bruna","email":"bruna@ska.com","password":"123456"}'
curl http://localhost:3000/api/users
```

## Frontend

```bash
cd frontend
npm i
npm run dev
```
