<?php
include('database.php');
$id = $decodedData['id']['userId'];

$SQL = "SELECT * FROM transaction WHERE user = '$id' ORDER BY date DESC";

$exeSQL = mysqli_query($conn, $SQL);

// Fetching all transactions associated with user id. Stores in an array with multiple objects
$result = mysqli_fetch_all($exeSQL, MYSQLI_ASSOC);

echo json_encode($result);
?>