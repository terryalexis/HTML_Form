$(document).ready(function (){
    $('#dog-registration-form').on('submit', function(e){
        e.preventDefault();

        checkDogName();
        checkBreed();
        checkMicrochipNum();
        
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
            success: function(res){
                console.log(res);
            },
            error: function(e) {
                alert('Error Registering');
            },
            complete: function () {
                setTimeout(function () {
                    $('#dog-registration-form').trigger("reset");
                    $('#register-dog').attr("disabled", false);
                }, 50000);
            }
        });
    });
})

function checkDogName() {
    if ($('#dog-name').val().length < 1) {
        $('#dog-name-err').html('Dog name is required');
        return false;
    } else {
        $('#dog-name-err').html('');
        return true;
    }
}

function checkBreed() {
    var pattern = /^[a-zA-Z\s]*$/;
    var breed = $('#breed').val();
    var valid_breed = pattern.test(breed);
    if ($('#breed').val().length < 2) {
        $('#breed-err').html('Breed is required');
        return false;
    } else if (!valid_breed) {
        $('#breed-err').html('Breed can only include letters and spaces');
        return false;
    } else {
        $('#dog-name-err').html('');
        return true;
    }
}

function checkMicrochipNum() {
    if ($('#microchip-number').val().length > 20) {
        $('#microchip-num-err').html('Microchip # cannot be longer than 20 digits');
        return false;
    } else {
        $('#microchip-num-err').html('');
        return true;
    }
}