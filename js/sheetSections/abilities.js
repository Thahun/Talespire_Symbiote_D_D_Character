class SheetDataAbilitiesDTO {
    abilityList;

    /**
     * @param {Array.<SheetDataAbilitiesAbilityDTO>} abilityList 
     */
    constructor(
        abilityList = []
    ) {
        this.abilityList = abilityList;
    }
}

class SheetDataAbilitiesAbilityDTO {
    name;
    details;

    /**
     * @param {String} name 
     * @param {String} details 
     */
    constructor(
        name,
        details
    ) {
        this.name = name;
        this.details = details;
    }
}

class SheetSectionAbilities extends AbstractSheetHelper{
    parent;
    sectionAbilitiesAbility;

    FIELDNAME_INDEX = 'character-abilities-id[]';
    FIELDID_ADD_ROW = 'character-abilities-add-row';

    ELEMENTID_CELL_NAME = 'character-abilities-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-abilities-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionAbilitiesAbility = new SheetSectionAbilitiesAbility(this);
    }

    /**
     * Returns all data of section "abilities"
     * 
     * @returns {SheetDataAbilitiesDTO}
     */
    getData() {
        return new SheetDataAbilitiesDTO(
            this.getAbilities()
        );
    }

    /**
     * Sets all data of section "abilities"
     * 
     * @param {SheetDataAbilitiesDTO} data 
     */
    setData(data) {
        this.setAbilities(data.abilityList);
    }


    /**
     * @returns {Array.<SheetDataAbilitiesAbilityDTO>}
     */
    getAbilities() {
        let abilityList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let abilityData = this.sectionAbilitiesAbility.getData(index);
            abilityList.push(abilityData);
        }
        return abilityList;
    }

    /**
     * Setting a list of abilities
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataAbilitiesAbilityDTO>} abilityList 
     */
    setAbilities(abilityList) {
        this.removeAllAbilities();

        for (let i = 0; i < abilityList.length; i++) {
            let abilityData = abilityList[i];
            this.addAbility(abilityData.name, abilityData.details);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllAbilities() {
        debug.log("SheetSectionAbilities.removeAllAbilities");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeAbility(indexes[i]);
        }
    }

    /**
     * @param {Number} abilityIndex 
     */
    removeAbility(abilityIndex) {
        debug.log("SheetSectionAbilities.removeAbility");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_NAME, abilityIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, abilityIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {String} name 
     * @param {String} details 
     */
    addAbility(name = '', details = '') {
        debug.log("SheetSectionAbilities.addAbility");

        let abilityIndex = this.determineNextIndex(this.FIELDNAME_INDEX);
        
        let newAbilityHtmlString = ' \
            <div id="character-abilities-cell-name[' + abilityIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="character-abilities-id[]" type="hidden" value="' + abilityIndex + '"> \
                <div class="expand"> \
                    <input name="character-abilities-name[' + abilityIndex + ']" class="field-data abilities" type="text" value="' + name + '"></input> \
                    <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                    <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                    <div id="character-abilities-expand[' + abilityIndex + ']" class="expand-content left single-field abilities"> \
                        <textarea name="character-abilities-details[' + abilityIndex + ']" style="height: 4em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + details + '</textarea> \
                    </div> \
                </div> \
            </div> \
            <div id="character-abilities-cell-icon[' + abilityIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
                <div id="character-abilities-icon[' + abilityIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionAbilities.removeAbility(' + abilityIndex + ');">-</div> \
            </div> \
        ';
        let newAbilityHtmlDocument = new DOMParser().parseFromString(newAbilityHtmlString, "text/html");
        let newAbilityHtmlCollection = newAbilityHtmlDocument.body.children;
        let characterAbilityAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        characterAbilityAddRow.before(...newAbilityHtmlCollection);
        
        if(details.trim() != '') {
            let fieldname = this.setIndexToString(this.sectionAbilitiesAbility.FIELDNAME_DETAILS, abilityIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }
    }
}


class SheetSectionAbilitiesAbility extends AbstractSheetHelper {
    parent;

    FIELDNAME_NAME = 'character-abilities-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DETAILS = 'character-abilities-details[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionAbilities} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one ability of section "abilities"
     * 
     * @param {Number} index 
     * @returns {SheetDataAbilitiesAbilityDTO}
     */
    getData(index) {
        return new SheetDataAbilitiesAbilityDTO(
            this.getName(index),
            this.getDetails(index)
        );
    }

    /**
     * Sets all data of one ability of section "abilities"
     * 
     * @param {Number} index 
     * @param {SheetDataAbilitiesAbilityDTO} data 
     */
    setData(index, data) {
        this.setName(index, data.name);
        this.setDetails(index, data.details);
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
}