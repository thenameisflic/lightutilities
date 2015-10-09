define('helloCtrl', function() {
	return function($scope) {
		$scope.name = 'I am alive';
		$scope.helloStyle = {"background-color": "#eee"};
		//console.log(angular.element(document.querySelector('#hello-container')));
	}
})