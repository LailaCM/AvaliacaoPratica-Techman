const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Perfis
  await prisma.perfil.createMany({
    data: [
      { id: 1, perfil: 'Comum' },
      { id: 2, perfil: 'Administrador' },
      { id: 3, perfil: 'Tecnico' },
      { id: 4, perfil: 'Gerente' },
    ],
    skipDuplicates: true,
  });

  // Equipamentos
  await prisma.equipamento.createMany({
    data: [
      {
        id: 1,
        equipamento: 'Torno Mecânico 500mm Modelo BV20L 220V - TTM520 - Tander',
        imagem: 'assets/Torno_Mecanico_500mm.png',
        descricao: `O Torno Mecânico Tander TTM520 é uma ferramenta utilizada por vários profissionais na confecção e acabamento de inúmeras peças metálicas, tais como: eixos, polias, pinos, roscas, peças cilíndricas internas e externas, cones, esferas, entre outros. 
Este torno vem com motor monofásico de 220V e 550W de potência, o que lhe confere maior torque e vida útil, menor consumo de energia e baixo índice de manutenção. 
Possui interruptor magnético com a função de travagem de emergência, rotação frente/reversa e a função de proteção ao torno e aos componentes elétricos.`,
        ativo: true,
        data: new Date('2019-10-01T14:54:20.873Z'),
      },
      {
        id: 2,
        equipamento: 'Processador Intel Core i9-7920X Skylake, Cache 16.5MB, 2.9GHz (4.3GHz Max Turbo), LGA 2066 - BX80673I97920X',
        imagem: 'assets/Intel_Core_i9.png',
        descricao: 'Com esse processador inovador e incrível você desfruta ao máximo o verdadeiro potencial do seu computador e desfruta da mais pura velocidade. Maximize o seu desempenho seja trabalhando, jogando, navegando ou assistindo o seu filme preferido, com esse processador você pode tudo!',
        ativo: true,
        data: new Date('2019-10-01T15:00:20.873Z'),
      },
      {
        id: 3,
        equipamento: 'Monitor, Dell, U2518D, UltraSharp, Preto e Suporte em Alumínio, 25""',
        imagem: 'assets/Monitor_Dell.png',
        descricao: 'Dê vida ao seu trabalho com uma tela de 25 polegadas quase sem bordas que conta com detalhes em cores vívidas e consistentes graças a tecnologia hdr, resolução qhd e ângulo de visão ultra-amplo. Aumente sua performance com os recursos dell display manager, dell easy arrange e trabalhe confortavelmente graças a um suporte totalmente ajustável e recurso confortview.',
        ativo: false,
        data: new Date('2018-10-01T10:00:20.000Z'),
      },
      {
        id: 4,
        equipamento: 'Mouse Gamer Razer Deathadder Essential Óptico 5 Botões 4G 6.400 DPI',
        imagem: 'assets/Mouse_Razer.png',
        descricao: 'Nada melhor do que um mouse gamer com tecnologia de ponta para qualificar seus comandos e aprimorar suas jogadas nos games. ... (texto completo)',
        ativo: true,
        data: new Date('2017-10-01T09:00:20.000Z'),
      },
      {
        id: 5,
        equipamento: 'All-in-One Media Keyboard',
        imagem: 'assets/Teclado_Microsoft.png',
        descricao: 'O All-in-One Media Keyboard é o dispositivo ideal para sua sala ou home office. ... (texto completo)',
        ativo: false,
        data: new Date('2017-10-01T13:00:00.000Z'),
      },
    ],
    skipDuplicates: true,
  });

  // Usuarios
  await prisma.usuario.createMany({
    data: [
      { id: 1, senha: '111111', perfil: 1 },
      { id: 2, senha: '212121', perfil: 2 },
      { id: 3, senha: '414141', perfil: 4 },
      { id: 4, senha: '313131', perfil: 3 },
    ],
    skipDuplicates: true,
  });

  // Comentarios
  await prisma.comentario.createMany({
    data: [
      { id: 1, comentario: 'Deverá fazer o download do aplicativo da Razer para alterar a cor do mouse.', equipamento: 2, perfil: 4, data: new Date('2020-09-07T18:00:00Z') },
      { id: 2, comentario: 'Problema de aquecimento no processador após 1 ano de uso.', equipamento: 2, perfil: 2, data: new Date('2020-05-04T10:30:00Z') },
      { id: 3, comentario: 'Problema de aquecimento no processador após 3 anos de uso.', equipamento: 3, perfil: 4, data: new Date('2021-03-04T15:30:00Z') },
      { id: 4, comentario: 'Realizada a manutenção preventiva', equipamento: 3, perfil: 1, data: new Date('2021-06-05T09:30:00Z') },
      { id: 5, comentario: 'Realizada a manutenção corretiva', equipamento: 4, perfil: 1, data: new Date('2021-07-10T08:00:00Z') },
      { id: 6, comentario: 'Realizada a manutenção corretiva', equipamento: 5, perfil: 2, data: new Date('2021-07-13T09:00:00Z') },
      { id: 7, comentario: 'Realizada a manutenção corretiva', equipamento: 3, perfil: 2, data: new Date('2021-08-10T10:00:00Z') },
      { id: 8, comentario: 'Realizada a manutenção corretiva', equipamento: 4, perfil: 3, data: new Date('2021-09-18T17:00:00Z') },
      { id: 9, comentario: 'Realizada a manutenção corretiva', equipamento: 5, perfil: 3, data: new Date('2021-10-11T11:00:00Z') },
      { id: 10, comentario: 'Realizada a manutenção corretiva', equipamento: 3, perfil: 4, data: new Date('2021-11-21T12:00:00Z') },
      { id: 11, comentario: 'Realizada a manutenção corretiva', equipamento: 5, perfil: 4, data: new Date('2021-12-22T13:00:00Z') },
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