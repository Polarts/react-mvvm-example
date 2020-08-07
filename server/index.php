<?php

include 'dbService.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$todoServer = new TodoServer();

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
        echo json_encode($todoServer->getAllTodos());
    break;

    case 'POST':
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        echo json_encode($todoServer->addNewTodo($data));
    break;

    case 'PUT':

    break;

    case 'DELETE':

    break;
}

?>