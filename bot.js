var Discord = require('discord.io');
var Discord_js = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var kanalID = "543507151189049357";

// Initialize Discord Bots
var bot_js = new Discord_js.Client();
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
 });

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//discord.io event
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    console.log("discord.io ready!");
    setInterval(regularMessage, 3600000); //automatic message every 5 mins
});

//discord.js event
bot_js.on("ready", function(){
    console.log("discord.js ready!");
    //pinnedMessages();
    setInterval(pinnedMessages, 3600000); //pinned messages every hour
});


//automatic messages
function regularMessage() {
    bot.sendMessage({
        to: kanalID,
        message:
        //"@everyone \n" +
        "1. Pravidelne sledujte sekci **Dulezite**!\n" +
        "2. Vsechny dulezite reporty prosim vkladejte do sekce **Reporty**.\n" + 
        "3. Pokud si nevite rady s nejakou herni mechanikou, mrknete do **Rady-do-zacatku**, nebo se zeptejte zkusenejsich hracu.\n" + 
        "4. K zadostem o def nepouzivejte spam chat, ale prislusne sekce **perma-def** / **def-akce**!"
    })
}

//pinned messages
function pinnedMessages(){
    var kanal = bot_js.channels.get(kanalID);
    
    kanal.fetchPinnedMessages().then(function(messages){ //fetchPinnedMessages returns messages as a collection on success
        var message_array = messages.array();
        if (message_array.length === 0) {return}

        kanal.send("**__Pinned messages:__**\n");
        message_array.forEach(function(message_array){ //because of a curse casted upon this function, message_array must be in parameters, otherwise undefined error occurs
            var origin = (message_array.member.nickname == null) ? message_array.member.user.username : message_array.member.nickname; //members with no nickname fix
            var date = message_array.createdAt.toISOString().slice(0,10).split("-").reverse().join("/"); //formatting
            kanal.send(message_array.content + " (*" + origin +", " + date + "*)");
        })
        kanal.send("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
    }).catch(console.error); 
}

//discord.io message event
bot.on('message', function (user, userID, channelID, message, evt) {
    var bot_names = ["chatbot","testBot","pizzovina"];
    var messageString = message.toString();
    var messageStringWithoutSpaces = messageString.toLowerCase().replace(/\s+/g, '');
    if(messageStringWithoutSpaces.includes('tabul') && bot_names.indexOf(user) == -1) {
        bot.sendMessage({
            to: channelID,
            message: user + ', dulezite infromace, jako napriklad dokument s rezervacemi MC, se nachazi v sekci dulezite!'
        })
    }

    if(messageStringWithoutSpaces.includes('deff') && bot_names.indexOf(user) == -1) {
        bot.sendMessage({
            to: channelID,
            message: user + ', def se píše pouze s jedním f ;)'
        })
    }

    if(messageStringWithoutSpaces.includes('vesnic') && bot_names.indexOf(user) == -1) {
        bot.sendMessage({
            to: channelID,
            message: user + ", vesnice? Takze Brno?"
        })
    }

    if(messageStringWithoutSpaces.includes('dedin') && bot_names.indexOf(user) == -1) {
        bot.sendMessage({
            to: channelID,
            message: user + ", dedina? Takze Bratislava?"
        })
    }

    if(messageStringWithoutSpaces.includes('chatbot') && bot_names.indexOf(user) == -1) {
        bot.sendMessage({
            to: channelID,
            message: "Nepomlouvat!!!"
        })
    }

    /*
    var pozdrav = 0
    if(messageStringWithoutSpaces.includes('zdar') || messageStringWithoutSpaces.includes('cau') || messageStringWithoutSpaces.includes('ahoj') || messageStringWithoutSpaces.includes('cus') || messageStringWithoutSpaces.includes('dobrou') || messageStringWithoutSpaces.includes('gn') && user != "chatbot" && user != "testBot") {
        bot.sendMessage({
            to: channelID,
            message: "Zdar"
        })
        setTimeout(function(){ alert("Hello"); }, 3000);
    }
    */

   if(messageStringWithoutSpaces.includes('!funfact') && bot_names.indexOf(user) == -1) {
   
    var factMessages = ["Mafdet je naše láska, stará se o discord <3",
        "Banymu se nechce dělat",
        "Psycho je král, ale psst",
        "Myšička to tu vede <3",
        "Chatbot reaguje pouze na některé příkazy",
        "Paterese má asi 300 defařů",
        "Uhyb vás ne vždy zachrání, bacha na sekundovku",
        "Pokud posíláte jednu jednotku s herem s náplastí a ona umře, náplast ji oživí",
        "Po přídání plánů do hry se spotřeba ve vesnici s divem sníží na polovinu",
        "Psycho má jen jedny nervy",
        "Soky je jeden z mých nejoblíbenějších defařů <3",
        "Pokud útočíte na někoho z aliance, stále platí účinek standarty",
        "Víte že slovo \"Travian\" v němčině nic neznamená?",
        "Co po mně pořád chcete!?! Si nějakej funfact vymyslete samy!",
        "Věděli ste, že Babiš vyhrál volby, ikdyž ho údajně nikdo nevolil?",
        "Věděli ste, že smajlíci jsou naši poddaní?",
        "Víte, že Psycho rád spí 12 a více hodin vkuse?",
        "Víte, že Geminy zrakvil elpassovi 2 osadníky? :(",
        "Víte, že ženský tvar slova běžec je běžka?",
        "Víte, že skákal pes přes oves?",
        "Paterese je taky naše láska... (no homo)",
        "JackS chtěl taky hlášku",
        "Víte, že Jarda Jágr stále hraje jednu z nejlepších lig na světě?",
        "Americký sprinter Tyson Gay prý není gay... tak jasně tvle, vubec to nemá ve jméně",
        "Hádka se ženou je jako paralympiáda, ikdyž vyhraješ, tak seš kripl",
        "Táborák není občan města Tábor",
        "Středoškolák není ten, který chodí do školy jen ve středu",
        "Popelníček by nebyl?",
        "Je to kampaň! Celé je to kampaň!",
        "Za to může Kalousek, symbol korupce!"];
    var rand = factMessages[Math.round(Math.random() * factMessages.length)];
    bot.sendMessage({
        to: channelID,
        message: "Fact of the day: " + rand
    })
}
    /*
    if(messageStringWithoutSpaces.includes('pozva') && user != "chatbot" && user != "testBot") {
        bot.sendMessage({
            to: channelID,
            message: "Pozvat do ally? Pravdepodobne stale neni misto :( "
        })
    }

    if(messageStringWithoutSpaces.includes('!help') && user != "chatbot" && user != "testBot") {
        bot.sendMessage({
            to: channelID,
            message: "Pravidelne sledujte sekci dulezite!",
        })
        bot.sendMessage({
            to: channelID,
            message: "Vsechny dulezite reporty prosim vkladejte do sekce Reporty",
        })
        bot.sendMessage({
            to: channelID,
            message: "Pokud si nevite rady s nejakou herni mechanikou, mrknete do \"rady-do-zacatku\", nebo se zeptejte zkusenejsich hracu",
        })
        bot.sendMessage({
            to: channelID,
            message: "K zadostem o def nepouzivejte spam chat, ale prislusne sekce (perma, def akce)",
        })
    }
    */
});

function removeRoles(message) {
    var roles = ["OFF", "DEF","Off/Def"];
    roles.forEach(function(element) {
        message.member.removeRole(message.guild.roles.find(role => role.name === element));
    });
}


//discord.js TODO! - role
bot_js.on('message', message => {

    //Ensures bot doesn't reply to itself or non-commands
    if (message.author.bot) return;
    
    //help
    if (message.content.toLowerCase().substr(0,5) == "!help"){
        
        message.channel.send("Dostupné príkazy: \n" + 
        "!name \"nick\"- zmena mena, používajte bez \" \"...\n" +
        "!role \"OFF\" / \"DEFF\" / \"OFF/DEFF\"- zmena role, používajte bez \" \"...\n" +
        "!funfact - čo to asi tak môže byť...\n" + 
        "!tabul - oznamy\n");
        return;
    }

    if (message.content.toLowerCase().substr(0,5) == "!role" && !message.member.roles.find(role => role.name === "VEDENÍ") && !message.member.roles.find(role => role.name === "ADMIN")){
        if (message.content.toLowerCase().includes("off/def")) {
            if(message.member.roles.some(role => role.name === "Off/Def")) {
                return;
            }
            else {
                removeRoles(message);
                message.member.addRole(message.guild.roles.find(role => role.name === "Off/Def"));
                message.channel.send("Tvoja rola bola úspešne nastavená na Offenzivu / Defenzivu");
                return;
            }
        }

        else if (message.content.toLowerCase().includes("def")) {
            if(message.member.roles.some(role => role.name === "DEF")) {
                return;
            }
            else {
                removeRoles(message);
                message.member.addRole(message.guild.roles.find(role => role.name === "DEF"));
                message.channel.send("Tvoja rola bola úspešne nastavená na Defenzivu");
                return;
            }
        }
        else if (message.content.toLowerCase().includes("off")){
            if(message.member.roles.some(role => role.name === "OFF")) {
                return;
            }
            else {
                removeRoles(message);
                message.member.addRole(message.guild.roles.find(role => role.name === "OFF"));
                message.channel.send("Tvoja rola bola úspešne nastavená na Offenzívu");
                return;
            }
        }
        else {
            message.channel.send("Naozaj nechceš aby som ti nastavoval rolu ja, ver mi :)");
            return;
        }        
    }
    //name change
    if (message.content.toLowerCase().substr(0,5) == "!name" && !message.member.roles.find(role => role.name === "admin")){
        var array_nick = message.content.split(" ");

    if (message.content.includes("\n")){
        message.channel.send("Zadal si enter v strede mena, si ty normálny?!");
        return;
    }

    if (message.member.roles.some(role => role.name === "Off/Def")) {
        suffix = " (OFF/DEF)";
    } else if  (message.member.roles.some(role => role.name === "OFF")) {
        suffix = " (OFF)";
    }  else if  (message.member.roles.some(role => role.name === "DEF")) {
        suffix = " (DEF)";
    } else {
        message.channel.send("Zadaj si najprv rolu pomocou prikazu !role");
     //   return;
    }

    //space not found
    if (array_nick.length == 1){
        message.channel.send("Nezadal si nič, takže si to nechal na mňa. Odteraz si: Mluvící prdel ");
        message.guild.members.get(message.author.id).setNickname("Mluvící prdel" + suffix);
        return;
    }
    var nick = array_nick.slice(1).join(" ");

    //making sure nick wont get past 32 char
    if (nick.length >= 20){
        message.channel.send("Tvoj nick je príliš dlhý, nemal by si si to toľko kompenzovať...");
        return;
    };
    message.channel.send("Tvoje meno bolo úspešne zmenené na: " + nick + suffix);
    message.guild.members.get(message.author.id).setNickname(nick + suffix);
    }
    return;
});


//bot_js.login("NTQ3NTA0Mzg1MDMxNDA1NTY4.D07kPg.3oF-wyGESlBwJY7jUmX2zLwZ6Mo"); //Marek - pizzovina
bot_js.login("NTQ2NzUxNDE3MjYwNDQxNjUx.D1IRkA.uHH3fohtplh6Y6zsaUk05hgDJxk");



