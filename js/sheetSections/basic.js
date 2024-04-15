class SheetDataBasicDTO {
    name;
    player;
    race;
    regionOfOrigin;
    experiencePointsCurrent;
    experiencePointsNextLevel;
    alignment;
    deity;
    languages;

    /**
     * @param {String} name 
     * @param {String} player 
     * @param {SheetDataBasicRaceDTO} race 
     * @param {String} regionOfOrigin 
     * @param {Number} experiencePointsCurrent 
     * @param {Number} experiencePointsNextLevel 
     * @param {String} alignment 
     * @param {String} deity 
     * @param {String} languages 
     */
    constructor(
        name,
        player,
        race,
        regionOfOrigin,
        experiencePointsCurrent,
        experiencePointsNextLevel,
        alignment,
        deity,
        languages
    ) {
        this.name = name;
        this.player = player;
        this.race = race;
        this.regionOfOrigin = regionOfOrigin;
        this.experiencePointsCurrent = experiencePointsCurrent;
        this.experiencePointsNextLevel = experiencePointsNextLevel;
        this.alignment = alignment;
        this.deity = deity;
        this.languages = languages;
    }
}

class SheetDataBasicRaceDTO {
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

class SheetSectionBasic extends AbstractSheetHelper{
    parent;

    FIELDNAME_NAME = 'character-name';
    FIELDNAME_PLAYER = 'character-player';
    FIELDNAME_RACE = 'character-race';
    FIELDID_RACE_OPTIONS = 'character-race-options';
    FIELDNAME_REGIONOFORIGIN = 'character-regionOfOrigin';
    FIELDNAME_EXPERIENCEPOINTS_CURRENT = 'character-experiencePoints-current';
    FIELDNAME_EXPERIENCEPOINTS_NEXTLEVEL = 'character-experiencePoints-nextLevel';
    FIELDNAME_ALIGNMENT = 'character-alignment';
    FIELDNAME_DEITY = 'character-deity';
    FIELDNAME_LANGUAGES = 'character-languages';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.createRaceDropdown();
    }

    /**
     * Returns all data of section "basic"
     * 
     * @returns {SheetDataBasicDTO}
     */
    getData() {
        return new SheetDataBasicDTO(
            this.getName(),
            this.getPlayer(),
            this.getRace(),
            this.getRegionOfOrigin(),
            this.getExperiencePointsCurrent(),
            this.getExperiencePointsNextLevel(),
            this.getAlignment(),
            this.getDeity(),
            this.getLanguages()
        );
    }

    /**
     * Sets all data of section "basic"
     * 
     * @param {SheetDataBasicDTO} data 
     */
    setData(data) {
        this.setName(data.name);
        this.setPlayer(data.player);
        this.setRace(data.race.id, data.race.name);
        this.setRegionOfOrigin(data.regionOfOrigin);
        this.setExperiencePointsCurrent(data.experiencePointsCurrent);
        this.setExperiencePointsNextLevel(data.experiencePointsNextLevel);
        this.setAlignment(data.alignment);
        this.setDeity(data.deity);
        this.setLanguages(data.languages);
    }

    /**
     * @returns {String}
     */
    getName() {
        return this.getElementValueByName(this.FIELDNAME_NAME);
    }

    /**
     * @param {String} value 
     */
    setName(value) {
        this.setElementValueByName(this.FIELDNAME_NAME, value);
    }


    /**
     * @returns {String}
     */
    getPlayer() {
        return this.getElementValueByName(this.FIELDNAME_PLAYER);
    }

    /**
     * @param {String} value 
     */
    setPlayer(value) {
        this.setElementValueByName(this.FIELDNAME_PLAYER, value);
    }

    
    /**
     * @returns {SheetDataBasicRaceDTO}
     */
    getRace() {
        let raceElement = this.getElementByName(this.FIELDNAME_RACE);

        return new SheetDataBasicRaceDTO(Number(raceElement.dataset.id), raceElement.value);
    }

    /**
     * If value isn't provided, it'll be determined by id
     * 
     * @param {Number} id 
     * @param {String|null} value 
     */
    setRace(id, value = null) {
        if(!value) {
            let raceObj = CharacterDataTables.getRaceById(id);
            value = raceObj.name;
        }

        this.setElementValueByName(this.FIELDNAME_RACE, value, id);

        this.syncRace(id);
    }


    /**
     * @returns {String}
     */
    getRegionOfOrigin() {
        return this.getElementValueByName(this.FIELDNAME_REGIONOFORIGIN);
    }

    /**
     * @param {String} value 
     */
    setRegionOfOrigin(value) {
        this.setElementValueByName(this.FIELDNAME_REGIONOFORIGIN, value);
    }


