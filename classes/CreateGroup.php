<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
class CreateGroup{

    private $db_connection = null;
    public $username = array();
    public $user_id = array();

    function __construct(){
        if(isset($_POST['search'])){
            $this->search();
        }
    }

    // Denna funktion ska bort sen när vi kopplat in riktiga users i scriptet
    function getUserId(){
        return 5;
    }

    function search(){

        $search_string = $_POST['player-search'];

        
         // Skapa databas connection
         $this->db_connection = new mysqli("localhost", "root", "", "citrus");

         $sql = "SELECT * FROM user WHERE uid LIKE '%$search_string%'";
         $result = $this->db_connection->query($sql);

         if($result->num_rows <= 0){
            $this->error_msg = "Ingen användare hittades";
        } else {

            // loopa egenom alla matchade resultat i DBn
            while($row = $result->fetch_assoc()) { 
                $username = $row['uid'];
                $user_id = $row['id'];

                array_push($this->username, $username);
                array_push($this->user_id, $user_id);
              } 
        }

    }

    function get_search_result(){
        $size = sizeof($this->username);

        for($i = 0; $i<$size; $i++){
            echo '<tr><td>'.$this->username[$i].'</td><td><input type="checkbox" value="'.$this->user_id[$i].'"></td></tr>';
        }
    }
    
}



?>