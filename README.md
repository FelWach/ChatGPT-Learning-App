# ChatGPT-Learning-App

## Expo CLI Commands
`npx expo start` for starting a Server on http://localhost:1900, that a client can use to interact with the bundler. The default bundler is Metro.

`Ctrl+C` to exit Server

### Terminal UI
`w` Open the project in a web browser (This may require webpack to be installed in your project)

`a` Open the project on a connected Android device

`i` Open the project in an iOS Simulator

`?` Show all Terminal UI commands

## Collaboration
### Intern
> [!NOTE]
> Bitte für jedes ToDo eigenen Branch und Pull request!

#### Branch naming
_feature/{page or feature or both: page-feature}_

Example: _feature/login-page_

#### .ENV
Bitte speichert euch folgende Environment-Variablen in die .env*.local

`IP_ADDRESS` wenn localhost oder 10.0.2.2 nicht klappt

`PORT`

## API Endpoints

### Generation

POST /upload 

benötigt uri, name, size im req.body um PDF an backend zu senden.

Gibt Anzahl der Seiten des PDF zurück-

---

POST /generateFromDocs 

generiert Fragen und Antworten zu dem zuvor geladenen PDF (/upload muss logischerweise zuerst gecallt werden).
Benötigt nbQuestions, pageStart, pageEnd im req.body

Falls pageStart **und** pageEnd gegeben sind, werden zu jeder Seite innerhalb pageStart und pageEnd nbQuestions Fragen/Antworten generiert.

Falls **nur** pageStart gegeben ist, werden nbQuestions Fragen/Antworten über Seite pageStart generiert.

Falls **weder** pageStart **noch** pageEnd gegeben ist, werden nbQuestions Fragen/Anwtorten zu random Seiten des PDF generiert.

---

POST /addToLearnsetFromDocs

added neue Fragen zu einem bestehenden Learnset nachdem ein PDF hochgeladen wurde.
Benötigt nbQuestions, pageStart, pageEnd, learnsetName im req.body

---

POST /generate

generiert Fragen und Antworten und speichert diese in die db (Name noch nicht passend und speichert bis user Login funktioniert alle Entries user 1)
Benötigt topic in request body

---

POST /generate/:topic

generiert Fragen und Antworten und speichert diese in die db (Name noch nicht passend und speichert bis user Login funktioniert alle Entries user 1)
topic in req params. (eventuell wird nur diese route benötigt)

---

POST /addToLearnset

added neue Fragen zu einem bestehenden Learnset. 
Benötigt topic, nbQuestions, userId im request Body

---

POST /setConfigurations

setzt die richtigen Konfigurator Einstellungen

### Entry

GET /entries

gibt alle Fragen und Antworten mit ID und topic zurück

---

GET /entries/:userId

gibt alle Fragen und Antworten eines Users zurück

---

GET /entries/:userId/:topic

gibt alle Fragen und Antworten eines Users zu einem Thema zurück

---

GET /entry/:id

gibt eine Frage mit id zurück

---

DELETE /deleteEntry/:id

löscht Eintrag mit id

---

PUT /updateQuestion/:id

ändert Frage mit id. Benötigt die neue Frage question im req.body

---

PUT /updateAnswer/:id

ändert Antwort mit id. Benötigt die neue Antwort answer im req.body

### User

POST /register

registriert einen neuen Nutzer mit name (user name), email, password und gibt dessen userId zurück

---

POST /login 

loggt den Nutzer mit name (user name) oder email und password ein und gibt dessen userId zurück

---

GET /topics/:userId

gibt alle Topics eines Users mit userId zurück

---

GET /users 

gibt alle Nutzer aus dem Table user zurück

---

POST /addUser 

fügt neuen Nutzer mit name (user name), email, password hinzu

---

DELETE /deleteUser/:id

Löscht einen Nutzer mit der ID

---

PUT /updateUser/:id

Updatet einen User mit der ID --> Benötigt im req body jeweils das zu updatende attribut name oder email oder password. Falls password geupdatet werden soll muss zudem oldPassword im req body angegeben werden. 

---

PUT /update/:userId/:oldTopic/:newTopic

Updatet Topic von einem User --> Benötigt im req body jeweils das zu updatende Topic und das neue Topic
