/* Behold my best javascript ! */

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function createTagsDropdown(tags_hashtable) {
	for (var key in tags_hashtable) {
		var values = tags_hashtable[key];
		var title = key;

		if (title == 'since') {
			title = 'API Version';
		}

		if (title == 'deprecated') {
			var menu = $("#navbar-wrapper");
			var widget = '<span>Deprecated functions: </span><input type="checkbox" id="show-deprecated">';
			menu.append(widget);
			$('#show-deprecated').bootstrapToggle({
				on: 'Visible',
				off: 'Hidden',
			});
		} else {
			var menu = $('#menu');
			var widget = '<div class="btn-group">';
			widget += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
			widget += title.capitalizeFirstLetter();
			widget += '<span class="caret"></span></button>';
			widget += '<ul class="dropdown-menu" id="' + key + '-menu">';

			widget += '<li><a id="' + key + '">Reset</a></li>';
			widget += '<li role="separator" class="divider"></li>';

			values.map(function (item) {
				widget += '<li><a id="'+ key + '">';
				widget += item;
				widget += '</a></li>';
			});
			widget += '</ul>';
			widget += '</div>';
			menu.append(widget);
		}
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
			if ($.inArray(value, tags_hashtable[key]) == -1) {
				tags_hashtable[key].push(value);
			}
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

function compareDefault(all_values, filter_value, item_value) {
	return (filter_value == item_value);
}

function doCompareVersions(all_values, filter_value, item_value) {
	if (item_value === undefined) {
		return true;
	}

	return (compareVersions(filter_value, item_value) >= 0);
}

function doCompareStability(all_values, filter_value, item_value) {
	if (item_value === undefined) {
		/* We consider API as stable by default */
		if (filter_value == 'unstable') {
			return false;
		} else {
			return true;
		}
	}

	return (filter_value == item_value);
}

function doCompareDeprecated(all_values, filter_value, item_value) {
	var since = all_values['since'];

	/* Item isn't marked as deprecated */
	if (item_value === undefined) {
		return true;
	}

	/* Item is marked as deprecated, but we show deprecated */
	if (filter_value == true) {
		return true;
	}

	/* Item is marked as deprecated and we show the latest version */
	if (since === undefined) {
		return false;
	}

	/* returns false if item was deprecated at the version we filter on */
	return (compareVersions (since, item_value) < 0);
}

function setupFilters() {
	var mainEl = $('#main');
	var tocEl = $(".symbols_toc");
	var transitionDuration = 800;
	var currentFilters = {};
	var customCompareFunctions = {'since': doCompareVersions,
		'stability': doCompareStability,
		'deprecated': doCompareDeprecated};

	var tags_hashtable = createTagsHashtable();
	createTagsDropdown(tags_hashtable);
	for (var key in tags_hashtable) {
		currentFilters[key] = undefined;
		if (key == 'deprecated') {
			currentFilters[key] = $('#show-deprecated').prop('checked');
			$('#show-deprecated').change(function() {
				currentFilters["deprecated"] = $(this).prop('checked');
				tocEl.isotope({filter: isotopeFilter});
				mainEl.isotope({filter: isotopeFilter});
			})
		} else {
			$('#' + key + '-menu a').click(function() {
				var key = $(this).attr('id');
				if ($(this).text() == "Reset")
					currentFilters[key] = undefined;
				else
					currentFilters[key] = $(this).text();

				tocEl.isotope({filter: isotopeFilter});
				mainEl.isotope({filter: isotopeFilter});
			});
		}
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

			if (!compareFunction (currentFilters, value, item_tags[key])) {
				res = false;
				break;
			}
		}

		return res;
	}

	function isotopeFilter() {
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
		filter: isotopeFilter,
		animationOptions: {
			duration: transitionDuration
		},
	});

	mainEl.isotope({
		layoutMode: 'vertical',
		animationEngine: 'best-available',
		containerStyle: null,
		filter: isotopeFilter,
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

	// Isotope messes with our anchors positions
	var hash_index = window.location.href.indexOf("#");
	if (hash_index != -1) {
		var hash = window.location.href.substring(hash_index + 1);
		location.hash = "#" + hash;
	}

}

function setupSidenav() {
	var here =  window.location.href;
	var hash_index = here.indexOf("#");
	var panel = undefined;
	if (hash_index != -1) {
		here = here.substring(0, hash_index);
	}

	$('.panel-collapse[data-nav-ref]').map(function() {
		var navref = $(this).attr('data-nav-ref');
		if (here.endsWith('/' + navref)) {
			panel = $(this);
		}
	});

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

		$('h2[id]').map(function() {
			widget += '<li><a href="#' + $(this).attr('id') + '">';
			widget += $(this).text();
			widget += '</a></li>';
		});

		widget += '</ul>';
		widget += '</div>';

		panel.append(widget);
	}

	var extension_name = $('#page-wrapper').attr('data-extension');
	var language = undefined;

	var split_here = here.split('/');
	var base_name = split_here.pop();

	if (extension_name == 'gi-extension') {
		language = split_here.pop();
		var widget = '<div class="btn-group">';
		widget += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		widget += 'Language';
		widget += '<span class="caret"></span></button>';
		widget += '<ul class="dropdown-menu">';

		widget += '<li><a href="' + '../c/' + base_name + '">';
		widget += 'C';
		widget += '</a></li>';

		widget += '<li><a href="' + '../javascript/' + base_name + '">';
		widget += 'Javascript';
		widget += '</a></li>';

		widget += '<li><a href="' + '../python/' + base_name + '">';
		widget += 'Python';
		widget += '</a></li>';

		widget += '</ul>';
		widget += '</div>';
		$("#menu").append (widget);
	}

	$('.sidenav-ref').map(function() {
		var ref_extension_name = $(this).attr('data-extension');
		if (ref_extension_name != "gi-extension" && extension_name == 'gi-extension') {
			$(this).attr('href', '../' + $(this).attr('href'));
		} else if (ref_extension_name == 'gi-extension' && extension_name != 'gi-extension') {
			if (language === undefined) {
				$(this).attr('href', 'c/' + $(this).attr('href'));
			} else {
				$(this).attr('href', language + '/' + $(this).attr('href'));
			}
		}
	});

	return {root: split_here.join('/'), language: language};
}

function dirname(path) {
	return path.replace(/\\/g, '/')
		.replace(/\/[^\/]*\/?$/, '');
}

function to_original(word) {
	return word.replace(/\|/g, '_').replace(/}/g, '.');
	}

