/* When the page is scrolled to the bottom, every ToC entry whose section is
 * currently visible in the viewport is highlighted rather than only the last
 * entry on the page.
 */
+function ($) {
	'use strict';

	var ScrollSpy = $.fn.scrollspy.Constructor;
	var origProcess = ScrollSpy.prototype.process;

	ScrollSpy.prototype.process = function () {
		const scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
		const scrollHeight = this.getScrollHeight();
		const maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();

		if (scrollTop >= maxScroll) {
			this._activateVisible(scrollTop);
			return;
		}

		origProcess.call(this);
	};

	// Mark every ToC entry whose section overlaps the current viewport as active.
	ScrollSpy.prototype._activateVisible = function (scrollTop) {
		const offsets = this.offsets;
		const targets = this.targets;
		const viewportTop = scrollTop - this.options.offset;
		const viewportBottom = viewportTop + this.$scrollElement.height();
		var visible = [];

		for (var i = 0; i < targets.length; i++) {
			var sectionEnd = (i + 1 < offsets.length) ? offsets[i + 1] : Infinity;
			if (offsets[i] <= viewportBottom && sectionEnd > viewportTop) {
				visible.push(targets[i]);
			}
		}

		if (!visible.length) {
			visible = [targets[targets.length - 1]];
		}

		const visibleKey = visible.join(',');
		if (this.activeTarget === visibleKey) {
			return;
		}
		this.activeTarget = visibleKey;

		this.clear();
		for (var i = 0; i < visible.length; i++) {
			const selector = this.selector +
				'[data-target="' + visible[i] + '"],' +
				this.selector + '[href="' + visible[i] + '"]';

			var active = $(selector).parents('li').addClass('active');
			if (active.parent('.dropdown-menu').length) {
				active = active.closest('li.dropdown').addClass('active');
			}

			active.trigger('activate.bs.scrollspy');
		}
	};

}(jQuery);

// Target heading highlight:
//
// history.pushState (used by scroll_if_anchor for in-page links) and
// history.replaceState (called on page load by update_url) do not update the
// CSS :target pseudo-class, so apply a class instead.

function applyTargetHighlight() {
	$('.hd-target-heading').removeClass('hd-target-heading');
	const fragment = window.location.hash;
	if (fragment) {
		var $el = $(fragment.replace(/(:|\.|\[|\]|,)/g, '\\$1'));
		if ($el.is('h1, h2, h3, h4, h5, h6')) {
			$el.addClass('hd-target-heading');
		}
	}
}

// Patch pushState so clicks on in-page ToC links update the highlight.
(function () {
	const orig = history.pushState.bind(history);
	history.pushState = function (state, title, url) {
		orig(state, title, url);
		applyTargetHighlight();
	};
}());

$(document).ready(function () {
	// Defer past replaceState calls in other document.ready handlers.
	setTimeout(applyTargetHighlight, 0);
	// Cover browser back/forward navigation.
	$(window).on('hashchange', applyTargetHighlight);
});
