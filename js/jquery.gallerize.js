/* 
	jQuery Gallerize - 15/03/2017
	
	Copyright (c) 2017 "immersedone" Truc Minh Phan
	Licensed under the MIT license.
	https://trucphan.com/about/license


	Author: "immersedone" Truc Minh Phan
	GitHub: https://github.com/immersedone/jquery.gallerize
	GitHub IO: https://immersedone.github.io/jquery.gallerize
	Version: 0.1pre
	License: MIT

	Description: 

	A lightweight jQuery dependent library for creating an image gallery that 
	supports 360 degree product images, panoramas, LightBox, Zoom, etc. 

	--------------------------------------------------------------------------

	Functionality: 
		+- Animations (using animate.css)
		+- 360 Product Images
		|- 360 Panoramas
		+- LightBox Gallery Mode
		+- Slider Mode
		+- Zoom Function
		+- Auto-Play
		|- Videos Elements
		+- HTML Captioning
		+- Content Capable
		+- Hover-Enabled Captions
		+- Lazy-Loading of Images
		|- Responsive View for all Devices/Browsers
		+- Opacity Functionality
		+- Boostrap Support
		|- Mobile Ready; Touch Capability/Orientation:
			;; Onswipe
			;; Tap/Taphold
			;; SwipeLeft
			;; SwipeRight
			;; ScrollStart
			;; ScrollStop
			;; Orientation Change
		+- SEO Friendly; automatic alt tags.


	Dependencies: 
		- jQuery v2.0+ 
		- animate.css v3.5.1+ (https://github.com/daneden/animate.css)
		- Twitter Bootstrap v3+ (optional)
		- FontAwesome v4+ (optional)


	Tested with:
		- jQuery v2.2.4

	Supports:
		- Google Chrome
		- Mozilla Firefox
		- Safari
		- Opera
		- IE Edge

	--------------------------------------------------------------------------


	Version History:

		v0.1pre - Pre-initial release, basic gallery functionality.


*/

