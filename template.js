/*
 * LimeTemplate Revolution
 * Copyright (C) 2014 The LimeTemplates Project Team
 * Version: 1.3
 * 
 * 
 * Description: Javascript file for templates. Put JS-functions for your template here.
 *  
 * 
 * $Id:$
 */

/*
 * The function focusFirst puts the Focus on the first non-hidden element in the Survey. 
 * 
 * Normally this is the first input field (the first answer).
 */
function focusFirst(Event)
{
	
	$('#main-content :input:visible:enabled:first').focus();

}
/*
 * The focusFirst function is added to the eventlistener, when the page is loaded.
 * 
 * This can be used to start other functions on pageload as well. Just put it inside the 'ready' function block
 */

/* Uncomment below if you want to use the focusFirst function */

$(document).ready(function(){
	focusFirst();
});

// The following lines handle a strange behavor of LS when loading all questions without welcome-message
window.onload = function(){
if (!document.getElementById("welcome-body") && !document.getElementById("survey-header")) { 
 $('#jumbheader').removeClass('jumbotron');
} 
};


// Make the index floating with the questions
$(document).ready(function(){
 if (document.getElementById("index")) { //if question index is shown -> resize the questions columns and add styles
    // Cache our vars for the fixed sidebar on scroll
    var $sidebar = $('#index');

    var $main = $('#main-content');
    // Get & Store the original top of our #sidebar-nav so we can test against it
    var sidebarTop = $main.position().top;
    // Edit the `- 10` to control when it should disappear when the footer is hit.
    var blogHeight = $('#main-content').outerHeight() + 900;

    // Add the function below to the scroll event
    $(window).scroll(fixSidebarOnScroll);

    // On window scroll, this fn is called (binded above)
    function fixSidebarOnScroll() {
        // Cache our scroll top position (our current scroll position)
        var windowScrollTop = $(window).scrollTop();

        // Add or remove our sticky class on these conditions
        if (windowScrollTop >= blogHeight || windowScrollTop <= sidebarTop) {
            // Remove when the scroll is greater than our #content.OuterHeight()
            // or when our sticky scroll is above the original position of the sidebar
            $sidebar.removeClass('sticky');
        }
        // Scroll is past the original position of sidebar
        else if (windowScrollTop >= sidebarTop) {
            // Otherwise add the sticky if $sidebar doesnt have it already!
            if (!$sidebar.hasClass('sticky')) {
                $sidebar.addClass('sticky');
            }
        }
    }
}
});

// The following lines are made to handle the question index and the columns made by Bootstrap

$(document).ready(function(){

    if (!document.getElementById("index")) { //if question index is NOT shown -> make the questions columns full-width
    $('#main-content').removeClass('col-xs-12 col-md-9').addClass('col-xs-12 col-md-12');
    $('#index-content').removeClass('col-xs-0 col-md-3 hidden-xs hidden-md').addClass('hide'); 

    } 

    if (document.getElementById("index")) { //if question index is shown -> resize the questions columns and add styles
        $('#index').addClass('list-group well');
        
        $('#index .container .row').addClass('list-group-item');
        $('#index .container h3').addClass('page-header');
        $('#index .container h2').addClass('page-header');
        
        $('#index .container .current').addClass('active');

            
        $('#index .missing .hdr').addClass('label label-warning pull-right');
        $('#index .answer .hdr').addClass('label label-success pull-right');
        $('#index .current .hdr').addClass('label label-default pull-right');

        $('#index .submit').addClass('pull-right ui-widget ui-state-default ui-corner-all ui-button-text-only btn ui-state-focus ui-state-hover ui-state-active');

    }                       

});

// The following lines are made to handle radio buttons and checkboxes
$(document).ready(function(){ // make radio buttons and checkboxes more nice and usable

        var templatePath = $('head link[href*="template.css"]').attr('href').replace(/template.css/, '');

        // Apply images to radios
        $('input[type="radio"]').imageTick({

                // Image to use as a selected state of the radio
                tick_image_path: templatePath+"assets/imagetick/radio.png",
                // Image to use as a non-selected state
                no_tick_image_path: templatePath+"assets/imagetick/no_radio.png",
                // Class to apply to all radio images that are dynamically created
                image_tick_class: "radios"
        });

        // Apply images to checkboxes
        $('input[type="checkbox"]').imageTick({

                // Image to use as a selected state of the checkbox
                tick_image_path: templatePath+"assets/imagetick/check.png",
                // Image to use as a non-selected state
                no_tick_image_path: templatePath+"assets/imagetick/no_check.png",
                // Class to apply to all checkbox images that are dynamically created
                image_tick_class: "checkboxes"
        });
});

// The following lines are made to replace LimeSurvey styles with Bootstrap styles

$(document).ready(function(){
    $('.ui-button').removeClass('button ui-button ui-widget ui-corner-all').addClass('btn');
    $('#moveprevbtn').removeClass('ui-button-text-icon-primary ui-button-text submit btn-success').addClass('btn-primary');
    $('#movenextbtn').removeClass('ui-button-text-icon-secondary ui-button-text submit btn-success').addClass('btn-primary');
    $('#movesubmitbtn').addClass('btn btn-success');
    $('#savebutton').addClass('btn btn-success');
    $('#loadbutton').addClass('btn btn-default');
    $('#loadallbtn').removeClass('btn-success').addClass('btn btn-default');
    $('#saveallbtn').removeClass('btn-success').addClass('btn btn-default');
    $('.clearall').addClass('btn btn-default');   
    $('.question').addClass('table table-striped');


    $("input:text").addClass('form-control');
    $("select").addClass('form-control');
    $("select.multiflexiselect").addClass('multiple');

    $('#list-surveys li').addClass('list-group-item');
    $('.surveytitle').addClass('btn btn-primary btn-sm');

    $(".dragDropChoices").addClass('nav nav-pills nav-stacked');

    $('.textarea').addClass('form-control');
    $('.text').removeClass('good error').addClass('form-control');
    $('.answers-list').addClass('inputs-list');

    $('#wrapper').addClass('form-group panel-body');
    $('#tokenform').addClass('form-inline');

    $('#loadform input').addClass('form-control');   

    $('.date-item').addClass('input-group'); 
    $('.hasDatepicker').addClass('form-control'); 
    $('.ui-datepicker-trigger') .removeClass('ui-datepicker-trigger').addClass('btn btn-default'); 

                   
});

// Some fixes for hiding elements and changing styles

$(document).ready(function(){
   if (document.querySelectorAll(".table")) { //make tables responsive and more beautiful (since V 1.2 using document.querySelectorAll instead of document.getElementsByClassName for IE compatibility )
       $('.panel-body').addClass('responsive-table'); 
       $('.table').addClass('table-scrollable');
   };  

   $(".questionhelp:empty").closest('div.panel-footer').hide(); //hide the questions footer if not needed
     
   $(".panel-body").each(function(){ //hide the questions body if not needed
    if (!$(this).text().trim().length) {
        $(this).addClass("hide");
    };

});
});