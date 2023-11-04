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
_feature/frontend/{page or feature or both: page-feature}_

Example: _feature/frontend/login-page_

#### .ENV
Bitte speichert euch folgende Environment-Variablen in die .env damit nicht bei jedem push die api calls gechanged werden müssen in dev

`OPENAI_API_KEY`

`IP_ADDRESS` wenn localhost oder 10.0.2.2 nicht klappt

`PORT`
