/* Behold my best javascript ! */

function createSymbolDropdown() {
	var nav = $('#nav');
	var symbol_dropdown = '';

	$('.symbol_section').map (function() {
		var id = $(this).attr('id');
		if (symbol_dropdown == '') {
			symbol_dropdown += '<li class="dropdown">'
			symbol_dropdown += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"';
			symbol_dropdown += 'aria-haspopup="true" aria-expanded="false">Symbol Type<span class="caret"></span></a>'
			symbol_dropdown += '<ul class="dropdown-menu">';
		}
		symbol_dropdown += '<li><a href="#' + id + '">' + id + '</a></li>';
	});

	if (symbol_dropdown != '') {
		symbol_dropdown += '</ul>';
		symbol_dropdown += '</li>';
		nav.append(symbol_dropdown);
	}
}

function createTagsDropdown(tags_hashtable) {
	var nav = $('#nav');

	for (var key in tags_hashtable) {
		var values = tags_hashtable[key];
		var title = key;

		if (title == 'since') {
			title = 'API Version';
		}

		var tag_dropdown = '<li class="dropdown">';
		tag_dropdown += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"';
		tag_dropdown += 'aria-haspopup="true" aria-expanded="false">' + title + '<span class="caret"></span></a>';
		tag_dropdown += '<ul class="dropdown-menu" id="' + key + '-menu">';

		values.map(function (item) {
			tag_dropdown += '<li><a>';
			tag_dropdown += item;
			tag_dropdown += '</a></li>';
		});

		tag_dropdown += '</ul>';
		tag_dropdown += '</li>';
		nav.append(tag_dropdown);
	}
}

function createTagsHashtable() {
	var tags_hashtable = {};

	$('div[data-hotdoc-tags]').map(function() {
		taglist = $(this).attr('data-hotdoc-tags');
		var tags = taglist.split(';');
		if (tags.length == 1) {
			return;
		}

		tags.map(function(item) {
			var key_value = item.split(':');
			if (key_value.length != 2) {
				return;
			}

			var key = key_value[0];
			var value = key_value[1];
			if (!tags_hashtable[key]) {
				tags_hashtable[key] = [];
			}
			tags_hashtable[key].push(value);
		});
	});

	return tags_hashtable;
}

function parseTags(item) {
	var taglist = item.attr('data-hotdoc-tags');
	var tags_table = {};

	if (taglist === undefined) {
		return null;
	}

	var tags = taglist.split(';');

	tags.map(function(item) {
		var key_value = item.split(':');
		if (key_value.length != 2) {
			return;
		}

		var key = key_value[0];
		var value = key_value[1];
		tags_table[key] = value;
	});

	var dump = JSON.stringify(tags_table, null, 4);
	return tags_table;
}

function compareDefault(filter_value, item_value) {
	return (filter_value == item_value);
}

function doCompareVersions(filter_value, item_value) {
	if (item_value === undefined) {
		return true;
	}

	return (compareVersions(filter_value, item_value) >= 0);
}

function setupFilters() {
	var mainEl = $('#main');
	var tocEl = $(".symbols_toc");
	var transitionDuration = 800;
	var currentSince = "since-more";
	var currentFilters = {};
	var customCompareFunctions = {'since': doCompareVersions};

	var tags_hashtable = createTagsHashtable();
	createTagsDropdown(tags_hashtable);
	for (var key in tags_hashtable) {
		currentFilters[key] = undefined;
		$('#' + key + '-menu a').click(function() {
			currentFilters[key] = $(this).text();
			currentSince = $(this).attr('id');
			tocEl.isotope({filter: sinceFilter});
			mainEl.isotope({filter: sinceFilter});
		});
	}

	function shouldBeVisible(item) {
		var item_tags = parseTags(item);

		if (!item_tags) {
			return true;
		}

		var res = true;

		for (var key in currentFilters) {
			var compareFunction = customCompareFunctions[key];
			if (compareFunction === undefined) {
				compareFunction = compareDefault;
			}

			value = currentFilters[key];
			if (value === undefined) {
				continue;
			}

			if (!compareFunction (value, item_tags[key])) {
				res = false;
				break;
			}
		}
		return res;
	}

	function sinceFilter() {
		if ($(this).hasClass('summary_section_title')) {
			res = false;
			var next = $(this).nextUntil(".summary_section_title");

			next.map(function () {
				if (shouldBeVisible($(this))) {
					res = true;
				}
			});
			return res;
		} else if ($(this).hasClass('symbol_section')) {
			res = false;
			var next = $(this).nextUntil(".symbol_section");

			next.map(function () {
				if (shouldBeVisible($(this))) {
					res = true;
				}
			});
			return res;
		}

		return shouldBeVisible ($(this));
	}

	tocEl.isotope({
		layoutMode: 'vertical',
		animationEngine: 'best-available',
		containerStyle: null,
		animationOptions: {
			duration: transitionDuration
		},
	});

	mainEl.isotope({
		layoutMode: 'vertical',
		animationEngine: 'best-available',
		containerStyle: null,
		animationOptions: {
			duration: transitionDuration
		},
	});

	function layoutTimer(){

		setTimeout(function(){
			mainEl.isotope('layout');
		}, transitionDuration);
		
	}

	layoutTimer();
}

$( document ).ready(function() {
	createSymbolDropdown();
	setupFilters();
});
