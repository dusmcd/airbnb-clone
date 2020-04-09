'use strict';
/*
    global $
*/

const Listing = (function() {
    function init() {
        $.cloudinary.config({ cloud_name: 'drcrdobkq', secure: true });
        confirmUpload();
    }

    function confirmUpload() {
        $('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
            $('.preview').html(
                $.cloudinary.image(data.result.public_id, {
                    format: data.result.format,
                    version: data.result.version,
                    crop: 'fill',
                    width: 150,
                    height: 100
                })
            );
            $('.image_public_id').val(data.result.public_id);
            return true;
        });
        $('.cloudinary-fileupload').bind('cloudinaryprogress', function(e, data) {
            $('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
        });
    }

    return {
        init
    };
})();


export default Listing;
