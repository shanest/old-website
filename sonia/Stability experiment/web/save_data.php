<?php
$txt = $_POST["json"];
$filename="/var/www/illc/research/cosaqexperiments/data/exp1/".uniqid("fanjingshan_session1_").".json";
file_put_contents($filename, $txt);
chmod($filename, 0666)
?>
