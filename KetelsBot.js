
const fs = require('fs');
const Discord = require('discord.js');


// nieuwe client
const { prefix, token, name } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`${name} is ready!`);
});

client.once('error', () => {
	console.log('KetelsBot is experiencing an error!');
});


        
//Write code having to do with messages in here
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    //splits prefix van args
    const args = message.content.slice(prefix.length).trim().split(/ +/);
   	const command = args.shift().toLowerCase();


    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
      }


    else if (command === 'bot') {
        client.commands.get('bot').execute(message, args);
      }

	  else if (command === `up` || command === `online` || command === `offline` || command === `uptime`) {

      //uptime berekenen
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

		message.channel.send('Ketels is hier!');
    message.channel.send(`Ketels is al ${days} dagen, ${hours} uren, ${minutes} minuten and ${seconds} seconden aanwezig in ${message.guild.name}.`);
    }

    else if(command === `fluit`) {
      client.commands.get('fluit').execute(message, args);
    } 
    
    else if (command === 'latijn' || command === 'l') {
      client.commands.get('latijn').execute(message, args);
    }

    else if (command === 'leerling') {
        client.commands.get('leerling').execute(message, args); 
    }
        
    if (command === 'betekenis' || command === 'b' || command === 'watis'){

        client.commands.get('betekenis').execute(message, args);
    }
    else if (command === 'help' || command == '?' || command == 'h'){

        client.commands.get('help').execute(message, args);      
    }
  
});


//inloggen met token
client.login(token);

