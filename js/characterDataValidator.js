class ValidationDefinition {
    version;
    validator;

    /**
     * @param {String} version 
     * @param {String} validator 
     */
    constructor(
        version,
        validator
    ) {
        this.version = version;
        this.validator = validator;
    }
}

var validators = {};

class CharacterDataValidator {
    parent;

    /**
     * If there's nothing new, just use the latest still matching validator for the new versio as well
     */
    validationDefinitions = [
        new ValidationDefinition('0.1.0', 'SheetDataValidator0_1_0'),
        new ValidationDefinition('0.1.1', 'SheetDataValidator0_1_0'),
        new ValidationDefinition('0.2.0', 'SheetDataValidator0_1_0'),
        new ValidationDefinition('0.2.1', 'SheetDataValidator0_2_1'),
        new ValidationDefinition('0.3.0', 'SheetDataValidator0_2_1'),
    ];

    violations=[];

    /**
     * @param {CharacterManager} parent 
     */
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * Validates the imported data to be a SheetData object
     * 
     * @param {SheetData} data
     */
    validateImportData(data) {
        debug.log("CharacterDataValidator.validateImportData");

        this.validateVersionProperty(data);
        let version = data.sheetVersion;
        this.validateByVersion(data, version)

        if(this.violations.length > 0) {
            throw new Error(this.getViolationsAsString().trim());
        }
    }

    getViolationsAsString() {
        let violationsString = "";
        this.violations.forEach(violation => {
            violationsString += "\n- " + violation;
        });

        return violationsString;
    }

    validateVersionProperty(data) {
        debug.log("CharacterDataValidator.validateVersionProperty");

        if(!Object.hasOwn(data, 'sheetVersion')) {
            error.show("Missing version property!");
            throw new Error("Missing version property!");
        }
    }

    validateByVersion(data, version) {
        debug.log("CharacterDataValidator.validateByVersion");

        for (let i = 0; i < this.validationDefinitions.length; i++) {
            const validationDefinition = this.validationDefinitions[i];
            if(validationDefinition.version == version) {
                let validator = new validators[validationDefinition.validator](this);
                validator.validateLayer(data, validator.expectedProperties);

                return;
            }
        }
        
        error.show("Missing validation definition for version " + version + "!");
        throw new Error("Missing validation definition for version " + version + "!");
    }
}

