jQuery(function() {
    if(navigator.userAgent.indexOf("MSIE") != -1) {
        jQuery('img').each(function() {
            if(jQuery(this).attr('src').indexOf('.png') != -1) {
                jQuery(this).css({
                    'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + jQuery(this).attr('src') + '", sizingMethod="scale");'
                });
            }
        });
    }
});
