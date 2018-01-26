<?php
require_once('classes/Login.php');

$login = new Login();

?>

<!DOCTYPE html>
<html>
  <head>
    <title>Citrus Games</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/page.css">
    <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lustria" rel="stylesheet">


  </head>
  <body>
      <!-- -->
        <header class="container-fluid" id="home">
            <div class="row">
                <div class="col-md-6 col-6">
                    <img src="img/logo.png" alt="">
                </div>
                <div class="col-md-6 col-6">
                    <button type="button" class="btn btn-success float-right justify-content-xs-center" data-toggle="modal"  data-target="#exampleModal">Logga in</button>
                    <!-- modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Inloggning</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                                <form method="POST" class="needs-validation" novalidate>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Användarnamn" name="username" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Lösenord" name="password" required>
                                    </div>
                                    <div style="color: red;"><?php echo $login->error_msg; ?></div>
                            </div>
                            <div class="modal-footer">
                              <button type="submit" class="btn btn-success" name="login">Logga in</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 text-center">
                    <h1>Citrus Games</h1>
                    <h3>Gör som tusentals andra människor, joina oss gratis! <a href="#reg">Bli medlem</a></h3>
                </div>
            </div>
        </header>
        <section class="container-fluid text-white dark-bg">
            <div class="container h-100 flex-wrap">
                <div class="row align-middle vertical-center h-100">
                    <div class="content col-md-12 col-lg-6">
                        <h2>Clue|Hunter</h2>
                        <p>
                          ClueHunter är det nya revolutionerande geolocation-gamet. Bered dig på att uppslukas av hårresande mordgåtor
                          i en närmiljö. I detta spel är det du och ditt utredarteam som samlar in ledtrådar för att få tag på mördaren och hans mordvapen.
                        </p>
                        <p>
                          Här gäller det att jobba i team och tänka strategiskt. Vid spelets start kastas ni direkt in i en spännande mordgåta.
                          I spelets karta orienterar sig ni i teamet runt för att samla in olika ledtrådar. Vissa ledtrådar förstörs efter en viss tid, så är ni redo att dela upp er?
                          Tänk på att en mördare går lös.
                          Desto snabbare ni löser mordgåtan desto snabbare klättrar ni på poängtavlan. Tävla mot andra team så vässa era dektektivhjärnor och kasta er in.
                        </p>
                    </div>
                    <div class="img col-md-12 col-lg-6 align-middle">
                      <figure>
                        <img src="img/img-placeholder.gif" class="img-fluid" alt="-">
                      </figure>
                    </div>
                </div>
            </div>
        </section>
        <section class="container-fluid text-white light-bg">
            <div class="container h-100">
                <div class="row h-100 vertical-center">
                    <div class="col-md-12">
                        <h2 class="text-center">Leaderboard</h2>
                        <table class="table no-border">
                            <tbody>
                                <tr>
                                    <th scope="row" class="no-border">1</th>
                                    <td class="no-border">Gruppnamn</td>
                                    <td class="no-border">500 poäng</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="no-border">2</th>
                                    <td class="no-border">Gruppnamn</td>
                                    <td class="no-border">470 poäng</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="no-border">3</th>
                                    <td class="no-border">Gruppnamn</td>
                                    <td class="no-border">400 poäng</td>
                                </tr>
                                <tr>
                                <th scope="row" class="no-border">4</th>
                                    <td class="no-border">Gruppnamn</td>
                                    <td class="no-border">380 poäng</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="no-border">5</th>
                                    <td class="no-border">Mark</td>
                                    <td class="no-border">350 poäng</td>
                                </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <section class="container-fluid text-white dark-bg" id="reg">
          <div class="container h-100">
            <div class="row h-100 vertical-center">
              <div class="col-md-12 text-center">
                <h2>Bli medlem!</h2>
                <form class="register-form">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Användarnamn">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" placeholder="Lösenord">
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control" placeholder="Email">
                  </div>
                  <button type="submit" class="btn btn-success">Bli medlem!</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div class="container-fluid footer light-bg text-center text-white">
            <div class="container h-100">
            <div class="row h-100 vertical-center">
              <div class="col-md-6 col-sm-12">
                <h3 class="text-uppercase">Ta del av våra nyhetsbrev</h3>
                <form>
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Email">
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button">Prenumerera</button>
                    </div>
                  </div>
                </form>

              </div>
              <div class="col-md-6 col-sm-12">
                <h3 class="text-uppercase">Följ oss</h3>
                <i class="fa fa-facebook-square" aria-hidden="true"></i>
                <i class="fa fa-twitter-square" aria-hidden="true"></i>
                <i class="fa fa-github-square" aria-hidden="true"></i>
                <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                <i class="fa fa-google-plus-square" aria-hidden="true"></i>
              </div>
              <div class="col-md-12 float-right">
                <a href="#home"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
              </div>
            </div>

          </div>
          </div>
        </footer>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="script/page.js"></script>

 
  </body>
</html>
