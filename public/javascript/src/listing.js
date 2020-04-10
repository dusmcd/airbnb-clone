'use strict';
/*
    global $ cloudinary
*/

const Listing = (function() {
    function init() {
        initializeUploadWidget();
    }
    
    function initializeUploadWidget() {
        const uploadWidget = cloudinary.createUploadWidget(
            {
                uploadPreset: "ttonn4eb",
                form: "#listing-form",
                fieldName: 'imageData',
                multiple: false,
            }, 
        (err, result) => {
            if (err) {
                console.error(err);
            }
        });
        $('#show-upload-widget').on('click', () => uploadWidget.open());
    }
    

    return {
        init
    };
})();


export default Listing;
