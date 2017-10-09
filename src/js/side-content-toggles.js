var sct = sct || {};

function is_user_alive () {
	clearTimeout(sct.timer);
	sct.timer = setTimeout(is_user_alive, 1000);
	if ($("body").hasClass("toc-expanded") || $("body").hasClass("sitenav-expanded")) {
		return;
	}
	else {
		var sidenav_button = $('#sidenav').width()-$('#sidenav-toggle').height()+3;
		var toc_button = $('#toc-column').width()-$('#toc-toggle').height()+3;
		$('#sidenav-toggle').css({
			left: sidenav_button, 
			"-webkit-transition" : 'left 500ms ease-in-out',
			"-moz-transition"    : 'left 500ms ease-in-out',
			"-ms-transition"     : 'left 500ms ease-in-out',
			"-o-transition"      : 'left 500ms ease-in-out', 
			transition: 'left 500ms ease-in-out'
		});
		$('#toc-toggle').css({
			right: toc_button,
			"-webkit-transition" : 'right 500ms ease-in-out',
		    "-moz-transition"    : 'right 500ms ease-in-out',
		    "-ms-transition"     : 'right 500ms ease-in-out',
		   	"-o-transition"      : 'right 500ms ease-in-out', 
		    transition: 'right 500ms ease-in-out'
		});
	}
}
function user_is_alive() {
	clearTimeout(sct.timer);
	sct.timer = setTimeout(is_user_alive, 1000);
	$('#sidenav-toggle').css({
		left: "100%", 
		"-webkit-transition" : 'left 500ms ease-in-out',
		"-moz-transition"    : 'left 500ms ease-in-out',
		"-ms-transition"     : 'left 500ms ease-in-out',
		"-o-transition"      : 'left 500ms ease-in-out', 
		transition: 'left 500ms ease-in-out'
	});
	$('#toc-toggle').css({
		right: "100%",
		"-webkit-transition" : 'right 500ms ease-in-out',
	    "-moz-transition"    : 'right 500ms ease-in-out',
	    "-ms-transition"     : 'right 500ms ease-in-out',
	   	"-o-transition"      : 'right 500ms ease-in-out', 
	    transition: 'right 500ms ease-in-out'
	});
}

$(document).ready(function() {
	sct.timer = setTimeout(is_user_alive, 1000);
	$('body').on('touchstart touchmove touchend click mousemove keypress keydown keyup', user_is_alive);
	$(window).resize(user_is_alive);
});