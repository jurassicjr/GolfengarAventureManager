import { Message } from "discord.js";

const helpCommand = {
  name: "Help",
  description: "This commands show to the user how he can use the bot",
  commandString: "!ajuda",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    try {
      await msg.author.send(
        `
        Olá como vai você? estou aqui para te ajudar a compreender como funciona o Gerente de aventuras!.
        Segue os comandos:
        !criar_aventura [nome da aventura (entre aspas)] [descrição (entre aspas)] [rank (marcação apenas um por enquanto)] [data (entre aspas formato "yyyy-MM-dd HH:mm")] [Nº vagas]
        !listar_aventuras -> Lista todas as aventuras disponíveis.
        !listar_aventuras [rank (marcação)] -> Lista todas as aventuras disponíveis do rank informado.
        !listar_aventuras [dungeonMaster (marcação)] -> Lista todas as aventuras disponíveis do mestre informado.
        !mostrar_aventura [ID ou Nome da aventura (nome da aventura entre aspas)] -> Exibi todas as informações de uma missão.
        !inscrever [ID ou Nome da aventura] [Log] -> Cadastra o log em uma aventura.
        !inscrever [Log] -> Cadastra o log na aventura que foi criada no canal em questão.
        !finalizar [ID ou Nome da aventura (nome da aventura entre aspas)] [data de término da sessão "yyyy-MM-dd HH:MM"] [descrição da recompensa (entre aspas)] [Número de aventuras] [relatório (entre aspas] [participantes marcação de todos que participaram] -> finaliza uma sessão se você foi o mestre que a criou.
        !finalizar [ID ou Nome da aventura (nome da aventura entre aspas)] [data de término da sessão "yyyy-MM-dd HH:MM"] [descrição da recompensa (entre aspas)] [relatório (entre aspas] [participantes marcação de todos que participaram] -> finaliza uma sessão se você foi o mestre que a criou, e calcula automaticamente a recompensa.*
        !finalizar [data de término da sessão "yyyy-MM-dd HH:MM"] [descrição da recompensa (entre aspas)] [Número de aventuras] [relatório (entre aspas] [participantes marcação de todos que participaram] -> finaliza uma sessão se você foi o mestre que a criou no chat que ela foi criada.*
        !finalizar [data de término da sessão "yyyy-MM-dd HH:MM"] [descrição da recompensa (entre aspas)] [relatório (entre aspas] [participantes marcação de todos que participaram] -> finaliza uma sessão se você foi o mestre que a criou no chat que ela foi criada e calcula automaticamente as aventuras.*`,
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default helpCommand;
