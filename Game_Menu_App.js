/*This app is going to be a menu app to help catalog the games I have completed in 2022. I plan on allowing
it to add individual titles to the list. Also, I want to catagorize them by platform, like PlayStation,
Xbox, PC, etc.  
*/
class Game {
    constructor(name, month, review) {
        this.name = name;
        this.month = month;
        this.review = review;
    }

    opinion() {
        return `I played ${this.name} on ${this.month} and I thought it was ${this.review}.`;
    }
}

class Platform {
    constructor(name) {
        this.name = name;
        this.games = [];
    }

    addGame(game) {
        if (game instanceof Game) {
            this.games.push(game);
        } else {
            throw new Error(`The game isn't an instance of Game. The following argument is invalid: ${game}`);
        }
    }

    listing () {
        return `This year on the ${this.name} I played ${this.games}.`;
    }
}


class Menu {
    constructor() {
        this.platforms = [];
        this.selectedPlatform = null;
    }

    start() {
        let choice = this.MainMenuOptions();
        while (choice != 0) {
            switch (choice) {
                case '1':
                    this.logNewPlatform();
                    break;
                case '2':
                    this.viewPlatform();
                    break;
                case '3':
                    this.seeAllPlatforms();
                    break;
                case '4':
                    this.deletePlatform();
                    break;
                default: 
                    choice = '0';
            }
            choice = this.MainMenuOptions();
        }
        alert('Thanks for stopping by!');
    }

    MainMenuOptions() {
        return prompt (`
        (0) Exit selection
        (1) Add a platform
        (2) See a specific platform catalogue
        (3) View all platforms in the catalogue
        (4) Remove a platform from the catalogue
        `)
    }

    showPlatformMenuOptions(platformInfo) {
        return prompt(`
        (0) Back
        (1) Add game to platform
        (2) Remove game from platform
        -----------------------------

        ${platformInfo}
        `);
    }

    seeAllPlatforms() {
        let platformString = '';
        for (let i = 0; i < this.platforms.length; i++) {
            platformString += i + ") " + this.platforms[i].name + "\n";
        } 
        alert(platformString);
    }

    logNewPlatform() {
        let name = prompt("Enter the name of the new platform to add: ");
        this.platforms.push(new Platform(name));

    }

    viewPlatform() {
        let index = prompt("Enter the index of the platform you wish to see: ");
        if (index > -1 && index < this.platforms.length) {
            this.selectedPlatform = this.platforms[index];
            let description = "Platform name " + this.selectedPlatform.name + "\n";
           
           
            for (let i = 0; i < this.selectedPlatform.games.length; i++) {
            description += i + ") " + this.selectedPlatform.games[i].name + ' - ' + 
            this.selectedPlatform.games[i].month + ' - ' + this.selectedPlatform.games[i].review + "\n";
            }

            let selection = this.showPlatformMenuOptions(description);
            switch (selection) {
                case "1":
                    this.createGame();
                    break;
                case "2":
                    this.deleteGame();
            }
        }
    }

    deletePlatform() {
        let deletion = prompt("Enter the index of the platform you wish to delete: ");
        if (deletion > -1 && deletion < this.platforms.length) {
            this.platforms.splice(deletion, 1);
        }
     }

    createGame() {
        let name = prompt("Enter the name of the game you wish to add: ");
        let month = prompt("Enter the month you played this game: ");
        let review = prompt("Enter your opinion of the game by the following words: Bad, Ok, Good, Great, Amazing:");
        this.selectedPlatform.games.push(new Game(name, month, review));
    }

    deleteGame() {
        let index = prompt("Enter the index of the game you wish to delete: ");
        if (index > -1 && index < this.selectedPlatform.games.length) {
        this.selectedPlatform.games.splice(index, 1);
        }
    }
 }
     


let menu = new Menu();
menu.start();

