// File Name: game.ts
// Author: Devesh Kumar (301117993)
// Page: index.html 
// File Description: Custom TypeScript File
"use strict";
(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let alertLabelBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let startButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let alertLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    // symbol tallies
    let playerBet;
    let playerCash;
    let jackpot = 5000;
    let winAmount = 0;
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "alertBackground", src: "./Assets/images/alertLabel.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "startButton", src: "./Assets/images/play.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame or called / 16.667 ms
    function Update() {
        stage.update();
    }
    // Utility function to check if a value falls within a range of bounds
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    // When this function is called it determines the betLine results.
    function Reels() {
        let betLine = [" ", " ", " "];
        let outCome = [0, 0, 0];
        for (let spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    // This function below contains the structure of interface
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        alertLabelBackground = new Core.GameObject("alertBackground", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 285, true);
        stage.addChild(alertLabelBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        startButton = new UIObjects.Button("startButton", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 130, true);
        stage.addChild(startButton);
        // Labels
        jackPotLabel = new UIObjects.Label("00000000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("00000000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("00000000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("0000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        alertLabel = new UIObjects.Label("Welcome! Please click Play on top to begin!", "20px", "Consolas", "#000000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 280, true);
        stage.addChild(alertLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }
    // This function calculates the player's winning amounts, if any
    function calculateWinnings() {
        if (blanks === 0) {
            if (grapes === 3) {
                winAmount = playerBet * 10;
            }
            else if (bananas === 3) {
                winAmount = playerBet * 20;
            }
            else if (oranges === 3) {
                winAmount = playerBet * 30;
            }
            else if (cherries === 3) {
                winAmount = playerBet * 40;
            }
            else if (bars === 3) {
                winAmount = playerBet * 50;
            }
            else if (bells === 3) {
                winAmount = playerBet * 75;
            }
            else if (sevens === 3) {
                winAmount = playerBet * 100;
            }
            else if (grapes === 2) {
                winAmount = playerBet * 2;
            }
            else if (bananas === 2) {
                winAmount = playerBet * 2;
            }
            else if (oranges === 2) {
                winAmount = playerBet * 3;
            }
            else if (cherries === 2) {
                winAmount = playerBet * 4;
            }
            else if (bars === 2) {
                winAmount = playerBet * 5;
            }
            else if (bells === 2) {
                winAmount = playerBet * 10;
            }
            else if (sevens === 2) {
                winAmount = playerBet * 20;
            }
            else if (sevens === 1) {
                winAmount = playerBet * 5;
            }
            else {
                winAmount = playerBet * 1;
            }
            playerWins();
        }
        else {
            playerLoses();
        }
        // Check to see if the player won the jackpot
        function checkJackPot() {
            // compare two random values
            let jackCheck = Math.floor(Math.random() * 51 + 1);
            let jackWin = Math.floor(Math.random() * 51 + 1);
            if (jackCheck === jackWin) {
                alertLabel.text = ("   Congrats! You also won the $" + jackpot + " Jackpot!!");
                playerCash += jackpot;
            }
        }
        // Utility function to show a win message and increase player money 
        function playerWins() {
            playerCash += winAmount;
            winningsLabel.text = "  " + String(winAmount);
            resetTally();
            checkJackPot();
        }
        // Utility function to show a loss message and reduce player cash
        function playerLoses() {
            playerCash -= playerBet;
            winningsLabel.text = "  0";
            resetTally();
        }
        // Code below will set the credit label text to present cash player has
        creditLabel.text = "  " + String(playerCash);
        // Utility function to reset all fruit tallies
        function resetTally() {
            grapes = 0;
            bananas = 0;
            oranges = 0;
            cherries = 0;
            bars = 0;
            bells = 0;
            sevens = 0;
            blanks = 0;
        }
    }
    // This is where main logic is performed
    function interfaceLogic() {
        // Player clicks on Play button to begin the game - this will change Text on slot-machine and give 1000 cash to player
        startButton.on("click", () => {
            alertLabel.text = "****Hit a BET button to choose a bet!****";
            jackPotLabel.text = "  5000";
            creditLabel.text = "  1000";
            betLabel.text = " 0";
            winningsLabel.text = "  0";
            playerCash = 1000;
            winAmount = 0;
        });
        // Player clicks on bet1 Button 
        bet1Button.on("click", () => {
            playerBet = 1;
            if (playerCash !== undefined) {
                betLabel.text = " " + String(playerBet);
                alertLabel.text = "              Bet Amount = 1 \n\n             Hit Spin to Roll";
            }
            else {
                alertLabel.text = "Please hit the Play Button on top to start!";
            }
        });
        // Player clicks on bet10 Button 
        bet10Button.on("click", () => {
            playerBet = 10;
            if (playerCash !== undefined) {
                betLabel.text = " " + String(playerBet);
                alertLabel.text = "             Bet Amount = 10 \n\n             Hit Spin to Roll";
            }
            else {
                alertLabel.text = "Please hit the Play Button on top to start!";
            }
        });
        // Player clicks on bet100 Button 
        bet100Button.on("click", () => {
            playerBet = 100;
            if (playerCash !== undefined) {
                betLabel.text = String(playerBet);
                alertLabel.text = "             Bet Amount = 100 \n\n             Hit Spin to Roll";
            }
            else {
                alertLabel.text = "Please hit the Play Button on top to start!";
            }
        });
        // Player clicks on betMax Button, Max bet allowed by casino is $1000
        betMaxButton.on("click", () => {
            playerBet = playerCash;
            if (playerCash !== undefined) {
                betLabel.text = String(playerBet);
                alertLabel.text = "             Bet Amount = 1000 \n\n             Hit Spin to Roll";
            }
            else {
                alertLabel.text = "Please hit the Play Button on top to start!";
            }
        });
        // Player clickes on Spin Button
        spinButton.on("click", () => {
            if (playerCash !== undefined) {
                if (playerBet !== undefined) {
                    if (playerCash === 0) {
                        alertLabel.text = "            You ran out of Cash! \n\n   Please click PLAY button to play again?";
                    }
                    else if (playerBet > playerCash) {
                        alertLabel.text = "    Not enough Cash to place that bet! \n\n         Please try a lower bet";
                    }
                    else {
                        // reel test
                        let reels = Reels();
                        console.log(reels);
                        // Replacing the images in the reels
                        leftReel.image = assets.getResult(reels[0]);
                        middleReel.image = assets.getResult(reels[1]);
                        rightReel.image = assets.getResult(reels[2]);
                        calculateWinnings();
                    }
                }
                else {
                    alertLabel.text = "****Hit a BET button to choose a bet!****";
                }
            }
            else {
                alertLabel.text = "Please hit the Play Button on top to start!";
            }
        });
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map