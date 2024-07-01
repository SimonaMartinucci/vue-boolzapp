const { createApp } = Vue;

createApp({
    data() {
        return {
            activeContactIndex: 0,
            activeMessageIndex: 0,
            inputMessage: '',
            inputSearch: '',
            filteredArray: [],
            menuIndex: null,
            autoResponse: '',
            stoScrivendo: false,
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/male1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/male2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/male3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: 'img/male4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: 'img/male5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: 'img/female2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: 'img/male6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: 'img/male7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

            
        }
    },
    methods: {
        // recupero solo orario
        getTime(dateTime) {
            return dateTime.split(' ')[1].slice(0, 5);
        },

        // recupero solo data
        getDate(dateTime) {
            return dateTime.split(' ')[0].slice(0, 10);
        },

        activeContact(index) {
            this.activeContactIndex = index;
        },

        activeMessage(index) {
            this.activeMessageIndex = index;
        },

        // recupero tramite API delle risposte casuali
        responseGenerator() {
            return axios.get('https://api.quotable.io/random')
                .then((response) => {
                    return this.autoResponse = response.data.content;
                })
                .catch((error) => {
                    console.error('Error fetching random quote:', error);
                });
        },

        // inserisco funzione per aggiungere messaggio con tasto enter
        addMessage() {
            // metto condizione in modo da non far inviare messaggi vuoti
            if(this.inputMessage !== '') {
                // genero data e ora di oggi
                const now = new Date();

                // formatto data e ora in modo che corrispondano al formato di tutte le altre dell'array
                const formattedTime = new Intl.DateTimeFormat('it-IT', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).format(now);

                // creo nuovo oggetto
                const newMessage =
                {
                    date: `${now.toLocaleDateString('it-IT')} ${formattedTime}`,
                    message: this.inputMessage,
                    status: 'sent'
                };

                // inserisco l'oggetto nell'array
                this.contacts[this.activeContactIndex].messages.push(newMessage);
            }

            // svuoto ogni volta il campo di inserimento dei messaggi
            this.inputMessage = '';

            // faccio comparire scritta 'sta scrivendo' mentre si aspetta risposta 
            setTimeout(this.stoScrivendo = true, 1000);

            // faccio partire funzione di risposta automatica dopo 2 secondi
            setTimeout(this.autoText, 2000);
        },

        // funzione risposta automatica
        autoText() {
            // // stesso procedimento precedente per la data e l'ora attuale
            const now = new Date();

                const formattedTime = new Intl.DateTimeFormat('it-IT', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).format(now);

            this.responseGenerator()
                    .then((quote) => {
                        // Ottenuta la citazione, aggiungo il messaggio automatico
                        const autoMessage = {
                            date: `${now.toLocaleDateString('it-IT')} ${formattedTime}`,
                            message: quote,
                            status: 'received'
                        };

                        // pusho l'oggetto nell'array
                        this.contacts[this.activeContactIndex].messages.push(autoMessage);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            // rimetto 'ultimo accesso' al posto di 'sta scrivendo'
            setTimeout(this.stoScrivendo = false, 2000);
        },

        // funzione per barra di ricerca
        filteredContacts() {
            // creo variabile e faccio in modo di avere sempre e solo lettere minuscole indipendentemente dall'input dell'utente
            const search = this.inputSearch.toLowerCase();

            // utilizzo filter e faccio comparazione tra input dell'utente e nome dei contatti
            this.filteredArray = this.contacts.filter(contact => contact.name.toLowerCase().includes(search));
        },

        activeMenu(index) {
            // se il menu è già aperto lo chiudo rimettendolo a null, altrimenti prende l'indice del messaggio sotto il quale voglio aprire menu
            this.menuIndex = this.menuIndex === index ? null : index;
        },

        deleteMessage(index) {
            // cancello messaggio
            this.contacts[this.activeContactIndex].messages.splice(index, 1);
            // se cancello messaggio, chiudo automaticamente il menu
            if (this.menuIndex === index) {
                this.menuIndex = null; 
            };
        },

        
    },
    
    
    mounted() {
        // faccio in modo che vengano visualizzati tutti i contatti al caricamento della pagina
        this.filteredArray = this.contacts;
    }
}).mount('#app');