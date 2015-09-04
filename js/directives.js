app.directive('gameBoard', function(){
	return{
		restrict: 'E',
		scope:{
			board: '='
		},
		templateUrl: '/templates/gameBoard.html'
	};
});

app.directive('gameBoardBigSquare', function(){
	return{
		restrict: 'E',
		scope:{
			board: '=',
			squareNum: '='
		},
		templateUrl: '/templates/gameBoardBigSquare.html'
	};
});

app.directive('gameBoardSpace', function(){
	return{
		restrict: 'E',
		scope:{
			board: '=',
			square: '=',
			index: '=',
			isValid: '@'
		},
		controller: 'mySudokuCtrl',
		templateUrl: '/templates/gameBoardSpace.html',
		link: function(scope){
			console.log(scope.isValid);
		}
	};
});



app.directive('navButton', function(){
	return{
		restrict: 'E',
		templateUrl: '/templates/navButton.html'
	};
});

app.directive('textDisplay', function(){
	return{
		restrict: 'E',
		scope:{
			info: '@'
		},
		templateUrl: '/templates/textDisplay.html'
	};
});