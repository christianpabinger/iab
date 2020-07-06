<?php
include ('dbconnection.php');
$db = new mysqli($hostname, $username, $password, $database);
mysqli_set_charset($db, "utf8");


	if(isset($_GET['ID_Lehrer'])){
		$ID_Lehrer = $_GET['ID_Lehrer'];   
	}
	if(isset($_GET['Studienjahr'])){
		$Studienjahr = $_GET['Studienjahr'];
	}
	if(isset($_GET['Dateiname'])){
		$Dateiname = $_GET['Dateiname'];
	}
	if(isset($_GET['wert'])){
		$Wertgesamt = $_GET['wert'];
	}
	if(isset($_GET['wertws'])){
		$Wertws = $_GET['wertws'];
	}
	if(isset($_GET['wertss'])){
		$Wertss = $_GET['wertss'];
	}

	$pdfName = $Dateiname;

	//Abfrage um gesamte Werteinheiten zu berechnen WS und SS
	$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem, lv.WST, lv.Sem,
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
	  //print_r($ausgabearray);
      //mysqli_free_result( $db_erg );


	$wertges=0;
	for($i=0; $i<sizeof($ausgabearray); $i++)
	{
		$wertges += $ausgabearray[$i]["Werteinheiten"];
	}



$theHtml = '<table cellpadding="6" cellspacing="1"><tr style="background-color: #9AC11D;">
<td>Vorname</td>
<td>Nachname</td>
<td>Titel</td>
<td>Kurzzeichen</td>
<td>Stamminstitut</td>
<td>Dienstverhältnis</td>
<td>Studienjahr</td>
<td>Werteinheiten</td>

</tr></table>';

$theHtml .= '<table cellpadding="6" cellspacing="1"><tr style="background-color: lightgray">
<td>'.$ausgabearray[0]["Vorname"].'</td>
<td>'.$ausgabearray[0]["Nachname"].'</td>
<td>Titel</td>
<td>'.$ausgabearray[0]["Kurzzeichen"].'</td>
<td>'.$ausgabearray[0]["Stamminstitut"].'</td>
<td>'.$ausgabearray[0]["Dienstverhaeltnis"].'</td>
<td>'.$Studienjahr.'</td>
<td>'.$wertges.'</td>

</tr></table>';

$theHtml .= '<p></p>';
	
//Abfrage WS
	$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem, lv.WST, lv.Sem,
				lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis 
				FROM planung, lv, lehrer 
				WHERE planung.ID_LV =lv.ID_LV 
				AND planung.ID_Lehrer = '$ID_Lehrer' 
				AND planung.ID_Lehrer = lehrer.ID_Lehrer
				AND (planung.Studienjahr = '$Studienjahr')
				AND planung.Semester = 'WS'";//'$Semester' ";

      $db_erg = mysqli_query( $db, $sql );
      $ausgabearray = array();

 
      while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
	  //print_r($ausgabearray);
      //mysqli_free_result( $db_erg );


$wertws=0;
for($i=0; $i<sizeof($ausgabearray); $i++)
{
	$wertws += $ausgabearray[$i]["Werteinheiten"];
}


$theHtml .= '<table cellpadding="6" cellspacing="1"><tr style="background-color: #9AC11D;"><td width="90%">Wintersemester '.$Studienjahr.'</td><td align="right" width="10%">WST    '.$wertws.'</td></tr></table>';

$theHtml .= '<table cellpadding="6" cellspacing="1" >
<thead >
<tr style="background-color: #222222; color: #ffffff;  ">
	<th width="10%">Modul</th><th width="12%">Kurzzeichen</th><th width="35%">LVA-Titel</th><th width="5%">Art</th><th width="5%">Sem</th><th width="8%">Gruppe</th><th width="20%">Anmerkung</th><th width="5%">WST</th>
</tr>
</thead> <tbody>';

for($i=0; $i<sizeof($ausgabearray); $i++)
{
    $theHtml .= '<tr';

    if($i % 2 == 1)
    {
        $theHtml .= ' style="background-color:grey;"';
    }
	else{
		$theHtml .= ' style="background-color:lightgrey;"';
	}

    $theHtml .= '>
                <td width="10%">
                    '.$ausgabearray[$i]["Modultitel"].'
                </td>
				<td width="12%">
                    '.$ausgabearray[$i]["LV_KZZ"].'
                </td>
                <td  width="35%">
                    '.$ausgabearray[$i]["LVA_Titel"].'
                </td>
				<td width="5%">
                    '.$ausgabearray[$i]["LA_Art"].'
                </td>
				<td width="5%">
                    '.$ausgabearray[$i]["Sem"].'
                </td>
				<td width="8%">
                    '.$ausgabearray[$i]["Gruppen"].'
                </td>
				<td width="20%">
                    '.$ausgabearray[$i]["Anmerkungen"].'
                </td>
				<td width="5%">
                    '.$ausgabearray[$i]["Werteinheiten"].'
                </td>
             </tr>';
}

$theHtml .= '</tbody></table>';



