window.onload = function() {
    $("#firstPage").hide();
    $("#avatarCreation").show();
    $("#game").hide();
    $("#characterImg").hide();


//============================================================KONSTANTE========================================================================
    let submitB = document.getElementById("submit"); // submit Button
    let ninjaBt = document.getElementById("ninjaBt"); // Buttons on the Avatar Creation Page ......................
    let sumoBt = document.getElementById("sumoBt");
    let wizardBt = document.getElementById("wizardBt");
    let ninjaImg = document.getElementById("ninjaImg"); // IMAGE BUTTONS ........................................
    let wizardImg = document.getElementById("wizardImg");
    let sumoImg = document.getElementById("sumoImg");
    let luffyImg = document.getElementById("luffyImg");
    let fireball = document.getElementById("wizardFireball");
    let kunai = document.getElementById("ninjaKunai");
    let heart0 = document.getElementById("heart0");
    let heart1 = document.getElementById("heart1");
    let heart2 = document.getElementById("heart2");
    let coin = document.getElementById("berryCoin");
    let infoTab = document.getElementById("infoTab");
    let username = "";
    let password = "";
    let avatarClass = "";
    let avatarName = "";
    let int1;
    let weAreInGame = false;

//================================================= LOGIN PAGE ========================================================

    submitB.onclick = function hidePage() { //                SUBMIT BUTTON FUNCTION....................................
        username = document.getElementById("usernameInput").value;
        password = document.getElementById("passwordInput").value;
        $(document).ready(function () {
            $("#firstPage").hide();
            $("#avatarCreation").show();
        });
    }

//=============================================== AVATAR CREATION PAGE =================================================

    function hideAvatarPage() {
        //$("#firstPage").hide();
        $("#avatarCreation").hide();
        $("#characterImg").show();
        $("#game").show();
        createMap();
        setTimeout(function () { // basically da ne ustreli metka ob buttonPressu
            weAreInGame = true;
        }, 500);
        izberiClass(avatarClass);
        fullScreen();
    }

    ninjaBt.onclick = function () { //                        CLASS BUTTONS FUNCTIONS...................................
        avatarClass = "ninja";
        avatarName = document.getElementById("avatarNameInput").value;
        hideAvatarPage();
    }
    sumoBt.onclick = function () {
        avatarName = document.getElementById("avatarNameInput").value;
        avatarClass = "sumo";
        hideAvatarPage();
    }
    wizardBt.onclick = function () {
        avatarClass = "wizard";
        //console.log(avatarClass);
        avatarName = document.getElementById("avatarNameInput").value;
        hideAvatarPage();
    }


    $(document).ready(function changeImage() { //           HOVER FOR THE IMAGES (BORDER TURNS WHITE)...................

        $("#ninjaImg").hover(
            function () {
                //$("#ninjaImg").attr("src", "https://art.pixilart.com/thumb/sr2d818a1f5d7d7.png");
                kunai.style.animation = "moveKunai 0.5s linear alternate";

            },
            function () {
                //$("#ninjaImg").attr("src", "https://art.pixilart.com/sr29975db92de0e.png");
                kunai.style.animation = "";
            });

        let currentIndex = 0;
        let sumoImages = ["https://art.pixilart.com/thumb/sr214371b036dc3.png", "https://art.pixilart.com/thumb/sr21279b6461f0f.png",
            "https://art.pixilart.com/thumb/sr214371b036dc3.png", "https://art.pixilart.com/thumb/sr216c4e4249bce.png"];

        sumoImg.addEventListener('mouseenter', () => {
            int1 = setInterval(() => {
                currentIndex = (currentIndex + 1) % sumoImages.length;
                sumoImg.src = sumoImages[currentIndex];
            }, 500);
        });
        sumoImg.addEventListener('mouseleave', () => {
            clearInterval(int1);
        });


        let luffyAnimationInterval;
        let luffyAnimationIndex = 0;
        let luffyStretchImages = ["slike/LuffyFront.png", "slike/LuffyStretchNeck1.png", "slike/LuffyStretchNeck2.png", "slike/LuffyStretchNeck3.png", "slike/LuffyStretchNeck4.png",
            "slike/LuffyStretchNeck3.png", "slike/LuffyStretchNeck4.png", "slike/LuffyStretchNeck3.png", "slike/LuffyStretchNeck2.png", "slike/LuffyStretchNeck1.png",
            "slike/LuffyFront.png"];

        $("#luffyImg").hover(
            function () {
                luffyAnimationInterval = setInterval(() => {
                    luffyAnimationIndex = (luffyAnimationIndex + 1) % luffyStretchImages.length;
                    luffyImg.src = luffyStretchImages[luffyAnimationIndex];
                    if(luffyAnimationIndex !== 0 && luffyAnimationIndex !== 10){
                        luffyImg.style.scale = "2";
                    } else {
                        luffyImg.style.scale = "1";
                    }
                }, 150);
            },
            function () {
                luffyImg.src = luffyStretchImages[0];
                luffyImg.style.scale = "1";
                clearInterval(luffyAnimationInterval);
            })

        let gojoPose = "https://art.pixilart.com/sr224d7f3328b8c.png";
    });





    //============================================== GAME PAGE ==========================================================================
    //===================================================================================================================================
    //===================================================================================================================================


    //slika characterja
    const characterImg = document.getElementById("characterImg");
    //==============================================KONSTANTE ZA ANIMACIJE IN QUALITY OF LIFE============================================

    let animationIndex = 0; //for animation purposes(glej spodaj)
    let animationCooldown = 0;//change for faster change of animation

    let cursorX;
    let cursorY;

    //keys za gledanje kateri so pritisnjeni
    let keyA = false;
    let keyS = false;
    let keyD = false;
    let keyW = false;


    let intervalUpdate;     //variable za settanje intervala za update animacije in polozaja characterja
    let updateP = false;    //spremenljivka, ki je true, ko je interval za premikanje nastavljen in false, ko ni

    let arrayAnimacij = [];
    let missileType;

    let gojoAnimation = ["https://art.pixilart.com/sr220fa4f76ea08.png", "https://art.pixilart.com/sr27c4c6b078516.png", "https://art.pixilart.com/sr2b0f3f8cea39f.png",
        "slike/gojoRight.png", "slike/gojoRight1.png", "slike/gojoRight2.png",
        "slike/gojoBack.png", "slike/gojoBack1.png", "slike/gojoBack2.png",
        "slike/gojoLeft.png", "slike/gojoLeft1.png", "slike/gojoLeft2.png"];

    let luffyAnimation = ["slike/LuffyFront.png", "slike/LuffyWalkDown1.png", "slike/LuffyWalkDown2.png",
        "slike/LuffyRightSide.png", "slike/LuffyWalkRight1.png", "slike/LuffyWalkRight2.png",
        "slike/LuffyBack.png", "slike/LuffyWalkUp1.png", "slike/LuffyWalkUp2.png",
        "slike/LuffyLeftSide.png", "slike/LuffyWalkLeft1.png", "slike/LuffyWalkLeft2.png"];


    let wizardAnimation = ["slike/WizardFront.png", "https://art.pixilart.com/sr2e1496ebd68df.png", "https://art.pixilart.com/sr20b67910862cb.png",
        "slike/WizardRightSide.png", "slike/WizardWalkRight1.png", "slike/WizardWalkRight2.png",
        "slike/WizardBack.png", "slike/WizardWalkUp1.png", "slike/WizardWalkUp2.png",
        "slike/WizardLeftSide.png", "slike/WizardWalkLeft1.png", "slike/WizardWalkLeft2.png"];//dodaj izstrelek za right in left click

    let sumoAnimation = ["https://art.pixilart.com/sr214371b036dc3.png", "https://art.pixilart.com/sr214371b036dc3.png", "https://art.pixilart.com/sr214371b036dc3.png",
        "https://art.pixilart.com/sr214371b036dc3.png", "https://art.pixilart.com/sr214371b036dc3.png", "https://art.pixilart.com/sr214371b036dc3.png",
        "https://art.pixilart.com/sr214371b036dc3.png", "https://art.pixilart.com/sr214371b036dc3.png",  "https://art.pixilart.com/sr214371b036dc3.png",
        "https://art.pixilart.com/sr214371b036dc3.png", "https://art.pixilart.com/sr214371b036dc3.png", "https://art.pixilart.com/sr214371b036dc3.png"] //dopolni s slikami sumota

    let ninjaAnimation = ["https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png",
        "https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png",
        "https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png",
        "https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png", "https://art.pixilart.com/sr27d92e5aff323.png"];//dopolni s slikami ninje

    //dodaj ostale characterje

    function izberiClass(avatarClass) {
        if (avatarClass === "ninja") {
            arrayAnimacij = ninjaAnimation;
            characterImg.src = arrayAnimacij[0];
            missileType = "shuriken";
        }
        if (avatarClass === "sumo") {
            arrayAnimacij = gojoAnimation;
            characterImg.src = arrayAnimacij[0];
            missileType = "shockWave";
        }
        if (avatarClass === "wizard") {
            arrayAnimacij = luffyAnimation;
            characterImg.src = arrayAnimacij[0];
            missileType = "fireball";
        }
    }

//=======================================================DODAJANJE OZADJA IN COLLISIONS==================================================================
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const map = new Image();
    let mapX = 0;
    let mapY = -150;
    let charX = 950; //offset za pravilni collision
    let charY = 535;

    let collisionsMap = [];
    for(let i = 0; i < collisionsData.length; i += 100){
        collisionsMap.push(collisionsData.slice(i, 100 + i));
    }

    class Boundary {
        constructor({position}){
            this.position = position;
            this.width = 48;
            this.height = 48;
        }
        draw() {
            ctx.fillStyle = "red";
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    const boundaries = []; // kje so collisioni
    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if(symbol === 2032){
                boundaries.push(new Boundary({position: {
                        x: j * 48 + mapX,
                        y: i * 48 + mapY
                    }}))
            }})
    })

    function checkForCollision() { // pomoje dela zdej idk
        let hittingWall = false;
        boundaries.forEach(boundary => {
            if (charX + 30 >= boundary.position.x && charX <= boundary.position.x + 48 &&
                charY + 30 >= boundary.position.y && charY <= boundary.position.y + 48) {
                console.log("collision");
                if(!hittingWall){
                    hittingWall = true;
                    return hittingWall;
                } else if(!(charX + 30 >= boundary.position.x && charX <= boundary.position.x + 48 &&
                    charY + 30 >= boundary.position.y && charY <= boundary.position.y + 48)) {
                    hittingWall = false;
                }
            }
        })
        return hittingWall;
    }

    function createMap(){
        canvas.height = window.innerHeight * 2;
        canvas.width = window.innerWidth * 2;
        map.src = "slike/map.png"
        map.onload = () => {
            ctx.drawImage(map, mapX, mapY);
        }
    }

