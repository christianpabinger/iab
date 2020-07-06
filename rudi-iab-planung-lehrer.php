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

if (isset($_GET['select']))
{
	
	$Gruppen="";
	$Anmerkungen="";
	$Studienjahr = "";
	if(isset($_GET['ID_Lehrer'])){
		$ID_Lehrer = $_GET['ID_Lehrer'];  
	}
	if(isset($_GET['Studienjahr'])){
        $Studienjahr = $_GET['Studienjahr'];  
	}
	//echo $ID_Lehrer;
	$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen,  planung.Semester, planung.Wertigkeit, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem, lv.WST,
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
    
}
else if (isset($_GET['insert']))
{
    $ID_LV=1;
	$Gruppen="";
    $Anmerkungen="";
	$Wertigkeit = 1;
	
	$ID_Lehrer = $_GET['ID_Lehrer'];  
	$Studienjahr = $_GET['Studienjahr']; 
	$Dienstverhaeltnis = $_GET['Dienstverhaeltnis']; 
	
	if($Dienstverhaeltnis == "MVBL"){
		$Wertigkeit=1.167;
	}
	
	
	$sql = "INSERT INTO `planung` (`ID_Planung`, `Studienjahr`, `ID_LV`, `ID_lehrer`, `Gruppen`, `Anmerkungen`, `Wertigkeit`) VALUES (NULL, '$Studienjahr', '$ID_LV','$ID_Lehrer', '$Gruppen', '$Anmerkungen', '$Wertigkeit')";
	$query = mysqli_query($db, $sql);
	
				
	$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen,  planung.Semester, planung.Wertigkeit, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem, lv.WST,
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
	
	die();
		
}
else if (isset($_GET['delete']))
{
	
	//$ID_Lehrer = $_GET['ID_Lehrer'];  
		
	$ID_Planung = $_GET['ID_Planung'];
	//echo $ID_Planung;
	
	$sql="SELECT Studienjahr FROM `planung` WHERE ID_Planung='$ID_Planung' ";
	$db_erg = mysqli_query( $db, $sql );
	
	$ausgabearray = array();
	
	while( $zeile = mysqli_fetch_assoc( $db_erg )){
	  $ausgabearray[] = $zeile;
	}
	mysqli_free_result( $db_erg );
	$Studienjahr =  $ausgabearray[0]['Studienjahr'];
	
	//die ID_LV abfragen zu der die ID_Planung gehört
	// um nach dem Löschen der Zeile die zur ID_LV zugehörigen Eintragungen auszugeben
	$sql = "SELECT ID_Lehrer FROM planung WHERE ID_Planung ='$ID_Planung'";
	$db_erg = mysqli_query( $db, $sql );
	
	$ausgabearray = array();
	
	while( $zeile = mysqli_fetch_assoc( $db_erg )){
	  $ausgabearray[] = $zeile;
	}
	mysqli_free_result( $db_erg );
	//print_r($ausgabearray);
	//echo json_encode($ausgabearray);
	$ID_Lehrer =  $ausgabearray[0]['ID_Lehrer'];
	
	//jetzt löschen
	$sql = "DELETE FROM planung WHERE ID_Planung='$ID_Planung'";
	$query = mysqli_query($db, $sql);
	   
	//jetzt alle Tabelleneinträge zugehörig zur LV zurückgeben
	
				
		$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen,  planung.Semester, planung.Wertigkeit, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem, lv.WST,
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

}
else if (isset($_GET['update']))
{
	
	// Variablen vorher deklarieren und leer belegen, damit im SQL Sring Variablen erkannt werden, da sie zuvor innerhalb if stehen.
	//$Studienjahr ="";
	$Gruppen="";
	$Anmerkungen="";
	$Semester = "";
	
	if(isset($_GET['ID_Planung'])){
		$ID_Planung = $_GET['ID_Planung'];  
	}
	
	if(isset($_GET['Studienjahr'])){
		$Studienjahr = $_GET['Studienjahr'];  
	}
	
	if(isset($_GET['ID_Lehrer'])){
		$ID_Lehrer = $_GET['ID_Lehrer'];
	}
	if(isset($_GET['Gruppen'])){
		$Gruppen = $_GET['Gruppen'];
	}
	if(isset($_GET['Anmerkungen'])){
		$Anmerkungen = $_GET['Anmerkungen'];
	}
	if(isset($_GET['LV_KZZ'])){
		$LV_KZZ = $_GET['LV_KZZ'];
				   
	}
	if(isset($_GET['Semester'])){
		$Semester = $_GET['Semester'];
				   
	}
	if(isset($_GET['Dienstverhaeltnis'])){
		$Dienstverhaeltnis = $_GET['Dienstverhaeltnis'];
				   
	}
	if(isset($_GET['Wertigkeit'])){
		$Wertigkeit = $_GET['Wertigkeit'];
				   
	}
	
	
	//ID_LV aus dem KZZ suchen da nur die ID und nicht das KZZ in die Tabelle geschrieben wird
	$sql = "Select ID_LV, WST FROM lv WHERE LV_KZZ = '$LV_KZZ'";
	
			$db_erg = mysqli_query($db, $sql);
			$ausgabearray = array();
			while( $zeile = mysqli_fetch_assoc( $db_erg )){
				$ausgabearray[] = $zeile;
			}
			$ID_LV = $ausgabearray[0]['ID_LV'];
			$WST = $ausgabearray[0]['WST'];
	
	//Das geplante Semestr Ws oder SS abrufen und für das aktuelle Semester einsetzen
	$sql = "Select st_sem FROM lv WHERE LV_KZZ = '$LV_KZZ'";
	
			$db_erg = mysqli_query($db, $sql);
			$ausgabearray = array();
			while( $zeile = mysqli_fetch_assoc( $db_erg )){
				$ausgabearray[] = $zeile;
			}
			$st_sem = $ausgabearray[0]['st_sem'];
	//print($st_sem);
	
	//Wenn in die neu angelete Zeile beim Lehrer eine LV zugewiesen wird dann soll das aktuelle Semester das geplante Semester st_sem sein
	//sonst soll das Semester übernommen werden, welces beim update geändert wurde 
	if($Semester == "null"){
		$Semester = $st_sem;
	}
	
	//Berechnen der Werteinheiten
	$Werteinheiten = $WST * $Wertigkeit;
	//echo $Wertigkeit;
	//echo $Werteinheiten;
	
	//ID_Lehrer = '$ID_Lehrer', Studienjahr = '$Studienjahr',
	$sql = "UPDATE planung SET  ID_LV = '$ID_LV',  Gruppen = '$Gruppen', Semester = '$Semester', Anmerkungen = '$Anmerkungen', Wertigkeit = '$Wertigkeit', Werteinheiten = '$Werteinheiten'  WHERE ID_Planung = '$ID_Planung'";
	$query = mysqli_query($db, $sql);
	
	
	//jetzt alle Tabelleneinträge zugehörig ur LV zurückgeben
	
		$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen,  planung.Semester, planung.Wertigkeit, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem, lv.WST,
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
}
else
{	
	/*
	$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.ID_Planung, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen,
				lv.LV_KZZ,  lv.LVA_Titel, lv.Werteinheiten, 
				lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen 
				FROM planung, lv, lehrer 
				WHERE planung.ID_LV =lv.ID_LV 
				AND planung.ID_Lehrer = 1 
				AND planung.ID_Lehrer = lehrer.ID_Lehrer";
				//AND (planung.Studienjahr = '$Studienjahr')";

	  $db_erg = mysqli_query( $db, $sql );
	  $ausgabearray = array();

	  while( $zeile = mysqli_fetch_assoc( $db_erg )){
		$ausgabearray[] = $zeile;
	  }
	  mysqli_free_result( $db_erg );
	  echo json_encode($ausgabearray);
	*/
	$ausgabearray = array();
	echo json_encode($ausgabearray);
}