;(function($) {

	$.fn.gallerize = function(opts) {

		//Gallerize Default Settings
		var defs = $.extend({
			transitionSpeed: 2000, //Transition Speed in Milli-Seconds
			pauseSpeed: 8000, //Pause on item for x Milli-Seconds
			animationStyleIn: 'fadeIn', //Transition In Animation Style 
			animationStyleOut: 'fadeOut', //Transition Out Animation Style
			autoPlay: true, //Automatically Play
			threeSixPiLoop: 'forever', //Loops Products 'x' times: forever, 1 time, 2 times, 3 times
			threeSixPiDelay: 100, //Time Delay between 360 Product Images
			showNav: true, //Navigation Menu
			navLeftArrow: '&lsaquo;', //Navigation Left Arrow
			navRightArrow: '&rsaquo;', //Navigation Right Arrow
			gDebug: false, //Debug Mode
			gTheme: 'default', //Gallerize Theme: 'default', 'light', 'dark', 'midnight'
			gallerizeType: 'basic', //Gallery Type: 'basic', 'accordion', 'fullwidth', 'carousel', 'cubed', 'timeline' 
			gViewMode: 'lightbox', //Gallerize View Mode on click; 'zoom', 'lightbox', 'both', 'none'
			LBoxLeftArrow: '&larr;',
			LBoxRightArrow: '&rarr;',
			gHoverClick: 'zoom', //Function for when Hovering/Clicking Images: 'zoom' or 'lightbox'
			gPageType: 'normal', //Gallery Intended for which Page: 'normal', 'product'
			gBackgroundColour: 'white', //Gallerize Background Colour (theme override)
			gOverrideParentWidth: false, //Gallerize Override Parent Container Width
			gWatermark: false, //Enable/Disable Watermarking Feature
			gWatermarkImage: '', //URL to Watermarking image
			gAJAX: false, //Enable Automatic Gallerize content creation via AJAX
			gAJAXURL: '', //AJAX URL for Gallerize content creation
			gAutoLoad: false, //Enable Auto-Loading of CSS files
			gCSSType: 'minified', //CSS File Type for Auto-Loading: 'minified', 'uncompressed'
			gCSSDir: '', //Directory for Auto-Loading CSS Theme Files
			gLazyLoad: false, //Lazy-Loading of Images
			gLazyLoadAnimation: 'fadeIn', //Effect of Lazy-Loading Images
			captionAnimation: false, //Animation for Captions
			captionAnimationStyle: 'pop', //Caption Animation Style
			width: '100%', //Gallery Width of Parent
			maxHeight: 'auto', //Maximum Gallery Height (CSS3 Support)
			showThumbs: true, //Show Gallery Thumbnails
			thumbHeight: 150, //Thumbnail Height
			thumbWidth: 150, //Thumbnail Width
			responsiveView: true, //Make Gallery Responsive
			imageResize: true, //Resize Gallery Images
			followOrder: false, //Follow Defined Order			
			supportBootstrap: false, //Turn on/off support for Twitter Bootstrap v3
			bsGallerizeClass: 'col-md-12', //Gallerize Bootstrap Columns
			pagination: false, //Turn on/off Pagination
			paginationStyle: 'dots', //Pagination Style: Dots, Bar, Numbers.
			opacityOverlay: false, //Enable Opacity Overlay for Slides
			opacityOverlayColour: 'rgb(255,255,255)', //Default Overlay Colour 
			opacityOverlayRange: 0.1, //Opacity/Alpha Value from 0-1
		}, opts); 


		//Declare Global Variables
		var $gWrapper, $gThemeClass, $gCount, $gWidth, $gSlideIsAt, $gStage, $gThumbWrap;
		var $subList, $list, $listWidth, $allLi;
		var $gLBoxWrapper, $gPaginationWrap;
		var $isRunTime = true;
		var $apTimer, $next360piTime, $timeoutArr = [];
		var $transform = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
		var $transformProperty = getSupportedPropertyName($transform);


		//Run Plugin!
		__init(this);



		/*		             ,ood8888booo,
		                    ,oda8a888a888888bo,
		                 ,od88888888aa888aa88a8bo,
		               ,da8888aaaa88a888aaaa8a8a88b,
		              ,oa888aaaa8aa8888aaa8aa8a8a88o,
		             ,88888aaaaaa8aa8888a8aa8aa888a88,
		             8888a88aaaaaa8a88aa8888888a888888
		             888aaaa88aa8aaaa8888; ;8888a88888
		             Y888a888a888a8888;'   ;888888a88Y
		              Y8a8aa8a888a88'      ,8aaa8888Y
		               Y8a8aa8aa8888;     ;8a8aaa88Y
		                `Y88aa8888;'      ;8aaa88Y'
		        ,,;;;;;;;;'''''''         ;8888Y'
		     ,,;                         ,888P
		   ,;  ,;,                      ;""
		  ;       ;          ,    ,    ,;
		 ;  ;,    ;     ,;;;;;   ;,,,  ;
		;  ; ;  ,' ;  ,;      ;  ;   ;  ;
		; ;  ; ;  ;  '        ; ,'    ;  ;
		`;'  ; ;  '; ;,       ; ;      ; ',
		     ;  ;,  ;,;       ;  ;,     ;;;
		      ;,,;             ;,,;

		      Just a wolf. No need to look further!

		*/

		


		//Initialization Function
		function __init(gallerize) {

			if(defs.gDebug) {
				console.log('Initializing...');
			}

			if(defs.gAutoLoad) {
				__autoload(defs.gCSSDir);
			}

			gallerize.each(function(){

				//Pass Gallerize Instances to Global Variable
				var $this = $(this);

				//Initialize & Wrap Gallerize class
				if(!defs.supportBootstrap) {
					$this.wrap('<div id="gallerize-wrapper" />');
				} else if(defs.supportBootstrap) {
					$this.wrap('<div id="gallerize-wrapper" class="' + defs.bsGallerizeClass + '"/>');
				}

				//Pass Element to Global Variable
				$gWrapper = $this.parent('#gallerize-wrapper');

				//Determine whether or not to show Thumbnails
				if(defs.showThumbs) {
					
				}

				//Change Gallery Width to Options
				$gWrapper.css('width', defs.width);

				//Change Gallerize Background Colour
				$gWrapper.css('background', defs.gBackgroundColour);

				//Add Panel Class to Gallerize
				$this.addClass('gallerize-panel ' + __theme_select());

				//Bind List to Global Variables
				$subList = $('.gallerize-panel').children('ul');
				$list = $subList.children('li');
				$gCount = $list.length;

				//Determine Calculations and bind to Globals
				$listWidth = $gWrapper.width();
				$gWidth = $gCount * $listWidth;
				$gSlideIsAt = 1;
				$timeoutArr = [];

				
				//Add Class to Main List (<ul>)
				//and wrap it with a Gallery stage
				$subList.addClass('gallerize-list').wrap('<div class="gallerize-stage" />');


				//Configure Gallery Stage
				$gStage = $('.gallerize-stage');
				$gStage.css('width', $gWidth);


				//Call Generation Functions
				if(defs.showThumbs) {
					$this.after('<div id="gallerize-thumbs"/>');
					$gThumbWrap = $('#gallerize-thumbs');
					gallerize_genThumb($subList);	
				}

				if(defs.pagination) {
					__generate_Pagination($this);
				}

				if(defs.showNav) {
					//$gStage.after('<div id="gallerize-controls" />');
					gallerize_genControls();
				}



				//Give all List Elements a calculated width
				$allLi = $subList.find('li');
				$allLi.each(function() {
					$(this).css('width', $gWrapper.width());
				});

				//Give all main list elements an identifying class
				$list.each(function() {
					$(this).addClass('gallerize-list-main');

					if(defs.gViewMode === 'lightbox' || defs.gViewMode === 'both') {
						$(this).addClass('glbx-hover');
					}
				});


				// Display first slide in the list
				if($list.first().addClass('active').css($transformProperty, 'transform3d')) {
					if(defs.gDebug) {
						console.log('Activating first slide...');
					}
				}


				//Make Images SEO Friendly
				__seo_friendly();

				var all360pi = $list.filter('.g360pi');

				all360pi.each(function() {
					gallerize_360pi($(this), false);
				});

				//Lazy Load
				if(defs.gLazyLoad) {

					//Fix for 360 Product Images
					var g360piList = $('li.g360pi.gallerize-list-main');

					g360piList.each(function() {

						
						$(this).children('ul').children('li').eq(0).css('position', 'relative');
						

					});

					__lazy_load();
				}

				//Colour Overlay
				if(defs.opacityOverlay) {
					__apply_Opacity_Overlay();
				}

				//Support Bootstrap Classes
				if(defs.supportBootstrap) {
					__supp_Bootstrap(defs.bsGallerizeClass);
				}

				//LightBox View Mode
				if(defs.gViewMode === 'lightbox' || defs.gViewMode === 'both') {
					__generate_lightBox();
				}

				


				setTimeout(__rsp_ImgSize, 50);

				$(window).load(function() {
					__autoPlay('play', 0);

					if(defs.gViewMode === 'zoom' || defs.gViewMode === 'both') {
						__generate_Zoom();
					}
				});
				
				if(defs.gDebug) {
					console.log('Load-Time Performance (in ms):' + performance.now());
				}

			});

		}


		//Function to Auto-Load CSS 
		function __autoload(directory) {

			var minMainCSS = 'jquery.gallerize.min.css';
			var minLightCSS = 'jquery.gallerize-light.min.css';
			var minDarkCSS = 'jquery.gallerize-dark.min.css';
			var minMidnightCSS = 'jquery.gallerize-midnight.min.css';
			var mainCSS = 'jquery.gallerize.css';
			var lightCSS = 'jquery.gallerize-light.css';
			var darkCSS = 'jquery.gallerize-dark.css';
			var midnightCSS = 'jquery.gallerize-midnight.css';
			var defExists = false, themeExists = false;
			var ss = document.styleSheets;
			var cssArr = [];
			var cssArrLength;

			//Determine Set Theme and add to Array of CSS to Check/Add
			if(defs.gCSSType === 'minified') {
				cssArr[0] = minMainCSS;
			} else if (defs.gCSSType === 'uncompressed') {
				cssArr[0] = mainCSS;
			}

			switch(defs.gTheme) {
				case "light":
					if(defs.gCSSType === 'minified') {
						cssArr[1] = minLightCSS;
					} else if (defs.gCSSType === 'uncompressed') {
						cssArr[1] = lightCSS;
					}
					break;
				case "dark":
					if(defs.gCSSType === 'minified') {
						cssArr[1] = minDarkCSS;
					} else if (defs.gCSSType === 'uncompressed') {
						cssArr[1] = darkCSS;
					}
					break;
				case "midnight":
					if(defs.gCSSType === 'minified') {
						cssArr[1] = minMidnightCSS;
					} else if (defs.gCSSType === 'uncompressed') {
						cssArr[1] = midnightCSS;
					}
					break;
			}

			cssArrLength = cssArr.length;

			//Check if <link> element exists in document
			for(var k = 0; k < cssArrLength; k++) {
				
				if(!$("link[href='" + directory + "/" + cssArr[k] + "']").length) {
					$("<link href='" + directory + "/" + cssArr[k] + "' rel='stylesheet' type='text/css'/>").appendTo("head");
				}

			}

		}

		//Generate Pagination
		function __generate_Pagination(elem) {
			elem.after('<div id="gallerize-pagination" />');

			var pagWrapper = $('#gallerize-pagination');

			$gPaginationWrap = pagWrapper;

			var html = '', active = '';
			var pageClass;
			var count = 0;

			switch(defs.paginationStyle) {
				case "dots":
					pageClass = 'gallerize-dots';
					break;
				case "bars":
					pageClass = 'gallerize-bars';
					break;
				case "numbers":
					pageClass = 'gallerize-num';
					break;
			}

			$list.each(function() {

				var ind = $list.index($(this));

				if(count === 0) {
					active = ' active';
				} else {
					active = '';
				}

				html += '<a href="#" class="' + pageClass + active + ' gPagination" data-target="' + ind + '">';

				count++;
			});

			pagWrapper.html(html);


		
		}



		//Generate Zoom Wrappers
		function __generate_Zoom() {

			$('.gallerize.gallerize-panel').after("<div class='gZoomWrapper' />");
			$('.gZoomWrapper').css('width', $gWrapper.width()).css('height', $gStage.height());

			$list.each(function() {
				$(this).append('<div class="gZoomLens" />');
			});

		}

		//Generate Lightbox Wrappers
		function __generate_lightBox() {

			$gWrapper.before("<div id='gLBoxWrapper' />");

			$gLBoxWrapper = $('#gLBoxWrapper');


			$gLBoxWrapper.html('<div id="gLBoxTopNav"></div><div id="gLBoxSlider"></div><div id="gLBoxBotNav"><a href="#" class="gLBox-prev">' + defs.LBoxLeftArrow + '</a><a href="#" class="gLBox-next">' + defs.LBoxRightArrow + '</a></div><a href="#" id="gLBoxClose">x</a>');


			//Propogate List
			var html = "";
			
			$list.each(function() {
				
				html += "<div class='slide'>";

				if($(this).hasClass('g360pi')) {

				var ind = $list.index($(this));
				var gLi = $list.eq(ind).children('ul').children('li');

				if(defs.gDebug) {
					console.log('LightBox Index: ' + ind);
				}
					
				//html += '<img src="' + gLi.html() + '" />';
				html += '<img src="' + gLi.first().find('img').attr('src') + '" />';
					

				} else {
					if(defs.gLazyLoad) {
						html += '<img src="' + $(this).find('img').attr('data-src') + '" />';
					} else {
						html += '<img src="' + $(this).find('img').attr('src') + '" />';
					}
				}

				html += "</div>";
			});

			$('#gLBoxSlider').html(html);


		}

		//Load LightBox with Slide
		function __load_LightBox(index) {

			$gLBoxWrapper.fadeIn(250);
			$('#gLBoxSlider').children('div.slide.current').removeClass('current');
			$('#gLBoxSlider').children('div.slide').eq(index).addClass('current');

		}

		//LightBox next
		function __next_LightBox() {

			var list = $('#gLBoxSlider').children('div.slide');
			var curr = list.filter('.current');
			var next = curr.next();

			curr.removeClass('current');
			if(next.length === 0) {
				list.first().addClass('current');
			} else {
				next.addClass('current');
			}

		}

		//LightBox prev
		function __prev_LightBox() {

			var list = $('#gLBoxSlider').children('div.slide');
			var curr = list.filter('.current');
			var next = curr.prev();

			curr.removeClass('current');
			if(next.length === 0) {
				list.last().addClass('current');
			} else {
				next.addClass('current');
			}

		}


		//SEO-Friendly Function that gives alt tags based on filename
		//if it is missing
		function __seo_friendly() {

			var allImg = $gWrapper.find("img");

			allImg.each(function() {

				var el = $(this);
				var attr = $(this).attr('alt');
				var filePath = $(this).attr('src');

				var fileSplit = filePath.split('/');
				var file = fileSplit.pop();


				if(typeof attr === typeof undefined || attr === false) {
					$(this).attr('alt', file);
				}

			});

		}

		//Return the Class of selected Theme
		function __theme_select() {
			
			switch(defs.gTheme) {
				case "default":
					 $gThemeClass = 'theme-default';
					break;
				case "light":
					$gThemeClass = 'theme-light';
					break;
				case "dark":
					$gThemeClass = 'theme-dark';
					break;
				case "midnight":
					$gThemeClass = 'theme-midnight';
					break;
				default:
					$gThemeClass = 'theme-default';
					break;
			}

			return $gThemeClass;

		}


		//AutoPlay Function
		function __autoPlay(action, index) {

			//Link to Set/Reset timers

			if(action === "pause") {
				__clear_Timers($apTimer);
			} else if (action === "play") {
				__set_Timers(index);
			}

			if(defs.gDebug) {
				console.log('Executing __autoPlay. Action: ' + action + ' on index (' + index + ')');
			}

		}

		//Function to control timing of Slideshow/Gallery
		function __set_Timers(index) {

			//Check if next element is 360 Product Image
			var currSlide = $list.filter('.active');
			var nextSlide = $list.eq(index);
			var nextSlideIndex;
			var is360pi = false;
			var totalTime360pi = 0;

			if(nextSlide.length === 0) {
				nextSlide = $list.first();
			}

			nextSlideIndex = $list.index(nextSlide);


			if(nextSlide.hasClass('g360pi')) {
				is360pi = true;
			}

			//Calculate total time of 360 Product Images
			if(is360pi) {

				var allPics = nextSlide.children('ul').children('li');
				var countPics = allPics.length;
				totalTime360pi = defs.threeSixPiDelay * countPics;

				if(defs.threeSixPiLoop !== "forever") {
					totalTime360pi = totalTime360pi * defs.threeSixPiLoop; 
				} else {

					if(defs.autoPlay) {
						while(totalTime360pi <= defs.pauseSpeed) {
							totalTime360pi += totalTime360pi;
						}
					}

				}

			}

			
			if(defs.gDebug) {
				console.log('Function __set_Timers called on index: ' + nextSlideIndex);
			}

			if(!is360pi) {
				__slide_Control(nextSlideIndex);
			} else if (is360pi && totalTime360pi >= 0) {

				$next360piTime = totalTime360pi;

				if(defs.gDebug) {
					console.log(totalTime360pi)
				}

				__slide_Control(nextSlideIndex);
			}

			


		}

		//Function to clear and reset the timers
		function __clear_Timers(elem) {

			clearTimeout(elem, 0);

		}

		//Function to go to Thumbnail Slide
		function __goTo_Thumb(index) {

			__slide_Control(index);

		}

		//Function to go to next Slide
		function __goNext() {

			var currSlide = $list.filter('.active');
			var nextSlide = currSlide.next();

			if(nextSlide.length === 0) {
				nextSlide = $list.first();
			}

			var ind = $list.index(nextSlide);

			if(defs.autoPlay) {
				__autoPlay('pause', null);
				__autoPlay('play', ind);
			} else {
				__slide_Control(ind);	
			}
			

		}

		//Function to go to previous Slide
		function __goPrev() {

			var currSlide = $list.filter('.active');
			var prevSlide = currSlide.prev();

			if(prevSlide.length === 0) {
				prevSlide = $list.last();
			}

			var ind = $list.index(prevSlide);


			if(defs.autoPlay) {
				__autoPlay('pause', null);
				__autoPlay('play', ind);
			} else {
				__slide_Control(ind);	
			}

		}

		//Function to control slides
		function __slide_Control(index) {


			//List of Main Elements
			var mainEl = $list;
			var first = true;

			//Change Global Var for where slide is currently at
			$gSlideIsAt = index + 1;

			//Get current active and surrounding slides
			var active = $list.filter('.active');

			//Apply animation style to active slide and remove active class
			if($isRunTime) {
				active.removeClass(defs.animationStyleIn + ' animated').removeClass('active');
			} else {
				active.removeClass(defs.animationStyleIn + ' animated').addClass(defs.animationStyleOut + ' animated phasing').removeClass('active');
			}
			

			setTimeout(function() {
				active.removeClass(defs.animationStyleOut + ' phasing animated');
			}, defs.transitionSpeed);



			if(defs.showThumbs) {
				var thumbList = $gThumbWrap.children('ul').children('li');
			}

			if(defs.pagination) {
				var paginationList = $gPaginationWrap.children('a');
			}

			//Check action type: slide number or Next/Prev

				
			if(defs.gLazyLoad) {

				if($list.eq(index).hasClass('g360pi')) {
					var list = $list.eq(index).find('img');
					list.each(function() {
						$(this).attr('src', $(this).data('src'));
					});
				} else {
					$list.eq(index).find('img').attr('src', $list.eq(index).find('img').attr('data-src')).removeClass('gLazyLoad');
				}
			}

			if ($transformProperty) {
				setTimeout( function () {
			  	  $gStage.css($transformProperty, 'translate3d(-' + (($gSlideIsAt - 1) * $listWidth) + 'px, 0px, 0px');
			    }, 300);
			}

			if(!$isRunTime) {

				$list.eq(index).addClass(defs.animationStyleIn + ' animated active');

				if(defs.autoPlay) {
					$apTimer = setTimeout(function() { __autoPlay('play', index + 1)}, defs.pauseSpeed);
				}

			} else {

				

				$list.eq(index).addClass('active');
				$isRunTime = 0;

				if(defs.autoPlay) {
					$apTimer = setTimeout(function() { __autoPlay('play', index + 2)}, defs.pauseSpeed);
				}

				
			}


			if(defs.gDebug) {
				console.log('__slide_Control index: ' + index);
			}


			if($list.eq(index).hasClass('g360pi')) {
				gallerize_360pi($list.eq(index), true);
			} 


			



			//Find new active and change thumbnail active
			if(defs.showThumbs) {
				
				var index = $list.index($list.filter('.active'));
				thumbList.filter('.active').removeClass('active');
				thumbList.eq(index).addClass('active');

			}

			if(defs.pagination) {
				var index = $list.index($list.filter('.active'));
				paginationList.filter('.active').removeClass('active');
				paginationList.eq(index).addClass('active');
			}



		}


		//Change Image Sizes
		function __rsp_ImgSize() {

			var allImg = $subList.find('li');
			var width = $gWrapper.width();
			$listWidth = width;
			$gStage.css('width', width * $list.length);

			allImg.each(function() {
				$(this).css('width', width);

				if(defs.gDebug) {
					console.log(width);
				}


			});

			if ($transformProperty) {
			    $gStage.css($transformProperty, 'translate3d(-' + (($gSlideIsAt-1) * $listWidth) + 'px, 0px, 0px');
			    
			}

		}


		//Make Gallerize Responsive
		function __make_responsive() {
			//TO DO;; expected release 0.2pre
		}


		//Support Twitter's Bootstrap v3 
		function __supp_Bootstrap(classCol) {
			//TO EXTEND;; expected release 0.2pre
			$gWrapper.addClass(classCol);

		}

		//Overlay for Slides
		function __apply_Opacity_Overlay() {

			var allImg = $list.find('img');

			allImg.each(function() {

				var par = $(this).closest('.gallerize-list-main');
				if(!par.hasClass('g360pi')) {
					$(this).wrap('<div class="gOverlayWrap" />').after('<div class="gOverlay" />');
				}

			});

			$('.gOverlay').css('background', defs.opacityOverlayColour).css('opacity', defs.opacityOverlayRange);

		}


		//Lazy-Load Images
		function __lazy_load() {

			//Get all images
			var allImg = $list.find('img');
			var findRatio = 0;


			allImg.each(function() {

				var el = $(this);
				var src = $(this).attr('src');
				var parLi = $(this).closest('li');
				var par = $(this).parents('li.gallerize-list-main');

				if(!par.hasClass('active') || !par.hasClass('g360pi')) {
					
					$(this).attr('data-src', src);
					$(this).removeAttr('src');
					$(this).addClass('gLazyLoad');
				} else if (par.hasClass('g360pi')) {
					
					var parFi = par.children('ul').children('li:eq(0)');
					var liThis = par.children('ul').children('li');

					if(defs.gDebug) {
						console.log('Lazy Load g360pi Parent Class: ' + parLi.hasClass('cover'));
						console.log('Image source: ' + el.attr('src'));
					}


				}


			});

		}


		//Caption Styling/Animation
		function __caption_style(animation) {
			//TO DO;; expected release 0.2pre

		}

		//Apply Gallerize Mode Type
		function __gallerize_mode(type) {
			//TO DO;; expected release 0.2pre
			switch(type) {
				case "basic":
					__generate_Basic();
					break;
				case "cubed":
					__generate_Cubed();
					break;
				case "accordion":
					__generate_Accordion();
					break;
				case "timeline":
					__generate_Timeline();
					break;
				case "carousel":
					__generate__Carousel();
					break;
				case "photostack":

					break;
				default:
					__generate_Basic();
					break;
			}

		}

		

		//Function to auto-rotate 360 Product Images [TO FIX]
		function gallerize_360pi(elem, run) {
			
			var $el = elem;
			var $sub = $el.children('ul').children('li');
			var $cycles = 0;
			var $revPerProd = 0;
			var $count = 0;

			if(defs.gDebug) {
				console.log('360 Product Image on List Index: ' + $list.index(elem));
			}


			$sub.first().addClass('cover show').removeClass('hide').css('visibility', 'visible');

			$sub.each(function() {
				
				if(!$(this).hasClass('show')) {
					$(this).addClass('hide').css('visibility', 'hidden');
				}

				$(this).addClass('g360pi').attr('data-gallerize-order', $count+1);

				$count++;

			});

			

			if(defs.opacityOverlay) {
				$el.children('ul').wrap('<div class="gOverlayWrap" />').after('<div class="gOverlay" />');
			}

			if(run) {

				function gallerize_nextImg() {

					if(defs.gDebug) {
						console.log('Executing sub-function "gallerize_nextImg()"...');
					}
					

					var $threeSixPiCurr = $sub.filter('.show');
					var $threeSixPiNext = $threeSixPiCurr.next();

					if(defs.gDebug) {
						console.log('Currently on 360 Product Image Index: ' + $threeSixPiCurr.data('gallerize-order'));
					}



					if($threeSixPiNext.length === 0) {
						$threeSixPiNext = $sub.filter('li:eq(0)').addClass('show').removeClass('hide').css('visibility', 'visible');
						$revPerProd++;
					}

				
				
					if($revPerProd < $count) {
						$threeSixPiCurr.addClass('hide').removeClass('show').css('visibility', 'hidden');
						$threeSixPiNext.addClass('show').removeClass('hide').css('visibility', 'visible');

						if(defs.threeSixPiLoop === 'forever') {
							$timeoutArr[1] = setTimeout(gallerize_nextImg, defs.threeSixPiDelay);
						} else {

							if($cycles < ($count * defs.threeSixPiLoop) - 1) {
								$cycles++;
								$timeoutArr[2] = setTimeout(gallerize_nextImg, defs.threeSixPiDelay);
							} else {

								//Continue to next slide, otherwise do nothing.
								if(defs.autoPlay) {
									
									//Next Slide & Reset Timers
									__goNext();

									$cycles = 0;
									$count = 0;

								}

							}

						}
					}

				}

			}

			//Trigger Auto-Rotate 360 Image
			$timeoutArr[3] = setTimeout(gallerize_nextImg, 100);
		}


		//Function to Generate Thumbnails
		function gallerize_genThumb(list) {

			var genThumbEL = list;

			//Get List of Main Elements
			var genThumbImgArr = genThumbEL.children('li');
			var genThumbInc = 1;

			var genThumbHTML = '<ul>';

			genThumbImgArr.each(function() {

				var activeClass;

				if(genThumbInc === 1) {
					activeClass = 'active';
				} else {
					activeClass = '';
				}

				if($(this).hasClass('g360pi')) {
					genThumbHTML += '<li class="' + activeClass + '"><a href="#" class="gallerize-goto" data-target="' + genThumbInc +'"><img src="' + $(this).children('ul').children('li').find('img').prop('src') + '" width="' + defs.thumbWidth + '" height="' + defs.thumbHeight + '"><span class="g360pi_imgTitle">360&deg;</span></a></li>';
				} else {
					genThumbHTML += '<li class="' + activeClass + '"><a href="#" class="gallerize-goto" data-target="' + genThumbInc +'"><img src="' + $(this).children('img').prop('src') + '" width="' + defs.thumbWidth + '" height="' + defs.thumbHeight + '"></a></li>';
				}

				genThumbInc++;

			});

			genThumbHTML += '</ul>';

			$gThumbWrap.html(genThumbHTML);



		}


		//Function to Generate Navigation Controls
		function gallerize_genControls() {

			var gallerize_controls = '<span id="gallerize-prev">' + defs.navLeftArrow + '</span><span id="gallerize-next">' + defs.navRightArrow + '</span>';


			$('.gallerize-stage').after(gallerize_controls);

		}


		/* ;;; EVENT LISTENERS ;;; */

		$( window ).resize(function() {

			setTimeout(__rsp_ImgSize(), 50);

		});

		$( window ).on("orientationchange", function (ev) {
			setTimeout(__rsp_ImgSize(), 50);
		});

		if(defs.autoPlay) {

			//Code Better
			$gWrapper.on('hover mouseover', $list.filter('li.active'), function() {
				//__clear_Timers($apTimer);
			});

			$gWrapper.on('mouseleave', $list.filter('li.active'), function() {
				//__set_Timers($gSlideIsAt-1);
			});

		}

		$gWrapper.on('click', '#gallerize-next', function() {
			__goNext();
		});

		$gWrapper.on('click', '#gallerize-prev', function() {
			__goPrev();
		});

		
		//LightBox Functions
		if(defs.gViewMode === "lightbox" || defs.gViewMode === 'both') {
			$gWrapper.on('click', '.glbx-hover', function() {

				var index = $list.index($(this));
				__load_LightBox(index);

				if(defs.autoPlay) {
					__autoPlay('pause', null);
				}

				$gLBoxWrapper.fadeIn(250);

			});

			$gLBoxWrapper.on('click', "#gLBoxClose", function () {

				$gLBoxWrapper.fadeOut(250);

				if(defs.autoPlay) {
					__autoPlay('play', $gSlideIsAt-1);
				}

			});

			$gLBoxWrapper.on('click', ".gLBox-prev", function () {
				__prev_LightBox();
			});

			$gLBoxWrapper.on('click', ".gLBox-next", function () {
				__next_LightBox();
			});
		}

		if(defs.gViewMode === 'zoom' || defs.gViewMode === 'both') {
			$gWrapper.on('mousemove', '.gallerize-list-main.active', function(e) {
				
				if(defs.autoPlay) {
					__autoPlay('pause', null);
				}

				var lens = $(this).find('.gZoomLens');
				var lensWidth = $(this).width() / 3;
				var lensHeight = $(this).height() / 3;

				var maxLeft = (lensWidth * 2) - 2;
				var maxTop = (lensHeight * 2) - 2;
				var mouseX = e.pageX - lensWidth / 2;
				var mouseY = e.pageY - lensHeight / 2;

				if(mouseX < 0) {
					mouseX = 0;
				} else if (mouseX >= maxLeft) {
					mouseX = maxLeft;
				}

				if(mouseY < 0) {
					mouseY = 0;
				} else if (mouseY >= maxTop) {
					mouseY = maxTop;
				}

				lens.fadeIn(250).addClass('active').css('width', lensWidth).css('height', lensHeight).css({left: mouseX, top: mouseY});


				var img;
				if($(this).hasClass('g360pi')) {
					var active = $(this).children('ul').children('li').filter('.show');
					img = active.find('img');
				} else {
					img = $(this).find('img');
				}

				var imgNatWidth = img.prop("naturalWidth");
				var imgNatHeight = img.prop("naturalHeight");
				var zoomX = ((imgNatWidth / lensWidth) * mouseX )/ 3;
				var zoomY = ((imgNatHeight / lensHeight) * mouseY) / 3;

				$('.gZoomWrapper').html('<div class="gZoom" />').show();
				$('.gZoom').css('background-image', 'url('+img.attr('src')+')').css('background-size', img.prop("naturalWidth") + 'px ' + img.prop("naturalHeight") + 'px').css('background-position', '-' + zoomX + 'px -' + zoomY + 'px');

			});

			$gWrapper.on('mouseleave', '.gallerize-list-main.active', function(e) {
				$('.gZoomWrapper').fadeOut(250);
				$('.gZoomLens.active').fadeOut(250).removeClass('active');

			});
		}


		if(defs.pagination) {

			$gWrapper.on('click', '.gPagination', function(ev) {

				ev.preventDefault();

				$('.gPagination.active').removeClass('active');
				$(this).addClass('active');
				__autoPlay('play', $(this).attr('data-target'));
			});

		}





		if(defs.showThumbs) {

			$gThumbWrap.on('click', '.gallerize-goto', function() {

				var index = $(this).data('target');

				__goTo_Thumb(index-1);

			});

		}

		/* ;;; END EVENT LISTENERS ;;; */
		

		//Function to Return supported CSS3 transform property
		function getSupportedPropertyName(properties) {
		    for (var i = 0; i < properties.length; i++) {
		        if (typeof document.body.style[properties[i]] != "undefined") {
		            return properties[i];
		        }
		    }
		    return null;
		}



	};

}(jQuery));