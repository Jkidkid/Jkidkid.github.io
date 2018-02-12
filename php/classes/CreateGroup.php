<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
class CreateGroup{

    private $db_connection = null;
    public $username = array();
    public $user_id = array();
    public $checked_users = array();
    public $msg; // error och success msg

    function __construct(){
        if(isset($_POST['create-group'])){
            $this->create_group();
        }
    }

    // Denna funktion ska bort sen när vi kopplat in riktiga users i scriptet
    function get_username(){
        return "Elin";
    }

    function create_group(){
        $group_name = $_POST['group-name'];

        $logged_in_user_username = $this->get_username();

        if(empty($group_name)){
            $this->msg = "<div style='color: red;'>Du måste ge gruppen ett namn</div>";
        }else{
    
         $this->db_connection = new mysqli("localhost", "root", "", "citrus");
        
         $sql = "SELECT * FROM group_members WHERE userName = 'Elin'";
         $result = $this->db_connection->query($sql);

         if($result->num_rows > 0){
            $this->msg = "<div style='color: red;'>Du kan bara vara med i en grupp åt gången</div>";
         }else {
            $sql = "INSERT INTO groups (groupName) VALUES ('".$group_name."')";
            $result = $this->db_connection->query($sql);

            
   
         if($result){
             
            $sql = "SELECT * FROM groups WHERE groupName = '".$group_name."'";
            $result = $this->db_connection->query($sql);
            $row = $result->fetch_assoc();

            $group_id = $row['groupID'];

            $sql = "INSERT INTO group_members (userName, userRank, groupID) VALUES ('Elin', 'Admin', '".$group_id."')";
            $result = $this->db_connection->query($sql);
            $this->msg = "<div style='color: green;'>Din grupp har nu skapats</div>";
         }else{
            $this->msg = "<div style='color: red;'>Något gick fel Försök igen.</div>";
         }
        
        }
         }   

         

    }

    function search(){

        $search_string = $_POST['player-search'];

        
        

         $sql = "SELECT * FROM user WHERE uid LIKE '%$search_string%'";
         $result = $this->db_connection->query($sql);

         if($result->num_rows <= 0){
            $this->msg = "Ingen användare hittades";
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
}



?>