<?php
    $thing=$_GET['thing'];
    $time=$_GET['time'];

    include('../../core-conf.php');

    if (trim($thing)!=""){
        $subS="INSERT INTO tbl_todo VALUES(null,'{$thing}','{$time}',0,0)";
        $subQ=mysqli_query($link,$subS);
    }

    if($subQ){
        echo 'success';
    }else{
        echo 'failure';
    }
    mysqli_close($link);
?>