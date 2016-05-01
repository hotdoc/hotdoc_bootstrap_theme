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

$(document).ready(function() {
	var context = parse_location();

	if (context.extension_name == 'gi-extension') {
		var widget = '<div class="btn-group">';
		widget += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		widget += 'Language';
		widget += '<span class="caret"></span></button>';
		widget += '<ul class="dropdown-menu">';

		widget += '<li><a href="' + '../c/' + context.base_name + '">';
		widget += 'C';
		widget += '</a></li>';

		widget += '<li><a href="' + '../javascript/' + context.base_name + '">';
		widget += 'Javascript';
		widget += '</a></li>';

		widget += '<li><a href="' + '../python/' + context.base_name + '">';
		widget += 'Python';
		widget += '</a></li>';

		widget += '</ul>';
		widget += '</div>';
		$("#menu").append (widget);
	}
});
