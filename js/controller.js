app.controller("mySudokuCtrl", function($scope) {
	
	$scope.board = ['1','2','3','4','5','6','7','8','9',
					'2','3','4','5','6','7','8','9','1',
					'3','4','5','6','7','8','9','1','2',
					'4','5','6','7','8','9','1','2','3',
					'5','6','7','8','9','1','2','3','4',
					'6','7','8','9','1','2','3','4','5',
					'7','8','9','1','2','3','4','5','6',
					'8','9','1','2','3','4','5','6','7',
					'9','1','2','3','4','5','6','7','8'];
	
	
	$scope.getPuzzle = function(difficulty){

		//This will be used for reformatting the imported puzzle.  The first sub array value represents the numeric value
		//at the space when the puzzle is imported.  The second sub array value represents whether or not the value is
		//modifiable.  (i.e. You don't want the user to be able to change the given values in the puzzle)
		temp = [['4', false],['', true],['9', false],['8', false],['', true],['5', false],['', true],['', true],['1', false],
				['', true],['', true],['5', false],['', true],['', true],['4', false],['',true],['6', false],['9', false],
				['2', false],['6',false],['', true],['', true],['9', false],['7', false],['', true],['', true],['4',false],
				['', true],['9', false],['8', false],['5', false],['', true],['', true],['', true],['', true],['', true],
				['3', false],['', true],['', true],['', true],['', true],['', true],['', true],['', true],['6', false],
				['', true],['', true],['',true],['', true],['', true],['3',false],['7',false],['8', false],['', true],
				['9', false],['', true],['', true],['7', false],['4', false],['', true],['', true],['8',false],['6',false],
				['4',false],['2',false],['',true],['6',false],['', true],['',true],['5',false],['',true],['',true],
				['8', false],['', true],['',true],['9',false],['',true],['5',false],['3',false],['',true],['2', false]];
		
		//Generate easy puzzle
		if(difficulty == 1){
			$scope.board = ['4','','9','8','','5','','','1',
							'','','5','','','4','','6','9',
							'2','6','','','9','7','','','4',
							'','9','8','5','','','','','',
							'3','','','','','','','','6',
							'','','','','','3','7','8','',
							'9','','','7','4','','','8','6',
							'4','2','','6','','','5','','',
							'8','','','9','','5','3','','2'];
		}
		
		//Generate medium puzzle
		else if(difficulty == 2){
			$scope.board = ['','','2','','4','','','1','',
							'','','','','1','','','','9',
							'','9','8','','','','4','3','',
							'','','','4','','','','','3',
							'4','','2','8','3','1','9','','5',
							'9','','','','','2','','','',
							'','9','8','','','','6','5','',
							'7','','','','9','','','','',
							'','4','','','5','','7','',''];
		}
		
		//Generate hard puzzle
		else if(difficulty == 3){
			$scope.board = ['','2','','8','','','','6','7',
							'','1','8','','','','','','',
							'7','6','','','','4','','','',
							'','','','','','9','','','8',
							'2','','','8','7','5','','','4',
							'6','','','1','','','','','',
							'','','','9','','','','5','2',
							'','','','','','','7','3','',
							'4','2','','','','1','','8',''];
		}
		
		//Generate evil puzzle
		else{
			$scope.board = ['','','','5','1','','','','4',
							'','9','2','','','','6','','5',
							'','','5','','','7','','','',
							'','3','','','','','4','','9',
							'','','','','3','','','','',
							'7','','2','','','','','8','',
							'','','','8','','','3','','',
							'9','','4','','','','5','8','',
							'2','','','','5','6','','',''];		
		}
		
		//Here we fill the temp array with the values from the imported puzzle.  We then reset
		//the boolean values accordingly.
		for(i = 0; i < 81; i++){
			temp[i][0] = $scope.board[i];
			if($scope.board[i] == ''){
				temp[i][1] = true; 
			}
			else{
				temp[i][1] = false;
			}
			
		}
		
		//We set the board variable to temp, and we're done :D
		$scope.board = temp;
		$scope.pageShow = 5;
	}
	
	$scope.displayStuff = function(thing){
		console.log(thing);
	}
	
	$scope.validateValue = function(index, square){
	
		thisValue = $scope.board[square*9 + index][0];
		
		for(i = 0; i < 9; i++){
			
			//Checking that value just entered isn't the same as a value already in square
			if(i != index && $scope.board[square*9 + i][0] == thisValue && $scope.board[square*9 + i][0] != ''){
				console.log("INVALID 1");
				return 0;
			}
		}
		
		//Checking row
		firstSquareToCheck = 0;
		firstIndexToCheck = 0;
		if(square == 3 || square == 4 || square == 5){
			firstSquareToCheck = 3;
		}
		
		else if(square == 6 || square == 7 || square == 8){
			firstSquareToCheck = 6;
		}
		
		if(index == 3 || index == 4 || index == 5){
			firstIndexToCheck = 3;
		}
		
		else if(index == 6 || index == 7 || index == 8){
			firstIndexToCheck = 6;
		}
		
		for(i = firstSquareToCheck; i < firstSquareToCheck+3; i++){
			if(square != i && thisValue != ''){
				if($scope.board[i*9 + firstIndexToCheck][0] == thisValue || 
					$scope.board[i*9 + firstIndexToCheck +1][0] == thisValue || 
					$scope.board[i*9 + firstIndexToCheck + 2][0] == thisValue){
					
					console.log("INVALID 2");
					return 0;
				}
			}	
		}
		
		//Checking column
		firstSquareToCheck = square % 3;
		firstIndexToCheck = index % 3;
		
		for(i = firstSquareToCheck; i < firstSquareToCheck+7; i = i+3){
			if(square != firstSquareToCheck && thisValue != ''){
				if($scope.board[i*9 + firstIndexToCheck][0] == thisValue || 
					$scope.board[i*9 + firstIndexToCheck +3][0] == thisValue || 
					$scope.board[i*9 + firstIndexToCheck + 6][0] == thisValue){
					
					console.log("INVALID 3");
					return 0;
				}
			}	
		}
		
		return 1;
	}
});

app.controller("navigationCtrl", function($scope) {
	
});

app.controller("gameLogicCtrl", function($scope){
});