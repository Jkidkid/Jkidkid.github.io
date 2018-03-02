<?php

class Profile{

    private $db_connection = null;
    public $points;

    function __construct(){
        $this->profile_info();
    }

    function profile_info(){
        //$$this->db_connection = new mysqli("localhost", "u3543633_test", "qwerty1234567", "u3543633_citrus");
        $this->db_connection = new mysqli("localhost", "root", "", "citrus");
        $this->db_connection->set_charset("utf8");

        $username = $_SESSION['uid'];
        
        $sql = "SELECT * FROM user WHERE userName = '".$username."'";
        $result = $this->db_connection->query($sql);

        $row = $resutl->fetch_assoc();

        $this->points = $row['user_points'];
    }
}