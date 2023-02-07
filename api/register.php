<?php
//TODO should we hash card numbers ?
// is there other validations we should add ?

include('database.php'); 

    // Columns from the USER table
    $firstname = $decodedData['firstname'];
    $lastname = $decodedData['lastname'];
    $email = $decodedData['email'];
    $phone = $decodedData['phone']; 
    $cardnumber = $decodedData['cardnumber'];
    // Hashing password
    $password = md5($decodedData['password']);


    $SQL = "SELECT * FROM user WHERE email = '$email'";
    $exeSQL = mysqli_query($conn, $SQL);
    $checkEmail =  mysqli_num_rows($exeSQL);
    
    // Check to see if email exists in DB
    if ($checkEmail != 0) {
        $Message = "User is already registered";
    } else {
        $Query = "INSERT INTO user(firstname, lastname, email, phone, cardnumber, password)
         values ('$firstname', '$lastname', '$email', '$phone', '$cardnumber', '$password')";

    $R = mysqli_query($conn, $Query);

    if ($R) {
        $Message = "Successfully added user into USER table! ";
    } else {
        $Message = "Error inserting user data.";
    }
}

$response[] = array("Message" => $Message);

echo json_encode($response);
?>