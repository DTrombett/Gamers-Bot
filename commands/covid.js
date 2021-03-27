const error = require('../config/error');
var Command = require('../config/Command');
const { MessageEmbed, Message } = require('discord.js');
const normalize = require('../config/normalize');

var command = new Command('covid',

    /**
     * Scopri le informazioni riguardo la pandemia di Covid-19!
     * @param {Message} message - The message with the command
     * @param {Array<String>} args - The args of this message
     * @param {String} prefix - The prefix used in the message
     */
    async function (message, args) {
        try {
            const { covidData } = require('../config/covid');
            const covidEmbed = new MessageEmbed()
                .setURL('https://github.com/pcm-dpc/COVID-19/raw/master/schede-riepilogative/regioni/dpc-covid19-ita-scheda-regioni-latest.pdf');
            var element;
            if (args.length) {
                let arg = normalize(args.join(' '));
                if (arg.length === 1) try {
                    return message.channel.send('Inserisci una ricerca di almeno 2 caratteri!');
                } catch (message_1) {
                    return console.error(message_1);
                }
                let regione, regioni = covidData.regioni.filter(r => {
                    return normalize(r.nome).includes(arg) || r.codice == arg || arg.startsWith(r.nuts[2].toLowerCase()) || !!r.province.find(p => p.codice == arg || p.sigla.toLowerCase() == arg || normalize(p.nome).includes(arg));
                }).array();
                if (regioni.length === 1) regione = regioni[0];
                else if (regioni.length === 0) try {
                    return message.channel.send('Non ho trovato questa regione!');
                } catch (message_1) {
                    return console.error(message_1);
                }
                else {
                    let sent = message.channel.send(`Ho trovato più regioni corrispondenti alla tua ricerca! Scrivi il numero della regione corretta o 0 per cancellare il comando:\n\n${regioni.map((r, i) => `${i + 1}. **${r.nome}**`).join('\n')}`);
                    let filter = m => m.author.id === message.author.id && 0 <= m.content <= regioni.length
                    let msg = await message.channel.awaitMessages(filter, {
                        time: 60000,
                        max: 1,
                        errors: ['time', 'max']
                    })
                        .then(c => c.first())
                        .catch(console.error);
                    sent.then(s => s.delete());
                    if (msg) msg.delete();
                    if (!msg || msg.content == '0') {
                        message.delete();
                        return message.reply('comando cancellato!')
                            .then(m => m.delete({ timeout: 10000 }))
                            .catch(console.error);
                    }
                    regione = regioni[msg.content - 1];
                }
                element = regione;
                const { province } = regione;
                if (province.size > 1) {
                    const array = province.array();
                    for (let i = 0; i < array.length; i++) {
                        const { nome, sigla, casi } = array[i];
                        covidEmbed.addField(`${nome} (${sigla})`, `**Casi totali**: ${casi}`, true);
                    }
                }
            } else {
                const avatar = message.author.buildAvatar();
                covidEmbed.setAuthor(message.author.tag, avatar, avatar);
                element = covidData;
            }
            const { nome, color, image, cases, tamponi, note, date } = element;
            const zone = element.zone;
            const { ricoveratiConSintomi, terapiaIntensiva, ospedalizzati, isolamento, positivi, variazione, incremento, dimessiGuariti, deceduti, totali, daSospetto, daScreening, daTestMolecolare, daTestAntigenico } = cases;
            const avatar = message.author.buildAvatar();
            covidEmbed.setAuthor(message.author.tag, avatar, avatar);
            covidEmbed
                .setTitle(`Dati Covid per ${nome || 'Italia'}`)
                .setThumbnail(image)
                .setColor(color || 'ORANGE')
                .setFooter('Ultimo aggiornamento')
                .setTimestamp(date);
            let description = [`**Ricoverati con sintomi**: ${ricoveratiConSintomi}`, `**Totale di persone ospedalizzate**: ${ospedalizzati}`, `**Isolamento domiciliare**: ${isolamento}`, `**Totale attualmente positivi**: ${positivi}`, `**Variazione sugli attualmente positivi**: ${variazione}`, `**Incremento casi totali (rispetto al giorno precedente)**: ${incremento}`, `**DIMESSI GUARITI**: ${dimessiGuariti}`, `**DECEDUTI**: ${deceduti}`, `**CASI TOTALI**: ${totali}`];
            if (daSospetto !== null) description.push(`**Casi identificati da sospetto diagnostico**: ${daSospetto}`);
            if (daScreening !== null) description.push(`**Casi identificati da screening**: ${daScreening}`);
            description.push(`**Casi identificati da test molecolare**: ${daTestMolecolare}`, `**Casi identificati da test antigenico rapido**: ${daTestAntigenico}`, `**Terapia intensiva (ricoverati)**: ${terapiaIntensiva.ricoverati}`, `**Terapia intensiva (ingressi)**: ${terapiaIntensiva.ingressi}`, `**Totale tamponi efettuati**: ${tamponi.totale}`, `**Totale persone testate**: ${tamponi.persone}`, `**Tamponi processati con test molecolare**: ${tamponi.molecolari}`, `**Tamponi processati con test antigenico rapido**: ${tamponi.antigenici}`);
            if (note) description.push(`**Note**: ${note}`);
            if (cases.note) description.push(`**Note casi**: ${cases.note}`);
            if (tamponi.note) description.push(`**Note tamponi**: ${tamponi.note}`);
            covidEmbed.setDescription(description.join('\n'));
            if (zone) for (let colore in zone) covidEmbed.addField(`Regioni in zona ${colore}`, zone[colore].array().map(v => `• ${v.nome}`).join('\n') || 'Nessuna', true);
            return message.channel.send(covidEmbed)
                .catch(console.error);
        } catch (err) {
            error(err, message);
        }
    })
    .setDescription("Scopri le informazioni riguardo la pandemia di Covid-19!")
    .setHelp('Usa questo comando per controllare l\'andamento della pandemia in Italia. Puoi anche specificare la regione per vedere le informazioni specifiche.')
    .setUsage('(regione)')
    .addExample('', ' Abruzzo', ' Milano')
    .addAlias('corona', 'virus', 'coronavirus', 'covid-19')
    .setCooldown(2000);

module.exports = command;