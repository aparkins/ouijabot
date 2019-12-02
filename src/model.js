const helpers = require('./helpers.js');

// Represents a single "spirit" in the Ouija game
//      keywords -- A list of words that trigger reactions from the bot.
//      whodunnit -- The message that must be given to put the ghost to rest.
class Spirit {
    constructor(keywords, whodunnit) {
        this.keywords = keywords;
        this.whodunnit = whodunnit;
    }
}

// Represents an instance of the Ouija game in a guild
//      talkative -- A boolean indicating if "talkative" mode is enabled.
//                   Talkative ghosts will announce their presence, and non-
//                   talkative ghosts will begin playing silently.
//      frequency -- How often new spirits should be generated. A new spirit
//                   will not be active until AT LEAST <frequency> time after
//                   the previous one is put to rest. Units are seconds.
class GameState {
    constructor(talkative, frequency, currentSpirit) {
        this.talkative = talkative;
        this.frequency = frequency;

        if (!currentSpirit) {
            this.initGame();
        } else {
            this.currentSpirit = currentSpirit;
        }
    }

    initGame() {
        this.currentSpirit = this.generateSpirit();
        this.startDate = this.generateStartDate();
    }

    generateSpirit() {
        // TODO: something smarter. For now, let's use hard coded values
        keywords = [
            "knife",
            "kitchen",
            "dark",
            "storm",
            "spouse",
            "dinner",
            "anniversary",
        ];
        whodunnit = "husband";

        return new Spirit(keywords, whodunnit);
    }

    generateStartDate() {
        augmentedFrequency = this._augmentFrequency(this.frequency);
        return new Date(Date.now() + (augmentedFrequency * 1000));
    }

    containsKeyword(message) {
        return this.currentSpirit && this.currentSpirit.keywords.some((keyword) => message.includes(keyword));
    }

    checkWhodunnit(guess) {
        return this.currentSpirit && this.currentSpirit.whodunnit === guess;
    }

    // Ghosts are unpredictable -- while visitations will occur routinely,
    // no one knows EXACTLY when they will appear.
    _augmentFrequency(inFrequency) {
        augmentRange = Math.round(inFrequency * 0.25);
        augmentAmount = helpers.randint(0, augmentRange);
        return inFrequency + augmentAmount;
    }
}

module.exports = {
    GameState,
    Spirit,
};
