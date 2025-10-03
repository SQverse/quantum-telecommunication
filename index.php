<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>MY FIRST PHP PAGE</h1>
    <?php
    $y = 11;
    $p = 4;
    $total = $y + $p;
    echo "Totalnya adalah: $total";

    if ($total > 15) {
        echo " - Total lebih dari 15";
    } else {
        echo " - Total tidak lebih dari 15";
    }

    switch ($total) {
        case 10:
            echo " - Total adalah 10";
            break;
        case 15:
            echo " - Total adalah 15";
            break;
        case 20:
            echo " - Total adalah 20";
            break;
        default:
            echo " - Total bukan 10, 15, atau 20";
    }

    do {
        echo "<br>Perulangan Do-While: $total";
        $total++;
    } while ($total < 15);
    
    ?>
</body>
</html>