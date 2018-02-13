<?php
session_start();
require_once('classes/ManageInvites.php');
$invite = new ManageInvites();
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
    <div class="content f-dir">
        <nav class="upper-nav">
            <button onclick="window.location.href = 'my-groups.php'"><i class="fas fa-users"></i>Min grupp</button>
            <button><i class="fas fa-user icon"></i>Inbjudningar</button>
            <button onclick="window.location.href = 'create-group.php'"><i class="fas fa-users"></i>Skapa grupp</button>
          </nav>
        <div class="wrapp">
          <div class="invites">
            <h2>Inbjudningar</h2>
            <?php $invite->invites(); ?>
          </div>
        </div>
    </div>
      <nav class="nav">
        <button onclick="window.location.href = 'http://10.7.2.27/citrus/jkidkid.github.io/php/userpage.php?page=profile'"><i class="fas fa-user icon"></i>Profil</button>
        <button><i class="fas fa-users"></i>Grupper</button>
        <button onclick="window.location.href = 'http://10.7.2.27/citrus/jkidkid.github.io/php/userpage.php?page=groupScore'"><i class="fas fa-trophy"></i>Topplista</button>
        <button onclick="window.location.href = 'http://10.7.2.27/citrus/jkidkid.github.io/php/userpage.php?page=start'"><i class="fas fa-play"></i>Start</button>
      </nav>

  </div>
  <script src="../src/tabs.js"></script>
</body>
</html>
