$(document).ready(function() {
	var context = parse_location();

	if (context.extension_name == 'gi-extension') {
		var widget = '<li class="dropdown">';
		widget += '<a class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		widget += 'Language ';
		widget += '<span class="caret"></span></button>';
		widget += '</button>';
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
		widget += '</li>';
		$("#menu").append (widget);
	}
});