//===============================================================ENEMIES===============================================================
    let enemies = [];
    let pozicije = [];


    class Enemy {
        interval;
        currentHP;
        constructor(HP, attack, Xp, type, src, top, left) {
            this.HP = HP;
            this.attack = attack;
            this.Xp = Xp;
            this.type = type;
            this.src = src;
            this.posY = top;
            this.posX = left;
        }
    }
    function appendEnemy(enemy) {
        ctx.drawImage(enemy, 600, 600, 150, 150);
        console.log("uspesno nr.2");
    }

    function placeEnemy(enemyImage) {//enemy object
        console.log(`${enemyImage.counter} , ${enemyImage.type} , ${enemyImage.src} , ${enemyImage.top} , ${enemyImage.left} , ${enemyImage.angle} , ${enemyImage.user} ,`)
        let enemy = document.createElement("img");
        enemy.style.width = "16000px";
        enemy.style.width = "16000px";
        enemy.style.position = "absolute";
        enemy.id = enemyImage.type + counter;
        counter++;
        //doloci zacetno rotacijo glede na pozicijo characterja
        enemy.src = enemyImage.src[0];
        enemy.style.top = enemyImage.top + "px";
        enemy.style.left = enemyImage.left + "px";
        enemy.style.zIndex = "3";
        enemy.draggable = false;
        enemy.style.userSelect = "none";
        enemies.push(enemyImage);
        appendEnemy(enemy);
        enemyImage.interval = setInterval(function () {
            enemyUpdate(enemy, enemyImage);
        }, 30);
        console.log("uspesno!")
    }

    function enemyUpdate(enemy){
        //enemyAttack();
        //enemyMove();
    }

    function enemyAttack(enemy){

    }
    function enemyMove(enemy, enemyObject, char){
        let razdalja = vrniRazdaljo(enemy.left, char.posX, enemy.top, char.posY);
        console.log(razdalja);
        const distance = 15;
// Convert the direction from degrees to radians
        const radians = enemyObject.angle * (Math.PI / 180);
// Calculate the horizontal and vertical components of the movement
        const deltaX = distance * Math.cos(radians);
        const deltaY = distance * Math.sin(radians);
// Get the current position of the element
        enemyObject.posX += deltaX;
        enemyObject.posY += deltaY;

        enemy.style.left = enemyObject.posX + "px";
        enemy.style.top = enemyObject.posY + "px";
        clearInterval(enemyObject.interval);

    }

    let wolfAnimation = ["https://art.pixilart.com/sr2730a44e205f3.png", "https://art.pixilart.com/sr2f140e6e64136.png", "https://art.pixilart.com/sr24f914a0a2f3c.png",
        "https://art.pixilart.com/sr28f9cd29b64fe.png", "https://art.pixilart.com/sr28847e13a2664.png", "https://art.pixilart.com/sr24646bc9ebf28.png",
        "https://art.pixilart.com/sr25d555b835f03.png", "https://art.pixilart.com/sr20a7dfb496542.png", "https://art.pixilart.com/sr2e43e7faadec0.png",
        "https://art.pixilart.com/sr2bdd3f4e86775.png", "https://art.pixilart.com/sr2f1a7f474a880.png", "https://art.pixilart.com/sr231f9f7e0110c.png"]

    function createAnEnemy(HP, attack, XP, type, animations, top, left){
        let prvi = new Enemy(250, 20, 10, "wolf", wolfAnimation, 600, 600);
        placeEnemy(prvi);
    }

    function premakniEnemy(x, y){
        enemies.forEach(function(enemy){
            enemy.posY += y;
            enemy.posX += x;
        })
    }

    function dolociSmerEnemyev(){

    }

