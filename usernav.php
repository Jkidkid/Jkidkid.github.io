<?php
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
  <link rel="stylesheet" href="css/usernav.css">
</head>
<body>
  <div>
    <div class="content">
        <nav class="upper-nav">
            <button><i class="fas fa-user icon"></i>Gå med i grupp</button>
            <button><i class="fas fa-users"></i>Skapa grupp</button>    
          </nav>
      <div id="content-container">
        <div id="holder">
        <div id="search-container">
          <form method="POST">
          <input type="text" placeholder="Sök spelare" id="input-search" name="player-search">
          <button type="submit" id="search-button" name="search">Sök</button>
        </div>

        <div id="search-result-container">
         
            <table>
              <?php $group->get_search_result(); ?>
              </table>
        </div>
        
        <input type="text" placeholder="Gruppnamn" id="group-name-input" name="group-name">
        
        
        <div><?php echo $group->error_msg; ?></div>
        <button type="submit" id="create-group-button" name="create-group">Skapa grupp</button>
        </form>
      </div>
      </div>
    </div>

      <nav class="nav">
        <button><i class="fas fa-user icon"></i>Profil</button>
        <button><i class="fas fa-users"></i>Grupper</button>
        <button><i class="fas fa-trophy"></i>Topplista</button>
        <button><i class="fas fa-play"></i>Start</button>


      </nav>

  </div>
</body>
</html>
