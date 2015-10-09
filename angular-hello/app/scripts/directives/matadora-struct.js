define('matadoraStructDire', function() {

	var colorSchemes = {
		'black': ['#000000'],
		'blue': ['#0000d0']
	}

	return function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/directives/matadora-struct.html',
			transclude: true,
			scope: {
				mainColor: '='
			},
			controller: function($scope) {
				var colorScheme = colorSchemes[$scope.mainColor];
				$scope.colorScheme = colorScheme == undefined ? 
					colorSchemes['black'] : colorScheme;
			}
		}
	}
});