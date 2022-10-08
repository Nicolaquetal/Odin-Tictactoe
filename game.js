const cas0 = document.getElementById("case0");
const cas1 = document.getElementById("case1");
const cas2 = document.getElementById("case2");
const cas3 = document.getElementById("case3");
const cas4 = document.getElementById("case4");
const cas5 = document.getElementById("case5");
const cas6 = document.getElementById("case6");
const cas7 = document.getElementById("case7");
const cas8 = document.getElementById("case8");
const cases= [cas0,cas1,cas2,cas3,cas4,cas5,cas6,cas7,cas8];

const bigcase = document.querySelectorAll(".case");
let turn = 0;

const boardgame = (()=>{
  
  let board =["0","1","2","3","4","5","6","7","8"];
  let winner ="no";
  let turnCounter =0;

  const add =(sign,pos)=>{
    board[pos]=sign;
    
  }
  const getBoard = () =>{
    return board;
  }
  const getWinner = ()=>{
    return winner;
  }

  const addtoboard = (sign,curdiv)=>{
    const ca = document.createElement('div');
    ca.classList.add('removable');
    var newContent = document.createTextNode(sign);
    ca.appendChild(newContent);
    curdiv.appendChild(ca);
  }
 
  const cleanBoardandWin = () =>{
    board =["0","1","2","3","4","5","6","7","8"];
    winner ="no";
    const err = document.querySelectorAll('.removable');
    err.forEach((z)=>{z.remove();}) 
  }

  const checkWinner =() =>{
    
    if ((board[0]==board[1] && board[0]==board[2])||(board[0]==board[3] && board[0]==board[6])){ 
      winner=board[0]; 
    }
    else if ((board[1]==board[4] && board[1]==board[7])||(board[2]==board[4] && board[2]==board[6])||(board[3]==board[4] && board[3]==board[5])||(board[0]==board[4] && board[0]==board[8])){
      winner=board[4]; 
    }
    else if ((board[2]==board[5] && board[2]==board[8])||(board[6]==board[7] && board[6]==board[8])){
      winner=board[8];
    }
    else{
      turnCounter+=1;
      if (turnCounter == 9) {winner = "Egality";};
    }    
  }
  return {add,getBoard,cleanBoardandWin,checkWinner, getWinner , addtoboard};
})();


const player = (Playername, Playersign) =>{
  let score = 0;
  const getName  = () => Playername;
  const getSign = () => Playersign;
  const getScore = () => score;
  const resetScore = () => { score = 0;};
  return {getName, getScore, getSign, resetScore};
}

const player1 = player("Xavier" , "X" );
const player2 = player("Olivier" , "O");
const players = [player1,player2];
let currentplayer = players[turn];



bigcase.forEach(c => c.addEventListener('click',(e)=>{
  const pos= parseInt(e.target.id[4]);
  const currentdiv = e.target;
  boardgame.add(currentplayer.getSign(),pos)
  boardgame.addtoboard(currentplayer.getSign(),currentdiv)
  boardgame.checkWinner();
  if (boardgame.getWinner()==="no"){
    turn =(turn+1)%2
    currentplayer = players[turn];
  }
  else{
    boardgame.getWinner()==="Egality" ? console.log("Egality") : console.log ("The winner is "+currentplayer.getName());
    boardgame.cleanBoardandWin();
    console.log("fin");

  }
  
  }))


