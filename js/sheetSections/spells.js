class SheetDataSpellsDTO {
    spellList;

    /**
     * @param {Array.<SheetDataSpellsSpellDTO>} spellList 
     */
    constructor(
        spellList = []
    ) {
        this.spellList = spellList;
    }
}

class SheetDataSpellsSpellDTO {
    grade;
    state;
    classData;
    name;
    details;

    /**
     * @param {Number} grade 
     * @param {SheetDataSpellsSpellStateDTO} state 
     * @param {SheetDataSpellsSpellClassDTO} class 
     * @param {String} name 
     * @param {String} details 
     */
    constructor(
        grade,
        state,
        classData,
        name,
        details
    ) {
        this.grade = grade;
        this.state = state;
        this.classData = classData;
        this.name = name;
        this.details = details;
    }
}

class SheetDataSpellsSpellStateDTO {
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

class SheetDataSpellsSpellClassDTO {
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

class SheetSectionSpells extends AbstractSheetHelper {
    parent;
    sectionSpellsSpell;

    GRADE_PLACEHOLDER = '%grade%';

    FIELDNAME_INDEX = 'character-spells-id[]';
    FIELDID_ADD_ROW = 'character-spells-' + this.GRADE_PLACEHOLDER + '-add-row';

    ELEMENTID_CELL_STATE = 'character-spells-cell-state[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_CLASS = 'character-spells-cell-class[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_NAME = 'character-spells-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-spells-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionSpellsSpell = new SheetSectionSpellsSpell(this);
    }

    /**
     * Sets the grade into e.g. a fieldname string
     * Replaces the placeholder '%grade%'
     * 
     * @param {String} string 
     * @param {Number} gradeIndex 
     * @returns {String}
     */
    setGradeToString(string, gradeIndex) {
        return string.replaceAll(this.GRADE_PLACEHOLDER, gradeIndex)
    }

    /**
     * Returns all data of section "spells"
     * 
     * @returns {SheetDataSpellsDTO}
     */
    getData() {
        return new SheetDataSpellsDTO(
            this.getSpells()
        );
    }

    /**
     * Sets all data of section "spells"
     * 
     * @param {SheetDataSpellsDTO} data 
     */
    setData(data) {
        this.setSpells(data.spellList);
    }


    /**
     * @returns {Array.<SheetDataSpellsSpellDTO>}
     */
    getSpells() {
        let spellList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let spellData = this.sectionSpellsSpell.getData(index);
            spellList.push(spellData);
        }
        return spellList;
    }

    /**
     * Setting a list of spells
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataSpellsSpellDTO>} spellList 
     */
    setSpells(spellList) {
        this.removeAllSpells();

        for (let i = 0; i < spellList.length; i++) {
            let spellData = spellList[i];
            this.addSpell(
                spellData.grade,
                spellData.state,
                spellData.classData,
                spellData.name,
                spellData.details
            );
        }
    }
    
    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllSpells() {
        debug.log("SheetSectionSpells.removeAllSpells");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeSpell(indexes[i]);
        }
    }

