class SheetDataHitpointsDTO {
    total;
    base;
    baseModifiers;
    characterLevel;
    constitutionModifier;
    constitutionHitPoints;
    other;
    otherModifiers;
    injuries;
    injuriesModifiers;
    current;
    description;

    /**
     * @param {Number} total 
     * @param {Number} base 
     * @param {Array.<SheetDataBaseModifierDTO>} baseModifiers 
     * @param {Number} characterLevel 
     * @param {Number} constitutionModifier 
     * @param {Number} constitutionHitPoints 
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     * @param {Number} injuries 
     * @param {Array.<SheetDataOtherModifierDTO>} injuriesModifiers 
     * @param {Number} current 
     * @param {String} description 
     */
    constructor(
        total,
        base,
        baseModifiers,
        characterLevel,
        constitutionModifier,
        constitutionHitPoints,
        other,
        otherModifiers,
        injuries,
        injuriesModifiers,
        current,
        description
    ) {
        //Set default modifiers
        if(!baseModifiers || baseModifiers.length == 0) {
            let sheetDataHitpointsInjuriesModifier_D4 = new SheetDataBaseModifierDTO(0, 'D4', 0);
            let sheetDataHitpointsInjuriesModifier_D6 = new SheetDataBaseModifierDTO(1, 'D6', 0);
            let sheetDataHitpointsInjuriesModifier_D8 = new SheetDataBaseModifierDTO(2, 'D8', 0);
            let sheetDataHitpointsInjuriesModifier_D10 = new SheetDataBaseModifierDTO(3, 'D10', 0);
            let sheetDataHitpointsInjuriesModifier_D12 = new SheetDataBaseModifierDTO(4, 'D12', 0);
            
            base = 0;
            baseModifiers = [
                sheetDataHitpointsInjuriesModifier_D4,
                sheetDataHitpointsInjuriesModifier_D6,
                sheetDataHitpointsInjuriesModifier_D8,
                sheetDataHitpointsInjuriesModifier_D10,
                sheetDataHitpointsInjuriesModifier_D12
            ];
        }

        if(!injuriesModifiers || injuriesModifiers.length == 0) {
            let sheetDataHitpointsInjuriesModifier_Regular = new SheetDataOtherModifierDTO(true, 'Allgemeiner Schaden', 0, false, true, true);
            
            injuries = 0;
            injuriesModifiers = [
                sheetDataHitpointsInjuriesModifier_Regular
            ];
        }

        this.total = total;
        this.base = base;
        this.baseModifiers = baseModifiers;
        this.characterLevel = characterLevel;
        this.constitutionModifier = constitutionModifier;
        this.constitutionHitPoints = constitutionHitPoints;
        this.other = other;
        this.otherModifiers = otherModifiers;
        this.injuries = injuries;
        this.injuriesModifiers = injuriesModifiers;
        this.current = current;
        this.description = description;
    }
}

class SheetDataBaseModifierDTO {
    id;
    reason;
    modifier;

    /**
     * @param {Number} id 
     * @param {String} reason 
     * @param {Number} modifier 
     */
    constructor(
        id,
        reason,
        modifier
    ) {
        this.id = id;
        this.reason = reason;
        this.modifier = modifier;
    }
}

class SheetSectionHitpoints extends AbstractSheetHelper{
    parent;
    /** @type {SheetSectionHitpointsBaseModifier} baseModifiers */
    baseModifiers;
    /** @type {OtherModifiers} otherModifiers */
    otherModifiers;
    /** @type {OtherModifiers} injuryModifiers */
    injuryModifiers;

    FIELDNAME_TOTAL = 'character-hitpoints-total';
    FIELDNAME_BASE = 'character-hitpoints-base';
    FIELDNAME_CHARACTER_LEVEL = 'character-hitpoints-character-level';
    FIELDNAME_CONSTITUTION_MODIFIER = 'character-hitpoints-constitution-modifier';
    FIELDNAME_CONSTITUTION_HITPOINTS = 'character-hitpoints-constitution-hitpoints';
    FIELDNAME_OTHER = 'character-hitpoints-other';
    FIELDNAME_INJURIES = 'character-hitpoints-injuries';
    FIELDNAME_CURRENT = 'character-hitpoints-current';
    FIELDNAME_DESCRIPTION = 'character-hitpoints-description';

