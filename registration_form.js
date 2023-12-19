$(document).ready(function (){
    $('#dog-registration-form').on('submit', function(e){
        e.preventDefault();
        
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
            success: function(res){
                console.log(res);
            },
            error: function() {
                alert('Failed to register');
            }
        });
    });
})