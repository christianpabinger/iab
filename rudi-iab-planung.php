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

if (isset ($_GET['ask']))
{
	if(isset($_GET['ID_LV'])){
			$idlv = $_GET['ID_LV'];  
	}
	
	$sql = "SELECT planung.ID_LV, planung.ID_Lehrer,
			lv.LV_KZZ,  lv.LVA_Titel, lv.st_sem, lv.Werteinheiten, 
			lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis 
			FROM planung, lv, lehrer 
			WHERE (planung.ID_LV =lv.ID_LV) AND (planung.ID_Lehrer = lehrer.ID_Lehrer) AND ( planung.ID_LV = '$idlv')";

      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray);
	
}
else if (isset($GET['delete'])){
    // DELETE COMMAND
           
            $id_Planung = $GET['ID_Planung'];
            
            $sql = "DELETE FROM planung WHERE ID_PLANUNG='$ID_Planung'";
            $query = mysqli_query($db, $sql);
      
            
            $sql = "SELECT ID_LV FROM planung WHERE ID_Planung = '$ID_Planung' ";
            $db_erg = mysqli_query( $db, $sql );
            echo $db_erg;
            
            $sql = "SELECT planung.ID_LV, planung.ID_Lehrer, planung.ID_Planung, planung.Wertigkeit, planung.Werteinheiten,
					lv.LV_KZZ,  lv.LVA_Titel, lv.st_sem, lv.WST, 
					lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis  
					FROM planung, lv, lehrer 
					WHERE planung.ID_LV =  lv.ID_LV 
					AND  planung.ID_Lehrer = lehrer.ID_Lehrer
					AND planung.ID_LV = '$ID_LV'
					";
            
            /*            
            $db_erg = mysqli_query( $db, $sql );
            $ausgabearray = array();

            while( $zeile = mysqli_fetch_assoc( $db_erg )){
                 $ausgabearray[] = $zeile;
            }
            mysqli_free_result( $db_erg );
            echo json_encode($ausgabearray)
            */
}
//add new row
else if (isset($_GET['insert']))
{
	// INSERT COMMAND
	// F�gt nur eine leere Zeile ein mi den Daten der LV, welche erst durch upate bef�llt wird
        $ID_Lehrer=1;
	$Gruppen="";
        $Anmerkungen="";
		$Wertigkeit = 1;
		$Werteinheiten = 0;
	if(isset($_GET['ID_LV'])){
		$ID_LV = $_GET['ID_LV'];  
	}
        if(isset($_GET['Studienjahr'])){
		$Studienjahr = $_GET['Studienjahr'];  
	}
	if(isset($_GET['Gruppen'])){
		$Gruppen = $_GET['Gruppen'];  
	}
        if(isset($_GET['Anmerkungen'])){
		$Anmerkungen = $_GET['Anmerkungen'];  
	}
    if(isset($_GET['Studienjahr'])){
            $Studienjahr = $_GET['Studienjahr'];  
	}
    if(isset($_GET['Semester'])){
            $Semester = $_GET['Semester'];  
	}
	if(isset($_GET['Wertigkeit'])){
            $Wertigkeit = $_GET['Wertigkeit'];  
	}
	if(isset($_GET['Werteinheiten'])){
            $Werteinheiten = $_GET['Werteinheiten'];  
	}
     
    $sql = "INSERT INTO `planung` (`ID_Planung`, `Studienjahr`, `ID_LV`, `ID_lehrer`, `Gruppen`, `Anmerkungen`, `Semester`, `Wertigkeit`, `Werteinheiten` ) VALUES (NULL, '$Studienjahr', '$ID_LV','$ID_Lehrer', '$Gruppen', '$Anmerkungen', '$Semester', '$Wertigkeit', '$Werteinheiten')";
	
    $query = mysqli_query($db, $sql);
	//echo "insert";
   	//$sql = "SELECT planung.ID_LV, planung.ID_Lehrer, lv.LV_KZZ,   lv.LVA_Titel, lv.Werteinheiten, lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen FROM planung, lv, lehrer WHERE (planung.ID_LV =lv.ID_LV) AND (planung.ID_Lehrer = lehrer.ID_Lehrer)";
	$sql = "SELECT planung.ID_LV, planung.ID_Lehrer, planung.ID_Planung, planung.Studienjahr, planung.Semester, planung.Wertigkeit, planung.Werteinheiten,
                    planung.Gruppen, planung.Anmerkungen,
					lv.LV_KZZ,  lv.LVA_Titel, lv.st_sem, lv.WST,  
					lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis  
					FROM planung, lv, lehrer 
					WHERE planung.ID_LV =  lv.ID_LV 
					AND  planung.ID_Lehrer = lehrer.ID_Lehrer
					AND planung.ID_LV = '$ID_LV'
					AND planung.Studienjahr = '$Studienjahr'";
	
	/*
	OR (planung.ID_LV =lv.ID_LV 
					AND  planung.ID_Lehrer = '$ID_Null'  
					AND planung.ID_LV = lv.ID_LV  )
					
	$sql = " SELECT planung.ID_LV, planung.ID_Lehrer, 
					lv.LV_KZZ,  lv.LVA_Titel, lv.Werteinheiten, 
					lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen
			 FROM lv
			 JOIN planung ON planung.ID_LV = lv.ID_LV
			 JOIN lehrer ON planung.ID_Lehrer = lehrer.ID_Lehrer
			 WHERE (planung.ID_LV = '$ID_LV')";
	*/
      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray);
	  die();
}
else if (isset($_GET['select']))
{
	
        $Gruppen="";
        $Anmerkungen="";
        $Studienjahr = "";
        if(isset($_GET['ID_LV'])){
            $ID_LV = $_GET['ID_LV'];  
	}
        if(isset($_GET['Studienjahr'])){
            $Studienjahr = $_GET['Studienjahr'];  
	}
        $sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.ID_Planung, planung.Studienjahr,
                    planung.Gruppen, planung.Anmerkungen, planung.Semester, planung.Wertigkeit, planung.Werteinheiten,
					lv.LV_KZZ,  lv.LVA_Titel, lv.st_sem, lv.WST, 
					lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis  
					FROM planung, lv, lehrer 
					WHERE (planung.ID_LV =lv.ID_LV) 
					AND (planung.ID_Lehrer = lehrer.ID_Lehrer) 
					AND ( planung.ID_LV = '$ID_LV')
                    AND (planung.Studienjahr = '$Studienjahr')";
	
	/*
	$sql = " SELECT planung.ID_LV, planung.ID_Lehrer, 
					lv.LV_KZZ,  lv.LVA_Titel, lv.Werteinheiten, 
					lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen
			 FROM lv
			 JOIN planung ON planung.ID_LV = lv.ID_LV
			 JOIN lehrer ON planung.ID_Lehrer = lehrer.ID_Lehrer
			 WHERE (planung.ID_LV = '$ID_LV')";
	*/
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
		$Studienjahr ="";
		$ID_LV="";
		$ID_Lehrer="";
		$Gruppen="";
		$Anmerkungen="";
		$KZZ = "";
		$Semester = "";
		
		if(isset($_GET['ID_Planung'])){
			$ID_Planung = $_GET['ID_Planung'];  
		}
		
		if(isset($_GET['Studienjahr'])){
			$Studienjahr = $_GET['Studienjahr'];  
		}
		
		if(isset($_GET['ID_LV'])){
			$ID_LV = $_GET['ID_LV'];
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
        if(isset($_GET['Kurzzeichen'])){
			$KZZ = $_GET['Kurzzeichen'];
                       
		}
		if(isset($_GET['Semester'])){
			$Semester = $_GET['Semester'];
                       
		}
		
		//Wertigkeit wird übergeben, falls Teamteaching, dann kleinere Wertigkeit per Hand eingegeben
		if(isset($_GET['Wertigkeit'])){
			$Wertigkeit = $_GET['Wertigkeit'];
                       
		}
		
		//WST wird mitübergeben, notwendig damit die Werteinheiten berechnet werden können
		if(isset($_GET['WST'])){
			$WST = $_GET['WST'];
                       
		}
                //ID_Lehrer aus dem KZZ suchen da nur die ID und nict das KZZ in die Tabelle geschrieben wird
                $sql = "Select ID_Lehrer, Dienstverhaeltnis FROM lehrer WHERE Kurzzeichen = '$KZZ'";
                        $db_erg = mysqli_query($db, $sql);
                        $ausgabearray = array();
                        while( $zeile = mysqli_fetch_assoc( $db_erg )){
                            $ausgabearray[] = $zeile;
                        }
                        $ID_Lehrer = $ausgabearray[0]['ID_Lehrer'];
						//Diensverhältnis suchen, damit die Wertigkeit für mitverwendete Bundeslehrer bestimmt werden kann
                        $Dienstverhaeltnis = $ausgabearray[0]['Dienstverhaeltnis'];
						
						if ($Dienstverhaeltnis == "MVBL"){
							$Wertigkeit = 1.167;
						}
						
						
						$Werteinheiten = $WST * $Wertigkeit;
		
                //die ID_LV suchen zur entsprechenden Zeile damit nach dem update die Tabelle ausgegeben werden kann
                $sql = "SELECT ID_LV FROM planung WHERE ID_Planung = '$ID_Planung'";
                $db_erg = mysqli_query($db, $sql);
                $ausgabearray = array();
				
				while( $zeile = mysqli_fetch_assoc( $db_erg )){
					$ausgabearray[] = $zeile;
				}
				$idlv = $ausgabearray[0]['ID_LV'];
				//$WST = $ausgabearray[0]['WST'];
				
				
				
			
		// UPDATE COMMAND
		$sql = "UPDATE planung SET ID_Lehrer = '$ID_Lehrer', Studienjahr = '$Studienjahr', Semester = '$Semester' , Gruppen = '$Gruppen', Anmerkungen = '$Anmerkungen', Wertigkeit = '$Wertigkeit', Werteinheiten = '$Werteinheiten'  WHERE ID_Planung = '$ID_Planung'";
		$query = mysqli_query($db, $sql);
                
		//Ausgabe der geamten Tabelle für die entprechende LV
                $sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.ID_Planung, planung.Studienjahr, planung.Semester,
                    planung.Gruppen, planung.Anmerkungen, planung.Wertigkeit, planung.Werteinheiten,
					lv.LV_KZZ,  lv.LVA_Titel, lv.st_sem, lv.WST, 
					lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis  
					FROM planung, lv, lehrer 
					WHERE (planung.ID_LV =lv.ID_LV) 
					AND (planung.ID_Lehrer = lehrer.ID_Lehrer) 
					AND ( planung.ID_LV = '$idlv')
                    AND planung.Studienjahr = '$Studienjahr'";


		$db_erg = mysqli_query( $db, $sql );
		$ausgabearray = array();

		while( $zeile = mysqli_fetch_assoc( $db_erg )){
			$ausgabearray[] = $zeile;
		}
		mysqli_free_result( $db_erg );
		echo json_encode($ausgabearray);
}
// DELETE COMMAND
else if (isset($_GET['delete']))
{
			/*
            if(isset($_GET['ID_LV'])){
                $ID_LV = $_GET['ID_LV'];  
            }
			*/			
			if(isset($_GET['ID_Planung'])){
                $ID_Planung = $_GET['ID_Planung'];  
            }
            //print_r($ID_Planung);
            
            //die ID_LV abfragen zu der die ID_Planung gehört
            // um nach dem Löschen der Zeile die zur ID_LV zugehörigen Eintragungen auszugeben
            $sql = "SELECT ID_LV, Studienjahr FROM planung WHERE ID_Planung ='$ID_Planung'";
            
            $db_erg = mysqli_query( $db, $sql );
			//print_r($db_erg);
                $ausgabearray = array();
                
                while( $zeile = mysqli_fetch_assoc( $db_erg )){
                  $ausgabearray[] = $zeile;
                }
                mysqli_free_result( $db_erg );
                //print_r($ausgabearray);
                //echo json_encode($ausgabearray);
                $idlv =  $ausgabearray[0]['ID_LV'];
                $Studienjahr =  $ausgabearray[0]['Studienjahr'];
				//echo $idlv;
				//echo $Studienjahr;
				
                //jetzt löschen
                $sql = "DELETE FROM planung WHERE ID_Planung = '$ID_Planung'";
				$query = mysqli_query($db, $sql);
            
            
           
             //jetzt alle Tabelleneinträge zugehörig zur LV zurückgeben
                $sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.ID_Planung, planung.Studienjahr, planung.Semester,
                    planung.Gruppen, planung.Anmerkungen, planung.Wertigkeit, planung.Werteinheiten,
					lv.LV_KZZ,  lv.LVA_Titel, lv.st_sem, lv.WST, 
					lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis  
					FROM planung, lv, lehrer 
					WHERE (planung.ID_LV =lv.ID_LV) 
					AND (planung.ID_Lehrer = lehrer.ID_Lehrer) 
					AND ( planung.ID_LV = '$idlv')
                    AND planung.Studienjahr = '$Studienjahr'";

                $db_erg = mysqli_query( $db, $sql );
                $ausgabearray = array();

                while( $zeile = mysqli_fetch_assoc( $db_erg )){
                  $ausgabearray[] = $zeile;
                }
                mysqli_free_result( $db_erg );
                echo json_encode($ausgabearray); 

}
else if (isset($_GET['getlehrerid']))
{
	    $kzz = $_GET['Kurzzeichen'];
            $sql = "SELECT ID_Lehrer FROM lehrer WHERE Kurzzeichen='$kzz'";

                  $db_erg = mysqli_query( $db, $sql );
              $ausgabearray = array();

              while( $zeile = mysqli_fetch_assoc( $db_erg )){
                $ausgabearray[] = $zeile;
              }
              mysqli_free_result( $db_erg );
              echo json_encode($ausgabearray); 
              die();
	}
else 
{
	  $ausgabearray = array();
	  echo json_encode($ausgabearray);
      /*
	  //wird ausgegeben by default wenn kein Befehl mitgegeben wird
	  $sql = "SELECT planung.ID_LV, planung.ID_Lehrer, lv.LV_KZZ,   lv.LVA_Titel, lv.Werteinheiten, lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen FROM planung, lv, lehrer WHERE (planung.ID_LV =lv.ID_LV) AND (planung.ID_Lehrer = lehrer.ID_Lehrer)";

      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
      mysqli_free_result( $db_erg );
      echo json_encode($ausgabearray);
	  */
	  
}//else
   
mysqli_close($db);
//
