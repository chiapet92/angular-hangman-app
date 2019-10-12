var app=angular.module("HangmanApp", []);
app.controller("GameController",['$scope',function($scope, $timeout){
$scope.demo = "somestring"

var words=["rat","cat","bat","mat"];
$scope.incorrectLettersChosen=[];
$scope.correctLettersChosen=[];
$scope.guesses = 6;
$scope.displayWord = '';
$scope.input = {
  letter : ''
}

var selectRandomWord = function() {
  var index = Math.round(Math.random()*words.length);
  return words[index];
}

// Game block
var newGame = function(){
  $scope.incorrectLettersChosen = [];
  $scope.correctLettersChosen=[];
  $scope.guesses = 6;
  $scope.displayWord = '';

  selectedWord = selectRandomWord();
  // console.log(selectedWord);
  var tempDisplayedWord = '';
  for (var i = 0 ; i < selectedWord.length;i++) {
    tempDisplayedWord+= '*';
  }
  $scope.displayWord = tempDisplayedWord;
}

// LetterChosen, passed from other page
$scope.letterChosen = function() {
  // if character already in correct list previously
  for (var i=0; i<$scope.correctLettersChosen.length; i++) {
    if ($scope.correctLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
      $scope.input.letter = "";
      return;
    }
  }
  // if character already in incorrect list previously
  for (var i=0; i<$scope.incorrectLettersChosen.length; i++) {
    if ($scope.incorrectLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
      $scope.input.letter = "";
      return;
    }
  }

  // initialize the state before checking the input letter
  var correct = false;
  for (var i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
      $scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
      correct = true;
    }
  }

  if (correct) {
    $scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
  } else {
    $scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
    $scope.guesses--;
  }
  $scope.input.letter = "";

  // lose condition
  if ($scope.guesses == 0) {
    alert("You lost!");
    $timeout(function() {
      newGame();
    },500);
  }

  // win condition
  if ($scope.displayWord.indexOf("*")==-1) {
    alert("You've won!");
    $timeout(function() {
      newGame();
    },500);
  }
  console.log("working!");

}

newGame();

}])
