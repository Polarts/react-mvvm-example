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

    function addNewTodo($updateObject) {
        $statement = $this->connection->prepare("INSERT INTO todoItems (content) VALUES (?)");
        $statement->bind_param("s", $content);
        $content = $updateObject->content;
        
        $result = $statement->execute();

        if ($result) {
            return $this->connection->insert_id;
        }
    }

    function updateTodo($updateObject) {
        $propsToUpdate = get_object_vars($updateObject);
        $propsCount = count($propsToUpdate);
        $propKeys = array_keys($propsToUpdate);

        switch($propsCount) {
            case 2:
                $statement = $this->connection->prepare("UPDATE todoItems SET (?) VALUES (?)");
                $type = gettype($propsToUpdate[1]) == "string"? "ss" : "si";
                $statement->bind_params($type, $key, $param);
                $param = $propsToUpdate[1];
                $key = $propKeys[1];
            break;

            case 3:
                $statement = $this->connection->prepare("UPDATE todoItems SET (?, ?) VALUES (?, ?)");
                
            break;
        }

        return $statement->execute();
    }
}

?>