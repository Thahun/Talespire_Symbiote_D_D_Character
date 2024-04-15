class DiceHelper {
    /**
     * @param {String} rollAction Title of the roll will be "<CharacterName>: <rollAction>"
     * @param {MethodCallbackDTO} modifierSource Provide this to fetch a modifier added to a 1D20 roll result
     * @param {MethodCallbackDTO} diceSource Provide this to roll exactly the returned dices
     */
    static rollDice(rollAction, modifierSource = null, diceSource = null) {
        let diceString = "D20";
        if(modifierSource) {
            let modificator = CallbackHelper.executeCallback(modifierSource);
            if(modificator > 0) {
                diceString += '+' + modificator;
            } else if(modificator < 0) {
                diceString += '-' + (modificator * -1);
            }
        } else if(diceSource) {
            diceString = CallbackHelper.executeCallback(diceSource);
        }

        if(!this.isValidDiceString(diceString)) {
            return;
        }
        diceString = diceString.replaceAll('w', 'd').replaceAll('W', 'D'); //Covering german word 'Würfel' in addition to 'dice'

        let charName = sheetManager.sectionBasic.getName();
        let rollLabel = charName + ': ' + rollAction;
        TS.dice.putDiceInTray([{name: rollLabel, roll: "!" + diceString}]);
    }

    /**
     * Not using TS.dice.isValidRollString() cause it's a promise and code won't wait for the validation
     * 
     * @param {String} diceString 
     * @returns {Boolean}
     */
    static isValidDiceString(diceString) {
        if(!diceString) {
            error.hide();
            return false;
        }

        let pattern = /^(?:\d*[wd]{1}(4|6|8|10|12|20|100)+(\+|\-))*(?:\d*[wd]{1}(4|6|8|10|12|20|100)+|\d+)+$/i;
        let valid = pattern.test(diceString);
        if(!valid) {
            error.show("Invalid dice string: " + diceString)
            return false;
        }
        error.hide();
        return true;
    }
}