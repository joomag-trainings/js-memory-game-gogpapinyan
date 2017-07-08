    var imageArray = [];
    var randomArray;
    var flipped = 0;
    var flippedArray = [];
    function createImageArray(){
        randomArray =  [];
        for (i = 0; i < 36; ++i){
            randomArray[i] = i;
        }
        while (randomArray.length) {
            var image = new Image();
            var name = generateRandomName();
            image.src = "images/" + name + ".png";
            image.className = name;
            imageArray.push(image);
        }
    }


    function generateRandomName(){
        var randomIndex = Math.floor(Math.random()*randomArray.length);
        var newRandomName = randomArray[randomIndex];
        randomArray.splice(randomIndex,1);
        return newRandomName;

    }

    createImageArray();

    var gameBoard =document.getElementById("gameBoard");
    gameBoard.style.width = "602px";

    for (i = 0;i < 36; ++i){
        var block = new Image();
        var blockImage = gameBoard.appendChild(block);
        blockImage.id = i;
        blockImage.src = "block.png";
        blockImage.style.width = "100px";
        blockImage.style.height = "100px";
        blockImage.addEventListener("click",flipImage);

    }

    var img1;
    var img2;
    var openedPairs = 0;

    function flipImage(e) {

        e.target.src = imageArray[e.target.id].src;
        e.target.className = imageArray[e.target.id].className;
        flippedArray[flipped] = e.target;
        flippedArray[flipped].removeEventListener("click",flipImage);
        flipped += 1;

        if (flipped == 2) {
            img1 = flippedArray[0];
            img2 = flippedArray[1];
            if (Math.abs(flippedArray[0].className - flippedArray[1].className) != 18) {
                setTimeout(function () {
                    img1.src = "block.png";
                    img2.src = "block.png";
                    img1.addEventListener("click",flipImage);
                    img2.addEventListener("click",flipImage);
                }, 1000);
            } else {
                setTimeout(function () {
                    img1.src = "open.png";
                    img2.src = "open.png";
                    img1.removeEventListener("click", flipImage);
                    img2.removeEventListener("click", flipImage);
                }, 1000);
                openedPairs += 1;
            }

            flipped = 0;
            flippedArray = [];


        }
        if (openedPairs == 18) {
            document.body.style.opacity = "0.5";
            alert("You win");
        }
    }

    function unflipSingle() {
        img1.src = "block.png";
        flipped = 0;
        flippedArray = [];
    }








