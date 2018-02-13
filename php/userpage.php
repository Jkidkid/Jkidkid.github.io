<?php
session_start();
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
  <link rel="stylesheet" href="../media/css/userpage.css">
</head>
<body>
  <div>
    <div class="content">
      <div class="profile" id="profile">
        <div class="profile-imgbox">
          <img src="../media/img/profiltest.jpg" alt="">
        </div>
        <h2><%= UserName %></h2>
        <h2><%= 9001 %> p</h2>
      </div>
      <div class="start" id="start">
        <div class="instructions">
          <h2>INSTRUKTIONER</h2>
          <p>Clue|Hunter är ett lagbaserat geolocation spel där ni som utredarteam ( minst 3 personer )
             får samlas vid en startplats/mordplatsen. När alla i teamet är samlat och har tagit del av informationen från mordplatsen
             börjar en timer att ticka ner. Ni som lag har då 15 minuter på er att samla så många ledtrådar som möjligt, om timern
             tickat ner till 0 har bevisen förstörts och går ej att ta del av. För att kunna öppna en ledtråd krävs det att en spelare
             befinner sig inom 20 meter från ledtråden. Då kommer även resten av teamet att kunna läsa informationen utan att behöva
             befinna sig i närheten.
             Med hjälp av ledtrådarna ska ni samla in information för att kunna avgöra vem som är mördaren och vilket vapen som har använts.
             Lagets admin är den enda som kan ange mördare och vapen, och varje lag har 2 chansningar på sig.
             Skulle även andra försöket vara fel har ni som lag förlorat och spelet är över.
             Samlar poäng gör ni genom att ange rätt mördare och vapen. Gissar ni rätt på första försöket ger det 100p och andra
             försöket ger 50p.
             Leaderboarden kan ni följa i eran spelarlobby och uppdateras frekvent. Lycka till.
           </p>
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
        <div class="group-content">
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
      <button onclick="window.location.href = 'my-goups.php'"><i class="fas fa-users"></i>Grupper</button>
      <button onclick="showdiv('groupScore')"><i class="fas fa-trophy"></i>Topplista</button>
      <button onclick="showdiv('start')"><i class="fas fa-play"></i>Start</button>
    </nav>
  </div>
  <script src="../src/tabs.js"></script>
  <script type="text/javascript">
  window.onload = function(){
    let params = (new URL(location)).searchParams;
    let val = params.get('page');
    if(val === null){
      showdiv('profile');
    } else {
      showdiv(val);
    }
  }
  </script>
</body>
</html>