// WS auslesen
	$sql = "SELECT planung.ID_Planung, planung.ID_LV, planung.ID_Lehrer, planung.Semester, planung.Studienjahr,
				planung.Gruppen, planung.Anmerkungen, planung.Werteinheiten,
				lv.LV_KZZ,  lv.LVA_Titel,  lv.Modultitel, lv.LA_Art, lv.st_sem, lv.WST, lv.Sem,
				lehrer.Vorname, lehrer.Nachname, lehrer.Kurzzeichen, lehrer.Stamminstitut, lehrer.Dienstverhaeltnis 
				FROM planung, lv, lehrer 
				WHERE planung.ID_LV =lv.ID_LV 
				AND planung.ID_Lehrer = '$ID_Lehrer' 
				AND planung.ID_Lehrer = lehrer.ID_Lehrer
				AND (planung.Studienjahr = '$Studienjahr')
				AND planung.Semester = 'SS'";

      $db_erg = mysqli_query( $db, $sql );
      
	  $ausgabearray = array(); //leeren
	  while( $zeile = mysqli_fetch_assoc( $db_erg )){
        $ausgabearray[] = $zeile;
      }
	  //print_r($ausgabearray);
      //mysqli_free_result( $db_erg );


$wertss=0;
for($i=0; $i<sizeof($ausgabearray); $i++)
{
	$wertss += $ausgabearray[$i]["Werteinheiten"];
}

$theHtml .= '<p></p>';

$theHtml .= '<table cellpadding="6" cellspacing="1"><tr style="background-color: #9AC11D;"><td width="90%">Sommersemester '.$Studienjahr.'</td><td align="right" width="10%">WST    '.$wertss.'</td></tr></table>';

$theHtml .= '<table cellpadding="6" cellspacing="1" >
<thead >
<tr style="background-color: #222222; color: #ffffff;  ">
	<th width="10%">Modul</th><th width="12%">Kurzzeichen</th><th width="35%">LVA-Titel</th><th width="5%">Art</th><th width="5%">Sem</th><th width="8%">Gruppe</th><th width="20%">Anmerkung</th><th width="5%">WST</th>
</tr>
</thead> <tbody>';

for($i=0; $i<sizeof($ausgabearray); $i++)
{
    $theHtml .= '<tr';

    if($i % 2 == 1)
    {
        $theHtml .= ' style="background-color:grey;"';
    }
	else{
		$theHtml .= ' style="background-color:lightgrey;"';
	}

    $theHtml .= '>
                <td width="10%">
                    '.$ausgabearray[$i]["Modultitel"].'
                </td>
				<td width="12%">
                    '.$ausgabearray[$i]["LV_KZZ"].'
                </td>
                <td  width="35%">
                    '.$ausgabearray[$i]["LVA_Titel"].'
                </td>
				<td width="5%">
                    '.$ausgabearray[$i]["LA_Art"].'
                </td>
				<td width="5%">
                    '.$ausgabearray[$i]["Sem"].'
                </td>
				<td width="8%">
                    '.$ausgabearray[$i]["Gruppen"].'
                </td>
				<td width="20%">
                    '.$ausgabearray[$i]["Anmerkungen"].'
                </td>
				<td width="5%">
                    '.$ausgabearray[$i]["Werteinheiten"].'
                </td>
             </tr>';
}

$theHtml .= '</tbody></table>';



$html = $theHtml;

$timestamp = time();
$datum = date("d.m.Y - H:i", $timestamp);

//Den Master Brunch von github downloaden
require_once('tcpdf/tcpdf.php');
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Institut Ausbildung');
$pdf->SetTitle('Bechäftigungsliste');
$pdf->SetSubject('Beschäftigungsliste');

// set default header data
$PDF_HEADER_LOGO = "phdl_logo.svg";
$PDF_HEADER_LOGO_WIDTH = "60";
$PDF_HEADER_TITLE = "Institut Ausbildung - Beschäftigungsliste  -  ".$datum;

$pdf->SetHeaderData($PDF_HEADER_LOGO, $PDF_HEADER_LOGO_WIDTH, $PDF_HEADER_TITLE);//, PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
//$pdf->setFooterData(array(0,64,0), array(0,64,128));

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

/*
// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}
*/
// ---------------------------------------------------------

// set default font subsetting mode
$pdf->setFontSubsetting(true);

// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
//$pdf->SetFont('dejavusans', '', 14, '', true);
$pdf->SetFont('dejavusans', '', 9);//, '', true);
//$pdf->SetFont('times', '', 10);//, '', true);
// Add a page
// This method has several options, check the source code documentation for more information.
//pdf->AddPage();//original
$pdf->AddPage('L', 'A4');


// set text shadow effect
//$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

// Set some content to print


// Print text using writeHTMLCell()
//$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);


$pdf->writeHTML($html, true, false, true, false, '');
// ---------------------------------------------------------

// Close and output PDF document
// This method has several options, check the source code documentation for more information.
//$pdf->Output('example_001.pdf', 'I');

//PDF im Verzeichnis abspeichern:
$pdf->Output(dirname(__FILE__).'/listen/'.$pdfName, 'F');
//echo 'PDF herunterladen: <a href="'.$pdfName.'">'.$pdfName.'</a>';
