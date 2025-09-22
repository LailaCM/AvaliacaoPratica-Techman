// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Perfis (do perfis.csv)
  await prisma.perfil.createMany({
    data: [
      { id: 1, nome: 'Comum' },
      { id: 2, nome: 'Administrador' },
      { id: 3, nome: 'Tecnico' },
      { id: 4, nome: 'Gerente' },
    ],
    skipDuplicates: true,
  });

  // Equipamentos (do equipamentos.csv que você enviou)
  await prisma.equipamento.createMany({
    data: [
      {
        id: 1,
        nome: 'Torno Mecçnico 500mm Modelo BV20L 220V - TTM520 - Tander',
        imagem: 'Torno_Mecanico_500mm.png',
        descricao: `O Torno Mecçnico Tander TTM520 ç uma ferramenta utilizada por vçrios profissionais na confecão e acabamento de inçmeras peças metçlicas, tais como: eixos, polias, pinos, roscas, peças cilçndricas internas e externas, cones, esferas, entre outros. 
Este torno vem com motor monofçsico de 220V e 550W de potçncia, o que lhe confere maior torque e vida çtil, menor consumo de energia e baixo çndice de manutenão. 
Possui interruptor magnçtico com a função de travagem de emergçncia, rotação frente/reversa e a função de proteção ao torno e aos componentes elétricos.`,
        ativo: true,
        dataCadastro: new Date('2019-10-01T14:54:20.873Z'),
      },
      {
        id: 2,
        nome: 'Processador Intel Core i9-7920X Skylake, Cache 16.5MB, 2.9GHz (4.3GHz Max Turbo), LGA 2066 - BX80673I97920X',
        imagem: 'Intel_Core_i9.png',
        descricao: 'Com esse processador inovador e incrçvel vocç desfruta ao mçximo o verdadeiro potencial do seu computador e desfruta da mais pura velocidade. Maximize o seu desempenho seja trabalhando, jogando, navegando ou assistindo o seu filme preferido, com esse processador vocç pode tudo!',
        ativo: true,
        dataCadastro: new Date('2019-10-01T15:00:20.873Z'),
      },
      {
        id: 3,
        nome: 'Monitor, Dell, U2518D, UltraSharp, Preto e Suporte em Alumçnio, 25""',
        imagem: 'Monitor_Dell.png',
        descricao: 'Dç vida ao seu trabalho com uma tela de 25 polegadas quase sem bordas que conta com detalhes em cores vçvidas e consistentes graças a tecnologia hdr, resoluão qhd e çngulo de visço ultra-amplo. Aumente sua performance com os recursos dell display manager, dell easy arrange e trabalhe confortavelmente graça a um suporte totalmente ajustçvel e recurso confortview.',
        ativo: false,
        dataCadastro: new Date('2018-10-01T10:00:20.000Z'),
      },
      {
        id: 4,
        nome: 'Mouse Gamer Razer Deathadder Essential çptico 5 Botçes 4G 6.400 DPI',
        imagem: 'Mouse_Razer.png',
        descricao: 'Nada melhor do que um mouse gamer com tecnologia de ponta para qualificar seus comandos e aprimorar suas jogadas nos games. ... (texto completo)',
        ativo: true,
        dataCadastro: new Date('2017-10-01T09:00:20.000Z'),
      },
      {
        id: 5,
        nome: 'All-in-One Media Keyboard',
        imagem: 'Teclado_Microsoft.png',
        descricao: 'O All-in-One Media Keyboard é o dispositivo ideal para sua sala ou home office. ... (texto completo)',
        ativo: false,
        dataCadastro: new Date('2017-10-01T13:00:00.000Z'),
      },
    ],
    skipDuplicates: true,
  });

  // Usuarios (do usuarios.csv)
  await prisma.usuario.createMany({
    data: [
      { id: 1, senha: '111111', perfilId: 1 },
      { id: 2, senha: '212121', perfilId: 2 },
      { id: 3, senha: '414141', perfilId: 4 },
      { id: 4, senha: '313131', perfilId: 3 },
    ],
    skipDuplicates: true,
  });

  // Comentarios (do comentarios.csv)
  await prisma.comentario.createMany({
    data: [
      { id: 1, comentario: 'Deverá fazer o download do aplicativo da Razer para alterar a cor do mouse.', equipamentoId: 2, perfilId: 4, dataTs: new Date('2020-09-07T18:00:00Z') },
      { id: 2, comentario: 'Problema de aquecimento no processador após 1 ano de uso.', equipamentoId: 2, perfilId: 2, dataTs: new Date('2020-05-04T10:30:00Z') },
      { id: 3, comentario: 'Problema de aquecimento no processador após 3 anos de uso.', equipamentoId: 3, perfilId: 4, dataTs: new Date('2021-03-04T15:30:00Z') },
      { id: 4, comentario: 'Realizada a manutenção preventiva', equipamentoId: 3, perfilId: 1, dataTs: new Date('2021-06-05T09:30:00Z') },
      { id: 5, comentario: 'Realizada a manutenção corretiva', equipamentoId: 4, perfilId: 1, dataTs: new Date('2021-07-10T08:00:00Z') },
      { id: 6, comentario: 'Realizada a manutenção corretiva', equipamentoId: 5, perfilId: 2, dataTs: new Date('2021-07-13T09:00:00Z') },
      { id: 7, comentario: 'Realizada a manutenção corretiva', equipamentoId: 3, perfilId: 2, dataTs: new Date('2021-08-10T10:00:00Z') },
      { id: 8, comentario: 'Realizada a manutenção corretiva', equipamentoId: 4, perfilId: 3, dataTs: new Date('2021-09-18T17:00:00Z') },
      { id: 9, comentario: 'Realizada a manutenção corretiva', equipamentoId: 5, perfilId: 3, dataTs: new Date('2021-10-11T11:00:00Z') },
      { id: 10, comentario: 'Realizada a manutenção corretiva', equipamentoId: 3, perfilId: 4, dataTs: new Date('2021-11-21T12:00:00Z') },
      { id: 11, comentario: 'Realizada a manutenção corretiva', equipamentoId: 5, perfilId: 4, dataTs: new Date('2021-12-22T13:00:00Z') },
    ],
    skipDuplicates: true,
  });

  console.log('Seed concluído.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
