const { Collection } = require("discord.js");
const images = require("./covidImages");

/**
 * Base per i dati del Covid
 */
class CovidData {

    constructor(raw) {

        /**
         * Data ultimo aggiornamento
         * @type {Date}
         */
        this.date = new Date(raw.data);

        /**
         * Sigla stato
         * @type {String}
         */
        this.sigla = raw.stato;

        /**
         * Casi Covid-19 confermati
         * @type {CovidCases}
         */
        this.cases = new CovidCases(raw);

        /**
         * Tamponi
         * @type {Tamponi}
         */
        this.tamponi = new Tamponi(raw);

        /**
         * Note
         * @type {?String}
         */
        this.note = raw.note || null;

        this.raw = raw;
    }
}

/**
 * Casi Covid-19 confermati
 */
class CovidCases {

    constructor(data) {

        /**
         * Ricoverati con sintomi
         * @type {Number}
         */
        this.ricoveratiConSintomi = data.ricoverati_con_sintomi;

        /**
         * Dati riguardo la terapia intensiva
         * @typedef {Object} TerapiaIntensiva
         * @property {Number} ricoverati - Totale ricoverati
         * @property {Number} ingressi - Ingressi del giorno
         */

        /**
         * Terapia intensiva
         * @type {TerapiaIntensiva}
         */
        this.terapiaIntensiva = {
            ricoverati: data.terapia_intensiva,
            ingressi: data.ingressi_terapia_intensiva
        }

        /**
         * Totale di persone ospedalizzate
         * @type {Number}
         */
        this.ospedalizzati = data.totale_ospedalizzati;

        /**
         * Isolamento domiciliare
         * @type {Number}
         */
        this.isolamento = data.isolamento_domiciliare;

        /**
         * Totale attualmente positivi
         * @type {Number}
         */
        this.positivi = data.totale_positivi;

        /**
         * Variazione sugli attualmente positivi
         * @type {Number}
         */
        this.variazione = data.variazione_totale_positivi;

        /**
         * Incremento casi totali (rispetto al giorno precedente)
         * @type {Number}
         */
        this.incremento = data.nuovi_positivi;

        /**
         * DIMESSI GUARITI
         * @type {Number}
         */
        this.dimessiGuariti = data.dimessi_guariti;

        /**
         * DECEDUTI
         * @type {Number}
         */
        this.deceduti = data.deceduti;

        /**
         * CASI TOTALI
         * @type {Number}
         */
        this.totali = data.totale_casi;

        /**
         * Casi identificati da sospetto diagnostico
         * @type {?Number}
         */
        this.daSospetto = data.casi_da_sospetto_diagnostico || null;

        /**
         * Casi identificati da screening
         * @type {?Number}
         */
        this.daScreening = data.casi_da_screening || null;

        /**
         * Casi identificati da test molecolare
         * @type {Number}
         */
        this.daTestMolecolare = data.totale_positivi_test_molecolare;

        /**
         * Casi identificati da test antigenico rapido
         * @type {Number}
         */
        this.daTestAntigenico = data.totale_positivi_test_antigenico_rapido;

        /**
         * @type {?String}
         */
        this.note = data.note_casi || null;

    }
}

/**
 * Dati riguardo i tamponi
 */
class Tamponi {

    constructor(data) {

        /**
         * Totale tamponi efettuati
         * @type {Number}
         */
        this.totale = data.tamponi;

        /**
         * Totale persone testate
         * @type {Number}
         */
        this.persone = data.casi_testati;

        /**
         * Tamponi processati con test molecolare
         * @type {Number}
         */
        this.molecolari = data.tamponi_test_molecolare;

        /**
         * Tamponi processati con test antigenico rapido
         * @type {Number}
         */
        this.antigenici = data.tamponi_test_antigenico_rapido;

        /**
         * @type {?String}
         */
        this.note = data.note_test || null;
    }
}

/**
 * Dati Covid per uno stato
 */
class Stato extends CovidData {

