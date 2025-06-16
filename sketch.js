let dia = 1;
let duracao = 7;
let estado = "fazenda"; // "quiz" ou "fim"

let plantacao = {
  status: "vazio", // "vazio", "plantado", "pronto"
  diasPlantado: 0
};

let estoque = {
  sementes: 3,
  agua: 6,
  colheitas: 0
};

let botoes = [];

let perguntas = [
  {
    pergunta: "Qual é o principal produto obtido na agricultura?",
    opcoes: ["Cereal", "Carne", "Petróleo", "Eletrônicos"],
    correta: "Cereal"
  },
  {
    pergunta: "Qual dessas plantas é uma leguminosa?",
    opcoes: ["Milho", "Feijão", "Batata", "Cenoura"],
    correta: "Feijão"
  },
  {
    pergunta: "Qual é o método tradicional de irrigação com canais?",
    opcoes: ["Sprinkler", "Lateral", "Drenagem", "Gotejamento"],
    correta: "Lateral"
  },
  {
    pergunta: "Qual animal é comum para controle de pragas?",
    opcoes: ["Abelha", "Joaninha", "Cachorro", "Gato"],
    correta: "Joaninha"
  },
  {
    pergunta: "Qual técnica melhora o solo com rotação de culturas?",
    opcoes: ["Plantio Direto", "Adubação Verde", "Queima", "Aspersão"],
    correta: "Adubação Verde"
  }
];

let perguntasSelecionadas = [];
let perguntaAtual = 0;
let pontosQuiz = 0;

function setup() {
  createCanvas(600, 400);
  textFont("Arial");
  botoes = [
    createButton("Plantar").mousePressed(plantar),
    createButton("Regar").mousePressed(regar),
    createButton("Colher").mousePressed(colher),
    createButton("Passar o dia").mousePressed(passarDia)
  ];
  perguntasSelecionadas = shuffle(perguntas).slice(0, 3);
}

function draw() {
  background(220);

  if (estado === "fazenda") {
    mostrarFazenda();
  } else if (estado === "quiz") {
    mostrarQuiz();
  } else if (estado === "fim") {
    mostrarFim();
  }
}

function mostrarFazenda() {
  fill(0);
  textSize(20);
  text("🌾 Dia " + dia + " de " + duracao, 20, 30);
  textSize(16);
  text("Plantação: " + plantacao.status + " (Dias: " + plantacao.diasPlantado + ")", 20, 60);
  text("Sementes: " + estoque.sementes, 20, 90);
  text("Água: " + estoque.agua, 20, 120);
  text("Colheitas: " + estoque.colheitas, 20, 150);

  if (dia === 4 && estado === "fazenda") {
    estado = "quiz";
    perguntaAtual = 0;
  }
}

function plantar() {
  if (estado !== "fazenda") return;
  if (plantacao.status === "vazio" && estoque.sementes > 0) {
    plantacao.status = "plantado";
    plantacao.diasPlantado = 0;
    estoque.sementes--;
  }
}

function regar() {
  if (estado !== "fazenda") return;
  if (plantacao.status === "plantado" && estoque.agua > 0) {
    estoque.agua--;
    plantacao.diasPlantado++;
    if (plantacao.diasPlantado >= 3) {
      plantacao.status = "pronto";
    }
  }
}

function colher() {
  if (estado !== "fazenda") return;
  if (plantacao.status === "pronto") {
    estoque.colheitas++;
    plantacao.status = "vazio";
    plantacao.diasPlantado = 0;
  }
}

function passarDia() {
  if (estado !== "fazenda") return;
  dia++;
  if (dia > duracao) {
    estado = "fim";
    botoes.forEach(btn => btn.hide());
  }
}

function mostrarQuiz() {
  fill(0);
  textSize(18);
  let p = perguntasSelecionadas[perguntaAtual];
  text("🧠 Quiz de Agricultura", 20, 30);
  textSize(16);
  text(p.pergunta, 20, 70);

  for (let i = 0; i < p.opcoes.length; i++) {
    let y = 110 + i * 30;
    fill(200);
    rect(20, y - 20, 300, 25);
    fill(0);
    text(p.opcoes[i], 30, y);
  }
}

function mousePressed() {
  if (estado === "quiz") {
    let p = perguntasSelecionadas[perguntaAtual];
    for (let i = 0; i < p.opcoes.length; i++) {
      let y = 110 + i * 30;
      if (mouseX > 20 && mouseX < 320 && mouseY > y - 20 && mouseY < y + 5) {
        if (p.opcoes[i] === p.correta) {
          pontosQuiz++;
        }
        perguntaAtual++;
        if (perguntaAtual >= perguntasSelecionadas.length) {
          estoque.sementes += pontosQuiz;
          estado = "fazenda";
        }
      }
    }
  }
}

function mostrarFim() {
  background(230);
  fill(0);
  textSize(24);
  text("🏁 Fim do jogo!", 20, 50);
  textSize(18);
  text("Você colheu " + estoque.colheitas + " planta(s).", 20, 100);
  text("Você ganhou " + pontosQuiz + " sementes extras no quiz!", 20, 130);
  text("Obrigado por jogar!", 20, 180);
}
