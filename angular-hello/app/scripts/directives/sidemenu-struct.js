define('sidemenuStructDire', function() {

	var colorSchemes = {
		'black': ['#000000', '#ffffff'],
		'blue': ['#0000d0', '#ffffff']
	}

	return function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/directives/sidemenu-struct.html',
			transclude: true,
			scope: {
				mainColor: '='
			},
			controller: function($scope, $window) {
				var sidemenuOpened = false;
				var colorScheme = colorSchemes[$scope.mainColor];
				var adjustSidemenuHeight = function() {
					angular.element(document.querySelector('.sidemenu-struct>.area-menu'))
						.css('height', ($window.innerHeight - $scope.sidemenuTop.height) + 'px');
				}
				$scope.colorScheme = colorScheme == undefined ? 
					colorSchemes['black'] : colorScheme;
				$scope.sidemenuTop = {
					'height': 44
				};
				$scope.sidemenuLinks = [
					{'label': 'Facebook', 'url': 'http://facebook.com'},
					{'label': 'Google', 'url': 'http://google.com'},
					{'label': 'Dropbox', 'url': 'http://dropbox.com'},
					{'label': 'Instagram', 'url': 'http://instagram.com'},
					{'label': 'Twitter', 'url': 'http://twitter.com'},
					{'label': 'Facebook', 'url': 'http://facebook.com'},
					{'label': 'Google', 'url': 'http://google.com'},
					{'label': 'Dropbox', 'url': 'http://dropbox.com'},
					{'label': 'Instagram', 'url': 'http://instagram.com'},
					{'label': 'Twitter', 'url': 'http://twitter.com'},
					{'label': 'Facebook', 'url': 'http://facebook.com'},
					{'label': 'Google', 'url': 'http://google.com'},
					{'label': 'Dropbox', 'url': 'http://dropbox.com'},
					{'label': 'Instagram', 'url': 'http://instagram.com'},
					{'label': 'Twitter', 'url': 'http://twitter.com'},
					{'label': 'Facebook', 'url': 'http://facebook.com'},
					{'label': 'Google', 'url': 'http://google.com'},
					{'label': 'Dropbox', 'url': 'http://dropbox.com'},
					{'label': 'Instagram', 'url': 'http://instagram.com'},
					{'label': 'Twitter', 'url': 'http://twitter.com'},
					{'label': 'Facebook', 'url': 'http://facebook.com'},
					{'label': 'Google', 'url': 'http://google.com'},
					{'label': 'Dropbox', 'url': 'http://dropbox.com'},
					{'label': 'Instagram', 'url': 'http://instagram.com'},
					{'label': 'Twitter', 'url': 'http://twitter.com'},
					{'label': 'Facebook', 'url': 'http://facebook.com'},
					{'label': 'Google', 'url': 'http://google.com'},
					{'label': 'Dropbox', 'url': 'http://dropbox.com'},
					{'label': 'Instagram', 'url': 'http://instagram.com'},
					{'label': 'Twitter', 'url': 'http://twitter.com'}
				];
				$scope.sidemenuAreaMenu = {
					'left': sidemenuOpened ? '0' : '-66%'
				}
				$scope.sidemenuOverlayer = {
					'display': sidemenuOpened ? 'block' : 'none'
				}
				$scope.switchSidemenu = function() {
					sidemenuOpened = !sidemenuOpened;
					var deslocate = sidemenuOpened ? '0' : '-66%';
					var overlayerDisplay = sidemenuOpened ? 'block' : 'none';
					angular.element(document.querySelector('.sidemenu-struct>.area-menu'))
						.css('left', deslocate);
					angular.element(document.querySelector('.sidemenu-struct>.overlayer'))
						.css('display', overlayerDisplay);
				}
				angular.element($window).bind('resize', adjustSidemenuHeight);
				adjustSidemenuHeight();
			}
		}
	}
});