<?php
// went user removes products
include('database.php');
$userId = $decodedData['userId'];
$productId = $decodedData['productId'];

$SQL = "UPDATE user_product 
SET isScanned = 'N' WHERE user_id = '$userId' AND product_id = '$productId'";


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