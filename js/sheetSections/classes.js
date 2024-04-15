class SheetDataClassesDTO {
    classList;
    levelTotal;

    /**
     * @param {Array.<SheetDataClassesClassDTO>} classList 
     * @param {Number} levelTotal 
     */
    constructor(
        classList,
        levelTotal
    ) {
        this.classList = classList;
        this.levelTotal = levelTotal;
    }
}

class SheetDataClassesClassDTO {
    level;
    classData;

    /**
     * @param {Number} level 
     * @param {SheetDataClassesClassClassDTO} classData 
     */
    constructor(
        level,
        classData
    ) {
        this.level = level;
        this.classData = classData;
    }
}

class SheetDataClassesClassClassDTO {
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

class SheetSectionClasses extends AbstractSheetHelper{
    parent;
    sectionClassesClass;

    FIELDNAME_INDEX = 'character-class-id[]';
    FIELDID_SUM_ROW = 'character-class-sum-row';
    FIELDNAME_LEVEL_TOTAL = 'character-class-level-total';

    ELEMENTID_CELL_ID = 'character-class-cell-id[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_LABEL_LEVEL = 'character-class-cell-label-level[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_LEVEL = 'character-class-cell-level[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_LABEL_CLASS = 'character-class-cell-label-class[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_CLASS = 'character-class-cell-class[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-class-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionClassesClass = new SheetSectionClassesClass();
    }

    /**
     * Returns all data of section "classes"
     * 
     * @returns {SheetDataClassesDTO}
     */
    getData() {
        return new SheetDataClassesDTO(
            this.getClasses(),
            this.getLevelTotal()
        );
    }

    /**
     * Sets all data of section "classes"
     * 
     * @param {SheetDataClassesDTO} data 
     */
    setData(data) {
        this.setClasses(data.classList);
        this.setLevelTotal(data.levelTotal);
    }


    /**
     * @returns {Array.<SheetDataClassesClassDTO>}
     */
    getClasses() {
        let classList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let classData = this.sectionClassesClass.getData(index);
            classList.push(classData);
        }
        return classList;
    }

    /**
     * Setting a list of classes
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataClassesClassDTO>} classList 
     */
    setClasses(classList) {
        this.removeAllClasses();

        for (let i = 0; i < classList.length; i++) {
            let classData = classList[i];
            this.addClass(classData.classData.id, classData.level);
        }
    }


