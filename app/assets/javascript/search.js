var req = new XMLHttpRequest();
req.open("GET", "dumped.trie", true);
req.overrideMimeType('text\/plain; charset=x-user-defined');

var trie = undefined;
var here = dirname(window.location.href);

req.onload = function (event) {
	data = req.responseText;
	console.time('trie_creation');
	trie = new Trie(data);
	console.timeEnd('trie_creation');
};

req.send(null);

function dirname(path) {
	return path.replace(/\\/g, '/')
		.replace(/\/[^\/]*\/?$/, '');
}

function getSortedKeys(obj) {
	var keys = []; for(var key in obj) keys.push(key);
	return keys.sort(function(a,b){return obj[a]-obj[b]});
}

document.getElementById("lookup").onkeyup=function () {
	if (trie === undefined) {
		return;
	}

	var result_area = document.getElementById('result_area');
	var new_html = '';
	var results = [];

	var query = this.value.replace(/\./g, '}');
	query = query.replace(/_/g, '|');

	if (query.length == 0) {
		result_area.innerHTML = new_html;
		return;
	}

	console.time('lookup');

	var node = trie.lookup_node (query);

	if (node != null && node.is_final) {
		results.push (query);
		new_html += '<p>Found exact match</p>';
	} else if (node != null) {
		var completions = trie.lookup_completions(node, 5);
		for (idx in completions) {
			results.push(completions[idx].get_word());
		}
		new_html += '<p>Found some completions</p>';
	} else {
		corrections = trie.search(query, 2);
		var sorted_keys = getSortedKeys(corrections);

		if (sorted_keys.length) {
			new_html += '<p>Did you mean ?</p>';
		} else {
			new_html += '<p>Nothing relevant found</p>';
		}

		for (idx in sorted_keys) {
			var word = sorted_keys[idx];
			results.push(word);
		}
	}

	console.timeEnd('lookup');

	new_html += '<ul>';

	for (idx in results) {
		var result = results[idx];

		result = result.replace(/\|/g, '_');
		result = result.replace(/}/g, '.');
		new_html += '<li>' + result + '</li>';
	}

	new_html += '</ul>';

	result_area.innerHTML = new_html;
};
