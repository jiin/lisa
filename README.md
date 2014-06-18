# Il colore della musica
## Lisa.js 

### 1. Introduzione


> “ Se durante un concerto avessimo la possibilità di osservare l'aria, 
mentre vibra simultaneamente influenzata dalle voci e dagli strumenti, 
con grande stupore vedremmo colori organizzarsi e muoversi in essa. ” 
- Athanasius Kircher

Nella storia ben pochi fenomeni hanno avuto la capacità di attrarre e coinvolgere artisti, musicisti e, contemporaneamente, scienziati e filosofi, come è stata la correlazione tra suono e colore. L’idea generale che tutto il creato sia permeato da leggi che si ripetono costantemente all’interno dei diversi fenomeni fisici esperibili ha avuto un’importanza considerevole nello sviluppo delle teorie sulla relazione tra suono e colore. Gli antichi Greci furono i primi a costruire una scala di colori divisa in sette parti, in analogia con le sette note della scala musicale e i sette pianeti conosciuti e la teoria aristotelica del colore è stata considerata valida fino al XVII secolo.

![Imgur](http://i.imgur.com/jfQLGO1.jpg)

Un diverso aspetto del problema, ossia la relazione tra suono e forma, venne affrontato dal fisico e musicista tedesco Ernst Chladni (1756-1827). Egli fu il primo ad intuire che le vibrazioni sonore interagiscono con la materia al punto da creare delle vere e proprie forme geometriche. Ponendo della sabbia su un supporto metallico o di vetro, di forma rotonda o quadrata, imperniato su uno stelo, e facendo in modo che questo potesse essere messo in vibrazione attraverso l’utilizzo di un arco di violino, riuscì a riprodurre i suoni dandone un’immagine dinamica. 
Un fenomeno molto ignorato e, al contempo, molto interessante riguardante la percezione del colore è la sinestesia.
L’interesse per la sinestesia compare agl’inizi dell’ 800 quando venne inizialmente considerata come un mero espediente poetico o un’invenzione della fantasia. 
È solo verso gli anni 70/80 dello stesso secolo che attenti studi psicologici legittimarono il fenomeno e furono presto seguiti dall’introduzione della parola “sinestesia”. Dobbiamo tuttavia aspettare il 1980 prima che vengano effettuati studi neurofisiologici su soggetti sinestetici. 
Questi studi dimostrarono che in concomitanza di esperienze sinestetiche, il cervello attiva contemporaneamente aree sensoriali differenti e le moderne tecniche di neuro immagine funzionale, ne offrono la dimostrazione.
Accade perciò che, ad esempio, le zone adibite alla percezione uditiva si attivino contemporaneamente a quelle visive o olfattive, consentendo una sorta di doppia percezione dello stimolo normalmente percepito ed analizzato da un senso solo.

### 2. Relazione tra suono e colore

Il suono è la sensazione data dall'oscillazione delle particelle lungo la direzione di propagazione dell'onda, generata da un oggetto, chiamata sorgente sonora. 

![Imgur](http://i.imgur.com/muO1fGp.jpg)

Un suono, in quanto onda, è caratterizzato da una frequenza, ovvero il numero di oscillazioni al secondo misurate in Hertz (Hz) e da un'intensità, cioè il rapporto tra la potenza di un'onda sonora e l'area che copre misurata in Watt al metro quadro (W/m2), che a sua volta consente di classificare i suoni a seconda dell'altezza. L'altezza è la frequenza percettibile da un individuo, dipende in gran parte dalla frequenza del suono stesso e, nel caso dell'individuo umano, la frequenze percettibili dall'orecchio vanno da un minimo di 16 Hz ad un massimo di 20000 Hz. 
Tuttavia la musica utilizza soltanto determinati suoni la cui frequenza è compresa tra a i     64 Hz e gli 8000 Hz. 
Le onde sonore sono comunemente rappresentate in un piano cartesiano, riportante il tempo (t) sull'asse delle ascisse e il coefficente di spostamento delle particelle (s) su quella delle ordinate.
Dunque, comunemente, vediamo il suono "puro" come una sinusoide, e vediamo la musica come un insieme di suoni, dunque di sinusoidi, assemblate armonicamente tra loro. 
Il suono non è l'unico fenomeno fisico rappresentabile mediante una onda, anche la luce può essere rappresentato come tale.
La luce, dal latino lux, è la parte dello spettro elettromagnetico visibile dall'uomo. 
Tale intervallo combacia con ila fetta centrale della regione spettrale della luce emessa dal Sole che riesce ad arrivare al suolo passando attraverso l'atmosfera. 
I limiti dello spettro visibile all'occhio umano non sono uguali per tutte le persone, ma variano soggettivamente e possono raggiungere lunghezze d'onda molto diverse, per esempio per raggi infrarossi o ultravioletti.
La presenza contemporanea di tutte le lunghezze d'onda visibili, in quantità proporzionali a quelle della luce solare, forma la luce bianca.

![Imgur](http://i.imgur.com/pR9eSag.jpg)

Il colore è la percezione visiva ottenuta dall'assorbimento delle radiazioni elettromagnetiche di determinate lunghezze d'onda comprese nello spettro visibile. 
Ad ogni frequenza corrisponde un determinato colore del visibile. 
Dunque, dato che sia la luce che il suono si basano su moti ondulatori è possibile trovare una relazione tra le onde del suono e quelle della luce, determinando un colore per ogni suono.
Il modello di colori più utilizzato in informaitca per la rappresentazione di un colore è il modello RGB (Red Green Blue). 
Per rappresentare un colore secondo tale modello si utilizza un vettore di tre elementi che indicano rispettivamente la componente rossa, quella verde e quella blu di tale colore in una scala da 0 a 255 per un totale di 2563= 16777216 colori.
Per esempio per avere il rosso avremmo (255, 0, 0) e per il viola acceso avremmo (255, 0, 255) dato che è la fusione pura tra rosso e blu.
Per il progetto ho acquisito in ingresso un segnale sinusoidale da un file compresso in formato mp3, scomponendolo nel regime della frequenza ottengo un vettore di numeri a virgola mobile da 8 bit ciascuno di n elementi (dove n nel mio caso è sempre 1024).
Ogni elemento rappresenta i valori delle frequenze nell'intervallo di campionamento, che ho impostato a 0.8 secondi.
Le frequenze vengono ricavate attraverso la FFT (Fast Fourier Transform), un algoritmo ottimizzato per calcolare la DFT (Discrete Fourier Transform) definita come:

![Imgur](http://i.imgur.com/NuIAkxD.png)

Che permette di elaborare funzioni discrete e fornisce una descrizione periodica nel dominio della frequenza.

Una volta ottenuto questo agglomerato di valori divido in tre parti uguali il segnale in regime di frequenza e calcolo, per ogni parte, il valore medio dell'onda, che corrisponderà al coefficente di ogni valore sul modello RGB.
Ovviamente, essendo l'RGB a valori compresi tra 0 e 255 si deve effettuare una proporzione, ovvero: 

![Imgur](http://i.imgur.com/CN3L7bT.gif)

In più ho introdotto una costante di smorzamento indicata con A per evitare che le frequenze più alte dominino su quelle più basse restituendo colori troppo tendenti al colore blu pur restando nella zonda del verde. Quindi la formula del colore C, sarà la seguente:

![Imgur](http://i.imgur.com/ytlXh3z.gif)

Dove m è la media dei valori per ogni sezione dell'onda, la A è, come già detto in precedenza, il coefficente di smorzamento (tendenzialmente adotto il valore 0.4), Pn è il reciproco dell'indice indicante la parte dell'onda da analizzare, che può assumere solo i valori 3, 2 e 1, serve, assieme al coefficente di smorzamento, per ammortizzare le frequenze troppo alte e dare spazio alle basse. 
Vmax invece è il valore massimo tra i valori della sezione dell'onda. 
Tale espressione ritornerà un valore da 0 a 255 che andrà a rappresentare il colore per il dato campionamento sonoro. 


### 3. Implementazione pratica

Lisa.js è una applicazione che concretizza i calcoli visti nel precedente paragrafo, analizzando un file mp3 (formato scelto perché statisticamente denotato come più comunemente utilizzato per comprimere file audio destinati all'ascolto), disegnando il grafico delle onde sotto il dominio del tempo e della frequenza e cambiando dinamicamente colore di sfondo a seconda del colore che corrisponderà al suono, in modo da ottenere un effetto globale e coreografico della sinestesia. 
 
Il progetto è interamente realizzato con le moderne tecnologie HTML, CSS e Javascript. 

HTML (HyperText Markup Language) è un linguaggio di formattazione utilizzato per definire la struttura della pagina web. Ogni elemento della pagina è descritto e creato da un tag, un tag può essere caratterizzato da uno o più attributi.

CSS (Cascading StyleSheet) è un meta-linguaggio utilizzato per meglio definire lo stile dei componenenti HTML come i colori, i font utilizzati o il posizionamento all'interno della pagina.

Javascript invece è il linguaggio che definisce la logica dell'applicazione, che carica e analizza il file mp3, che permette di disegnare i grafici e campionare i colori. Per l'interpretazione del file utilizzo le WebAudio API, ovvero determinate funzioni che permettono di trasformare in valori interpretabili dal computer (byte in questo caso) i suoni che compongono la canzone scelta. Una volta ottenuti i valori necessari alla determinazione del colore si disegna il grafico utilizzando Canvas, una estensione di HTML che permette il disegno e il rendering dinamico di immagini gestibili direttamente da Javascript.
Il primo grafico, quello del tempo, è stato realizzato rappresentato sull'asse delle ascisse la porzione di tempo in riproduzione e sull'asse delle ordinate l'ampiezza dell'onda sonora, ottenuta dall'analisi. Il secondo invece, quello in dominio della frequenza è ottenuto disegnando sull'asse delle ascisse la scala che parte dalla frequenza minima e arriva a quella massima (quindi dalla bassa alla alta frequenza) e in quella delle ordinate l'intensita in dB del segnale che, di default, va da -30 a -100 dB.
Ad ogni frame il grafico si cancella e si ridisegna popolato da nuovi colori, e consecutivamente anche il colore di sfondo cambia. Il codice e la documentazione in formato markdown è disponibile online open-source, sotto licenza GPL sul mio account github: https://github.com/jiin/lisa


### 4. Conclusione

Nella conclusione vorrei solo precisare che la metodologia per il calcolo del colore associato al suono è stata, almeno credo, una mia trovata.  Ciò comporta una parziale erroneità a livello fisico/scientifico, ma comunque suppongo che dal punto di vista logico/algoritmico il ragionamento sia corretto e i risultati siano soddisfacenti. 
Ho scelto questo argomento perché sono fermamente convinto che la musica sia, talvolta, più di un'oscillazione di un corpo, come un libro è più di un insieme di lettere conseguenti e un quadro è più di un miscuglio di colori.
L'accostamento tra colori e musica può essere meraviglioso se realizzato bene, fornire sensazioni e cercare di stimolare la sinestesia dell'individuo sono attività benefiche per l'essere umano.
Ringrazio tutti i professori e tutte le altre persone che mi hanno condotto nel percorso che mi ha fatto scrivere questa tesina e programmare Lisa.js, ogni canzone ha bisogno di qualche accordo per sostenere la melodia. 

Bibliografia:

    Mozilla.org - developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
	Wikipedia.org – wikipedia.org
	Relationship between light and sound - youtube.com/watch?v=cj4MOOCFspk
	Cafepsicologico.it (Sinestesia) – cafepsicologico.it/sinestesia/
	Corrispondenze tra suoni e colori –digilander.libero.it/initlabor/grasso1/corrispondenze1.html


