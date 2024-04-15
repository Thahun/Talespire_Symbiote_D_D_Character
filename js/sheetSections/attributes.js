class SheetDataAttributesDTO {
    strength;
    dexterity;
    constitution;
    intelligence;
    wisdom;
    charisma;

    /**
     * @param {SheetDataAttributesAttributeDTO} strength 
     * @param {SheetDataAttributesAttributeDTO} dexterity 
     * @param {SheetDataAttributesAttributeDTO} constitution 
     * @param {SheetDataAttributesAttributeDTO} intelligence 
     * @param {SheetDataAttributesAttributeDTO} wisdom 
     * @param {SheetDataAttributesAttributeDTO} charisma 
     */
    constructor(
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma
    ) {
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
    }
}

class SheetDataAttributesAttributeDTO {
    diceThrow;
    value;
    modifierMax;
    modifier;
    modificationLevel;
    modificationMagical;
    modificationRace;

    /**
     * @param {Number} diceThrow 
     * @param {Number} value 
     * @param {Object} modifierMax 
     * @param {Number} modifier 
     * @param {Number} modificationLevel 
     * @param {Number} modificationMagical 
     * @param {Number} modificationRace 
     */
    constructor(
        diceThrow,
        value,
        modifierMax,
        modifier,
        modificationLevel,
        modificationMagical,
        modificationRace
    ) {
        this.diceThrow = diceThrow;
        this.value = value;
        this.modifierMax = modifierMax;
        this.modifier = modifier;
        this.modificationLevel = modificationLevel;
        this.modificationMagical = modificationMagical;
        this.modificationRace = modificationRace;
    }
}

class SheetSectionAttributes extends AbstractSheetHelper{
    parent;

    ATTRIBUTE_PLACEHOLDER = '%attribute%';

    static MAX_MODIFIER_REASON_ARMOR = 'armor';
    static MAX_MODIFIER_REASON_CARRYING = 'carrying';

    static ATTRIBUTE_STRENGTH = 'strength';
    static ATTRIBUTE_DEXTERITY = 'dexterity';
    static ATTRIBUTE_CONSTITUTION = 'constitution';
    static ATTRIBUTE_INTELLIGENCE = 'intelligence';
    static ATTRIBUTE_WISDOM = 'wisdom';
    static ATTRIBUTE_CHARISMA = 'charisma';

    FIELDNAME_THROW = 'character-attribute-' + this.ATTRIBUTE_PLACEHOLDER + '-throw';
    FIELDNAME_VALUE = 'character-attribute-' + this.ATTRIBUTE_PLACEHOLDER + '-value';
    FIELDNAME_MODIFIER_MAX = 'character-attribute-' + this.ATTRIBUTE_PLACEHOLDER + '-modifier-max';
    FIELDNAME_MODIFIER = 'character-attribute-' + this.ATTRIBUTE_PLACEHOLDER + '-modifier';
    FIELDNAME_MODIFICATION_LEVEL = 'character-attribute-' + this.ATTRIBUTE_PLACEHOLDER + '-modification-level';
    FIELDNAME_MODIFICATION_MAGICAL = 'character-attribute-' + this.ATTRIBUTE_PLACEHOLDER + '-modification-magical';
    FIELDNAME_MODIFICATION_RACE = 'character-attribute-' + this.ATTRIBUTE_PLACEHOLDER + '-modification-race';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Sets the attribute into e.g. a fieldname string
     * Replaces the placeholder '%attribute%'
     * 
     * @param {String} string 
     * @param {String} attribute 
     * @returns {String}
     */
    setAttributeToString(string, attribute) {
        return string.replaceAll(this.ATTRIBUTE_PLACEHOLDER, attribute)
    }

    /**
     * Returns all data of section "attributes"
     * 
     * @returns {SheetDataAttributesDTO}
     */
    getData() {
        return new SheetDataAttributesDTO(
            this.getAttribute(SheetSectionAttributes.ATTRIBUTE_STRENGTH),
            this.getAttribute(SheetSectionAttributes.ATTRIBUTE_DEXTERITY),
            this.getAttribute(SheetSectionAttributes.ATTRIBUTE_CONSTITUTION),
            this.getAttribute(SheetSectionAttributes.ATTRIBUTE_INTELLIGENCE),
            this.getAttribute(SheetSectionAttributes.ATTRIBUTE_WISDOM),
            this.getAttribute(SheetSectionAttributes.ATTRIBUTE_CHARISMA)
        );
    }

    /**
     * Sets all data of section "attributes"
     * 
     * @param {SheetDataAttributesDTO} data 
     */
    setData(data) {
        this.setAttribute(SheetSectionAttributes.ATTRIBUTE_STRENGTH, data.strength);
        this.setAttribute(SheetSectionAttributes.ATTRIBUTE_DEXTERITY, data.dexterity);
        this.setAttribute(SheetSectionAttributes.ATTRIBUTE_CONSTITUTION, data.constitution);
        this.setAttribute(SheetSectionAttributes.ATTRIBUTE_INTELLIGENCE, data.intelligence);
        this.setAttribute(SheetSectionAttributes.ATTRIBUTE_WISDOM, data.wisdom);
        this.setAttribute(SheetSectionAttributes.ATTRIBUTE_CHARISMA, data.charisma);
    }


