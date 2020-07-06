<?php


if (isset($_GET['getPlanungsjahr']))
{
	$Planungsjahr = file_get_contents("einstellungen.txt");
	//echo $Planungsjahr;
	echo json_encode($Planungsjahr );
}

if (isset($_GET['setPlanungsjahr']))
{
	$setPlanungsjahr = $_GET['setPlanungsjahr'];
	
	$datei = fopen ("einstellungen.txt", "w");
    fwrite ($datei, $setPlanungsjahr );
    fclose ($datei);
	
}



