function escapeRegExp(string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function ellipsize_fragment (fragment, term, size_goal) {
	var words_remaining = 0;
	var sentences = fragment.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|");

	if (sentences === null) {
		return fragment;
	}

	for (var i = 0; i < sentences.length; i++) {
		words_remaining += (sentences[i].match(/\S+/g) || []).length;
	}

	if (words_remaining < size_goal) {
		return fragment;
	}

	var regex = new RegExp(escapeRegExp(term), "gi");
	var nmatches = (fragment.match(regex) || []).length;
	var matches_goal = Math.min(nmatches, size_goal / 20);
	var words_per_match = size_goal / matches_goal;
	var max_lookback = words_per_match / 2;
	var result = '';
	var passthrough = 0;
	var words_included = 0;
	var matches_found = 0;
	var position = 0;
	var last_word_included = 0;

	for (var i = 0; i < sentences.length; i++) {
		var sentence = sentences[i];
		var words = sentence.match(/\S+/g);
		for (var j = 0; j < words.length; j++) {
			var word = words[j];
			var is_match = word.toLowerCase().indexOf(term) != -1;

			if (is_match) {
				matches_found += 1;
			}

			if (passthrough > 0) {
				result += word + ' ';
				words_included += 1;
				passthrough -= 1;
				last_word_included = position;
			} else if (is_match) {
				var start_index = j - max_lookback;
				start_index = Math.max(0, start_index);
				if (j - start_index >= position - last_word_included) {
					start_index = Math.max (0, j - (position - last_word_included));
				} else {
					result += '... ';
				}

				var k = start_index;

				for (var k = start_index; k < j; k++) {
					result += words[k] + ' ';
					words_included += 1;
				}

				result += word + ' ';
				words_included += 1;
				last_word_included = position;

				passthrough = max_lookback;
			}

			if (matches_found === matches_goal) {
				passthrough = size_goal - words_included;
			}

			if (words_included >= size_goal) {
				result += '...';
				/* Break awaaaaay !!! */
				j = words.length;
				i = sentences.length;
				break;
			}

			words_remaining -= 1;
			if (words_remaining > passthrough &&
					words_remaining + words_included <= size_goal) {
				if (passthrough == 0) {
					result += '... ';
				}
				passthrough += words_remaining;
			}
			position += 1;
		}
	}

	return result;
}
