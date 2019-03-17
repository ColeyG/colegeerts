<?php
    $thing=$_GET['thing'];
    $time=$_GET['time'];

    require_once('connect.php');

    if (trim($thing)!=""){
        $subS="INSERT INTO tbl_todo VALUES(null,'{$thing}','{$time}',10,0)";
    $subQ=mysqli_query($link,$subS);
    }

    if($subQ){
        echo 'success';
    }else{
        echo 'failure';
    }
    mysqli_close($link);
?>