//===============================================================IZSTRELKI==============================================================

    //interval za anti flamethrower
    let spaceCooldownCounter = 0;
    setInterval(function () {
        spaceCooldownCounter++;
    }, 10);


    //arraya za izstrelke
    let missiles = [];
    let missileIntervals = [];

    //counter za id izstrelkov
    let counter = 0;

    //class za izstrelke
    class Missile {
        interval; //na to se appenda interval za vsak missile
        posX; //to je trenutna pozicija X missila
        posY; //to je trenutna pozicija Y missila
        constructor(counter, type, src, top, left, angle, user) {
            this.counter = counter;
            this.type = type;
            this.src = src;
            this.top = top; //zacetna Y
            this.left = left; //zacetna X
            this.posY = top;
            this.posX = left;
            this.angle = angle;
            this.user = user;
        }
    }

    function appendImage(missile) {
        document.body.appendChild(missile);
    }

    function createImage(image) {
        console.log(`${image.counter} , ${image.type} , ${image.src} , ${image.top} , ${image.left} , ${image.angle} , ${image.user} ,`)
        let missile = document.createElement("img");
        missile.style.width = "50px";
        missile.style.width = "50px";
        missile.style.position = "absolute";
        missile.id = image.type + counter;
        counter++;
        missile.src = image.src;
        missile.style.top = image.top + "px";
        missile.style.left = image.left + "px";
        missile.style.transform = `rotate(${image.angle}deg)`;
        missile.style.zIndex = "3";
        missile.draggable = false;
        missile.style.userSelect = "none";
        missiles.push(missile);
        appendImage(missile);
        console.log(missiles + ", " + missileIntervals);
        image.interval = setInterval(function () {
            missileFly(missile, image, 250);
        }, 30);
        createAnEnemy();
    }

    function missileFly(missile, image, range) {
        let razdalja = vrniRazdaljo(image.left, image.posX, image.top, image.posY);
        console.log(razdalja);
        if (razdalja < range) {
            const distance = 30;
// Convert the direction from degrees to radians
            const radians = image.angle * (Math.PI / 180);
// Calculate the horizontal and vertical components of the movement
            const deltaX = distance * Math.cos(radians);
            const deltaY = distance * Math.sin(radians);
// Get the current position of the element
            image.posX += deltaX;
            image.posY += deltaY;

            missile.style.left = image.posX + "px";
            missile.style.top = image.posY + "px";
        } else {
            missile.src = "";
            // missiles.delete(missile);
            clearInterval(image.interval);
        }
    }

    function vrniRazdaljo(posX1, posX2, posY1, posY2) {
        return Math.sqrt(Math.pow(posX1 - posX2, 2) + Math.pow(posY1 - posY2, 2));
    }

    //============================================================MOUSEMOVE========================================================================

    document.addEventListener("mousemove", function (event) {
        if(avatarClass !== "") {
            updateDirection(event);
        }
        //console.log(angle);
    });

    //============================================================MOUSECLICK========================================================================
    document.addEventListener("click", function (){
        if(weAreInGame){
            if (spaceCooldownCounter > 80) {
                let image = new Missile(counter, fireball, "slike/WizardFireball.png", 490, 950, returnAngle(), "player");
                createImage(image);
                spaceCooldownCounter = 0;
            }
        }
    })

