'use strict';
/*
    global $ cloudinary location datepicker
*/

const Listing = (function() {
    function init() {
        const isListingForm = location.href.includes('listings') &&
            (location.href.includes('new') || location.href.includes('edit'));
        if (isListingForm) {
            initializeUploadWidget();
        }
        initializeReservationBtns();
        initializeDatepicker();
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
                    $('#upload-success').append('<p>' + result.info.original_filename + '.' + result.info.format + '</p>');
                    $('#upload-success').show();
                    $('#show-upload-widget').hide();
                }

            });
        $('#show-upload-widget').on('click', () => uploadWidget.open());
    }

    function initializeReservationBtns() {
        $('#make-reservation').on('click', function() {
            $('#reserve-form').show();
            $(this).hide();
        });
        $('#continue-reservation').on('click', function() {
            $(this).hide();
            $('.res-details').show();
            $('.two').hide();

            const startDateVal = $('input[name=startDate]').val();
            const endDateVal = $('input[name=endDate]').val();
            const numberOfDays = (new Date(endDateVal).valueOf() - new Date(startDateVal).valueOf()) / 1000 / 60 / 60 / 24;
            const totalAmount = numberOfDays * Number($('#price').text());
            $('#start-date').text(startDateVal);
            $('#end-date').text(endDateVal);
            $('#total-days').text(numberOfDays);
            $('#total-amount').text('$' + totalAmount);
        });
        $('#cancel-reservation').on('click', function() {
            $('.res-details').hide();
            $('#continue-reservation').show();
            $('#start-date').text('');
            $('#end-date').text('');
            $('#total-amount').text('');
            $('.two').show();
        });
    }

    function initializeDatepicker() {
        const listingId = $('#listing-id').val();
        $.ajax(`/listings/${listingId}/reservations`, {
            method: 'GET',
            success: function(data) {
                const datesReserved = data.map(dateValue => {
                    const localDate = new Date(dateValue);
                    // server keeps time in UTC
                    const { year, month, date } = {
                        year: localDate.getUTCFullYear(),
                        month: localDate.getUTCMonth(),
                        date: localDate.getUTCDate()
                    };
                    return new Date(year, month, date);
                });
                datepicker('input[name=startDate]', {
                    id: 1,
                    minDate: new Date(Date.now() + 86400000),
                    disabledDates: datesReserved
                });
                datepicker('input[name=endDate]', { id: 1, disabledDates: datesReserved });
            },
            error: function(err) {
                console.error(err);
            }
        });

    }




    return {
        init
    };
})();


export default Listing;
