$(document).ready(function() {
	$("#header .title").click(function() {
		if ($('#header').hasClass("select")) {
			$('#header').toggleClass(' select');
			$('#header .btn-search1').toggleClass(' select');
		}
		if ($('#header').hasClass("hover")) {
			$('#header').removeClass("hover");
		} else {
			$('#header').addClass("hover");
		}
	});

	$('#header .btn-search1').click(function() {
		$(this).toggleClass(' select');
		$('#header').toggleClass(' select');
	});

	$(function() {
		$(".btn-top").click(function() {
			$("body,html").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

	(function initCompare(){
		function initCompareHeights (){
			var _height = [];
			$('.compare-table td').css('height','auto').each(function(i){
				_height[i]= $(this).height();
			})
			$('.compare-content .compare-table td').css('height','auto');
			$('.compare-content .compare-table tr').each(function(i){
				if (_height[i] < $(this).find('td:first').height()) {
					_height[i] = $(this).find('td:first').height();
				}
			});
			$('.compare-table td').each(function(i){
				$(this).css('height',_height[i])
			});
			$('.compare-content .compare-table tr').each(function(i){
				$(this).find('td').css('height',_height[i]);
			});
		}
		$('.compare-content .item-list .delete').click(function(){
			var _index = $(this).closest('li').index();
			$(this).closest('li').remove();
			$('.compare-content .compare-table tr').each(function(){
				$(this).find('td').eq(_index).remove();
			});
			initCompareHeights ();
			return false;
		});
		initCompareHeights ();
	})();

	$(window).resize(function(){
		(function initCompare(){
			function initCompareHeights (){
				var _height = [];
				$('.compare-table td').css('height','auto').each(function(i){
					_height[i]= $(this).height();
				})
				$('.compare-content .compare-table td').css('height','auto');
				$('.compare-content .compare-table tr').each(function(i){
					if (_height[i] < $(this).find('td:first').height()) {
						_height[i] = $(this).find('td:first').height();
					}
				});
				$('.compare-table td').each(function(i){
					$(this).css('height',_height[i])
				});
				$('.compare-content .compare-table tr').each(function(i){
					$(this).find('td').css('height',_height[i]);
				});
			}
			$('.compare-content .item-list .delete').click(function(){
				var _index = $(this).closest('li').index();
				$(this).closest('li').remove();
				$('.compare-content .compare-table tr').each(function(){
					$(this).find('td').eq(_index).remove();
				});
				initCompareHeights ();
				return false;
			});
			initCompareHeights ();
		})();
	})

	$frame = null,
	wst = 0;
	$(window).load(function() {
		initSly();
	});

	function initSly() {
		if ('sly' in $.fn) {
			// $frame = $('.scroll-horizontal');
			/*$frame = $('.scroll-holder');*/
			$frame = $(' .slider-news');
			// Call Sly on frame
			$frame.each(function() {
				var _this = $(this);
				var $wrap = $(this).parent();
				_this.find(">ul").each(function() {
					var sum = 0;
					$(this).find(">li").each(function() {
						sum += $(this).outerWidth(true);
					}).parent().width(sum);
				});
				$(this).sly({
					horizontal: 1,
					smart: 1,
					activateOn: 'click',
					mouseDragging: 1,
					touchDragging: 1,
					releaseSwing: 1,
					startAt: 0,
					scrollBar: $wrap.find('.scrollbar'),
					scrollBy: 100,
					speed: 450,
					elasticBounds: 1,
					easing: 'swing',
					dragHandle: 1,
					dynamicHandle: 1,
					itemNav: 'basic',
					clickBar: 1
				}, {
					move: function(a) {
						wst = this.pos.cur;
						$(window).trigger('scroll');
					}
				});
				$wrap.find(".prev").click(function(e) {
					_this.sly('slideBy', -$('.mask', $wrap).width());
					e.preventDefault();
				});
				$wrap.find(".next").click(function(e) {
					_this.sly('slideBy', $('.mask', $wrap).width());
					e.preventDefault();
				});
				$frame.sly('reload');
				$frame.on('touchmove', function(e) {
					e.preventDefault();
				});
			});
		}
	}
	initSly();
	if (!device.mobile() && !device.tablet()) {
		$(window).resize(function() {
			initSly();
		});
	} else {
		$(window).on("orientationchange", function(event) {
			initSly();
		});
	};
	$(".tabset").tabset();
	$(".filter-form .heading .opener").click(function(e) {
		var _this = $(this);
		if (!_this.closest('.control-box').hasClass('active')) {
			_this.closest('.control-box').find('.expand').slideDown(300, function() {
				_this.closest('.control-box').addClass('active');
			});
		} else {
			_this.closest('.control-box').find('.expand').slideUp(300, function() {
				_this.closest('.control-box').removeClass('active');
				_this.closest('.control-box').find('.hide-items').hide();
				_this.closest('.control-box').find('.all a').removeClass('active');
			});
		}
		e.preventDefault();
	});
	$('.filter-form .heading .all a').click(function(e) {
		var _this = $(this);
		if(_this.closest('.control-box').find('.expand').is(':hidden')) return false;
		if(!_this.hasClass('active')) {
			_this.closest('.control-box').find('.hide-items').slideDown(300, function(){
				_this.addClass('active');
			})
		} else {
			_this.closest('.control-box').find('.hide-items').slideUp(300, function(){
				_this.removeClass('active');
			})
		}
		e.preventDefault();
	});
	$(".reviews .opener").click(function(e) {
		var _this = $(this);
		if(!_this.closest('li').hasClass('active')) {
			_this.closest('li').find('.full-text').show();
			_this.closest('li').find('.reviews-list').slideDown(500, function(){
				_this.closest('li').addClass('active');
			})
		} else {
			setTimeout(function(){
				_this.closest('li').find('.full-text').hide();
			}, 400);
			_this.closest('li').find('.reviews-list').slideUp(500, function(){
				_this.closest('li').removeClass('active');
			})
		}
		e.preventDefault();
	});
	//move start
	move_box();

	function move_box() {
		if ($('body').width() > 699 && $('body').width() < 991) {
			$('.items-list > li ').each(function() {
				$(this).find('.name-back .name').appendTo($(this).find('.name-ancor'));
				$(this).find('.compare-link a').appendTo($(this).find('.compare-ancor'));
			});
		} else {
			$('.items-list > li').each(function() {
				$(this).find('.name-ancor .name').appendTo($(this).find('.name-back'));
				$(this).find('.compare-ancor a').appendTo($(this).find('.compare-link'));
			});
		};
		if ($('body').width() < 699) {
			$('.breadcrumbs-back .breadcrumbs').appendTo($('.breadcrumbs-ancor'));
			$('.sort-form-back .sort-form').appendTo($('.sort-form-ancor'));
		} else {
			$('.breadcrumbs-ancor .breadcrumbs').appendTo($('.breadcrumbs-back'));
			$('.sort-form-ancor .sort-form').appendTo($('.sort-form-back'));
		};
		if ($('body').width() < 699) {
			$('.tabset .tab').each(function() {
				$(this).find('.write-review-back .write-review').appendTo($(this).find('.write-review-ancor'));
			});
		} else {
			$('.tabset .tab').each(function() {
				$(this).find('.write-review-ancor .write-review').appendTo($(this).find('.write-review-back'));
			});
		};
	};
	$(window).resize(function() {
		move_box();
	});
	//move end
});

$(window).scroll(function() {
	if ($(window).scrollTop() > $(".ad-box").height()) {
		$('body').addClass("fixed-menu");
	} else {
		$('body').removeClass("fixed-menu");
	}
});
/*! device.js 0.1.58 */
(function() {
	var a, b, c, d, e, f, g, h, i, j;
	a = window.device, window.device = {}, c = window.document.documentElement, j = window.navigator.userAgent.toLowerCase(), device.ios = function() {
		return device.iphone() || device.ipod() || device.ipad()
	}, device.iphone = function() {
		return d("iphone")
	}, device.ipod = function() {
		return d("ipod")
	}, device.ipad = function() {
		return d("ipad")
	}, device.android = function() {
		return d("android")
	}, device.androidPhone = function() {
		return device.android() && d("mobile")
	}, device.androidTablet = function() {
		return device.android() && !d("mobile")
	}, device.blackberry = function() {
		return d("blackberry") || d("bb10") || d("rim")
	}, device.blackberryPhone = function() {
		return device.blackberry() && !d("tablet")
	}, device.blackberryTablet = function() {
		return device.blackberry() && d("tablet")
	}, device.windows = function() {
		return d("windows")
	}, device.windowsPhone = function() {
		return device.windows() && d("phone")
	}, device.windowsTablet = function() {
		return device.windows() && d("touch")
	}, device.fxos = function() {
		return d("(mobile; rv:") || d("(tablet; rv:")
	}, device.fxosPhone = function() {
		return device.fxos() && d("mobile")
	}, device.fxosTablet = function() {
		return device.fxos() && d("tablet")
	}, device.mobile = function() {
		return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone()
	}, device.tablet = function() {
		return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet()
	}, device.portrait = function() {
		return 90 !== Math.abs(window.orientation)
	}, device.landscape = function() {
		return 90 === Math.abs(window.orientation)
	}, device.noConflict = function() {
		return window.device = a, this
	}, d = function(a) {
		return -1 !== j.indexOf(a)
	}, f = function(a) {
		var b;
		return b = new RegExp(a, "i"), c.className.match(b)
	}, b = function(a) {
		return f(a) ? void 0 : c.className += " " + a
	}, h = function(a) {
		return f(a) ? c.className = c.className.replace(a, "") : void 0
	}, device.ios() ? device.ipad() ? b("ios ipad tablet") : device.iphone() ? b("ios iphone mobile") : device.ipod() && b("ios ipod mobile") : device.android() ? device.androidTablet() ? b("android tablet") : b("android mobile") : device.blackberry() ? device.blackberryTablet() ? b("blackberry tablet") : b("blackberry mobile") : device.windows() ? device.windowsTablet() ? b("windows tablet") : device.windowsPhone() ? b("windows mobile") : b("desktop") : device.fxos() ? device.fxosTablet() ? b("fxos tablet") : b("fxos mobile") : b("desktop"), e = function() {
		return device.landscape() ? (h("portrait"), b("landscape")) : (h("landscape"), b("portrait"))
	}, i = "onorientationchange" in window, g = i ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(g, e, !1) : window.attachEvent ? window.attachEvent(g, e) : window[g] = e, e()
}).call(this);

$.fn.tabset = function(o) {
	var o = $.extend({
		"tab": ">.tab",
		"tab_control": ">ul",
		"tab_control_parent": ">div",
		"tab_control_item": ">li",
		"a_class": "active",
		"t_a_class": "active",
		"style": {
			"forActive": {
				"display": "block"
			},
			"forInActive": {
				"display": "none"
			}
		}
	}, o);
	return this.each(function() {
		var tabset = $(this),
			tab = $(o.tab, tabset),
			ctrl_pnt = $(o.tab_control_parent, tabset),
			ctrl = $(o.tab_control, tabset).size() ? $(o.tab_control, tabset) : $(o.tab_control, ctrl_pnt),
			ctrl_item = $(o.tab_control_item, ctrl),
			a_class = {
				"name": o.a_class,
				"selector": "." + o.a_class
			},
			t_a_class = {
				"name": o.t_a_class,
				"selector": "." + o.t_a_class
			},
			style = o.style;
		ctrl_item.click(function(e) {
			var index = $(this).index(),
				curTab = tab.filter(t_a_class.selector).size() ? tab.filter(t_a_class.selector) : tab.filter(':visible'),
				nextTab = tab.eq(index);
			$(this).parent().find(o.tab_control_item + a_class.selector).removeClass(a_class.name);
			$(this).addClass(a_class.name);
			// var _name = $(this).text().toLowerCase();
			// _name = _name.replace(/\d+/g, '');
			// if(index != 0) {
			// 	$('.device-frame .head .name .product-name span').text('- ' + _name);
			// } else {
			// 	$('.device-frame .head .name .product-name span').text('');
			// }
			if (style) {
				curTab.css(style.forInActive).removeClass(t_a_class.name);
				nextTab.css(style.forActive).addClass(t_a_class.name);
			} else {
				curTab.removeClass(t_a_class.name);
				nextTab.addClass(t_a_class.name);
			}
			e.preventDefault();
		});
	});
}