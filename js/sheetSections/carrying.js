class SheetDataCarryingDTO {
    stageList = new SheetDataCarryingStageListDTO();
    lift;
    hoist;
    pull;
    weights;
    weightTotal;

    /**
     * @param {SheetDataCarryingStageListDTO} stageList 
     * @param {Number} lift 
     * @param {Number} hoist 
     * @param {Number} pull 
     * @param {Array.<Number>} weights 
     * @param {Number} weightTotal 
     */
    constructor(
        stageList,
        lift,
        hoist,
        pull,
        weights,
        weightTotal
    ) {
        this.stageList = stageList;
        this.lift = lift;
        this.hoist = hoist;
        this.pull = pull;
        this.weights = weights;
        this.weightTotal = weightTotal;
    }
}

class SheetDataCarryingStageDTO {
    stageName;
    active;
    min;
    max;
    maxDexterity;
    checkPenalty;
    runningMultiplier;

    /**
     * @param {String} stageName 
     * @param {Boolean} active 
     * @param {Number} min 
     * @param {Number} max 
     * @param {Number} maxDexterity 
     * @param {Number} checkPenalty 
     * @param {Number|String} runningMultiplier 
     */
    constructor(
        stageName,
        active,
        min,
        max,
        maxDexterity = null,
        checkPenalty = null,
        runningMultiplier = null
    ) {
        this.stageName = stageName;
        this.active = active;
        this.min = min;
        this.max = max;
        if(maxDexterity != null) {
            this.maxDexterity = maxDexterity;
        }
        if(checkPenalty != null) {
            this.checkPenalty = checkPenalty;
        }
        if(runningMultiplier != null) {
            this.runningMultiplier = runningMultiplier;
        }
    }
}

class SheetDataCarryingStageListDTO {
    static IMMOBILE = 'immobile';

    static STAGE_LIGHT = 'light';
    static STAGE_MEDIUM = 'medium';
    static STAGE_HEAVY = 'heavy';
    static STAGE_OVERLOAD = 'overload';

    static LIGHT_MAX_DEXTERITY = -1;
    static LIGHT_CHECK_PENALTY = 0;
    static LIGHT_RUNNING_MULTIPLIER = SheetSectionMovement.DEFAULT_RUNNING_MULTIPLIER;
    
    static MEDIUM_MAX_DEXTERITY = 3;
    static MEDIUM_CHECK_PENALTY = -3;
    static MEDIUM_RUNNING_MULTIPLIER = SheetSectionMovement.DEFAULT_RUNNING_MULTIPLIER;

    static HEAVY_MAX_DEXTERITY = 1;
    static HEAVY_CHECK_PENALTY = -6;
    static HEAVY_RUNNING_MULTIPLIER = 3;

    static DEFAULT_OVERLOAD_MAX = 999999;
    static OVERLOAD_MAX_DEXTERITY = 0;
    static OVERLOAD_CHECK_PENALTY = SheetDataCarryingStageListDTO.IMMOBILE;
    static OVERLOAD_RUNNING_MULTIPLIER = SheetDataCarryingStageListDTO.IMMOBILE;

