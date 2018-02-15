jQuery(document).ready(function() {
    jQuery(".branchHide").remove(); 
    jQuery("article").each( function() {
        jQuery(".addthis_toolbox:nth-of-type(2)").remove();
    });
    //update year text with current year
    var currentYear = (new Date).getFullYear();
    jQuery('.currentYear').text(currentYear);
});