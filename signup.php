<?php

if (isset($_POST['submit'])) {

    include_once 'dbh.inc.php';


    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $uid = mysqli_real_escape_string($conn, $_POST['uid']);
    $pwd = mysqli_real_escape_string($conn, $_POST['pwd']);

    // Error handlers
    // Check for empty field

  if (empty($email) || empty($uid) || empty($pwd)) {
    header("Location: page.html?signup=empty");
    exit();

  } else {
      // Check if email is vaild
      if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: page.html?signup=email");
        exit();
      } else {
        $sql = "SELECT * FROM user WHERE uid='$uid'";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);

        if($resultCheck > 0) {
          header("Location: page.html");
          exit();
        } else {
          // Hashing the password
          $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
          //Insert the user into the database
          $sql = "INSERT INTO user (email, uid, pwd) VALUES ('$email', '$uid', '$hashedPwd')";
        mysqli_query($conn, $sql);
        header("Location: index.html");
        exit();
        }
      }
    }



}
// else {
//     header("Location: index.html");
//     exit();
// }