    /** These properties contain the default limits per stage */
    static DEFAULT_LIGHT = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_LIGHT, true, 0, 0, SheetDataCarryingStageListDTO.LIGHT_MAX_DEXTERITY, SheetDataCarryingStageListDTO.LIGHT_CHECK_PENALTY, SheetDataCarryingStageListDTO.LIGHT_RUNNING_MULTIPLIER);
    static DEFAULT_MEDIUM = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_MEDIUM, false, 0, 0, SheetDataCarryingStageListDTO.MEDIUM_MAX_DEXTERITY, SheetDataCarryingStageListDTO.MEDIUM_CHECK_PENALTY, SheetDataCarryingStageListDTO.MEDIUM_RUNNING_MULTIPLIER);
    static DEFAULT_HEAVY = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_HEAVY, false, 0, 0, SheetDataCarryingStageListDTO.HEAVY_MAX_DEXTERITY, SheetDataCarryingStageListDTO.HEAVY_CHECK_PENALTY, SheetDataCarryingStageListDTO.HEAVY_RUNNING_MULTIPLIER);
    static DEFAULT_OVERLOAD = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_OVERLOAD, false, 0, SheetDataCarryingStageListDTO.DEFAULT_OVERLOAD_MAX, SheetDataCarryingStageListDTO.OVERLOAD_MAX_DEXTERITY, SheetDataCarryingStageListDTO.OVERLOAD_CHECK_PENALTY, SheetDataCarryingStageListDTO.OVERLOAD_RUNNING_MULTIPLIER);

    light = SheetDataCarryingStageListDTO.DEFAULT_LIGHT;
    medium = SheetDataCarryingStageListDTO.DEFAULT_MEDIUM;
    heavy = SheetDataCarryingStageListDTO.DEFAULT_HEAVY;
    overload = SheetDataCarryingStageListDTO.DEFAULT_OVERLOAD;

    /**
     * @param {SheetDataCarryingStageDTO} light  
     * @param {SheetDataCarryingStageDTO} medium 
     * @param {SheetDataCarryingStageDTO} heavy 
     * @param {SheetDataCarryingStageDTO} overload 
     */
    constructor(
        light,
        medium,
        heavy,
        overload
    ) {
        if(light) {
            this.light = light;
        }
        if(medium) {
            this.medium = medium;
        }
        if(heavy) {
            this.heavy = heavy;
        }
        if(overload) {
            this.overload = overload;
        }
    }

    /**
     * @param {String} stageName 
     * @returns {SheetDataCarryingStageDTO}
     */
    static getDefaultStage(stageName) {
        switch(stageName) {
            case SheetDataCarryingStageListDTO.STAGE_LIGHT:
                return SheetDataCarryingStageListDTO.DEFAULT_LIGHT;
            case SheetDataCarryingStageListDTO.STAGE_MEDIUM:
                return SheetDataCarryingStageListDTO.DEFAULT_MEDIUM;
            case SheetDataCarryingStageListDTO.STAGE_HEAVY:
                return SheetDataCarryingStageListDTO.DEFAULT_HEAVY;
            case SheetDataCarryingStageListDTO.STAGE_OVERLOAD:
                return SheetDataCarryingStageListDTO.DEFAULT_OVERLOAD;
        }
    }
}

class SheetDataCarryingWeightsDTO {
    coins;
    gems;
    body;
    belt;
    backpack;
    magicBag;

    static COINS = 'coins';
    static GEMS = 'gems';
    static BODY = 'body';
    static BELT = 'belt';
    static BACKPACK = 'backpack';
    static MAGICBAG = 'magicBag';

    /**
     * @param {Number} coins  
     * @param {Number} gems 
     * @param {Number} body 
     * @param {Number} belt 
     * @param {Number} backpack 
     * @param {Number} magicBag 
     */
    constructor(
        coins = 0,
        gems = 0,
        body = 0,
        belt = 0,
        backpack = 0,
        magicBag = 0
    ) {
        this.coins = coins;
        this.gems = gems;
        this.body = body;
        this.belt = belt;
        this.backpack = backpack;
        this.magicBag = magicBag;
    }
}

class SheetSectionCarrying extends AbstractSheetHelper{
    parent;
    sectionCarryingStage;

    WEIGHT_PLACEHOLDER = '%weightName%';

