(function(doc) {
	var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}
	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}
}(document));

(function(win) {
	var doc = win.document;
	// If there's a hash, or addEventListener is undefined, stop here
	if (!location.hash && win.addEventListener) {
		//scroll to 1
		window.scrollTo(0, 1);
		var scrollTop = 1,
			getScrollTop = function() {
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function() {
				if (doc.body) {
					clearInterval(bodycheck);
					scrollTop = getScrollTop();
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 15);
		win.addEventListener("load", function() {
			setTimeout(function() {
				//at load, if user hasn't scrolled more than 20 or so...
				if (getScrollTop() < 20) {
					//reset to hide addr bar at onload
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 0);
		});
	}
})(this);

// list.js

(function() {

	var options = {
		valueNames: [ 'category', 'post-title' ]
	};

	var featureList = new List('js-list', options);
	$('#js-filter').on('click', '.control', function(e){
		var self = this;
		var $self = $(this);
		var filter = $self.data('filter');
		if ( filter != 'none' ) {
			featureList.filter(function(item) {
				if (item.values().category == filter) {
					return true;
				} else {
					return false;
				}
			});
		} else {
			featureList.filter();
		}
	});

// END
})();

// Get Domain from URL

(function($) {

var $page = $('#page');
var $h3 = $page.find('.the-article').find('h3');
var $link = $h3.find('a');
var len = $link.length;
var url;

$link.filter(function(){
	url = this.hostname;
	$(this).after('<a href="http://' + url + '" class="host milli">' + url + '</a>');
});

// END
})(jQuery);
