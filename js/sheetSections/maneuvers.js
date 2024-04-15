class SheetDataManeuversDTO {
    maneuverList;
    maxKnown;
    maxPrepared;

    /**
     * @param {Array.<SheetDataManeuversManeuverDTO>} maneuverList 
     * @param {Number} maxKnown 
     * @param {Number} maxPrepared 
     */
    constructor(
        maneuverList = [],
        maxKnown,
        maxPrepared
    ) {
        this.maneuverList = maneuverList;
        this.maxKnown = maxKnown;
        this.maxPrepared = maxPrepared;
    }
}

class SheetDataManeuversManeuverDTO {
    state;
    summary;
    name;
    damage;
    details;

    /**
     * @param {SheetDataManeuversManeuverStateDTO} state 
     * @param {String} summary 
     * @param {String} name 
     * @param {String} damage 
     * @param {String} details 
     */
    constructor(
        state,
        summary,
        name,
        damage,
        details
    ) {
        this.state = state;
        this.summary = summary;
        this.name = name;
        this.damage = damage;
        this.details = details;
    }
}

class SheetDataManeuversManeuverStateDTO {
    id;
    name;

    /**
     * @param {Number} id 
     * @param {String} name 
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class SheetSectionManeuvers extends AbstractSheetHelper {
    parent;
    sectionManeuversManeuver;

    FIELDNAME_MAX_KNOWN = 'character-maneuvers-max-known';
    FIELDNAME_MAX_PREPARED = 'character-maneuvers-max-prepared';

    FIELDNAME_INDEX = 'character-maneuvers-id[]';
    FIELDID_ADD_ROW = 'character-maneuvers-add-row';

    ELEMENTID_CELL_STATE = 'character-maneuvers-cell-state[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_DATA = 'character-maneuvers-cell-data[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-maneuvers-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionManeuversManeuver = new SheetSectionManeuversManeuver(this);
    }

    /**
     * Returns all data of section "maneuvers"
     * 
     * @returns {SheetDataManeuversDTO}
     */
    getData() {
        return new SheetDataManeuversDTO(
            this.getManeuvers(),
            this.getMaxKnown(),
            this.getMaxPrepared()
        );
    }

    /**
     * Sets all data of section "maneuvers"
     * 
     * @param {SheetDataManeuversDTO} data 
     */
    setData(data) {
        this.setManeuvers(data.maneuverList);
        this.setMaxKnown(data.maxKnown);
        this.setMaxPrepared(data.maxPrepared);
    }


