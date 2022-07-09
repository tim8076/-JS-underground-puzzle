const puzzleContainer = document.querySelector('[data-puzzle-container]');
const puzzleGrid = document.querySelector('[data-puzzle-grid]')
const puzzleCards = document.querySelectorAll('.puzzle-card');
const gridItems = document.querySelectorAll('.grid-item');
const resetButton = document.querySelector('[data-reset-button]');

function randomIntFromInterval(min, max) {  // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function placeCards() {
  gridItems.forEach((grid) => {
    if (grid.hasChildNodes()) {
      grid.firstChild.className = 'puzzle-card';
      puzzleContainer.appendChild(grid.firstChild);
    }
  });

  puzzleCards.forEach((card) => {
    const top = randomIntFromInterval(0, 80);
    const left = randomIntFromInterval(-10, 10);
    const right = randomIntFromInterval(70, 90);
    const isLeft = randomIntFromInterval(0, 1);
    if (isLeft) {
      setCardPosition({ card, top, pos: left });
    } else {
      setCardPosition({ card, top, pos: right });
    }
  })
}

function setCardPosition({ card, top, pos }) {
  card.style.setProperty('--top', top);
  card.style.setProperty('--left', pos);
}

puzzleCards.forEach((card) => {
  card.addEventListener('dragstart', (e) => {
    const data = {
      src: e.target.src,
      num: e.target.dataset.num,
      cardHeight: e.target.clientHeight,
      cardWidth: e.target.clientWidth,
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  })
});

gridItems.forEach((item) => {
  item.addEventListener('dragover', (e) => {
    e.preventDefault();
  })
  item.addEventListener('dragenter', (e) => {
    item.classList.add('card-hover');
  })
  item.addEventListener('dragleave', (e) => {
    item.classList.remove('card-hover');
  })
  item.addEventListener('drop', (e) => {
    e.preventDefault();
    item.classList.remove('card-hover');
    if (item.hasChildNodes()) return;
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const dataNum = Number(data.num);
    puzzleCards.forEach((card) => {
      const cardNum = Number(card.dataset.num);
      if (cardNum === 2 || cardNum === 6 || cardNum === 8) card.classList.add('left');
      if (cardNum === 5 || cardNum === 7 || cardNum === 9) card.classList.add('top');
      if (cardNum === dataNum) {
        card.classList.add('inBox');
        item.appendChild(card);
        checkWin();
      }
    })
  })
})

function checkWin() {
  const cards = [ ...gridItems].map((grid) => grid.firstChild);
  if (cards.includes(null)) return;
  return cards.every((card, index) => Number(card.dataset.num) === index + 1);
}

puzzleContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
})

puzzleContainer.addEventListener('drop', (e) => {
  e.preventDefault();
  if (e.target.className !== 'puzzle-container') return;
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  const { offsetX, offsetY } = e;
  const { offsetWidth, offsetHeight } = e.target;
  const { cardHeight, cardWidth, num } = data;
  const ratioX = Math.round((offsetX - cardWidth / 2) / offsetWidth * 100);
  const ratioY = Math.round((offsetY - cardHeight / 2 ) / offsetHeight * 100);
  const card = [...puzzleCards].find((card) => card.dataset.num === num);
  card.className = 'puzzle-card';
  setCardPosition({ card, top: ratioY, pos: ratioX });
  puzzleContainer.appendChild(card);
})

resetButton.addEventListener('click', () => {
  placeCards();
})

placeCards();