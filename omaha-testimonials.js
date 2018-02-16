//Utility Functions
var getTotals = function () {
    var num = 0;
    var photos = 0;
    var totals = ("there are " + num + " testimonials" + " and " + photos + " photographs.");
    jQuery('li.testimonial').each(function () {
        num = num + 1;
    });
    jQuery('figure.cycle-slide').each(function () {
        photos = photos + 1;
    });
    console.log(("there are " + num + " testimonials" + " and " + photos + " photographs."));
};
jQuery(document).ready(function (jQuery) {
    window.script_cycle = function () {
        jQuery('#testimonials').cycle();
    }
    jQuery("ul#testimonials").load('https://rachelpierce.benchmark.us/testimonials/ #builder-section-1456787677-column-1 blockquote p,#builder-section-1456787677-column-1 p', function () {
        jQuery('p:even').addClass('quote');
        jQuery('p:odd').addClass('client');
    });
    jQuery("ul#testimonials").load('https://ericalmquist.benchmark.us/testimonials/ #builder-section-1456787677-column-1 blockquote p,#builder-section-1456787677-column-1 p', function () {
        jQuery('p:even').addClass('quote');
        jQuery('p:odd').addClass('client');
        jQuery('#testimonials > p:even').each(function () {
            jQuery(this).next().addBack().wrapAll('<li class="testimonial"></li>');
        });
        jQuery('p.quote').wrap("<blockquote class='ttfmake-testimonial'></blockquote>");
        jQuery("li.testimonial").wrapInner("<center></center>");
        window.script_cycle();
        getTotals();
    });
    
});