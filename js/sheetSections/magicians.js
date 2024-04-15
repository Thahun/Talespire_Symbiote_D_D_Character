class SheetDataMagiciansDTO {
    magicianList;

    /**
     * @param {Array.<SheetDataMagiciansMagicianDTO>} magicianList 
     */
    constructor(
        magicianList = []
    ) {
        this.magicianList = magicianList;
    }
}

class SheetDataMagiciansMagicianDTO {
    classData;
    attributeData;
    description;
    gradeList;

    /**
     * @param {SheetDataMagiciansMagicianClassDTO} classData 
     * @param {SheetDataMagiciansMagicianAttributeDTO} attributeData 
     * @param {String} description 
     * @param {Array.<SheetDataMagiciansMagicianGradeDTO>} gradeList 
     */
    constructor(
        classData,
        attributeData,
        description,
        gradeList
    ) {
        this.classData = classData;
        this.attributeData = attributeData;
        this.description = description;
        this.gradeList = gradeList;
    }
}

class SheetDataMagiciansMagicianClassDTO {
    id;
    name;
    level;

    /**
     * @param {Number} id 
     * @param {String} name 
     * @param {Number} level 
     */
    constructor(
        id,
        name,
        level
    ) {
        this.id = id;
        this.name = name;
        this.level = level;
    }
}

class SheetDataMagiciansMagicianAttributeDTO {
    id;
    shortName;
    value;
    modifier;

    /**
     * @param {Number} id 
     * @param {String} shortName 
     * @param {Number} value 
     * @param {Number} modifier 
     */
    constructor(
        id,
        shortName,
        value,
        modifier
    ) {
        this.id = id;
        this.shortName = shortName;
        this.value = value;
        this.modifier = modifier;
    }
}

class SheetDataMagiciansMagicianGradeDTO {
    grade;
    perDayMax;
    perDayAvailable;
    preparedMax;
    sg;
    dc;

    /**
     * @param {Number} grade 
     * @param {String} perDayMax 
     * @param {Number} perDayAvailable 
     * @param {Number} preparedMax 
     * @param {Number} sg 
     * @param {Number} dc 
     */
    constructor(
        grade,
        perDayMax,
        perDayAvailable,
        preparedMax,
        sg,
        dc
    ) {
        this.grade = grade;
        this.perDayMax = perDayMax;
        this.perDayAvailable = perDayAvailable;
        this.preparedMax = preparedMax;
        this.sg = sg;
        this.dc = dc;
    }
}

class SheetSectionMagicians extends AbstractSheetHelper {
    parent;
    sectionMagiciansMagician;

    static FIELDNAME_INDEX = 'character-magician-class-details-id[]';

