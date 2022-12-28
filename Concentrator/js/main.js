class BoardSquare{
  constructor(element,color){
    this.element=element;
    this.element.addEventListener("click", this, false);
    this.color=color;
    this.isFaceUp=false;
    this.isMathed=false;
    this.setcolor(color);
  }
  setcolor(color){
    const faceUpElement=this.element.getElementsByClassName('faceup')[0];
      this.color=color;
      faceUpElement.classList.add(color);
      //faceUpElement.classList.remove(this.color);
  }
  handleEvent(event){
    switch (event.type) {
      case "click":
          if (this.isFaceUp || this.isMathed){
            return;
          }
          this.isFaceUp=true;
          this.element.classList.add('flipped');
          squareFlipped(this);
    }
  }
  reset(){
    this.isFaceUp=false;
    this.isMathed=false;
    this.element.classList.remove('flipped');
  }
  matchFound(){
    this.isFaceUp=true;
    this.isMathed=true;
  }
}
function generateHTMLForBoardSquare(){
  const numberOfSquare=36;
  let squareHTML=' ';
  for(let i=0; i<numberOfSquare; i++){
    squareHTML+=
    '<div class="col-2 board-square">\n'+
      '<div class="face-container">\n'+
        '<div class="facedown"></div>\n'+
        '<div class="faceup"></div>\n'+
      '</div>\n'+
    '</div>\n';
}
const boardElement=document.getElementById('gameboard');
boardElement.innerHTML=squareHTML;
}
const colorPairs=[];
function genarateColorPairs(){
  if(colorPairs.length>0){
    return colorPairs;
  }
  else{
    for(let i=0; i<16; i++){
      colorPairs.push('color-'+i);
      colorPairs.push('color-'+i);
    }
    return colorPairs;
  }
}
function shuffle(array){
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  while(0 !== currentIndex){
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function shuffleColor() {
    const colorPairs = genarateColorPairs();
    return shuffle(colorPairs);
}
const boardSquare=[];
function setupGame() {
    generateHTMLForBoardSquare();
    const randomColorPairs = shuffleColor();
    const squareElements = document.getElementsByClassName('board-square');
    for(let i=0; i<squareElements.length; i++) {
      const element = squareElements[i];
      const color = randomColorPairs[i];
      const square = new BoardSquare(element, color);
      boardSquare.push(square);
    }
}
setupGame();
let firstFaceUpSquare = null;
function squareFlipped(square){
  if (firstFaceUpSquare === null){
    firstFaceUpSquare = square;
    return;
  }
  if (firstFaceUpSquare.color === square.color){
    firstFaceUpSquare.matchFound();
    square.matchFound();

    firstFaceUpSquare = null;
  } else{
    const a = firstFaceUpSquare;
    const b = square;

    firstFaceUpSquare = null;

    setTimeout(function() {
      a.reset();
      b.reset();
    },400);
  }
}
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click', ()=>{
  resetGame();
  setupGame();
});
function resetGame(){
  firstFaceUpSquare = null;
  boardSquare.forEach((square)=>{
    square.reset()
  });
  setTimeout(()=>{
    const randomColorPairs = shuffleColor();

    for(let i = 0;i<BoardSquare.length;i++){
      const newColor = randomColorPairs[i];
      const square = boardSquare[i];

      square.setcolor(newColor);
    }
  }, 500);
}
