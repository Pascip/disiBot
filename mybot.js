const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
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
    //stuff to annoy severin
    if(message.author.username == "severin"){
        message.delete();
        message.channel.send("Sevi: Ich bi 100% Schwul");
    }
  
    
});

client.login("/*KEY*/");

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


