var bqGallery;
var bqCurrent = 0;

$.fn.extend({
	bqGallery: function(arr){
		if(arr.length){
			bqGallery = arr;
			$(this).html("\
				<div class='display'><div class='display-outer'><div class='display-inner'></div></div></div>\
				<div class='control-panel'><div class='control-panel-outer'><nav class='control-panel-inner'>\
				<a href='javascript:void(0)' class='hidden'></a>\
				<a class='btn-1 btn-prev' href='javascript:void(0)'><span><i class='fa fa-chevron-left'></i></span></a>\
				<a class='btn-1 btn-close' href='javascript:void(0)'><span><i class='fa fa-chevron-down'></i></span></a>\
				<a class='btn-1 btn-next' href='javascript:void(0)'><span><i class='fa fa-chevron-right'></i></span></a>\
				</nav></div></div>\
			");
			if(!$(this).hasClass('bq-gallery')) $(this).addClass('bq-gallery'); 
			loadBQImage(bqCurrent);	
			$('.bq-gallery').on('click', function(e){
				if(e.target == this){
					$(this).css({'display': 'none'});
				}
			});
			$('.bq-gallery .btn-next').click(function(){  
				if(bqCurrent < bqGallery.length - 1 && !$('.bq-gallery .image').hasClass('loading')) {
					loadBQImage(++bqCurrent); $('.bq-gallery .display-inner').css({'overflow': 'hidden'}); } 
			});
			$('.bq-gallery .btn-prev').click(function(){ 
				if(bqCurrent && !$('.bq-gallery .image').hasClass('loading')){ 
					loadBQImage(--bqCurrent); $('.bq-gallery .display-inner').css({'overflow': 'hidden'}); }
			});
			$('.bq-gallery .btn-close').click(function(){ $('.bq-gallery').css({'display': 'none'}); });
			$('.bq-gallery .control-panel').bind('keydown', function(e){
				if($('.bq-gallery').css('display') == 'block'){
					if(e.keyCode == 37){ $('.bq-gallery .btn-prev').click(); } 
					else if (e.keyCode == 39){ $('.bq-gallery .btn-next').click(); }
				}
			});
			lazyBQLoad(0);
		}
	}
});

function lazyBQLoad(idx){
	var image = new Image();
	image.src = bqGallery[idx].src;
	image.onload = function(){
		if(++idx < bqGallery.length) lazyBQLoad(idx);
	}
}

$(window).resize(function(){ loadBQImage(bqCurrent); });

function refreshBQButtons(){
	if(!bqCurrent) $('.bq-gallery .btn-prev').addClass('disabled');
	else $('.bq-gallery .btn-prev').removeClass('disabled');
	if(bqCurrent == bqGallery.length - 1) $('.bq-gallery .btn-next').addClass('disabled');
	else $('.bq-gallery .btn-next').removeClass('disabled');
}

function showBQGallery(idx){ bqCurrent = idx; loadBQImage(idx); $('.bq-gallery').css({'display': 'block'}); }

function loadBQImage(idx){
	if (bqGallery) {
		$('.bq-gallery .display-inner').css({'overflow': 'hidden'});
		var container = $('.bq-gallery .display-inner');
		var k = 22;
		container.css({
			'height': window.innerHeight - k * 2 - $('.bq-gallery .btn-1').height(), 
			'line-height': window.innerHeight - k * 2 - $('.bq-gallery .btn-1').height() + 'px'
		});
		var loading = new Image();
		loading.src = 'assets/imgs/bq-gallery/loading.gif';
		$(loading).addClass('image').addClass('loading');
		loading.onload = function(){
			container.css({
				'height': window.innerHeight - k * 2 - $('.bq-gallery .btn-1').height(), 
				'line-height': window.innerHeight - k * 2 - $('.bq-gallery .btn-1').height() + 'px'
			});
			$('.display-inner').html(loading);		
			var image = new Image();
			image.src = bqGallery[idx].src;
			$(image).addClass('image').attr('data-showingFull', false);
			image.onload = function(){
				container.css({
					'height': window.innerHeight - k * 2 - $('.bq-gallery .btn-1').height(), 
					'line-height': window.innerHeight - k * 2 - $('.bq-gallery .btn-1').height() + 'px'
				});
				if ((image.width / image.height) <= (container.width() / container.height())){
					if(image.height > container.height()){
						$(image)
							.height('100%')
							.css({'cursor': 'zoom-in', 'max-height': window.innerHeight * 1.5, 'max-width': 'none'})
							.click(function(){	
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
				$(image).click(function(){
					if(!$(this).data('showingFull')) $('.bq-gallery .control-panel .hidden').focus();
				})
				if(!$(this).data('showingFull')) $('.bq-gallery .control-panel .hidden').focus();
				
				$('.bq-gallery .display-inner').html(image);

				refreshBQButtons();
			}
		}
	}

}