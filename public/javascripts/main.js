var app = angular.module('Board', []);

app.controller('appCtrl', function($scope) {
	var mainBoard = new Board("board");
	var tempPenColor;
	$scope.boardWidth = window.innerWidth + "px";
	$scope.boardHeight = window.innerHeight + "px";
	// $scope.boardMarginTop = window.innerHeight * 0.05 + "px";
	// $scope.boardMarginLeft = window.innerWidth * 0.05 + "px";

	$scope.colorList = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
		'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
		'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue',
		'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
		'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey',
		'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite',
		'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green',
		'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
		'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray',
		'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray',
		'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon',
		'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
		'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose',
		'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
		'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink',
		'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown',
		'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow',
		'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat',
		'white', 'whitesmoke', 'yellow', 'yellowgreen'
	];


	$scope.penColor = 'blue';
	tempPenColor = 'blue';

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
		$scope.penColor = $scope.penColor === 'white' ? tempPenColor : $scope.penColor;
		$scope.curIcon = "pen";
	};

});

app.directive('canvasBgWhite', function() {
	return {
		restrict: 'A',
		link: function($scope, ele, attr) {
			// console.log(el);
			angular.element(ele[0]).ready(function() {
				var elContext = ele[0].getContext('2d');
				elContext.fillStyle = 'white';
				elContext.fillRect(0, 0, ele[0].width, ele[0].height);
			});

		}
	};
});

angular.element(document).ready(function() {
	angular.bootstrap(document, ['Board']);
});