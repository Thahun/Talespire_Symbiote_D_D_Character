class SheetDataInspirationDTO {
    current;
    max;

    /**
     * @param {Number} current 
     * @param {Number} max 
     */
    constructor(
        current,
        max
    ) {
        this.current = current;
        this.max = max;
    }
}

class SheetSectionInspiration extends AbstractSheetHelper{
    parent;

    FIELDNAME_CURRENT = 'character-inspiration-current';
    FIELDNAME_MAX = 'character-inspiration-max';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of section "inspiration"
     * 
     * @returns {SheetDataInspirationDTO}
     */
    getData() {
        return new SheetDataInspirationDTO(
            this.getCurrent(),
            this.getMax()
        );
    }

    /**
     * Sets all data of section "inspiration"
     * 
     * @param {SheetDataInspirationDTO} data 
     */
    setData(data) {
        this.setCurrent(data.current);
        this.setMax(data.max);
    }


    /**
     * @returns {Number}
     */
    getCurrent() {
        return this.getElementValueByName(this.FIELDNAME_CURRENT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setCurrent(value) {
        this.setElementValueByName(this.FIELDNAME_CURRENT, value);
    }


    /**
     * @returns {Number}
     */
    getMax() {
        return this.getElementValueByName(this.FIELDNAME_MAX, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setMax(value) {
        this.setElementValueByName(this.FIELDNAME_MAX, value);
    }
}