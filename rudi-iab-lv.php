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
$query = "SELECT * FROM lv";
if(isset($_GET['sortID'])){
    
    $sql = "SELECT ID_LV FROM lv ORDER BY ID_LV DESC";
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
    
	$st_sem ="";
    $St_R="";
	$Studium="";
	$Kategorie="";
    $LV_KZZ="";
    $Modultitel = "";
	$Sem = 0;
	$LVA_Titel = "";
	$LA_Art = "";
	$TN = 0;
	$WST = 0;
	$Anmerkungen= "";
	$WST_Lehrer=0;
	$Wertigkeit = 0;
	$Werteinheiten = 0;
     
    //$sql = "INSERT INTO lv (st_sem, St_R, Kategorie, LV_KZZ, Modultitel, Sem, LVA_Titel, LA_Art, TN, WST, Anmerkungen, WST_Lehrer, Wertigkeit, Werteiheiten) VALUES ('$st_sem', '$St_R','$Kategorie', '$LV_KZZ', '$Modultitel', '$Sem', '$LVA_Titel', '$LA_Art', '$TN', '$WST', '$Anmerkungen', '$WST_Lehrer', '$Wertigkeit', '$Werteinheiten')";
	//$sql = "INSERT INTO `lv` (`ID_LV`, `st_sem`, `St_R`, `Studium`, `Kategorie`, `LV_KZZ`, `Modultitel`, `Sem`, `LVA_Titel`, `LA_Art`, `TN`, `WST`, `Anmerkungen`, `WST_Lehrer`, `Wertigkeit`, `Werteinheiten`) VALUES (NULL,'$st_sem', '$St_R','$Kategorie', '$LV_KZZ', '$Modultitel', '$Sem', '$LVA_Titel', '$LA_Art', '$TN', '$WST', '$Anmerkungen', '$WST_Lehrer','$Wertigkeit', '$Werteinheiten')";
	$sql = "INSERT INTO `lv` (`ID_LV`, `st_sem`, `St_R`, `Studium`, `Kategorie`, `LV_KZZ`, `Modultitel`, `Sem`, `LVA_Titel`, `LA_Art`, `TN`, `WST`, `Anmerkungen`, `WST_Lehrer`, `Wertigkeit`, `Werteinheiten`) VALUES (NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL)";

    $query = mysqli_query($db, $sql);
    //echo "Zeile einfuegen";
    $sql = "SELECT * FROM lv ORDER BY ID_LV DESC";
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
		// Variablen vorher deklarieren und leer belegen, damit im SQL Sring Variablen erkannt werden, da sie zuvor innerhalb if stehen.
		$ID_LV = "";
		$st_sem = "";
		$St_R = "";
		$Studium = "";
		$Kategorie = "";
		$LV_KZZ = "";
		$Modultitel = "";
		$Sem = "";
		$LVA_Titel = "";
		$LA_Art = "";
		$TN = "";
		$WST = "";
		$Anmerkungen = "";
		$WST_Lehrer = "";
		$Wertigkeit = "";
		$Werteiheiten = "";
		$PHO_Eintrag = "";
		$Aenderungen = "";
		
		if(isset($_GET['ID_LV'])){
			$ID_LV = $_GET['ID_LV'];  
		}
		if(isset($_GET['st_sem'])){
			$st_sem = $_GET['st_sem'];
		}
		if(isset($_GET['St_R'])){
			$St_R = $_GET['St_R'];
		}
		if(isset($_GET['Studium'])){
			$Studium = $_GET['Studium'];
		}
		if(isset($_GET['Kategorie'])){
			$Kategorie = $_GET['Kategorie'];
		}
		if(isset($_GET['LV_KZZ'])){
			$LV_KZZ = $_GET['LV_KZZ'];
		}
		if(isset($_GET['Modultitel'])){
			$Modultitel = $_GET['Modultitel'];
		}
		if(isset($_GET['Sem'])){
			$Sem = $_GET['Sem'];
		}
		if(isset($_GET['LVA_Titel'])){
			$LVA_Titel = $_GET['LVA_Titel'];
		}
		if(isset($_GET['LA_Art'])){
			$LA_Art = $_GET['LA_Art'];
		}
		if(isset($_GET['TN'])){
			$TN = $_GET['TN'];
		}
		if(isset($_GET['WST'])){
			$WST = $_GET['WST'];
		}
		if(isset($_GET['Anmerkungen'])){
			$Anmerkungen = $_GET['Anmerkungen'];
		}
		if(isset($_GET['WST_Lehrer'])){
			$WST_Lehrer = $_GET['WST_Lehrer'];
		}
		if(isset($_GET['Wertigkeit'])){
			$Wertigkeit = $_GET['Wertigkeit'];
		}
		if(isset($_GET['Werteinheiten'])){
			$Werteiheiten = $_GET['Werteiheiten'];
		}
		if(isset($_GET['PHO_Eintrag'])){
			$PHO_Eintrag = $_GET['PHO_Eintrag'];
		}
		if(isset($_GET['Aenderungen'])){
			$Aenderungen = $_GET['Aenderungen'];
		}
		
		// UPDATE COMMAND
		$sql = "UPDATE lv SET st_sem = '$st_sem', St_R = '$St_R', Studium = '$Studium', Kategorie = '$Kategorie', LV_KZZ = '$LV_KZZ', Modultitel = '$Modultitel', Sem = '$Sem', LVA_Titel = '$LVA_Titel', LA_Art = '$LA_Art', TN = '$TN', WST = '$WST', Anmerkungen = '$Anmerkungen', WST_Lehrer = '$WST_Lehrer', Wertigkeit = '$Wertigkeit', Werteinheiten = '$Werteiheiten', PHO_Eintrag = '$PHO_Eintrag', Aenderungen = '$Aenderungen' WHERE ID_LV = '$ID_LV'";
		$query = mysqli_query($db, $sql);
		
		  
		$sql = "SELECT * FROM lv WHERE lv.ID_LV != 1 ORDER BY ID_LV DESC";
		$sql = "SELECT * FROM lv ORDER BY ID_LV DESC";
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
    $ID = $_GET['ID_LV'];
	$sql = "DELETE FROM lv WHERE ID_LV='$ID'";
    $query = mysqli_query($db, $sql);
	
	//Delete lv aus der Planung Tabelle
	$sql = "DELETE FROM planung WHERE ID_LV='$ID'";
    $query = mysqli_query($db, $sql);
	
	
      
    $sql = "SELECT * FROM lv ORDER BY ID_LV DESC";
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
      $sql = "SELECT * FROM lv WHERE lv.ID_LV != 1 ORDER BY ID_LV DESC";
      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray);
  }//else
   
mysqli_close($db);
//
