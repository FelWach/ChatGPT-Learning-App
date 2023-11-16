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
Bitte speichert euch folgende Environment-Variablen in die .env damit nicht bei jedem push die api calls gechanged werden müssen in dev

`OPENAI_API_KEY`

`IP_ADDRESS` wenn localhost oder 10.0.2.2 nicht klappt

`PORT`

## API Endpoints

POST /generateAnswer 

generiert Fragen und Antworten und speichert diese in die db (Name noch nicht passend und speichert bis user Login funktioniert alle Entries user 1)

POST /setConfigurations

setzt die richtigen Konfigurator Einstellungen

GET /entries

gibt alle Fragen und Antworten mit ID und topic zurück

GET /entries/:userId

gibt alle Fragen und Antworten eines Users zurück

GET /entries/:userId/:topic

gibt alle Fragen und Antworten eines Users zu einem Thema zurück

GET /entry/:id

gibt eine Frage mit id zurück

DELETE /deleteEntry/:id

löscht Eintrag mit id
