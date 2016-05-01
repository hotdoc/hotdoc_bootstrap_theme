String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

function dirname(path) {
	return path.replace(/\\/g, '/')
		.replace(/\/[^\/]*\/?$/, '');
}

$.fn.wrapInTag = function(opts) {
  var tag = opts.tag || 'strong'
    , words = opts.words || []
    , regex = RegExp(words.join('|'), 'gi') // case insensitive
    , replacement = '<'+ tag +'>$&</'+ tag +'>';

  return this.html(function() {
    return $(this).text().replace(regex, replacement);
  });
};

function inject_script(src) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
}

function parse_location() {
	var context = {}

	context.here =  window.location.href;
	var hash_index = context.here.indexOf("#");
	if (hash_index != -1) {
		context.here = context.here.substring(0, hash_index);
	}

	var split_here = context.here.split('/');
	context.base_name = split_here.pop();
	context.extension_name = $('#page-wrapper').attr('data-extension');
	context.language = undefined;
	if (context.extension_name == 'gi-extension') {
		context.language = split_here.pop();
	}
	context.root = split_here.join('/');

	return context;
}