    /**
     * @param {Object} raw - Dati riguardo lo stato
     * @param {Array<Object>} regioni - Array delle regioni di questo stato
     * @param {Array<Object>} province - Array di province di questo stato
     */
    constructor(raw, regioni, province) {
        super(raw);
        province = province.filter(p => !!p.codice_nuts_3);

        /**
         * Immagine dell'Italia
         * @type {String}
         */
        this.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/COVID-19_Italy_-_Cases_per_capita.svg/4096px-COVID-19_Italy_-_Cases_per_capita.svg.png';

        /**
         * Regioni di questo stato
         * @type {Collection<String, Regione>}
         */
        this.regioni = new Collection();
        for (let i = 0; i < regioni.length; i++) {
            const el = regioni[i];
            this.regioni.set(el.denominazione_regione, new Regione(el, province.filter(p => p.denominazione_regione === el.denominazione_regione), this));
        }

        this.province = new Collection();
        for (let i = 0; i < province.length; i++) {
            const el = province[i];
            this.province.set(el.denominazione_provincia, new Provincia(el, this, this.regioni.get(el.denominazione_regione)));
        }
    }

    toJSON() {
        return JSON.stringify({
            stato: this.raw,
            regioni: this.regioni.map(r => r.raw),
            province: this.province.map(p => p.raw)
        })
    }
}

/**
 * Dati riguardo una provincia
 */
class Provincia {

    /**
     * @param {Object} raw - Dati riguardo questa provincia
     * @param {Stato} stato - Lo stato di questa provincia
     * @param {Regione} regione - La regione di questa provincia
     */
    constructor(raw, stato, regione) {

        /**
         * La regione di questa provincia
         * @type {Regione}
         */
        this.regione = regione;

        /**
         * Nome della provincia
         * @type {String}
         */
        this.nome = raw.denominazione_provincia;

        /**
         * Lo stato
         * @type {Stato}
         */
        this.stato = stato;

        /**
         * Codice della provincia
         * @type {Number}
         */
        this.codice = raw.codice_provincia;

        /**
         * La sigla di questa provincia
         * @type {String}
         */
        this.sigla = raw.sigla_provincia;

        /**
         * Casi totali in questa provincia
         * @type {Number}
         */
        this.casi = raw.totale_casi;

        /**
         * Raw data per questa provincia
         * @type {Object}
         */
        this.raw = raw;
    }

    /**
     * Codici Nuts della provincia
     * @returns {Array<String>}
     */
    get nuts() {
        return [this.regione.nuts[0], this.regione.nuts[1], this.regione.nuts[2], raw.codice_nuts_3];
    }
}

/**
 * Dati Covid riguardo una regione
 */
class Regione extends CovidData {

    /**
     * @param {Object} regione - Dati riguardo una regione
     * @param {Array<Object>} province - Dati riguardo le province di questa regione
     * @param {Stato} stato - Stato a cui si riferisce
     */
    constructor(regione, province, stato) {
        super(regione);

        /**
         * Lo stato di questa regione
         * @type {Stato}
         */
        this.stato = stato;

        /**
         * Nome regione
         * @type {String}
         */
        this.nome = regione.denominazione_regione;

        /**
         * Il colore della regione che indica il rischio
         * @type {String}
         */
        this.color = require("./covid").regions[this.nome];

        /**
         * Un'immagine di questa regione
         * @type {String}
         */
        this.image = images[this.nome];

        /**
         * Codice regione
         * @type {Number}
         */
        this.codice = regione.codice_regione;

        /**
         * Indica delle coordinate tramite latitudine e longitudine
         * @typedef {Object} Coordinate
         * @property {Number} lat - Latitudine
         * @property {Number} long - Longitudine
         */

        /**
         * Coordinate della regione
         * @type {Coordinate}
         */
        this.coordinate = {
            lat: regione.lat,
            long: regione.long
        }

        /**
         * Province appartenenti a questa regione
         * @type {Collection<String, Provincia>}
         */
        this.province = new Collection();
        for (let i = 0; i < province.length; i++) {
            const el = province[i];
            this.province.set(el.denominazione_provincia, new Provincia(el, this.stato, this));
        }
    }

    /**
     * Codici Nuts della regione
     * @returns {Array<String>}
     */
    get nuts() {
        return [this.stato.sigla.substr(0, 2), this.raw.codice_nuts_1, this.raw.codice_nuts_2];
    }
}

exports.CovidData = CovidData;
exports.CovidCases = CovidCases;
exports.Tamponi = Tamponi;
exports.Stato = Stato;
exports.Regione = Regione;
exports.Provincia = Provincia;