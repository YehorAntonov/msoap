/**
 * Use this file to all in scripts and functions you would like to have globally or on specific
 * pages. You will use this to extend your theme instead of adding code to the core framework files.
 */
function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if (script.readyState) {
		script.onreadystatechange = function() {
			if (script.readyState === "loaded" || script.readyState === "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {
		script.onload = function() {
			callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}
const themeFunctionality = {
	global() {
		/**
		 * Add `ID`, `CLASS`, and `aria-describedby` attributes to `INPUT` and `SELECT` elements
		 * dynamically created by Miva, where needed.
		 */
		let mvtInputWraps = document.querySelectorAll('[data-hook~="mvt-input"]');
		let mvtSelectWraps = document.querySelectorAll('[data-hook~="mvt-select"]');
		let styleMVT = function styleMVT(element, input) {
			let mvtItems = element.querySelectorAll(input);
			let attr = {
				id: element.getAttribute('data-mvt-id'),
				classes: element.getAttribute('data-mvt-classlist'),
				description: element.getAttribute('data-mvt-describedby'),
				autocomplete: element.getAttribute('data-mvt-autocomplete')
			};

			mvtItems.forEach((mvtItem, i) => {
				if (attr.id !== null) {
					const uniqueId = i === 0 ? attr.id : `${attr.id}_${i + 1}`;
					mvtItem.setAttribute('id', uniqueId);
				}
				if (attr.classes !== null) {
					mvtItem.setAttribute('class', attr.classes);
				}
				if (attr.description !== null) {
					mvtItem.setAttribute('aria-describedby', attr.description);
				}
				if (attr.autocomplete !== null) {
					mvtItem.setAttribute('autocomplete', attr.autocomplete);
				}
			});
		};

		mvtInputWraps.forEach(element => {
			styleMVT(element, 'input');
		});


		mvtSelectWraps.forEach(element => {
			styleMVT(element, 'select');
		});

		/**
		 * Search form toggle for smaller screens
		 */
		(() => {
			const header = document.querySelector('[data-hook="site-header"]');
			const headerSearch = header.querySelector('[data-hook="site-header__search"]');
			const headerSearchToggle = header.querySelector('[data-hook="open-header-search"]');

			if (headerSearch && headerSearchToggle) {
				const headerSearchInput = headerSearch.querySelector('input');

				headerSearchToggle.addEventListener('click', () => {
					let isActive = header.classList.contains('search-is-active');

					if (!isActive) {
						header.classList.add('search-is-active');
						headerSearchInput.focus();
					}
					else {
						header.classList.remove('search-is-active');
						headerSearchToggle.focus();
					}
				});
			}
		})();
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js", function() {
			$('[data-hook="global-account"]').click(function() {
			let ariaExpanded = $(this).attr('aria-expanded');
			if (ariaExpanded === 'false') {
				$('#global-account').attr('aria-hidden', 'false');
				$(this).attr('aria-expanded', 'true');
			}
			else {
				$('#global-account').attr('aria-hidden', 'true');
				$(this).attr('aria-expanded', 'false');
			}
			})
		});
		$('body').on('click', '[data-hook="button-add-to-cart"]', function(e) {
			var btnAddToCart = $(this);
		
			console.log(btnAddToCart);
			var product_code = btnAddToCart.data('product-code');
			console.log(product_code)
			$('[data-hook="button-add-to-cart"]').prop("disabled", true);
			btnAddToCart.text('Processing...');
		
			ajaxAddToCart(product_code, 1, function() {
				$('[data-hook="button-add-to-cart"]').prop("disabled", false);
				btnAddToCart.text('Add To Cart');
			});
		});
		





		function ajaxAddToCart(Product_Code, Quantity, callback) {
			//create object with type of request and options, add product to cart
			var data = {
			Action: "ADPR",
			Product_Code,
			Quantity
			};

	
			//create object with ajax request
			var miniBasketRequest = $.ajax({
			method: "POST",
			data: data,
			url: "https://miraclesoap.mivatest.com/basket-contents.html",
			});
	
			//method done with function of response from server
			miniBasketRequest.done(function (response) {
				$('[data-hook="open-mini-basket"]').html($(response).find('[data-hook="open-mini-basket"]').first().html());
				$('[data-hook="mini-basket"]').html($(response).find('[data-hook="mini-basket"]').first().html());
				//open mini basket with click
				// $('[data-hook="open-mini-basket"]')[0].click();
				//callback
	
				callback && callback();
			});
			//output error
			miniBasketRequest.fail(function (jqXHR, textStatus) {
			//console.log( "Request failed: " + textStatus );
			});
		};
	},
	init() {
		/**
		 * Initialize the A11y-Toggle extension
		 */
		a11yToggle();
		if (_hook('global-account') && _hook('global-account').length !== 0) {
			a11yToggleClose(_hook('global-account')); // Close the global account box when clicking on a different target.
		}
		$(document).ready(function() {
			$(".products").hover(function() {
				$(".products").css('transform', 'scale(1.1)');
			}, function() {
				$(".products").css('transform', 'scale(1)');
			})
			$(".product__history").hover(function() {
				$(".product__history").css('transform', 'scale(1.1)');
			}, function() {
				$(".product__history").css('transform', 'scale(1)');
			})
			$(".testimonials").hover(function() {
				$(".testimonials").css('transform', 'scale(1.1)');
			}, function() {
				$(".testimonials").css('transform', 'scale(1)');
			})
			$(".faqs").hover(function() {
				$(".faqs").css('transform', 'scale(1.1)');
			}, function() {
				$(".faqs").css('transform', 'scale(1)');
			})
			$(".contact").hover(function() {
				$(".contact").css('transform', 'scale(1.1)');
			}, function() {
				$(".contact").css('transform', 'scale(1)');
			})
		})
		/**
		 * Initialize Quantify extension
		 */
		quantify.init(document);

		/**
		 * Initialize the Mini-Basket extension
		 */
		miniBasket?.init?.();


		/**
		 * Initialize the Transfigure Navigation extension
		 */
		$.hook('has-drop-down').transfigureNavigation();

	},
	stateDatalist() {
		/**
		 * [1] This function is an enhancement to the `datalist` State/Province and Country replacement.
		 * Since a customer can type a value in the input, this will check if the entered value
		 * matches one of the output values or text entries. If so, it passes the value back to
		 * ensure proper functionality with shipping modules, i.e. 2 letter abbreviations for
		 * US and Canada. Otherwise, it the entry is used as typed.
		 *
		 * [2] This function will toggle the HTML "required" attribute on the state field depending on
		 * which country the customer has selected. If you want to change the countries that require a
		 * state or province, you can modify the `countriesRequiringSP` entry below. If you are using
		 * the billing address as the primary, modify the `primaryAddress` variable below.
		 *
		 * @type {string[]}
		 */

		const countriesRequiringSP = ['AR', 'AU', 'BR', 'CA', 'CN', 'IN', 'ID', 'IT', 'JP', 'MX', 'TH', 'US'];
		const datalist = document.querySelectorAll('[data-datalist]');
		const primaryAddress = 'shipping';

		// [1]
		function checkOption(entry, list) {
            let datalist = document.querySelector(`#${list}`);
			let datalistOptions = datalist.querySelectorAll('option');
			let value = '';

            for (let option of datalistOptions) {
				if (entry.toLowerCase() === option.value.toLowerCase() || entry.toLowerCase() === option.text.toLowerCase()) {
					value = option.value;
				}
			}

			return value;
		}

		// [2]
		function updateRequiredStateAttributes(countrySelector, stateInput) {
			countrySelector.addEventListener('change', () => {
				let selectedCountry = countrySelector.options[countrySelector.selectedIndex].value;

				if (countriesRequiringSP.includes(selectedCountry)) {
					stateInput.setAttribute('required', '');
					stateInput.setAttribute('aria-required', 'true');
				}
				else {
					stateInput.removeAttribute('required');
					stateInput.removeAttribute('aria-required');
				}
			});
		}

		if (datalist.length > 0) {
			for (let list of datalist) {
                list.addEventListener('blur', () => {
					let thisDatalist = list.getAttribute('list');
					let checkValue = checkOption(list.value, thisDatalist);

					if (checkValue) {
						list.value = checkValue;
						list.previousElementSibling.value = checkValue;
					}
					else {
						list.previousElementSibling.value = list.value;
					}
				});
			}

			const formElement = document.querySelector('[data-validate-address]');
			const updateShippingState = document.querySelector('#shipping_selector');
			const updateBillingState = document.querySelector('#billing_selector');
			let billPrefix;
			let shipPrefix;

			if (formElement) {
				if (formElement.elements.hasOwnProperty('Action') && (formElement.elements.Action.value === 'ORDR')) {
					billPrefix = 'Bill';
					shipPrefix = 'Ship';
				}
				else if (formElement.elements.hasOwnProperty('Action') && (formElement.elements.Action.value === 'ICST' || formElement.elements.Action.value === 'UCST')) {
					billPrefix = 'Customer_Bill';
					shipPrefix = 'Customer_Ship';
				}
				else if (formElement.elements.hasOwnProperty('Action') && (formElement.elements.Action.value === 'ICSA' || formElement.elements.Action.value === 'UCSA')) {
					billPrefix = 'Address_';
					shipPrefix = 'Address_';
				}

				const shippingState = document.querySelector(`input[name="${shipPrefix}State"]`);
				const billingState = document.querySelector(`input[name="${billPrefix}State"]`);

				function updateState({nextElementSibling, value}) {
					nextElementSibling.value = value;
					nextElementSibling.blur();
				}

				if (shippingState.value !== '') {
					shippingState.nextElementSibling.value = shippingState.value;
				}
				shippingState.nextElementSibling.blur();

				if (billingState.value !== '') {
					billingState.nextElementSibling.value = billingState.value;
				}
				billingState.nextElementSibling.blur();

				if (updateShippingState !== null) {
					updateShippingState.addEventListener('change', () => {
						updateState(shippingState);
					});
				}

				if (updateBillingState !== null) {
					updateBillingState.addEventListener('change', () => {
						updateState(billingState);
					});
				}

				if (primaryAddress === 'shipping') {
					const shippingCountrySelector = document.querySelector(`#${shipPrefix}Country`);
					const shippingStateInput = document.querySelector(`#${shipPrefix}StateSelect`);

					updateRequiredStateAttributes(shippingCountrySelector, shippingStateInput);
				}
				else {
					const billingCountrySelector = document.querySelector(`#${billPrefix}Country`);
					const billingStateInput = document.querySelector(`#${billPrefix}StateSelect`);

					updateRequiredStateAttributes(billingCountrySelector, billingStateInput);
				}

				(() => {
					document.querySelector(`#${shipPrefix}Country`).dispatchEvent(new Event('change', {'bubbles': true}));
					document.querySelector(`#${billPrefix}Country`).dispatchEvent(new Event('change', {'bubbles': true}));
				})();
			}
		}
	},
    jsSFNT() {
		loadScript("https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js", function() {
			function initializeSlick() {
				$(".grid-products-container").slick({
					lazyLoad: "ondemand",
					autoplay: true,
					autoplaySpeed: 3000,
					slidesToShow: 5,
					slidesToScroll: 1,
					infinite: true,
					
					
					
					
					responsive: [
						{
							breakpoint: 1350,
							settings: {
								slidesToShow: 4
							}
						},
						{
							breakpoint: 1150,
							settings: {
								slidesToShow: 4
							}
						},
						{
							breakpoint: 1020,
							settings: {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 960,
							settings: {
								slidesToShow: 3,
								arrows: false
							}
						},
						{
							breakpoint: 720,
							settings: {
								slidesToShow: 2,
								arrows: false
							}
						},
						{
							breakpoint: 520,
							settings: {
								slidesToShow: 1,
								centerPadding: '75px',
								arrows: false
							}
						},
						{
							breakpoint: 485,
							settings: {
								slidesToShow: 1,
								centerPadding: '90px',
								arrows: false
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								centerPadding: '80px',
								arrows: false
							}
						},
						{
							breakpoint: 450,
							settings: {
								slidesToShow: 1,
								centerPadding: '70px',
								arrows: false
							}
						},
						{
							breakpoint: 420,
							settings: {
								slidesToShow: 1,
								centerPadding: '60px',
								arrows: false
							}
						},
						{
							breakpoint: 390,
							settings: {
								slidesToShow: 1,
								centerPadding: '50px',
								arrows: false
							}
						}
					]
				});

				$(".grid-products-container").show();
			};
			if (typeof jQuery !== 'undefined') {
				if ($.fn.slick) {
					initializeSlick();
				} else {
					$.getScript('https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', function () {
						initializeSlick();
					});
				};
			};
		});
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/Readmore.js/2.2.0/readmore.js", function() {
			$('.long-description').each(function() {
				if ($(this).height() <= 63) {

				}
				else {
					$(this).addClass('description-category-after');
					$(this).readmore({
						speed: 550,
						collapsedHeight: 63,
						moreLink: '<a class="more-link show-more" href="#">Read More</a>',
						lessLink: '<a class="less-link show-less" href="#">Show Less</a>',
						beforeToggle: function(trigger, element, expanded) {
							if (expanded) {
								$(element).addClass('description-category-after')
							}
							else {
								$(element).removeClass('description-category-after')
							}
						}
					});
				}
			})
		});

		$(document).ready(function() {
			$(".products").hover(function() {
				$(".products").css('transform', 'scale(1.1)');
			}, function() {
				$(".products").css('transform', 'scale(1)');
			})
			$(".product__history").hover(function() {
				$(".product__history").css('transform', 'scale(1.1)');
			}, function() {
				$(".product__history").css('transform', 'scale(1)');
			})
			$(".testimonials").hover(function() {
				$(".testimonials").css('transform', 'scale(1.1)');
			}, function() {
				$(".testimonials").css('transform', 'scale(1)');
			})
			$(".faqs").hover(function() {
				$(".faqs").css('transform', 'scale(1.1)');
			}, function() {
				$(".faqs").css('transform', 'scale(1)');
			})
			$(".contact").hover(function() {
				$(".contact").css('transform', 'scale(1.1)');
			}, function() {
				$(".contact").css('transform', 'scale(1)');
			})
		})
	},
	jsFAQS() {
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js", function() {
			$(document).ready(function() {
				$("#1-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#1-question").offset().top
					}, 10)
				})
				$("#2-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#2-question").offset().top
					}, 10)
				})
				$("#3-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#3-question").offset().top
					}, 10)
				})
				$("#4-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#4-question").offset().top
					}, 10)
				})
				$("#5-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#5-question").offset().top
					}, 10)
				})
				$("#6-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#6-question").offset().top
					}, 10)
				})
				$("#7-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#7-question").offset().top
					}, 10)
				})
				$("#8-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#8-question").offset().top
					}, 10)
				})
				$("#9-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#9-question").offset().top
					}, 10)
				})
				$("#10-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#10-question").offset().top
					}, 10)
				})
				$("#11-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#11-question").offset().top
					}, 10)
				})
				$("#12-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#12-question").offset().top
					}, 10)
				})
				$("#13-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#13-question").offset().top
					}, 10)
				})
				$("#14-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#14-question").offset().top
					}, 10)
				})
				$("#15-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#15-question").offset().top
					}, 10)
				})
				$("#16-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#16-question").offset().top
					}, 10)
				})
				$("#17-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#17-question").offset().top
					}, 10)
				})
				$("#18-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#18-question").offset().top
					}, 10)
				})
				$("#19-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#19-question").offset().top
					}, 10)
				})
				$("#20-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#20-question").offset().top
					}, 10)
				})
				$("#21-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#21-question").offset().top
					}, 10)
				})
				$("#22-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#22-question").offset().top
					}, 10)
				})
				$("#23-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#23-question").offset().top
					}, 10)
				})
				$("#24-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#24-question").offset().top
					}, 10)
				})
				$("#25-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#25-question").offset().top
					}, 10)
				})
				$("#26-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#26-question").offset().top
					}, 10)
				})
				$("#27-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#27-question").offset().top
					}, 10)
				})
				$("#28-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#28-question").offset().top
					}, 10)
				})
				$("#29-questions").click(function() {
					$('html, body').animate({
						scrollTop: $("#29-question").offset().top
					}, 10)
				})
			})
			$('#clear-search').click(function() {
				$('#search-id')[0].reset();
			})
			$.extend({
				debounced: function(fn, timeout, invokeAsap, ctx)  {
					/**
					 * Custom function to allow us to delay events until after the
					 * trigger has ended.
					 *
					 * Example: $(window).on('resize', $.debounced(function () {...DO SOMETHING...}, 100));
					 */
					if (arguments.length === 3 && typeof invokeAsap !== 'boolean') {
						ctx = invokeAsap;
						invokeAsap = false;
					}
					let timer;
		
					return () => {
						let args = arguments;
		
						ctx = ctx || this;
						invokeAsap && !timer && fn.apply(ctx, args);
						clearTimeout(timer);
						timer = setTimeout(() => {
							invokeAsap || fn.apply(ctx, args);
							timer = null;
						}, timeout);
					};
				}
			})
		
			var faqSearchInput = $('form.search-form-faq input')
			var faqQuestions = $('.faq-question')
			var faqLinks = $('.links-faq-container')
			var noResultsMessage = $('#faq-search-no-results')
			var faqSearchHandler = $.debounced(function() {
		
				var searchString = faqSearchInput.val().toLowerCase();
		
			console.log(searchString)
		
				if (searchString == '' || searchString.length < 3) {
					faqLinks.fadeIn();
					faqQuestions.fadeIn();
					noResultsMessage.hide();
					return false;
				}
		
		
		
				faqQuestions.each(function(){
		
					$this = $(this);
		
					var question = $this.children('span').text().toLowerCase();
		
					if (question.includes(searchString)) {
						$this.hide();
						$this.fadeIn();
					}
					else {
						$this.hide();
						faqLinks.hide();
					}
				})
		
				setTimeout(function() {
					if (faqQuestions.has(':visible').length) {
						noResultsMessage.hide();
					}
					else {
						noResultsMessage.fadeIn();
					}
				}, 500)
		
			}, 200);
		
			faqSearchInput.off().on('change keyup', function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				setTimeout(function() {
					faqSearchHandler(e);
				}, 500)
			});
			$('#search-id').on('submit', function(event) {
				event.preventDefault();
			})
		});
	},
    jsCTGY() {
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/Readmore.js/2.2.0/readmore.js", function() {
			if ($('#long-descrip').height() <= 76) {

			}
			else {
				$('#long-descrip').addClass('description-after');
				$('#long-descrip').readmore({
					speed: 1000,
					collapsedHeight: 76,
					moreLink: '<a class="more-link" href="#">Read More</a>',
					lessLink: '<a class="less-link" href="#">Show Less</a>',
					beforeToggle: function(trigger, element, expanded) {
						if (expanded) {
							$(element).addClass('description-after')
						}
						else {
							$(element).removeClass('description-after')
						}
					}
				});
			}
		})
		if ($(window).width() <= 960) {
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/Readmore.js/2.2.0/readmore.js", function() {
			$('.ctgy-description-long').each(function() {
				if ($(this).height() <= 60) {

				}
				else {
					$(this).addClass('description-after-product');
					$(this).readmore({
						speed: 550,
						collapsedHeight: 60,
						moreLink: '<a class="more-link show-more" href="#">Read More</a>',
						lessLink: '<a class="less-link show-less" href="#">Show Less</a>',
						beforeToggle: function(trigger, element, expanded) {
							if (expanded) {
								$(element).addClass('description-after-product')
							}
							else {
								$(element).removeClass('description-after-product')
							}
						}
					});
				}
			})
			$('.long-description').each(function() {
				if ($(this).height() <= 63) {

				}
				else {
					$(this).addClass('description-after-product');
					$(this).readmore({
						speed: 550,
						collapsedHeight: 63,
						moreLink: '<a class="more-link show-more" href="#">Read More</a>',
						lessLink: '<a class="less-link show-less" href="#">Show Less</a>',
						beforeToggle: function(trigger, element, expanded) {
							if (expanded) {
								$(element).addClass('description-after-product')
							}
							else {
								$(element).removeClass('description-after-product')
							}
						}
					});
				}
			})
		});
		}
		$('.counting').on('click', '.increment', function() {
			var quantityOfProduct = $(this).parent().find('.input-count');
			var qty = parseInt(quantityOfProduct.val());
			quantityOfProduct.val(qty + 1);
			updateCounter(quantityOfProduct);
		});
		$('.counting').on('click', '.decrement', function() {
			var quantityOfProduct = $(this).parent().find('.input-count');
			var qty = parseInt(quantityOfProduct.val()) - 1;
	
			if (qty >= 1) {
				quantityOfProduct.val(qty);
				updateCounter(quantityOfProduct);
			};
		});
		// $('.counting').on('input', '.input-count', function() {
		// 	updateCounter($(this));
		// });
		$('.counting').on('blur', '.input-count', function() {
			var value = $(this).val();
			
			if (value !== "" && !isNaN(value) && parseInt(value) > 0) {
				
			} 
			else {
				$(this).val(1);
			}
		});
		
		function updateCounter(quantityOfProduct) {
			var decrementBtn = quantityOfProduct.siblings('.decrement');
			var qty = parseInt(quantityOfProduct.val());
	
			if (isNaN(qty) || qty < 1) {
				qty = 1;
				quantityOfProduct.val(qty);
			}
			else {
				
			};
	
			decrementBtn.prop('disabled', qty === 1);
		};

		$('[data-hook="btn-add-to-cart"]').click(function(e) {
			var btnAddToCart = $(this);
			// console.log(btnAddToCart)
			var product_code = btnAddToCart.data('product-code');
			// console.log(product_code)
			var category_code = btnAddToCart.data('category-code');
			var qty = parseInt($(this).parent().find('.input-count').val());
	
			$('[data-hook="btn-add-to-cart"]').prop("disabled", true);
			btnAddToCart.text('Processing...');
			// console.log(qty)
			ajaxAddToCart(product_code, qty, function() {
				$('[data-hook="btn-add-to-cart"]').prop("disabled", false);
				btnAddToCart.text('Add To Cart');
			});
		});




		function ajaxAddToCart(Product_Code, Quantity, callback) {
			//create object with type of request and options, add product to cart
			var data = {
			Action: "ADPR",
			Product_Code,
			Quantity,
			};

	
			//create object with ajax request
			var miniBasketRequest = $.ajax({
			method: "POST",
			data: data,
			url: "https://miraclesoap.mivatest.com/basket-contents.html",
			});
	
			//method done with function of response from server
			miniBasketRequest.done(function (response) {
				$('[data-hook="open-mini-basket"]').html($(response).find('[data-hook="open-mini-basket"]').first().html());
				$('[data-hook="mini-basket"]').html($(response).find('[data-hook="mini-basket"]').first().html());
				//open mini basket with click
				$('[data-hook="open-mini-basket"]')[0].click();
				//callback
	
				callback && callback();
			});
			//output error
			miniBasketRequest.fail(function (jqXHR, textStatus) {
			//console.log( "Request failed: " + textStatus );
			});
		};



		$('[data-hook="btn-add-to-cart-gift"]').click(function(e) {
			var btnAddToCart = $(this);
			var attributes = {};
			var product_code = btnAddToCart.data('product-code');
			var emailAttrCode = btnAddToCart.parent().parent().find('.email-attr').attr('name');
			// console.log(emailAttr)
			var messageAttrCode = btnAddToCart.parent().parent().find('.message-attr').attr('name');
			// console.log(emailAttr)
			var emailAttrVal = btnAddToCart.parent().parent().find('.email-attr-val').attr('name');
			var messageAttrVal = btnAddToCart.parent().parent().find('.message-attr-val').attr('name');
			var emailVal = btnAddToCart.parent().parent().find('.email-attr-val').val();
			var messageVal = btnAddToCart.parent().parent().find('.message-attr-val').val();
			attributes[emailAttrCode] = 'gc-recipient';
			attributes[emailAttrVal] = emailVal;
			attributes[messageAttrCode] = 'gc-message';
			attributes[messageAttrVal] = messageVal;
			console.log(attributes)
			// e.preventDefault();
			$('[data-hook="btn-add-to-cart"]').prop("disabled", true);
			$('[data-hook="btn-add-to-cart-gift"]').prop("disabled", true);
			var qty = parseInt($(this).parent().find('.input-count').val());
			ajaxAddToCartGift(product_code, qty, attributes, function() {
				$('[data-hook="btn-add-to-cart"]').prop("disabled", false);
				$('[data-hook="btn-add-to-cart-gift"]').prop("disabled", false);
			});
		});

		function ajaxAddToCartGift(Product_Code, Quantity, attributes, callback) {
			//create object with type of request and options, add product to cart
			var data = {
			Action: "ADPR",
			Product_Code,
			Quantity,
			};
			if (attributes) {
                Object.assign(data, data, attributes);
            }
	
			//create object with ajax request
			var miniBasketRequest = $.ajax({
			method: "POST",
			data: data
			});
	
			//method done with function of response from server
			miniBasketRequest.done(function (response) {
				$('[data-hook="open-mini-basket"]').html($(response).find('[data-hook="open-mini-basket"]').first().html());
				$('[data-hook="mini-basket"]').html($(response).find('[data-hook="mini-basket"]').first().html());
				//open mini basket with click
				$('[data-hook="open-mini-basket"]')[0].click();
				callback && callback();
			});
			//output error
			miniBasketRequest.fail(function (jqXHR, textStatus) {
			//console.log( "Request failed: " + textStatus );
			});
		};
	},
    jsPROD() {
		/**
		 * Initialize the AJAX Add-To-Cart extension
		 */
		addToCart.init();

		/**
		 * Initialize the A11y-Tabs extension
		 */
		tabbedContent.init();
	},
    jsPLST() {
	},
    jsSRCH() {
		$('.counting').on('click', '.increment', function() {
			var quantityOfProduct = $(this).parent().find('.input-count');
			var qty = parseInt(quantityOfProduct.val());
			quantityOfProduct.val(qty + 1);
			updateCounter(quantityOfProduct);
		});
		$('.counting').on('click', '.decrement', function() {
			var quantityOfProduct = $(this).parent().find('.input-count');
			var qty = parseInt(quantityOfProduct.val()) - 1;
	
			if (qty >= 1) {
				quantityOfProduct.val(qty);
				updateCounter(quantityOfProduct);
			};
		});
		// $('.counting').on('input', '.input-count', function() {
		// 	updateCounter($(this));
		// });
		$('.counting').on('blur', '.input-count', function() {
			var value = $(this).val();
			
			if (value !== "" && !isNaN(value) && parseInt(value) > 0) {
				
			} 
			else {
				$(this).val(1);
			}
		});
		
		function updateCounter(quantityOfProduct) {
			var decrementBtn = quantityOfProduct.siblings('.decrement');
			var qty = parseInt(quantityOfProduct.val());
	
			if (isNaN(qty) || qty < 1) {
				qty = 1;
				quantityOfProduct.val(qty);
			}
			else {
				
			};
	
			decrementBtn.prop('disabled', qty === 1);
		};

		$('[data-hook="btn-add-to-cart"]').click(function(e) {
			var btnAddToCart = $(this);
			console.log(btnAddToCart)
			var product_code = btnAddToCart.data('product-code');
			var category_code = btnAddToCart.data('category-code');
			var qty = parseInt($(this).parent().find('.input-count').val());
	
			$('[data-hook="btn-add-to-cart"]').prop("disabled", true);
			btnAddToCart.text('Processing...');
	
			ajaxAddToCart(product_code, qty, function() {
				$('[data-hook="btn-add-to-cart"]').prop("disabled", false);
				btnAddToCart.text('Add To Cart');
			});
		});




		function ajaxAddToCart(Product_Code, Quantity, callback) {
			//create object with type of request and options, add product to cart
			var data = {
			Action: "ADPR",
			Product_Code,
			Quantity,
			};

	
			//create object with ajax request
			var miniBasketRequest = $.ajax({
			method: "POST",
			data: data,
			url: "https://miraclesoap.mivatest.com/basket-contents.html",
			});
	
			//method done with function of response from server
			miniBasketRequest.done(function (response) {
				$('[data-hook="open-mini-basket"]').html($(response).find('[data-hook="open-mini-basket"]').first().html());
				$('[data-hook="mini-basket"]').html($(response).find('[data-hook="mini-basket"]').first().html());
				//open mini basket with click
				$('[data-hook="open-mini-basket"]')[0].click();
				//callback
	
				callback && callback();
			});
			//output error
			miniBasketRequest.fail(function (jqXHR, textStatus) {
			//console.log( "Request failed: " + textStatus );
			});
		};
	},
    jsBASK() {
		/**
		 * Estimate Shipping
		 */
		(document => {
			let formElement = _hook('shipping-estimate-form');

			if (formElement.length > 0) {
				let formButton = _hook('calculate-shipping-estimate', formElement);

				function createCalculation() {
					let processor = document.createElement('iframe');

					processor.id = 'calculate-shipping';
					processor.name = 'calculate-shipping';
					processor.style.display = 'none';
					formElement.before(processor);
					processor.addEventListener('load', () => {
						displayResults(processor);
					});
					formElement.submit();
				}

				function displayResults(source) {
					let content = source.contentWindow.document.body.innerHTML;

					_hook('shipping-estimate-fields', formElement).classList.add('u-hidden');
					_hook('shipping-estimate-results', formElement).innerHTML = content;
					_hook('shipping-estimate-recalculate', formElement).classList.remove('u-hidden');
					formElement.setAttribute('data-status', 'idle');

					_hook('shipping-estimate-recalculate', formElement).addEventListener('click', () => {
						_hook('shipping-estimate-recalculate', formElement).classList.add('u-hidden');
						_hook('shipping-estimate-results', formElement).innerHTML = '';
						_hook('shipping-estimate-fields', formElement).classList.remove('u-hidden');
					});

					setTimeout(
						() => {
							source.parentNode.removeChild(source);
						}, 1
					);
				}

				formButton.addEventListener('click', event => {
					event.preventDefault();
					createCalculation();
				}, false);
			}
		})(document);
		
	},
    jsORDL() {
		document.addEventListener('click', event => {
			if (!event.target.hasAttribute('data-disclosure')) return;

			const target = event.target;
			const targetContent = document.querySelector(`#${target.getAttribute('aria-controls')}`);
			const sibling = target.parentNode.querySelector('[data-disclosure].u-hidden');
			const siblingContent = document.querySelector(`#${sibling.getAttribute('aria-controls')}`);

			if (!targetContent) return;

			sibling.setAttribute('aria-expanded', 'true');
			sibling.classList.remove('u-hidden');
			siblingContent.classList.add('u-hidden');
			target.setAttribute('aria-expanded', 'false');
			target.classList.add('u-hidden');
			targetContent.classList.remove('u-hidden');
		});
	},
    jsOCST() {
		themeFunctionality.stateDatalist();
	},
    jsOSEL() {
	},
    jsOPAY() {
		/**
		 * Added functionality to help style the default Miva output payment
		 * fields.
		 */
		document.querySelectorAll('[data-hook="mvt-input"]').forEach(mvtInput => {
			let dataHook = mvtInput.getAttribute('data-datahook');

			if (dataHook) {
				mvtInput.querySelector('input').setAttribute('data-hook', dataHook);
			}
		});

		document.querySelectorAll('[data-hook="mvt-select"]').forEach(mvtSelect => {
			mvtSelect.querySelectorAll('select').forEach(select => {
				let wrapDiv = document.createElement('div');

				wrapDiv.classList.add('c-form-select');
				select.parentNode.insertBefore(wrapDiv, select);
				wrapDiv.appendChild(select);

				if (wrapDiv.nextSibling.nodeType === 3) {
					wrapDiv.nextSibling.remove();
				}
			});
		});

		/**
		 * Credit Card Detection
		 */
		(() => {
			let creditCardInput = document.querySelector('[data-hook="detect-card"]');

			if (creditCardInput !== null) {
				['input', 'paste'].forEach(event => {
					creditCardInput.addEventListener(event, function () {
						let cardInput = this;

						if (isNaN(this.value)) {
							this.classList.add('has-error');
						}

						paymentMethod.detect(this, paymentDetected => {
							if (paymentDetected && supportedPaymentMethods.findPaymentMethod(paymentDetected.name)) {
								cardInput.classList.remove('has-error');
								_hook('payment-method-display').textContent = paymentDetected.display;
								_hook('payment-method').value = supportedPaymentMethods.findPaymentMethod(paymentDetected.name);
							}
							else {
								cardInput.classList.add('has-error');
							}
						});

					});
				});
			}
		})();
	},
    jsINVC() {
		const toggle = _hook('toggle-login-options');

		if (toggle.length !== 0) {
			const defaultCheck = toggle.querySelector('[data-toggle-login-check]');
			const wrap = toggle.querySelector('[data-toggle-login-email-wrap]');
			const emailInput = wrap.querySelector('[data-toggle-login-email]');

			defaultCheck.addEventListener('change', event => {
				if (event.target.checked) {
					wrap.hidden = true;
					emailInput.setAttribute('disabled', '');
				}
				else {
					wrap.hidden = false;
					emailInput.removeAttribute('disabled');
					emailInput.focus();
				}
			});
		}

		_hook('print-invoice').addEventListener('click', element => {
			element.preventDefault();
			window.print();
		});

		$(document).ready(function() {
			var giftBlock = $(this).find('.send-gift-block');
			if (giftBlock.length > 1) {
				giftBlock.each(function(index, element) {
					var email = $(element).find('.send-gift-block-email').data('email');
					var message = $(element).find('.send-gift-block-message').data('message');
					var code = $(element).find('.send-gift-block-code').data('code');
					// console.log(email)
					// console.log(message)
					var data = {
						Action: "CERT",
						emailsend: email,
						messagesend: message,
						codesend: code
						};
			
						$.ajax({
						method: "POST",
						data: data,
						url: "https://miraclesoap.mivatest.com/gift-certificate-recipient.html",
						});
				})
			} else {
				var email = giftBlock.find('.send-gift-block-email').data('email');
				var message = giftBlock.find('.send-gift-block-message').data('message');
				var code = giftBlock.find('.send-gift-block-code').data('code');
				// console.log(email)
				// console.log(message)
				var data = {
					Action: "CERT",
					emailsend: email,
					messagesend: message,
					codesend: code
					};
		
					$.ajax({
					method: "POST",
					data: data,
					url: "https://miraclesoap.mivatest.com/gift-certificate-recipient.html",
					});
			}
		})
	},
    jsLOGN() {
	},
    jsACAD() {
		themeFunctionality.stateDatalist();
	},
    jsACED() {
		themeFunctionality.stateDatalist();
	},
    jsCABK() {
	},
    jsCADA() {
		themeFunctionality.stateDatalist();
	},
    jsCADE() {
		themeFunctionality.stateDatalist();
	},
    jsAFCL() {
	},
    jsAFAD() {
		themeFunctionality.stateDatalist();
	},
    jsAFED() {
	},
    jsORHL() {
	},
    jsORDS() {
		_hook('print-invoice').addEventListener('click', element => {
			element.preventDefault();
			window.print();
		});
	},
    jsCTUS() {
	}
};


(() => {
	String.prototype.toCamelCase = function (cap1st) {
        return ((cap1st ? '-' : '') + this).replace(/-+([^-])/g, (a, b) => b.toUpperCase());
	};

	let pageID = document.body.id.toCamelCase();

	/**
	 * Initialize Global Site Functions
	 */
	themeFunctionality.global();

	/**
	 * Initialize Extensions Functions
	 */
	themeFunctionality.init();

	/**
	 * Initialize Page Specific Functions
	 */
	if (themeFunctionality[pageID]) {
		themeFunctionality[pageID]();
	}

})();
