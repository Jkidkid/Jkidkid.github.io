<?php
class Start{

    private $db_connection = null;
    public $group_id;

    function __construct(){
        if(isset($_POST['start'])){
           $this->start();
        }
    }

    function start(){
        $logged_in_user_id = $_SESSION['id'];
        header("Location: ../src/map.html?userID=".$logged_in_user_id);
    }

    function player_has_a_group(){
        $logged_in_user_username = $_SESSION['uid'];
        $this->db_connection = new mysqli("localhost", "u3543633_test", "qwerty1234567", "u3543633_citrus");
        //$this->db_connection = new mysqli("localhost", "root", "", "citrus");

        $sql = "SELECT groupID FROM group_members WHERE userName = '$logged_in_user_username'";
        $result = $this->db_connection->query($sql);
        $row = $result->fetch_assoc();

        $this->group_id = $row['groupID'];

        if($result->num_rows <= 0){
            return false;
        }else{
            return true;
        }
    }

    function get_players_group_name(){
        $this->db_connection = new mysqli("localhost", "u3543633_test", "qwerty1234567", "u3543633_citrus");
        //$this->db_connection = new mysqli("localhost", "root", "", "citrus");
        $sql = "SELECT groupName FROM groups WHERE groupID = '$this->group_id'";
        $result = $this->db_connection->query($sql);
        $row = $result->fetch_assoc();

        echo $row['groupName'];
    }

    function output_players_group(){
        if($this->player_has_a_group() === false){
            echo "Du är inte med i någon grupp";
        }else{
            $this->get_players_group_name();
        }
    }
}
