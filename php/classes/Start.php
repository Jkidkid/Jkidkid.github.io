<?php
class Start{

    function __construct(){
        if(isset($_POST['start'])){
           $this->start();
        }
    }

    function start(){
        $logged_in_user_id = $_SESSION['id'];
        header("Location: ../src/map.html?userID=".$logged_in_user_id);
    }
}
