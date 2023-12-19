<?php
header("Content-type: text/plain; charset=UTF-8");
main();

function main() {
    $dog_detail_keys = [
        'dog_name',
        'breed',
        'gender',
        'microchip_number'
    ];
    $dog_details = getDogDetails($dog_detail_keys);
    
    $concat_dog_detail_keys = implode(', ', array_keys($dog_detail_keys));
    $concat_dog_detail_values = "'". implode(", '", array_values($dog_details)) . "'";

    $sql_query = "INSERT INTO Dogs ($concat_dog_detail_keys) VALUES ($concat_dog_details);";
    
    $success = true;
    
    echo($success);
}

function getDogDetails($dog_detail_keys) {
    $dog_details = [];
    foreach($dog_detail_keys as $dog_detail_key) {
        $dog_details[$dog_detail_key] = $_POST[$dog_detail_key];
    }

    return $dog_details;
}

?>