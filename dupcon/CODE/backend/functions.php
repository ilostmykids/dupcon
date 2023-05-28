<?php

function getReminders($connect, $uid){

    $reminders = mysqli_query($connect, "SELECT * FROM `reminders` WHERE `uid` = '$uid'");
    $reminders_list = [];

    while($reminder = mysqli_fetch_assoc($reminders)){

        $reminder['marks'] = explode('&', $reminder['marks']);
        $reminders_list[] = $reminder;

    }

    echo json_encode($reminders_list);

}

function getReminder($connect, $reminderId){

    $reminder = mysqli_query($connect, "SELECT * FROM `reminders` WHERE `id` = '$reminderId'");
    $reminder = mysqli_fetch_assoc($reminder);
    $reminder['marks'] = explode('&', $reminder['marks']);

    echo json_encode($reminder);
}

function addReminder($connect, $data){

    $id = $data['id'];
    $label = $data['label'];
    $uid = $data['uid'];
    $time = $data['time'];
    $marks = $data['marks'];
    $code = $data['code'];
    $language = $data['language'];

    mysqli_query($connect, "INSERT INTO `reminders` (`id`, `uid`, `time`, `marks`, `code`, `language`, `label`) 
    VALUES ('$id', '$uid', '$time', '$marks', '$code', '$language', '$label');");
    http_response_code(201);

    $response = [
        'status' => true,
        'reminder_id' => mysqli_insert_id($connect),
        'id' => $id,
        'label' => $label,
        'uid' => $uid,
        'time' => $time,
        'language' => $language,
        'marks' => $marks
    ];

    echo json_encode($response);

}

function deleteReminder($connect, $reminderId){
    mysqli_query($connect, "DELETE FROM reminders WHERE `reminders`.`id` = '$reminderId'");
    $response = [
        'status' => true,
        'post_id' => $reminderId
    ];

    echo json_encode($response);
}

function updateReminder($connect, $data){

    $id = $data['id'];
    $label = $data['label'];
    $marks = $data['marks'];
    $code = $data['code'];
    $language = $data['language'];

    mysqli_query($connect, "UPDATE `reminders` 
    SET 
    `marks` = '$marks', 
    `code` = '$code', 
    `language` = '$language', 
    `label` = '$label' 
    WHERE 
    `reminders`.`id` = '$id';");

    $response = [
        'status' => true,
        'id' => $id
    ];

    echo json_encode($response);
}

function getOptions(){

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $response = [
        'status' => true
    ];

    var_dump(headers_list());

    echo json_encode($response);
}