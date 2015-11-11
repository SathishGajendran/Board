var app = angular.module('Board', []);

app.controller('appCtrl', function($scope) {
	var mainBoard = new Board("board");
	var tempPenColor;
	$scope.boardWidth = window.innerWidth + "px";
	$scope.boardHeight = window.innerHeight + "px";
	// $scope.boardMarginTop = window.innerHeight * 0.05 + "px";
	// $scope.boardMarginLeft = window.innerWidth * 0.05 + "px";

	$scope.colorList = ['blue', 'red', 'green', 'yellow', 'orange', 'white'];

	$scope.penColor = $scope.colorList[0];
	tempPenColor = $scope.colorList[0];

	$scope.brushSize = 3;
	$scope.showColorDdl = true;

	$scope.curIcon = "pen";

	// $scope.getCanvasIcon = function() {
	// 	if ($scope.operation === "write") {
	// 		return "pen";
	// 	} else if ($scope.operation === "erase") {
	// 		return "eraser";
	// 	}
	// };

	$scope.brushSizeList = (function() {
		var n = [];
		for (var i = 0; i < 100; i++) {
			n.push(i + 1);
		}
		return n;
	})();

	$scope.clrContent = function() {
		mainBoard.clear();
	};

	$scope.snapContent = function() {
		mainBoard.snap();
	};

	$scope.eraseContent = function() {
		$scope.showColorDdl = false;
		tempPenColor = $scope.penColor !== 'white' ? $scope.penColor : tempPenColor;
		$scope.penColor = "white";
		$scope.curIcon = "eraser";
	};

	$scope.selectPen = function() {
		$scope.showColorDdl = true;
		$scope.penColor = tempPenColor;
		$scope.curIcon = "pen";
	};

});

angular.element(document).ready(function() {
	angular.bootstrap(document, ['Board']);
});