    BASE_MODIFIER_ID_PREFIX = this.FIELDNAME_BASE;
    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;
    INJURIES_MODIFIER_ID_PREFIX = this.FIELDNAME_INJURIES;

    FIELDNAME_BASE_INDEX = 'character-hitpoints-base-id[]';
    FIELDID_BASE_ADD_ROW = 'character-hitpoints-base-add-row';

    FIELDNAME_OTHER_INDEX = 'character-hitpoints-other-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-hitpoints-other-add-row';

    FIELDNAME_INJURIES_INDEX = 'character-hitpoints-injuries-id[]';
    FIELDID_INJURIES_ADD_ROW = 'character-hitpoints-injuries-add-row';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.baseModifiers = new SheetSectionHitpointsBaseModifier(this, this.BASE_MODIFIER_ID_PREFIX, 'setBaseModifierByFieldName');
        this.otherModifiers = new OtherModifiers(this, this.OTHER_MODIFIER_ID_PREFIX, 'setOtherModifierByFieldName');
        this.injuryModifiers = new OtherModifiers(this, this.INJURIES_MODIFIER_ID_PREFIX, 'setInjuriesModifierByFieldName');
    }

    /**
     * Returns all data of section "hitpoints"
     * 
     * @returns {SheetDataHitpointsDTO}
     */
    getData() {
        return new SheetDataHitpointsDTO(
            this.getTotal(),
            this.getBase(),
            this.baseModifiers.getDataList(),
            this.getCharacterLevel(),
            this.getConstitutionModifier(),
            this.getConstitutionHitPoints(),
            this.getOther(),
            this.otherModifiers.getDataList(),
            this.getInjuries(),
            this.injuryModifiers.getDataList(),
            this.getCurrent(),
            this.getDescription()
        );
    }

    /**
     * Sets all data of section "hitpoints"
     * 
     * @param {SheetDataHitpointsDTO} data 
     */
    setData(data) {
        this.setTotal(data.total);
        this.setBase(data.base);
        this.baseModifiers.setDataList(data.baseModifiers);
        this.setCharacterLevel(data.characterLevel);
        this.setConstitutionModifier(data.constitutionModifier);
        this.setConstitutionHitPoints(data.constitutionHitPoints);
        this.setOther(data.other);
        this.otherModifiers.setDataList(data.otherModifiers);
        this.setInjuries(data.injuries);
        this.injuryModifiers.setDataList(data.injuriesModifiers);
        this.setCurrent(data.current);
        this.setDescription(data.description);
    }


    /**
     * @returns {Number}
     */
    getTotal() {
        return this.getElementValueByName(this.FIELDNAME_TOTAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTotal(value) {
        this.setElementValueByName(this.FIELDNAME_TOTAL, value);
    }


    /**
     * @returns {Number}
     */
    getBase() {
        return this.getElementValueByName(this.FIELDNAME_BASE, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setBase(value) {
        this.setElementValueByName(this.FIELDNAME_BASE, value);
    }


    /**
     * @param {String} fieldName 
     * @returns {Number}
     */
    getBaseModifierByFieldName(fieldName) {
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} fieldName 
     * @param {Number} value 
     */
    setBaseModifierByFieldName(fieldName, value) {
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @returns {Number}
     */
    getCharacterLevel() {
        return this.getElementValueByName(this.FIELDNAME_CHARACTER_LEVEL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setCharacterLevel(value) {
        this.setElementValueByName(this.FIELDNAME_CHARACTER_LEVEL, value);
    }


    /**
     * @returns {Number}
     */
    getConstitutionModifier() {
        return this.getElementValueByName(this.FIELDNAME_CONSTITUTION_MODIFIER, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setConstitutionModifier(value) {
        this.setElementValueByName(this.FIELDNAME_CONSTITUTION_MODIFIER, value);
    }


    /**
     * @returns {Number}
     */
    getConstitutionHitPoints() {
        return this.getElementValueByName(this.FIELDNAME_CONSTITUTION_HITPOINTS, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setConstitutionHitPoints(value) {
        this.setElementValueByName(this.FIELDNAME_CONSTITUTION_HITPOINTS, value);
    }


    /**
     * @returns {Number}
     */
    getOther() {
        return this.getOtherModifierByFieldName(this.FIELDNAME_OTHER);
    }

    /**
     * @param {Number} value 
     */
    setOther(value) {
        this.setOtherModifierByFieldName(this.FIELDNAME_OTHER, value);
    }


    /**
     * @param {String} fieldName 
     * @returns {Number}
     */
    getOtherModifierByFieldName(fieldName) {
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} fieldName 
     * @param {Number} value 
     */
    setOtherModifierByFieldName(fieldName, value) {
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @returns {Number}
     */
    getInjuries() {
        return this.getOtherModifierByFieldName(this.FIELDNAME_INJURIES);
    }

    /**
     * @param {Number} value 
     */
    setInjuries(value) {
        this.setOtherModifierByFieldName(this.FIELDNAME_INJURIES, value);
    }


    /**
     * @param {String} fieldName 
     * @returns {Number}
     */
    getInjuriesModifierByFieldName(fieldName) {
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} fieldName 
     * @param {Number} value 
     */
    setInjuriesModifierByFieldName(fieldName, value) {
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @returns {Number}
     */
    getCurrent() {
        return this.getElementValueByName(this.FIELDNAME_CURRENT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setCurrent(value) {
        this.setElementValueByName(this.FIELDNAME_CURRENT, value);
    }


    /**
     * @returns {Number}
     */
    getDescription() {
        return this.getElementValueByName(this.FIELDNAME_DESCRIPTION);
    }

    /**
     * @param {Number} value 
     */
    setDescription(value) {
        this.setElementValueByName(this.FIELDNAME_DESCRIPTION, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */
    
    calculateConstitutionModifier() {
        debug.log("SheetSectionHitpoints.calculateConstitutionModifier");

        let level = this.getCharacterLevel();
        let constitutionModifier = this.getConstitutionModifier();
        let constitutionHitPoints = level * constitutionModifier;
        this.setConstitutionHitPoints(constitutionHitPoints);
    }

    sumHitPoints() {
        debug.log("SheetSectionHitpoints.sumHitPoints");

        let base = this.getBase();
        let constitutionHitPoints = this.getConstitutionHitPoints();
        let other = this.getOther();
        let sum = base + constitutionHitPoints + other;
        this.setTotal(sum);
    }

    sumCurrentHitPoints() {
        debug.log("SheetSectionHitpoints.sumCurrentHitPoints");

        let hitpoints = this.getTotal();
        let injuries = this.getInjuries();
        let currentHitpoints = hitpoints - injuries;
        this.setCurrent(currentHitpoints);

        if(currentHitpoints > 0 ) {
            this.setElementColorByName(this.FIELDNAME_CURRENT);
        } else {
            this.setElementColorByName(this.FIELDNAME_CURRENT, '#a80000');
        }
    }
}

class SheetSectionHitpointsBaseModifier extends AbstractSheetHelper {
    parent;
    idPrefix;
    sumSetterCallback;

    FIELDNAME_INDEX = '-id[]';
    FIELDNAME_REASON = '-reason[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_MODIFIER = '-modifier[' + this.INDEX_PLACEHOLDER + ']';

    ELEMENTID_ADD_ROW = '-add-row';

    ELEMENTID_CELL_REASON = '-cell-reason[' + this.INDEX_PLACEHOLDER + ']'
    ELEMENTID_CELL_MODIFIER = '-cell-modifier[' + this.INDEX_PLACEHOLDER + ']'
    ELEMENTID_CELL_ICON = '-cell-icon[' + this.INDEX_PLACEHOLDER + ']'

    /**
     * @param {Object} parent 
     * @param {String} idPrefix 
     * @param {String} sumSetterCallback 
     */
    constructor(parent, idPrefix, sumSetterCallback) {
        super();
        this.parent = parent;
        this.idPrefix = idPrefix;
        this.sumSetterCallback = sumSetterCallback;
    }

    /**
     * Returns all baseModifiers
     * 
     * @returns {Array.<SheetDataBaseModifierDTO>}
     */
    getDataList() {
        let list = []; 
        let indexes = this.getIndexes(this.idPrefix + this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let data = this.getData(indexes[i])
            list.push(data);
        }
        return list;
    }

    /**
     * @param {Array.<SheetDataBaseModifierDTO>} list 
     */
    setDataList(list) {
        this.removeAllBaseModifiers();

        for (let i = 0; i < list.length; i++) {
            let data = list[i];
            this.addBaseModifier(data.id, data.reason, data.modifier);
        }
    }

    /**
     * Returns all data of one baseModifier
     * 
     * @param {Number} index 
     * @returns {SheetDataBaseModifierDTO}
    */
    getData(index) {
        return new SheetDataBaseModifierDTO(
            index,
            this.getReason(index),
            this.getModifier(index)
        );
    }

    /**
     * Sets all data of one baseModifier
     * 
     * @param {Number} index 
     * @param {SheetDataBaseModifierDTO} data 
     */
    setData(index, data) {
        this.setReason(index, data.reason);
        this.setModifier(index, data.modifier);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getReason(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REASON, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setReason(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REASON, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getModifier(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_MODIFIER, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setModifier(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_MODIFIER, index);

        this.setElementValueByName(fieldname, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllBaseModifiers() {
        let indexes = this.getIndexes(this.idPrefix + this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeBaseModifier(indexes[i]);
        }
    }

    /**
     * @param {Number} index
     */
    removeBaseModifier(index) {
        let elementIds = [
            this.setIndexToString(this.idPrefix + this.ELEMENTID_CELL_REASON, index),
            this.setIndexToString(this.idPrefix + this.ELEMENTID_CELL_MODIFIER, index),
            this.setIndexToString(this.idPrefix + this.ELEMENTID_CELL_ICON, index)
        ];
        for(let i = 0; i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }

        this.sumBaseModifiers();
    }

    /**
     * @param {Number} index 
     * @param {Boolean} active 
     * @param {String} reason 
     * @param {Number} modifier 
     * @param {Boolean} removeable 
     * @param {Boolean} reasonReadonly 
     * @param {Boolean} modifierReadonly 
     */
    addBaseModifier(index=null, reason='', modifier=0) {
        if(index == null) {
            index = this.determineNextIndex(this.idPrefix + this.FIELDNAME_INDEX);
        }

        let newBaseModifierHtmlString = ' \
            <div id="' + this.idPrefix + '-cell-reason[' + index + ']" class="grid-item-label" style="grid-column-end: span 1;"> \
                <input name="' + this.idPrefix + '-id[]" type="hidden" value="' + index + '"> \
                <input name="' + this.idPrefix + '-active[' + index + ']" type="checkbox" value="true" style="display: none;" checked></input> \
                <input name="' + this.idPrefix + '-reason[' + index + ']" type="hidden" value="' + reason + '"></input> \
                <label>' + reason + '</label> \
            </div> \
            <div id="' + this.idPrefix + '-cell-modifier[' + index + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="' + this.idPrefix + '-modifier[' + index + ']" class="field-data-short" type="number" value="' + modifier + '"></input> \
            </div> \
            <div id="' + this.idPrefix + '-cell-icon[' + index + ']" class="grid-item" style="grid-column-end: span 1;"> \
               &nbsp; \
            </div> \
        ';
        let newBaseModifierHtmlDocument = new DOMParser().parseFromString(newBaseModifierHtmlString, "text/html");
        let newBaseModifierHtmlCollection = newBaseModifierHtmlDocument.body.children;
        let otherModifierAddRow = this.getElementById(this.idPrefix + this.ELEMENTID_ADD_ROW);
        otherModifierAddRow.before(...newBaseModifierHtmlCollection);

        let modifierElement = this.getElementByName(this.idPrefix + this.setIndexToString(this.FIELDNAME_MODIFIER, index));
        this.addEvent(modifierElement, new MethodCallbackDTO(this, 'sumBaseModifiers'));

        this.sumBaseModifiers();
    }

    sumBaseModifiers() {
        let sum = 0;
        let indexes = this.getIndexes(this.idPrefix + this.FIELDNAME_INDEX);
        for(let i = 0;i < indexes.length; i++)
        {
            let index = indexes[i];
            let modifier = this.getModifier(index);
            sum += modifier;
        }
        
        this.parent[this.sumSetterCallback](this.idPrefix, sum);
    }
}