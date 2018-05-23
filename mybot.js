const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
    //stuff to annoy severin
    if(message.author.username == "severin"){
        message.delete();
        message.channel.send("Sevi: Ich bin 100% Schwul");
    }
    
    // lol rekt
    if (message.content.includes("cunt")) {
        message.channel.send("no u");
    }
    
    //actually usefull stuff that helps to make easy decision
    if (message.content.startsWith("newOption")) {
        addOption(message.content.slice(10));
        message.channel.send(message.content.slice(10) + " added!");
    }
    if (message.content.startsWith("allOptions")) {
        message.channel.send(displayOptions());
    }
    if (message.content.startsWith("solution")) {
        message.channel.send(randomOption());
    }
    if (message.content.startsWith("clearOptions")) {
        message.channel.send(clearOptions());
        message.channel.send("Options cleared!");
    }
    
    //prequel memes
    if (message.content === 'Hello there') {
        message.channel.send("General Kenobi");
    }
    
    //idk why but funny
    if (message.content === 'bin ich dumm?') {
        message.reply("Ja, lueg dich ah " + message.author.avatarURL);
    }
    
    //Stuff to troll people
    if(message.content.startsWith("annoy")){
      for(var i = 0; i < 100; i++){
        message.channel.send("@everyone");
      }
    }
    
    //send to specific channel
    if(message.content.startsWith("oy")){
        //channelID for dude
        var channelId = "448441322047668225";
        client.channels.get(channelId).send('he\nllo');
    }
    
    //game
    if (message.content.startsWith("#player1")){
        message.channel.send(setP1(message.author.username, message.content.slice(9,10)));
    }
    if (message.content.startsWith("#player2")){
        message.channel.send(setP2(message.author.username, message.content.slice(9,10)));
    }
    if(message.content.startsWith("set")){
        message.channel.send(turn(message.content.slice(4), message.author.username));
    }
    if(message.content.startsWith("stopGame")){
        message.channel.send(stopGame());
    }
    if(message.content.startsWith("startGame")){
        message.channel.send(startGame());
    }
  
    
});

client.login("");

//Decission stuff
var options = []; 

function clearOptions(){
    options = [];
}
function addOption(option){
    options.push(option);
}
function displayOptions(){
    var optionsString = "";
    if(options.length == 0){
        optionsString = "No options!";
    }else{
        for (i = 0; i < options.length; i++) { 
            optionsString += options[i] + " || ";
        }
    }
    return optionsString;
}
function randomOption(){
    if(options.length == 0){
        optionsString = "No options!";
    }else{
        return options[Math.floor(Math.random() * options.length)];
    }
}

//mini game
var game = false;
var rows = ["---","---","---"];
var player1;
var player2;
var symbol1;
var symbol2;
var roundCounter = 1;

function setP1(newPlayer, symbol){
    if(!game){
        return "Start game first!";
    }
    if(!player1){
        var symbolS = setSymbol1(symbol);
        if(!symbolS){
            return "Symbol " + symbol + " not valid!";
        }
        player1 = newPlayer;
        return player1 + " is player one using symbol " + symbol1;
    }else{
        return "player one already set";
    }
}

function setP2(newPlayer, symbol){
    if(!game){
        return "Start game first!";
    }
    if(!player2){
        var symbolS = setSymbol2(symbol);
        if(!symbolS){
            return "Symbol " + symbol + " not valid!";
        }
        player2 = newPlayer;
        return player2 + " is player two using symbol " + symbol2;
    }else{
        return "player two already set";
    }
}

function setSymbol1(newSymbol){
    if(newSymbol == "-" || newSymbol == symbol2){
        return false;
    }
    symbol1 = newSymbol;
    return true;
}

function setSymbol2(newSymbol){
    if(newSymbol == "-" || newSymbol == symbol1){
        return false;
    }
    symbol2 = newSymbol;
    return true;
}

function stopGame(){
    game = false;
    return "game stopped";
}

function startGame(){
    if(game){
        return "game in progress";
    }else{
        game = true;
        rows = ["---","---","---"];
        player1 = "";
        player2 = "";
        symbol1 = "";
        symbol2 = "";
        roundCounter = 1;
        return "game started, please register players"
    }
}
function turn(pos, author){
    if(!game || !player1 || !player2){
        return "no active game or player missing";
    }
    if(roundCounter%2){
        if(author == player1){
            roundCounter++;
            return playerturn(pos, symbol1);
        }else{
            return "Not your turn!";
        }
    }else{
        if(author == player2){
            roundCounter++;
            return playerturn(pos, symbol2);
        }else{
            return "Not your turn!";
        }
    }
}
function playerturn(pos, symbol){
    if(pos.length == 2){
        var posK = pos.toLowerCase();
        var column = posK.slice(0,1);
        var row = posK.slice(1);
        var col; 
        
        switch(column){
            case "l":
                col = 1;
                break;
            case "m":
                col = 2;
                break;
            case "r":
                col = 3;
                break;
            default:
                return "not valid column";
        }
        
        if(checkPos(row, col)){
            var first = rows[0].slice(0,1);
            var second = rows[1].slice(1,2);
            var third = rows[2].slice(2,3);
            
            switch(col){
            case 1:
                rows[row-1] = symbol + second + third;
                return getString(rows);
                break;
            case 2:
                rows[row-1] = first + symbol + third;
                return getString(rows);
                break;
            case 3:
                rows[row-1] = first + second + symbol;
                return getString(rows);
                break;
            default:
                return "not valid row";
        }
            
        }else{
            return "position " + pos + " already taken";        
        }
        
    }else{
        return pos + " not a valid position";
    }
}

function checkPos(row, col){
    var c = col -1; 
    var ey = rows[row-1].slice(c,col);
    if(ey == "-"){
        return true;
    }else{
        return false;
    }
}

function getString(rows){
    var output = "";
    for (var i = 0; i < rows.length; i++) { 
        output += rows[i] + "\n";
    }
    return output;
}



