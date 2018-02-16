<?php
session_start();
require_once('classes/CreateGroup.php');
$group = new CreateGroup();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
  <link rel="stylesheet" href="../media/css/userpage.css">
</head>
<body>
  <div>
    <div class="content-create-group">
        <nav class="upper-nav">
            <button onclick="window.location.href = 'my-groups.php'"><i class="fas fa-users"></i>Mina grupper</button>
            <button onclick="window.location.href = 'invite.php'"><i class="fas fa-user icon"></i>Inbjudningar</button>
            <button onclick="window.location.href = 'create-group.php'"><i class="fas fa-users"></i>Skapa grupp</button>
          </nav>
      <div id="content-container">
        <div id="holder">
          <form method="POST">
            <input type="text" placeholder="Gruppnamn" id="group-name-input" name="group-name">
            <div><?php echo $group->msg; ?></div>
            <button type="submit" id="create-group-button" name="create-group">Skapa grupp</button>
          </form>
        </div>
      </div>
    </div>

      <nav class="nav">
        <button onclick="window.location.href = 'userpage.php?page=profile'"><i class="fas fa-user icon"></i>Profil</button>
        <button><i class="fas fa-users"></i>Grupper</button>
        <button onclick="window.location.href = 'userpage.php?page=groupScore'"><i class="fas fa-trophy"></i>Topplista</button>
        <button onclick="window.location.href = 'userpage.php?page=start'"><i class="fas fa-play"></i>Start</button>
      </nav>

  </div>
</body>
</html>