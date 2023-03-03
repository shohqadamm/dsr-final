<?php
ob_start();
define('API_KEY', '5596444064:AAGvr6oJQCu-JGjEcMNdyo_iPrWkI_xcmOs');
$admin = "5085316362";
function bot($method, $datas = [])
{
    $url = "https://api.telegram.org/bot5596444064:AAGvr6oJQCu-JGjEcMNdyo_iPrWkI_xcmOs/" . $method;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $datas);
    $res = curl_exec($ch);
    if (curl_error($ch)) {
        var_dump(curl_error($ch));
    } else {
        return json_decode($res);
    }
}

$dbConnection = new mysqli("localhost", "shohqadam_shohqadam_students", "1", "shohqadam_shohqadam_students");

if ($dbConnection->connect_error) {

    echo 'Mysql ulanmadi:'  . $dbConnection->connect_error;
}
echo 'Mysql ulandi';
$update = json_decode(file_get_contents('php://input'));
$message = $update->message;
$tx = $message->text;
$mid = $message->message_id;
$cid = $message->chat->id;
$data = $update->callback_query->data;
$qid = $update->callback_query->id;
$callcid = $update->callback_query->message->chat->id;
$callmid = $update->callback_query->message->message_id;
$mid2 = $update->callback_query->inline_message_id;
$clid = $update->callback_query->from->id;
$callname = $update->callback_query->from->first_name;
$calluser = $update->callback_query->from->username;
$callmid = $update->callback_query->message->message_id;
$mmid = $update->callback_query->inline_message_id;
$gid = $update->callback_query->message->chat->id;
$first_name = $message->chat->first_name;
$username = $message->from->username;
$phone_number = $message->contact->phone_number;
$contact = $message->contact;

$inlinequery = $update->inline_query;
$inline_id = $inlinequery->id;
$inlinequery = $inlinequery->from->query;

date_default_timezone_set("Asia/Tashkent");
$time = date('H:i d.m.Y');
$soat = date('H');
$minut = date('i');
$yil = date('y');
$oy = date('m');
$kun = date('d');

$sql = "SELECT * FROM baza WHERE telegramID = '$cid'";
$result = mysqli_query($dbConnection, $sql);
$conn = mysqli_fetch_assoc($result);
if ($conn) {
    echo 'connected';
} else {
    echo 'inserint';
    $sql2 = "INSERT INTO baza (ism,soat,telegramID,qadam) VALUES ('0','0','$cid','0')";
    $result2 = mysqli_query($dbConnection, $sql2);
}
$result = mysqli_query($dbConnection, $sql);
$conn = mysqli_fetch_assoc($result);
$qadamsql =  $conn['qadam'];


if ($tx == "/start") {
    if ($conn['ism'] == 0) {
        bot('sendMessage', [
            'chat_id' => $cid,
            'parse_mode' => "markdown",
            'text' => "Assalomu alaykum *ASIA SCHOOL Online* maktabida _Ro'yhatdan o'tish_ uchun o'quvchining ismi, familiyasi, otasining ismini kiriting.",
        ]);
        $sql2 = "UPDATE baza SET qadam = 'ism' WHERE telegramID ='$cid' ";
        $result2 = mysqli_query($dbConnection, $sql2);
        echo $result2;
        exit;
    } else {
        bot('sendMessage', [
            'chat_id' => $cid,
            'text' => "Hush kelibsiz",
            'parse_mode' => "markdown",
            'reply_markup' => $menu,
        ]);
        $sql2 = "UPDATE baza SET qadam = 'NULL' WHERE telegramID ='$cid' ";
        $result2 = mysqli_query($dbConnection, $sql2);
        echo $result2;
        exit;
    }
}


if ($qadamsql == "ism") {
    bot('sendMessage', [
        'chat_id' => $cid,
        'text' => "Telefon raqamni *+99890-1234567* ko'rinishida kiriting",
        'parse_mode' => "markdown",
        'reply_markup' => $korishlarim,
    ]);
    $tx = str_replace("'", "`", $tx);
    $tx = str_replace("", "`", $tx);
    $sql2 = "UPDATE baza SET qadam = 'phone', ism = '$tx', soat='$time'  WHERE telegramID ='$cid' ";
    $result2 = mysqli_query($dbConnection, $sql2);

    $sql2aa = "INSERT INTO okey (telegramID,soat) VALUES ('$cid','$time')";
    $result2 = mysqli_query($dbConnection, $sql2aa);
}

if ($qadamsql == "phone") {
    bot('sendMessage', [
        'chat_id' => $cid,
        'text' => "Mashg'ulot rahbari(trener)ning Ism Familiya Sharifini kiriting",
        'parse_mode' => "markdown",
        'reply_markup' => $korishlarim,
    ]);
    $tx = str_replace("'", "`", $tx);
    $tx = str_replace("", "`", $tx);
    $sql2 = "UPDATE baza SET qadam = 'trener', trener = '$tx', soat='$time'  WHERE telegramID ='$cid' ";
    $result2 = mysqli_query($dbConnection, $sql2);

    $sql2aa = "INSERT INTO okey (telegramID,soat) VALUES ('$cid','$time')";
    $result2 = mysqli_query($dbConnection, $sql2aa);
}

if ($qadamsql == "trener") {
    bot('sendMessage', [
        'chat_id' => $cid,
        'text' => "Siz muvaffaqiyatli ro'yhatdan o'tdingiz. \n\n Darslar *ElJur* platformasida bo'lib o'tadi. *Eljur* platformasi haqida ma'lumot olish, va platformada _ro'yhatdan o'tish_ uchun pastdagi *ElJur platformasi haqida* tugmasini bosing. \n\n *Sizga taqdim etiladigan videolarni diqqat bilan ko'ring*",
        'parse_mode' => "markdown",
        "reply_markup" => json_encode([
            "resize_keyboard" => true,
            "keyboard" => [
                [['text' => "ElJur platformasi haqida"]],
            ]
        ])
    ]);


    $tx = str_replace("'", "`", $tx);
    $tx = str_replace("", "`", $tx);
    $sql2 = "UPDATE baza SET qadam = 'ok', phone = '$tx', soat='$time'  WHERE telegramID ='$cid' ";
    $result2 = mysqli_query($dbConnection, $sql2);

    $sql2aa = "INSERT INTO okey (telegramID,soat) VALUES ('$cid','$time')";
    $result2 = mysqli_query($dbConnection, $sql2aa);
}
if ($tx == 'ElJur platformasi haqida') {
    bot('sendVideo', [
        'chat_id' => $cid,
        'parse_mode' => 'markdown',
        'video' => 'https://t.me/asiaschooluz/1893',
        'caption' => "Ushbu videolarni diqqat bilan ko'rish juda ham muhim. \n\n Videogagi qadamlar ergashish orqali platformani to'liq o'rganishingiz mumkin",
        'reply_markup' => $key2
    ]);
}

$sql1 = "SELECT * FROM baza";
$result1 = mysqli_query($dbConnection, $sql1);
$stat1 = mysqli_num_rows($result1);

$sql1q = "SELECT * FROM okey";
$result1a = mysqli_query($dbConnection, $sql1q);
$stat1aa = mysqli_num_rows($result1a);

if ($tx == "/uz" and $cid == "5085316362"  or $cid == "204059670") {
    bot('sendMessage', [
        'chat_id' => $cid,
        'text' => "@Infotuit  Foydalanuvchilar
*Ro'yxatdan o'tganlar:* `$stat1aa `
*Ro'yxatdan o'tmaganlar:* `$stat1`",
        'parse_mode' => "markdown",
    ]);
}