//============================================================KEYDOWN========================================================================
    document.addEventListener("keydown", function (event) {
        if (event.key === "a" || event.key === "d" || event.key === "s" || event.key === "w") {
            //seta interval za updatanje pozicije
            if (!updateP) {
                intervalUpdate = setInterval(function () {
                    updateAnimationAndMove(keyA, keyS, keyW, keyD);
                    updateDirection();
                    checkForCollision();
                    boundaries.forEach(function(boundary){
                        boundary.draw();
                    })
                }, 20);
                updateP = true;
            }
            //console.log("keyA: " + keyA + ", keyS: " + keyS + ", keyW: " + keyW + ", keyD: " + keyD)// moves character with WASD
            //razni keydowni
            if (event.key === "a") {
                if (!keyA) {
                    if(checkForCollision()){
                        keyA = false;
                        mapX += 4;
                    }
                    keyA = true;
                }
            }
            if (event.key === "d") {
                if (!keyD) {
                    if(checkForCollision()){
                        keyD = false;
                        mapX -= 4;
                    }
                    keyD = true;
                }
            }
            if (event.key === "w") {
                if (!keyW) {
                    if(checkForCollision()){
                        keyW = false;
                        mapY += 4;
                    }
                    keyW = true;
                }
            }
            if (event.key === "s") {
                if (!keyS) {
                    if(checkForCollision()){
                        keyS = false;
                        mapY -= 4;
                    }
                    keyS = true;
                }
            }
        }
    });

    //fullscreen
    let fullscreen = false;
    function fullScreen() {
        if(!fullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().then(() =>
                    console.log("uspesen fullscreen"));
            }
        }else {
            fullscreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() =>
                    console.log("uspesno iz fullscreena"));
            }
        }
    }

    document.addEventListener("keydown", function (event) {
        //odpre infotab
        if (event.key === 'i') {
            infoTab.style.visibility = "visible";
        }
    });

    document.addEventListener("keyup", function (event) {
        //zapre infotab
        if (event.key === 'i') {
            infoTab.style.visibility = "hidden";
        }
    });