    FIELDNAME_LIFT = 'character-carrying-lift';
    FIELDNAME_HOIST = 'character-carrying-hoist';
    FIELDNAME_PULL = 'character-carrying-pull';
    FIELDNAME_WEIGHT = 'character-carrying-weight-' + this.WEIGHT_PLACEHOLDER;
    FIELDNAME_WEIGHT_TOTAL = 'character-carrying-weight-total';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionCarryingStage = new SheetSectionCarryingStage(this);
    }

    /**
     * Sets the weightName into e.g. a fieldname string
     * Replaces the placeholder '%weightName%'
     * 
     * @param {String} string 
     * @param {String} weightName 
     * @returns {String}
     */
    setWeightNameToString(string, weightName) {
        return string.replaceAll(this.WEIGHT_PLACEHOLDER, weightName)
    }

    /**
     * Returns all data of section "carrying"
     * 
     * @returns {SheetDataCarryingDTO}
     */
    getData() {
        return new SheetDataCarryingDTO(
            this.getStageList(),
            this.getLift(),
            this.getHoist(),
            this.getPull(),
            this.getWeights(),
            this.getWeightTotal()
        );
    }

    /**
     * Sets all data of section "carrying"
     * 
     * @param {SheetDataCarryingDTO} data 
     */
    setData(data) {
        this.setStageList(data.stageList);
        this.setLift(data.lift);
        this.setHoist(data.hoist);
        this.setPull(data.pull);
        this.setWeights(data.weights);
        this.setWeightTotal(data.weightTotal);
    }


    /**
     * @returns {SheetDataCarryingStageListDTO}
     */
    getStageList() {
        let stageList = new SheetDataCarryingStageListDTO();
        let keys = Object.keys(stageList);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let test = this.sectionCarryingStage.getData(key);
            stageList[key] = test;
        }
        return stageList;
    }

    /**
     * @param {SheetDataCarryingStageListDTO} stageList 
     */
    setStageList(stageList) {
        let keys = Object.keys(stageList);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this.sectionCarryingStage.setData(key, stageList[key]);
        }
    }


    /**
     * @returns {Number}
     */
    getLift() {
        return this.getElementValueByName(this.FIELDNAME_LIFT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setLift(value) {
        this.setElementValueByName(this.FIELDNAME_LIFT, value);
    }


    /**
     * @returns {Number}
     */
    getHoist() {
        return this.getElementValueByName(this.FIELDNAME_HOIST, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setHoist(value) {
        this.setElementValueByName(this.FIELDNAME_HOIST, value);
    }


    /**
     * @returns {Number}
     */
    getPull() {
        return this.getElementValueByName(this.FIELDNAME_PULL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setPull(value) {
        this.setElementValueByName(this.FIELDNAME_PULL, value);
    }


    /**
     * @returns {SheetDataCarryingWeightsDTO}
     */
    getWeights() {
        let weights = new SheetDataCarryingWeightsDTO();
        let keys = Object.keys(weights);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            weights[key] = this.getWeight(key);
        }
        return weights;
    }

    /**
     * @param {SheetDataCarryingWeightsDTO} weights
     */
    setWeights(weights) {
        let keys = Object.keys(weights);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this.setWeight(key, weights[key]);
        }
    }


    /**
     * @param {String} weightName 
     * @returns {Number}
     */
    getWeight(weightName) {
        let fieldname = this.setWeightNameToString(this.FIELDNAME_WEIGHT, weightName);
        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} weightName 
     * @param {Number} value 
     */
    setWeight(weightName, value) {
        let fieldname = this.setWeightNameToString(this.FIELDNAME_WEIGHT, weightName);
        this.setElementValueByName(fieldname, value);
    }


    /**
     * @returns {Number}
     */
    getWeightTotal() {
        return this.getElementValueByName(this.FIELDNAME_WEIGHT_TOTAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setWeightTotal(value) {
        this.setElementValueByName(this.FIELDNAME_WEIGHT_TOTAL, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @returns {String|Boolean}
     */
    determinActiveStage() {
        debug.log("SheetSectionCarrying.determinActiveStage");

        let stageList = this.getStageList();
        let keys = Object.keys(stageList);
        for(let i = 0; i < keys.length; i++) {
            let stage = stageList[keys[i]];
            let state = stage.active;
            if(state == this.STATE_ACTIVE) {
                return stage.stageName;
            }
        }

        return false;
    }

    /**
     * @param {Number} currentWeight 
     * @returns {String}
     */
    determineStageNameByWeight(currentWeight) {
        debug.log("SheetSectionCarrying.determineCarryingClass");

        let stageName = SheetDataCarryingStageListDTO.STAGE_OVERLOAD;
        let stageList = this.getStageList();
        let keys = Object.keys(stageList);
        for(let i = 0; i < keys.length; i++) {
            let stage = stageList[keys[i]];
            if(currentWeight >= stage.min && currentWeight <= (stage.max + 0.9)) {
                stageName = stage.stageName;
                break;
            }
        }

        return stageName;
    }

    /**
     * @param {String} stageName 
     */
    setMaxDexterityByCarrying(stageName) {
        debug.log("SheetSectionCarrying.setMaxDexterityByCarrying");

        let maxDexterity = this.sectionCarryingStage.getMaxDexterity(stageName);
        if(maxDexterity == -1) {
            maxDexterity = null;
        }
        this.parent.sectionAttributes.setMaxAttributeModifier(SheetSectionAttributes.MAX_MODIFIER_REASON_CARRYING, SheetSectionAttributes.ATTRIBUTE_DEXTERITY, maxDexterity);
    }

    /**
     * @param {String|null} stageName 
     */
    setCheckPenaltyByCarrying(stageName = null) {
        debug.log("SheetSectionCarrying.setCheckPenaltyByCarrying");

        if(!stageName) {
            stageName = this.determinActiveStage();
        }

        let checkPenalty = this.sectionCarryingStage.getCheckPenalty(stageName);
        if(checkPenalty != 0) {
            if(checkPenalty == SheetDataCarryingStageListDTO.IMMOBILE) {
                checkPenalty = 1000;
            } else {
                if(checkPenalty < 0) {
                    checkPenalty *= -1;
                }
            }
        }

        this.parent.checkPenaltyHelper.setCheckPenalty(CheckPenaltyHelper.SOURCE_CARRYING, checkPenalty);
    }

    /**
     * @param {String} stageName 
     */
    setRunningMultiplierByCarrying(stageName) {
        debug.log("SheetSectionCarrying.setRunningMultiplierByCarrying");

        let runningMultiplier = this.sectionCarryingStage.getRunningMultiplier(stageName);
        if (runningMultiplier == SheetDataCarryingStageListDTO.IMMOBILE) {
            runningMultiplier = 0;
            this.parent.sectionMovement.setImmobile(true);
        } else {
            this.parent.sectionMovement.setImmobile(false);
        }
        
        this.parent.sectionMovement.setRoundRunningMultiplier(runningMultiplier);
    }

    updateCarryingStage() {
        debug.log("SheetSectionCarrying.updateCarryingClass");

        let currentWeight = this.getWeightTotal();
        let currentStageName = this.determinActiveStage();
        let newStageName = this.determineStageNameByWeight(currentWeight);

        if(currentStageName != newStageName) {
            if(currentStageName) {
                this.sectionCarryingStage.setActive(currentStageName, this.STATE_INACTIVE);
            }
            this.sectionCarryingStage.setActive(newStageName, this.STATE_ACTIVE);

            this.setMaxDexterityByCarrying(newStageName);
            this.setCheckPenaltyByCarrying(newStageName);
            this.setRunningMultiplierByCarrying(newStageName);
        }
    }

    /**
     * @param {Number} strength 
     */
    setRanges(strength) {
        debug.log("SheetSectionCarrying.setCarryingRanges");

        if(strength < 0) {
            strength = 0;
        }
        let carryingLimits = CharacterDataTables.getCarryingLimitByStrength(strength);
        if (!carryingLimits) {
            error.show('No carrying limits defined for strength "' + strength + '"!');
            return;
        }
        
        let min = 0;
        let max = 0;
        let stageList =  this.getStageList();
        let keys = Object.keys(stageList);
        for (let i = 0; i < keys.length; i++) {
            let stage = stageList[keys[i]];
            let stageName = stage.stageName;

            max = carryingLimits[stageName];
            this.sectionCarryingStage.setMin(stageName, min);
            if(stageName != SheetDataCarryingStageListDTO.STAGE_OVERLOAD) {
                this.sectionCarryingStage.setMax(stageName, max);
            }

            min = max + 1;
        }
        this.setLift(carryingLimits.lift);
        this.setHoist(carryingLimits.hoist);
        this.setPull(carryingLimits.pull);

        this.updateCarryingStage();
    }
    
    sumWeight() {
        debug.log("SheetSectionCarrying.sumWeight");

        let coinsWeight = this.getWeight(SheetDataCarryingWeightsDTO.COINS);
        let gemsWeight = this.getWeight(SheetDataCarryingWeightsDTO.GEMS);
        let bodyWeight = this.getWeight(SheetDataCarryingWeightsDTO.BODY);
        let beltWeight = this.getWeight(SheetDataCarryingWeightsDTO.BELT);
        let backpackWeight = this.getWeight(SheetDataCarryingWeightsDTO.BACKPACK);
        let magicBagWeight = this.getWeight(SheetDataCarryingWeightsDTO.MAGICBAG);

        let totalWeight = Math.floor((coinsWeight + gemsWeight + bodyWeight + beltWeight + backpackWeight + magicBagWeight) * 10 ) / 10;
        this.setWeightTotal(totalWeight);
    }

    setWeightPenalty() {
        debug.log("SheetSectionCarrying.setWeightPenalty");

        let totalWeight = this.getWeightTotal();
        let weightPenalty = Math.floor(totalWeight / 5);
        this.parent.checkPenaltyHelper.setCheckPenalty(CheckPenaltyHelper.SOURCE_WEIGHT, weightPenalty);
    }
}

class SheetSectionCarryingStage extends AbstractSheetHelper{
    parent;

    STAGE_PLACEHOLDER = '%stageName%';

    FIELDNAME_ACTIVE = 'character-carrying-' + this.STAGE_PLACEHOLDER + '-active';
    FIELDNAME_MIN = 'character-carrying-' + this.STAGE_PLACEHOLDER + '-min';
    FIELDNAME_MAX = 'character-carrying-' + this.STAGE_PLACEHOLDER + '-max';
    FIELDNAME_MAX_DEXTERITY = 'character-carrying-' + this.STAGE_PLACEHOLDER + '-max-dexterity';
    FIELDNAME_CHECK_PENALTY = 'character-carrying-' + this.STAGE_PLACEHOLDER + '-check-penalty';
    FIELDNAME_RUNNING_MULTIPLIER = 'character-carrying-' + this.STAGE_PLACEHOLDER + '-running-multiplier';

    /**
     * @param {SheetSectionCarrying} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Sets the stageName into e.g. a fieldname string
     * Replaces the placeholder '%stageName%'
     * 
     * @param {String} string 
     * @param {String} stageName 
     * @returns {String}
     */
    setStageNameToString(string, stageName) {
        return string.replaceAll(this.STAGE_PLACEHOLDER, stageName)
    }

    /**
     * Returns all data of section "carryingStage"
     * 
     * @param {String} stageName 
     * @returns {SheetDataCarryingStageDTO}
     */
    getData(stageName) {
        return new SheetDataCarryingStageDTO(
            stageName,
            this.getActive(stageName),
            this.getMin(stageName),
            this.getMax(stageName)
        );
    }

    /**
     * Sets all data of section "carryingStage"
     * 
     * @param {String} stageName 
     * @param {SheetDataCarryingStageDTO} data 
     */
    setData(stageName, data) {
        this.setActive(stageName, data.active);
        this.setMin(stageName, data.min);
        this.setMax(stageName, data.max);

        let defaultStageValues = SheetDataCarryingStageListDTO.getDefaultStage(stageName);
        this.setMaxDexterity(stageName, defaultStageValues.maxDexterity);
        this.setCheckPenalty(stageName, defaultStageValues.checkPenalty);
        this.setRunningMultiplier(stageName, defaultStageValues.runningMultiplier);
    }

    /**
     * @returns {Boolean}
     */
    getActive(stageName) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_ACTIVE, stageName)
        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Boolean} value 
     */
    setActive(stageName, value) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_ACTIVE, stageName)
        this.setElementValueByName(fieldname, value);

        let stateElement = this.getElementByName(fieldname);
        let stateIcon = stateElement.parentElement;
        stateIcon.className = this.getStateCssClassByState(value);
    }


    /**
     * @returns {Number}
     */
    getMin(stageName) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_MIN, stageName)
        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setMin(stageName, value) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_MIN, stageName)
        this.setElementValueByName(fieldname, value);
    }


    /**
     * @returns {Number}
     */
    getMax(stageName) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_MAX, stageName)
        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setMax(stageName, value) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_MAX, stageName)
        this.setElementValueByName(fieldname, value);
    }


    /**
     * @returns {Number}
     */
    getMaxDexterity(stageName) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_MAX_DEXTERITY, stageName)
        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setMaxDexterity(stageName, value) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_MAX_DEXTERITY, stageName)
        this.setElementValueByName(fieldname, value);
    }


    /**
     * @returns {Number|String}
     */
    getCheckPenalty(stageName) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_CHECK_PENALTY, stageName)
        let value = this.getElementValueByName(fieldname);
        if(value == SheetDataCarryingStageListDTO.IMMOBILE) {
            return value;
        }

        return Number(value);
    }

    /**
     * @param {Number|String} value 
     */
    setCheckPenalty(stageName, value) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_CHECK_PENALTY, stageName)
        this.setElementValueByName(fieldname, value);
    }


    /**
     * @returns {Number|String}
     */
    getRunningMultiplier(stageName) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_RUNNING_MULTIPLIER, stageName)
        let value = this.getElementValueByName(fieldname);
        if(value == SheetDataCarryingStageListDTO.IMMOBILE) {
            return value;
        }

        return Number(value);
    }

    /**
     * @param {Number|String} value 
     */
    setRunningMultiplier(stageName, value) {
        let fieldname = this.setStageNameToString(this.FIELDNAME_RUNNING_MULTIPLIER, stageName)
        this.setElementValueByName(fieldname, value);
    }
}