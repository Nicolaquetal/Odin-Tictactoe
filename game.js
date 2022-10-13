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
    const raiseScore = (score) => {score+= 1;}
    const resetScore = () => { score = 0;};
    return {getName, getScore, getSign, resetScore, raiseScore};
}

const round = (()=>{
    const bigcase = document.querySelectorAll(".case");
    const playRoundPVP = (players,turn) =>{
        boardgame.cleanBoardandWin();
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
            else if (boardgame.getWinner()==="Egality"){
                console.log("Egality");

            }
            else {
                currentplayer.raiseScore();
                console.log ("The winner is "+currentplayer.getName());
            }
            }))
    }
    const playRoundPVE = (players,turn)=>{
        boardgame.cleanBoardandWin();
        let currentplayer = players[turn];
        if(currentplayer==player2){
            AI.playAIturn(boardgame.getBoard());
            currentplayer=player1;
          }
        bigcase.forEach(c => c.addEventListener('click',(e)=>{
            if (currentplayer==player1){
                const pos= parseInt(e.target.id[4]);
                const currentdiv = e.target;
                boardgame.add(player1.getSign(),pos)
                boardgame.addtoboard(player1.getSign(),currentdiv)
                boardgame.checkWinner();
                if (boardgame.getWinner()==="no"){
                    turn =(turn+1)%2
                    currentplayer = players[turn];
                    AI.playAIturn(boardgame.getBoard());
                    boardgame.checkWinner();
                    if (boardgame.getWinner()==="no"){
                        turn =(turn+1)%2
                        currentplayer = players[turn];
                    }
                    else if (boardgame.getWinner()==="Egality"){
                        console.log("Egality");
                    }
                    else {
                        currentplayer.raiseScore();
                        console.log ("The winner is "+currentplayer.getName());
                    }
                }
                else if (boardgame.getWinner()==="Egality"){
                    console.log("Egality");
                }
                else {
                    currentplayer.raiseScore();
                    console.log ("The winner is "+currentplayer.getName());
                }
            }
        }))
    }
    return {playRoundPVE, playRoundPVP};
})();

const AI = (() =>{
    const playAIturn = (currentboardgame)=>{
        z = StrategyAI1(currentboardgame);
        const currentdiv2 = document.getElementById("case"+z);
        boardgame.add(player2.getSign(),z);
        boardgame.addtoboard(player2.getSign(),currentdiv2); 
    }
    const StrategyAI1 = (currentboardgame)=>{
        let played = 0;
        let result =0;
        let i =0;
        while(played===0){
            if(currentboardgame[i]!=="X" &&currentboardgame[i]!=="O" ){
                result = i;
                played = 1;
            }
            else{
                i+=1;
            }
        }
        return result;
    }
    return {playAIturn};
})();

let turn = 0;
const player1 = player("Xavier" , "X" );
const player2 = player("Olivier" , "O");
const players = [player1,player2];
round.playRoundPVE(players,0);