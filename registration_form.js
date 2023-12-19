$(document).ready(function (){
    $('#register-dog').click(function(){
        var data = {
            dog_name: $('#dog-name').val(),
            breed: $('#breed').val(),
            gender: $('input[name="gender"]:checked').val(),
            microchip_number: $('#microchip-number').val()
        };

        $.ajax({
            type: "POST",
            url: "register.php",
            data: data,
            dataType: "json",
            success: function(res){
                alert("success!");
            }
        });
    });
})