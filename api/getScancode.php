<?php
include('database.php');
$scancode = $decodedData['scancode'];

$SQL = "SELECT * FROM product WHERE scancode = '$scancode'";

$exeSQL = mysqli_query($conn, $SQL);
$arrayu = mysqli_fetch_array($exeSQL);

$response[] = array($arrayu);
echo json_encode($response);
?>