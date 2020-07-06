<?php
#Include the connect.php file
include ('dbconnection.php');


$db = new mysqli($hostname, $username, $password, $database);
mysqli_set_charset($db, "utf8");
/* check connection */
if (mysqli_connect_errno())
{
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}
	//Einlesen der Variablen
	if(isset($_GET['ID_Lehrer'])){
		$ID_Lehrer = $_GET['ID_Lehrer'];   
	}
	if(isset($_GET['Studienjahr'])){
		$Studienjahr = $_GET['Studienjahr'];
	}
	if(isset($_GET['Freigabe'])){
		$Freigabe = $_GET['Freigabe'];
	}
	if(isset($_GET['Kurzzeichen'])){
		$Kurzzeichen = $_GET['Kurzzeichen'];
	}

//wird augerufen, wenn ein Lehrer bei der lehrerplanung mit add row neue Zuordnung erstellt wird		
if (isset($_GET['add']))
{	
		//Abfragen ob der Lehrer in diesem Studienjahr schon agelegt ist
		$sql = "SELECT * FROM freigaben WHERE ID_Lehrer = $ID_Lehrer AND Studienjahr = '$Studienjahr'";
		$db_erg = mysqli_query($db, $sql);
		$ausgabearrayL = array();
		while( $zeile = mysqli_fetch_assoc( $db_erg )){
			$ausgabearrayL[] = $zeile;
		}
		//Wenn Lehrer noch nicht angelegt ist dann der tabelle freigaben hizufügen
		if($ausgabearrayL == null){
			$sqladd = "INSERT INTO freigaben (ID_Lehrer, Studienjahr, Freigabe) VALUES ('$ID_Lehrer', '$Studienjahr', '$Freigabe')";
			$db_erg = mysqli_query($db, $sqladd);
		}
		//Wenn schon angelegt, dann nichs machen
}

//wird augerufen, wenn ein Lehrer bei der LVplanung bei Update row der LV hinzugefügt wird
if (isset($_GET['addwithkzz']))
{	
		//Die ID des Lehrers aus dem Kurzzreichen ermitteln
		$sql = "SELECT ID_Lehrer FROM lehrer WHERE Kurzzeichen = '$Kurzzeichen'";
		$db_erg = mysqli_query($db, $sql);
		$ausgabearrayKZZ = array();
		while( $zeile = mysqli_fetch_assoc( $db_erg )){
			$ausgabearrayKZZ[] = $zeile;
		}
		$ID_Lehrer =  $ausgabearrayKZZ[0]["ID_Lehrer"];
		print_r($ID_Lehrer);
		//Abfragen ob der Lehrer in diesem Studienjahr schon angelegt ist
		$sql = "SELECT * FROM freigaben WHERE ID_Lehrer = '$ID_Lehrer' AND Studienjahr = '$Studienjahr'";
		$db_erg = mysqli_query($db, $sql);
		$ausgabearrayL = array();
		while( $zeile = mysqli_fetch_assoc( $db_erg )){
			$ausgabearrayL[] = $zeile;
		}
		//Wenn Lehrer noch nicht angelegt ist dann der tabelle freigaben hizufügen
		if($ausgabearrayL == null){
			$sqladd = "INSERT INTO freigaben (ID_Lehrer, Studienjahr, Freigabe) VALUES ('$ID_Lehrer', '$Studienjahr', '$Freigabe')";
			$db_erg = mysqli_query($db, $sqladd);
		}
		//Wenn schon angelegt, dann nichs machen
}

