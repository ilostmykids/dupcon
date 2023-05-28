<?php
    require 'functions.php';

    header('Content-type: json/application');

    $method = $_SERVER['REQUEST_METHOD'];

    $connect = mysqli_connect('localhost', 'root', '', 'code_reminder');

    $query = $_GET['q'];

    $params = explode('/', $query);

    $type = $params[0];



    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PATCH,DELETE,PUT");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    switch($method){

        case 'GET':

            if($type === 'reminders'){

                $uid = $params[1];
                if(isset($uid)){
                    getReminders($connect, $uid);
                }else{
                    echo json_encode(["error" => "params not found"]);
                }

            }else if($type === 'reminder'){

                $reminder_id = $params[1];
                
                if(isset($reminder_id)){
                    getReminder($connect, $reminder_id);
                }else{
                    echo json_encode(["error" => "params not found"]);
                }

            }else{
                echo json_encode(["error" => "action not found"]);
            }
            break;

        case 'POST':

            if($type === 'reminder'){
                addReminder($connect, $_POST);
            }
            break;

        case 'DELETE':

            if($type === 'reminder'){
                $reminder_id = $params[1];
                if(isset($reminder_id)){
                    deleteReminder($connect, $reminder_id);
                }
            }
            break;

        case 'PUT':
            if($type === 'reminder'){
                $data = file_get_contents('php://input');
                $data = json_decode($data, true);

                updateReminder($connect, $data);
            }



    }
