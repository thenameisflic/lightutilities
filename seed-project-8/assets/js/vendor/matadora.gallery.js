var matadoraGallery;
var matadoraCurrent = 0;

$.fn.extend({
	matadoraGallery: function(arr){
		if(arr.length){
			matadoraGallery = arr;
			$(this).html("\
				<div class='display'><div class='display-outer'><div class='display-inner'></div></div></div>\
				<div class='control-panel'><div class='control-panel-outer'><nav class='control-panel-inner'>\
				<a href='javascript:void(0)' class='hidden'></a>\
				<a class='btn-1 btn-prev' href='javascript:void(0)'><span>PREV</span></a>\
				<a class='btn-1 btn-close' href='javascript:void(0)'><span>CLOSE</span></a>\
				<a class='btn-1 btn-next' href='javascript:void(0)'><span>NEXT</span></a>\
				</nav></div></div>\
			").hide();
			if(!$(this).hasClass('matadora-gallery')) $(this).addClass('matadora-gallery'); 
			loadMatadoraImage(matadoraCurrent);	
			$('.matadora-gallery').on('click', function(e){
				if(e.target == this){
					$(this).css({'display': 'none'});
				}
			});
			$('.matadora-gallery .btn-next').click(function(){  
				if(matadoraCurrent < matadoraGallery.length - 1 && !$('.matadora-gallery .image').hasClass('loading')) {
					loadMatadoraImage(++matadoraCurrent); $('.matadora-gallery .display-inner').css({'overflow': 'hidden'}); } 
			});
			$('.matadora-gallery .btn-prev').click(function(){ 
				if(matadoraCurrent && !$('.matadora-gallery .image').hasClass('loading')){ 
					loadMatadoraImage(--matadoraCurrent); $('.matadora-gallery .display-inner').css({'overflow': 'hidden'}); }
			});
			$('.matadora-gallery .btn-close').click(function(){ $('.matadora-gallery').css({'display': 'none'}); });
			$('.matadora-gallery .control-panel').bind('keydown', function(e){
				if($('.matadora-gallery').css('display') == 'block'){
					if(e.keyCode == 37){ $('.matadora-gallery .btn-prev').click(); } 
					else if (e.keyCode == 39){ $('.matadora-gallery .btn-next').click(); }
					else if (e.keyCode == 27){ $('.matadora-gallery .btn-close').click(); }
				}
			});
			lazyMatadoraLoad(0);
		}
	}
});

function lazyMatadoraLoad(idx){
	var image = new Image();
	image.src = matadoraGallery[idx].src;
	image.onload = function(){
		if(++idx < matadoraGallery.length) lazyMatadoraLoad(idx);
	}
}

$(window).resize(function(){ loadMatadoraImage(matadoraCurrent); });

function refreshMatadoraButtons(){
	if(!matadoraCurrent) $('.matadora-gallery .btn-prev').addClass('disabled');
	else $('.matadora-gallery .btn-prev').removeClass('disabled');
	if(matadoraCurrent == matadoraGallery.length - 1) $('.matadora-gallery .btn-next').addClass('disabled');
	else $('.matadora-gallery .btn-next').removeClass('disabled');
}

function showMatadoraGallery(idx){ 
	matadoraCurrent = idx; 
	loadMatadoraImage(idx); 
	$('.matadora-gallery').show(); 
}

function loadMatadoraImage(idx){
	if (matadoraGallery) {
		console.log(matadoraGallery);
		$('.matadora-gallery .display-inner').css({'overflow': 'hidden'});
		var container = $('.matadora-gallery .display-inner');
		var k = 12;
		container.css({
			'height': window.innerHeight - k * 2 - $('.matadora-gallery .btn-1').height(), 
			'line-height': window.innerHeight - k * 2 - $('.matadora-gallery .btn-1').height() + 'px'
		});
		var loading = new Image();
		loading.src = '../../assets/imgs/loading.gif';
		$(loading).addClass('image').addClass('loading');
		loading.onload = function(){
			container.css({
				'height': window.innerHeight - k * 2 - $('.matadora-gallery .btn-1').height(), 
				'line-height': window.innerHeight - k * 2 - $('.matadora-gallery .btn-1').height() + 'px'
			});
			$('.display-inner').html(loading);		
			var image = new Image();
			image.src = matadoraGallery[idx].src;
			$(image).addClass('image').attr('data-showingFull', false);
			image.onload = function(){
				console.log(image);
				container.css({
					'height': window.innerHeight - k * 2 - $('.matadora-gallery .btn-1').height(), 
					'line-height': window.innerHeight - k * 2 - $('.matadora-gallery .btn-1').height() + 'px'
				});
				if ((image.width / image.height) <= (container.width() / container.height())){
					if(image.height > container.height()){
						$(image)
							.height('100%')
							.css({'cursor': 'zoom-in', 'max-height': window.innerHeight * 1.5, 'max-width': 'none'})
							.click(function() {	
								$(this)
									.height($(this).data('showingFull') ? '100%' : 'auto')
									.css({'cursor': $(this).data('showingFull') ? 'zoom-in' : 'zoom-out'})
									.data('showingFull', $(this).data('showingFull') ? false : true)
									.parent().css({'overflow': $(this).data('showingFull') ? 'scroll' : 'hidden'}).focus();
								
							});
					} 
				} else {
					if(image.width > container.width()) {
						$(image)
							.width('100%')
							.css({'cursor': 'zoom-in', 'max-width': window.innerWidth * 2, 'max-height': 'none'})
							.click(function(){	
								$(this)
									.width($(this).data('showingFull') ? '100%' : 'auto')
									.css({'cursor': $(this).data('showingFull') ? 'zoom-in' : 'zoom-out'})
									.data('showingFull', $(this).data('showingFull') ? false : true)
									.parent().css({'overflow': $(this).data('showingFull') ? 'scroll' : 'hidden'}).focus();	
								
							});
					}
				}
				$(image).click(function() {
					if(!$(this).data('showingFull')) $('.matadora-gallery .control-panel .hidden').focus();
				})
				if(!$(this).data('showingFull')) $('.matadora-gallery .control-panel .hidden').focus();
				
				$('.matadora-gallery .display-inner').html(image);

				refreshMatadoraButtons();
			}
		}
	}

}