    /**
     * @returns {Number}
     */
    getLevelTotal() {
        return this.getElementValueByName(this.FIELDNAME_LEVEL_TOTAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setLevelTotal(value) {
        this.setElementValueByName(this.FIELDNAME_LEVEL_TOTAL, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllClasses() {
        debug.log("SheetSectionClasses.removeAllClasses");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeClass(indexes[i]);
        }
    }

    /**
     * @param {Number} classIndex 
     */
    removeClass(classIndex) {
        debug.log("SheetSectionClasses.removeClass");

        let classData = this.sectionClassesClass.getClass(classIndex);
        let magicianIndex = this.parent.sectionMagicians.findMagicianIndexByClassId(classData.id);
        this.parent.sectionMagicians.removeMagician(magicianIndex);

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_ID, classIndex),
            this.setIndexToString(this.ELEMENTID_CELL_LABEL_LEVEL, classIndex),
            this.setIndexToString(this.ELEMENTID_CELL_LEVEL, classIndex),
            this.setIndexToString(this.ELEMENTID_CELL_LABEL_CLASS, classIndex),
            this.setIndexToString(this.ELEMENTID_CELL_CLASS, classIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, classIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }

        this.sumLevels();
    }

    /**
     * @param {Number} classId 
     * @param {Number} classLevel 
     */
    addClass(classId=0, classLevel=0) {
        debug.log("SheetSectionClasses.addClass");

        let classIndex = this.determineNextIndex(this.FIELDNAME_INDEX);

        let classObj = null;
        let className = '-';
        if(classId) {
            classObj = CharacterDataTables.getClassById(classId);
            className = classObj.name;
        }
        
        let newClassHtmlString = ' \
            <div id="character-class-cell-id[' + classIndex + ']" class="grid-item-label" style="grid-column-end: span 1;">\
                <label id="character-class-label-id[' + classIndex + ']">' + classIndex + '.</label>\
                <input name="character-class-id[]" type="hidden" value="' + classIndex + '"></input></div>\
            <div id="character-class-cell-label-level[' + classIndex + ']" class="grid-item-label" style="grid-column-end: span 1;">\
                <label>Stufe</label>\
            </div>\
            <div id="character-class-cell-level[' + classIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="character-class-level[' + classIndex + ']" class="field-data-short" type="number" value="' + classLevel + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionClasses.sumLevels(); sheetManager.sectionMovement.updateMovement(); sheetManager.sectionMagicians.updateClassLevel(sheetManager.sectionClasses.sectionClassesClass.getData(' + classIndex + '));"></input> \
            </div> \
            <div id="character-class-cell-label-class[' + classIndex + ']" class="grid-item-label" style="grid-column-end: span 1;"> \
                <label>Klasse</label> \
            </div> \
            <div id="character-class-cell-class[' + classIndex + ']" class="grid-item-data" style="grid-column-end: span 5;"> \
                <div id="character-class-dropdown[' + classIndex + ']" class="dropdown"> \
                    <input name="character-class-class[' + classIndex + ']" class="dropdown-select" type="text" data-id="' + classId + '" value="' + className + '" readonly onclick="Dropdown.toggleDropdown(this);" onchange="Dropdown.markSelectedOption(this.name, this); sheetManager.sectionMovement.updateMovement(); sheetManager.sectionMagicians.updateClass(' + classIndex + ', sheetManager.sectionClasses.sectionClassesClass.getData(' + classIndex + '));"></input> \
                    <div class="dropdown-open" style="display: block;" onclick="Dropdown.toggleDropdown(this);">▼</div> \
                    <div class="dropdown-close" style="display: none;" onclick="Dropdown.toggleDropdown(this);">▲</div> \
                    <div id="character-class-class[' + classIndex + ']-options" class="dropdown-content"></div> \
                </div> \
            </div> \
            <div id="character-class-cell-icon[' + classIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
                <div id="character-class-icon[' + classIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionClasses.removeClass(' + classIndex + ');">-</div> \
            </div> \
        ';
        let newClassHtmlDocument = new DOMParser().parseFromString(newClassHtmlString, "text/html");
        let newClassHtmlCollection = newClassHtmlDocument.body.children;
        let characterClassSumRow = this.getElementById(this.FIELDID_SUM_ROW);
        characterClassSumRow.before(...newClassHtmlCollection);
        
        this.createClassDropdown(classIndex);

        if(classId) {
            this.sumLevels();

            if(this.sectionMagicians && classObj.isMagician) {
                let classData = this.sectionMagicians.sectionMagiciansMagician.sectionMagiciansMagicianClass.getDataByClassIndex(classIndex)
                this.parent.sectionMagicians.addMagician(classData);
            }
        }
    }

    /**
     * @param {Number} index 
     */
    createClassDropdown(index) {
        debug.log("SheetSectionClasses.createClassDropdown");

        let classes = CharacterDataTables.getClasses(null, null, true, false);
        let options = [];
        for(let i = 0;i < classes.length; i++) {
            options.push({'key':classes[i].id, 'value':classes[i].name});
        }

        this.createDropdown(this.setIndexToString(this.sectionClassesClass.FIELDID_CLASS_OPTIONS, index), options);
    }

    sumLevels() {
        debug.log("SheetSectionClasses.sumLevels");

        let classLevelSum = 0;
        let classes = this.getClasses();
        for (let i = 0; i < classes.length; i++) {
            classLevelSum += classes[i].level;
        }
        this.setLevelTotal(classLevelSum);
        this.syncLevel(classLevelSum);
    }

    /**
     * @param {Number} value 
     */
    syncLevel(value) {
        debug.log("SheetSectionClasses.syncLevel");

        let targets = [
            new GetterSetterCallbackDTO(this.parent.sectionHitpoints, 'getCharacterLevel', [], 'setCharacterLevel', []),
        ];

        for (let i = 0; i < targets.length; i++) {
            let callback = targets[i];
            let targetValue = CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.getterMethod, callback.getterParameters));
            if(value != targetValue) {
                let parameters = callback.setterParameters;
                parameters.push(value);
                CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.setterMethod, parameters), false);
            }
        }
    }

    /**
     * @param {Number} classId 
     * @returns {SheetDataClassesClassDTO|null}
     */
    findClassById(classId) {
        debug.log("SheetSectionClasses.findClassIndexByClassId");
        let classes = this.getClasses();
        for (let i = 0; i < classes.length; i++) {
            if(classes[i].classData.id == classId) {
                return classes[i];
            }
        }

        return null;
    }
}


class SheetSectionClassesClass extends AbstractSheetHelper {
    FIELDNAME_LEVEL = 'character-class-level[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_CLASS = 'character-class-class[' + this.INDEX_PLACEHOLDER + ']';
    FIELDID_CLASS_OPTIONS = 'character-class-class[' + this.INDEX_PLACEHOLDER + ']-options';

    /**
     * Returns all data of one class of section "classes"
     * 
     * @param {Number} index 
     * @returns {SheetDataClassesClassDTO}
     */
    getData(index) {
        return new SheetDataClassesClassDTO(
            this.getLevel(index),
            this.getClass(index)
        );
    }

    /**
     * Sets all data of one class of section "classes"
     * 
     * @param {Number} index 
     * @param {SheetDataClassesClassDTO} data 
     */
    setData(index, data) {
        this.setLevel(index, data.level);
        this.setClass(index, data.class.id, data.class.name);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getLevel(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_LEVEL, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setLevel(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_LEVEL, index);

        this.setElementValueByName(fieldname, value);
    }

    
    /**
     * @param {Number} index 
     * @returns {SheetDataClassesClassClassDTO}
     */
    getClass(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS, index);
        let classElement = this.getElementByName(fieldname);

        return new SheetDataClassesClassClassDTO(Number(classElement.dataset.id), classElement.value);
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
}