//wird aufgerufen, wenn Hackerl bei Freigaben gemacht wird
if (isset($_GET['update']))
{
		//Abragen ob der Datensatz schon angelegt ist
		$sql = "SELECT * FROM freigaben WHERE ID_Lehrer = $ID_Lehrer AND Studienjahr = '$Studienjahr'";
		$db_erg = mysqli_query($db, $sql);
		$ausgabearray = array();
		while( $zeile = mysqli_fetch_assoc( $db_erg )){
			$ausgabearray[] = $zeile;
		}
		//mysqli_free_result( $db_erg );
	
		//Gibt es noch keinen Eintrag für die Lehrer Id und das Studienjahr, dann neu anlegen mit den Datensatz
		//neu: sollte immer angelgt werden bei Planung Lehrer und Planung LV
		if($ausgabearray == null){
			/*	//echo "nicht angelegt";
			
			//Genau diesen Lehrer, der für den die Freigabe angehackerlt wurde, für dieses Studienjahr anlegen.
			$sql1 = "INSERT INTO freigaben (ID_Lehrer, Studienjahr, Freigabe) VALUES ('$ID_Lehrer', '$Studienjahr', '$Freigabe')";
			$db_erg = mysqli_query($db, $sql1);
			//mysqli_free_result( $db_erg );
			
			//alle Lehrer abfragen um sie, falls sie in freigaben-Tabelle noch nicht für das Studienjahr angelegt sind, anzulegen
			$sql = " Select lehrer.ID_Lehrer FROM lehrer";
			$db_erg = mysqli_query($db, $sql);
			$allearray = array();

			//alle Lehrer mit der ID_Lehrer in ein Aray, damit sie in Tabelle freigaben neu angelgt werden können, falls nocht nicht geschehen
			while( $zeile = mysqli_fetch_assoc( $db_erg )){
				$allearray[] = $zeile;
			}
			mysqli_free_result( $db_erg );
			//echo(sizeOf($ausgabearray ));
			
			//Alle Lehrer für diese Sudienjahr anlegen, damit bei der Abfrageam Ende des Skripts alle Lehrer für dieses  Studienjahr ausgegeben werden können
			for( $i = 0; $i < sizeOf($allearray ); $i++){
				//print_r($ausgabearray[$i]["ID_Lehrer"]);
				$IDL = $allearray[$i]["ID_Lehrer"];
				
				//Abfragen ob der Eintrag schon Existiert, mindestens en Eintrag müsste sein, da oben gerade ausgeführt wurde
				$sql = "SELECT * FROM freigaben WHERE ID_Lehrer = '$IDL' AND Studienjahr = '$Studienjahr'";
				$db_erg = mysqli_query($db, $sql);
				
				$singlerarray = array();
				while( $zeile = mysqli_fetch_assoc( $db_erg )){
					$singlerarray[] = $zeile;
				}
				//mysqli_free_result( $db_erg );
				//print_r($singlearray);
				//falls noch nicht angelegt in freigaben, jetzt neu anlegen mit Freigabe=0 vorbelegt, außer Lehrer mit ID=1 den nicht anlegen
				// || $IDL != 1
				if($singlerarray == null ){
					if($IDL != 1){
					$sql1 = "INSERT INTO freigaben (ID_Lehrer, Studienjahr, Freigabe) VALUES ('$IDL', '$Studienjahr', '0')";
					$db_erg = mysqli_query($db, $sql1);
					}
				}
				
			}
		*/	
		}
		
		//Falls es schon einen Eintrag gibt, dann nur mehr die Freigabe ändern
		else{
			//echo "da";
			$sql2 = "UPDATE freigaben SET Freigabe = '$Freigabe' WHERE ID_Lehrer = '$ID_Lehrer' AND Studienjahr = '$Studienjahr'";
			$db_erg = mysqli_query($db, $sql2);
			
			/*
			//alle Lehrer abfragen um sie, falls sie in freigaben-Tabelle noch nicht für das Studienjahr angelegt sind, anzulegen
			$sql = " Select lehrer.ID_Lehrer FROM lehrer";
			$db_erg = mysqli_query($db, $sql);
			$allearray = array();

			//alle Lehrer mit der ID_Lehrer in ein Aray, damit sie in Tabelle freigaben neu angelgt werden können, falls nocht nicht geschehen
			while( $zeile = mysqli_fetch_assoc( $db_erg )){
				$allearray[] = $zeile;
			}
			mysqli_free_result( $db_erg );
			//echo(sizeOf($ausgabearray ));
			
			//Alle Lehrer für diese Sudienjahr anlegen, damit bei der Abfrageam Ende des Skripts alle Lehrer für dieses  Studienjahr ausgegeben werden können
			for( $i = 0; $i < sizeOf($allearray ); $i++){
				//print_r($ausgabearray[$i]["ID_Lehrer"]);
				$IDL = $allearray[$i]["ID_Lehrer"];
				
				//Abfragen ob der Eintrag schon Existiert, mindestens en Eintrag müsste sein, da oben gerade ausgeführt wurde
				$sql = "SELECT * FROM freigaben WHERE ID_Lehrer = '$IDL' AND Studienjahr = '$Studienjahr'";
				$db_erg = mysqli_query($db, $sql);
				
				$singlerarray = array();
				while( $zeile = mysqli_fetch_assoc( $db_erg )){
					$singlerarray[] = $zeile;
				}
				//mysqli_free_result( $db_erg );
				//print_r($singlearray);
				//falls noch nicht angelegt in freigaben, jetzt neu anlegen mit Freigabe=0 vorbelegt, außer Lehrer mit ID=1 den nicht anlegen
				// || $IDL != 1
				if($singlerarray == null ){
					if($IDL != 1){
					$sql1 = "INSERT INTO freigaben (ID_Lehrer, Studienjahr, Freigabe) VALUES ('$IDL', '$Studienjahr', '0')";
					$db_erg = mysqli_query($db, $sql1);
					}
				}
				
			}
			*/
			
			
		}//else
		//mysqli_free_result( $db_erg );
		
		  

}//if update

//wird aufgerufen, wenn ein Lehrer gelöscht wird
if (isset($_GET['delete']))
{
	$sql = "DELETE FROM freigaben WHERE ID_Lehrer = $ID_Lehrer";
	$db_erg = mysqli_query($db, $sql);
}

//Am Ende alle Lehrer für das Sudienjahr ausgeben, mit Freigaben und Jahr, gibt auch die Liste aus, falls keine Parameter übergeben werden
 $sql = "SELECT lehrer.ID_Lehrer, lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis, 
				freigaben.Freigabe, freigaben.Studienjahr
				
				FROM lehrer, freigaben
				
				WHERE lehrer.ID_Lehrer = freigaben.ID_Lehrer
				
				AND freigaben.Studienjahr = '$Studienjahr'	
				
				";	

      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray);
mysqli_close($db);
//
