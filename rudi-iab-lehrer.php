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
$query = "SELECT * FROM lehrer";
if(isset($_GET['sortID'])){
    
    $sql = "SELECT ID_Lehrer FROM lehrer ORDER BY ID_Lehrer DESC";
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
	// F�gt eine leere Zeile ein, welche durch upate bef�llt wird
    $Vorname ="";
    $Nachname="";
    $Kurzzeichen="";
    $Mailadresse="";
    $Stamminstitut = "";
    $Dienstverhaeltnis = "";
	$Kennwort = "";
     
    $sql = "INSERT INTO lehrer (Vorname, Nachname, Kurzzeichen, Mailadresse, Stamminstitut, Dienstverhaeltnis, Kennwort) VALUES ('$Vorname', '$Nachname','$Kurzzeichen', '$Mailadresse', '$Stamminstitut', '$Dienstverhaeltnis', '$Kennwort')";

    $query = mysqli_query($db, $sql);
    
    $sql = "SELECT * FROM lehrer ORDER BY ID_Lehrer DESC";
    $db_erg = mysqli_query( $db, $sql );
    $ausgabearray = array();

    while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
    }
    //print_r($ausgabearray);
    mysqli_free_result( $db_erg );
   // echo json_encode($ausgabearray);//nichts zurückgeben da sonst Fehlermeldung wegen Binding ans grid
    
}

  else if (isset($_GET['update']))
	{
		$Vorname ="";
		$Nachname="";
		$Kurzzeichen="";
		$Mailadresse="";
		$Stamminstitut = "";
		$Dienstverhaeltnis = "";
		$Kennwort = "";
		
		  //echo "Update";
		  if(isset($_GET['ID_Lehrer'])){
			$ID_Lehrer = $_GET['ID_Lehrer'];  
		  }
		  if(isset($_GET['Vorname'])){
			$Vorname = $_GET['Vorname'];
		  }
		  if(isset($_GET['Nachname'])){
			$Nachname = $_GET['Nachname'];
		  }
		  if(isset($_GET['Kurzzeichen'])){
			$Kurzzeichen = $_GET['Kurzzeichen'];
		  }
		  if(isset($_GET['Mailadresse'])){
			$Mailadresse = $_GET['Mailadresse'];
		  }
		  if(isset($_GET['Stamminstitut'])){
			$Stamminstitut = $_GET['Stamminstitut'];
		  }
          if(isset($_GET['Dienstverhaeltnis'])){
			$Dienstverhaeltnis = $_GET['Dienstverhaeltnis'];
		  }
		  if(isset($_GET['Dienstverhaeltnis'])){
			$Kennwort = $_GET['Kennwort'];
		  }
       
		 // UPDATE COMMAND
		$sql = "UPDATE lehrer SET Vorname = '$Vorname', Nachname='$Nachname' , Kurzzeichen='$Kurzzeichen', Mailadresse='$Mailadresse', Stamminstitut='$Stamminstitut', Dienstverhaeltnis='$Dienstverhaeltnis', Kennwort='$Kennwort' WHERE ID_Lehrer = '$ID_Lehrer'"; 
		$query = mysqli_query($db, $sql);
		   
		$sql = "SELECT * FROM lehrer";
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
    $ID = $_GET['ID_Lehrer'];
	$sql = "DELETE FROM lehrer WHERE ID_Lehrer='$ID'";
    $query = mysqli_query($db, $sql);
	
	//Delete auch von der Zuordungstabele planung
	$sql = "DELETE FROM planung WHERE ID_Lehrer='$ID'";
    $query = mysqli_query($db, $sql);
      
      $sql = "SELECT * FROM lehrer";
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
      $sql = "SELECT * FROM lehrer WHERE lehrer.ID_Lehrer != 1 ORDER BY ID_Lehrer DESC";
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
