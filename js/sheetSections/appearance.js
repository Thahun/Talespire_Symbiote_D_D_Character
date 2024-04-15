class SheetDataAppearanceDTO {
    gender;
    ageNatural;
    ageMagical;
    ageTotal;
    height;
    sizeCategory;
    weight;
    eyeColor;
    hairColor;

    /**
     * @param {String} gender 
     * @param {Number} ageNatural 
     * @param {Number} ageMagical 
     * @param {Number} ageTotal 
     * @param {Number} height 
     * @param {SheetDataAppearanceSizeCategoryDTO} sizeCategory 
     * @param {Number} weight 
     * @param {String} eyeColor 
     * @param {String} hairColor 
     */
    constructor(
        gender,
        ageNatural,
        ageMagical,
        ageTotal,
        height,
        sizeCategory,
        weight,
        eyeColor,
        hairColor
    ) {
        this.gender = gender;
        this.ageNatural = ageNatural;
        this.ageMagical = ageMagical;
        this.ageTotal = ageTotal;
        this.height = height;
        this.sizeCategory = sizeCategory;
        this.weight = weight;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
    }
}

class SheetDataAppearanceSizeCategoryDTO {
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

class SheetSectionAppearance extends AbstractSheetHelper{
    parent;

    FIELDNAME_GENDER = 'character-gender';
    FIELDNAME_AGE_NATURAL = 'character-age-natural';
    FIELDNAME_AGE_MAGICAL = 'character-age-magical';
    FIELDNAME_AGE_TOTAL = 'character-age-total';
    FIELDNAME_HEIGHT = 'character-height';
    FIELDNAME_SIZE_CATEGORY = 'character-size-category';
    FIELDNAME_WEIGHT = 'character-weight';
    FIELDNAME_EYECOLOR = 'character-eye-color';
    FIELDNAME_HAIRCOLOR = 'character-hair-color';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of section "appearance"
     * 
     * @returns {SheetDataAppearanceDTO}
     */
    getData() {
        return new SheetDataAppearanceDTO(
            this.getGender(),
            this.getAgeNatural(),
            this.getAgeMagical(),
            this.getAgeTotal(),
            this.getHeight(),
            this.getSizeCategory(),
            this.getWeight(),
            this.getEyeColor(),
            this.getHairColor()
        );
    }

    /**
     * Sets all data of section "appearance"
     * 
     * @param {SheetDataAppearanceDTO} data 
     */
    setData(data) {
        this.setGender(data.gender);
        this.setAgeNatural(data.ageNatural);
        this.setAgeMagical(data.ageMagical);
        this.setAgeTotal(data.ageTotal);
        this.setHeight(data.height);
        this.setSizeCategory(data.sizeCategory.id, data.sizeCategory.name);
        this.setWeight(data.weight);
        this.setEyeColor(data.eyeColor);
        this.setHairColor(data.hairColor);
    }

    /**
     * @returns {String}
     */
    getGender() {
        return this.getElementValueByName(this.FIELDNAME_GENDER);
    }

    /**
     * @param {String} value 
     */
    setGender(value) {
        this.setElementValueByName(this.FIELDNAME_GENDER, value);
    }


    /**
     * @returns {Number}
     */
    getAgeNatural() {
        return this.getElementValueByName(this.FIELDNAME_AGE_NATURAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setAgeNatural(value) {
        this.setElementValueByName(this.FIELDNAME_AGE_NATURAL, value);
    }


    /**
     * @returns {Number}
     */
    getAgeMagical() {
        return this.getElementValueByName(this.FIELDNAME_AGE_MAGICAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setAgeMagical(value) {
        this.setElementValueByName(this.FIELDNAME_AGE_MAGICAL, value);
    }


    /**
     * @returns {Number}
     */
    getAgeTotal() {
        return this.getElementValueByName(this.FIELDNAME_AGE_TOTAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setAgeTotal(value) {
        this.setElementValueByName(this.FIELDNAME_AGE_TOTAL, value);
    }


    /**
     * @returns {Number}
     */
    getHeight() {
        return this.getElementValueByName(this.FIELDNAME_HEIGHT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setHeight(value) {
        this.setElementValueByName(this.FIELDNAME_HEIGHT, value);
    }

    
    /**
     * @returns {SheetDataAppearanceSizeCategoryDTO}
     */
    getSizeCategory() {
        let sizeCategoryElement = this.getElementByName(this.FIELDNAME_SIZE_CATEGORY);

        return new SheetDataAppearanceSizeCategoryDTO(Number(sizeCategoryElement.dataset.id), sizeCategoryElement.value);
    }

    /**
     * If value isn't provided, it'll be determined by id
     * 
     * @param {Number} id 
     * @param {String|null} value 
     */
    setSizeCategory(id, value = null) {
        if(!value) {
            let sizeCategoryObj = CharacterDataTables.getSizeCategoryById(id);
            value = sizeCategoryObj.name;
        }

        this.setElementValueByName(this.FIELDNAME_SIZE_CATEGORY, value, id);
    }


    /**
     * @returns {Number}
     */
    getWeight() {
        return this.getElementValueByName(this.FIELDNAME_WEIGHT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setWeight(value) {
        this.setElementValueByName(this.FIELDNAME_WEIGHT, value);
    }


    /**
     * @returns {String}
     */
    getEyeColor() {
        return this.getElementValueByName(this.FIELDNAME_EYECOLOR);
    }

    /**
     * @param {String} value 
     */
    setEyeColor(value) {
        this.setElementValueByName(this.FIELDNAME_EYECOLOR, value);
    }


    /**
     * @returns {String}
     */
    getHairColor() {
        return this.getElementValueByName(this.FIELDNAME_HAIRCOLOR);
    }

    /**
     * @param {String} value 
     */
    setHairColor(value) {
        this.setElementValueByName(this.FIELDNAME_HAIRCOLOR, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    sumAge() {
        debug.log("SheetSectionAppearance.sumAge");

        let ageSum = this.getAgeNatural() + this.getAgeMagical();
        this.setAgeTotal(ageSum);
    }

    validateHeight() {
        debug.log("SheetSectionAppearance.validateHeight");

        let height = this.getHeight();
        if(height == 0) {
            //Size isn't set yet
            return;
        } else if (height < 10) {
            //Assume size was entered in meter not centimeter, but the limites are defined in centimeter
            height = Math.floor(height * 100);
        }

        let sizeCategory = this.getSizeCategory();
        let sizeCategoryObj = CharacterDataTables.getSizeCategoryById(sizeCategory.id);
        if(height < sizeCategoryObj.min) {
            this.setElementColorByName(this.FIELDNAME_HEIGHT, this.COLOR_CODE_RED);
            info.show("Your character is too small!");
        } else if(height > sizeCategoryObj.max) {
            this.setElementColorByName(this.FIELDNAME_HEIGHT, this.COLOR_CODE_RED);
            info.show("Your character is too big!");
        } else {
            this.setElementColorByName(this.FIELDNAME_HEIGHT);
        }
    }
}