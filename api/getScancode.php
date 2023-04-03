<?php
include('database.php');
$scancode = $decodedData['scancode'];

$SQL = "SELECT * FROM product WHERE scancode = '$scancode'";

$exeSQL = mysqli_query($conn, $SQL);
$result = mysqli_fetch_all($exeSQL, MYSQLI_ASSOC);

echo json_encode($result);
?>