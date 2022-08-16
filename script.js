const nomes = [
  "rafael",
  "carlos",
  "maria",
  "raquel",
  "laura",
  "leandro",
  "miguel",
  "natalia",
  "filomena",
  "leonardo",
];
const frutas = [
  "abacate",
  "pera",
  "uva",
  "morango",
  "caqui",
  "banana",
  "banana",
  "cereja",
  "carambola",
  "laranja",
];
const animais = [
  "papagaio",
  "cachorro",
  "Gato",
  "peixe",
  "periquito",
  "coelho",
  "cavalo",
  "hamster",
  "Galinha",
  "Tartaruga",
];
const cidades = [
  "pequim",
  "londres",
  "salvador",
  "fortaleza",
  "porto",
  "blumenal",
  "curitiba",
  "recife",
  "natal",
  "manaus"
];

const tipLetter = [nomes, frutas, animais, cidades];

const letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S',
  'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const containerInformation = document.querySelector('.container__information');
const containerItens = document.querySelector('.container__itens');
const containerImage = document.querySelector('.container__image');
const containerImageForce = document.querySelector('.container__image__force');
const containerLetterCorrect = document.querySelector('.container__letter__correct');
const containerLetterButton = document.querySelector('.container__letter__button');
const containerLetterWrong = document.querySelector('.container__letter__wrong');
const buttonDivEndOfTheGame = document.createElement('button');
const divEndOfTheGame = document.createElement('div');
const pDivEndOfTheGame = document.createElement('p');
let word = '';
let cont = 0;
let contCorrect = 0;

const createDivsLetterCorrect = (w) => {
  for (let i = 0; i < w.length; i++) {
    const divLetter = document.createElement('div');
    divLetter.classList = 'div__letter';
    containerLetterCorrect.appendChild(divLetter);
  }
}

const createTip = (num) => {
  switch (num) {
    case 0:
      containerInformation.innerHTML = 'DICA: NOME';
      break;
    case 1:
      containerInformation.innerHTML = 'DICA: FRUTA';
      break;
    case 2:
      containerInformation.innerHTML = 'DICA: ANIMAIS';
      break;
    case 3:
      containerInformation.innerHTML = 'DICA: CIDADES';
      break;
  }
}

const drawWord = () => {
  const tipNum = Math.floor(Math.random() * 4);
  const wordNum = Math.floor(Math.random() * 11);
  word = tipLetter[tipNum][wordNum].toUpperCase();
  createTip(tipNum);
  createDivsLetterCorrect(word);
}

const clickButtonDivEndOfTheGame = () => {
  buttonDivEndOfTheGame.addEventListener('click', () => {
    restartGame();
  });
}

const wonTheGame = () => {
  divEndOfTheGame.className = 'div__end__of__the__game';
  pDivEndOfTheGame.innerText = 'Você Venceu!!';
  buttonDivEndOfTheGame.className = 'button-div-won-the-game';
  buttonDivEndOfTheGame.innerText = 'Voltar ao jogo'
  divEndOfTheGame.appendChild(pDivEndOfTheGame);
  divEndOfTheGame.appendChild(buttonDivEndOfTheGame);
  containerItens.appendChild(divEndOfTheGame);
  clickButtonDivEndOfTheGame();
}

const checkingWord = () => {
  if (contCorrect == word.length) {
    wonTheGame();
  }
}

const putTheCorrectLetter = (l) => {
  let idxLetter = word.indexOf(l);
  const divLettersCorrect = document.querySelectorAll('.div__letter');
  while (idxLetter != -1) {
    divLettersCorrect[idxLetter].innerHTML = l;
    idxLetter = word.indexOf(l, idxLetter + 1);
    contCorrect++;
  }
  checkingWord();
}

const createDivsLetterWrong = (l) => {
  const divLetterWorng = document.createElement('div');
  divLetterWorng.innerHTML = l;
  divLetterWorng.className = 'div__letter';
  containerLetterWrong.appendChild(divLetterWorng);
}

const putImage = () => {
  switch (cont) {
    case 1:
      containerImageForce.src = `image/forca0${cont}.png`;
      break;
    case 2:
      containerImageForce.src = `image/forca0${cont}.png`;
      break;
    case 3:
      containerImageForce.src = `image/forca0${cont}.png`;
      break;
    case 4:
      containerImageForce.src = `image/forca0${cont}.png`;
      break;
    case 5:
      containerImageForce.src = `image/forca0${cont}.png`;
      break;
    case 6:
      containerImageForce.src = `image/forca0${cont}.png`;
      break;
    case 7:
      containerImageForce.src = `image/forca0${cont}.png`;
      break;
  }
}

const restartGame = () => {
  cont = 0;
  contCorrect = 0;
  containerImageForce.src = `image/forca0${cont}.png`;
  divEndOfTheGame.remove();
  containerLetterButton.innerHTML = '';
  containerLetterCorrect.innerHTML = '';
  containerLetterWrong.innerHTML = '';
  containerInformation.innerHTML = '';
  createButtonsLetter();
}

const lostTheGame = () => {
  divEndOfTheGame.className = 'div__end__of__the__game';
  pDivEndOfTheGame.innerText = `Você perdeu o jogo! \n Palavra:${word}`;
  buttonDivEndOfTheGame.className = 'button-div-lost-the-game';
  buttonDivEndOfTheGame.innerText = 'Voltar ao jogo'
  divEndOfTheGame.appendChild(pDivEndOfTheGame);
  divEndOfTheGame.appendChild(buttonDivEndOfTheGame);
  containerItens.appendChild(divEndOfTheGame);
  clickButtonDivEndOfTheGame();
}

const putTheWrongtLetter = (l) => {
  if (cont < 7) {
    cont++;
    createDivsLetterWrong(l);
    putImage();
  } else {
    lostTheGame();
  }
}

const checkLetter = () => {
  const letter = event.target.innerHTML;
  if (letter == '🎮') {
    restartGame();
  } else if (word.includes(letter)) {
    putTheCorrectLetter(letter);
    event.target.disabled = true;
  } else {
    putTheWrongtLetter(letter);
    event.target.disabled = true;
  }

}

const createButtonStart = () => {
  const buttonStart = document.createElement('button');
  buttonStart.addEventListener('click', checkLetter);
  buttonStart.innerHTML = '🎮';
  buttonStart.className = 'container__letter__button__letter';
  containerLetterButton.appendChild(buttonStart);
}

const createButtonsLetter = () => {
  for (let i of letters) {
    const buttonLetter = document.createElement('button');
    buttonLetter.addEventListener('click', checkLetter);
    buttonLetter.innerHTML = i;
    buttonLetter.className = 'container__letter__button__letter';
    containerLetterButton.appendChild(buttonLetter);
  }
  createButtonStart();
  drawWord();
}

createButtonsLetter();

