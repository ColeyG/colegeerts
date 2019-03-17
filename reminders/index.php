<?php
    require_once('php/connect.php');
    
    $todosS='SELECT * FROM tbl_todo where completion = 0 order by sort ASC';
    $todosQ=mysqli_query($link,$todosS);

    $completedS='SELECT * FROM tbl_todo where completion != 0 order by sort ASC';
    $completedQ=mysqli_query($link,$completedS);

    mysqli_close($link);
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
            <table>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <?php
                        while($row = mysqli_fetch_array($todosQ)){
                            echo "<tr>";
                            echo "<td>";
                            echo $row['todo_thing'];
                            echo "</td>";
                            echo "<td>";
                            echo $row['todo_time'];
                            echo "</td>";
                            echo "<td>";
                            echo "<a href='#' class='delete' id='";
                            echo $row['todo_id'];
                            echo "'><img src='images/cross.svg'></a>";
                            echo "<a href='#' class='complete' id='";
                            echo $row['todo_id'];
                            echo "'><img src='images/check.svg'></a>";
                            echo "</td>";
                            echo "</tr>";
                        }
                    ?>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="items">
            <table>
                <thead>
                    
                </thead>
                <tbody>
                    <tr>
                    <?php
                        while($row = mysqli_fetch_array($completedQ)){
                            echo "<tr class='completion".$row['completion']."'>";
                            echo "<td>";
                            echo $row['todo_thing'];
                            echo "</td>";
                            echo "<td>";
                            echo $row['todo_time'];
                            echo "</td>";
                            echo "<td>";
                            echo "<a href='#' class='remove' id='";
                            echo $row['todo_id'];
                            echo "'><img src='images/delete.svg'></a>";
                            echo "<a href='#' class='reset' id='";
                            echo $row['todo_id'];
                            echo "'><img src='images/up.svg'></a>";
                            echo "</td>";
                            echo "</tr>";
                        }
                    ?>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <script src='js/coldAjax.js'></script>
    <script src='js/main.js'></script>
</body>
</html>
