<?php
#Include the connect.php file
include ('dbconnection.php');
// Connect to the database
//$hostname = "localhost";
//$username = "root";
//$password = "";
//$database = "iab";

$db = new mysqli($hostname, $username, $password, $database);
mysqli_set_charset($db, "utf8");
/* check connection */
if (mysqli_connect_errno())
	{
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
	}
// get data and store in a json array
$query = "SELECT * FROM studien";
if(isset($_GET['sortID'])){
    
    $sql = "SELECT ID_Studien FROM studien ORDER BY ID_Studien DESC";
    $db_erg = mysqli_query( $db, $sql );
    $ausgabearray = array();

    while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
    }
    //print_r($ausgabearray);
    mysqli_free_result( $db_erg );
    echo json_encode($ausgabearray);
    
}
if (isset($_GET['insert']))
{
	// INSERT COMMAND
	// Fügt eine leere Zeile ein, welche durch upate befüllt wird
    $Bezeichnung ="";
    
     
    $sql = "INSERT INTO studien (Bezeichnung) VALUES ('$Bezeichnung')";

    $query = mysqli_query($db, $sql);
    
    $sql = "SELECT * FROM studien ORDER BY ID_Studien DESC";
    $db_erg = mysqli_query( $db, $sql );
    $ausgabearray = array();

    while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
    }
    //print_r($ausgabearray);
    mysqli_free_result( $db_erg );
   // echo json_encode($ausgabearray);//nichts zurÃ¼ckgeben da sonst Fehlermeldung wegen Binding ans grid
    
}

  else if (isset($_GET['update']))
	{
		$Bezeichnung ="";
		
		
		
		  //echo "Update";
		  if(isset($_GET['ID_Studien'])){
			$ID_Studien = $_GET['ID_Studien'];  
		  }
		  if(isset($_GET['Bezeichnung'])){
			$Bezeichnung = $_GET['Bezeichnung'];
		  }
	  
      
		 // UPDATE COMMAND
		$sql = "UPDATE studien SET Bezeichnung='$Bezeichnung' WHERE ID_Studien = '$ID_Studien'";
		$query = mysqli_query($db, $sql);
		   
		$sql = "SELECT * FROM studien";
		$db_erg = mysqli_query( $db, $sql );
		$ausgabearray = array();

		while( $zeile = mysqli_fetch_assoc( $db_erg )){
			$ausgabearray[] = $zeile;
		}
		mysqli_free_result( $db_erg );
		echo json_encode($ausgabearray);
      
	}
	
	else if (isset($_GET['delete']))
	{
	// DELETE COMMAND
    $ID = $_GET['ID_Studien'];
	$sql = "DELETE FROM studien WHERE ID_Studien='$ID'";
    $query = mysqli_query($db, $sql);
      
      $sql = "SELECT * FROM studien";
      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray); 
      
	}
  else
  {
      $sql = "SELECT * FROM studien ORDER BY ID_Studien DESC";
      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray);
  }//else
   
mysqli_close($db);
?>
