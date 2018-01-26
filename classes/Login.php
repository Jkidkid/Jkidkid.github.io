<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
class Login {
    private $db_connection = null;
    public $error_msg;

    function __construct(){
        if(isset($_POST['login'])){
            $this->login();
        }
    }

    function login(){

        // att göra: php-injektion möjlig atm
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        if(empty($username) || empty($password)){
            $this->error_msg = "Tomma fält";
        }else{
            // Skapa databas connection
            $this->db_connection = new mysqli("localhost", "root", "", "logi");

            $sql = "SELECT * FROM user WHERE uid='".$username."'";
            $result = $this->db_connection->query($sql);
            $row = $result->fetch_assoc();

            // Kolla om användaren(användarnamnet) existerar i databasen eller ej
            if($result->num_rows <= 0){
                $this->error_msg = "Användaren finns inte";
            } else{
                 // De-hashing the password
                 $hashedPwdCheck = password_verify($password, $row['pwd']);
                if ($hashedPwdCheck == false) {
                    $this->error_msg = "Fel lösenord";
                } elseif ($hashedPwdCheck == true) {
                    // Log in the user here
                    $_SESSION['email'] = $row['email'];
                    $_SESSION['uid'] = $row['uid'];
                    header('Location: user.html');
                    exit();
                }
            }
        }
    }
}


?>