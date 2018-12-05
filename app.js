/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let playerCurrentSum = 0;
let playerTotalSum = 0;
let continueGame =true;
let currentPlayer=0;
let randomNumber1;
let randomNumber2;

let scoreGoal = 10;
let numberOfGames = 1;
let numberOfGamePlayer0=0;
let numberOfGamePlayer1=0;

document.getElementById("gamepoint-0").textContent=`Round of game : ${numberOfGamePlayer0} / ${numberOfGames}`;
document.getElementById("scoreGoal-0").textContent=`Score to win : ${scoreGoal}`;
document.getElementById("gamepoint-1").textContent=`Round of game : ${numberOfGamePlayer1} / ${numberOfGames}`;
document.getElementById("scoreGoal-1").textContent=`Score to win : ${scoreGoal}`;


const diceButton = document.querySelector('button.btn-roll');  //Event for rolling dice and get nunmbers 
  diceButton.addEventListener("click", rollDice)  

const holdButton = document.querySelector('button.btn-hold');   //Event for holding  current score  
  holdButton.addEventListener("click", holdScore);

const resetButton = document.querySelector('button.btn-new');   //Reset the game
  resetButton.addEventListener("click", resetGame);

const ruleButton = document.querySelector('button.btn-rules');   //popup rules

const settingButton = document.querySelector('button.btn-setting');   //setting game

settingButton.addEventListener("click", function(){

  (async function getFormValues () {
    const {value: formValues} = await swal({
      title: 'Game Setting',
      html:`<div>Input number of score to Win : <div>`+
        `<input id="swal-input1" class="swal2-input" placeholder ="Set number of score Goal" value="${scoreGoal}" >` +
        `<div>Input number of round to win : <div>`+
        `<input id="swal-input2" class="swal2-input" placeholder ="Set number of games" value="${numberOfGames}" >`,
      focusConfirm: false,
      footer :' Make sure Number only!',
      preConfirm: () => {
        return [
          scoreGoal = parseInt(document.getElementById('swal-input1').value),
          numberOfGames = parseInt(document.getElementById('swal-input2').value),
          document.getElementById("gamepoint-0").textContent=`Round of game : ${numberOfGamePlayer0} / ${numberOfGames}`,
          document.getElementById("scoreGoal-0").textContent=`Score to win : ${scoreGoal}`,
          document.getElementById("gamepoint-1").textContent=`Round of game : ${numberOfGamePlayer1} / ${numberOfGames}`,
          document.getElementById("scoreGoal-1").textContent=`Score to win : ${scoreGoal}`
        ]
      }
    })
        
    })()

});

ruleButton.addEventListener("click", function () {
    swal({
      type: '',
      title: ``,
      allowEnterKey: true,
      html: `GAME RULES :
      <ol>
      <li>The game has 2 players, playing in rounds</li>     
      <li>In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score</li>      
      <li>BUT, if the player rolls a 1, all his ROUND score gets lost. and rolls both are a1, you lost everything you got. After that, it's the next player's turn</li>      
      <li>The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn</li>
      <li>The first player to reach the round wins the game.</li>
      </ol> `,
      footer: ''
    })
    
  });
  

function rollDice () {   //Rell the dices and get random numbers   

  if (currentPlayer == "0" || currentPlayer == "1") {
    if (continueGame) {

      let diceImage1 = document.querySelector("img.dice1")
      let diceImage2 = document.querySelector("img.dice2")

      randomNumber1 = Math.floor(Math.random() * 6) + 1;  // get random number 1 for dice imaged
      randomNumber2 = Math.floor(Math.random() * 6) + 1;  // get random number 1  
   
   
      diceImage1.src = `dice-${randomNumber1}.png`;
      diceImage2.src = `dice-${randomNumber2}.png`;
    

      let checkDice = CurrentDiceNumberCheck (randomNumber1, randomNumber2); // Call function to check get return
      let playerCurrent = document.getElementById(`current-${currentPlayer}`) // Sellect current score position
      let playerTotal= document.getElementById(`score-${currentPlayer}`) // Sellect total score 

     
        if (checkDice === 1) {        //Reset 0 if dice is 1, CurrentSum is 0 
          playerCurrentSum = 0;
          playerCurrent.textContent = playerCurrentSum;  
          changePlayer ();
        } else if (checkDice === 2) {   //Reset 0 if both dices are  1, CurrentSum and Totalsum are 0 
          playerCurrentSum = 0;
          playerTotalSum = 0;

          playerCurrent.textContent = playerCurrentSum;
          playerTotal.textContent = playerTotalSum;
          changePlayer ();
        } else {                      //  CurrentSum is iterated  and update current score            
          playerCurrentSum = playerCurrentSum + (randomNumber1 + randomNumber2);
          playerCurrent.textContent = playerCurrentSum;
        }        
    }  
    
  }    
}

