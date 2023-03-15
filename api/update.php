<?php
include('database.php');
 $id = $decodedData['id']['userId'];
 $firstname = $decodedData['firstname'];
 $lastname = $decodedData['lastname'];
 $email = $decodedData['email'];
 $phone = $decodedData['phone'];
 $cardnumber = $decodedData['cardnumber'];
 $password = $decodedData['password'];
 
 $SQL = "UPDATE user SET firstname = '$firstname', lastname = '$lastname', email = '$email', phone = '$phone', cardnumber = '$cardnumber', password = '$password' WHERE id = '$id'";

if(mysqli_query($conn, $SQL)){
    // If the record inserted successfully then show the message.
    $Message = 'Success';
 }
 else {
    $Message = 'Error';
 }

$response[] = array("Message" => $Message, "SQL" => $SQL, "id"=>$id);

echo json_encode($response);
?>