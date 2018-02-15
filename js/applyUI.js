jQuery(document).ready(function () {
    //hide empty divs in #apply-team section
    jQuery('#apply-team .builder-text-column:not(:has(.builder-text-content))').css({
        "box-shadow": "none",
        "background": "transparent",
        "background-color": "transparent",
        "padding": "0"
    });
    //hide entire #app-team section, long app, short app, after app
    jQuery("#bmlo-long-app, #bmlo-short-app, #post-app, #apply-team:not(.visible), #app-options, #short-app-header").hide();
    var sizeHeight = function () {
        //match column heights in #apply-team section
        var elements1 = document.getElementsByClassName('name-and-title');
        var elementHeights = Array.prototype.map.call(elements1, function (el) {
            return el.clientHeight;
        });
        var maxHeight = Math.max.apply(null, elementHeights);
        Array.prototype.forEach.call(elements1, function (el) {
            el.style.minHeight = maxHeight + "px";
        });
        //Match button heights
        var elements = document.getElementsByClassName('swap');
        var elementHeights = Array.prototype.map.call(elements, function (el) {
            return el.clientHeight;
        });
        var maxHeight = Math.max.apply(null, elementHeights);
        Array.prototype.forEach.call(elements, function (el) {
            el.style.minHeight = maxHeight + "px";
        });
        if (jQuery(window).width() < 800) {
            //Match button widths
            var elements = document.getElementsByClassName('swap');
            var elementWidths = Array.prototype.map.call(elements, function (el) {
                return el.clientWidth;
            });
            var maxWidth = Math.max.apply(null, elementWidths);
            Array.prototype.forEach.call(elements, function (el) {
                el.style.width = maxWidth + "px";
            });
        }
    };
    //open LO team member application options on button click
    jQuery('button.apply-team').on('click', function () {
        jQuery('#apply-team:not(.visible)').slideToggle(function(){
            jQuery('html, body').animate({
                scrollTop: jQuery('#choose-your-lender').offset().top
            }, 1200);
        });
        if (jQuery(window).width() < 800) {
            jQuery('#apply-team .swap').height('').width('');
            sizeHeight();
            var hnw = jQuery('#apply-team .builder-text-content').height();
            jQuery('#apply-team img.headshot').height(hnw).width(hnw);
        }
        else {
            jQuery('#apply-team .builder-text-column:not(:has(.builder-text-content))').show();
            jQuery('#apply-team .swap').height('').width('');
            sizeHeight();
            jQuery('#apply-team img.headshot').height('').width('');
        }
    });
    //set width of content container to center it as a block-level element with margin auto
    function resizeSection() {
        if (jQuery(window).width() > 799) {
            var newContainerWidth = jQuery('#apply-team .builder-section-content .builder-text-row:first-of-type .builder-text-column').length * 220 + 64 + "px";
            jQuery('#apply-team .builder-section-content').css("max-width", newContainerWidth);
            jQuery('#apply-team img.headshot').height('').width('');
            jQuery('#apply-team .builder-section-content .builder-text-row').css({"text-align":"center"});
            jQuery('#apply-team .builder-section-content .builder-text-row .builder-text-column').css({"text-align":"left"});
        }
        else {
            var hnw = jQuery('#apply-team .builder-text-content').height();
            jQuery('#apply-team img.headshot').height(hnw).width(hnw);
        }
    };
    jQuery(window).resize(resizeSection());
    //START CHOOSE YOUR LENDER
    //Original Encompass functionality
    jQuery('section:not(.consumer-connect) button.swap:not(.floify), section.consumer-connect button.swap.encompass').each(function () {
        //Swap takes the data-encompass attribute and subs it as the subdomain of the application url.
        var swap = function (e) {
            //Define long app iframe url
            var longAppURL = 'https://' + e + '.mortgage-application.net/WebApp/Start.aspx?oempage=1';
            //Define long app pop-out url
            var longAppPop = 'https://' + e + '.mortgage-application.net/WebApp/Start.aspx';
            //Define short app pop-out url
            var shortAppPop = 'https://' + e + '.mortgage-application.net/WebApp/ShortApp.aspx';
            //Define short app iframe url
            var shortAppURL = 'https://' + e + '.mortgage-application.net/WebApp/ShortApp.aspx?oempage=1';
            
            //Assign defined urls to respective locations. 
            document.getElementById('longApp').src = longAppURL;
            document.getElementById('longAppPop').href = longAppPop;
            document.getElementById('shortApp').src = shortAppURL;
            document.getElementById('shortAppPop').href = shortAppPop;
        };
        //Add "Applying with {LO Name}." to popout link container
        var addName = function (n) {
            jQuery('.before-app .intro').html('Applying with <strong>' + n + '.</strong> ');
        };
        //Remove the Short App container, and fix styling of parent and sibling elements.
        var killShorty = function () {
            jQuery('#app-options #long-app-header button').hide().addClass('dead');
        };
        //Add Short App container and fix styling of parent and sibling elements.
        var getShorty = function () {
            jQuery('#app-options #long-app-header button').show().removeClass('dead');
        };
        //Fire opening of application (Long app first)
        var showLongApp = function () {
            jQuery("#post-app, #long-app-header").fadeIn("fast");
            jQuery("#bmlo-short-app, #placeholder, #pre-app, #short-app-header").fadeOut("fast");
            jQuery('#bmlo-long-app').fadeIn("slow");
            //BEGIN - add popup to instruct about Summary page on application
            var appPopup = function () {
                var $ = jQuery;
                var container = $("#bmlo-long-app").closest("section");
                var $submitMessage = $("<div>", {
                    id: "submit-message"
                }).html('<h4 style="text-align:center">IMPORTANT!</h4><p>When you get to the <b>Summary tab</b>, make sure to scroll all the way down to submit your application.</p><p style="margin-bottom:0;text-align:center;"><button style="box-shadow:0 1px 3px rgba(0, 0, 0, 0.5);padding:8px 20px;" id="message-confirm" title="by clicking, I agree that I have read the above">Close</button></p>').css({
                    "position": "fixed",
                    "color": "#000",
                    "z-index": "3",
                    "top": "40%",
                    "right": "2.5%",
                    "margin-left": "2.5%",
                    "max-width": "401px",
                    "padding": "20px",
                    "font-size": "1.5rem",
                    "background-color": "rgba(255, 255, 255, 0.9)",
                    "border": "6px solid #062373",
                    "border-radius": "5px",
                    "box-shadow": "0 0 1px 2px cornsilk, 0 8px 30px rgba(0, 0, 0, 0.7), inset 0 0 3px rgba(0, 0, 0, 0.5)"
                , });
                jQuery('#long-app-header button').on('click', function () {
                    return;
                });
                $("iframe").load(function () {
                    setTimeout(function () {
                        $submitMessage.appendTo(container).fadeIn(400);
                        $("#submit-message button").click(function () {
                            $submitMessage.fadeOut("ease");
                        });
                    }, 360000);
                });
            };
            appPopup();
        };
        //END - popup  
        var showShortApp = function () {
            jQuery("#bmlo-short-app, #short-app-header, #post-app").fadeIn("fast");
            jQuery("#bmlo-long-app, #placeholder, #pre-app, #long-app-header, #submit-message").fadeOut("fast");
        };
        jQuery('#short-app-header button').on('click', function () {
            showLongApp();
        });
        jQuery('#long-app-header button').on('click', function () {
            showShortApp();
        });
        //Define $ to work in no-conflict mode. Scope is within this listening function, and is not global
        var $ = jQuery;
        //Help write good functions to work with jQuery
        var $this = $(this);
        //for each button.swap.quick-app-only click, do these.
        if ($this.hasClass('quick-app-only')) {
            $this.on("click", function () {
                jQuery('#short-app-header button').hide();
                jQuery('#short-app-header p').html("This may only take about <strong>5&nbsp;minutes</strong>.");
                //Log the LO's name and Encompass subdomain from data-encompass attribute to the console
                console.log($(this).data('lo-name') + "'s Encompass url subdomain is " + $(this).data('encompass'));
                $("iframe#floify, #floify-header").hide();
                jQuery('#submit-message').remove();
                jQuery('#app-options').show(function() {
                    jQuery('html, body').animate({
                        scrollTop: jQuery('#app-options').offset().top
                    }, 1200);
                });
                jQuery('#apply-team:not(.visible)').slideUp();
                jQuery("#application-section").css({"background-color":"#f8f8f8"});
                //jQuery('button.apply-team').hide();
                addName($(this).data('lo-name'));
                swap($(this).data('encompass'));
                showShortApp();
                
                __gaTracker('send', 'event', 'Apply Now', 'click', 'Branch Apply Now btn Click');
            });
            
        } else {
            $this.on("click", function () {
                jQuery('#short-app-header button').show();
                jQuery('#short-app-header p').html("If you are in a hurry and just want to get started, this app is for you.<br>You can fill out the rest another time, this will only take about <strong>5 minutes</strong>.");
                //Log the LO's name and Encompass subdomain from data-encompass attribute to the console
                console.log($(this).data('lo-name') + "'s Encompass url subdomain is " + $(this).data('encompass'));
                $("iframe#floify, #floify-header").hide();
                jQuery('#submit-message').remove();
                jQuery('#app-options').show(function() {
                    jQuery('html, body').animate({
                        scrollTop: jQuery('#app-options').offset().top
                    }, 1200);
                });
                getShorty();
                jQuery('#apply-team:not(.visible)').slideUp();
                jQuery("#application-section").css({"background-color":"#f8f8f8"});
                //jQuery('button.apply-team').hide();
                addName($(this).data('lo-name'));
                swap($(this).data('encompass'));
                showLongApp();
                if ($(this).data('shorty') === "no") {
                    killShorty();
                }
                else if ($(this).data('shorty') === "yes" && jQuery('#app-options #long-app-header button').hasClass('dead')) {
                    getShorty();
                }
                __gaTracker('send', 'event', 'Apply Now', 'click', 'Branch Apply Now btn Click');
            });
        };
    });
    //FLOIFY
    jQuery('button.swap.floify').each(function () {
        var $ = jQuery;
        var floifyName = $(this).data('floify-name');
        //var h = screen.availHeight;
        var swap = function () {
            //Define floify app iframe url
            var floifyUrl = 'https://' + floifyName + '.floify.com/apply?noheaderfooter';
            
            //Assign defined urls to respective locations. 
            $('iframe#floify').attr('src', floifyUrl);
        };
        
        $(this).on('click', function() {
            swap();
            $("section#apply-team").slideUp();//Close the loan officer choices section
            $("#placeholder, #pre-app, #long-app-header, #short-app-header, #bmlo-long-app, #bmlo-short-app, #submit-message").fadeOut();//get rid of shield icon and "Your Application Will Display Here" plus pre-app welcome box content
            $("iframe#floify, #floify-header, #app-options,  #post-app").fadeIn(function() {
                $('html, body').animate({
                    scrollTop: $('#app-options').offset().top
                }, 1200);
            });//show floify app and intro paragraph, and welcome box post-app content
            $("#application-section").css({"background-color":"#fff"});
            
            __gaTracker('send', 'event', 'Apply Now', 'click', 'Branch Apply Now btn Click');//send event goal to Google Analytics
        });
    });
    
    //Consumer Connect support
    jQuery('section.consumer-connect button.swap:not(.encompass)').each(function () {
        function popup(url) {
             params  = 'width='+screen.width;
             params += ', height='+screen.height;
             params += ', top=0, left=0';
             params += ', fullscreen=yes';
             params += ', resizable';
             newwin=window.open(url,'Benchmark Mortgage Application', params);
             if (window.focus) {newwin.focus()};
             return false;
        };
        var $ = jQuery;
        var intro = $("#intro");
        var outro = $("#outro");
        var ccButton = $(this).not(".encompass");
        var encompassButton = $(this.encompass);
        var ccLo = $(this).data('cc-lo');
        var ccBranch = $(this).data('cc-branch');
        var ccSite = $(this).data('cc-site');
        var ccUrl = 'https://' + ccBranch + '.mymortgage-online.com/?loanapp&siteid=' + ccSite + '&lar=' + ccLo;
        var h = screen.availHeight;
        var encompassSubDomain = $(this).data('encompass');
        var encompassHref = "https://" + encompassSubDomain + ".mortgage-application.net/WebApp/Start.aspx";
        ccButton.on('click', function() {
            popup(ccUrl); 
            console.log("lo is " + ccLo + ". Branch is " + ccBranch + ". Site is " + ccSite + ".");
            intro.fadeOut();
            outro.fadeIn();
            jQuery("#application-section").css({"background-color":"#f8f8f8"});
            $("section#apply-team, #application-section, #app-options").slideUp();
            __gaTracker('send', 'event', 'Apply Now', 'click', 'Branch Apply Now btn Click');
        });
        encompassButton.on('click', function() {
            window.open(encompassHref, 'Full Web Application', 'resizable, height=' + h + ', width=776');
            intro.fadeOut();
            outro.fadeIn();
            jQuery("#application-section").css({"background-color":"#f8f8f8"});
            $("iframe#floify, #floify-header").hide();
            $("section#apply-team").slideUp();
            __gaTracker('send', 'event', 'Apply Now', 'click', 'Branch Apply Now btn Click');
        });
    });
    //END CHOOSE YOUR OWN (adventure) LENDER
    /*testing new pop-up's in external js file */
    jQuery('#app-checklist-link').click(function () {
        window.open('../application-items-checklist.html', 'Mortgage Application Resources Checklist', 'resizable,height=762,width=813');
        return false;
    });
    jQuery('section:not(.consumer-connect) #bmlo-short-app .before-app a').click(function () {
        var h = screen.availHeight;
        var href = jQuery(this).attr('href');
        window.open(href, 'Short Application', 'resizable,height=' + h + ',width=776');
        return false;
    });
    jQuery('section:not(.consumer-connect) #bmlo-long-app .before-app a').click(function () {
        var h = screen.availHeight;
        var href = jQuery(this).attr('href');
        window.open(href, 'Full Web Application', 'resizable, height=' + h + ', width=776');
        return false;
    });
});