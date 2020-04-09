'use scrict';
/*global $*/

import Listing from './listing';

const Main = (function() {
    function init() {
        $("#logout").on('click', logoutUser);
        if ($.fn.cloudinary_fileupload !== undefined) {
            $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
        }
    }

    function logoutUser() {
        $("#main-loader").addClass('active');
        $.ajax('/users/logout', {
            method: 'POST',
            success: function(isSuccess) {
                if (isSuccess) {
                    window.location.href = '/';
                }
            },
            error: function(err) {
                console.error(err);
            },
            complete: function() {
                $("#main-loader").removeClass('active');
            }

        });
    }


    return {
        init
    };
})();

$(function() {
    Main.init();
    Listing.init();

});
