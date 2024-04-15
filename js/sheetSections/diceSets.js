class SheetDataDiceSetsDTO {
    diceSetList;

    /**
     * @param {Array.<SheetDataDiceSetsDiceSetDTO>} diceSetList 
     */
    constructor(
        diceSetList = []
    ) {
        this.diceSetList = diceSetList;
    }
}

class SheetDataDiceSetsDiceSetDTO {
    name;
    details;
    diceSet;

    /**
     * @param {String} name 
     * @param {String} details 
     * @param {String} diceSet 
     */
    constructor(
        name,
        details,
        diceSet
    ) {
        this.name = name;
        this.details = details;
        this.diceSet = diceSet;
    }
}

class SheetSectionDiceSets extends AbstractSheetHelper{
    parent;
    sectionDiceSetsDiceSet;

    FIELDNAME_INDEX = 'character-dice-sets-id[]';
    FIELDID_ADD_ROW = 'character-dice-sets-add-row';

    ELEMENTID_CELL_NAME = 'character-dice-sets-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_DICE_SET = 'character-dice-sets-cell-dice-set[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON_DICE = 'character-dice-sets-cell-icon-dice[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON_REMOVE = 'character-dice-sets-cell-icon-remove[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionDiceSetsDiceSet = new SheetSectionDiceSetsDiceSet(this);
    }

    /**
     * Returns all data of section "diceSets"
     * 
     * @returns {SheetDataDiceSetsDTO}
     */
    getData() {
        return new SheetDataDiceSetsDTO(
            this.getDiceSets()
        );
    }

    /**
     * Sets all data of section "diceSets"
     * 
     * @param {SheetDataDiceSetsDTO} data 
     */
    setData(data) {
        this.setDiceSets(data.diceSetList);
    }


    /**
     * @returns {Array.<SheetDataDiceSetsDiceSetDTO>}
     */
    getDiceSets() {
        let diceSetList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let diceSetData = this.sectionDiceSetsDiceSet.getData(index);
            diceSetList.push(diceSetData);
        }
        return diceSetList;
    }

    /**
     * Setting a list of dice sets
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataDiceSetsDiceSetDTO>} diceSetList 
     */
    setDiceSets(diceSetList) {
        this.removeAllDiceSets();

        for (let i = 0; i < diceSetList.length; i++) {
            let diceSetData = diceSetList[i];
            this.addDiceSet(diceSetData.name, diceSetData.details, diceSetData.diceSet);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllDiceSets() {
        debug.log("SheetSectionDiceSets.removeAllDiceSets");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeDiceSet(indexes[i]);
        }
    }

    /**
     * @param {Number} diceSetIndex 
     */
    removeDiceSet(diceSetIndex) {
        debug.log("SheetSectionDiceSets.removeDiceSet");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_NAME, diceSetIndex),
            this.setIndexToString(this.ELEMENTID_CELL_DICE_SET, diceSetIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON_DICE, diceSetIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON_REMOVE, diceSetIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {String} name 
     * @param {String} details 
     * @param {String} diceSet 
     */
    addDiceSet(name = '', details = '', diceSet = '') {
        debug.log("SheetSectionDiceSets.addDiceSet");

        let diceSetIndex = this.determineNextIndex(this.FIELDNAME_INDEX);
        
        let newDiceSetHtmlString = ' \
            <div id="character-dice-sets-cell-name[' + diceSetIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="character-dice-sets-id[]" type="hidden" value="' + diceSetIndex + '"> \
                <div class="expand"> \
                    <input name="character-dice-sets-name[' + diceSetIndex + ']" class="field-data-largest" type="text" value="' + name + '"></input> \
                    <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                    <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                    <div id="character-dice-sets-expand[' + diceSetIndex + ']" class="expand-content left single-field"> \
                        <textarea name="character-dice-sets-details[' + diceSetIndex + ']" style="height: 4em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + details + '</textarea> \
                    </div> \
                </div> \
            </div> \
            <div id="character-dice-sets-cell-dice-set[' + diceSetIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="character-dice-sets-dice-set[' + diceSetIndex + ']" class="field-data-larger" type="text" value="' + diceSet + '" onchange="DiceHelper.isValidDiceString(this.value);"></input> \
            </div> \
            <div id="character-dice-sets-cell-icon-dice[' + diceSetIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
                <i class="icon-dice ts-icon-d20 ts-icon-small" onclick="DiceHelper.rollDice(\'&quot;\' + sheetManager.sectionDiceSets.sectionDiceSetsDiceSet.getName(' + diceSetIndex + ') + \'&quot;\', null, new MethodCallbackDTO(sheetManager.sectionDiceSets.sectionDiceSetsDiceSet, \'getDiceSet\', [' + diceSetIndex + ']));"></i> \
            </div> \
            <div id="character-dice-sets-cell-icon-remove[' + diceSetIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
                <div id="character-dice-sets-icon-remove[' + diceSetIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionDiceSets.removeDiceSet(' + diceSetIndex + ');">-</div> \
            </div> \
        ';
        let newDiceSetHtmlDocument = new DOMParser().parseFromString(newDiceSetHtmlString, "text/html");
        let newDiceSetHtmlCollection = newDiceSetHtmlDocument.body.children;
        let characterDiceSetAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        characterDiceSetAddRow.before(...newDiceSetHtmlCollection);
        
        if(details.trim() != '') {
            let fieldname = this.setIndexToString(this.sectionDiceSetsDiceSet.FIELDNAME_DETAILS, diceSetIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }
    }
}


class SheetSectionDiceSetsDiceSet extends AbstractSheetHelper {
    parent;

    FIELDNAME_NAME = 'character-dice-sets-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DETAILS = 'character-dice-sets-details[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DICE_SET = 'character-dice-sets-dice-set[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionDiceSets} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one dice set of section "diceSets"
     * 
     * @param {Number} index 
     * @returns {SheetDataDiceSetsDiceSetDTO}
     */
    getData(index) {
        return new SheetDataDiceSetsDiceSetDTO(
            this.getName(index),
            this.getDetails(index),
            this.getDiceSet(index)
        );
    }

    /**
     * Sets all data of one dice set of section "diceSets"
     * 
     * @param {Number} index 
     * @param {SheetDataDiceSetsDiceSetDTO} data 
     */
    setData(index, data) {
        this.setName(index, data.name);
        this.setDetails(index, data.details);
        this.setDiceSet(index, data.diceSet);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getName(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_NAME, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setName(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_NAME, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getDetails(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DETAILS, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setDetails(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DETAILS, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getDiceSet(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DICE_SET, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setDiceSet(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DICE_SET, index);

        this.setElementValueByName(fieldname, value);
    }
}