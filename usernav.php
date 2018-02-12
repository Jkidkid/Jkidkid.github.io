<?php
require_once('classes/InviteGroupMember.php');
require_once('classes/GroupInformation.php');
require_once('classes/Start.php');

$invite = new InviteGroupMember();
$group = new GroupInformation();
$start = new Start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lustria" rel="stylesheet">
  <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
  <link rel="stylesheet" href="css/usernav.css">
</head>
<body>
  <div>
    <div class="content">
      <div class="profile" id="profile">
        <div class="profile-imgbox">
          <img src="img/profiltest.jpg" alt="">
        </div>
        <h2><%= UserName %></h2>
        <h2><%= 9001 %> p</h2>
      </div>
      <div class="start" id="start">
        <div class="instructions">
          <h2>INSTRUKTIONER</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div class="grplist">
            <ul>
              <li>Du har ingen grupp</li>
            </ul>
          </div>
        </div>
        <form method="POST">
          <button class="btn" type="submit" name="start">START</button>
        </form>
      </div>
      <div class="groupScore" id="groupScore">
        <h1>Topplista Grupp</h1>
        <div class="groupScore-list">
          <p>1. Team Citrus 600p</p>
          <p>2. Team Citrus 500p</p>
          <p>3. Team Citrus 400p</p>
          <p>4. Team Citrus 300p</p>
        </div>
      </div>
      <div id="group">
        <nav class="upper-nav">
              <button><i class="fas fa-users"></i>Mina grupper</button>  
              <button><i class="fas fa-user icon"></i>Inbjudningar</button>
              <button onclick="showdivv('create-group')"><i class="fas fa-users"></i>Skapa grupp</button>    
        </nav>
        <div>
        <div class="content-container" id="content-container">
          
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
                </form>
              </div>
          </div>


            <div id="search-list">
              <table id="search-list-table">
                <form method="POST">
                  <?php echo $invite->msg; ?>
                  <?php $invite->get_search_result(); ?>
                </form>
              </table>
            </div>
            
          </div>
        </div>

        <div id="create-group">
        <div id="holder">
          <form method="POST">
            <input type="text" placeholder="Gruppnamn" id="group-name-input" name="group-name">
            <div><?php echo $group->msg; ?></div>
            <button type="submit" id="create-group-button" name="create-group">Skapa grupp</button>
          </form>
        </div>
      </div>
</div>

      </div>
</div>
    <nav class="nav">
      <button onclick="showdiv('profile')" href="/profile"><i class="fas fa-user icon"></i>Profil</button>
      <button onclick="showdiv('group')"><i class="fas fa-users"></i>Grupper</button>
      <button onclick="showdiv('groupScore')"><i class="fas fa-trophy"></i>Topplista</button>
      <button onclick="showdiv('start')"><i class="fas fa-play"></i>Start</button>
    </nav>
  </div>
  <script src="script/tabs.js">

  </script>
</body>
</html>
