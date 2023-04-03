<?php
include('database.php');
$id = $decodedData['id']['userId'];

// Distinct = does not show duplicates
$SQL = "SELECT distinct user_product.user_id, user_product.product_id, product.name, product.price 
FROM user_product 
INNER JOIN product on user_product.product_id=product.id 
WHERE (user_product.user_id = '$id')
AND (user_product.isScanned = 'Y')";

$exeSQL = mysqli_query($conn, $SQL);

// Stores results in an array with multiple objects fetched from join
$result = mysqli_fetch_all($exeSQL, MYSQLI_ASSOC);

echo json_encode($result);
?>