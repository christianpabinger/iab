<?php
echo "<style>
body {
font-family: sans-serif;
font-size: 1.1em;
}
</style>";

$error ="";
if ( isset($_POST['benutzername']) and $_POST['benutzername'] != ""
and isset($_POST['kennwort']) and $_POST['kennwort'] != "" )
{
// Kontrolle, ob Benutzername und Kennwort korrekt
if($_POST['benutzername'] == "admin" && $_POST['kennwort'] == "admin")
{
$html = file_get_contents('index.html');
echo $html;
}
else{
$error = "<p>Ungültige Eingabe</p>";
}
}
else{
echo "<head><style>
body{ font-family: sans-serif;}
h2, form {text-align: center; }
h2 {padding-top: 100px}
</style></head>";
// Einloggformular anzeigen
echo "<p></p><p></p>";
echo "<h2>Anmeldung</h2>";
echo '<form action="login.php" method="POST">';
echo '<p>Benutzername:<br>';
echo '<input type="text" name="benutzername" value="">';
echo '<p>Kennwort:<br>';
echo '<input type="password" name="kennwort" value="">';
echo '<p><input type="Submit" value="einloggen">';
if($error != ""){
echo $error;
}
echo '</form>';
}
?>
