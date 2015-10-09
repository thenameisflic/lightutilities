define('hello', [
	'helloCtrl',
	'magazinesCtrl',
	'helloDire',
	'matadoraStructDire',
	'magazinesFact',
	'httpProviderConf',
	'routeProviderConf'
], function(
	helloCtrl,
	magazinesCtrl,
	helloDire,
	matadoraStructDire,
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
		.directive('matadoraStruct', matadoraStructDire)
		.controller('helloCtrl', helloCtrl)
		.controller('magazinesCtrl', magazinesCtrl);

	angular.bootstrap(document, ['hello']);
	
});