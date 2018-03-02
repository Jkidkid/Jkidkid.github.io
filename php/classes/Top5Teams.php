<?php

class Top5Teams {

    private $db_connection = null;
    public $group_points = array();
    public $group_name = array();

    function __construct() {
        $this->top_5();
    }

    // fetches the information of the 5 groups with the most points
    function top_5() {
        $this->db_connection = new mysqli("localhost", "root", "", "citrus");

        $sql = "SELECT * FROM groups ORDER BY group_points DESC LIMIT 5";
        $result = $this->db_connection->query($sql);

        while($row = $result->fetch_assoc()) {
            $group_name = $row['groupName'];
            $group_points = $row['group_points'];

            array_push($this->group_points, $group_points);
            array_push($this->group_name, $group_name);
        }
    }

    // outputs the information for the top 5 groups in the "leaderboard" in index.php
    function output_top_5() {
        $size = sizeof($this->group_name);
        for($i = 0; $i<$size; $i++) {
            $place = $i + 1;
            echo '<tr><th scope="row" class="no-border">'.$place.'</th><td class="no-border">'.$this->group_name[$i].'</td><td class="no-border">'.$this->group_points[$i].' poäng</td></tr>';
        }
    }
}