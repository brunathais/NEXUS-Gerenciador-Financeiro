import { Op } from 'sequelize';
import Conta from '../models/Conta';
//import cron from 'node-cron';

async function enviarLembrete() {
  const hoje = new Date();
  const contasPendentes = await Conta.findAll({
    where: {
      status: 'PENDENTE',
      dataVencimento: {
        [Op.lte]: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1), // Contas vencendo ou vencidas
      },
    },
  });

  for (const conta of contasPendentes) {
    // Enviar lembrete por email, ou outro serviço
    console.log(`Lembrete enviado para a conta ${conta.descricao}`);

    // Marcar que o lembrete foi enviado
    conta.lembreteEnviado = true;
    await conta.save();
  }
}

// Agendar para rodar uma vez por dia
// cron.schedule('0 9 * * *', enviarLembrete); // Todos os dias às 9:00 AM

export default enviarLembrete;