function CurrentDiceNumberCheck (num1, num2) {   // Check the dices whether include one : return reset all or  currentSum 
  let reset;
  if (num1 == "1" && num2 == "1") {
      reset = 2;    
      swal({
        type: 'error',
        title: `Sorry, You rolled both dices a 1, lose all your score `,
        text: '',
        footer: 'Do you want to know the game rule? click HELP button'
      })

      return reset; 
  } else if (num1 == "1" || num2 == "1"){
      reset = 1;
      swal({
        type: 'error',
        title: `Sorry, You rolled dice a 1, lose your current score`,
        text: '',
        footer: 'Do you want to know the game rule? click HELP button'
      })
      return reset; 
  } else {
      reset = 0;
      return reset; 
  }
}

function holdScore()  { //save current sum to Total 
  if (continueGame) {
     
    let playerTotalSum = document.getElementById(`score-${currentPlayer}`).innerHTML; // Get player total  scores     
    playerTotalSum = parseInt(playerTotalSum) + parseInt(playerCurrentSum)

    let totalScore = document.getElementById(`score-${currentPlayer}`); // Save current score to totals 
    totalScore.textContent = playerTotalSum;
      
  
    if (playerTotalSum >= scoreGoal) {  

      if (currentPlayer === 0 ) {
        numberOfGamePlayer0 =numberOfGamePlayer0 + 1;
        document.getElementById("gamepoint-0").textContent=`Round of game : ${numberOfGamePlayer0} / ${numberOfGames}`
          swal({
            type: '',
            title: `You get +1 round point`,
            text: '',
            footer: ''
          })

          document.getElementById('current-0').textContent="0"; 
          document.getElementById('score-0').textContent="0"; 
          document.getElementById('current-1').textContent="0"; 
          document.getElementById('score-1').textContent="0"; 
          playerCurrentSum = 0;
          playerTotalSum = 0;


      } else {
        numberOfGamePlayer1 =numberOfGamePlayer1 + 1;
        document.getElementById("gamepoint-1").textContent=`Round of game : ${numberOfGamePlayer1} / ${numberOfGames}`
        swal({
          type: '',
          title: `You get +1 round point`,
          text: '',
          footer: ''
        })

        document.getElementById('current-0').textContent="0"; 
        document.getElementById('score-0').textContent="0"; 
        document.getElementById('current-1').textContent="0"; 
        document.getElementById('score-1').textContent="0"; 
        playerCurrentSum = 0;
        playerTotalSum = 0;

      }
            
      
       if (numberOfGames === numberOfGamePlayer0 || numberOfGames === numberOfGamePlayer1) {
          swal({
           type: 'success',
           title: `Player${parseInt(currentPlayer)+1} Wins the game`,
           text: '',
           footer: ''
           })
           continueGame =false;      
        }
     
    }
    changePlayer()        
  }
}; 

  function resetGame () {    // Reset the game
    document.getElementById("name-0").innerHTML= "Player 1";
    document.getElementById("name-1").innerHTML= "Player 2";
    document.getElementById("current-0").innerHTML=0;
    document.getElementById("score-0").innerHTML=0;
    document.getElementById("current-1").innerHTML=0;
    document.getElementById("score-1").innerHTML=0;
    continueGame =true;
    currentPlayer ="1"    // Assign player1 is 0 , player 2  is 1 
    playerCurrentSum = 0;
 
    numberOfGamePlayer0=0;
    numberOfGamePlayer1=0;

    document.getElementById("gamepoint-0").textContent=`Round of game : ${numberOfGamePlayer0} / ${numberOfGames}`,
    document.getElementById("gamepoint-1").textContent=`Round of game : ${numberOfGamePlayer1} / ${numberOfGames}`

    changePlayer()
  }

function changePlayer() {
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  
  if (document.getElementsByClassName('player-0-panel active').length > 0  ) {
    currentPlayer = 0;
  } else {
    currentPlayer = 1;
  }
  playerCurrentSum = 0;
}