    ELEMENTID_MAGICAN_LIST_SECTION = 'character-magician-class-details';
    ELEMENTID_MAGICAN_SECTION = 'character-magician-class-details[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionMagiciansMagician = new SheetSectionMagiciansMagician(this);
    }

    /**
     * Returns all data of section "magicians"
     * 
     * @returns {SheetDataMagiciansDTO}
     */
    getData() {
        return new SheetDataMagiciansDTO(
            this.getMagicians()
        );
    }

    /**
     * Sets all data of section "magicians"
     * 
     * @param {SheetDataMagiciansDTO} data 
     */
    setData(data) {
        this.setMagicians(data.magicianList);
    }


    /**
     * @returns {Array.<SheetDataMagiciansMagicianDTO>}
     */
    getMagicians() {
        let magicianList = []; 
        let indexes = this.getIndexes(SheetSectionMagicians.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let magicianData = this.sectionMagiciansMagician.getData(index);
            magicianList.push(magicianData);
        }
        return magicianList;
    }

    /**
     * Setting a list of magicians
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataMagiciansMagicianDTO>} magicianList 
     */
    setMagicians(magicianList) {
        this.removeAllMagicians();

        for (let i = 0; i < magicianList.length; i++) {
            let magicianData = magicianList[i];
            this.addMagician(
                magicianData.classData,
                magicianData.attributeData,
                magicianData.description,
                magicianData.gradeList
            );
        }
    }
    
    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllMagicians() {
        debug.log("SheetSectionMagicians.removeAllMagicians");

        let indexes = this.getIndexes(SheetSectionMagicians.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeMagician(indexes[i]);
        }
    }

    removeNonExistingMagicians() {
        debug.log("SheetSectionMagicians.removeNonExistingMagicians");

        let indexes = this.getIndexes(SheetSectionMagicians.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let classId = this.sectionMagiciansMagician.sectionMagiciansMagicianClass.getId(index);
            if(!this.parent.sectionClasses.findClassById(classId)) {
                this.removeMagician(index);
            }
        }
    }

    /**
     * @param {Number} magicianIndex 
     */
    removeMagician(magicianIndex) {
        debug.log("SheetSectionMagicians.removeMagician");

        let elementId = this.setIndexToString(this.ELEMENTID_MAGICAN_SECTION, magicianIndex);
        this.removeElementById(elementId);
    }

    /**
     * @param {SheetDataMagiciansMagicianClassDTO} classData 
     * @param {SheetDataMagiciansMagicianAttributeDTO} attributeData 
     * @param {String} description 
     * @param {Array.<SheetDataMagiciansMagicianGradeDTO>} gradeList 
     */
    addMagician(classData, attributeData = null, description = '', gradeList = null) {
        debug.log("SheetSectionMagicians.addMagicians");

        let magicianIndex = this.determineNextIndex(SheetSectionMagicians.FIELDNAME_INDEX);

        if(!attributeData) {
            attributeData = this.sectionMagiciansMagician.sectionMagiciansMagicianAttribute.getDataByClassId(classData.id);
        }

        let newMagicianHtmlString = ' \
        <div id="character-magician-class-details[' + magicianIndex + ']" class="sub-section"> \
        <div class="sub-section-header" onclick="SectionHelper.toggleSection(this.parentElement, true);"> \
            <span id="character-magician-class-details-title[' + magicianIndex + ']" class="sub-section-title">' + classData.name + '</span> \
            <div class="section-open" style="display: none;">▼</div> \
            <div class="section-close" style="display: block;">▲</div> \
        </div> \
        <div class="sub-section-body" style="display: block;"> \
            <input name="character-magician-class-details-id[]" type="hidden" value="' + magicianIndex + '"> \
            <input name="character-magician-class-details-class-id[' + magicianIndex + ']" type="hidden" value="' + classData.id + '"> \
            <input name="character-magician-class-details-class-name[' + magicianIndex + ']" type="hidden" value="' + classData.name + '"> \
            \
            <div class="section-grid-container" style="grid-template-columns: auto 3.6em 1.5em 3.6em repeat(6,auto);"> \
                <div class="grid-item-label" style="grid-column-end: span 1;"> \
                    <label>Zaubererstufe</label> \
                </div> \
                <div class="grid-item-data" style="grid-column-end: span 1;"> \
                    <input name="character-magician-class-details-class-level[' + magicianIndex + ']" class="field-data-short" type="number" value="' + classData.level + '" readonly></input> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 8;"> \
                    &nbsp; \
                </div> \
                \
                <div class="grid-item-label" style="grid-column-end: span 1;"> \
                    <label>Zaubererattribut</label> \
                </div> \
                <div class="grid-item-data" style="grid-column-end: span 1;"> \
                    <input name="character-magician-class-details-spell-casting-attribute-id[' + magicianIndex + ']" type="hidden" value="' + attributeData.id + '"></input> \
                    <input name="character-magician-class-details-spell-casting-attribute-short[' + magicianIndex + ']" class="field-data-short" type="text" value="' + attributeData.shortName + '" readonly></input> \
                </div> \
                <div class="grid-item-label align-center" style="grid-column-end: span 1;"> \
                    <span class="field-data-text standard-font">=</span> \
                </div> \
                <div class="grid-item-data" style="grid-column-end: span 1;"> \
                    <input name="character-magician-class-details-spell-casting-attribute-value[' + magicianIndex + ']" type="hidden" value="' + attributeData.value + '" onchange="sheetManager.sectionMagicians.sectionMagiciansMagician.sectionMagiciansMagicianGrade.updateSGs(' + magicianIndex + ')" readonly></input> \
                    <input name="character-magician-class-details-spell-casting-attribute-modifier[' + magicianIndex + ']" class="field-data-short" type="number" value="' + attributeData.modifier + '" onchange="sheetManager.sectionMagicians.sectionMagiciansMagician.sectionMagiciansMagicianGrade.updateDCs(' + magicianIndex + ')" readonly></input> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 6;"> \
                    &nbsp; \
                </div> \
                \
                <div class="grid-item-label" style="grid-column-end: span 1;"> \
                    <label>Besonderheiten</label> \
                </div> \
                <div class="grid-item-data" style="grid-column-end: span 9; grid-row-end: span 7;"> \
                    <textarea name="character-magician-class-details-description[' + magicianIndex + ']" style="height: 13em; width: 396px;">' + description + '</textarea> \
                </div> \
            </div> \
            \
            <br/> \
            \
            <div id="character-magician-class-details[' + magicianIndex + ']-grade-list" class="section-grid-container" style="grid-template-rows: 0.7rem 0.7em;"> \
                <div class="grid-item-header-label" style="grid-column-end: span 1;"> \
                    <label>Grad</label> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item-header-label" style="grid-column-end: span 3;"> \
                    <label>Anzahl pro Tag</label> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item-header-label" style="grid-column-end: span 1;"> \
                    <label>Vorbereitet</label> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item-header-label" style="grid-column-end: span 1;"> \
                    <label title="Schwierigkeitsgrad - Int value must be higher to learn a spell of this grade.">SG</label> \
                </div> \
                <div class="grid-item-header-label" style="grid-column-end: span 1;"> \
                    <label title="DifficultyClass - needs to be beaten by enemies rescu throws.">DC</label> \
                </div> \
                \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item-subtitel-label" style="grid-column-end: span 1;"> \
                    <label>Maximal</label> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item-subtitel-label" style="grid-column-end: span 1;"> \
                    <label>Verbleibend</label> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item-subtitel-label" style="grid-column-end: span 1;"> \
                    <label>Maximal</label> \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
                <div class="grid-item" style="grid-column-end: span 1;"> \
                    &nbsp; \
                </div> \
            </div> \
        </div> \
        ';

        let newMagicianHtmlDocument = new DOMParser().parseFromString(newMagicianHtmlString, "text/html");
        let newMagicianHtmlCollection = newMagicianHtmlDocument.body.children;
        let characterMagicianContainer = document.getElementById(this.ELEMENTID_MAGICAN_LIST_SECTION);
        characterMagicianContainer.appendChild(...newMagicianHtmlCollection);

        this.sectionMagiciansMagician.addGradeList(magicianIndex, gradeList);
    }

    /**
     * @param {SheetDataClassesClassDTO} classData 
     */
    updateClass(classIndex, classData) {
        debug.log("SheetSectionMagicians.updateClass");

        this.removeNonExistingMagicians();

        let index = this.findMagicianIndexByClassId(classData.classData.id);
        if(!index) {
            let classObj = CharacterDataTables.getClassById(classData.classData.id);
            if(classObj.isMagician) {
                let classData = this.sectionMagiciansMagician.sectionMagiciansMagicianClass.getDataByClassIndex(classIndex)
                this.addMagician(classData);
            }
        }
    }

    /**
     * @param {SheetDataClassesClassDTO} classData 
     */
    updateClassLevel(classData) {
        debug.log("SheetSectionMagicians.updateClassLevel");

        let index = this.findMagicianIndexByClassId(classData.classData.id);
        if(!index) {
            return;
        }
        this.sectionMagiciansMagician.sectionMagiciansMagicianClass.setLevel(index, classData.level);
    }

    /**
     * @param {Number} classId 
     * @returns {Number|null} 
     */
    findMagicianIndexByClassId(classId) {
        debug.log("SheetSectionMagicians.findMagicianIndexByClassId");

        let indexes = this.getIndexes(SheetSectionMagicians.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionMagiciansMagician.getClassData(index).id == classId) {
                return index;
            }
        }

        return null;
    }

    /**
     * @param {Object} attribute 
     * @param {Number} attributeValue 
     */
    updateAttributeValue(attribute, attributeValue) {
        debug.log("SheetSectionMagicians.updateAttributeValue");

        let indexes = this.getIndexes(SheetSectionMagicians.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionMagiciansMagician.sectionMagiciansMagicianAttribute.getId(index) == attribute.id) {
                this.sectionMagiciansMagician.sectionMagiciansMagicianAttribute.setValue(index, attributeValue);
            }
        }
    }

    /**
     * @param {Object} attribute 
     * @param {Number} modifierValue 
     */
    updateAttributeModifier(attribute, modifierValue) {
        debug.log("SheetSectionMagicians.updateAttributeModifier");

        let indexes = this.getIndexes(SheetSectionMagicians.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionMagiciansMagician.sectionMagiciansMagicianAttribute.getId(index) == attribute.id) {
                this.sectionMagiciansMagician.sectionMagiciansMagicianAttribute.setModifier(index, modifierValue);
            }
        }
    }
}

