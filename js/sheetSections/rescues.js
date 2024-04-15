class SheetDataRescuesDTO {
    reflex;
    will;
    fortitude;
    description;

    /**
     * @param {SheetDataRescuesRescueDTO} reflex 
     * @param {SheetDataRescuesRescueDTO} will 
     * @param {SheetDataRescuesRescueDTO} fortitude 
     * @param {String} description
     */
    constructor(
        reflex,
        will,
        fortitude,
        description
    ) {
        this.reflex = reflex;
        this.will = will;
        this.fortitude = fortitude;
        this.description = description;
    }
}

class SheetDataRescuesRescueDTO {
    total;
    penalty;
    level;
    attribute;
    magic;
    other;
    otherModifiers;

    /**
     * @param {Number} total 
     * @param {Object} penalty 
     * @param {Number} level 
     * @param {Number} attribute 
     * @param {Number} magic 
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     */
    constructor(
        total,
        penalty,
        level,
        attribute,
        magic,
        other,
        otherModifiers
    ) {
        this.total = total;
        this.penalty = penalty;
        this.level = level;
        this.attribute = attribute;
        this.magic = magic;
        this.other = other;
        this.otherModifiers = otherModifiers;
    }
}

class SheetSectionRescues extends AbstractSheetHelper{
    parent;
    /** @type {Array.<OtherModifiers>} otherModifiers */
    otherModifiers = [];

    RESCUE_TYPE_PLACEHOLDER = '%rescueType%';

    static RESCUE_TYPE_REFLEX = 'reflex';
    static RESCUE_TYPE_WILL = 'will';
    static RESCUE_TYPE_FORTITUDE = 'fortitude';

    FIELDNAME_TOTAL = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-total';
    FIELDNAME_PENALTY = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-penalty';
    FIELDNAME_LEVEL = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-level';
    FIELDNAME_ATTRIBUTE = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-attribute';
    FIELDNAME_MAGIC = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-magic';
    FIELDNAME_OTHER = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-other';
    FIELDNAME_DESCRIPTION = 'character-rescue-description';

    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;

