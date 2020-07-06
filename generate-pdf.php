<?php
/*
//alternierende Zeilen
$theHtml = '<table cellspacing="0" cellpadding="0">';

for($i=0; $i<sizeof($data); $i++)
{
    $theHtml .= '<tr';

    if($i % 2 == 0)
    {
        $theHtml .= ' style="background-color:green;"';
    }

    $theHtml .= '>
                <td>
                    '.$data[$i].'
                </td>

                <td>
                    Something else for '.$data[$i].'
                </td>
             </tr>';
}

$theHtml .= '</table>';


*/
/*
<style>
table {
font-family: arial, sans-serif;
border-collapse: collapse;
width: 100%;
}

tr:nth-child(even) {
background-color: #dddddd;
}

td,
th {
border: 1px solid #dddddd;
text-align: left;
padding: 8px;
}

thead {
background-color: #222222;
color: #ffffff;
}

</style>


*/

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



$html = <<<EOD
<h1>Welcome to <a href="http://www.tcpdf.org" style="text-decoration:none;background-color:#CC0000;color:black;">&nbsp;<span style="color:black;">TC</span><span style="color:white;">PDF</span>&nbsp;</a>!</h1>
<i>This is the first example of TCPDF library.</i>
<p>This text is printed using the <i>writeHTMLCell()</i> method but you can also use: <i>Multicell(), writeHTML(), Write(), Cell() and Text()</i>.</p>
<p>Please check the source code documentation and other examples for further information.</p>
<p style="color:#CC0000;">TO IMPROVE AND EXPAND TCPDF I NEED YOUR SUPPORT, PLEASE <a href="http://sourceforge.net/donate/index.php?group_id=128076">MAKE A DONATION!</a></p>
EOD;


$html = '<p>Beschäftigungsliste '.$Studienjahr.'</p>
<table style = "border-collapse: collapse; width: 100%;">
<thead >
<tr style="background-color: #222222; color: #ffffff;">
	<th>Bundesland</th><th>Hauptstadt</th><th>Einwohner</th>
</tr>
</thead>

<tbody>
<tr>
<td>Oberösterreich</td>
<td>Linz</td>
<td>1.482.300</td>
</tr>
<tr>

<td>Salzburg</td>
<td>Salzburg</td>
<td>555.298</td>
</tr>

<tr>
<td>Tirol</td>
<td>Innsbruck</td>
<td>754.821</td>
</tr>

<tr>
<td>Vorarlberg</td>
<td>Bregenz</td>
<td>394.224</td>
</tr>

</tbody>
</table>
';



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
$PDF_HEADER_TITLE = "Beschäftigungsliste ".$Studienjahr;

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
$pdf->SetFont('dejavusans', '', 10);//, '', true);
// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();

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

