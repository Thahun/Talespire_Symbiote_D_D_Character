class SheetDataStancesDTO {
    stanceList;
    maxKnown;

    /**
     * @param {Array.<SheetDataStancesStanceDTO>} stanceList 
     * @param {Number} maxKnown 
     */
    constructor(
        stanceList = [],
        maxKnown
    ) {
        this.stanceList = stanceList;
        this.maxKnown = maxKnown;
    }
}

class SheetDataStancesStanceDTO {
    active;
    name;
    details;

    /**
     * @param {Boolean} active 
     * @param {String} name 
     * @param {String} details 
     */
    constructor(
        active,
        name,
        details
    ) {
        this.active = active;
        this.name = name;
        this.details = details;
    }
}

class SheetSectionStances extends AbstractSheetHelper {
    parent;
    sectionStancesStance;

    FIELDNAME_MAX_KNOWN = 'character-stances-max-known';

    FIELDNAME_INDEX = 'character-stances-id[]';
    FIELDID_ADD_ROW = 'character-stances-add-row';

    ELEMENTID_CELL_ID = 'character-stances-cell-id[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_NAME = 'character-stances-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-stances-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionStancesStance = new SheetSectionStancesStance(this);
    }

    /**
     * Returns all data of section "stances"
     * 
     * @returns {SheetDataStancesDTO}
     */
    getData() {
        return new SheetDataStancesDTO(
            this.getStances(),
            this.getMaxKnown()
        );
    }

    /**
     * Sets all data of section "stances"
     * 
     * @param {SheetDataStancesDTO} data 
     */
    setData(data) {
        this.setStances(data.stanceList);
        this.setMaxKnown(data.maxKnown);
    }


    /**
     * @returns {Array.<SheetDataStancesStanceDTO>}
     */
    getStances() {
        let stanceList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let stanceData = this.sectionStancesStance.getData(index);
            stanceList.push(stanceData);
        }
        return stanceList;
    }

    /**
     * Setting a list of stances
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataStancesStanceDTO>} stanceList 
     */
    setStances(stanceList) {
        this.removeAllStances();

        for (let i = 0; i < stanceList.length; i++) {
            let stanceData = stanceList[i];
            this.addStance(stanceData.active, stanceData.name, stanceData.details);
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
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllStances() {
        debug.log("SheetSectionStances.removeAllStances");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeStance(indexes[i]);
        }
    }

    /**
     * @param {Number} stanceIndex 
     */
    removeStance(stanceIndex) {
        debug.log("SheetSectionStances.removeStance");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_ID, stanceIndex),
            this.setIndexToString(this.ELEMENTID_CELL_NAME, stanceIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, stanceIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {Boolean} active 
     * @param {String} name 
     * @param {String} details 
     */
    addStance(active = this.STATE_INACTIVE, name = '', details = '') {
        debug.log("SheetSectionStances.addStance");

        let stanceIndex = this.determineNextIndex(this.FIELDNAME_INDEX);

        let stateClass = this.getStateCssClassByState(active);
        
        let newStanceHtmlString = ' \
        <div id="character-stances-cell-id[' + stanceIndex + ']" class="grid-item-label" style="grid-column-end: span 1;"> \
            <div class="character-stances-state" onclick="sheetManager.sectionStances.sectionStancesStance.toggleState(' + stanceIndex + ');"> \
                <div class="' + stateClass + '"> \
                    <input name="character-stances-active[' + stanceIndex + ']" type="hidden" value="' + active + '"> \
                </div> \
            </div> \
            <input name="character-stances-id[]" type="hidden" value="' + stanceIndex + '"> \
        </div> \
        <div id="character-stances-cell-name[' + stanceIndex + ']" class="grid-item-data" style="grid-column-end: span 2;"> \
            <div class="expand"> \
                <input name="character-stances-name[' + stanceIndex + ']" class="field-data stances" type="text" value="' + name + '"></input> \
                <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                <div id="character-stances-expand[' + stanceIndex + ']" class="expand-content left single-field stances"> \
                    <textarea name="character-stances-details[' + stanceIndex + ']" style="height: 4em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + details + '</textarea> \
                </div> \
            </div> \
        </div> \
        <div id="character-stances-cell-icon[' + stanceIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <div id="character-stances-icon[' + stanceIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionStances.removeStance(' + stanceIndex + ');">-</div> \
        </div> \
        ';
        let newStanceHtmlDocument = new DOMParser().parseFromString(newStanceHtmlString, "text/html");
        let newStanceHtmlCollection = newStanceHtmlDocument.body.children;
        let characterStanceAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        characterStanceAddRow.before(...newStanceHtmlCollection);
        
        if(details.trim() != '') {
            let fieldname = this.setIndexToString(this.sectionStancesStance.FIELDNAME_DETAILS, stanceIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }
    }

    /**
     * @returns {Number|null}
     */
    findActiveStance() {
        debug.log("SheetSectionStances.findActiveStance");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let stanceIndex = indexes[i];
            let stanceState = this.sectionStancesStance.getActive(stanceIndex);
            if(stanceState == this.STATE_ACTIVE) {
                return stanceIndex;
            }
        }

        return null;
    }
}


class SheetSectionStancesStance extends AbstractSheetHelper {
    parent;

    FIELDNAME_ACTIVE = 'character-stances-active[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_NAME = 'character-stances-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DETAILS = 'character-stances-details[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionStances} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one stance of section "stances"
     * 
     * @param {Number} index 
     * @returns {SheetDataStancesStanceDTO}
     */
    getData(index) {
        return new SheetDataStancesStanceDTO(
            this.getActive(index),
            this.getName(index),
            this.getDetails(index)
        );
    }

    /**
     * Sets all data of one stance of section "stances"
     * 
     * @param {Number} index 
     * @param {SheetDataStancesStanceDTO} data 
     */
    setData(index, data) {
        this.setActive(index, data.active);
        this.setName(index, data.name);
        this.setDetails(index, data.details);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getActive(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ACTIVE, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setActive(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ACTIVE, index);

        this.setElementValueByName(fieldname, value);

        let stateElement = this.getElementByName(fieldname);
        let stateIcon = stateElement.parentElement;
        stateIcon.className = this.getStateCssClassByState(value);
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
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {Number} index
     */
    toggleState(index) {
        debug.log("SheetSectionStancesStance.toggleState");

        let currentState = this.getActive(index);

        if(currentState == this.STATE_ACTIVE) {
            this.setActive(index, this.STATE_INACTIVE);
        } else {
            let activeStanceIndex = this.parent.findActiveStance();
            if(activeStanceIndex) {
                this.setActive(activeStanceIndex, this.STATE_INACTIVE);
            }
            this.setActive(index, this.STATE_ACTIVE);
        }
    }
}