$(document).ready(function (){
    $('#dog_registration_form').on('submit', function(e){
        e.preventDefault();

        var valid_name = checkDogName();
        var valid_breed = checkBreed();
        var valid_microchip_num = checkMicrochipNum();

        if(valid_name && valid_breed && valid_microchip_num) {
            sendRegistrationForm();
        }
    });
})

function checkDogName() {
    var dog_name = $('#dog_name').val();
    var pattern = /^[a-zA-Z-'\s]*$/;
    if (dog_name.length < 1) {
        $('#dog_name_error').html('Dog name is required');
        return false;
    } else if (!pattern.test(dog_name)) {
        $('#dog_name_error').html('No digits or special characters allowed besides \' and -');
        return false;
    } else if (dog_name.length > 50) {
        $('#dog_name_error').html('Name must be shorter than 50 characters');
        return false;
    } else {
        $('#dog_name_error').html('');
        return true;
    }
}

function checkBreed() {
    var breed = $('#breed').val();
    var pattern = /^[a-zA-Z\s]*$/;
    if(breed.length < 1) {
        $('#breed_error').html('Breed is required');
        return false;
    } else if (breed.length < 2) {
        $('#breed_error').html('Breed must be longer than 2 characters');
        return false;
    } else if (breed.length > 50) {
        $('#breed_error').html('Breed must be shorter than 50 characters');
        return false;
    } else if (!pattern.test(breed)) {
        $('#breed_error').html('Only letters and spaces allowed');
        return false;
    } else {
        $('#breed-error').html('');
        return true;
    }
}

function checkMicrochipNum() {
    var microchip_number = $('#microchip_number').val();
    var pattern = /^[0-9]*$/;
    if (microchip_number.length >= 1) {
        if (!pattern.test(microchip_number)) {
            $('#microchip_number_error').html('Microchip # must only be digits 0-9');
            return false;
        } else if (microchip_number.length < 9) {
            $('#microchip_number_error').html('Microchip # cannot be shorter than 9 digits');
            return false;
        } else if (microchip_number.length > 15) {
            $('#microchip_number_error').html('Microchip # cannot be longer than 15 digits');
            return false; 
        } else {
            $('#microchip_number_error').html('');
            return true;
        }
    } else {
        $('#microchip_number_error').html('');
        return true;
    }
}

function sendRegistrationForm() {
    var data = $('#dog_registration_form').serialize();

    $.ajax({
        type: 'POST',
        url: 'register.php',
        data: data,
        dataType: 'json',
        beforeSend: function () {
            // don't allow multiple submits
            $('#register_dog').attr("disabled", true);
        },
        success: function(response){
            $('.error').empty(); // remove previous errors
    
            if(response.hasOwnProperty('success')) {
                $('.container-content').html('\
                    <div class="m-5">\
                        <h2>Registration Submitted!</h2>\
                        <a href="index.html">Register Another Dog</a>\
                    </div>');
            } else {
                $.each(response, function(key, value){
                    $('#'+key).html(value);
                });

                $('#register_dog').attr("disabled", false);
            }
        }
    });
}