window.onload = () => {
    var canvas = document.createElement("canvas");
    var affichage = document.createElement("div");
    var tige = document.createElement("div");
    var pieds = document.createElement("div");

    tige.id ="tige"
    pieds.id= "pieds"
    pieds.innerHTML = "Solid SNAKE !! 🐍"

   // affichage.style.border = "2px solid black";
  //  affichage.height = 100;
    affichage.id = "affichage";

    canvas.width = 900;
    canvas.height = 600;
    //canvas.style.border = "2px solid black";
    document.body.appendChild(affichage);
    document.body.appendChild(canvas);
    document.body.appendChild(tige);
    document.body.appendChild(pieds);


    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var ctx = canvas.getContext("2d");
    var collision = false;
    var score = 0;
    var vie = 3;
    var niveau = 0;
    var codeTouche = 0;
    var pause = false;



    document.addEventListener("keydown", interaction);

    //Propriéter du serpent
    var colorSnake = "greenyellow";
    var tailleSnake = 15; // taille d'un block du canva ou du serpent
    var nombreBlockParWidth = canvasWidth / tailleSnake;
    var nombreBlockParHeight = canvasHeight / tailleSnake;
    var xSnake = Math.trunc(Math.random() * nombreBlockParWidth) * tailleSnake;
    var ySnake = Math.trunc(Math.random() * nombreBlockParHeight) * tailleSnake;
    var deplacementX = 0;
    var deplacementY = 0;
    var tailleBody = 5;
    var bodySnake = []; // le corps du serpent 

    //Pomme
    var colorPomme = "red";
    var xPomme = Math.trunc(Math.random() * nombreBlockParWidth) * tailleSnake;
    var yPomme = Math.trunc(Math.random() * nombreBlockParHeight) * tailleSnake;
    var rayonPomme = tailleSnake / 2;
    var tempsPomme = 0
    var tempsMaxPomme = 100


    //Bonus
    var colorBonus = "green";
    var yBonnus = Math.trunc(Math.random() * nombreBlockParHeight) * tailleSnake;
    var xBonus = Math.trunc(Math.random() * nombreBlockParHeight) * tailleSnake;
    var tempsBonus = 0;
    var afficheBonus = false;



    var interval = setInterval(game, 100);
    affiche()
    //fonction qui lance le jeu
    function game() {
        drawSnake();
        drawApple();
        dectionCollision();
        verifMangerPomme();
        gestionVieSerpent();
        gestionAffichageBonus();
        // dessinerBonus();
    }





    // function gestion position snake

    function gestionPosition() {
        xSnake = xSnake + deplacementX * tailleSnake;
        ySnake = ySnake + deplacementY * tailleSnake;
        bodySnake.push({
            x: xSnake,
            y: ySnake
        });

        while (bodySnake.length > tailleBody) {
            bodySnake.shift();

        }
    }
    //Fonction qui déssine le serpent
    function drawSnake() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        gestionPosition();
        ctx.fillStyle = colorSnake
        for (let index = 0; index < bodySnake.length; index++) {
            ctx.fillRect(bodySnake[index].x, bodySnake[index].y, tailleSnake - 1, tailleSnake - 1)

        }


    }

    //dessiner la pomme
    function drawApple() {
        ctx.beginPath();
        ctx.arc(xPomme + rayonPomme, yPomme + rayonPomme, rayonPomme, 0, 2 * Math.PI);
        ctx.fillStyle = colorPomme;
        ctx.fill();
        ctx.font = "15px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("V", xPomme + 3, yPomme + 3)
        ctx.closePath();
    }

    //Fonction qui initialise la position de la pomme

    function initPositionPomme() {
        xPomme = Math.trunc(Math.random() * nombreBlockParWidth) * tailleSnake;
        yPomme = Math.trunc(Math.random() * nombreBlockParHeight) * tailleSnake;
    }

    //fonctionn initialise la position du snake
    function initPositionSnake() {
        xSnake = Math.trunc(Math.random() * nombreBlockParWidth) * tailleSnake;
        ySnake = Math.trunc(Math.random() * nombreBlockParHeight) * tailleSnake;
    }
    //fonctionn initialise la position du Bonus
    function initPositionBonus() {
        xBonus = Math.trunc(Math.random() * nombreBlockParWidth) * tailleSnake;
        yBonnus = Math.trunc(Math.random() * nombreBlockParHeight) * tailleSnake;
    }
    //
    // fonction who move the snake
    function interaction(event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 37:
                pause = false;
                if (codeTouche == 39) {
                    break
                }
                //left

                deplacementX = -1;
                deplacementY = 0;
                codeTouche = event.keyCode
                break;


                //up
            case 38:
                pause = false
                if (codeTouche == 40) {
                    break
                }
                deplacementX = -0;
                deplacementY = -1;
                codeTouche = event.keyCode
                break;

                //right
            case 39:
                pause = false
                if (codeTouche == 37) {
                    break
                }
                deplacementX = +1;
                deplacementY = 0;
                codeTouche = event.keyCode
                break;

                //down
            case 40:
                pause = false
                if (codeTouche == 38) {
                    break
                }
                deplacementX = 0;
                deplacementY = 1;
                codeTouche = event.keyCode
                break;

                //pause
            case 32:

                pause = true;
                deplacementX = 0;
                deplacementY = 0;
                codeTouche = event.keyCode
                break;
                  //rejouer
            case 13:

                document.location.reload(true)
                break;

            default:

        }
    }

    /*Dection colision */

    function dectionCollision() {
        //le serpent se mord
        if (bodySnake.length > 5) {
            for (let index = 0; index < bodySnake.length - 1; index++) {
                if (bodySnake[index].x == bodySnake[bodySnake.length - 1].x &&
                    bodySnake[index].y == bodySnake[bodySnake.length - 1].y) {
                    collision = true;
                    break;
                }

            }
        }
        if (xSnake < 0 || ySnake < 0 || xSnake + tailleSnake > canvasWidth || ySnake + tailleSnake > canvasHeight) {
            collision = true
        }


        //le serpent sort du canva
    }

    //Function miam miam la pomme
    function verifMangerPomme() {
        if (xPomme == xSnake && yPomme == ySnake) {
            initPositionPomme()
            score += 10 + 3 * bodySnake.length;
            niveau = Math.trunc(score / 300);
            tailleBody += 5
            affiche();
        } else if (tempsPomme++ > tempsMaxPomme) {
            initPositionPomme();
            tempsPomme = 0;
        }
    }

    //Afficher le score

    function affiche() {
        var msg = "Score : 🤘" + score + " | Vie : 💜" + vie + " | Niveau : 🎯" + niveau;
        document.getElementById("affichage").innerHTML = msg;
    }

    //Fonction qui gère la vie du serpent

    function gestionVieSerpent() {
        if (pause == true) {
            collision = false;
            return;
        }

        if (collision) {
            vie--;
            collision = false;
            tailleBody = 5;
            initPositionSnake();
            initPositionPomme();
            affiche();
            bodySnake = [bodySnake[bodySnake.length - 1]];
            if (vie == 0) {
                ctx.fillStyle = "#fff"
                ctx.font ="40px Arial";
                ctx.fillText("Game Over ☠", canvasWidth/2-130, canvasHeight / 2);
                ctx.font ="15px Arial";
                ctx.fillText("Score : " +score+' point(s)', canvasWidth/2-130, canvasHeight*2/3);
                ctx.fillText("Play again press entrer ! :" +score, canvasWidth/2-130, canvasHeight*3/4);
                clearTimeout(interval)
                console.log("snake what have you done ");
            }
        }
    }

    //Gerer l'affichage du Bonus

    function gestionAffichageBonus() {
        if (tempsBonus++ > 50) {
            tempsBonus = 0;
            //on peut affichez le bonus
            if (Math.random() > 0.7) {
                //on affiche le bonus
                initPositionBonus();
                afficheBonus = true;

            } else {
                // on ne l'affcihe pas
                xBonus = 1000;
                yBonnus = 800;

                afficheBonus = false

            }
        }
            if (afficheBonus == true) {
                dessinerBonus()
            }
            if (xSnake == xBonus && ySnake == yBonnus) {
                vie++
                affiche()
                xBonus = 1000;
                yBonnus = 800;

                afficheBonus = false
            }
            //
        
    }
    //draw Bonus
    function dessinerBonus() {
        ctx.font = "15px Arial";
        ctx.fillStyle = "green";
        //ctx.fillRect(xBonus,yBonnus,tailleSnake,tailleSnake);
        // ctx.fillStyle = colorBonus;
        ctx.fillText("💜", xBonus - 3, yBonnus + 14);
    }
}