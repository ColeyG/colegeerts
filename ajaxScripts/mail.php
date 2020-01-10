<?php

require_once '../core-conf.php';

$name = $_GET["name"];
$email = $_GET["email"];
$message = $_GET["message"];

$subject = $email ." - Message from your DotCom.";
$body = $name . " at " . $email . " says: " . $message . " IP: " . $_SERVER['REMOTE_ADDR'];

//TODO: add actual validation here
if ($name !== "" && $email !== "" && $message !== "") {
    if(mail($to, $subject, $body)){
        echo "success";
    } else {
        echo "failed";
    }
} else {
    echo "failed";
}

