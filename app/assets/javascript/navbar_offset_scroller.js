function scroll_if_anchor(href) {
    href = typeof(href) == "string" ? href : $(this).attr("href");
    
    var fromTop = 50;
    
    if(href.indexOf("#") == 0) {
        var $target = $(href);
        
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

