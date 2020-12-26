# Munich eSports SpectateUI
UI to display both champ select and ingame information for League of Legends
Forked from Lars Baertischi's Pick Ban UI project

## Installation 
**Note:** Windows will most likely warn you when you attempt to run each bat file.  
These are safe and their source is documented here.  
Run anyway or follow extended instructions below if you do not wish to use them
1. Do you have NodeJS installed? If you do not know what this is, assume no.  
   **Info:** You can check by running 'node -v' in cmd  
   -> No? run installNodeJS.bat and follow the instructions.  
   -> Yes? Continue  
2. run setup.bat

3. Add http://localhost:3000/?backend=ws://localhost:8999 to your champion select scene
4. Add http://localhost:3001/?backend=ws://localhost:8999 to your ingame scene


## Usage
1. run startup.bat
	-> 3 seperate windows should open. You should be able to ignore almost everything here
	
2. Change information on remote stream api page as nescesary.

3. To stop simply close all 3 windows


# Manual Installation and Usage
**Installation**
1. Install NodeJS or make sure it is installed on your system
2. run  **npm install** in the following directories:
	/src/
	/src/layouts/munich-esports-Ingame/
	/src/layouts/munich-esports-PB/
	
**Usage**
1. run **npm start** in the same directories

## Side note 
NodeJS is a javascript development environment.   
Due to the nature of this tool it was not polished for ease of use  
This tool has not been tested extensively, feedback and improvement suggestions are welcome