//============================================================KEYUP========================================================================

    document.addEventListener("keyup", function (event) {
        //razni keyupi
        if (event.key === "a") {
            keyA = false;
        }
        if (event.key === "d") {
            keyD = false;
        }
        if (event.key === "w") {
            keyW = false;
        }
        if (event.key === "s") {
            keyS = false;
        }
        // Stops the movement correctly
        if (!keyA && !keyS && !keyW && !keyD) {
            clearInterval(intervalUpdate);
            updateP = false;
            characterImg.src = arrayAnimacij[0];
            animationCooldown = 0;
            animationIndex = 0;
        }
    });


//============================================================OBRACANJE IN PREMIKANJE CHARACTERJA========================================================================

    function updateDirection(event) {
        if (event) {
            cursorX = event.clientX;
            cursorY = event.clientY;
        }
        const angle = returnAngle();
        if (angle < 45 && angle > -45) {
            spremeniAnimacijo(3 + animationIndex % 3);
        }
        if (angle > 45 && angle < 135) {
            spremeniAnimacijo(animationIndex % 3);
        }
        if (angle > 135 && angle < 180 || angle > -180 && angle < -135) {
            spremeniAnimacijo(9 + animationIndex % 3);
        }
        if (angle < -45 && angle > -135) {
            spremeniAnimacijo(6 + animationIndex % 3);
        }
        //console.log("Cursor location: " + cursorX + ", " + cursorY);
    }

    //returna angle med cursorjem in characterjem
    function returnAngle() {
        const xDiff = cursorX - 950;
        const yDiff = cursorY - 500;
        return Math.atan2(yDiff, xDiff) * 180 / Math.PI;
    }

    //funkcija update, ki glede na pritisnjene keye spreminja animacijo in pozicijo
    function updateAnimationAndMove(keyA, keyS, keyW, keyD) {
        let x = 0;//za premikanje slik z ozadjem
        let y = 0;//enako
        animationCooldown++;
        if (animationCooldown === 5) {
            animationCooldown = 0;
            animationIndex++;
        }
        if (keyS) {
            if (keyA || keyD) {
                boundaries.forEach(boundary => {
                    boundary.position.y -= 3;
                })
                mapY -= 3;
                charY -= 3;
                y -= 3;
            } else {
                boundaries.forEach(boundary => {
                    boundary.position.y -= 4;
                })
                mapY -= 4;
                charY -= 4;
                y -= 4;
            }
        }
        if (keyW) {
            if (keyA || keyD) {
                boundaries.forEach(boundary => {
                    boundary.position.y += 3;
                })
                mapY += 3;
                charY += 3;
                y += 3;
            } else {
                boundaries.forEach(boundary => {
                    boundary.position.y += 4;
                })
                mapY += 4;
                charY += 4;
                y += 4;
            }
        }
        if (keyD) {
            if (keyS || keyW) {
                boundaries.forEach(boundary => {
                    boundary.position.x -= 3;
                })
                mapX -= 3;
                charX -= 3;
                x -= 3;
            } else {
                boundaries.forEach(boundary => {
                    boundary.position.x -= 4;
                })
                mapX -= 4;
                charX -= 4;
                x -= 4;
            }
        }
        if (keyA) {
            if (keyS || keyW) {
                boundaries.forEach(boundary => {
                    boundary.position.x += 3;
                })
                mapX += 3;
                charX += 3;
                x += 3;
            } else {
                boundaries.forEach(boundary => {
                    boundary.position.x += 4;
                })
                mapX += 4;
                charX += 4;
                x += 4;
            }
        }
        ctx.drawImage(map, mapX, mapY);
        premakniEnemy(x, y);
        enemies.forEach(function(enemy){
            let src = dolociSmerEnemyev();
            ctx.drawImage(enemy.src, enemy.posX, enemy.posY, 150, 150);
        })
    }

    //funkcija ki characterju spreminja animacijo
    function spremeniAnimacijo(animacija) {
        characterImg.src = arrayAnimacij[animacija];
    }

