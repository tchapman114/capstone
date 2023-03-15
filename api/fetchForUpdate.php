<?php
include('database.php');
$id = $decodedData['id']['userId'];

$SQL = "SELECT * FROM user WHERE id = '$id'";

$exeSQL = mysqli_query($conn, $SQL);
$arrayu = mysqli_fetch_array($exeSQL);

$response[] = array($arrayu);
echo json_encode($response);
?>

