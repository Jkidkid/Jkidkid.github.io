<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class GroupInformation{

    private $db_connection = null;
    public $group_name;
    public $usernames = array();
    public $user_ranks = array();
    public $msg; // error och success msg

    function __construct(){
        $this->get_group_information();
    }

    function get_group_information(){

        $this->db_connection = new mysqli("localhost", "root", "", "citrus");
        $sql = "SELECT * FROM groups WHERE groupID = 8";
        $result = $this->db_connection->query($sql);
        $this->db_connection->query("SET NAMES utf8;");
        $row = $result->fetch_assoc();

        $this->group_name = $row['groupName'];

        $sql = "SELECT * FROM group_members WHERE groupID = 8 ORDER BY userName ASC";
        $result = $this->db_connection->query($sql);

        while($row = $result->fetch_assoc()){
            $username = $row['userName'];
            $user_rank = $row['userRank']; //user rank/status
            array_push($this->usernames, $username);
            array_push($this->user_ranks, $user_rank);
        }

    }

    function output_group_information(){

        $size = sizeof($this->usernames);

        for($i = 0; $i<$size; $i++){

            echo '<tr><td>'.$this->usernames[$i].'</td><td class="right-td">'.$this->user_ranks[$i].'</td></tr>';
        }


    }


}

?>
