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


	$Gruppen="";
	$Anmerkungen="";
	$Studienjahr = "";
	if(isset($_GET['ID_Lehrer'])){
		$ID_Lehrer = $_GET['ID_Lehrer'];  
	}
	if(isset($_GET['Studienjahr'])){
        $Studienjahr = $_GET['Studienjahr'];  
	}
	if(isset($_GET['Semester'])){
        $Semester = $_GET['Semester'];  
	}
	//echo $ID_Lehrer;
	$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem,
				lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis 
				FROM planung, lv, lehrer 
				WHERE planung.ID_LV =lv.ID_LV 
				AND planung.ID_Lehrer = '$ID_Lehrer' 
				AND planung.ID_Lehrer = lehrer.ID_Lehrer
				AND (planung.Studienjahr = '$Studienjahr')";

      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray);
	
