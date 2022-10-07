const boardgame = (()=>{
  let board =["0","1","2","3","4","5","6","7","8"];
  let winner ="no";
  const add =(sign,pos)=>{
    board[pos]=sign;
  }
  const getBoard = () =>{
    return board;
  }
  const getWinner = ()=>{
    return winner;
  }
 
  const cleanBoardandWin = () =>{
    board =["0","1","2","3","4","5","6","7","8"];
    winner ="no";
  }

  const checkWinner =() =>{
    
    if ((board[0]==board[1] && board[0]==board[2])||(board[0]==board[3] && board[0]==board[6])){ 
      winner=board[0];
    }
    if ((board[1]==board[4] && board[1]==board[7])||(board[2]==board[4] && board[2]==board[6])||(board[3]==board[4] && board[3]==board[5])||(board[0]==board[4] && board[0]==board[8])){
      winner=board[4];
    }
    if ((board[2]==board[5] && board[2]==board[8])||(board[6]==board[7] && board[6]==board[8])){
      winner=board[8];
    }    
  }
  return {add,getBoard,cleanBoardandWin,checkWinner, getWinner};
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
let turn = 0;





while(boardgame.getWinner()==="no"){
  currentplayer = players[turn]
  console.log(currentplayer.getName());
  const a =currentplayer.getSign();
  const b =parseInt( prompt("position"))
  boardgame.add(a,b);
  console.log(boardgame.getBoard());
  boardgame.checkWinner();
  turn= (turn+1)%2
}

console.log ("The winner is "+currentplayer.getName())
boardgame.cleanBoardandWin();
console.log("fin");
console.log(boardgame.getBoard());
boardgame.checkWinner();
