class SheetDataInitiativeDTO {
    total;
    dexterity;
    talent;
    other;
    otherModifiers;

    /**
     * @param {Number} total 
     * @param {Number} dexterity 
     * @param {Number} talent 
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     */
    constructor(
        total,
        dexterity,
        talent,
        other,
        otherModifiers
    ) {
        this.total = total;
        this.dexterity = dexterity;
        this.talent = talent;
        this.other = other;
        this.otherModifiers = otherModifiers;
    }
}

class SheetSectionInitiative extends AbstractSheetHelper{
    parent;
    /** @type {Array.<OtherModifiers>} otherModifiers */
    otherModifiers;

    FIELDNAME_TOTAL = 'character-initiative-total';
    FIELDNAME_DEXTERITY = 'character-initiative-dexterity';
    FIELDNAME_TALENT = 'character-initiative-talent';
    FIELDNAME_OTHER = 'character-initiative-other';

    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;

    FIELDNAME_OTHER_INDEX = 'character-initiative-other-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-initiative-other-add-row';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.otherModifiers = new OtherModifiers(this, this.OTHER_MODIFIER_ID_PREFIX, 'setOtherModifierByFieldName');
    }

    /**
     * Returns all data of section "initiative"
     * 
     * @returns {SheetDataInitiativeDTO}
     */
    getData() {
        return new SheetDataInitiativeDTO(
            this.getTotal(),
            this.getDexterity(),
            this.getTalent(),
            this.getOther(),
            this.otherModifiers.getDataList()
        );
    }

    /**
     * Sets all data of section "initiative"
     * 
     * @param {SheetDataInitiativeDTO} data 
     */
    setData(data) {
        this.setTotal(data.total);
        this.setDexterity(data.dexterity);
        this.setTalent(data.talent);
        this.setOther(data.other);
        this.otherModifiers.setDataList(data.otherModifiers);
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
    getDexterity() {
        return this.getElementValueByName(this.FIELDNAME_DEXTERITY, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setDexterity(value) {
        this.setElementValueByName(this.FIELDNAME_DEXTERITY, value);
    }


    /**
     * @returns {Number}
     */
    getTalent() {
        return this.getElementValueByName(this.FIELDNAME_TALENT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTalent(value) {
        this.setElementValueByName(this.FIELDNAME_TALENT, value);
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
     * ################################
     * # Sheet functions
     * ################################
     */

    sumInitiative() {
        debug.log("SheetSectionInitiative.sumInitiative");

        let dexterity = this.getDexterity();
        let talent = this.getTalent();
        let other = this.getOther();
        let sum = dexterity + talent + other;

        this.setTotal(sum);
    }
}