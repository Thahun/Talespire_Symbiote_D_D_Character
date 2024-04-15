class SheetDataFamiliarsDTO {
    familiarList;

    /**
     * @param {Array.<SheetDataFamiliarsFamiliarDTO>} familiarList 
     */
    constructor(
        familiarList = []
    ) {
        this.familiarList = familiarList;
    }
}

class SheetDataFamiliarsFamiliarDTO {
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

class SheetSectionFamiliars extends AbstractSheetHelper{
    parent;
    sectionFamiliarsFamiliar;

    FIELDNAME_INDEX = 'character-familiars-id[]';
    FIELDID_ADD_ROW = 'character-familiars-add-row';

    ELEMENTID_CELL_NAME = 'character-familiars-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-familiars-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionFamiliarsFamiliar = new SheetSectionFamiliarsFamiliar(this);
    }

    /**
     * Returns all data of section "familiars"
     * 
     * @returns {SheetDataFamiliarsDTO}
     */
    getData() {
        return new SheetDataFamiliarsDTO(
            this.getFamiliars()
        );
    }

    /**
     * Sets all data of section "familiars"
     * 
     * @param {SheetDataFamiliarsDTO} data 
     */
    setData(data) {
        this.setFamiliars(data.familiarList);
    }


    /**
     * @returns {Array.<SheetDataFamiliarsFamiliarDTO>}
     */
    getFamiliars() {
        let familiarList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let familiarData = this.sectionFamiliarsFamiliar.getData(index);
            familiarList.push(familiarData);
        }
        return familiarList;
    }

    /**
     * Setting a list of familiars
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataFamiliarsFamiliarDTO>} familiarList 
     */
    setFamiliars(familiarList) {
        this.removeAllFamiliars();

        for (let i = 0; i < familiarList.length; i++) {
            let familiarData = familiarList[i];
            this.addFamiliar(familiarData.name, familiarData.details);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllFamiliars() {
        debug.log("SheetSectionFamiliars.removeAllFamiliars");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeFamiliar(indexes[i]);
        }
    }

    /**
     * @param {Number} familiarIndex 
     */
    removeFamiliar(familiarIndex) {
        debug.log("SheetSectionFamiliars.removeFamiliar");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_NAME, familiarIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, familiarIndex)
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
    addFamiliar(name = '', details = '') {
        debug.log("SheetSectionFamiliars.addFamiliar");

        let familiarIndex = this.determineNextIndex(this.FIELDNAME_INDEX);
        
        let newFamiliarHtmlString = ' \
            <div id="character-familiars-cell-name[' + familiarIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="character-familiars-id[]" type="hidden" value="' + familiarIndex + '"> \
                <div class="expand"> \
                    <input name="character-familiars-name[' + familiarIndex + ']" class="field-data familiars" type="text" value="' + name + '"></input> \
                    <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                    <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                    <div id="character-familiars-expand[' + familiarIndex + ']" class="expand-content left single-field familiars"> \
                        <textarea name="character-familiars-details[' + familiarIndex + ']" style="height: 4em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + details + '</textarea> \
                    </div> \
                </div> \
            </div> \
            <div id="character-familiars-cell-icon[' + familiarIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
                <div id="character-familiars-icon[' + familiarIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionFamiliars.removeFamiliar(' + familiarIndex + ');">-</div> \
            </div> \
        ';
        let newFamiliarHtmlDocument = new DOMParser().parseFromString(newFamiliarHtmlString, "text/html");
        let newFamiliarHtmlCollection = newFamiliarHtmlDocument.body.children;
        let characterFamiliarAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        characterFamiliarAddRow.before(...newFamiliarHtmlCollection);
        
        if(details.trim() != '') {
            let fieldname = this.setIndexToString(this.sectionFamiliarsFamiliar.FIELDNAME_DETAILS, familiarIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }
    }
}


class SheetSectionFamiliarsFamiliar extends AbstractSheetHelper {
    parent;

    FIELDNAME_NAME = 'character-familiars-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DETAILS = 'character-familiars-details[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionFamiliars} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one familiar of section "familiars"
     * 
     * @param {Number} index 
     * @returns {SheetDataFamiliarsFamiliarDTO}
     */
    getData(index) {
        return new SheetDataFamiliarsFamiliarDTO(
            this.getName(index),
            this.getDetails(index)
        );
    }

    /**
     * Sets all data of one familiar of section "familiars"
     * 
     * @param {Number} index 
     * @param {SheetDataFamiliarsFamiliarDTO} data 
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