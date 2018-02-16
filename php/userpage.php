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
  <title>Clue|Hunter</title>
  <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lustria" rel="stylesheet">
  <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
  <link rel="stylesheet" href="../media/css/userpage.css">
</head>
<body>
  <div>
    <div class="content">
      <div class="profile" id="profile">
        <h1>Profil</h1>
        <div class="profile-imgbox">
          <img src="../media/img/userAvatar.png" alt="user avatar">
        </div>
        <h2><%= UserName %></h2>
        <h2><%= 9001 %> p</h2>
      </div>
      <div class="start" id="start">
        <div class="instructions">
          <h1>INSTRUKTIONER</h1>
          <p>Clue|Hunter är ett lagbaserat geolocation spel där ni som utredarteam ( minst 3 personer )
             får samlas vid en startplats/mordplatsen. När alla i teamet är samlat och har tagit del av informationen från mordplatsen
             börjar en timer att ticka ner. <br><br>Ni som lag har då 15 minuter på er att samla så många ledtrådar som möjligt, om timern
             tickat ner till 0 har bevisen förstörts och går ej att ta del av. För att kunna öppna en ledtråd krävs det att en spelare
             befinner sig inom 20 meter från ledtråden. Då kommer även resten av teamet att kunna läsa informationen utan att behöva
             befinna sig i närheten.<br /><br />
             Med hjälp av ledtrådarna ska ni samla in information för att kunna avgöra vem som är mördaren och vilket vapen som har använts.
             Lagets admin är den enda som kan ange mördare och vapen, och varje lag har 2 chansningar på sig.
             Skulle även andra försöket vara fel har ni som lag förlorat och spelet är över. <br /><br />
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
        <form method="POST" class="startbtn">
          <button class="btn" type="submit" name="start">START</button>
        </form>
      </div>
      <div class="groupScore" id="groupScore">
        <nav class="upper-nav2">
          <button onclick="showdivv('score-group')"><i class="fas fa-users"></i>Topplista lag</button>
          <button onclick="showdivv('score-player')"><i class="fas fa-user icon"></i>Topplista spelare</button>
        </nav>
        <div class="score-content">
          <div class="score-group" id="score-group">
            <h1>Topplista lag</h1>
            <div class="groupScore-list">
              <table>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Poäng</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>Team Citrus</td>
                  <td>500</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Team Grape</td>
                  <td>200</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="score-player" id="score-player">
            <h1>Topplista spelare</h1>
            <div class="groupScore-list">
              <table>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Spelare</th>
                  <th>Poäng</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>Nisse</td>
                  <td>500</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Karl Johan</td>
                  <td>200</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="nav">
      <button onclick="showdiv('profile')" href="/profile"><i class="fas fa-user icon"></i>Profil</button>
      <button onclick="window.location.href = 'my-groups.php'"><i class="fas fa-users"></i>Grupper</button>
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
