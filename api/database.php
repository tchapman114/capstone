 <?php
 $conn = mysqli_connect("localhost", "root", "", "EasyCheckout", "3307");

 // Check connection
 if(mysqli_connect_error())
 echo "Connection Error.\n";
 else
 echo "database Connection was successful!\n";


 $encodedData = file_get_contents('php://input');  // take data from react native fetch API
 $decodedData = json_decode($encodedData, true);

//  $encodedData variable stores the data that is taken from the front end.
//  $decodedData variable, specifies the value to be decoded. 
?>