    /**
     * @returns {Number}
     */
    getExperiencePointsCurrent() {
        return this.getElementValueByName(this.FIELDNAME_EXPERIENCEPOINTS_CURRENT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setExperiencePointsCurrent(value) {
        this.setElementValueByName(this.FIELDNAME_EXPERIENCEPOINTS_CURRENT, value);
    }


    /**
     * @returns {Number}
     */
    getExperiencePointsNextLevel() {
        return this.getElementValueByName(this.FIELDNAME_EXPERIENCEPOINTS_NEXTLEVEL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setExperiencePointsNextLevel(value) {
        this.setElementValueByName(this.FIELDNAME_EXPERIENCEPOINTS_NEXTLEVEL, value);
    }


    /**
     * @returns {String}
     */
    getAlignment() {
        return this.getElementValueByName(this.FIELDNAME_ALIGNMENT);
    }

    /**
     * @param {String} value 
     */
    setAlignment(value) {
        this.setElementValueByName(this.FIELDNAME_ALIGNMENT, value);
    }


    /**
     * @returns {String}
     */
    getDeity() {
        return this.getElementValueByName(this.FIELDNAME_DEITY);
    }

    /**
     * @param {String} value 
     */
    setDeity(value) {
        this.setElementValueByName(this.FIELDNAME_DEITY, value);
    }


    /**
     * @returns {String}
     */
    getLanguages() {
        return this.getElementValueByName(this.FIELDNAME_LANGUAGES);
    }

    /**
     * @param {String} value 
     */
    setLanguages(value) {
        this.setElementValueByName(this.FIELDNAME_LANGUAGES, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    createRaceDropdown() {
        debug.log("SheetSectionBasic.createRaceDropdown");

        let races = CharacterDataTables.getRaces(true);
        let options = [];
        for(let i = 0;i < races.length; i++) {
            options.push({'key':races[i].id, 'value':races[i].name});
        }

        this.createDropdown(this.FIELDID_RACE_OPTIONS, options);
    }

    /**
     * @param {Number} raceId 
     */
    syncRace(raceId) {
        debug.log("SheetSectionBasic.syncRace");
        if(raceId == 0) {
            return;
        }

        let raceObj = CharacterDataTables.getRaceById(raceId);
        
        this.syncRaceBonus(raceId);
        this.parent.sectionAppearance.setSizeCategory(raceObj.sizeCategoryId);
        this.syncSizeModifiers(raceObj.sizeCategoryId);
    }

    /**
     * @param {Number} sizeCategoryId 
     */
    syncSizeModifiers(sizeCategoryId) {
        debug.log("SheetSectionBasic.syncRaceBonus");

        let sizeModifiers = CharacterDataTables.getSizeCategoryModifiersById(sizeCategoryId);

        let modifierTargets = {
            'default':[
                new GetterSetterCallbackDTO(this.parent.sectionAttacks, 'getSize', [SheetSectionAttacks.ATTACK_TYPE_CLOSE], 'setSize', [SheetSectionAttacks.ATTACK_TYPE_CLOSE]),
                new GetterSetterCallbackDTO(this.parent.sectionAttacks, 'getSize', [SheetSectionAttacks.ATTACK_TYPE_DISTANCE], 'setSize', [SheetSectionAttacks.ATTACK_TYPE_DISTANCE]),
                new GetterSetterCallbackDTO(this.parent.sectionArmors.otherModifiers, 'getModifier', [SheetSectionArmors.OTHER_MODIFIER_INDEX_SIZE], 'setModifier', [SheetSectionArmors.OTHER_MODIFIER_INDEX_SIZE]),
            ],
            'cmb':[
                new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getSize', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE], 'setSize', [SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE]),
            ],
            'cmd':[
                new GetterSetterCallbackDTO(this.parent.sectionCombatManeuvers, 'getSize', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE], 'setSize', [SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE]),
            ],
        };

        Object.keys(modifierTargets).forEach(modifierKey => {
            let targets = modifierTargets[modifierKey];
            let modifier = sizeModifiers[modifierKey];
            for (let i = 0; i < targets.length; i++) {
                let callback = targets[i];
                let targetValue = CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.getterMethod, callback.getterParameters));
                if(modifier != targetValue) {
                    let parameters = callback.setterParameters;
                    parameters.push(modifier);
                    CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.setterMethod, parameters), false);
                }
            }
        });

        this.parent.sectionCombatManeuvers.toggleCMBAttribute();
    }

    /**
     * @param {Number} raceId 
     */
    syncRaceBonus(raceId) {
        debug.log("SheetSectionBasic.syncRaceBonus");

        let raceBonus = CharacterDataTables.getRaceBonusById(raceId);

        let bonusTargets = {
            'strength':[
                new GetterSetterCallbackDTO(this.parent.sectionAttributes, 'getAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_STRENGTH], 'setAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_STRENGTH]),
            ],
            'dexterity':[
                new GetterSetterCallbackDTO(this.parent.sectionAttributes, 'getAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_DEXTERITY], 'setAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_DEXTERITY]),
            ],
            'constitution':[
                new GetterSetterCallbackDTO(this.parent.sectionAttributes, 'getAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_CONSTITUTION], 'setAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_CONSTITUTION]),
            ],
            'intelligence':[
                new GetterSetterCallbackDTO(this.parent.sectionAttributes, 'getAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_INTELLIGENCE], 'setAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_INTELLIGENCE]),
            ],
            'wisdom':[
                new GetterSetterCallbackDTO(this.parent.sectionAttributes, 'getAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_WISDOM], 'setAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_WISDOM]),
            ],
            'charisma':[
                new GetterSetterCallbackDTO(this.parent.sectionAttributes, 'getAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_CHARISMA], 'setAttributeModificationRace', [SheetSectionAttributes.ATTRIBUTE_CHARISMA]),
            ],
            'gbr':[
                new GetterSetterCallbackDTO(this.parent.sectionMovement, 'getRaceBase', [], 'setRaceBase', []),
            ],
            'ecl':[
            ],
        };

        Object.keys(bonusTargets).forEach(bonusKey => {
            let targets = bonusTargets[bonusKey];
            let bonus = raceBonus[bonusKey];
            for (let i = 0; i < targets.length; i++) {
                let callback = targets[i];
                let targetValue = CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.getterMethod, callback.getterParameters));
                if(bonus != targetValue) {
                    let parameters = callback.setterParameters;
                    parameters.push(bonus);
                    CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.setterMethod, parameters), false);
                }
            }
        });
    }
}