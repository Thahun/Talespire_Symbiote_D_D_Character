class SheetDataCombatManeuversDTO {
    offensive;
    defensive;

    /**
     * @param {SheetDataCombatManeuversManeuverDTO} offensive 
     * @param {SheetDataCombatManeuversManeuverDTO} defensive 
     */
    constructor(
        offensive,
        defensive
    ) {
        this.offensive = offensive;
        this.defensive = defensive;
    }
}

class SheetDataCombatManeuversManeuverDTO {
    combatType;
    total;
    basicAttackBonus;
    attributeStrength;
    attributeDexterity;
    size;
    other;
    otherModifiers;

    /**
     * @param {String} combatType 
     * @param {Number} total 
     * @param {Number} basicAttackBonus 
     * @param {Number} attributeStrength 
     * @param {Number} attributeDexterity 
     * @param {Number} size 
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     */
    constructor(
        combatType,
        total,
        basicAttackBonus,
        attributeStrength,
        attributeDexterity,
        size,
        other,
        otherModifiers
    ) {
        //Set default modifiers
        if(!otherModifiers || otherModifiers.length == 0) {
            let sheetDataCombatManeuversOtherModifier_Stuned = new SheetDataOtherModifierDTO(false, 'Betäubter Gegner', 4, false, false, true, true);
            let sheetDataCombatManeuversOtherModifier_FlatFooted = new SheetDataOtherModifierDTO(false, 'Niedergeschlagen', 0, false, false, true, true);
            let sheetDataCombatManeuversOtherModifier_AC_Dodge = new SheetDataOtherModifierDTO(true, 'Rüstung: Ausweichen', 0, false, true, true, true);
            let sheetDataCombatManeuversOtherModifier_AC_Deflection = new SheetDataOtherModifierDTO(true, 'Rüstung: Ablenken', 0, false, true, true, true);
            let sheetDataCombatManeuversOtherModifier_AC_Sacred  = new SheetDataOtherModifierDTO(true, 'Rüstung: Un-/Heilig', 0, false, true, true, true);
            let sheetDataCombatManeuversOtherModifier_AC_Luck = new SheetDataOtherModifierDTO(true, 'Rüstung: Glück', 0, false, true, true, true);
            let sheetDataCombatManeuversOtherModifier_AC_Morale = new SheetDataOtherModifierDTO(true, 'Rüstung: Moral', 0, false, true, true, true);
            
            other = 0;
            otherModifiers = [];
            switch(combatType) {
                case SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE:
                    otherModifiers = [
                        sheetDataCombatManeuversOtherModifier_Stuned,
                    ];
                    break;
                case SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE:
                    otherModifiers = [
                        sheetDataCombatManeuversOtherModifier_FlatFooted,
                        sheetDataCombatManeuversOtherModifier_AC_Dodge,
                        sheetDataCombatManeuversOtherModifier_AC_Deflection,
                        sheetDataCombatManeuversOtherModifier_AC_Sacred,
                        sheetDataCombatManeuversOtherModifier_AC_Luck,
                        sheetDataCombatManeuversOtherModifier_AC_Morale,
                    ];
                    break;
            }
        }

        this.combatType = combatType;
        this.total = total;
        this.basicAttackBonus = basicAttackBonus;
        this.attributeStrength = attributeStrength;
        this.attributeDexterity = attributeDexterity;
        this.size = size;
        this.other = other;
        this.otherModifiers = otherModifiers;
    }
}

class SheetSectionCombatManeuvers extends AbstractSheetHelper{
    parent;
    /** @type {Array.<OtherModifiers>} otherModifiers */
    otherModifiers = [];

    CMB_SIZE_CATEGORY_THRESHOLD = 4; // If <= this threshold, dexterity is used instead of strength
    CMD_BASE = 10;

    COMBAT_TYPE_PLACEHOLDER = '%combatType%';

    static COMBAT_TYPE_OFFENSIVE = 'offensive';
    static COMBAT_TYPE_DEFENSIVE = 'defensive';

    FIELDNAME_TOTAL = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-total';
    FIELDNAME_BASIC_ATTACK_BONUS = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-basic-attack-bonus';
    FIELDNAME_ATTRIBUTE_STRENGTH = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-attribute-strength';
    FIELDNAME_ATTRIBUTE_DEXTERITY = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-attribute-dexterity';
    FIELDNAME_SIZE = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-size';
    FIELDNAME_OTHER = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-other';

    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;
    static OTHER_MODIFIER_INDEX_FLATFOOTED = 0;
    static OTHER_MODIFIER_INDEX_AC_DODGE = 1;
    static OTHER_MODIFIER_INDEX_AC_DEFLECTION = 2;
    static OTHER_MODIFIER_INDEX_AC_SACRED = 3;
    static OTHER_MODIFIER_INDEX_AC_LUCK = 4;
    static OTHER_MODIFIER_INDEX_AC_MORALE = 5;