    /**
     * @param {String} attributeName 
     * @returns {SheetDataAttributesAttributeDTO}
     */
    getAttribute(attributeName) {
        return new SheetDataAttributesAttributeDTO(
            this.getAttributeProperty(attributeName, this.FIELDNAME_THROW),
            this.getAttributeProperty(attributeName, this.FIELDNAME_VALUE),
            JSON.parse(this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFIER_MAX, null)),
            this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFIER),
            this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_LEVEL),
            this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_MAGICAL),
            this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_RACE)
        );
    }

    /**
     * @param {String} attributeName 
     * @param {SheetDataAttributesAttributeDTO} attribute 
     */
    setAttribute(attributeName, attribute) {
        this.setAttributeProperty(attributeName, this.FIELDNAME_THROW, attribute.diceThrow);
        this.setAttributeProperty(attributeName, this.FIELDNAME_VALUE, attribute.value);
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFIER_MAX, JSON.stringify(attribute.modifierMax));
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFIER, attribute.modifier);
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_LEVEL, attribute.modificationLevel);
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_MAGICAL, attribute.modificationMagical);
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_RACE, attribute.modificationRace);
    }


    /**
     * @param {String} attributeName 
     * @param {String} fieldName 
     * @param {String} dataType 
     * @returns {Any}
     */
    getAttributeProperty(attributeName, fieldName, dataType = this.DATA_TYPE_NUMBER) {
        return this.getElementValueByName(this.setAttributeToString(fieldName, attributeName), dataType);
    }

    /**
     * @param {String} attributeName 
     * @param {String} fieldName 
     * @param {Any} value 
     */
    setAttributeProperty(attributeName, fieldName, value) {
        if(fieldName == this.FIELDNAME_MODIFIER) {
            value = this.checkAttributeModifierLimit(attributeName, value);
            let currentModifierValue = this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFIER);
            if(currentModifierValue != value) {
                this.setElementValueByName(this.setAttributeToString(fieldName, attributeName), value);
    
                this.syncAttributeModifier(attributeName, value);
            }
        } else if(fieldName == this.FIELDNAME_VALUE) {
            this.setElementValueByName(this.setAttributeToString(fieldName, attributeName), value);
    
            this.syncAttributeValue(attributeName, value);
        } else {
            this.setElementValueByName(this.setAttributeToString(fieldName, attributeName), value);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {String} attributeName 
     */
    sumAttribute(attributeName) {
        debug.log("SheetSectionAttributes.sumAttribute");

        let attrThrow = this.getAttributeProperty(attributeName, this.FIELDNAME_THROW);
        let modificationLevel = this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_LEVEL);
        let modificationMagical = this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_MAGICAL);
        let modificationRace = this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_RACE);
        let attributeValue = attrThrow + modificationLevel + modificationMagical + modificationRace;
        this.setAttributeProperty(attributeName, this.FIELDNAME_VALUE, attributeValue);

        this.calculateAttributeModifier(attributeName, attributeValue);
    }

    /**
     * @param {String} attributeName 
     * @returns {Number}
     */
    getAttributeValue(attributeName) {
        return this.getAttributeProperty(attributeName, this.FIELDNAME_VALUE);
    }

    /**
     * @param {String} attributeName 
     * @returns {Number}
     */
    getAttributeModifier(attributeName) {
        return this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFIER);
    }

    /**
     * @param {String} attributeName 
     * @param {Number} value 
     */
    setAttributeModifier(attributeName, value) {
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFIER, value);
    }

    /**
     * 
     * @param {String} attributeName 
     * @returns {Number|null}
     */
    getMaxAttributeModifier(attributeName) {
        debug.log("SheetSectionAttributes.getMaxAttributeModifier");

        let maxValuesString = this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFIER_MAX, null);
        let max = null;
        if(maxValuesString == '') {
            return max;
        }

        let maxValues = JSON.parse(maxValuesString);
        for (const [key, value] of Object.entries(maxValues)) {
            if(max == null || value < max) {
                max = value;
            }
        }

        return max;
    }

    /**
     * @param {String} source
     * @param {String} attributeName
     * @param {Number} value 
     */
    setMaxAttributeModifier(source, attributeName, value = null) {
        debug.log("SheetSectionAttributes.setMaxAttributeModifier");
        
        let currentString = this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFIER_MAX, null);
        let current = {};
        if(currentString != '') {
            current = JSON.parse(currentString);
        }

        if(value != null && value >= 0) {
            current[source] = value;
        } else {
            delete current[source];
        }
        currentString = JSON.stringify(current);

        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFIER_MAX, currentString);

        this.calculateAttributeModifier(attributeName);
    }

    /**
     * @param {String} attributeName 
     * @returns {Number}
     */
    getAttributeModificationRace(attributeName) {
        return this.getAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_RACE);
    }

    /**
     * @param {String} attributeName 
     * @param {Number} value 
     */
    setAttributeModificationRace(attributeName, value) {
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFICATION_RACE, value);
    }

    /**
     * @param {String} attributeName
     * @param {Number|null} attributeValue
     */
    calculateAttributeModifier(attributeName, attributeValue = null) {
        debug.log("SheetSectionAttributes.calculateAttributeModifier");
        
        if(!attributeValue) {
            attributeValue = this.getAttributeProperty(attributeName, this.FIELDNAME_VALUE);
        }
        let newModifierValue = Math.floor(Number(((attributeValue-10)/2)));
        this.setAttributeProperty(attributeName, this.FIELDNAME_MODIFIER, newModifierValue);
    }

    /**
     * @param {String} attributeName 
     * @param {Number} newModifierValue 
     * @returns {Number}
     */
    checkAttributeModifierLimit(attributeName, newModifierValue) {
        debug.log("SheetSectionAttributes.checkAttributeModifierLimit");
        
        let maxModifierValue = this.getMaxAttributeModifier(attributeName);
        let modifierFieldName = this.setAttributeToString(this.FIELDNAME_MODIFIER, attributeName);
        if(maxModifierValue != null && newModifierValue > maxModifierValue) {
            newModifierValue = maxModifierValue;
            this.setElementColorByName(modifierFieldName, this.COLOR_CODE_RED);
        } else {
            this.setElementColorByName(modifierFieldName);
        }

        return newModifierValue;
    }

    /**
     * @param {String} attributeName
     * @param {Number} value
     */
    syncAttributeValue(attributeName, value) {
        debug.log("SheetSectionAttributes.syncAttributeValue");

        let attribute = CharacterDataTables.getAttributeByPropertyName(attributeName);
        this.parent.sectionMagicians.updateAttributeValue(attribute, this.getAttributeValue(attributeName));
    }

    /**
     * @param {String} attributeName
     * @param {Number} value
     */
    syncAttributeModifier(attributeName, value) {
        debug.log("SheetSectionAttributes.syncAttributeModifier");

        let targets = [];
        switch(attributeName) {
            case SheetSectionAttributes.ATTRIBUTE_STRENGTH:
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionAttacks, 'getAttribute', [SheetSectionAttacks.ATTACK_TYPE_CLOSE], 'setAttribute', [SheetSectionAttacks.ATTACK_TYPE_CLOSE]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getAttributeStrength', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE], 'setAttributeStrength', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getAttributeStrength', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE], 'setAttributeStrength', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE]));
                break;
            case SheetSectionAttributes.ATTRIBUTE_DEXTERITY:
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionRescues, 'getAttribute', [SheetSectionRescues.RESCUE_TYPE_REFLEX], 'setAttribute', [SheetSectionRescues.RESCUE_TYPE_REFLEX]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionAttacks, 'getAttribute', [SheetSectionAttacks.ATTACK_TYPE_DISTANCE], 'setAttribute', [SheetSectionAttacks.ATTACK_TYPE_DISTANCE]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getAttributeDexterity', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE], 'setAttributeDexterity', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getAttributeDexterity', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE], 'setAttributeDexterity', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionInitiative, 'getDexterity', [], 'setDexterity', []));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionArmors.otherModifiers, 'getModifier', [SheetSectionArmors.OTHER_MODIFIER_INDEX_DEXTERITY], 'setModifier', [SheetSectionArmors.OTHER_MODIFIER_INDEX_DEXTERITY]));
                break;
            case SheetSectionAttributes.ATTRIBUTE_CONSTITUTION:
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionRescues, 'getAttribute', [SheetSectionRescues.RESCUE_TYPE_FORTITUDE], 'setAttribute', [SheetSectionRescues.RESCUE_TYPE_FORTITUDE]));
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionHitpoints, 'getConstitutionModifier', [], 'setConstitutionModifier', []));
                break;
            case SheetSectionAttributes.ATTRIBUTE_INTELLIGENCE:
                break;
            case SheetSectionAttributes.ATTRIBUTE_WISDOM:
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionRescues, 'getAttribute', [SheetSectionRescues.RESCUE_TYPE_WILL], 'setAttribute', [SheetSectionRescues.RESCUE_TYPE_WILL]));
                break;
            case SheetSectionAttributes.ATTRIBUTE_CHARISMA:
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

        let attribute = CharacterDataTables.getAttributeByPropertyName(attributeName);
        this.parent.sectionCombatManeuvers.updateFlatfootedModifier(value);
        this.parent.sectionMagicians.updateAttributeModifier(attribute, value);
        this.parent.sectionSkills.updateAttributeModifier(attribute, value);
    }
}