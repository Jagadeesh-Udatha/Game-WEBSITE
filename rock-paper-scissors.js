     let score = JSON.parse(localStorage.getItem('score'));
        
        if(score === null) {
          score = {
            Wins:0,
            Loses:0,
            Ties:0
          };
        }
       updateScoreElement();

       
        function pickComputerMove() {
          
          let computerMove = '';
          const randomNumber = Math.random();
          if(randomNumber >= 0 && randomNumber < 1/3 ) {
            computerMove = 'rock';
          } else if(randomNumber >= 1/3 && randomNumber < 2/3) {
            computerMove = 'paper';
          } else if(randomNumber >=2/3 && randomNumber < 1) {
            computerMove = 'scissors';
          }
          return computerMove;
        }

        function printDelay() {
          let count = 5;
          const time = setInterval(()=> {
            console.log(count);
            document.querySelector('.js-timer').innerHTML= `Game Starts in  ${count} Seconds `
            count--;
            if(count === 0) {
              clearInterval(time);
              
            }
          },1000);
        }
        let isAutoPlaying = false;
        let intervalId;

        function autoPlay() {
            
            if(!isAutoPlaying) {
              printDelay();
              setTimeout(()=> {
                intervalId = setInterval(function() {
                  const playerMove = pickComputerMove();
                  playGame(playerMove);
                  document.querySelector('.js-timer').innerHTML= `Game is in Auto Play Mode`;
                },1000);
              },5000);
              
              isAutoPlaying = true;
            } else {
              clearInterval(intervalId);
              document.querySelector('.js-timer').innerHTML='';
              isAutoPlaying = false;
            }
        }
        document.querySelector(".js-rock-button").addEventListener('click', () => {
          playGame('rock');
        });

        document.querySelector(".js-paper-button").addEventListener('click', () => {
          playGame('paper');
        });

        document.querySelector(".js-scissors-button").addEventListener('click', () => {
          playGame('scissors');
        });

        document.querySelector(".js-reset-button").addEventListener('click', () => {
          score.Wins = 0,
          score.Loses = 0, 
          score.Ties = 0
          localStorage.removeItem('score');
          updateScoreElement();
          eraseData();
        });

        document.querySelector(".js-autoplay-button").addEventListener('click', () => {
          autoPlay();
        });


        document.body.addEventListener('keydown', (event) => {
           if(event.key === 'r') {
            playGame('rock');
           } else if(event.key === 'p') {
            playGame('paper');
           } else if(event.key === 's') {
            playGame('scissors');

           }
    
        })
       
        let winStreak =JSON.parse(localStorage.getItem('winStreak'));;
        let highestScore = JSON.parse(localStorage.getItem('highestScore'));
        
        
        function playGame(playerMove) {
          if(winStreak >= highestScore) {
            highestScore= winStreak;
          } 
          const computerMove  = pickComputerMove();
          let result ='';
          if(playerMove === 'rock') {
            if(computerMove === 'rock') {
              result = 'Tie';
            } else if(computerMove === 'paper') {
              result = 'You lose';
            } else if(computerMove === 'scissors') {
              result = 'You win';
            }
          } else if(playerMove === 'paper') {
              if(computerMove === 'rock') {
                result = 'You win';
              } else if(computerMove === 'paper') {
                result = 'Tie';
              } else if(computerMove === 'scissors') {
                result = 'You lose';
              }
             
          } else if(playerMove = 'scissors') {
              if(computerMove === 'rock') {
                result = 'You lose';
              } else if(computerMove === 'paper') {
                result = 'You win';
              } else if(computerMove === 'scissors') {
                result = 'Tie';
              }
          }
          
          if(result === 'You win') {
            score.Wins +=1;
            winStreak+=1;
          } else if(result === 'You lose') {
            score.Loses +=1;
            winStreak=0;
          } else if(result === 'Tie') {
            score.Ties +=1;
            winStreak = 0;
          }
          document.querySelector(".js-win-streak").innerHTML = `Win Streak: ${winStreak}`;
          document.querySelector('.js-highest-score').innerHTML = `Highest Score: ${highestScore}`;
          localStorage.setItem('highestScore', JSON.stringify(highestScore));
          localStorage.setItem('winStreak', JSON.stringify(winStreak));

          localStorage.setItem('score', JSON.stringify(score));
          updateScoreElement();
          
          document.querySelector('.js-result').innerHTML = result;

          document.querySelector('.js-moves').innerHTML = `You
         <img src = "${playerMove}-emoji.png" class = "move-icon">
         <img src = "${computerMove}-emoji.png"class = "move-icon">
         Computer`;
          
        }

        function eraseData() {
          document.querySelector('.js-result').innerHTML = '';

          document.querySelector('.js-moves').innerHTML = '';
        } 


        function updateScoreElement() {
          document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, loses: ${score.Loses}, Ties: ${score.Ties}`;
       
        }

        function backHome() {
          setTimeout(() => {
            window.location.href="index.html";
          }, 500);
        }

        let notClick = false;
        function giveInstructions() {
          if(!notClick) {
            document.querySelector('.js-instruct').innerHTML= 
          `<li>Press 'R' to select Rock </li>
          <li>Press 'P' to select Paper </li>
          <li>Press 'S' to select Scissors</li>`
          notClick = true;

          }
          else {
            document.querySelector('.js-instruct').innerHTML = "Tap to see instructions";
            notClick=false;
          }
        }