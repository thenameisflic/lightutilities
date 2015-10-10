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
				var adjustSidemenu = function() {
					var k = $window.innerWidth > 640 ? 0 : $scope.sidemenuTopHeight;
					angular.element(document.querySelector('.sidemenu-struct>.area-menu'))
						.css('height', ($window.innerHeight - k) + 'px');
					angular.element(document.querySelector('.sidemenu-struct>.area-site'))
						.css('margin-top', k + 'px');
					if (!k && sidemenuOpened) $scope.switchSidemenu();
				}
				$scope.sidemenuTopHeight = 44;
				$scope.colorScheme = colorScheme == undefined ? 
					colorSchemes['black'] : colorScheme;
				$scope.sidemenuLinks = [
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
					var siteOverflow = sidemenuOpened ? 'hidden' : 'auto';
					angular.element(document.querySelector('.sidemenu-struct>.area-menu'))
						.css('left', deslocate);
					angular.element(document.querySelector('.sidemenu-struct>.overlayer'))
						.css('display', overlayerDisplay);
					angular.element(document.querySelector('body'))
						.css('overflow', siteOverflow);
				}
				angular.element($window).bind('resize', adjustSidemenu);
				adjustSidemenu();
			}
		}
	}
});