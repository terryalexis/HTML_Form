<?php
header("Content-type: text/plain; charset=UTF-8");
register();

function register() {
    $dog_details = [];
    $errors = [];

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $dog_details = array_map('trim', $_POST);

        if(empty($dog_details['dog_name'])) {
            $errors['dog_name'] = "Dog name is required";
        }
        if(empty($dog_details['breed'])) {
            $errors['breed'] = "Breed is required";
        }
        if(empty($dog_details['gender'])) {
            $errors['gender'] = "Gender is required";
        }

        $response = [];
        
        if(empty($errors)) {
            $sql_query = "INSERT INTO Dogs (dog_name, breed, gender, microchip_number) 
                VALUES ('$dog_details[dog_name]', '$dog_details[breed]', '$dog_details[gender]', $dog_details[microchip_number]);";

            if(connectToDatabase($sql_query)) {
                $response["success"] = "Registration Submitted!";
            }
        } else {
            foreach($errors as $key=>$value) {
                $response[$key . '_error'] = $value;
            }
        }

        echo(json_encode($response));
    }

    // // Dog Name Validation
    // $dog_name = '';
    // $dog_name_err = '';
    // if(empty($_POST['dog_name'])) {
    //     $dog_name_err = 'Dog name is required';
    //     throw new Exception("Dog name is required");
    // } else {
    //     $dog_name = trim($_POST['dog_name']);
    // }

    // // Breed Validation
    // $breed = '';
    // $breed_err = '';
    // if(empty($_POST['breed'])){
    //     $breed_err = 'Breed is required';
    //     $isValid = false;
    // } else {
    //     $breed = trim($_POST['breed']);
    // }

    // // Gender Validation
    // $gender = '';
    // $gender_err = '';
    // if(empty($_POST['gender'])) {
    //     $gender_err = 'Gender is required';
    //     $isValid = false;
    // } else {
    //     $gender = trim($_POST['gender']);
    // }

    // // Microchip # Validation
    // $microchip_num = '';
    // $microchip_num_err = '';
    // if(empty($_POST['microchip_number'])) {
    //     $microchip_num_err = null;
    // } else {
    //     $microchip_number = $_POST['microchip_number'];
    // }


    // if ($isValid) {
    //     echo(connectToDatabase($sql_query));
    // } else {
    //     echo(false);
    // }
}


function getDogDetails($dog_detail_keys) {
    $dog_details = [];
    foreach($dog_detail_keys as $dog_detail_key) {
        $dog_details[$dog_detail_key] = $_POST[$dog_detail_key];
    }
    return $dog_details;
}


function connectToDatabase($sql_query) {
    return true;
}

?>