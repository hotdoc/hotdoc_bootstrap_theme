function scroll_if_anchor(href) {
    var context = parse_location();
    var fromTop = parseInt($('body').css('padding-top'));
    href = typeof(href) == "string" ? href : $(this).attr("href");
    var destination = _parse_location(href);

    if (destination.base_name == context.base_name &&
	destination.fragment != undefined &&
	(destination.root == '' || destination.root == context.root)) {
        href = destination.fragment;
    }

    if(href.indexOf("#") == 0) {
	var $target = $(href.replace( /(:|\.|\[|\]|,)/g, "\\$1"));
        
        if($target.length) {
            $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
            if(history && "pushState" in history) {
                history.pushState({}, document.title, window.location.pathname + href);
                return false;
            }
        }
    }
}    

scroll_if_anchor(window.location.hash);

$("body").on("click", "a[href]", scroll_if_anchor);

