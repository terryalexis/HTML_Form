<?php
header("Content-type: text/plain; charset=UTF-8");
main();

function main() {
    $isValid = true;

    // Dog Name Validation
    $dog_name = '';
    $dog_name_err = '';
    if(empty($_POST['dog_name'])) {
        $dog_name_err = 'Dog name is required';
        $isValid = false;
    } else {
        $dog_name = trim($_POST['dog_name']);
    }

    // Breed Validation
    $breed = '';
    $breed_err = '';
    if(empty($_POST['breed'])){
        $breed_err = 'Breed is required';
        $isValid = false;
    } else {
        $breed = trim($_POST['breed']);
    }

    // Gender Validation
    $gender = '';
    $gender_err = '';
    if(empty($_POST['gender'])) {
        $gender_err = 'Gender is required';
        $isValid = false;
    } else {
        $gender = trim($_POST['gender']);
    }

    // Microchip Number Validation
    $microchip_num = '';
    $microchip_num_err = '';
    if(empty($_POST['microchip_number'])) {
        $microchip_num_err = null;
    } else {
        $microchip_number = $_POST['microchip_number'];
    }
    
    $sql_query = "INSERT INTO Dogs (dog_name, breed, gender, microchip_number) 
    VALUES ('$dog_name', '$breed', '$gender', $microchip_number);";

    if ($isValid) {
        echo(insertIntoFakeDatabase($sql_query));
    } else {
        echo(false);
    }
}


function getDogDetails($dog_detail_keys) {
    $dog_details = [];
    foreach($dog_detail_keys as $dog_detail_key) {
        $dog_details[$dog_detail_key] = $_POST[$dog_detail_key];
    }
    return $dog_details;
}


function insertIntoFakeDatabase($sql_query) {
    return true;
}

?>