//============================================================HEARTJUMP========================================================================

    function heartJump() {
        setTimeout(function () {
            heart0.style.animation = "heartJump 2s steps(1, end) infinite";
        }, 1350);
        setTimeout(function () {
            heart1.style.animation = "heartJump 2s steps(1, end) infinite";
        }, 1500);
        setTimeout(function () {
            heart2.style.animation = "heartJump 2s steps(1, end) infinite";
        }, 1650);
    }

    heartJump(); // hearts jumping on top of the pagee


//============================================================COINSPIN========================================================================

    let coinCount = 0; // how many coins we have
    document.getElementById("coinCount").textContent = coinCount.toString(); // Display of our number of coins on top right

    function coinSpin() {
        let spinIndex = 0;
        let coinImages = ["https://art.pixilart.com/thumb/sr2b3a05f028aab.png", "https://art.pixilart.com/thumb/sr26cad9a64b482.png",
            "https://art.pixilart.com/thumb/sr281a982156be4.png", "https://art.pixilart.com/thumb/sr2c1b6163fc67e.png"];
        setInterval(function () {
            spinIndex = (spinIndex + 1) % coinImages.length;
            coin.src = coinImages[spinIndex];
        }, 200);
    }

    coinSpin();  // coin spinning function

    //============================================================TEST========================================================================
    function mainGame(){

    }

    function round(round){
        switch(round){

        }
    }
}