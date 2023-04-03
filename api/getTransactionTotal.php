<?php
include('database.php');
$userId = $decodedData['userId'];

// Distinct = does not show duplicates
$SQL = "SELECT SUM(product.price) as total 
FROM product 
INNER JOIN user_product on product.id=user_product.product_id
WHERE (user_product.user_id = '$userId')
AND (user_product.isScanned = 'Y')";

$exeSQL = mysqli_query($conn, $SQL);

// Stores results in an array with multiple objects fetched from join
$result = mysqli_fetch_all($exeSQL, MYSQLI_ASSOC);

echo json_encode($result);
?>