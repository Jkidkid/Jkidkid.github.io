<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class ManageInvites {

    private $db_connection = null;
    public $logged_in_user_username;
    public $group_id;
    public $msg;

    function __construct() {
        $this->logged_in_user_username = $_SESSION['uid'];
        if(isset($_POST['accept'])) {
            $this->accept_invite();
        } else if(isset($_POST['deny'])) {
            $this->deny_invite($this->group_id);
        }
    }

    // checks if the logged in user has any group invites and outputs if they do
    function invites() {
        $this->db_connection = new mysqli("localhost", "root", "", "citrus");
        $this->db_connection->set_charset("utf8");
    
        $sql = "SELECT * FROM group_members WHERE userRank = 'inväntar svar' AND userName = '".$this->logged_in_user_username."'";
        $result = $this->db_connection->query($sql);
        $row = $result->fetch_assoc();

        $group_id = $row['groupID'];    

        $sql2 = "SELECT * FROM groups WHERE groupID = '".$group_id."'";
        $result2 = $this->db_connection->query($sql2);
        $row2 = $result2->fetch_assoc();

        $group_name = $row2['groupName'];

        if($result->num_rows <= 0) {
            echo $this->msg = "Du har inga gruppinbjudningar";
        } else {
            echo '<form method="POST" class="Iform"><div class="row2"><p>'.$group_name.'</p></div><div class="row"><button type="submit" class="firstp" name="accept">Accept</button><button type="submit" name="deny">DECLINE</button></div></form>';
        }   
    }

    // handles an accepted group invite
    function accept_invite() {
        $this->db_connection = new mysqli("localhost", "root", "", "citrus");
        
        $test = "userName=".$this->logged_in_user_username." AND ".$this->group_id;
        $sql = "UPDATE group_members SET userRank = 'medlem' WHERE userName = '$this->logged_in_user_username'";
        $this->db_connection->query($sql);  

        $sql1 = "SELECT * FROM group_members WHERE userName = '$this->logged_in_user_username'";
        $result = $this->db_connection->query($sql1);
    
        $row = $result->fetch_assoc();
        
        $group_id = $row['groupID'];

        $update = "UPDATE user SET team_id = '$group_id' WHERE uid = '$this->logged_in_user_username' ";
        $this->db_connection->query($update);
    }
        
    // handles a denied group invite
    function deny_invite() {
        $this->db_connection = new mysqli("localhost", "root", "", "citrus");
        $sql = "DELETE FROM group_members WHERE userName = '$this->logged_in_user_username'";
        $this->db_connection->query($sql);
    }
}

