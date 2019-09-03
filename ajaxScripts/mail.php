<?php

require_once '../core-conf.php';

$name = $_GET["name"];
$email = $_GET["email"];
$message = $_GET["message"];

$subject = $email ." - Message from your DotCom.";
$body = $name . " at " . $email . " says: " . $message;

//echo($to . " " . $name . " " . $email . " " . $message);

if ($name !== "" && $email !== "" && $message !== "") {
    if(mail($to, $subject, $body)){
        echo "success";
    } else {
        echo "failed";
    }
} else {
    echo "failed";
}

