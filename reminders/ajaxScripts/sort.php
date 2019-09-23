<?php
$thing = $_GET['sort'];
$sortVal = $_GET['sortVal'];

$things = explode(',', $thing);
$sortValues = explode(',', $sortVal);

include '../../core-conf.php';

for ($i = 0; $i < count($things); $i++) {
    $subS = "UPDATE tbl_todo SET `sort`='{$sortValues[$i]}' where `todo_id`='{$things[$i]}'";
    $subQ = mysqli_query($link, $subS);
}

echo "complete";

mysqli_close($link);
?>
