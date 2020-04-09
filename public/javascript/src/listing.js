'use strict';
/*
    global $ cloudinary
*/

const Listing = (function() {
    function init() {
        addFileUploadTag();
        console.log('LISTING FILE EXECUTED!');
    }

    function addFileUploadTag() {
        const cloudinaryCors = `${window.location.protocol}//${window.location.hostname}/cloudinary_cors.html`;
        $("#listing-form").append(cloudinary.v2.uploader.image_upload_tag('image_id', { callback: cloudinaryCors }));
    }

    return {
        init
    };
})();



export default Listing;
