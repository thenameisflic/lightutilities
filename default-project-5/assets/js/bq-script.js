$(document).ready(function(){
	$(".bq-dropdown-menu").each(function(){
		var t = $($($(this).parent()).children()[0]).height();
		$(this).css("top", t);
	});
	var dropdown_id = 0;
	for(var i = 5; i <= 100; i += 5){
		$(".bq-dropdown-"+i).mouseover(function(){
			var h = 0;
			$($("#"+$(this).attr("id")+"-menu").children()).each(function(){
				h += $(this).height();
			});
			$("#"+$(this).attr("id")+"-menu").css({
				"height" : h
			});
		});
		$(".bq-dropdown-"+i).mouseleave(function(){
			$("#"+$(this).attr("id")+"-menu").css({
				"height" : 0
			});
		});
	}
	$('.bqsm-switch').on('click', function(){
		$(this).data('opened', !$(this).data('opened'));
		var open = $(this).data('opened');
		var width_bqsm = parseInt(window.innerWidth * .66);
		$('body').css({
			'overflow': open ? 'hidden' : 'visible'
		});
		$('.bqsm-site').css({
			'left': open ? width_bqsm : 0,
			'position': open ? 'absolute' : 'static'
		});
		$('.bqsm-overlayer').css({
			'display': open ? 'block' : 'none',
			'left': open ? width_bqsm : 0,
			'top': open ? $('.bqsm-top-bar').height() : 0,
			'height': open ? window.innerHeight : 0,
			'position': open ? 'fixed' : 'static'
		});
		$('.bqsm-menu').css({
			'display': open ? 'inline-block' : 'none',
			'position': open ? 'fixed' : 'static',
			'overflow-y': open ? 'scroll' : 'visible',
			'top': open ? $('bqsm-top-bar').height() : 0,
			'width': open ? width_bqsm : 0,
			'height': open ? window.innerHeight - $('.bqsm-top-bar').height() : 0
		});
	});
	$('.bqsm-overlayer').on('click', function(){ $('.bqsm-switch').click();	});
});

$(window).resize(function(){ 
	if ($('.bqsm-switch').data('opened')) {
		var width_bqsm = parseInt(window.innerWidth * .66);
		$('.bqsm-site').css({ 'left': width_bqsm });
		$('.bqsm-overlayer').css({ 'left': width_bqsm, 'height': window.innerHeight });
		$('.bqsm-menu')
			.height(window.innerHeight - $('.bqsm-top-bar').height())
			.width(width_bqsm); 
	}
});