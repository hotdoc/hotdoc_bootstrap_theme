var my_string = 'struct GBytes A simple refcounted data type representing an immutable sequence of zero or more bytes from an unspecified origin. The purpose of a GBytes is to keep the memory region that it holds alive for as long as anyone holds a reference to the bytes. When the last reference count is dropped, the memory is released. Multiple unrelated callers can use byte data in the GBytes without coordinating their activities, resting assured that the byte data will not change or move while they hold a reference. A GBytes can come from many different origins that may have different procedures for freeing the memory region. Examples are memory from g_malloc(), from memory slices, from a GMappedFile or memory from other allocators. GBytes work well as keys in GHashTable. Use g_bytes_equal() and g_bytes_hash() as parameters to g_hash_table_new() or g_hash_table_new_full(). GBytes can also be used as keys in a GTree by passing the g_bytes_compare() function to g_tree_new(). The data pointed to by this bytes must not be modified. For a mutable array of bytes see GByteArray. Use g_bytes_unref_to_array() to create a mutable array for a GBytes sequence. To create an immutable GBytes from a mutable GByteArray, use the g_byte_array_free_to_bytes() function. struct';

function escapeRegExp(string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function test_fun (fragment, term, size_goal) {
	var sentences = fragment.match(/[^\.!\?]+([\.!\?]+|$)/g);
	var regex = new RegExp(escapeRegExp(term), "gi");
	var nmatches = (fragment.match(regex) || []).length;
	console.log(nmatches, ' occurences');
	console.log(sentences.length);

	var matches_goal = Math.min(nmatches, size_goal / 20);

	console.log('we want', matches_goal, 'matches');

	var words_per_match = size_goal / matches_goal;

	console.log('words per match', words_per_match);

	var words_per_sentence = size_goal / sentences.length;

	var result = '';

	var passthrough = 0;

	var words_included = 0;

	var global_backbuffer = [];

	for (var i = 0; i < sentences.length; i++) {
		var sentence = sentences[i];
		var local_backbuffer = [];

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
				result += word + ' ';
				words_included += 1;
				for (var k = start_index; k < j; k++) {
					result += backbuffer[k] + ' ';
					words_included += 1;
				}
				backbuffer = [];
				global_backbuffer = [];
			} else {
				backbuffer.push(word);
				global_backbuffer.push(word);
			}

			if (words_included >= size_goal) {
				/* Break awaaaaay !!! */
				j = words.length;
				i = sentences.length;
				break;
			}
		}
	}

	console.log("I'm done ???");
	console.log(result);
	console.log(result.match(/\S+/g).length);
}


test_fun(my_string, 'struct', 100);