class SheetSectionMagiciansMagician extends AbstractSheetHelper {
    parent;
    sectionMagiciansMagicianClass;
    sectionMagiciansMagicianAttribute;
    sectionMagiciansMagicianGrade;

    FIELDNAME_DESCRIPTION = 'character-magician-class-details-description[' + this.INDEX_PLACEHOLDER + ']';

    ELEMENTID_GRADE_LIST_SECTION = 'character-magician-class-details[' + this.INDEX_PLACEHOLDER + ']-grade-list';

    /**
     * @param {SheetSectionMagicians} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionMagiciansMagicianClass = new SheetSectionMagiciansMagicianClass(this);
        this.sectionMagiciansMagicianAttribute = new SheetSectionMagiciansMagicianAttribute(this);
        this.sectionMagiciansMagicianGrade = new SheetSectionMagiciansMagicianGrade(this);
    }

    /**
     * Returns all data of one magician of section "magicians"
     * 
     * @param {Number} index 
     * @returns {SheetDataMagiciansMagicianDTO}
     */
    getData(index) {
        return new SheetDataMagiciansMagicianDTO(
            this.getClassData(index),
            this.getAttributeData(index),
            this.getDescription(index),
            this.getGradeList(index)
        );
    }


    /**
     * @param {Number} index 
     * @returns {SheetDataMagiciansMagicianClassDTO}
     */
    getClassData(index) {
        return this.sectionMagiciansMagicianClass.getData(index);
    }

