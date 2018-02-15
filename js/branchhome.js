jQuery(document).ready(function () {
    //hide
    jQuery('#contact-us').hide();
    jQuery('.drop-a-line').on('click', function (event) {
        jQuery('#contact-us').slideDown( function() {
            jQuery('html, body').animate({
                scrollTop: jQuery('#contact-us').offset().top
            }, 1200);
        });
        event.preventDefault();
    });
    
    /*Match Heights of Get Local column H's, p's, and a's. */
    function localH() {
        var elementsH = jQuery("#get-local .home-card h2");
        var elementHeights = Array.prototype.map.call(elementsH, function (el) {
            return el.clientHeight;
        });
        var maxHeight = Math.max.apply(null, elementHeights);
        Array.prototype.forEach.call(elementsH, function (el) {
            el.style.minHeight = maxHeight + "px";
        });
    }
    function localP() {
        var elementsHC = jQuery("#get-local .home-card p:first-of-type");
        var elementHeights = Array.prototype.map.call(elementsHC, function (el) {
            return el.clientHeight;
        });
        var maxHeight = Math.max.apply(null, elementHeights);
        Array.prototype.forEach.call(elementsHC, function (el) {
            el.style.minHeight = maxHeight + "px";
        });
    }
    function localA() {
        var elementsBtn = jQuery("#get-local a.button-mobile");
        var elementHeights = Array.prototype.map.call(elementsBtn, function (el) {
            return el.clientHeight;
        });
        var maxHeight = Math.max.apply(null, elementHeights);
        Array.prototype.forEach.call(elementsBtn, function (el) {
            el.style.minHeight = maxHeight + "px";
        });
    }
    function testimonialSectionHeight() {
        //clear old dimension settings
        jQuery('#home-slider .builder-banner-slide').css("padding-bottom","");
        jQuery('#home-slider .builder-banner-content').css("height","");
        jQuery('#home-slider .home .cycle-slideshow').css("height","");
        jQuery("#home-slider .builder-banner-slide .builder-banner-inner-content").css("min-height","");
        
        var elementsSlide = jQuery("#home-slider .builder-banner-slide .builder-banner-inner-content");
        var elementHeights = Array.prototype.map.call(elementsSlide, function (el) {
            return el.clientHeight;
        });
        var maxHeight = Math.max.apply(null, elementHeights);
        Array.prototype.forEach.call(elementsSlide, function (el) {
            el.style.minHeight = maxHeight + "px";
        });
        jQuery('#home-slider .builder-banner-slide').css("padding-bottom",(maxHeight + 74));
        jQuery('#home-slider .builder-banner-content').css("height",(maxHeight + 74));
        jQuery('#home-slider .home .cycle-slideshow').css("height",(maxHeight + 102 + "!important"));
        
    }
    function localMatchHeights(){
        localH();
        localP();
        localA();
    }
    testimonialSectionHeight();
    if (jQuery(window).width() > 799) {
        localMatchHeights();
    }
    window.addEventListener('resize', function () {
        jQuery('#get-local .home-card h2, #get-local .home-card p:first-of-type, #get-local a.button-mobile').css({"min-height": "", "height":""});
        testimonialSectionHeight();
        if (jQuery(window).width() > 799) {
            localMatchHeights();
        }
        else if (jQuery(window).width() < 800) {
            jQuery('#get-local .home-card h2, #get-local .home-card, #get-local a.button-mobile').css("height", "");
        }
    }, true);
}); 
/*match banner image height to section height through some detection trickery*/
jQuery(window).on('load', function () {
    function branchHero() {
        var e = document.getElementById('home-hero-new').querySelector('.builder-text-column-2');
        var newHeight = window.getComputedStyle(e, null).getPropertyValue("height");
        document.querySelector('.branch-hero').style.height = newHeight;
    }
    if (jQuery(window).width() > 799) {
        branchHero();
    }
    window.addEventListener('resize', function () {
        if (jQuery(window).width() > 799) {
            branchHero();
        }
        else if (jQuery(window).width() < 800) {
            jQuery('.branch-hero').css("height", "");
        }
    }, true);
});