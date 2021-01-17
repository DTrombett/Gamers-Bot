module.exports = {
    name: 'help',
    description: "Scopri tutti i comandi del bot!",
    async execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command) {

       const page1 = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Help message')
        .setURL('https://www.youtube.com/c/SparxTV')
        .setDescription('Ecco i comandi!')
        .addFields(
            {name:'help', value: 'Mostra questo messaggio'},
            {name:'random', value: 'Invia un saluto casuale'},
            {name:'ping', value: 'Pong!'},
            {name:'tutorial', value: 'Vedi come partecipare ai tornei'},
            {name:'mute', value: 'Muta un membro per un periodo di tempo'},
        )
        .setFooter('Divertiti!');

        const page2 = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Help message')
        .setURL('https://www.youtube.com/c/SparxTV')
        .setDescription('Ecco i comandi!')
        .addFields(
            {name:'unmute', value: 'Smuta un membro'},
            {name:'kick', value: 'Caccia un utente'},
            {name:'clear', value: 'Cancella dei messaggi'},
            {name:'avatar', value: 'Vedi l\'avatar di un utente'},
        )
        .setFooter('Divertiti!');
        
      let sent = await message.channel.send(page1);
       sent.react('1️⃣').then(() => sent.react('2️⃣'));
       
const filter = (reaction, user) => {
	return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
};

await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	 let userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
try {
	for (let reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
	 await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};
await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '1️⃣') {
			sent.edit(page1);
		} else {
			sent.edit(page2);
		}
	})
	.catch(collected => {
 console.log(collected);
	});
	  
 try {
	for (reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error(error);
};

}}