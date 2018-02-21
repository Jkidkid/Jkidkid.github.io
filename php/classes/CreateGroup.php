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

    function create_group(){
        $group_name = $_POST['group-name'];

        $logged_in_user_username = $_SESSION['uid'];

        if(empty($group_name)){
            $this->msg = "<div style='color: red;'>Du måste ge gruppen ett namn</div>";
        }else{

         $this->db_connection = new mysqli("localhost", "root", "", "citrus");

         $sql = "SELECT * FROM group_members WHERE userName = '".$logged_in_user_username."'";
         $result = $this->db_connection->query($sql);

         if($result->num_rows > 0){
            $this->msg = "<div style='color: red;'>Du kan bara vara med i en grupp åt gången</div>";
         }else {
            $sql = "INSERT INTO groups (groupName) VALUES ('".$group_name."')";
            $result = $this->db_connection->query($sql);



         if($result){

            $username_of_logged_in_user = $_SESSION['uid'];

            $sql = "SELECT * FROM groups WHERE groupName = '".$group_name."'";
            $result = $this->db_connection->query($sql);
            $row = $result->fetch_assoc();

            $group_id = $row['groupID'];

            $update = "UPDATE user SET team_id = '$group_id' WHERE uid = '$logged_in_user_username' ";
            $update_resutl = $this->db_connection->query($update);

            $sql = "INSERT INTO group_members (userName, userRank, groupID) VALUES ('".$username_of_logged_in_user."', 'Admin', '".$group_id."')";
            $result = $this->db_connection->query($sql);
            $this->msg = "<div style='color: green;'>Din grupp har nu skapats</div>";
         }else{
            $this->msg = "<div style='color: red;'>Något gick fel Försök igen.</div>";
         }

        }
         }



    }

}



?>