function do_search(trie, word) {
	var results = [];
	var query = word.replace(/\./g, '}');
	query = query.replace(/_/g, '|');

	var node = trie.lookup_node(query);

	if (node && node.is_final) {
		results.push (to_original(node.get_word()));
	}

	return results;
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

function display_fragment_for_url(fragment, data, token) {
	var selector = '#' + CSS.escape(fragment) + '-fragment';

	var fragment_div = $(selector);

	if (fragment_div.length == 0) {
		return;
	}

	var html = $.parseHTML(data);

	var compact = $(html).text().match(/\S+/g).join(' ');

	compact = $.parseHTML('<p>' +
			ellipsize_fragment(compact, token, 40) +
			'</p>');

	fragment_div.html($(compact).wrapInTag({tag: 'strong', words: [token]}));
}

function display_fragments_for_urls(context, fragments, token) {
	var token = token;

	for (var i = 0; i < fragments.length; i++) {
		var query_fragment = function(i) {
			var fragment = fragments[i];
			var url = context.root +
				"/assets/js/search/hotdoc_fragments/" +
				encodeURIComponent(fragment) + ".fragment";

			return function() {
				var jqxhr = $.ajax({
					url: url,
					dataType: "text",
					beforeSend: function( xhr ) {
						xhr.overrideMimeType( "text/plain");
					}
				})
				.done(function(data) {
					display_fragment_for_url(fragment, data, token);
				})
				.fail(function(xhr, text_status, error_thrown) {
				})
				.always(function() {
				});
			};
		};

		query_fragment(i)();
	}
}

function filter_url(url) {
	var slash_index = url.indexOf('/');

	if (slash_index === -1) {
		if (this.language === undefined) {
			return url;
		} else {
			return '..' + url;
		}
	}

	var url_language = url.substring(0, slash_index);
	var suburl = url.substring (slash_index + 1);

	/* Remove urls where the same page matches for different languages
	 * This is beginning to feel shitty
	 */
	if (this.language === undefined && !(suburl in this.seen_urls)) {
		this.seen_urls[suburl] = true;
		return url;
	}

	if (url_language != this.language) {
		return null;
	}

	return suburl;
}

function display_urls_for_token(context, token, data) {
	var selector = '#' + CSS.escape(token) + '-result';

	var token_results_div = $(selector);

	if (token_results_div.length == 0) {
		return;
	}

	var urls = data.urls;
	var meat = "<h5>Search results for " + token + "</h5>";

	filter_context = JSON.parse(JSON.stringify(context));;
	filter_context.seen_urls = {};

	var filtered_urls = urls.map(filter_url, filter_context);

	var url;
	var final_urls = [];
	for (var i = 0; i < filtered_urls.length; i++) {
		url = filtered_urls[i];
		if (url === null) {
			continue;
		}

		var final_url = urls[i];

		meat += '<div class="search_result">';
		meat += '<a href="' + url + '">' + url + '</a>';
		meat += '<div id="' + final_url + '-fragment"></div>';
		meat += '</div>';
		final_urls.push(final_url);
	}

	token_results_div.html(meat);

	display_fragments_for_urls(context, final_urls, token);
}

function display_urls_for_tokens(context, tokens) {
	for (var i = 0; i < tokens.length; i++) {
		var query_token = function(i) {
			var token = tokens[i];
			var url = context.root + "/assets/js/search/" + token;

			return function() {
				var jqxhr = $.ajax({
					dataType: "json",
					url: url,
					beforeSend: function( xhr ) {
						xhr.overrideMimeType( "application/json");
					}
				})
				.done(function(data) {
					display_urls_for_token(context, token, data);
				})
				.fail(function(xhr, a, b) {
				})
				.always(function() {
				});
			};
		};

		query_token(i)();
	}
}

function prepare_results_view (tokens) {
	var results_div = $("#search_results");
	$('#main').hide();
	results_div.show()

		var skeleton = "<h3>Search results</h3>";
	var token = null;

	for (var i = 0; i < tokens.length; i++) {
		token = tokens[i];
		skeleton += '<div id="' + token + '-result"></div>'
	}
	results_div.html(skeleton);
}

function debounce (func, threshold, execAsap) {

	var timeout;

	return function debounced () {
		var obj = this, args = arguments;
		function delayed () {
			if (!execAsap)
				func.apply(obj, args);
			timeout = null;
		};

		if (timeout)
			clearTimeout(timeout);
		else if (execAsap)
			func.apply(obj, args);

		timeout = setTimeout(delayed, threshold || 100);
	};

}

function getSortedKeys(obj) {
	var keys = []; for(var key in obj) keys.push(key);
	return keys.sort(function(a,b){return obj[a]-obj[b]});
}

function search_source (query, sync_results) {
	var results = [];

	query = query.replace(/\./g, '}');
	query = query.replace(/_/g, '|');

	var completions = this.source.search_trie.lookup_submatches(query, 5);

	console.log("completions are thus", completions);

	results = completions.map(function (completion) {
		return completion.get_word();
	});

	if (results.length == 0) {
		var corrections = this.source.search_trie.search(query, 2);
		var sorted_keys = getSortedKeys(corrections);

		for (idx in sorted_keys) {
			var word = sorted_keys[idx];
			results.push(word);
		}
	}

	for (idx in results) {
		var result = results[idx];

		var translated_back = result.replace(/\|/g, '_');
		translated_back = translated_back.replace(/}/g, '.');
		results[idx] = translated_back;
	}

	sync_results(results);
};

function setupSearch(context) {
	var req = new XMLHttpRequest();
	req.open("GET", context.root + "/assets/js/search/dumped.trie", true);
	req.overrideMimeType('text\/plain; charset=x-user-defined');

	var here = dirname(window.location.href);

	req.onload = function (event) {
		var trie = new Trie(req.responseText);
		var search_input = $('#sidenav-lookup-field');

		search_input.val("");

		search_input.removeAttr('disabled');
		search_input.attr('placeholder', 'Search');

		search_source.search_trie = trie;

		search_input.typeahead({
			minLength: 4
		},
		{
			name: 'search-trie',
			source: search_source,
			local: trie,
		});

		search_input.focus();

		var refresher = debounce(display_urls_for_tokens, 500);

		search_input.keyup(function () {
			var word = $(this).val();
			if (word.length == 0) {
				var search_results = $('#search_results');
				search_results.html('');
				search_results.hide();
				$('#main').show();
			} else {
				var tokens = do_search(trie, word);
				prepare_results_view(tokens);
				refresher(context, tokens);
			}
		});
	};

	req.send(null);
}

$(document).ready(function() {
	var context = setupSidenav();
	setupFilters();
	setupSearch(context);
});
