define('helloDire', function() {
	return function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/directives/hello.html'
		}
	}
});