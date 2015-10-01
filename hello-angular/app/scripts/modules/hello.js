define('hello', [
	'helloCtrl',
	'helloDire',
	'httpProviderConf',
	'routeProviderConf'
], function(
	helloCtrl,
	helloDire,
	httpProviderConf,
	routeProviderConf
) {

	angular
		.module('hello', ['ngRoute', 'ngAnimate'])
		.config(httpProviderConf)
		.config(routeProviderConf)
		.directive('hello', helloDire)
		.controller('helloCtrl', helloCtrl);

	angular.bootstrap(document, ['hello']);
	
});