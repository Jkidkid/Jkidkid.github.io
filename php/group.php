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
  <link rel="stylesheet" href="../media/css/userpage.css">
</head>
<body>
  <div>
    <div class="content f-dir">
        <nav class="upper-nav">
          <button><i class="fas fa-users"></i>Min grupp</button>
            <button><i class="fas fa-user icon"></i>Inbjudningar</button>
            <button><i class="fas fa-users"></i>Skapa grupp</button>
          </nav>
      <div id="content-container">
        <div id="holder-group">
       <div id="group-info">
         <h4><?php echo $group->group_name; ?></h4>
        <table id="group-table">
          <?php $group->output_group_information(); ?>
        </table>
       </div>
       <div id="search-users-container">
          <h4>Skicka gruppinbjudan</h4>

          <div id="search-container">
            <form method="POST">
              <input type="text" name="search-word" id="search-input" placeholder="Sök spelare">
              <button type="submit" id="search-button" value="hej" name="search">Sök</button>

          </div>
          <div id="search-list">
          <table id="search-list-table">
            <?php echo $invite->msg; ?>
            <?php $invite->get_search_result(); ?>
            </form>
          </table>
          </div>
       </div>
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
