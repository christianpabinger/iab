<?php
if (isset($_GET['send']))
{
	if(isset($_GET['ID_Lehrer']))
	{
			$ID_Lehrer = $_GET['ID_Lehrer'];
	}
	if (isset($_GET['Dateiname']) )
	{
		$Dateiname = $_GET['Dateiname'];
	}
	
}
echo $Dateiname;


//Mailadresse für ID_Lehrer aus Datenbank einlesen
include ('dbconnection.php');
$db = new mysqli($hostname, $username, $password, $database);
mysqli_set_charset($db, "utf8");
$sql = "SELECT Mailadresse, Vorname, Nachname FROM lehrer WHERE ID_Lehrer = $ID_Lehrer";
		$db_erg = mysqli_query($db, $sql);
		$ausgabearray = array();
		while( $zeile = mysqli_fetch_assoc( $db_erg )){
			$ausgabearray[] = $zeile;
		}

$Mailadresse = $ausgabearray[0]["Mailadresse"];
$Name =  $ausgabearray[0]["Vorname"]." ".$ausgabearray[0]["Nachname"];
//echo $Name;
mysqli_free_result( $db_erg );
mysqli_close($db);

$Maileinstellungen = file_get_contents("maileinstellungen.txt");

$MailArray = json_decode($Maileinstellungen, true);//true damit es ein Assoziatives Array wird

$Account = $MailArray["Account"];
$Passwort = $MailArray["Passwort"];
$Absender = $MailArray["Absender"];
$Betreff = $MailArray["Betreff"];
$Mailtext = $MailArray["Mailtext"];

//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

//require 'phpmailer/src/autoload.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/OAuth.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
$mail->CharSet ="UTF-8";
$mail->addCC("pat7@gmx.at"); 
//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// SMTP::DEBUG_OFF = off (for production use)
// SMTP::DEBUG_CLIENT = client messages
// SMTP::DEBUG_SERVER = client and server messages
$mail->SMTPDebug = SMTP::DEBUG_SERVER;

//Set the hostname of the mail server
$mail->Host = 'smtp.live.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;

//Set the encryption mechanism to use - STARTTLS or SMTPS
//$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail -> SMTPSecure = 'tls';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = $Account;//'andreas.kiener@ph-linz.at';

//Password to use for SMTP authentication
$mail->Password = $Passwort;//'Tap55Tap#';

//Set who the message is to be sent from
$mail->setFrom($Account, $Absender);

//Set an alternative reply-to address
//$mail->addReplyTo('andreas.kiener1@gmail.com', 'First Last');

//Set who the message is to be sent to
$mail->addAddress($Mailadresse, $Name);

//Set the subject line
$mail->Subject = $Betreff;//'PHPMailer GMail SMTP test';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML(file_get_contents('contents.html'), __DIR__);
//$msg="<strong>This is a bold text.</strong>"; // HTML message
$mail->Body = $Mailtext;//$msg;
//Replace the plain text body with one created manually
//$mail->AltBody = 'This is a plain-text message body';

//Attach an image file
$dateipfad = 'listen/'.$Dateiname;
$mail->addAttachment($dateipfad);


//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: '. $mail->ErrorInfo;
} else {
    echo 'Message sent!';
    //Section 2: IMAP
    //Uncomment these to save your message in the 'Sent Mail' folder.
    #if (save_mail($mail)) {
    #    echo "Message saved!";
    #}
}

//Section 2: IMAP
//IMAP commands requires the PHP IMAP Extension, found at: https://php.net/manual/en/imap.setup.php
//Function to call which uses the PHP imap_*() functions to save messages: https://php.net/manual/en/book.imap.php
//You can use imap_getmailboxes($imapStream, '/imap/ssl', '*' ) to get a list of available folders or labels, this can
//be useful if you are trying to get this working on a non-Gmail IMAP server.
function save_mail($mail)
{
    //You can change 'Sent Mail' to any other folder or tag
    $path = '{imap.gmail.com:993/imap/ssl}[Gmail]/Sent Mail';

    //Tell your server to open an IMAP connection using the same username and password as you used for SMTP
    $imapStream = imap_open($path, $mail->Username, $mail->Password);

    $result = imap_append($imapStream, $path, $mail->getSentMIMEMessage());
    imap_close($imapStream);

    return $result;
}

