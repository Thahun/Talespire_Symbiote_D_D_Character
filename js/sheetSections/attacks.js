class SheetDataAttacksDTO {
    close;
    distance;

    /**
     * @param {SheetDataAttacksAttackDTO} close 
     * @param {SheetDataAttacksAttackDTO} distance 
     */
    constructor(
        close,
        distance
    ) {
        this.close = close;
        this.distance = distance;
    }
}

class SheetDataAttacksAttackDTO {
    total;
    basic;
    attribute;
    size;
    other;
    otherModifiers;

    /**
     * @param {Number} total 
     * @param {Number} basic 
     * @param {Number} attribute 
     * @param {Number} size 
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     */
    constructor(
        total,
        basic,
        attribute,
        size,
        other,
        otherModifiers
    ) {
        this.total = total;
        this.basic = basic;
        this.attribute = attribute;
        this.size = size;
        this.other = other;
        this.otherModifiers = otherModifiers;
    }
}

class SheetSectionAttacks extends AbstractSheetHelper{
    parent;
    /** @type {Array.<OtherModifiers>} otherModifiers */
    otherModifiers = [];

    ATTACK_TYPE_PLACEHOLDER = '%attackType%';

    static ATTACK_TYPE_CLOSE = 'close';
    static ATTACK_TYPE_DISTANCE = 'distance';

    FIELDNAME_TOTAL = 'character-attack-' + this.ATTACK_TYPE_PLACEHOLDER + '-total';
    FIELDNAME_BASIC = 'character-attack-' + this.ATTACK_TYPE_PLACEHOLDER + '-basic';
    FIELDNAME_ATTRIBUTE = 'character-attack-' + this.ATTACK_TYPE_PLACEHOLDER + '-attribute';
    FIELDNAME_SIZE = 'character-attack-' + this.ATTACK_TYPE_PLACEHOLDER + '-size';
    FIELDNAME_OTHER = 'character-attack-' + this.ATTACK_TYPE_PLACEHOLDER + '-other';

    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;

    FIELDNAME_OTHER_INDEX = 'character-attack-' + this.ATTACK_TYPE_PLACEHOLDER + '-other-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-attack-' + this.ATTACK_TYPE_PLACEHOLDER + '-other-add-row';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.otherModifiers[SheetSectionAttacks.ATTACK_TYPE_CLOSE] = new OtherModifiers(this, this.setAttackTypeToString(this.OTHER_MODIFIER_ID_PREFIX, SheetSectionAttacks.ATTACK_TYPE_CLOSE), 'setOtherModifierByFieldName');
        this.otherModifiers[SheetSectionAttacks.ATTACK_TYPE_DISTANCE] = new OtherModifiers(this, this.setAttackTypeToString(this.OTHER_MODIFIER_ID_PREFIX, SheetSectionAttacks.ATTACK_TYPE_DISTANCE), 'setOtherModifierByFieldName');
    }

    /**
     * Sets the attackType into e.g. a fieldname string
     * Replaces the placeholder '%attackType%'
     * 
     * @param {String} string 
     * @param {String} attackType 
     * @returns {String}
     */
    setAttackTypeToString(string, attackType) {
        return string.replaceAll(this.ATTACK_TYPE_PLACEHOLDER, attackType)
    }

    /**
     * Returns all data of section "attacks"
     * 
     * @returns {SheetDataAttacksDTO}
     */
    getData() {
        return new SheetDataAttacksDTO(
            this.getDataByType(SheetSectionAttacks.ATTACK_TYPE_CLOSE),
            this.getDataByType(SheetSectionAttacks.ATTACK_TYPE_DISTANCE)
        );
    }

    /**
     * Sets all data of section "attacks"
     * 
     * @param {SheetDataAttacksDTO} data 
     */
    setData(data) {
        this.setDataByType(SheetSectionAttacks.ATTACK_TYPE_CLOSE, data.close);
        this.setDataByType(SheetSectionAttacks.ATTACK_TYPE_DISTANCE, data.distance);
    }


    /**
     * @param {String} attackType 
     * @returns {SheetDataAttacksAttackDTO}
     */
    getDataByType(attackType) {
        return new SheetDataAttacksAttackDTO(
            this.getTotal(attackType),
            this.getBasic(attackType),
            this.getAttribute(attackType),
            this.getSize(attackType),
            this.getOther(attackType),
            this.otherModifiers[attackType].getDataList()
        );
    }

    /**
     * @param {String} attackType 
     * @param {SheetDataAttacksAttackDTO} attackData 
     */
    setDataByType(attackType, attackData) {
        this.setTotal(attackType, attackData.total);
        this.setBasic(attackType, attackData.basic);
        this.setAttribute(attackType, attackData.attribute);
        this.setSize(attackType, attackData.size);
        this.setOther(attackType, attackData.other);
        this.otherModifiers[attackType].setDataList(attackData.otherModifiers);
    }


    /**
     * @param {String} attackType 
     * @returns {Number}
     */
    getTotal(attackType) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_TOTAL, attackType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} attackType 
     * @param {Number} value 
     */
    setTotal(attackType, value) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_TOTAL, attackType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} attackType 
     * @returns {Number}
     */
    getBasic(attackType) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_BASIC, attackType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} attackType 
     * @param {Number} value 
     */
    setBasic(attackType, value) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_BASIC, attackType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} attackType 
     * @returns {Number}
     */
    getAttribute(attackType) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_ATTRIBUTE, attackType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} attackType 
     * @param {Number} value 
     */
    setAttribute(attackType, value) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_ATTRIBUTE, attackType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} attackType 
     * @returns {Number}
     */
    getSize(attackType) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_SIZE, attackType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} attackType 
     * @param {Number} value 
     */
    setSize(attackType, value) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_SIZE, attackType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} attackType 
     * @returns {Number}
     */
    getOther(attackType) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_OTHER, attackType);
        return this.getOtherModifierByFieldName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} attackType 
     * @param {Number} value 
     */
    setOther(attackType, value) {
        let fieldName = this.setAttackTypeToString(this.FIELDNAME_OTHER, attackType);
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
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {String} attackType
     * @param {Number} value
     */
    syncAttackBasic(attackType, value) {
        debug.log("SheetSectionAttacks.syncAttackBasic");

        let targets = [];
        switch(attackType) {
            case SheetSectionAttacks.ATTACK_TYPE_CLOSE:
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getBasicAttackBonus', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE], 'setBasicAttackBonus', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getBasicAttackBonus', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE], 'setBasicAttackBonus', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE]));
                break;
        }

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
     * @param {String} attackType
     */
    sumAttackBonus(attackType) {
        debug.log("SheetSectionAttacks.sumAttackBonus");

        let basic = this.getBasic(attackType);
        let attribute = this.getAttribute(attackType);
        let size = this.getSize(attackType);
        let other = this.getOther(attackType);
        let sum = basic + attribute + size + other;

        this.setTotal(attackType, sum);

        this.syncAttack(attackType, sum);
    }

    /**
     * @param {String} attackType 
     * @param {Number} value 
     */
    syncAttack(attackType, value) {
        debug.log("SheetSectionAttacks.syncAttack");

        this.parent.sectionWeapons.setAttackByAttackType(attackType, value);
    }
}