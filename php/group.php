<?php
session_start();
require_once('classes/InviteGroupMember.php');
require_once('classes/GroupInformation.php');
$invite = new InviteGroupMember();
$group = new GroupInformation();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
  <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lustria" rel="stylesheet">
  <link rel="stylesheet" href="../media/css/userpage.css">
</head>
<body>
  <div class="wrapper">
    <div class="content">
      <div class="navcontent-container">
        <nav class="upper-nav">
          <button id="btn3" onclick="window.location.href = 'my-groups.php'"><i class="fas fa-users"></i>Mina grupper</button>
          <button id="btn3" onclick="window.location.href = 'invite.php'"><i class="fas fa-user icon"></i>Inbjudningar</button>
          <button id="btn3" onclick="window.location.href = 'create-group.php'"><i class="fas fa-users"></i>Skapa grupp</button>
        </nav>
        <div class="content-container">
          <div class="black-box" id="flow">
            <div id="group-info">
              <h1><?php echo $group->group_name; ?></h1>
              <table id="group-table">
                <?php $group->output_group_information(); ?>
              </table>
            </div>
            <div id="search-users-container">
              <h2>Skicka gruppinbjudan</h2>
              <div id="search-container">
                <form method="POST">
                  <input type="text" name="search-word" id="search-input" placeholder="Sök spelare">
                  <button type="submit" id="search-button" value="hej" name="search">Sök</button>
                </form>
              </div>
              <div id="search-list">
                <form>
                  <table id="search-list-table">
                    <?php echo $invite->msg; ?>
                    <?php $invite->get_search_result(); ?>
                  </table>
                </form>
              </div>
            </div>
          </div>
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
  <script src="../src/tabs.js"></script>
</body>
</html>