    FIELDNAME_OTHER_INDEX = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-other-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-rescue-' + this.RESCUE_TYPE_PLACEHOLDER + '-other-add-row';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.otherModifiers[SheetSectionRescues.RESCUE_TYPE_REFLEX] = new OtherModifiers(this, this.setRescueTypeToString(this.OTHER_MODIFIER_ID_PREFIX, SheetSectionRescues.RESCUE_TYPE_REFLEX), 'setOtherModifierByFieldName');
        this.otherModifiers[SheetSectionRescues.RESCUE_TYPE_WILL] = new OtherModifiers(this, this.setRescueTypeToString(this.OTHER_MODIFIER_ID_PREFIX, SheetSectionRescues.RESCUE_TYPE_WILL), 'setOtherModifierByFieldName');
        this.otherModifiers[SheetSectionRescues.RESCUE_TYPE_FORTITUDE] = new OtherModifiers(this, this.setRescueTypeToString(this.OTHER_MODIFIER_ID_PREFIX, SheetSectionRescues.RESCUE_TYPE_FORTITUDE), 'setOtherModifierByFieldName');
    }

    /**
     * Sets the rescueType into e.g. a fieldname string
     * Replaces the placeholder '%rescueType%'
     * 
     * @param {String} string 
     * @param {String} rescueType 
     * @returns {String}
     */
    setRescueTypeToString(string, rescueType) {
        return string.replaceAll(this.RESCUE_TYPE_PLACEHOLDER, rescueType)
    }

    /**
     * Returns all data of section "rescues"
     * 
     * @returns {SheetDataRescuesDTO}
     */
    getData() {
        return new SheetDataRescuesDTO(
            this.getDataByType(SheetSectionRescues.RESCUE_TYPE_REFLEX),
            this.getDataByType(SheetSectionRescues.RESCUE_TYPE_WILL),
            this.getDataByType(SheetSectionRescues.RESCUE_TYPE_FORTITUDE),
            this.getDescription()
        );
    }

    /**
     * Sets all data of section "rescues"
     * 
     * @param {SheetDataRescuesDTO} data 
     */
    setData(data) {
        this.setDataByType(SheetSectionRescues.RESCUE_TYPE_REFLEX, data.reflex);
        this.setDataByType(SheetSectionRescues.RESCUE_TYPE_WILL, data.will);
        this.setDataByType(SheetSectionRescues.RESCUE_TYPE_FORTITUDE, data.fortitude);
        this.setDescription(data.description);
    }


    /**
     * @param {String} rescueType 
     * @returns {SheetDataRescuesRescueDTO}
     */
    getDataByType(rescueType) {
        return new SheetDataRescuesRescueDTO(
            this.getTotal(rescueType),
            this.getPenalty(rescueType),
            this.getLevel(rescueType),
            this.getAttribute(rescueType),
            this.getMagic(rescueType),
            this.getOther(rescueType),
            this.otherModifiers[rescueType].getDataList()
        );
    }

    /**
     * @param {String} rescueType 
     * @param {SheetDataRescuesRescueDTO} rescueData 
     */
    setDataByType(rescueType, rescueData) {
        this.setTotal(rescueType, rescueData.total);
        this.setPenalty(rescueType, rescueData.penalty);
        this.setLevel(rescueType, rescueData.level);
        this.setAttribute(rescueType, rescueData.attribute);
        this.setMagic(rescueType, rescueData.magic);
        this.setOther(rescueType, rescueData.other);
        this.otherModifiers[rescueType].setDataList(rescueData.otherModifiers);
    }


    /**
     * @param {String} rescueType 
     * @returns {Number}
     */
    getTotal(rescueType) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_TOTAL, rescueType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} rescueType 
     * @param {Number} value 
     */
    setTotal(rescueType, value) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_TOTAL, rescueType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} rescueType 
     * @returns {Object}
     */
    getPenalty(rescueType) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_PENALTY, rescueType);
        return JSON.parse(this.getElementValueByName(fieldName));
    }

    /**
     * @param {String} rescueType 
     * @param {Object} value 
     */
    setPenalty(rescueType, value) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_PENALTY, rescueType);
        this.setElementValueByName(fieldName, JSON.stringify(value));
    }


    /**
     * @param {String} rescueType 
     * @returns {Number}
     */
    getLevel(rescueType) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_LEVEL, rescueType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} rescueType 
     * @param {Number} value 
     */
    setLevel(rescueType, value) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_LEVEL, rescueType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} rescueType 
     * @returns {Number}
     */
    getAttribute(rescueType) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_ATTRIBUTE, rescueType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} rescueType 
     * @param {Number} value 
     */
    setAttribute(rescueType, value) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_ATTRIBUTE, rescueType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} rescueType 
     * @returns {Number}
     */
    getMagic(rescueType) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_MAGIC, rescueType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} rescueType 
     * @param {Number} value 
     */
    setMagic(rescueType, value) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_MAGIC, rescueType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} rescueType 
     * @returns {Number}
     */
    getOther(rescueType) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_OTHER, rescueType);
        return this.getOtherModifierByFieldName(fieldName);
    }

    /**
     * @param {String} rescueType 
     * @param {Number} value 
     */
    setOther(rescueType, value) {
        let fieldName = this.setRescueTypeToString(this.FIELDNAME_OTHER, rescueType);
        this.setOtherModifierByFieldName(fieldName, value);
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
     * @returns {String}
     */
    getDescription() {
        return this.getElementValueByName(this.FIELDNAME_DESCRIPTION);
    }

    /**
     * @param {String} value 
     */
    setDescription(value) {
        this.setElementValueByName(this.FIELDNAME_DESCRIPTION, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {String} rescueType
     */
    sumModifiers(rescueType) {
        debug.log("SheetSectionRescues.sumModifiers");

        let rescueData = this.getDataByType(rescueType);
        let level = rescueData.level;
        let attribute = rescueData.attribute;
        let magic = rescueData.magic
        let other = rescueData.other
        let total = level + attribute + magic + other;

        let totalFieldName = this.setRescueTypeToString(this.FIELDNAME_TOTAL, rescueType);
        let penalty = this.parent.checkPenaltyHelper.calculateCheckPenalty(rescueData.penalty);
        if(penalty != 0) {
            this.setElementColorByName(totalFieldName, this.COLOR_CODE_RED)
            total -= penalty;
        } else {
            this.setElementColorByName(totalFieldName)
        }

        this.setTotal(rescueType, total);
    }
}