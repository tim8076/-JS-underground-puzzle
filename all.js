const puzzleContainer = document.querySelector('[data-puzzle-container]');
const puzzleCards = document.querySelectorAll('.puzzle-card');
const gridItems = document.querySelectorAll('.grid-item');
const resetButton = document.querySelector('[data-reset-button]');


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function placeCards() {
  puzzleCards.forEach((card) => {
    const top = randomIntFromInterval(0, 80);
    const left = randomIntFromInterval(-10, 10);
    const right = randomIntFromInterval(70, 90);
    const isLeft = randomIntFromInterval(0, 1);
    if (isLeft) {
      card.style.setProperty('--top', top);
      card.style.setProperty('--left', left);
    } else {
      card.style.setProperty('--top', top);
      card.style.setProperty('--left', right);
    }
  })
}

puzzleCards.forEach((card) => {
  card.addEventListener('dragstart', (e) => {
    const data = {
      src: e.target.src,
      num: e.target.dataset.num,
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  })
});

document.addEventListener('drag', (e) => {
  console.log(e);
})

gridItems.forEach((item) => {
  item.addEventListener('dragover', (e) => {
    e.preventDefault();
  })
  item.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const dataNum = Number(data.num);
    puzzleCards.forEach((card) => {
      const cardNum = Number(card.dataset.num);
      if (cardNum === 2 || cardNum === 6 || cardNum === 8) card.classList.add('left');
      if (cardNum === 5 || cardNum === 7 || cardNum === 9) card.classList.add('top');
      if (cardNum === dataNum) {
        card.classList.add('inBox');
        item.appendChild(card);
      }
    })
  })
})

<<<<<<< HEAD
=======
puzzleContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
})

puzzleContainer.addEventListener('drop', (e) => {
  e.preventDefault();
  if (e.target.className !== 'puzzle-container') return;
  const { offsetX, offsetY } = e;
  console.log(e)
  const { offsetWidth, offsetHeight } = e.target;
  const ratioX = Math.round(offsetX / offsetWidth * 100);
  const ratioY = Math.round(offsetY / offsetHeight * 100);
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  const card = [...puzzleCards].find((card) => card.dataset.num === data.num)
  card.className = 'puzzle-card';
  card.style.setProperty('--top', ratioY);
  card.style.setProperty('--left', ratioX);
  puzzleContainer.appendChild(card);
})


>>>>>>> origin/main

resetButton.addEventListener('click', () => {
  placeCards();
})

placeCards();