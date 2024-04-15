class SheetDataMovementDTO {
    other;
    otherModifiers;
    raceBase;
    immobile;
    roundRegular;
    hourRegular;
    roundRush;
    hourRush;
    roundRunningMultiplier;
    roundRunning;
    day;
    specialRoundFly;

    /**
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     * @param {Number} raceBase 
     * @param {Boolean} immobile 
     * @param {Number} roundRegular 
     * @param {Number} hourRegular 
     * @param {Number} roundRush 
     * @param {Number} hourRush 
     * @param {Number} roundRunningMultiplier 
     * @param {Number} roundRunning 
     * @param {Number} day 
     * @param {Number} specialRoundFly 
     */
    constructor(
        other,
        otherModifiers,
        raceBase,
        immobile,
        roundRegular,
        hourRegular,
        roundRush,
        hourRush,
        roundRunningMultiplier,
        roundRunning,
        day,
        specialRoundFly
    ) {
        this.other = other;
        this.otherModifiers = otherModifiers;
        this.raceBase = raceBase;
        this.immobile = immobile;
        this.roundRegular = roundRegular;
        this.hourRegular = hourRegular;
        this.roundRush = roundRush;
        this.hourRush = hourRush;
        this.roundRunningMultiplier = roundRunningMultiplier;
        this.roundRunning = roundRunning;
        this.day = day;
        this.specialRoundFly = specialRoundFly;
    }
}

class SheetSectionMovement extends AbstractSheetHelper{
    parent;
    /** @type {Array.<OtherModifiers>} otherModifiers */
    otherModifiers;

    FIELDNAME_OTHER = 'character-movement-other';
    FIELDNAME_RACE_BASE = 'character-movement-race-base';
    FIELDNAME_IMMOBILE = 'character-movement-immobile';
    FIELDNAME_ROUND_REGULAR = 'character-movement-round-regular';
    FIELDNAME_HOUR_REGULAR = 'character-movement-hour-regular';
    FIELDNAME_ROUND_RUSH = 'character-movement-round-rush';
    FIELDNAME_HOUR_RUSH = 'character-movement-hour-rush';
    FIELDNAME_ROUND_RUNNING_MULTIPLIER = 'character-movement-round-running-multiplier';
    FIELDNAME_ROUND_RUNNING = 'character-movement-round-running';
    FIELDNAME_DAY = 'character-movement-day';
    FIELDNAME_SPECIAL_ROUND_FLY = 'character-movement-special-round-fly';

    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;

    FIELDNAME_OTHER_INDEX = 'character-movement-other-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-movement-other-add-row';

    CLASS_ID_BARBARIAN = 1;
    CLASS_ID_MONK = 8;

