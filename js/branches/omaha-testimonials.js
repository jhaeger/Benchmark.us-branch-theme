//Utility Functions
function getTotals() {
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
}

function organizeTestimonials() {
    jQuery('#testimonials > p:even').each(function () {
        jQuery(this).next().addBack().wrapAll('<li class="testimonial"></li>');
    });
    jQuery('p.quote').wrap("<blockquote class='ttfmake-testimonial'></blockquote>");
    jQuery("li.testimonial").wrapInner("<center></center>");
}

function sortTestimonialsAndClients() {
    jQuery('ul#testimonials p:even').addClass('quote');
    jQuery('ul#testimonials p:odd').addClass('client');
}

jQuery(document).ready(function (jQuery) {
    window.script_cycle = function () {
        jQuery('#testimonials').cycle();
    };
    
    jQuery(window).on('load', function () {
        jQuery("ul#testimonials").load('https://rachelpierce.benchmark.us/testimonials/ #builder-section-1456787677-column-1 blockquote p,#builder-section-1456787677-column-1 p', function () {
            sortTestimonialsAndClients();
        });
        jQuery("ul#testimonials").load('https://ericalmquist.benchmark.us/testimonials/ #builder-section-1456787677-column-1 blockquote p,#builder-section-1456787677-column-1 p', function () {
            sortTestimonialsAndClients();
            organizeTestimonials();
            window.script_cycle();
            getTotals();
        });
    });
});
