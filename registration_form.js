$(document).ready(function (){
    $('#dog-registration-form').on('submit', function(e){
        e.preventDefault();

        is_valid = checkDogName() && checkBreed() && checkMicrochipNum();

        if(is_valid) {
            sendRegistrationForm();
        }
    });
})

function checkDogName() {
    var dog_name = $('#dog-name').val();
    var pattern = /^[a-zA-Z-'\s]*$/;
    if (dog_name.length < 1) {
        $('#dog-name-err').html('Dog name is required');
        return false;
    } else if (!pattern.test(dog_name)) {
        $('#dog-name-err').html('No digits or special characters allowed besides \' and -');
        return false;
    } else if (dog_name.length > 50) {
        $('#dog-name-err').html('Name must be shorter than 50 characters');
        return false;
    } else {
        $('#dog-name-err').html('');
        return true;
    }
}

function checkBreed() {
    var breed = $('#breed').val();
    var pattern = /^[a-zA-Z\s]*$/;
    if (breed.length < 2) {
        $('#breed-err').html('Breed must be longer than 2 characters');
        return false;
    } else if (breed.length > 50) {
        $('#breed-err').html('Breed must be shorter than 50 characters');
        return false;
    } else if (!pattern.test(breed)) {
        $('#breed-err').html('Only letters and spaces allowed');
        return false;
    } else {
        $('#dog-name-err').html('');
        return true;
    }
}

function checkMicrochipNum() {
    var microchip_number = $('#microchip-number').val();
    var pattern = /^[0-9]*$/;
    if (microchip_number.length > 1) {
        if (!pattern.test(microchip_number)) {
            $('#microchip-num-err').html('Microchip # must only be digits 0-9');
            return false;
        } else if (microchip_number.length < 9) {
            $('#microchip-num-err').html('Microchip # cannot be shorter than 9 digits');
            return false;
        } else if (microchip_number.length > 15) {
            $('#microchip-num-err').html('Microchip # cannot be longer than 15 digits');
            return false; 
        } else {
            $('#microchip-num-err').html('');
            return true;
        }
    } else {
        $('#microchip-num-err').html('');
        return true;
    }
}

function sendRegistrationForm() {
    var data = {
        dog_name: $('#dog-name').val(),
        breed: $('#breed').val(),
        gender: $('input[name="gender"]:checked').val(),
        microchip_number: $('#microchip-number').val()
    };

    $.ajax({
        type: 'post',
        url: 'register.php',
        data: data,
        beforeSend: function () {
            $('#register-dog').attr("disabled", true);
        },
        success: function(){
            $('.container-content').html('\
                <div class="m-5">\
                    <h2>Registration Submitted!</h2>\
                    <a href="index.html">Register Another Dog</a>\
                </div>');
        },
        error: function() {
            $('.alert').removeAttr('hidden');
        },
        complete: function () {
            setTimeout(function () {
                $('#dog-registration-form').trigger("reset");
                $('#register-dog').attr("disabled", false);
            }, 50000);
        }
    });
}