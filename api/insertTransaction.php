<?php
include('database.php');
$userId = $decodedData['userId'];
$total = $decodedData['total'];
$date = date('Y-m-d'); //todays date

$SQL = "INSERT INTO `transaction` (`user`, `total`, `date`) VALUES ('$userId', '$total', '$date')";
//SQL date format: 2023-03-19

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