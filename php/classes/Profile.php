<?php

class Profile {

    private $db_connection = null;
    public $points;

    function __construct() {
        $this->profile_info();
    }

    // fetches the logged in user's points to be shown on their profile page
    function profile_info() {
        $$this->db_connection = new mysqli("localhost", "u3543633_test", "qwerty1234567", "u3543633_citrus");
        $this->db_connection->set_charset("utf8");

        $username = $_SESSION['uid'];

        $sql = "SELECT * FROM user WHERE uid = '$username'";
        $result = $this->db_connection->query($sql);

        $row = $result->fetch_assoc();

        $this->points = $row['user_points'];
    }
}
