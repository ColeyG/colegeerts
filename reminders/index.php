<?php
require_once '../core-conf.php';
require_once 'autoloader.php';

$todosS = 'SELECT * FROM tbl_todo where completion = 0 order by sort ASC';
$todosQ = mysqli_query($link, $todosS);

$completedS = 'SELECT * FROM tbl_todo where completion != 0 order by sort ASC';
$completedQ = mysqli_query($link, $completedS);

mysqli_close($link);

// Using the autoloader to call like the below works now
// echo Bing::hello();
?>
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Smart Reminders</title>
    <link href="https://fonts.googleapis.com/css?family=Francois+One|Open+Sans" rel="stylesheet">
    <link rel='stylesheet' href='css/cole.css'>
    <link rel='stylesheet' href='css/main.css'>
</head>
<body>
    <section class="wrapper">
        <div class="list">
            <label for="actionItem">Thing to do:</label>
            <input name="actionItem" id="actionItem" type="text">
            <label for="time">Time: (if applicable)</label>
            <input name="time" id="time" type="text">
            <button id="submit" class="submit">Submit</button>
        </div>
        <div class="items">
            <ul id="todo-sortable">    
            <?php while ($row = mysqli_fetch_array($todosQ)): ?>
            <li id="li<?= $row['todo_id'] ?>">
                <p><?= $row['todo_thing'] ?>
                <?php if ($row['todo_time']) {
                  echo " - <span class='time'>" . $row['todo_time'] . "</span>";
                } ?>
                </p>
                <div class='items-selectors'>
                    <a href='#' class='delete' id='<?= $row['todo_id'] ?>'><img class='list-icon' src='images/cross.svg'></a>
                    <a href='#' class='complete' id='<?= $row['todo_id'] ?>'><img class='list-icon' src='images/check.svg'></a>
                    <img class='handle list-icon' src='images/reorder.svg' />
                </div>
                </li>
            <?php endwhile; ?>
            </ul>
        </div>
        <div class="items">
            <ul id="done-sortable">
            <?php while ($row = mysqli_fetch_array($completedQ)): ?>
            <li id="li<?= $row['todo_id'] ?>" class="comp<?= $row['completion'] ?>">
                <p><?= $row['todo_thing'] ?>
                <?php if ($row['todo_time']) {
                  echo " - <span class='time'>" . $row['todo_time'] . "</span>";
                } ?>
                </p>
                <div class='items-selectors'>
                    <a href='#' class='remove' id='<?= $row['todo_id'] ?>'><img class='list-icon' src='images/delete.svg'></a>
                    <a href='#' class='reset' id='<?= $row['todo_id'] ?>'><img class='list-icon' src='images/up.svg'></a>
                    <img class='handle list-icon' src='images/reorder.svg' />
                </div>
            </li>
            <?php endwhile; ?>
            </ul>        
        </div>
    </section>
    <script src='js/sortable.js'></script>
    <script src='js/coldAjax.js'></script>
    <script src='js/main.js'></script>
</body>
</html>
