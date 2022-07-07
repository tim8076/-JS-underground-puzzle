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


gridItems.forEach((item) => {
  item.addEventListener('dragover', (e) => {
    e.preventDefault();
  })
  item.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    puzzleCards.forEach((card) => {
      if (card.dataset.num === data.num) {
        card.classList.add('inBox');
        item.appendChild(card);
      }
    })
  })
})


resetButton.addEventListener('click', () => {
  placeCards();
})

placeCards();