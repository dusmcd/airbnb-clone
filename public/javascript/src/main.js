'use scrict';
/*global $ cloudinary*/

import Listing from './listing';

const Main = (function() {
    function init() {
        $("#logout").on('click', logoutUser);
        cloudinary.setCloudName("drcrdobkq");
        $('.success .close').on('click', function() {
            $(this).hide();
        });
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
