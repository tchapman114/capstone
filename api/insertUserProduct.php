<?php
include('database.php');
$userId = $decodedData['userId'];
$productId = $decodedData['productId'];

$SQL = "INSERT INTO user_product (user_id, product_id) VALUES ('$userId', '$productId')";

if(mysqli_query($conn, $SQL)){
    // If the record inserted successfully then show the message.
    $Message = 'Success';
 }
 else {
    $Message = 'Error';
 }

 $response[] = array("Message" => $Message);

echo json_encode($response);
?>