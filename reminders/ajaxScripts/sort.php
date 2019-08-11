<?php
    $thing=$_GET['sort'];
    $sortVal=$_GET['sortVal'];

    include('../../core-conf.php');

    if (trim($thing)!=""){
    $subS="UPDATE tbl_todo SET `sort`='{$sortVal}' where `todo_id`='{$thing}'";
        $subQ=mysqli_query($link,$subS);
    }

    echo $subS;
    if($subQ){
        echo 'success';
    }else{
        echo 'failure';
    }
    mysqli_close($link);
?>