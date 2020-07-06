<?php


if (isset($_GET['get']))
{
	
	$Maileinstellungen = file_get_contents("maileinstellungen.txt");
	echo "[".$Maileinstellungen."]";
	//echo json_encode($Maileinstellungen );
	
}

if (isset($_GET['save']))
{
	$mailarray = (Object)array();
	
	if(isset($_GET['Account']))
	{
		$Account = $_GET['Account'];
		$mailarray->Account = $Account;
	}
	if(isset($_GET['Passwort']))
	{
		$Passwort = $_GET['Passwort'];
		$mailarray->Passwort = $Passwort;
	}
	if(isset($_GET['Absender']))
	{
		$Absender = $_GET['Absender'];
		$mailarray->Absender = $Absender;
	}
	if(isset($_GET['Betreff']))
	{
		$Betreff = $_GET['Betreff'];
		$mailarray->Betreff = $Betreff;
	}
	if(isset($_GET['Mailtext']))
	{
		$Mailtext = $_GET['Mailtext'];
		$mailarray->Mailtext = $Mailtext;
	}
	
	
	print_r($mailarray);
	
	$mailJSON = json_encode($mailarray);
	//print_r($mailJSON);
		
	$datei = fopen ("maileinstellungen.txt", "w");
    fwrite ($datei, $mailJSON );
    fclose ($datei);
	
}

