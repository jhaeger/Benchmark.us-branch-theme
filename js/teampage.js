jQuery(document).ready(function () {
    //hide
    jQuery('#contact-us').hide();
    jQuery('.drop-a-line').on('click', function (event) {
        event.preventDefault();
        jQuery('#contact-us').slideDown( function() {
            jQuery('html, body').animate({
                scrollTop: jQuery('#contact-us').offset().top
            }, 1200);
        });
    });
});