    static DEFAULT_RUNNING_MULTIPLIER = 4;

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.otherModifiers = new OtherModifiers(this, this.OTHER_MODIFIER_ID_PREFIX, 'setOtherModifierByFieldName');
    }

    /**
     * Returns all data of section "movement"
     * 
     * @returns {SheetDataMovementDTO}
     */
    getData() {
        return new SheetDataMovementDTO(
            this.getOther(),
            this.otherModifiers.getDataList(),
            this.getRaceBase(),
            this.getImmobile(),
            this.getRoundRegular(),
            this.getHourRegular(),
            this.getRoundRush(),
            this.getHourRush(),
            this.getRoundRunningMultiplier(),
            this.getRoundRunning(),
            this.getDay(),
            this.getSpecialRoundFly()
        );
    }

    /**
     * Sets all data of section "movement"
     * 
     * @param {SheetDataMovementDTO} data 
     */
    setData(data) {
        this.setOther(data.other);
        this.otherModifiers.setDataList(data.otherModifiers);
        this.setRaceBase(data.raceBase);
        this.setImmobile(data.immobile);
        this.setRoundRegular(data.roundRegular);
        this.setHourRegular(data.hourRegular);
        this.setRoundRush(data.roundRush);
        this.setHourRush(data.hourRush);
        this.setRoundRunningMultiplier(data.roundRunningMultiplier);
        this.setRoundRunning(data.roundRunning);
        this.setDay(data.day);
        this.setSpecialRoundFly(data.specialRoundFly);
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
    getRaceBase() {
        return this.getElementValueByName(this.FIELDNAME_RACE_BASE, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setRaceBase(value) {
        this.setElementValueByName(this.FIELDNAME_RACE_BASE, value);
    }


    /**
     * @returns {Boolean}
     */
    getImmobile() {
        return this.getElementValueByName(this.FIELDNAME_IMMOBILE, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Boolean} value 
     */
    setImmobile(value) {
        this.setElementValueByName(this.FIELDNAME_IMMOBILE, value);
    }


    /**
     * @returns {Number}
     */
    getRoundRegular() {
        return this.getElementValueByName(this.FIELDNAME_ROUND_REGULAR, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setRoundRegular(value) {
        this.setElementValueByName(this.FIELDNAME_ROUND_REGULAR, value);
    }


    /**
     * @returns {Number}
     */
    getHourRegular() {
        return this.getElementValueByName(this.FIELDNAME_HOUR_REGULAR, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setHourRegular(value) {
        this.setElementValueByName(this.FIELDNAME_HOUR_REGULAR, value);
    }


    /**
     * @returns {Number}
     */
    getRoundRush() {
        return this.getElementValueByName(this.FIELDNAME_ROUND_RUSH, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setRoundRush(value) {
        this.setElementValueByName(this.FIELDNAME_ROUND_RUSH, value);
    }


    /**
     * @returns {Number}
     */
    getHourRush() {
        return this.getElementValueByName(this.FIELDNAME_HOUR_RUSH, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setHourRush(value) {
        this.setElementValueByName(this.FIELDNAME_HOUR_RUSH, value);
    }


    /**
     * @returns {Number}
     */
    getRoundRunningMultiplier() {
        return this.getElementValueByName(this.FIELDNAME_ROUND_RUNNING_MULTIPLIER, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setRoundRunningMultiplier(value) {
        this.setElementValueByName(this.FIELDNAME_ROUND_RUNNING_MULTIPLIER, value);
    }


    /**
     * @returns {Number}
     */
    getRoundRunning() {
        return this.getElementValueByName(this.FIELDNAME_ROUND_RUNNING, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setRoundRunning(value) {
        this.setElementValueByName(this.FIELDNAME_ROUND_RUNNING, value);
    }


    /**
     * @returns {Number}
     */
    getDay() {
        return this.getElementValueByName(this.FIELDNAME_DAY, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setDay(value) {
        this.setElementValueByName(this.FIELDNAME_DAY, value);
    }


    /**
     * @returns {Number}
     */
    getSpecialRoundFly() {
        return this.getElementValueByName(this.FIELDNAME_SPECIAL_ROUND_FLY, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setSpecialRoundFly(value) {
        this.setElementValueByName(this.FIELDNAME_SPECIAL_ROUND_FLY, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    updateMovement() {
        debug.log("SheetSectionMovement.updateMovement");

        let regularDistance = this.calculateRegularMovement();
        this.setRegularMovement(regularDistance);
    }

    /**
     * @returns {Number}
     */
    calculateRegularMovement() {
        debug.log("SheetSectionMovement.calculateRegularMovement");
        
        if(this.getImmobile()) {
            return 0;
        }

        let baseDistance = this.getRaceBase();
        let classBonus = this.calculateMovementClassBonus();
        let armorMalus = this.calculateMovementArmorMalus(baseDistance);
        let otherModifier = this.getOther();

        return baseDistance + classBonus - armorMalus + otherModifier;
    }

    /**
     * @returns {Number}
     */
    calculateMovementClassBonus () {
        debug.log("SheetSectionMovement.calculateMovementClassBonus");
        
        let classes = this.parent.sectionClasses.getClasses();
        let bonus = 0;
        for(let i = 0; i < classes.length; i++) {
            switch(classes[i].classData.id) {
                case this.CLASS_ID_BARBARIAN:
                    bonus += 3;
                    break;
                case this.CLASS_ID_MONK:
                    bonus += Math.floor(classes[i].level/3) * 3;
                    break;
            }
        }
        return bonus;
    }

    /**
     * @param {Number} baseDistance
     * @returns {Number}
     */
    calculateMovementArmorMalus (baseDistance) {
        debug.log("SheetSectionMovement.calculateMovementArmorMalus");

        let activeArmorIndex = this.parent.sectionArmors.findActiveArmorByType(SheetSectionArmors.ARMOR_TYPE_BODY);
        if(!activeArmorIndex) {
            return 0;
        }
        let activeArmorType = this.parent.sectionArmors.sectionArmorsArmor.getStyle(activeArmorIndex);
        let malus = CharacterDataTables.getArmorTypeById(activeArmorType.id).armorMalus;
        if(malus > 0) {
            if(baseDistance == 6) {
                malus = malus / 2;
            }
        }
        return malus;
    }

    /**
     * @param {Number} roundRegular
     */
    setRegularMovement(roundRegular) {
        debug.log("SheetSectionMovement.setRegularMovement");

        let oldValue = this.getRoundRegular();
        if(oldValue != roundRegular) {
            let colorCode = null;
            if(roundRegular == 0) {
                colorCode = this.COLOR_CODE_RED;
            }
            this.setRoundRegular(roundRegular);
            this.setElementColorByName(this.FIELDNAME_ROUND_REGULAR, colorCode);

            this.updateOtherMovements(roundRegular);
        }
    }

    /**
     * @param {Number} roundRegular
     */
    updateOtherMovements(roundRegular = null) {
        debug.log("SheetSectionMovement.updateOtherMovements");

        if(!roundRegular) {
            roundRegular = this.getRoundRegular();
        }

        let runningMultiplier = this.getRoundRunningMultiplier();

        let hourRegular = roundRegular / 2;
        let roundRush = roundRegular * 2;
        let hourRush = roundRegular;
        let roundRunning = roundRegular * runningMultiplier;
        let day = roundRegular * 4;

        let hourRegularColorCode = null;
        let roundRushColorCode = null;
        let hourRushColorCode = null;
        let roundRunningColorCode = null;
        let dayColorCode = null;

        if(runningMultiplier != SheetSectionMovement.DEFAULT_RUNNING_MULTIPLIER) {
            roundRunningColorCode = this.COLOR_CODE_RED;
        }
        if(roundRegular == 0) {
            hourRegularColorCode = this.COLOR_CODE_RED;
            roundRushColorCode = this.COLOR_CODE_RED;
            hourRushColorCode = this.COLOR_CODE_RED;
            roundRunningColorCode = this.COLOR_CODE_RED;
            dayColorCode = this.COLOR_CODE_RED;
        }

        this.setHourRegular(hourRegular);
        this.setElementColorByName(this.FIELDNAME_HOUR_REGULAR, hourRegularColorCode);
        this.setRoundRush(roundRush);
        this.setElementColorByName(this.FIELDNAME_ROUND_RUSH, roundRushColorCode);
        this.setHourRush(hourRush);
        this.setElementColorByName(this.FIELDNAME_HOUR_RUSH, hourRushColorCode);
        this.setRoundRunning(roundRunning);
        this.setElementColorByName(this.FIELDNAME_ROUND_RUNNING, roundRunningColorCode);
        this.setDay(day);
        this.setElementColorByName(this.FIELDNAME_DAY, dayColorCode);
    }
}