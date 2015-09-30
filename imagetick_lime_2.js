/******************************************

A modified version of Image Tick v1.0 for jQuery
==========================================
This modification optimizes the plugin for LimeSurvey
------------------------------------------
Originally written by Jordan Boesch, modified by Tony partner 
Jordan Boesch - www.boedesign.com
Tony Partner - www.partnersinc.biz

V2.1
02/10/2013

******************************************/

(function($){
		  
	$.fn.imageTick = function(options) {
		
		var defaults = {	
			tick_image_path: "images/radio.gif",
			no_tick_image_path: "no_images/radio.gif",
			image_tick_class: "ticks_" + Math.floor(Math.random()),
			hide_radios_checkboxes: false
		};
	  	
		var opt = $.extend(defaults, options);
		
		// Add some classes to the arrays for manipulation
		$('.array-flexible-row, .array-flexible-duel-scale, .array-flexible-column, .array-yes-uncertain-no, .array-increase-same-decrease, .array-5-pt, .array-10-pt').addClass('radioArray');
		
		// A function to check for disabled (by exclusive) checkbox options
		function imageTickHandleDisabled(parentQuestion) {
			setTimeout(function() {
				$('img.checkboxes, label', parentQuestion).removeClass('disabled');
				$('input.checkbox:disabled', parentQuestion).each(function(i){
					//if($(this).prop('disabled') == true) {
						$(this).parent().find('img.checkboxes, label').addClass('disabled');
					//}
					//else {
					//	$(this).parent().find('img.checkboxes, label').removeClass('disabled');
					//}						
				});
			}, 100);
		}
		
		// A function to see if the hidden checkbox is checked
		function checkIfChecked(id, thisItem) {
			setTimeout(function() {
				if($(thisItem).find('input.checkbox:checked').length > 0){
					$('#tick_img_'+id).attr('src', opt.tick_image_path);
				}
				else {
					$('#tick_img_'+id).attr('src', opt.no_tick_image_path);
				}
			}, 100);
		}
			
		// A hack to get around the stupid "Other" checkbox behaviour imposed by LS
		$('.checkbox-item.other-item input.text').blur(function(event){
			var thisEl = $(this);
			var thisParent = $(this).parent();
			if($(this).val() == '') {
				$('img.'+opt.image_tick_class+'', thisParent).attr('src', opt.no_tick_image_path);
			}
			else {
				$('img.'+opt.image_tick_class+'', thisParent).attr('src', opt.tick_image_path);
			}
		});
		$('.checkbox-item.other-item input.text').keyup(function(event){
			var thisEl = $(this);
			var thisParent = $(this).parent();
			if($(this).val() == '') {
				$('img.'+opt.image_tick_class+'', thisParent).attr('src', opt.no_tick_image_path);
			}
			else {
				$('img.'+opt.image_tick_class+'', thisParent).attr('src', opt.tick_image_path);
			}
		});
		
		this.each(function(){
			
			var obj = $(this);
			var type = obj.attr('type'); // radio or checkbox
			
			// Hide them and store an image background
			var id = obj.attr('id').replace(/#/, '__');
			var imgHTML = '<img src="' + opt.no_tick_image_path + '" alt="no_tick" class="' + opt.image_tick_class + '" id="tick_img_' + id + '" />';
			
			if(!$(obj).closest('td').hasClass('dual_scale_separator')) { // Not for the hidden input in dual-scale-arrays
				obj.before(imgHTML);
			}
			if(!opt.hide_radios_checkboxes){
				//obj.css('display','none');
				obj.css({ 'position':'absolute', 'left':'-9999em' });
			}
			
			// if something has a checked state when the page was loaded
			if($(obj).is(':checked')){
				$('#tick_img_'+id).attr('src', opt.tick_image_path);
			}
			
			// Array questions
			if(type == 'radio' && $(obj).parents('div[id^="question"]').hasClass('radioArray')){
				
				$(obj).parents('td:eq(0)').addClass('imageTickCellA radio-group-'+$(obj).attr('name').replace(/#/, '_'));
				
				// Click on the answer cell in an array
				$(obj).parents('td:eq(0)').click(function(event){
							
					if($(this).hasClass('dual_scale_separator')) { 
						return false; 
					}
					
					//event.stopPropagation();
					var parentRow = $(this).parents('tr:eq(0)');
					var groupClass = ''
					var classes = $(this).attr("class").split(' ');
					$(classes).each(function(i){
						if(this.substr(0,12) == 'radio-group-') {
							groupClass = this;
						}
					}); 
					$('td.'+groupClass+' img.'+opt.image_tick_class+'').attr('src', opt.no_tick_image_path); 
					$('td.noanswer-item img.'+opt.image_tick_class+'', parentRow).attr('src', opt.no_tick_image_path); // Uncheck the "No Answer" for dual-scale-arrays
					if($(this).hasClass('noanswer-item')) { // "No Answer" for dual-scale-arrays unchecks everything in row 
						$('td img.'+opt.image_tick_class+'', parentRow).attr('src', opt.no_tick_image_path);
					}
					$('#tick_img_'+id).attr('src', opt.tick_image_path);
				});
				
			}
			// Radio questions
			else if(type == 'radio'){
								
				// Click on the image
				$("#tick_img_"+id).click(function(){
					var el = $(this).parents('div[id^="question"]');
					$("." + opt.image_tick_class + "", el).attr('src', opt.no_tick_image_path);
					$('#'+id).trigger('click');
					$(this).attr('src', opt.tick_image_path);
				});
				
				// Click on the label
				$("label[for='" + id + "']").click(function(){
					var el = $(this).parents('div[id^="question"]');
					$("." + opt.image_tick_class + "", el).attr('src', opt.no_tick_image_path);
					$('#'+id).trigger('click');
					$('#tick_img_'+id).attr('src', opt.tick_image_path);
				});
				
			}				
			// Array-numbers-checkboxes questions
			else if(type == 'checkbox' && $(obj).parents('div[id^="question"]').hasClass('array-multi-flexi')){
				
				var thisCell = $(obj).closest('.answer-item');
				// Click on the answer cell in an array
				$(thisCell).click(function(event){
					checkIfChecked(id, $(thisCell));
				});
			}		
			// Checkbox with comments questions
			else if(type == 'checkbox' && $(obj).closest('div[id^="question"]').hasClass('multiple-opt-comments')){
							
				// Click on the image
				$('#tick_img_'+id).click(function(event){
					var thisImg = $(this);
					$('#'+id).trigger('click');
					checkIfChecked(id, $(this).closest('.answer-item'));
					// Handle text input
					setTimeout(function() {
						if($(thisImg).closest('.answer-item').find('input.checkbox:checked').length > 0){
							$('#'+id+'comment').focus();
						}
						else {
							$('#'+id+'comment').val('');
						}
					}, 200);
					event.stopPropagation();
				});
				
				// Click on the label
				$("label[for='" + id + "']").click(function(){
					var thisLabel = $(this);
					checkIfChecked(id, $(this).closest('.answer-item'));
					// Handle text input
					setTimeout(function() {
						if($(thisLabel).closest('.answer-item').find('input.checkbox:checked').length > 0){
							$('#'+id+'comment').focus();
						}
						else {
							$('#'+id+'comment').val('');
						}
					}, 200);
				});
				
				// Handle the image if the comment field is populated
				var listItem = $(obj).closest('.answer-item');
				$('input.text', listItem).keyup(function(){
					checkIfChecked(id, $(this).closest('.answer-item'));
				});
				$('input.text', listItem).change(function(){
					checkIfChecked(id, $(this).closest('.answer-item'));
				});
				
			}		
			// Checkbox questions
			else if(type == 'checkbox'){
				
				// Click on the image
				$('#tick_img_'+id).click(function(event){
							
					if($(this).hasClass('disabled')) { // Option is disabled (by exclusive)
						return false; 
					}
							
					if($(this).parent().hasClass('other-item')) { // A hack to get around the stupid "Other" checkbox behaviour imposed by LS						
						var otherInput = $(this).closest('.answer-item').find('input.text');
						if($(this).closest('.answer-item').find('input.checkbox:checked').length > 0) {
							$('#'+id).trigger('click');
						}
						else {
							$(otherInput).focus();
							if($(otherInput).val() == '') {
								$(otherInput).addClass('em_sq_validation error');
							} 
						}
					}
					else { 
						$('#'+id).trigger('click');
					}
						
					checkIfChecked(id, $(this).closest('.answer-item'));
					
					checkconditions($('#'+id).attr('value'), $('#'+id).attr('name'), $('#'+id).attr('type'));
					
					imageTickHandleDisabled($(this).closest('div[id^="question"]')); // Check for disabled (by exclusive) options
					event.stopPropagation();
				});
				
				// Click on the label
				$("label[for='" + id + "']").click(function(){
							
					if($(this).hasClass('disabled')) { // Option is disabled (by exclusive)
						return false; 
					} 
					
					checkIfChecked(id, $(this).closest('.answer-item'));
					
					imageTickHandleDisabled($(this).closest('div[id^="question"]')); // Check for disabled (by exclusive) options
				});	
				
			}
			
		});
	}
	
})(jQuery);
