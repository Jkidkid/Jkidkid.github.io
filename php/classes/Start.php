<?php

class Start{

    function __construct(){
        if(isset($_POST['start'])){
           $this->start();
        }
    }

    function start(){
        header("Location: ../src/map.html?userID=5");
    }
}
