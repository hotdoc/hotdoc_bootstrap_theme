function unfold_current_page(base_name) {
	var panel = $('.panel-collapse[data-nav-ref="' + base_name + '"]');


	if (panel != undefined) {
		var elem = panel;
		while (elem.length) {
			if (elem.hasClass('collapse')) {
				$.support.transition = false;
				elem.collapse(false);
				$.support.transition = true;
			}
			elem = elem.parent();
		}

		var widget = '';
		widget += '<div class="scrollspy" id="sidenav-wrapper">';
		widget += '<ul class="nav">';

		$('h1[id],h2[id]').map(function() {
			widget += '<li><a href="#' + $(this).attr('id') + '">';
			widget += $(this).text();
			widget += '</a></li>';
		});

		widget += '</ul>';
		widget += '</div>';

		panel.append(widget);
	}
}

function list_subpages(subpages) {
	var table;
	var page_description;

	if (subpages.length == 0)
		return;

	page_description = $("#page-description");
	page_description.append('<h3>Subpages</h3>');

	table = '<table><tbody>';
	for (var i = 0; i < subpages.length; i++) {
		var node = subpages[i];

		table += '<tr>';
		table += '<td><a href="' + node.url + '">' + node.title + '</a></td>';
		if (node.short_description != null)
			table += '<td>' + node.short_description + '</td>';
		else
			table += '<td>No summary available</td>';
		table += '</tr>';
	}
	table += '</tbody></table>';

	page_description.append(table);
}

function sitemap_downloaded_cb(sitemap_json) {
	var sitemap = JSON.parse(sitemap_json);
	var level = 0;
	var parent_name = 'main';
	var sidenav = '';
	var context = parse_location();
	var subpages = [];

	function fill_sidenav(node) {
		var name = parent_name + '-' + level;
		var panel_class;
		var url;

		if (node.extension == 'gi-extension') {
			if (context.language === undefined) {
				url = 'c/' + node.url;
			} else {
				url = context.language + '/' + node.url;
			}
		} else {
			url = node.url;
		}

		if (context.extension_name == 'gi-extension') {
			url = '../' + url;
		}

		if (level % 2 == 0)
			panel_class = "sidenav-panel-odd";
		else
			panel_class = "sidenav-panel-even";

		sidenav += '<div class="sidenav-panel-body ' + panel_class + '">';
		sidenav += '<div class="panel-heading">';
		sidenav += '<h4 class="panel-title">';
		sidenav += '<a class="sidenav-ref" href="' + url + '"';
		sidenav += ' data-extension="' + node.extension + '">';
		sidenav += node.title + '</a>';

		if (node.url == context.base_name)
			subpages = node.subpages;

		if (node.subpages.length) {
			sidenav += '<a class="sidenav-toggle" data-toggle="collapse" data-parent="';
			sidenav += parent_name + '"';
			sidenav += ' data-target="#' + name + '-children" aria-expanded="false">';
			sidenav += '<i class="glyphicon glyphicon-chevron-right pull-right"></i>';
			sidenav += '<i class="glyphicon glyphicon-chevron-down pull-right"></i>';
			sidenav += '</a>';
		}

		sidenav += '</h4></div>';
		sidenav += '<div id="' + name + '-children" class="panel-collapse collapse"';
		sidenav += 'data-nav-ref="' + node.url + '">';

		parent_name = name;
		level += 1;
		for (var i = 0; i < node.subpages.length; i++) {
			fill_sidenav(node.subpages[i]);
		}
		level -= 1;

		node.url = url;
		sidenav += '</div></div>';
	}

	fill_sidenav(sitemap);

	$("#site-navigation").html(sidenav);

	unfold_current_page(context.base_name);

	list_subpages(subpages);
}

$(document).ready(function() {
	var context = parse_location();
	inject_script(context.root + "/assets/js/sitemap.js");
});
