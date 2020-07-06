<?php
include ('dbconnection.php');
//$hostname = "localhost";
//$username = "root";
//$password = "";
//$database = "iab";

$tabelle="";
$dateiname="";
$flag=false;

if(isset($_GET['tabelle']) & isset($_GET['dateiname'])){
   if($_GET['tabelle'] != ""){
       $tabelle=$_GET['tabelle'];
   }
   if($_GET['dateiname'] != ""){
       $dateiname=$_GET['dateiname'];
       $flag=true;//db Zugriff nur ausführen, wenn Dateiname angegeben wird.
   } 
}

$filename = "uploads/".$dateiname;

$file = fopen($filename,"r");
//die erste zeile auslesen und in das Array $header einlesen
$header = fgetcsv($file,1000,';');

$nspalten = count($header);

$data = array();
$j=0;
while (!feof($file))
{
	// bei jedem Aufruf von fgetcsv wird eine neue Zeile aus der csv Datei gelesen
	//die 1. Zeile mit den Überschriften fehlt schon, da vorher schon einmal fgetcsv aufgerufen wurde
	$row = fgetcsv($file,1000, ";");
	for($i=0; $i < $nspalten; $i++)
	{
		//gemischt assoziatives array anlegen. der Key wird vom Headerarray eingelesn
		$data[$j][$header[$i]] = $row[$i]; 
	}
	$j++;
}
array_pop($data);// es wird eine zeile zuviel dem Array hinzugefügt, deswegen mit pop letzte es Arrayelement löschen

fclose($file);


$db = new mysqli($hostname, $username, $password, $database);
mysqli_set_charset($db, "utf8");

// das flag damit nur der Datenbankzugriff ausgeführt wird, falls ein Dateiname angegeben wurde.
if($flag){
    for($i=0; $i < count($data); $i++){
		
		//alle Variablen vorerst mit Lerzeichen belegen, falls ein leere Eintrag in der csv Datei ist. wird dann eh überschrieben.
		$st_sem="";
		$St_R="";
		$Studium="";
		$Kategorie="";
		$LV_KZZ="";
		$Modultitel="";
		$Sem="";
		$LVA_Titel="";
		$LV_Art="";
		$TN="";
		$WST="";
		$Anmerkungen="";
		$WST_Lehrer="";
		$Wertigkeit="";
		$Werteinheiten="";
		
		$st_sem = $data[$i]['st_sem'];
		$St_R = $data[$i]['St_R'];
		$Studium= $data[$i]['Studium'];
        $Kategorie= $data[$i]['Kategorie'];
        $LV_KZZ = $data[$i]['LV_KZZ'];
		$Modultitel = $data[$i]['Modultitel'];
		$Sem = $data[$i]['Sem'];
		$LVA_Titel= $data[$i]['LVA_Titel'];
        $LV_Art= $data[$i]['LV_Art'];
        $TN = $data[$i]['TN'];
		$WST = $data[$i]['WST'];
		$Anmerkungen= $data[$i]['Anmerkungen'];
        $WST_Lehrer= $data[$i]['WST_Lehrer'];
        $Wertigkeit = $data[$i]['Wertigkeit'];
		$Werteinheiten = $data[$i]['Werteinheiten'];       
		
		echo($st_sem." ".$St_R." ".$Studium." ".$Kategorie." ".$LV_KZZ." ".$Modultitel." ".$Sem." ".$LVA_Titel." ".$LV_Art." ".$TN." ".$WST." ".$Anmerkungen." ".$WST_Lehrer." ".$Wertigkeit." ".$Werteinheiten."<br>");
		

        //$sql = "INSERT INTO lv (st_sem, St_R, Studium, Kategorie, LV_KZZ, Modultitel, Sem, LVA_Titel, LV_Art, TN, WST, Anmerkungen, WST_Lehrer, Wertigkeit, Werteinheiten) VALUES ('$st_sem', '$St_R', '$Studium', '$Kategorie', '$LV_KZZ', '$Modultitel', '$Sem', '$LVA_Titel', '$LV_Art', '$TN', '$WST', '$Anmerkungen', '$WST_Lehrer', '$Wertigkeit', '$Werteinheiten')";
		$sql = "INSERT INTO `lv`(`st_sem`, `St_R`, `Studium`, `Kategorie`, `LV_KZZ`, `Modultitel`, `Sem`, `LVA_Titel`, `LA_Art`, `TN`, `WST`, `Anmerkungen`, `WST_Lehrer`, `Wertigkeit`, `Werteinheiten`) VALUES ('$st_sem', '$St_R', '$Studium', '$Kategorie', '$LV_KZZ', '$Modultitel', '$Sem', '$LVA_Titel', '$LV_Art', '$TN', '$WST', '$Anmerkungen', '$WST_Lehrer', '$Wertigkeit', '$Werteinheiten')";
        $query = mysqli_query($db, $sql);

    }//for $data
}//if flag
mysqli_close($db);
?>