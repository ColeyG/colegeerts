<?php
    $id=$_GET['id'];
    $code=$_GET['code'];

    require_once('connect.php');

    $delS="UPDATE tbl_todo SET completion={$code} WHERE todo_id = {$id}";
    if($code==3){$delS="DELETE FROM tbl_todo WHERE todo_id = {$id}";}
    $delQ=mysqli_query($link,$delS);

    if($delQ){
        echo 'success';
    }else{
        echo 'failure';
    }

    mysqli_close($link);
?>