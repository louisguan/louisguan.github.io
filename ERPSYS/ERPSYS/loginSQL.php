<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PHP Sample Programs</title>
<!-- <link rel="stylesheet" href="../style.css">
<link rel="stylesheet" href="style.css"> -->
</head>
<body>
<?php

// echo $_REQUEST['email'];
// echo $_REQUEST['password'];

Function phpAlertAndRedirect($msg,$redirect)
{
    echo "<SCRIPT Language=javascript>";
    echo "window.alert('".$msg."')";
    echo "</SCRIPT>";
    echo "<script language=\"javascript\">";
    echo "location.href='".$redirect."'";
    echo "</script>";
    return;
}

session_start();
$_SESSION['customers'];
unset($_SESSION['customers']);

$pdo=new PDO('mysql:host=127.0.0.1; dbname=WareHouse; charset=utf8', 'bat869cube672', 'F2450louis5897');
$sql=$pdo->prepare('select * from Customer where account=? and password=?');
$sql->execute([$_REQUEST['email'], $_REQUEST['password']]);
// $sql->execute(array('abc@gmail.com', '1233'));

// $result = $sql->fetchAll();
// print_r($result);

/* Fetch all of the remaining rows in the result set */
// print("Fetch all of the remaining rows in the result set:\n");

foreach($sql->fetchAll() as $row)
{
    $_SESSION['customers']=
    [
        'id'=>$row['id'],
        'name'=>$row['name'],
        'address'=>$row['address'],
        'account'=>$row['account'],
        'password'=>$row['password'],
        'createDate'=>$row['createDate'],
        'lastUpdateDate'=>$row['lastUpdateDate']
    ];
}

$str1 = '親~';
$str2 = '歡迎登入~666';

if(isset($_SESSION['customers']))
{
    phpAlertAndRedirect($str1.$_SESSION['customers']['name'].$str2,"./Menu.html");
}
else
{
    phpAlertAndRedirect("Login ID or Password error","./");
}

?>
</body>
</html>