    /**
     * @param {Number} index 
     */
    removeSpell(index) {
        debug.log("SheetSectionSpells.removeSpell");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_STATE, index),
            this.setIndexToString(this.ELEMENTID_CELL_CLASS, index),
            this.setIndexToString(this.ELEMENTID_CELL_NAME, index),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, index)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {Number} grade 
     * @param {SheetDataSpellsSpellStateDTO} state 
     * @param {SheetDataSpellsSpellClassDTO} classData 
     * @param {String} name 
     * @param {String} details 
     */
    addSpell(grade, state = null, classData = null, name = '', details = '') {
        debug.log("SheetSectionSpells.addSpell");

        let spellIndex = this.determineNextIndex(this.FIELDNAME_INDEX);

        if(!state) {
            let stateObj = CharacterDataTables.getSpellStateById(0);
            state = new SheetDataSpellsSpellStateDTO(stateObj.id, stateObj.name);
        }

        if(!classData) {
            let classObj = CharacterDataTables.getClassById(0);
            classData = new SheetDataSpellsSpellClassDTO(classObj.id, classObj.name);
        }
        
        let newSpellHtmlString = ' \
        <div id="character-spells-cell-state[' + spellIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <div id="character-spells-state-dropdown[' + spellIndex + ']" class="dropdown"> \
                <input name="character-spells-state[' + spellIndex + ']" class="dropdown-select" data-id="' + state.id + '" value="' + state.name + '" readonly onclick="Dropdown.toggleDropdown(this);" onchange="Dropdown.markSelectedOption(this.name, this);"></input> \
                <div class="dropdown-open" style="display: block;" onclick="Dropdown.toggleDropdown(this);">▼</div> \
                <div class="dropdown-close" style="display: none;" onclick="Dropdown.toggleDropdown(this);">▲</div> \
                <div id="character-spells-state[' + spellIndex + ']-options" class="dropdown-content"></div> \
            </div> \
        </div> \
        <div id="character-spells-cell-class[' + spellIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <div id="character-spells-class-dropdown[' + spellIndex + ']" class="dropdown spells"> \
                <input name="character-spells-class[' + spellIndex + ']" class="dropdown-select" data-id="' + classData.id + '" value="' + classData.name + '" readonly onclick="Dropdown.toggleDropdown(this);" onchange="Dropdown.markSelectedOption(this.name, this);"></input> \
                <div class="dropdown-open" style="display: block;" onclick="Dropdown.toggleDropdown(this);">▼</div> \
                <div class="dropdown-close" style="display: none;" onclick="Dropdown.toggleDropdown(this);">▲</div> \
                <div id="character-spells-class[' + spellIndex + ']-options" class="dropdown-content"></div> \
            </div> \
            <input name="character-spells-id[]" type="hidden" value="' + spellIndex + '"> \
            <input name="character-spells-grade[' + spellIndex + ']" type="hidden" value="' + grade+ '"> \
        </div> \
        <div id="character-spells-cell-name[' + spellIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <div class="expand"> \
                <input name="character-spells-name[' + spellIndex + ']" class="field-data spells" type="text" value="' + name + '"></input> \
                <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                <div id="character-spells-expand[' + spellIndex + ']" class="expand-content right single-field spells"> \
                    <textarea name="character-spells-details[' + spellIndex + ']" style="height: 6em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + details + '</textarea> \
                </div> \
            </div> \
        </div> \
        <div id="character-spells-cell-icon[' + spellIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <div id="character-spells-icon[' + spellIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionSpells.removeSpell(' + spellIndex + ');">-</div> \
        </div> \
        ';
        let newSpellHtmlDocument = new DOMParser().parseFromString(newSpellHtmlString, "text/html");
        let newSpellHtmlCollection = newSpellHtmlDocument.body.children;
        let characterSpellAddRow = this.getElementById(this.setGradeToString(this.FIELDID_ADD_ROW, grade));
        characterSpellAddRow.before(...newSpellHtmlCollection);

        if(details.trim() != '') {
            let fieldname = this.setIndexToString(this.sectionSpellsSpell.FIELDNAME_DETAILS, spellIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }
        
        this.createStateDropdown(spellIndex);
        this.createClassDropdown(spellIndex);
    }

    /**
     * @param {Number} index 
     */
    createStateDropdown(index) {
        debug.log("SheetSectionSpells.createStateDropdown");

        let spellStates = CharacterDataTables.getSpellStates(false);
        let options = [];
        for(let i = 0;i < spellStates.length; i++) {
            options.push({'key':spellStates[i].id, 'value':spellStates[i].name, 'color':spellStates[i].color});
        }

        this.createDropdown(this.setIndexToString(this.sectionSpellsSpell.FIELDID_STATE_OPTIONS, index), options);
    }

    /**
     * @param {Number} index 
     */
    createClassDropdown(index) {
        debug.log("SheetSectionSpells.createClassDropdown");

        let classes = CharacterDataTables.getClasses(null, true, true, false);
        //classes.unshift(CharacterDataTables.getClassById(0));
        let options = [];
        for(let i = 0;i < classes.length; i++) {
            options.push({'key':classes[i].id, 'value':classes[i].name});
        }

        this.createDropdown(this.setIndexToString(this.sectionSpellsSpell.FIELDID_CLASS_OPTIONS, index), options);
    }
}

class SheetSectionSpellsSpell extends AbstractSheetHelper {
    parent;

    FIELDNAME_GRADE = 'character-spells-grade[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_STATE = 'character-spells-state[' + this.INDEX_PLACEHOLDER + ']';
    FIELDID_STATE_OPTIONS = 'character-spells-state[' + this.INDEX_PLACEHOLDER + ']-options';
    FIELDNAME_CLASS = 'character-spells-class[' + this.INDEX_PLACEHOLDER + ']';
    FIELDID_CLASS_OPTIONS = 'character-spells-class[' + this.INDEX_PLACEHOLDER + ']-options';
    FIELDNAME_NAME = 'character-spells-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DETAILS = 'character-spells-details[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionSpells} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }
    /**
     * Returns one spell of section "spells"
     * 
     * @param {Number} index 
     * @returns {SheetDataSpellsSpellDTO}
     */
    getData(index) {
        return new SheetDataSpellsSpellDTO(
            this.getGrade(index),
            this.getState(index),
            this.getClass(index),
            this.getName(index),
            this.getDetails(index)
        );
    }

    /**
     * Sets one state of section "spells"
     * 
     * @param {Number} index 
     * @param {SheetDataSpellsSpellDTO} data 
     */
    setData(index, data) {
        this.setGrade(index, data.grade);
        this.setState(index, data.state.id, data.state.name);
        this.setClass(index, data.classData.id, data.classData.name);
        this.setName(index, data.name);
        this.setDetails(index, data.details);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getGrade(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setGrade(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE, index);

        this.setElementValueByName(fieldname, value);
    }

    
    /**
     * @param {Number} index 
     * @returns {SheetDataSpellsSpellStateDTO}
     */
    getState(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_STATE, index);
        let stateElement = this.getElementByName(fieldname);

        return new SheetDataSpellsSpellStateDTO(Number(stateElement.dataset.id), stateElement.value);
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
            let stateObj = CharacterDataTables.getSpellStateById(id);
            value = stateObj.name;
        }

        this.setElementValueByName(fieldname, value, id);
    }

    
    /**
     * @param {Number} index 
     * @returns {SheetDataSpellsSpellClassDTO}
     */
    getClass(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS, index);
        let classElement = this.getElementByName(fieldname);

        return new SheetDataSpellsSpellClassDTO(Number(classElement.dataset.id), classElement.value);
    }

    /**
     * If value isn't provided, it'll be determined by id
     * 
     * @param {Number} index 
     * @param {Number} id 
     * @param {String|null} value 
     */
    setClass(index, id, value = null) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS, index);
        if(!value) {
            let classObj = CharacterDataTables.getClassById(id);
            value = classObj.name;
        }

        this.setElementValueByName(fieldname, value, id);
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