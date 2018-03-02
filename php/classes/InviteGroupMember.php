<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class InviteGroupMember {

    private $db_connection = null;
    public $username = array();
    public $msg; // error och success msg

    function __construct() {
        if(isset($_POST['search'])) {
            $this->search();
        }
        if(isset($_POST['invite'])) {
            $this->invite_user();
        }
    }

    // makes a db fetch based on the users search word(s) and saves the result to an array
    function search() {
        $this->db_connection = new mysqli("localhost", "root", "", "citrus");

        $search_string = $_POST['search-word'];

         $sql = "SELECT * FROM user WHERE uid LIKE '%$search_string%'";
         $result = $this->db_connection->query($sql);

         if($result->num_rows <= 0) {
            $this->msg = "<tr><td style='color:red;'>Ingen användare hittades</td></tr>";
        } else {
            while($row = $result->fetch_assoc()) { 
                $username = $row['uid'];
                array_push($this->username, $username);
            } 
        }
    }

    // outputs the search result
    function get_search_result() {
        $size = sizeof($this->username);

        for($i = 0; $i<$size; $i++) {
            echo '<tr><td>'.$this->username[$i].'<form method="POST"></td><td class="right-td"><input id="" type="hidden" name="username" value="'.$this->username[$i].'"/><button type="submit" class="send-invite" name="invite">Skicka</button></td></tr></form>';
        }
    }

    // sends a group invite to a user
    function invite_user() {
        $username = $_POST['username'];
        $this->db_connection = new mysqli("localhost", "root", "", "citrus");

        $this->db_connection->set_charset("utf8");

        $sql = "SELECT * FROM group_members WHERE userName = '".$username."'";
        $result = $this->db_connection->query($sql);

         if($result->num_rows > 0) {
            $this->msg = "<tr><td style='color:red;'>".$username." är tyvärr redan med i en grupp</td></tr>";
         } else {

            $group_id = $_GET['groupID'];
            $sql = "INSERT INTO group_members (groupID, userName, userRank) VALUES ('".$group_id."', '".$username."', 'inväntar svar')";
            $result = $this->db_connection->query($sql);

            if($result) {
                $this->msg = "<tr><td style='color:green;'>En inbjudan har skickats till ".$username."</td></tr>";
            }
            else {
                $this->msg = "<tr><td style='color:red;'>Något gick fel. ".$username." blev inte inbjuden</td></tr>";
            }
        }
    }
}

?>