const boardgame = (()=>{
    let board =["0","1","2","3","4","5","6","7","8"];
    let winner ="no";
    let turnCounter =0;
  
    const add =(sign,pos)=>{
      if(board[pos]!="X" &&board[pos]!="O"){
      board[pos]=sign;}
      
    }
    const getBoard = () =>{
      return board;
    }
    const getWinner = ()=>{
      return winner;
    }
  
    const addtoboard = (sign,curdiv)=>{
      if (curdiv.childNodes.length == 0){
        const ca = document.createElement('div');
        ca.classList.add('removable');
        var newContent = document.createTextNode(sign);
        ca.appendChild(newContent);
        curdiv.appendChild(ca);}
    }
   
    const cleanBoardandWin = () =>{
      board =["0","1","2","3","4","5","6","7","8"];
      winner ="no";
      turnCounter =0;
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
        console.log("turnecounter "+turnCounter)
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
    const raiseScore = () => {score+= 1;}
    const resetScore = () => { score = 0;};
    return {getName, getScore, getSign, resetScore, raiseScore};
}

const round = (()=>{
    const bigcase = document.querySelectorAll(".case");
    const playRoundPVP = (players,firstP,Nbround) =>{
        boardgame.cleanBoardandWin();
        let Inplay=true;
        let firstRounP=firstP;
        let turn=firstP;
        let currentRound=0;
        display.displayRound(currentRound+1,Nbround);
        let currentplayer = players[firstP];
        bigcase.forEach(c => c.addEventListener('click',(e)=>{
          if(currentRound<Nbround){
            const pos= parseInt(e.target.id[4]);
            const currentdiv = e.target;
            if(e.target.classList =="removable" ){
              Inplay=false;
              
            }
            else{
              boardgame.add(currentplayer.getSign(),pos)
              boardgame.addtoboard(currentplayer.getSign(),currentdiv)
              Inplay=true;
              boardgame.checkWinner();
            }
            
            if (boardgame.getWinner()==="no"){
                turn =(turn+1)%2
                currentplayer = players[turn];
            }
            else if (boardgame.getWinner()==="Egality"){
                let result ="Egality";
                currentRound +=1
                firstRounP=(firstP+currentRound%2)%2;
                turn=firstRounP;
                currentplayer = players[turn];
                if(currentRound==Nbround){
                  
                  display.displayEndGameMenu(players[0].getScore(),players[1].getScore(),players[0].getName(),players[1].getName());
                }
                else{
                  display.displayEndRoundMenu(result,0," ");
                  display.displayRound(currentRound+1,Nbround);
                }
            }
            else {
                currentplayer.raiseScore();
                display.displayScore(players[0].getScore(),players[1].getScore())
                let result ="The winner is "+currentplayer.getName();
                currentRound +=1
                firstRounP=(firstP+currentRound%2)%2;
                turn=firstRounP;
                currentplayer = players[turn];
                if(currentRound==Nbround){
                  
                  display.displayEndGameMenu(players[0].getScore(),players[1].getScore(),players[0].getName(),players[1].getName());

                }
                else{
                  display.displayEndRoundMenu(result,0," ");
                  display.displayRound(currentRound+1,Nbround);
                }
                
            }
          }
        }))
      
    }
    const playRoundPVE = (players,firstP,Nbround,AIlevel)=>{
      
        boardgame.cleanBoardandWin();
        let Inplay=true;
        let firstRounP=firstP;
        let turn=firstP;
        let currentRound=0;
        display.displayRound(currentRound+1,Nbround);
        let currentplayer = players[firstP];
        if(firstRounP== 1 && currentRound==0){
          console.log("if1");
          AI.playAIturn(boardgame.getBoard(),players[turn],AIlevel);
          
          turn =0;
          currentplayer = players[turn];
          console.log("aapres 1 tour AI " +boardgame.getBoard())
          }
        
        bigcase.forEach(c => c.addEventListener('click',(e)=>{
          
          if (currentRound<Nbround){
              
              
                const pos= parseInt(e.target.id[4]);
                const currentdiv = e.target;
                if(e.target.classList =="removable" ){
                  Inplay=false;
                  /*display.displayCaseOccupied();*/
                  
                }
                else{
                  boardgame.add(players[0].getSign(),pos)
                  boardgame.addtoboard(players[0].getSign(),currentdiv)
                  Inplay=true;
                  boardgame.checkWinner();
                }
              
              
              if (boardgame.getWinner()==="no" && Inplay){
                
                  turn =(turn+1)%2 
                  currentplayer = players[turn];
                  
                  AI.playAIturn(boardgame.getBoard(),players[turn],AIlevel);
                  if (boardgame.getWinner()==="no"){
                      turn =(turn+1)%2
                      currentplayer = players[turn];
                  }
                  else if (boardgame.getWinner()==="Egality"){
                    let result ="Egality";
                    currentRound +=1
                    firstRounP=(firstP+currentRound%2)%2;
                    turn=firstRounP;
                    currentplayer = players[turn];
                    if(currentRound==Nbround){
                      display.displayEndGameMenu(players[0].getScore(),players[1].getScore(),players[0].getName(),players[1].getName());
                    }
                    else{
                      if((currentRound%2==0 && firstP==1)||(currentRound%2==1 && firstP==0)){
                        display.displayEndRoundMenu(result,1,players[1])
                        turn+=1
                      }
                      else{
                        display.displayEndRoundMenu(result,0," ");
                      }
                      display.displayRound(currentRound+1,Nbround);
                    }
                      
                  }
                  else {
                    currentplayer.raiseScore();
                    display.displayScore(players[0].getScore(),players[1].getScore())
                    let result ="The winner is "+currentplayer.getName();
                    currentRound +=1
                    firstRounP=(firstP+currentRound%2)%2;
                    turn=firstRounP;
                    currentplayer = players[turn];
                    if(currentRound==Nbround){
                      
                      display.displayEndGameMenu(players[0].getScore(),players[1].getScore(),players[0].getName(),players[1].getName());

                    }
                    else{
                      if((currentRound%2==0 && firstP==1)||(currentRound%2==1 && firstP==0)){
                        display.displayEndRoundMenu(result,1,players[1])
                        turn+=1
                      }
                      else{
                        display.displayEndRoundMenu(result,0," ");
                      }
                      display.displayRound(currentRound+1,Nbround);
                    }
                  }
              }
              else if (boardgame.getWinner()==="Egality" && Inplay){
                let result ="Egality";
                currentRound +=1
                firstRounP=(firstP+currentRound%2)%2;
                turn=firstRounP;
                currentplayer = players[turn];
                if(currentRound==Nbround){
                  
                  display.displayEndGameMenu(players[0].getScore(),players[1].getScore(),players[0].getName(),players[1].getName());
                }
                else{
                  if((currentRound%2==0 && firstP==1)||(currentRound%2==1 && firstP==0)){
                    display.displayEndRoundMenu(result,1,players[1])
                    turn+=1
                  }
                  else{
                    display.displayEndRoundMenu(result,0," ");
                  }
                  display.displayRound(currentRound+1,Nbround);
                }
              }
              else if(Inplay){
                currentplayer.raiseScore();
                display.displayScore(players[0].getScore(),players[1].getScore())
                let result ="The winner is "+currentplayer.getName();
                currentRound +=1
                firstRounP=(firstP+currentRound%2)%2;
                turn=firstRounP;
                currentplayer = players[turn];
                if(currentRound==Nbround){
                  
                  display.displayEndGameMenu(players[0].getScore(),players[1].getScore(),players[0].getName(),players[1].getName());

                }
                else{
                  if((currentRound%2==0 && firstP==1)||(currentRound%2==1 && firstP==0)){
                    display.displayEndRoundMenu(result,1,players[1])
                    turn+=1
                  }
                  else{
                    display.displayEndRoundMenu(result,0," ");
                  }
                  display.displayRound(currentRound+1,Nbround);
                }
              }
          }
        }))
    }
    return {playRoundPVE, playRoundPVP};
})();

const AI = (() =>{
    const playAIturn = (currentboardgame,player2,AIlevel)=>{
        let z = 0;
        switch(AIlevel){
          case 1:
            z = StrategyAI1(currentboardgame);
            break;
          case 2:
            z = StrategyAI2(currentboardgame);
            break;
          case 3:
            z = StrategyAI3(currentboardgame);
            break;  
        }
        const currentdiv2 = document.getElementById("case"+z);
        boardgame.add(player2.getSign(),z);
        boardgame.addtoboard(player2.getSign(),currentdiv2); 
        boardgame.checkWinner()
    }
    const checkLine =(a,b,c,y,z)=>{
      if(a==y &&b==y&& c !=z){return 2;}
      else if(a==y&& b!=z &&c==y){return 1;}
      else if (a!=z && b==y &&c==y){return 0;}
      else {return-1;}
    }
    const boardLines = ()=>{
      return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    }
    
    const getBoardFreeCases =(currentboardgame)=>{
      let freeCase=[];
      for(i=0;i<9;i++){
        if(currentboardgame[i]!=="X" &&currentboardgame[i]!=="O" ){
          freeCase.push(i);
        }
      }
      return freeCase;
    }
    const StrategyAI1 = (currentboardgame)=>{
      let freeCase = getBoardFreeCases(currentboardgame);
      return freeCase[Math.floor(Math.random() * freeCase.length)];
    }
    
    const StrategyAI2 = (currentboardgame)=>{
      let lines=boardLines();
      for(i=0;i<8;i++){
          canIwin=checkLine(currentboardgame[lines[i][0]],currentboardgame[lines[i][1]],currentboardgame[lines[i][2]],"O","X")
          if (canIwin != -1) {return lines[i][canIwin];}
      }
      for(i=0;i<8;i++){
        canInotLose=checkLine(currentboardgame[lines[i][0]],currentboardgame[lines[i][1]],currentboardgame[lines[i][2]],"X","O")
        if (canInotLose != -1) {return lines[i][canInotLose];}
      } 
      let freeCase = getBoardFreeCases(currentboardgame);
      return freeCase[Math.floor(Math.random() * freeCase.length)];
    }

    const StrategyAI3 = (currentboardgame)=>{
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

const game = (()=>{

  const launchGame = (nameP1,nameP2, type, firstP, Nbround,AIlevel)=>{
    let turn = firstP;
    const player1 = player(nameP1, "X");
    const player2 = player(nameP2, "O");
    const players = [player1,player2];
    players[0].resetScore();
    players[1].resetScore();
    display.displayScore(players[0].getScore(),players[1].getScore())
    if(type==="PVP"){
      round.playRoundPVP(players,turn, Nbround);
    }
    else{
      round.playRoundPVE(players,turn, Nbround,AIlevel);
    }
  }
 
return{launchGame}
})();


const display = (()=>{

  const displayMainMenu = ()=>{
    let typeSelected ="PVP";
    let firstPlayer=0;
    let AIlevel=1;
    const menuBTN = document.querySelector(".menu");
    menuBTN.addEventListener('click',openForm)
    const closeBTN = document.querySelector(".closeMenu");
    closeBTN.addEventListener('click',closeForm)
    const radioPVE = document.querySelector("#PVE")
    radioPVE.addEventListener('change',PVEchecked)
    const radioPVP = document.querySelector("#PVP")
    radioPVP.addEventListener('change',PVEunchecked)
    const playBTN = document.querySelector("#play");
    playBTN.addEventListener('click',play)
    const radioP1 = document.querySelector("#P1")
    radioP1.addEventListener('change',()=>{firstPlayer=0})
    const radioP2 = document.querySelector("#P2")
    radioP2.addEventListener('change',()=>{firstPlayer=1})

    const level1 = document.querySelector("#one")
    level1.addEventListener('change',()=>{AIlevel=1})
    const level2 = document.querySelector("#two")
    level2.addEventListener('change',()=>{AIlevel=2})
    const level3 = document.querySelector("#three")
    level3.addEventListener('change',()=>{AIlevel=3})
    

    function play (){
      boardgame.cleanBoardandWin();
      const name1 = document.querySelector("#p1").value
      const name2 = document.querySelector("#p2").value
      /*const firstp = document.querySelector("#p2").value*/
      const roundnb = document.querySelector("#rounds").value
      displayName(name1,name2);
      game.launchGame(name1,name2 ,typeSelected,firstPlayer,roundnb,AIlevel);
      document.querySelector(".form").style.display = "none"; 
    }

    function openForm() {
      document.querySelector(".form").style.display = "flex";   
    }
    function closeForm() {
      document.querySelector(".form").style.display = "none";  
    }
    function PVEchecked(){
      document.querySelector(".levelAI").style.display = "flex";
      document.querySelector("#p2").value="AI"
      typeSelected ="PVE";
    }
    function PVEunchecked(){
      document.querySelector(".levelAI").style.display = "none";
      document.querySelector("#p2").value= ""
      typeSelected ="PVP";
    }
  }
  const displayEndRoundMenu = (result,AIbegin,player)=>{
    document.querySelector(".resultatRound").textContent=result;
    document.querySelector(".endRoundMenu").style.display = "flex";
    const menuBTNRound = document.querySelector("#btnround");
    menuBTNRound.addEventListener('click',()=>{
      boardgame.cleanBoardandWin();
      document.querySelector(".endRoundMenu").style.display = "none";
      AIbegin == 1 ? AI.playAIturn(["0","1","2","3","4","5","6","7","8"],player):console.log('');
    })
  }

  const displayEndGameMenu = (P1score,P2score,P1name,P2name)=>{
    let result="Egality";
    if(P1score>P2score){result="The winner is "+P1name};
    if(P1score<P2score){result="The winner is "+P2name}
    document.querySelector(".resultatGame").textContent=result;
    document.querySelector(".endGameMenu").style.display = "flex";
    const menuBTNRound = document.querySelector("#btngame");
    menuBTNRound.addEventListener('click',()=>{
      boardgame.cleanBoardandWin();
      document.querySelector(".endGameMenu").style.display = "none";})
  }
  const displayCaseOccupied = ()=>{
    document.querySelector(".CaseOccupied").style.display = "flex";
    const menuCaseOccupied = document.querySelector("#CaseOccupied");
    menuCaseOccupied.addEventListener('click',()=>{
      
      document.querySelector(".CaseOccupied").style.display = "none";})

  }

  const displayName = (name1,name2) =>{
    document.querySelector("#nameP1").textContent=name1;
    document.querySelector("#nameP2").textContent=name2;
  }
  const displayScore =(score1,score2)=>{
    document.querySelector("#scoreP1").textContent=score1;
    document.querySelector("#scoreP2").textContent=score2; 
  }
  const displayRound =(currentRound,Nbround)=>{
    document.querySelector("#roundcount").textContent="ROUND" +currentRound+"/"+Nbround;
  }
  return {displayMainMenu,displayEndRoundMenu,displayEndGameMenu,displayName,displayScore,displayRound,displayCaseOccupied}
})(); 
display.displayMainMenu();

/*game.launchGame("Xavier","Olivier" ,"PVP",0,2);*/


/*
let turn = 1;
const player1 = player("Xavier" , "X" );
const player2 = player("Olivier" , "O");
const players = [player1,player2];
round.playRoundPVE(players,turn);*/