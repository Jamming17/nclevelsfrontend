# Nine Circles Levels Frontend
This is the code repository for the frontend of my Nine Circles Level viewer for Geometry Dash. Currently, the website is not hosted anywhere as there are more features to be added, but this README will be updated when a link is available!

## Tools
This website is built using React with TypeScript. Tailwind CSS is used for styling.

## How can I run this myself?
This repository will not display any useful information unless you are also running the backend and database which can be viewed [here](https://github.com/Jamming17/nclevelsbackend).

To begin, open a command line terminal and navigate to the directory you want to start in. Then clone the repository and move into the cloned directory:
```bash
git clone https://github.com/Jamming17/nclevelsfrontend.git
cd nclevelsfrontend
```
Make sure you have [node.js](https://nodejs.org/en/download) installed on your device, then install the dependencies for the project:
```bash
npm install
```
Lastly, build and run the website locally:
```bash
npm run dev
```
By default, Vite will run the website on port 5173, so you can access the local site using this link: http://localhost:5137. If this doesn't work, replace the port number at the end of this link with whichever the command line shows or alternatively just press `o` then `Enter` on the command line to automatically open the site in your default browser.

## Current Features
This website currently connects to the backend API (also currently only hosted locally by me) which then manages level data all at the backend.

The frontend program displays a list of NC levels taken from the backend database which can be filtered by demon/non-demon and whether or not you want to view "extras".

## Planned Features
- Home, Info and Credits pages
- A button to allow you to view more information about a level
- Better level information display including level ID and length
- Toggleable light and dark mode
- Fallback display in case the servers (mine or RobTop's) are down
- Add coloured level tags and tag filters
- Filters for user coins
- Search bar