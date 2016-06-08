$(document).ready(function() {
	var headings = $("h1");

	if (headings.length < 2)
		headings = $("h2");

	headings.addClass("section_headings");
});
