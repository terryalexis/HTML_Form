<?php

$data = $_POST['data'];

$decoded_data = json_decode($data);

echo($decoded_data);


?>