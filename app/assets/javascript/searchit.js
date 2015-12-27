function escapeRegExp(string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function ellipsize_fragment (fragment, term, size_goal) {
	var words_remaining = 0;
	var sentences = fragment.match(/[^\.!\?]+([\.!\?]+\s|$)/g);
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
	var result = '';
	var passthrough = 0;
	var words_included = 0;

	var backbuffer = [];

	for (var i = 0; i < sentences.length; i++) {
		var sentence = sentences[i];
		var words = sentence.match(/\S+/g);
		for (var j = 0; j < words.length; j++) {
			var word = words[j];

			if (passthrough > 0) {
				result += word + ' ';
				words_included += 1;
				passthrough -= 1;
			} else if (word.toLowerCase().indexOf(term) != -1) {
				start_index = Math.max(j - words_per_match / 2, 0);
				passthrough = words_per_match - start_index;

                                if (start_index > 0 && start_index < backbuffer.length) {
                                       result += 'ELLIPSIS ';
                                }

				for (var k = start_index; k < j; k++) {
					if (backbuffer[k] != undefined) {
						result += backbuffer[k] + ' ';
						words_included += 1;
					} else {
						passthrough += 1;
					}
				}
				result += word + ' ';
				words_included += 1;
				backbuffer = [];
			} else {
				backbuffer.push(word);
			}

			if (words_included >= size_goal) {
				/* Break awaaaaay !!! */
				j = words.length;
				i = sentences.length;
				result += '...';
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
		}
	}

	return result;
}
