<?php
class Leaderboard{
    
    private $db_conncetion = null;
    public $team_name = array();
    public $team_points = array();
    public $player_name = array();
    public $player_points = array();

    function __construct(){
        $this->team_leaderboard();
        $this->player_leaderboard();
    }

    function team_leaderboard(){

        $this->db_connection = new mysqli("localhost", "root", "", "citrus");

        $sql = "SELECT * FROM groups ORDER BY group_points DESC";
        $result = $this->db_connection->query($sql);

        while($row = $result->fetch_assoc()){
            $team_name = $row['groupName'];
            $team_points = $row['group_points'];

            array_push($this->team_name, $team_name);
            array_push($this->team_points, $team_points);
        }
    }

    function output_team_leaderboard(){
        $size = sizeof($this->team_name);

        for($i = 0; $i<$size; $i++){
            $place = $i + 1;
            echo '<tr><td>'.$place.'</td><td>'.$this->team_name[$i].'</td><td>'.$this->team_points[$i].'</td></tr>';
        }
    }

    function player_leaderboard(){

        $sql = "SELECT * FROM user ORDER BY user_points DESC";
        $result = $this->db_connection->query($sql);

        while($row = $result->fetch_assoc()){
            $player_name = $row['uid'];
            $player_points = $row['user_points'];

            array_push($this->player_name, $player_name);
            array_push($this->player_points, $player_points);
        }
    }

    function output_player_leaderboard(){
        $size = sizeof($this->player_name);

        for($i = 0; $i<$size; $i++){
            $place = $i + 1;
            echo '<tr><td>'.$place.'</td><td>'.$this->player_name[$i].'</td><td>'.$this->player_points[$i].'</td></tr>';
        }
    }
}