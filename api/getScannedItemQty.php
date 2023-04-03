<?php
include('database.php');
$id = $decodedData['userId'];
$productId = $decodedData['productId'];

$SQL = "SELECT COUNT(product_id) AS qty
FROM user_product 
WHERE user_id = '$id'
AND product_id = '$productId'
AND isScanned <> 'N'";

$exeSQL = mysqli_query($conn, $SQL);

// Stores results in an array with multiple objects fetched from join
$result = mysqli_fetch_all($exeSQL, MYSQLI_ASSOC);

echo json_encode($result);
?>