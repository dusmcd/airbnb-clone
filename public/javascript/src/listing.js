'use strict';
/*
    global $ cloudinary
*/

const Listing = (function() {
    function init() {
        initializeUploadWidget();
    }

    function initializeUploadWidget() {
        const uploadWidget = cloudinary.createUploadWidget({
                uploadPreset: "ttonn4eb",
                form: "#listing-form",
                fieldName: 'imageData',
                multiple: false,
            },
            (err, result) => {
                if (err) {
                    console.error(err);
                    $('#upload-error').show();
                }
                if (result && result.event === 'success') {
                    $('#upload-success').append('<p>' + result.info.original_filename + '.' + result.info.format + '</p>')
                    $('#upload-success').show();
                    $('#show-upload-widget').hide();
                }

            });
        $('#show-upload-widget').on('click', () => uploadWidget.open());
    }




    return {
        init
    };
})();


export default Listing;
