<?php

class Login {
    private $db_connection = null;

    function __construct(){
        if(isset($_POST['login'])){
            $this->login();
        }
    }

    function login(){

        // att göra: php-injektion möjlig atm
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        if(empty($username)){
            echo "hej";
        }else{

            // Skapa databas connection
            $this->db_connection = new mysqli($host, $username, $pwd, $database);

            $sql = "SELECT * FROM user WHERE username=$username";
            $result = $db_connection->query($sql);

            // Kolla om användaren(användarnamnet) existerar i databasen eller ej
            if($result->num_rows < 0){
                header("Location: http://localhost/grupp_login/page.php?status=doesnt_exist");
                die();
            } else{
                // Kolla om lösenordet stämmer eller ej
                if($password == $row['password']){
                    // Du har blivit inloggad
                    header("Location: http://localhost/grupp_login/page.php?status=inloggad");
                die();
                }else{
                    // Fel lösenord/användarnamn
                    header("Location: http://localhost/grupp_login/page.php?status=wrong_password");
                die();
                }
            }
        }
    }
}


?>