    /**
     * @returns {Array.<SheetDataManeuversManeuverDTO>}
     */
    getManeuvers() {
        let maneuverList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let maneuverData = this.sectionManeuversManeuver.getData(index);
            maneuverList.push(maneuverData);
        }
        return maneuverList;
    }

    /**
     * Setting a list of maneuvers
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataManeuversManeuverDTO>} maneuverList 
     */
    setManeuvers(maneuverList) {
        this.removeAllManeuvers();

        for (let i = 0; i < maneuverList.length; i++) {
            let maneuverData = maneuverList[i];
            this.addManeuver(maneuverData.state.id, maneuverData.summary, maneuverData.name, maneuverData.damage, maneuverData.details);
        }
    }


    /**
     * @returns {Number}
     */
    getMaxKnown() {
        return this.getElementValueByName(this.FIELDNAME_MAX_KNOWN, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setMaxKnown(value) {
        this.setElementValueByName(this.FIELDNAME_MAX_KNOWN, value);
    }


    /**
     * @returns {Number}
     */
    getMaxPrepared() {
        return this.getElementValueByName(this.FIELDNAME_MAX_PREPARED, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setMaxPrepared(value) {
        this.setElementValueByName(this.FIELDNAME_MAX_PREPARED, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllManeuvers() {
        debug.log("SheetSectionManeuvers.removeAllManeuvers");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeManeuver(indexes[i]);
        }
    }

    /**
     * @param {Number} maneuverIndex 
     */
    removeManeuver(maneuverIndex) {
        debug.log("SheetSectionManeuvers.removeManeuver");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_STATE, maneuverIndex),
            this.setIndexToString(this.ELEMENTID_CELL_DATA, maneuverIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, maneuverIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {Number} stateId 
     * @param {String} summary 
     * @param {String} name 
     * @param {String} damage 
     * @param {String} details 
     */
    addManeuver(stateId = 0, summary = '', name = '', damage = '', details = '') {
        debug.log("SheetSectionManeuvers.addManeuver");

        let maneuverIndex = this.determineNextIndex(this.FIELDNAME_INDEX);

        let stateObj = null;
        let stateName = '-';
        if(stateId) {
            stateObj = CharacterDataTables.getManeuverStateById(stateId);
            stateName = stateObj.name;
        }

        let newManeuverHtmlString = ' \
        <div id="character-maneuvers-cell-state[' + maneuverIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <div id="character-maneuvers-state-dropdown[' + maneuverIndex + ']" class="dropdown"> \
                <input name="character-maneuvers-state[' + maneuverIndex + ']" class="dropdown-select" data-id="' + stateId + '" value="' + stateName + '" readonly onclick="Dropdown.toggleDropdown(this);" onchange="Dropdown.markSelectedOption(this.name, this);"></input> \
                <div class="dropdown-open" style="display: block;" onclick="Dropdown.toggleDropdown(this);">▼</div> \
                <div class="dropdown-close" style="display: none;" onclick="Dropdown.toggleDropdown(this);">▲</div> \
                <div id="character-maneuvers-state[' + maneuverIndex + ']-options" class="dropdown-content"></div> \
            </div> \
            <input name="character-maneuvers-id[]" type="hidden" value="' + maneuverIndex + '"> \
        </div> \
        <div id="character-maneuvers-cell-data[' + maneuverIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <div class="expand"> \
                <input name="character-maneuvers-summary[' + maneuverIndex + ']" class="field-data maneuvers" type="text" value="' + summary + '"></input> \
                <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                <div id="character-maneuvers-expand[' + maneuverIndex + ']" class="expand-content left single-field maneuvers"> \
                    <div class="section-grid-container" style="grid-template-columns: repeat(3,auto);"> \
                        <div class="grid-item-label" style="grid-column-end: span 1;"> \
                            <label>Name</label> \
                        </div> \
                        <div class="grid-item-data" style="grid-column-end: span 2;"> \
                            <input name="character-maneuvers-name[' + maneuverIndex + ']" class="field-data" type="text" value="' + name + '"></input> \
                        </div> \
                        \
                        <div class="grid-item-label" style="grid-column-end: span 1;"> \
                            <label>Schaden</label> \
                        </div> \
                        <div class="grid-item-data" style="grid-column-end: span 1;"> \
                            <input name="character-maneuvers-damage[' + maneuverIndex + ']" type="text" value="' + damage + '" onchange="DiceHelper.isValidDiceString(this.value);"></input> \
                        </div> \
                        <div class="grid-item" style="grid-column-end: span 1;"> \
                            <i class="icon-dice ts-icon-d20 ts-icon-small" onclick="DiceHelper.rollDice(\'Manöver: &quot;\' + sheetManager.sectionManeuvers.sectionManeuversManeuver.getName(' + maneuverIndex + ') + \'&quot; Schaden\', null, new MethodCallbackDTO(sheetManager.sectionManeuvers.sectionManeuversManeuver, \'getDamage\', [' + maneuverIndex + ']));"></i> \
                        </div> \
                        \
                        <div class="grid-item-data" style="grid-column-end: span 3; grid-row-end: span 3;"> \
                            <textarea name="character-maneuvers-details[' + maneuverIndex + ']" style="height: 4em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + details + '</textarea> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
        <div id="character-maneuvers-cell-icon[' + maneuverIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <div id="character-maneuvers-icon[' + maneuverIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionManeuvers.removeManeuver(' + maneuverIndex + ');">-</div> \
        </div> \
        ';
        let newManeuverHtmlDocument = new DOMParser().parseFromString(newManeuverHtmlString, "text/html");
        let newManeuverHtmlCollection = newManeuverHtmlDocument.body.children;
        let characterManeuverAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        characterManeuverAddRow.before(...newManeuverHtmlCollection);
        
        if(details.trim() != '') {
            let fieldname = this.setIndexToString(this.sectionManeuversManeuver.FIELDNAME_DETAILS, maneuverIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }

        this.createManeuverStateDropdown(maneuverIndex);
    }

    /**
     * @param {Number} index 
     */
    createManeuverStateDropdown(index) {
        debug.log("SheetSectionManeuvers.createManeuverStateDropdown");

        let maneuverStates = CharacterDataTables.getManeuverStates();
        let options = [];
        for(let i = 0;i < maneuverStates.length; i++) {
            options.push({'key':maneuverStates[i].id, 'value':maneuverStates[i].name, 'color':maneuverStates[i].color});
        }

        this.createDropdown(this.setIndexToString(this.sectionManeuversManeuver.FIELDID_STATE_OPTIONS, index), options);
    }
}


class SheetSectionManeuversManeuver extends AbstractSheetHelper {
    parent;

    FIELDNAME_STATE = 'character-maneuvers-state[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_SUMMARY = 'character-maneuvers-summary[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_NAME = 'character-maneuvers-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DAMAGE = 'character-maneuvers-damage[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DETAILS = 'character-maneuvers-details[' + this.INDEX_PLACEHOLDER + ']';
    FIELDID_STATE_OPTIONS = 'character-maneuvers-state[' + this.INDEX_PLACEHOLDER + ']-options';

    /**
     * @param {SheetSectionManeuvers} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one maneuver of section "maneuvers"
     * 
     * @param {Number} index 
     * @returns {SheetDataManeuversManeuverDTO}
     */
    getData(index) {
        return new SheetDataManeuversManeuverDTO(
            this.getState(index),
            this.getSummary(index),
            this.getName(index),
            this.getDamage(index),
            this.getDetails(index)
        );
    }

    /**
     * Sets all data of one maneuver of section "maneuvers"
     * 
     * @param {Number} index 
     * @param {SheetDataManeuversManeuverDTO} data 
     */
    setData(index, data) {
        this.setState(index, data.class.id, data.class.name);
        this.setSummary(index, data.summary);
        this.setName(index, data.name);
        this.setDamage(index, data.damage);
        this.setDetails(index, data.details);
    }

    
    /**
     * @param {Number} index 
     * @returns {SheetDataManeuversManeuverStateDTO}
     */
    getState(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_STATE, index);
        let stateElement = this.getElementByName(fieldname);

        return new SheetDataManeuversManeuverStateDTO(Number(stateElement.dataset.id), stateElement.value);
    }

    /**
     * If value isn't provided, it'll be determined by id
     * 
     * @param {Number} index 
     * @param {Number} id 
     * @param {String|null} value 
     */
    setState(index, id, value = null) {
        let fieldname = this.setIndexToString(this.FIELDNAME_STATE, index);
        if(!value) {
            let stateObj = CharacterDataTables.getManeuverStateById(id);
            value = stateObj.name;
        }

        this.setElementValueByName(fieldname, value, id);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getSummary(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_SUMMARY, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setSummary(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_SUMMARY, index);

        this.setElementValueByName(fieldname, value);
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
    getDamage(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DAMAGE, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setDamage(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DAMAGE, index);

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