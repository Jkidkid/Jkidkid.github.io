<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
class CreateGroup{

    private $db_connection = null;
    public $username = array();
    public $user_id = array();
    public $checked_users = array();
    public $error_msg;

    function __construct(){
        if(isset($_POST['search'])){
            $this->search();
        }
        else if(isset($_POST['create-group'])){
            $this->save_checked_users();
            if(empty($_POST['group-name'])){
                $this->error_msg = "Du måste ge gruppen ett namn";
            }
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
            echo '<tr><td>'.$this->username[$i].'</td><td><input type="checkbox" name="player[]" value="'.$this->user_id[$i].'"></td></tr>';
        }
    }

    function save_checked_users(){

        if(empty($_POST['player'])){
            $this->error_msg = "Du måste bjuda in minst 1 användare till gruppen";
        }else{
            foreach($_POST['player'] as $player_id) {
                array_push($this->checked_users, $player_id);
            }
        }
        
    }
    
}



?>