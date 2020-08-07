<?php

class TodoServer {

    private $servername = 'localhost';
    private $username = 'id13438188_dba';
    private $password = '#dbAdmin1234';
    private $dbName = 'id13438188_db';
    public $connection;
    
    function __construct() {
        $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbName);
    } 

    function getAllTodos() {
        $sql = "SELECT * FROM todoItems";
        $result = $this->connection->query($sql);

        $dataRows = array();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($dataRows, $row);
            }
        }

        return $dataRows;
    }

    function addNewTodo($todoContent) {
        $sql = "INSERT INTO todoItems (content) VALUES ('".$todoContent->content."')";
        $result = $this->connection->query($sql);

        if ($result) {
            return $this->connection->insert_id;
        }
    }
}

?>