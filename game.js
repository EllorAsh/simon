var gamePattern =[];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level =0;
var hasStarted = false;

$("body").on("keydown", function () {
    if(hasStarted ===false){
      nextSequence();  
      hasStarted = true;
    }
})


function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
  }
  
  $(".btn").on("click", function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.indexOf(userChosenColour));
  });

  function playSound(name){
    let audioFile = new Audio("sounds/"+name+".mp3");
    audioFile.play();
  }

  function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern =[];
            }, 1000);
        }
    }else if(userClickedPattern[currentLevel] !== gamePattern[currentLevel]){
        let audioFile = new Audio("sounds/wrong.mp3");
        audioFile.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart!");
        startOver();
    }
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    hasStarted = false;
  }