    /**
     * @param {Number} index 
     * @param {SheetDataMagiciansMagicianClassDTO} data 
     */
    setClassData(index, data) {
        return this.sectionMagiciansMagicianClass.setData(index, data);
    }


    /**
     * @param {Number} index 
     * @returns {SheetDataMagiciansMagicianAttributeDTO}
     */
    getAttributeData(index) {
        return this.sectionMagiciansMagicianAttribute.getData(index);
    }

    /**
     * @param {Number} index 
     * @param {SheetDataMagiciansMagicianAttributeDTO} data 
     */
    setAttributeData(index, data) {
        return this.sectionMagiciansMagicianAttribute.setData(index, data);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getDescription(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DESCRIPTION, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setDescription(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DESCRIPTION, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Array.<SheetDataMagiciansMagicianGradeDTO>}
     */
    getGradeList(index) {
        return this.sectionMagiciansMagicianGrade.getDataList(index);
    }
    
    /**
     * ################################
     * # Sheet functions
     * ################################
     */
    
    /**
     * @param {Number} magicianIndex
     * @param {Array.<SheetDataMagiciansMagicianGradeDTO>} gradeList 
     */
    addGradeList(magicianIndex, gradeList = null) {
        debug.log("SheetSectionMagiciansMagician.addGradeList");
        
        if(!gradeList) {
            gradeList = this.sectionMagiciansMagicianGrade.getDefaultList(magicianIndex);
        }

        for (let index = 0; index < gradeList.length; index++) {
            let gradeData = gradeList[index];
            this.addGrade(magicianIndex, gradeData);
        }
    }
    
    /**
     * @param {Number} magicianIndex
     * @param {SheetDataMagiciansMagicianGradeDTO} gradeData 
     */
    addGrade(magicianIndex, gradeData) {
        debug.log("SheetSectionMagiciansMagician.addGrade");

        let gradeIndex = gradeData.grade;

        let newGradeHtmlString = ' \
        <div class="grid-item-label align-center" style="grid-column-end: span 1;"> \
            <label>' + gradeIndex + '</label> \
        </div> \
        <div class="grid-item" style="grid-column-end: span 1;"> \
            &nbsp; \
        </div> \
        <div class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-magician-class-details-grade-' + gradeIndex + '-per-day-max[' + magicianIndex + ']" class="field-data-short" type="number" value="' + gradeData.perDayMax + '"></input> \
        </div> \
        <div class="grid-item" style="grid-column-end: span 1;"> \
            <span class="field-data-text standard-font">/</span> \
        </div> \
        <div class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-magician-class-details-grade-' + gradeIndex + '-per-day-available[' + magicianIndex + ']" class="field-data-short" type="number" value="' + gradeData.perDayAvailable + '"></input> \
        </div> \
        <div class="grid-item" style="grid-column-end: span 1;"> \
            &nbsp; \
        </div> \
        <div class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-magician-class-details-grade-' + gradeIndex + '-prepared-max[' + magicianIndex + ']" class="field-data-short" type="number" value="' + gradeData.preparedMax + '"></input> \
        </div> \
        <div class="grid-item" style="grid-column-end: span 1;"> \
            &nbsp; \
        </div> \
        <div class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-magician-class-details-grade-' + gradeIndex + '-spells-sg[' + magicianIndex + ']" class="field-data-short" type="number" value="' + gradeData.sg + '" readonly></input> \
        </div> \
        <div class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-magician-class-details-grade-' + gradeIndex + '-spells-dc[' + magicianIndex + ']" class="field-data-short" type="number" value="' + gradeData.dc + '" readonly></input> \
        </div> \
        ';

        let newGradeHtmlDocument = new DOMParser().parseFromString(newGradeHtmlString, "text/html");
        let newGradeHtmlCollection = newGradeHtmlDocument.body.children;
        let fieldname = this.setIndexToString(this.ELEMENTID_GRADE_LIST_SECTION, magicianIndex);
        let characterMagicianGradeContainer = document.getElementById(fieldname);
        characterMagicianGradeContainer.append(...newGradeHtmlCollection);

        this.sectionMagiciansMagicianGrade.checkSGState(magicianIndex, gradeIndex, gradeData.sg);
    }
}

class SheetSectionMagiciansMagicianClass extends AbstractSheetHelper {
    parent;

    FIELDNAME_CLASS_ID = 'character-magician-class-details-class-id[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_CLASS_NAME = 'character-magician-class-details-class-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_CLASS_LEVEL = 'character-magician-class-details-class-level[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionMagiciansMagician} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns class data of one magician of section "magicians"
     * 
     * @param {Number} index 
     * @returns {SheetDataMagiciansMagicianClassDTO}
     */
    getData(index) {
        return new SheetDataMagiciansMagicianClassDTO(
            this.getId(index),
            this.getName(index),
            this.getLevel(index)
        );
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getId(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS_ID, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setId(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS_ID, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getName(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS_NAME, index);
        
        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setName(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS_NAME, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getLevel(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS_LEVEL, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setLevel(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS_LEVEL, index);

        this.setElementValueByName(fieldname, value);
    }
    
    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * Returns class data by class index
     * 
     * @param {Number} classIndex 
     * @returns {SheetDataMagiciansMagicianClassDTO}
     */
    getDataByClassIndex(classIndex) {
        debug.log("SheetSectionMagiciansMagicianClass.getDataByClassIndex");

        let classData = this.parent.parent.parent.sectionClasses.sectionClassesClass.getData(classIndex);

        return new SheetDataMagiciansMagicianClassDTO(
            classData.classData.id,
            classData.classData.name,
            classData.level
        );
    }
}

class SheetSectionMagiciansMagicianAttribute extends AbstractSheetHelper {
    parent;

    FIELDNAME_ATTRIBUTE_ID = 'character-magician-class-details-spell-casting-attribute-id[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ATTRIBUTE_SHORT = 'character-magician-class-details-spell-casting-attribute-short[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ATTRIBUTE_VALUE = 'character-magician-class-details-spell-casting-attribute-value[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ATTRIBUTE_MODIFIER = 'character-magician-class-details-spell-casting-attribute-modifier[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionMagiciansMagician} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns attribute data of one magician of section "magicians"
     * 
     * @param {Number} index 
     * @returns {SheetDataMagiciansMagicianAttributeDTO}
     */
    getData(index) {
        return new SheetDataMagiciansMagicianAttributeDTO(
            this.getId(index),
            this.getShort(index),
            this.getValue(index),
            this.getModifier(index)
        );
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getId(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_ID, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setId(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_ID, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getShort(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_SHORT, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setShort(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_SHORT, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getValue(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_VALUE, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setValue(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_VALUE, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getModifier(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_MODIFIER, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setModifier(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_MODIFIER, index);

        this.setElementValueByName(fieldname, value);
    }
    
    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * Returns attribute data by class id
     * 
     * @param {Number} classId 
     * @returns {SheetDataMagiciansMagicianAttributeDTO}
     */
    getDataByClassId(classId) {
        debug.log("SheetSectionMagiciansMagicianAttribute.getDataByClassId");

        let classObj = CharacterDataTables.getClassById(classId);
        let attributeId = classObj.spellCastingAttributeId;
        let attributeObj = CharacterDataTables.getAttributeById(attributeId);
        let attributeValue = this.parent.parent.parent.sectionAttributes.getAttributeValue(attributeObj.propertyName);
        let attributeModifier = this.parent.parent.parent.sectionAttributes.getAttributeModifier(attributeObj.propertyName);

        return new SheetDataMagiciansMagicianAttributeDTO(
            attributeId,
            attributeObj.short,
            attributeValue,
            attributeModifier
        );
    }
}

class SheetSectionMagiciansMagicianGrade extends AbstractSheetHelper {
    parent;

    GRADE_PLACEHOLDER = '%grade%';

    FIELDNAME_GRADE_PER_DAY_MAX = 'character-magician-class-details-grade-' + this.GRADE_PLACEHOLDER + '-per-day-max[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_GRADE_PER_DAY_AVAILABLE = 'character-magician-class-details-grade-' + this.GRADE_PLACEHOLDER + '-per-day-available[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_GRADE_REPARED_MAX = 'character-magician-class-details-grade-' + this.GRADE_PLACEHOLDER + '-prepared-max[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_GRADE_SG = 'character-magician-class-details-grade-' + this.GRADE_PLACEHOLDER + '-spells-sg[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_GRADE_DC = 'character-magician-class-details-grade-' + this.GRADE_PLACEHOLDER + '-spells-dc[' + this.INDEX_PLACEHOLDER + ']';

    GRADE_MAX = 9;

    /**
     * @param {SheetSectionMagiciansMagician} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
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
     * Returns all grades of one magician of section "magicians"
     * 
     * @param {Number} magicianIndex 
     * @returns {Array.<SheetDataMagiciansMagicianGradeDTO>}
     */
    getDataList(magicianIndex) {
        let gradeList = [];
        for (let gradeIndex = 0; gradeIndex <= this.GRADE_MAX; gradeIndex++) {
            gradeList.push(this.getData(magicianIndex, gradeIndex));
        }

        return gradeList;
    }
    
    /**
     * Returns grade data of one grade of a magician of section "magicians"
     * 
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @returns {SheetDataMagiciansMagicianGradeDTO}
     */
    getData(magicianIndex, gradeIndex) {
        return new SheetDataMagiciansMagicianGradeDTO(
            gradeIndex,
            this.getPerDayMax(magicianIndex, gradeIndex),
            this.getPerDayAvailable(magicianIndex, gradeIndex),
            this.getPreparedMax(magicianIndex, gradeIndex),
            this.getSG(magicianIndex, gradeIndex),
            this.getDC(magicianIndex, gradeIndex)
        );
    }


    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @returns {Number}
     */
    getPerDayMax(magicianIndex, gradeIndex) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_PER_DAY_MAX, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @param {Number} value 
     */
    setPerDayMax(magicianIndex, gradeIndex, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_PER_DAY_MAX, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @returns {Number}
     */
    getPerDayAvailable(magicianIndex, gradeIndex) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_PER_DAY_AVAILABLE, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @param {Number} value 
     */
    setPerDayAvailable(magicianIndex, gradeIndex, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_PER_DAY_AVAILABLE, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @returns {Number}
     */
    getPreparedMax(magicianIndex, gradeIndex) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_REPARED_MAX, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @param {Number} value 
     */
    setPreparedMax(magicianIndex, gradeIndex, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_REPARED_MAX, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @returns {Number}
     */
    getSG(magicianIndex, gradeIndex) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_SG, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @param {Number} value 
     */
    setSG(magicianIndex, gradeIndex, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_SG, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        this.setElementValueByName(fieldname, value);
        this.checkSGState(magicianIndex, gradeIndex, value);
    }


    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @returns {Number}
     */
    getDC(magicianIndex, gradeIndex) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_DC, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @param {Number} value 
     */
    setDC(magicianIndex, gradeIndex, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_DC, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);

        this.setElementValueByName(fieldname, value);
    }
    
    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {Number} grade 
     * @returns {Number}
     */
    determineSG(grade) {
        debug.log("SheetSectionMagiciansMagicianGrade.determineSG");

        return 10 + grade;
    }

    /**
     * @param {Number} magicianIndex 
     * @param {Number} gradeIndex 
     * @param {Number|null} value 
     */
    checkSGState(magicianIndex, gradeIndex, sgValue = null) {
        debug.log("SheetSectionMagiciansMagicianGrade.checkSGState");

        if(!sgValue) {
            sgValue = this.getSG(magicianIndex, gradeIndex);
        }
        let attributeValue = this.parent.sectionMagiciansMagicianAttribute.getValue(magicianIndex);

        let fieldname = this.setIndexToString(this.FIELDNAME_GRADE_SG, magicianIndex)
        fieldname = this.setGradeToString(fieldname, gradeIndex);
        let color = null;
        if(attributeValue < sgValue) {
            color = this.COLOR_CODE_RED;
        }
        this.setElementColorByName(fieldname, color);
    }

    /**
     * @param {Number} magicianIndex 
     * @param {Number} grade 
     * @returns {Number}
     */
    determineDC(magicianIndex, grade) {
        debug.log("SheetSectionMagiciansMagicianGrade.determineDC");

        let magicianAttributeModifier = this.parent.sectionMagiciansMagicianAttribute.getModifier(magicianIndex);
        return 10 + grade + magicianAttributeModifier;
    }
    
    /**
     * @param {Number} magicianIndex 
     * @return {Array.<SheetDataMagiciansMagicianGradeDTO>}
     */
    getDefaultList(magicianIndex) {
        debug.log("SheetSectionMagiciansMagicianGrade.getDefaultList");
        
        let gradeList = [];

        for (let gradeIndex = 0; gradeIndex <= this.GRADE_MAX; gradeIndex++) {
            let gradeData = new SheetDataMagiciansMagicianGradeDTO(gradeIndex, 0, 0, 0, this.determineSG(gradeIndex), this.determineDC(magicianIndex, gradeIndex));
            gradeList.push(gradeData);
        }

        return gradeList;
    }

    /**
     * @param {Number} magicianIndex 
     */
    updateSGs(magicianIndex) {
        debug.log("SheetSectionMagiciansMagicianGrade.updateSGs");

        for (let gradeIndex = 0; gradeIndex <= this.GRADE_MAX; gradeIndex++) {
            this.checkSGState(magicianIndex, gradeIndex);
        }
    }

    /**
     * @param {Number} magicianIndex 
     */
    updateDCs(magicianIndex) {
        debug.log("SheetSectionMagiciansMagicianGrade.updateDCs");

        for (let gradeIndex = 0; gradeIndex <= this.GRADE_MAX; gradeIndex++) {
            let newDC = this.determineDC(magicianIndex, gradeIndex);
            this.setDC(magicianIndex, gradeIndex, newDC)
        }
    }
}