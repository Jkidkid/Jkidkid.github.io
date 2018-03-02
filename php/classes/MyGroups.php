<?php

class MyGroups{

    public $msg;
    private $db_connection = null;

    function __construct(){
    }

    function my_groups(){

        $this->db_connection = new mysqli("localhost", "u3543633_test", "qwerty1234567", "u3543633_citrus");
        //$this->db_connection = new mysqli("localhost", "root", "", "citrus");
        $this->db_connection->set_charset("utf8");

        $logged_in_user_username = $_SESSION['uid'];
        $sql = "SELECT * FROM group_members WHERE userName='".$logged_in_user_username."'";
        
        $result = $this->db_connection->query($sql);
        $row = $result->fetch_assoc();
        $group_id = $row['groupID'];
        $userRank = $row['userRank'];

        if($userRank == "inväntar svar"){
            $this->msg = "Du är inte med i någon grupp";
        }else{
            
            $sql = "SELECT * FROM groups WHERE groupID='".$group_id."'";
            $result = $this->db_connection->query($sql);
            $row = $result->fetch_assoc();
            
            $group_name = $row['groupName'];

            echo '<a style="text-decoration:underline; margin-top:10px; display:block;" href="group.php?groupID='.$group_id.'">'.$group_name.'</a>';
         
        }
    }
}