<?php
// went user completes checkout, we want to disable all their items
include('database.php');
$userId = $decodedData['userId'];

$SQL = "UPDATE user_product 
SET isScanned = 'N' WHERE user_id = '$userId'";

$exeSQL = mysqli_query($conn, $SQL);
?>