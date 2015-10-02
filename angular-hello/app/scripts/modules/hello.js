define('hello', [
	'helloCtrl',
	'magazinesCtrl',
	'helloDire',
	'magazinesFact',
	'httpProviderConf',
	'routeProviderConf'
], function(
	helloCtrl,
	magazinesCtrl,
	helloDire,
	magazinesFact,
	httpProviderConf,
	routeProviderConf
) {

	angular
		.module('hello', ['ngRoute', 'ngAnimate'])
		.config(httpProviderConf)
		.config(routeProviderConf)
		.factory('magazinesFact', magazinesFact)
		.directive('hello', helloDire)
		.controller('helloCtrl', helloCtrl)
		.controller('magazinesCtrl', magazinesCtrl);

	angular.bootstrap(document, ['hello']);
	
});