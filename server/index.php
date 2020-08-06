<?php

include 'dbService.php';

$todoServer = new TodoServer();

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
        echo json_encode($todoServer->getAllTodos());
    break;

    case 'POST':

    break;

    case 'PUT':

    break;

    case 'DELETE':

    break;
}

?>