validators.SheetDataValidator0_1_0 = class {
    parent;

    expectedProperties = {
        'sheetVersion': 'string',
        'basic': {
            'name': 'string',
            'player': 'string',
            'race': {
                'id': 'number',
                'name': 'string',
            },
            'regionOfOrigin': 'string',
            'experiencePointsCurrent': 'number',
            'experiencePointsNextLevel': 'number',
            'alignment': 'string',
            'deity': 'string',
            'languages': 'string',
        },
        'appearance':{
            'gender': 'string',
            'ageNatural': 'number',
            'ageMagical': 'number',
            'ageTotal': 'number',
            'height': 'number',
            'sizeCategory': {
                'id': 'number',
                'name': 'string',
            },
            'weight': 'number',
            'eyeColor': 'string',
            'hairColor': 'string',
        },
        'classes':{
            'classList': 'array',
            'levelTotal': 'number',
        },
        'attributes':{
            'strength': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'dexterity': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'constitution': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'intelligence': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'wisdom': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'charisma': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
        },
        'rescues': {
            'reflex': {
                'total': 'number',
                'penalty': 'object',
                'level': 'number',
                'attribute': 'number',
                'magic': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'will': {
                'total': 'number',
                'penalty': 'object',
                'level': 'number',
                'attribute': 'number',
                'magic': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'fortitude': {
                'total': 'number',
                'penalty': 'object',
                'level': 'number',
                'attribute': 'number',
                'magic': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'description': 'string',
        },
        'attacks': {
            'close': {
                'total': 'number',
                'basic': 'number',
                'attribute': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'distance': {
                'total': 'number',
                'basic': 'number',
                'attribute': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
        },
        'weapons': {
            'weaponList': 'array',
        },
        'combatManeuvers': {
            'offensive': {
                'combatType': 'string',
                'total': 'number',
                'basicAttackBonus': 'number',
                'attributeStrength': 'number',
                'attributeDexterity': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'defensive': {
                'combatType': 'string',
                'total': 'number',
                'basicAttackBonus': 'number',
                'attributeStrength': 'number',
                'attributeDexterity': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
        },
        'initiative': {
            'total': 'number',
            'dexterity': 'number',
            'talent': 'number',
            'other': 'number',
            'otherModifiers': 'array',
        },
        'inspiration': {
            'current': 'number',
            'max': 'number',
        },
        'armors': {
            'total': 'number',
            'base': 'number',
            'activeArmor': 'number',
            'activeShield': 'number',
            'other': 'number',
            'otherModifiers': 'array',
            'touch': 'number',
            'wrongFoot': 'number',
            'description': 'string',
            'armorList': 'array',
        },
        'hitpoints': {
            'total': 'number',
            'base': 'number',
            'baseModifiers': 'array',
            'characterLevel': 'number',
            'constitutionModifier': 'number',
            'constitutionHitPoints': 'number',
            'other': 'number',
            'otherModifiers': 'array',
            'injuries': 'number',
            'injuriesModifiers': 'array',
            'current': 'number',
            'description': 'string',
        },
        'movement': {
            'other': 'number',
            'otherModifiers': 'array',
            'raceBase': 'number',
            'immobile': 'boolean',
            'roundRegular': 'number',
            'hourRegular': 'number',
            'roundRush': 'number',
            'hourRush': 'number',
            'roundRunningMultiplier': 'number',
            'roundRunning': 'number',
            'day': 'number',
        },
        'carrying': {
            'stageList':{
                'light':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
                'medium':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
                'heavy':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
                'overload':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
            },
            'lift': 'number',
            'hoist': 'number',
            'pull': 'number',
            'weights':{
                'coins': 'number',
                'gems': 'number',
                'body': 'number',
                'belt': 'number',
                'backpack': 'number',
                'magicBag': 'number',
            },
            'weightTotal': 'number',
        },
        'abilities': {
            'abilityList': 'array',
        },
        'stances': {
            'stanceList': 'array',
            'maxKnown': 'number',
        },
        'maneuvers': {
            'maneuverList': 'array',
            'maxKnown': 'number',
            'maxPrepared': 'number',
        },
        'magicians': {
            'magicianList': 'array',
        },
        'spells': {
            'spellList': 'array',
        },
        'skills': {
            'current': 'number',
            'max': 'number',
            'initial': 'number',
            'level': 'number',
            'levelModifiers': 'array',
            'skillGroup': {
                'id': 'number',
                'name': 'string',
            },
            'skillList': 'array',
        },
        'valuables': {
            'coinList': {
                'platinum': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
                'gold': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
                'silver': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
                'copper': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
            },
            'totalCoinAmount': 'number',
            'totalCoinWeight': 'number',
            'gemList': 'array',
            'totalGemWorth': 'number',
            'totalGemAmount': 'number',
            'totalGemWeight': 'number',
        },
        'equipments': {
            'locationList': {
                'body': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
                'belt': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
                'backpack': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
                'magicBag': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
            },
        },
        'story': {
            'story': 'string',
        },
        'contacts': {
            'contactList': 'array',
        },
        'notes': {
            'notes': 'string',
        },
        'diceSets': {
            'diceSetList': 'array',
        },
    };

    /**
     * @param {CharacterDataValidator} parent 
     */
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * @param {Object} data
     */
    validateLayer(data, expectedProperties, propertyLayer = 'root') {
        //Activate to determine expected types by valid data.
        //console.log(propertyLayer, Object.keys(data), Object.entries(data));

        Object.entries(expectedProperties).forEach(([expectedProperty, expectedDataType]) => {
            if(!Object.hasOwn(data, expectedProperty)) {
                this.parent.violations.push("Missing property '" + expectedProperty + "' at '" + propertyLayer + "'!");
                return;
            }

            if(typeof data[expectedProperty] == 'object' && expectedDataType != 'object' && !Array.isArray(data[expectedProperty])) {
                this.validateLayer(data[expectedProperty], expectedDataType, propertyLayer + ' > ' + expectedProperty);
            } else if (typeof data[expectedProperty] != expectedDataType && !(expectedDataType == 'array' && Array.isArray(data[expectedProperty]))) {
                this.parent.violations.push("Invalid data type of property '" + expectedProperty + "' at '" + propertyLayer + "'! Expected is '" + expectedDataType + "'.");
            }
        });
    }
}

validators.SheetDataValidator0_2_1 = class {
    parent;

    expectedProperties = {
        'sheetVersion': 'string',
        'basic': {
            'name': 'string',
            'player': 'string',
            'race': {
                'id': 'number',
                'name': 'string',
            },
            'regionOfOrigin': 'string',
            'experiencePointsCurrent': 'number',
            'experiencePointsNextLevel': 'number',
            'alignment': 'string',
            'deity': 'string',
            'languages': 'string',
        },
        'appearance':{
            'gender': 'string',
            'ageNatural': 'number',
            'ageMagical': 'number',
            'ageTotal': 'number',
            'height': 'number',
            'sizeCategory': {
                'id': 'number',
                'name': 'string',
            },
            'weight': 'number',
            'eyeColor': 'string',
            'hairColor': 'string',
        },
        'classes':{
            'classList': 'array',
            'levelTotal': 'number',
        },
        'attributes':{
            'strength': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'dexterity': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'constitution': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'intelligence': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'wisdom': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
            'charisma': {
                'diceThrow': 'number',
                'value': 'number',
                'modifierMax': 'object',
                'modifier': 'number',
                'modificationLevel': 'number',
                'modificationMagical': 'number',
                'modificationRace': 'number',
            },
        },
        'rescues': {
            'reflex': {
                'total': 'number',
                'penalty': 'object',
                'level': 'number',
                'attribute': 'number',
                'magic': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'will': {
                'total': 'number',
                'penalty': 'object',
                'level': 'number',
                'attribute': 'number',
                'magic': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'fortitude': {
                'total': 'number',
                'penalty': 'object',
                'level': 'number',
                'attribute': 'number',
                'magic': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'description': 'string',
        },
        'attacks': {
            'close': {
                'total': 'number',
                'basic': 'number',
                'attribute': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'distance': {
                'total': 'number',
                'basic': 'number',
                'attribute': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
        },
        'weapons': {
            'weaponList': 'array',
        },
        'combatManeuvers': {
            'offensive': {
                'combatType': 'string',
                'total': 'number',
                'basicAttackBonus': 'number',
                'attributeStrength': 'number',
                'attributeDexterity': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
            'defensive': {
                'combatType': 'string',
                'total': 'number',
                'basicAttackBonus': 'number',
                'attributeStrength': 'number',
                'attributeDexterity': 'number',
                'size': 'number',
                'other': 'number',
                'otherModifiers': 'array',
            },
        },
        'initiative': {
            'total': 'number',
            'dexterity': 'number',
            'talent': 'number',
            'other': 'number',
            'otherModifiers': 'array',
        },
        'inspiration': {
            'current': 'number',
            'max': 'number',
        },
        'armors': {
            'total': 'number',
            'base': 'number',
            'activeArmor': 'number',
            'activeShield': 'number',
            'other': 'number',
            'otherModifiers': 'array',
            'touch': 'number',
            'wrongFoot': 'number',
            'description': 'string',
            'armorList': 'array',
        },
        'hitpoints': {
            'total': 'number',
            'base': 'number',
            'baseModifiers': 'array',
            'characterLevel': 'number',
            'constitutionModifier': 'number',
            'constitutionHitPoints': 'number',
            'other': 'number',
            'otherModifiers': 'array',
            'injuries': 'number',
            'injuriesModifiers': 'array',
            'current': 'number',
            'description': 'string',
        },
        'movement': {
            'other': 'number',
            'otherModifiers': 'array',
            'raceBase': 'number',
            'immobile': 'boolean',
            'roundRegular': 'number',
            'hourRegular': 'number',
            'roundRush': 'number',
            'hourRush': 'number',
            'roundRunningMultiplier': 'number',
            'roundRunning': 'number',
            'day': 'number',
        },
        'carrying': {
            'stageList':{
                'light':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
                'medium':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
                'heavy':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
                'overload':{
                    'stageName': 'string',
                    'active': 'boolean',
                    'min': 'number',
                    'max': 'number',
                },
            },
            'lift': 'number',
            'hoist': 'number',
            'pull': 'number',
            'weights':{
                'coins': 'number',
                'gems': 'number',
                'body': 'number',
                'belt': 'number',
                'backpack': 'number',
                'magicBag': 'number',
            },
            'weightTotal': 'number',
        },
        'abilities': {
            'abilityList': 'array',
        },
        'stances': {
            'stanceList': 'array',
            'maxKnown': 'number',
        },
        'maneuvers': {
            'maneuverList': 'array',
            'maxKnown': 'number',
            'maxPrepared': 'number',
        },
        'magicians': {
            'magicianList': 'array',
        },
        'spells': {
            'spellList': 'array',
        },
        'skills': {
            'current': 'number',
            'max': 'number',
            'initial': 'number',
            'level': 'number',
            'levelModifiers': 'array',
            'skillGroup': {
                'id': 'number',
                'name': 'string',
            },
            'skillList': 'array',
        },
        'valuables': {
            'coinList': {
                'platinum': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
                'gold': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
                'silver': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
                'copper': {
                    'coinName': 'string',
                    'amount': 'number',
                    'weight': 'number',
                },
            },
            'totalCoinAmount': 'number',
            'totalCoinWeight': 'number',
            'gemList': 'array',
            'totalGemWorth': 'number',
            'totalGemAmount': 'number',
            'totalGemWeight': 'number',
        },
        'equipments': {
            'locationList': {
                'body': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
                'belt': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
                'backpack': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
                'magicBag': {
                    'location': 'string',
                    'itemList': 'array',
                    'totalWorth': 'number',
                    'totalAmount': 'number',
                    'totalWeight': 'number',
                },
            },
        },
        'familiars': {
            'familiarList': 'array',
        },
        'story': {
            'story': 'string',
        },
        'contacts': {
            'contactList': 'array',
        },
        'notes': {
            'notes': 'string',
        },
        'diceSets': {
            'diceSetList': 'array',
        },
    };

    /**
     * @param {CharacterDataValidator} parent 
     */
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * @param {Object} data
     */
    validateLayer(data, expectedProperties, propertyLayer = 'root') {
        //Activate to determine expected types by valid data.
        //console.log(propertyLayer, Object.keys(data), Object.entries(data));

        Object.entries(expectedProperties).forEach(([expectedProperty, expectedDataType]) => {
            if(!Object.hasOwn(data, expectedProperty)) {
                this.parent.violations.push("Missing property '" + expectedProperty + "' at '" + propertyLayer + "'!");
                return;
            }

            if(typeof data[expectedProperty] == 'object' && expectedDataType != 'object' && !Array.isArray(data[expectedProperty])) {
                this.validateLayer(data[expectedProperty], expectedDataType, propertyLayer + ' > ' + expectedProperty);
            } else if (typeof data[expectedProperty] != expectedDataType && !(expectedDataType == 'array' && Array.isArray(data[expectedProperty]))) {
                this.parent.violations.push("Invalid data type of property '" + expectedProperty + "' at '" + propertyLayer + "'! Expected is '" + expectedDataType + "'.");
            }
        });
    }
}