    FIELDNAME_OTHER_INDEX = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-other-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-combat-' + this.COMBAT_TYPE_PLACEHOLDER + '-other-add-row';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE] = new OtherModifiers(this, this.setCombatTypeToString(this.OTHER_MODIFIER_ID_PREFIX, SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE), 'setOtherModifierByFieldName');
        this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE] = new OtherModifiers(this, this.setCombatTypeToString(this.OTHER_MODIFIER_ID_PREFIX, SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE), 'setOtherModifierByFieldName');
    }

    /**
     * Sets the combatType into e.g. a fieldname string
     * Replaces the placeholder '%combatType%'
     * 
     * @param {String} string 
     * @param {String} combatType 
     * @returns {String}
     */
    setCombatTypeToString(string, combatType) {
        return string.replaceAll(this.COMBAT_TYPE_PLACEHOLDER, combatType)
    }

    /**
     * Returns all data of section "combat"
     * 
     * @returns {SheetDataCombatManeuversDTO}
     */
    getData() {
        return new SheetDataCombatManeuversDTO(
            this.getDataByType(SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE),
            this.getDataByType(SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE)
        );
    }

    /**
     * Sets all data of section "combat"
     * 
     * @param {SheetDataCombatManeuversDTO} data 
     */
    setData(data) {
        this.setDataByType(SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE, data.offensive);
        this.setDataByType(SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE, data.defensive);
    }


    /**
     * @param {String} combatType 
     * @returns {SheetDataCombatManeuversManeuverDTO}
     */
    getDataByType(combatType) {
        return new SheetDataCombatManeuversManeuverDTO(
            combatType,
            this.getTotal(combatType),
            this.getBasicAttackBonus(combatType),
            this.getAttributeStrength(combatType),
            this.getAttributeDexterity(combatType),
            this.getSize(combatType),
            this.getOther(combatType),
            this.otherModifiers[combatType].getDataList()
        );
    }

    /**
     * @param {String} combatType 
     * @param {SheetDataCombatManeuversManeuverDTO} maneuverData 
     */
    setDataByType(combatType, maneuverData) {
        this.setTotal(combatType, maneuverData.total);
        this.setBasicAttackBonus(combatType, maneuverData.basicAttackBonus);
        this.setAttributeStrength(combatType, maneuverData.attributeStrength);
        this.setAttributeDexterity(combatType, maneuverData.attributeDexterity);
        this.setSize(combatType, maneuverData.size);
        this.setOther(combatType, maneuverData.other);
        this.otherModifiers[combatType].setDataList(maneuverData.otherModifiers);

        if(combatType == SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE) {
            this.updateFlatfootedModifier();
            this.updateACModifiers();
        }
    }


    /**
     * @param {String} combatType 
     * @returns {Number}
     */
    getTotal(combatType) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_TOTAL, combatType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} combatType 
     * @param {Number} value 
     */
    setTotal(combatType, value) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_TOTAL, combatType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} combatType 
     * @returns {Number}
     */
    getBasicAttackBonus(combatType) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_BASIC_ATTACK_BONUS, combatType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} combatType 
     * @param {Number} value 
     */
    setBasicAttackBonus(combatType, value) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_BASIC_ATTACK_BONUS, combatType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} combatType 
     * @returns {Number}
     */
    getAttributeStrength(combatType) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_ATTRIBUTE_STRENGTH, combatType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} combatType 
     * @param {Number} value 
     */
    setAttributeStrength(combatType, value) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_ATTRIBUTE_STRENGTH, combatType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} combatType 
     * @returns {Number}
     */
    getAttributeDexterity(combatType) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_ATTRIBUTE_DEXTERITY, combatType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} combatType 
     * @param {Number} value 
     */
    setAttributeDexterity(combatType, value) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_ATTRIBUTE_DEXTERITY, combatType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} combatType 
     * @returns {Number}
     */
    getSize(combatType) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_SIZE, combatType);
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} combatType 
     * @param {Number} value 
     */
    setSize(combatType, value) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_SIZE, combatType);
        this.setElementValueByName(fieldName, value);
    }


    /**
     * @param {String} combatType 
     * @returns {Number}
     */
    getOther(combatType) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_OTHER, combatType);
        return this.getOtherModifierByFieldName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} combatType 
     * @param {Number} value 
     */
    setOther(combatType, value) {
        let fieldName = this.setCombatTypeToString(this.FIELDNAME_OTHER, combatType);
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
     * @param {String} combatType
     */
    sumCombatBonus(combatType) {
        debug.log("SheetSectionCombatManeuvers.sumCombatBonus");

        let basicAttackBonus = this.getBasicAttackBonus(combatType);
        let attributeStrength = this.getAttributeStrength(combatType);
        let attributeDexterity = this.getAttributeDexterity(combatType);
        let size = this.getSize(combatType);
        let other = this.getOther(combatType);

        let sum = 0;
        switch(combatType) {
            case SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE:
                let sizeCategoryId = this.parent.sectionAppearance.getSizeCategory().id;
                let attribute = (sizeCategoryId <= this.CMB_SIZE_CATEGORY_THRESHOLD ? attributeDexterity : attributeStrength);
                sum = basicAttackBonus + attribute + size + other;
                break;
            case SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE:
                sum = this.CMD_BASE + basicAttackBonus + attributeStrength + attributeDexterity + size + other;
                break;
        }

        this.setTotal(combatType, sum);
    }

    toggleCMBAttribute() {
        debug.log("SheetSectionCombatManeuvers.toggleCMBAttribute");

        let combatType = SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE;

        let fieldNameStrength = this.setCombatTypeToString(this.FIELDNAME_ATTRIBUTE_STRENGTH, combatType);
        let fieldNameDexterity = this.setCombatTypeToString(this.FIELDNAME_ATTRIBUTE_DEXTERITY, combatType);
        
        let elementStrength = this.getElementByName(fieldNameStrength);
        let elementDexterity = this.getElementByName(fieldNameDexterity);

        let sizeCategoryId = this.parent.sectionAppearance.getSizeCategory().id;
        if(sizeCategoryId <= this.CMB_SIZE_CATEGORY_THRESHOLD) {
            elementStrength.style.display = 'none';
            elementDexterity.style.display = 'inline-block';
        } else {
            elementStrength.style.display = 'inline-block';
            elementDexterity.style.display = 'none';
        }
    }

    /**
     * @param {Number|null} value 
     */
    updateFlatfootedModifier(value = null) {
        debug.log("SheetSectionCombatManeuvers.updateFlatfootedModifier");
        if(this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].indexExists(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_FLATFOOTED)) {
            if(!value) {
                value = this.parent.sectionAttributes.getAttributeModifier(SheetSectionAttributes.ATTRIBUTE_DEXTERITY);
            }
            value = value*(-1);
            this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].setModifier(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_FLATFOOTED, value);
        }
    }

    /**
     * Pull AC modifiers and sync it to defensive "other" bonuses
     */
    updateACModifiers() {
        debug.log("SheetSectionCombatManeuvers.updateACModifiers");

        let acDodge = this.parent.sectionArmors.otherModifiers.getModifier(SheetSectionArmors.OTHER_MODIFIER_INDEX_DODGE);
        acDodge = (acDodge ? acDodge : 0);
        let acDeflection = this.parent.sectionArmors.otherModifiers.getModifier(SheetSectionArmors.OTHER_MODIFIER_INDEX_DEFLECTION);
        acDeflection = (acDeflection ? acDeflection : 0);
        let acSacred = this.parent.sectionArmors.otherModifiers.getModifier(SheetSectionArmors.OTHER_MODIFIER_INDEX_UNHOLY);
        acSacred = (acSacred ? acSacred : 0);
        let acLuck = this.parent.sectionArmors.otherModifiers.getModifier(SheetSectionArmors.OTHER_MODIFIER_INDEX_LUCK);
        acLuck = (acLuck ? acLuck : 0);
        let acMorale = this.parent.sectionArmors.otherModifiers.getModifier(SheetSectionArmors.OTHER_MODIFIER_INDEX_MORAL);
        acMorale = (acMorale ? acMorale : 0);
        
        if(this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].indexExists(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_DODGE)) {
            this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].setModifier(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_DODGE, acDodge);
        }
        if(this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].indexExists(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_DEFLECTION)) {
            this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].setModifier(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_DEFLECTION, acDeflection);
        }
        if(this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].indexExists(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_SACRED)) {
            this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].setModifier(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_SACRED, acSacred);
        }
        if(this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].indexExists(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_LUCK)) {
            this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].setModifier(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_LUCK, acLuck);
        }
        if(this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].indexExists(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_MORALE)) {
            this.otherModifiers[SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE].setModifier(SheetSectionCombatManeuvers.OTHER_MODIFIER_INDEX_AC_MORALE, acMorale);
        }
    }
}