# Cadastro (React + Vite) — Integrado ao backend TS/Express

## Rodar
```bash
npm i
npm run dev
```
Aponte o backend em `.env`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```
O componente principal está em `src/components/Cadastro.tsx`.
Para usar no seu projeto anterior, copie **`src/components/Cadastro.tsx`** e **`src/styles/cadastro.css`** e importe no `App.tsx`.


Hook para gerenciar transações: listagem, criação, edição, exclusão, duplicação e filtros
Centraliza a lógica de transações para reutilização em vários componentes
hooks são funções que começam com "use" e podem usar outros hooks dentro delas
hooks personalizados ajudam a manter o código limpo e reutilizável
Com Hooks, você pode extrair lógica com estado de um componente de uma forma que possa ser testada independentemente e reutilizada