$(function() {
	$('.struct-switch').click(function(){
		$(this).data('opened', !$(this).data('opened'));
		var open = $(this).data('opened');
		var width_struct = parseInt(window.innerWidth * .66);
		$('body').css({
			'overflow': open ? 'hidden' : 'visible'
		});
		$('.struct-site').css({
			'position': open ? 'absolute' : 'static',
			'left': open ? width_struct : 0
		});
		$('.struct-overlayer').css({
			'display': open ? 'block' : 'none',
			'position': open ? 'fixed' : 'static',
			'left': open ? width_struct : 0,
			'top': open ? $('.struct-top-bar').height() : 0,
			'height': open ? window.innerHeight : 0
		});
		$('.struct-main').css({
			'display': open ? 'inline-block' : 'none',
			'position': open ? 'fixed' : 'static',
			'overflow-y': open ? 'scroll' : 'visible',
			'top': open ? $('struct-top-bar').height() : 0,
			'width': open ? width_struct : 0,
			'height': open ? window.innerHeight - $('.struct-top-bar').height() : 0
		});
	});
	$('.struct-overlayer').click(function() { $('.struct-switch').click(); });
});

$(window).resize(function(){ 
	if ($('.struct-switch').data('opened')) {
		var width_struct = parseInt(window.innerWidth * .66);
		$('.struct-site').css({ 'left': width_struct });
		$('.struct-overlayer').css({ 'left': width_struct, 'height': window.innerHeight });
		$('.struct-main')
			.height(window.innerHeight - $('.struct-top-bar').height())
			.width(width_struct); 
	}
});