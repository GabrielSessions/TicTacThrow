# TicTacThrow

EN1 Final Project

Project Description: This variation of three player tic tac toe is aimed to combine the strategy of a larger tic tac toe game and physical elements/uncertainty. The game is played on a 4x4 board with three players and three types of colored ping pong balls (RED, BLUE, and GREEN). The first player to get three of their pieces in a row wins (horizontally, vertically, or diagonally). The main way our game differs from “normal” 3 player Tic-Tac-Toe is that players must attempt to toss their pieces using a robot.
The main robot will be an arm attached to a motor that can rotate. The arm will be able to aim and toss. The website allows the player to change the angle and the power of the toss in order to aim for a 4x4 open grid.

## How to Run a Game ##
1. Open the gamemaster page and enter the correct master password to login. Ask Gabriel if you don't know the password. Gamemaster Page Link: https://gabrielsessions.github.io/TicTacThrow/gamemaster.html
2. Open three player pages, enter some names, and join the lobby with three unique browsers or devices. NOTE: If you have all players on the same window/browser, you could lose access to that player's control interface if you close the tab. Player Page Link (Open 3 Times): https://gabrielsessions.github.io/TicTacThrow/players.html#
3. On the gamemaster page, click the "Add to Game" Button for each player you want to add. Please note there is no feedback when you add a player, but the site will notify you if you have already added a given player to the game. If you mess up the process at any point, you can clear the lobby using the "Reset Lobby" button which will kick all players out of the lobby.
4. Connect the master page to the SPIKE Prime using the Service Dock at the top of the gamemaster screen.
5. Once all players have been added, you can start the game by clicking the "Start Game" button.
6. A random number is picked and that numbered player goes first. Players attempt to shoot balls into the playing area on their turn using the angle and power sliders. **DO NOT click the "Launch" button before the SPIKE Prime has finished running the previous launch sequence!** Hopefully it should still work if you do it anyways, but this is just a precaution in case it messes things up.
7. The next player's turn starts 5-6 seconds after the previous launch button was pressed.
8. If you wish to exit/end a game, click the reset lobby or end game button on the gamemaster page.

## Overview of the Code ##
### HTML Files ###
* [players.html](https://gabrielsessions.github.io/TicTacThrow/players.html "players.html")
  * Page that should be opened by the remote users. All three players should access this page and all remote content will be loaded on this page using both ***playerSetup.js*** and ***runGame.js***.
  * The files loads in Airtable, a online database that needs to be functioning in order for the project to work. (Contact me if something it's not working!)
  * On load, the page serves as a login screen where users input their name and join the game lobby.
* [gamemaster.html](https://gabrielsessions.github.io/TicTacThrow/gamemaster.html "gamemaster.html") 
  * Page that should be used by the local user. Requires a SPIKE Prime and access to Airtable.
  * Allows the gamemaster to control the game by sending the robot commands, adding players to the lobby, starting a game, resetting the game, and kick players from the game.
  * Requires a login to access, ask Gabriel if you need the password!
* [termsAndPrivacy.html](https://gabrielsessions.github.io/TicTacThrow/termsAndPrivacy.html "termsAndPrivacy.html") 
  * Our privacy policy/terms of use page

### JS Files ###
Coming Soon
