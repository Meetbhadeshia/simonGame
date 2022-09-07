
let buttonColors = ["red", "blue", "green", "yellow"];

//to log game pattern in below array
let gamePattern = [];

//to log user clicked pattern in below array
let userClickedPattern = [];

//variable for increasing levels
let level = 0

//variable for starting the game
let started = false

//starts the game when any key is entered
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

//determines next sequence
function nextSequence() {
  userClickedPattern = [];

  level++

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //to animate random chosen color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //to play audio
  playSound(randomChosenColor)

}

//for which button got selected
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  
  userClickedPattern.push(userChosenColor)

  playSound(userChosenColor)

  animatePress(userChosenColor)

  //for checking after every click if answer is equal to the gamePattern
  checkAnswer(userClickedPattern.length-1)

})

function checkAnswer(currentLevel) {
  
  //for checking after every click if answer is equal bit by bit, value by value to the gamePattern
  //gamePattern = [red, yellow]
  //userClickecPattern = [red]
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
    // console.log("success");

    //check if length is same and then proceeds to next sequence
    //gamePattern = [red, yellow]
    //userClickecPattern = [red, yellow]
    if(userClickedPattern.length === gamePattern.length) {
  
      setTimeout( function() {
        nextSequence()
      }, 1000)
      
    }
    

    //for wrong answer
    //gamePattern = [red]
    //userClickecPattern = [green]
    // or
    //gamePattern = [red, yellow] 
    //userClickecPattern = [red, green]
  } else {
    // console.log("wrong");
    
    playSound('wrong')

    $('body').addClass('game-over')
    setTimeout( function() {
      $("body").removeClass('game-over')
    }, 200) 

    $("#level-title").text('Game Over, Press Any Key to Restart')
    startOver()
  }
}

//for restarting game by restarting all variables
function startOver() {
  level = 0
  gamePattern = []
  started = false
}

//for playing sounds
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//for animating press
function animatePress(currentColor) {
  
  $("#" + currentColor).addClass('pressed')

  setTimeout( function() {
    $("#" + currentColor).removeClass('pressed')
  }, 100) 
}