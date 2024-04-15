class SheetDataValuablesDTO {
    coinList;
    totalCoinAmount;
    totalCoinWeight;
    gemList;
    totalGemWorth;
    totalGemAmount;
    totalGemWeight;

    /**
     * @param {SheetDataValuablesCoinListDTO} coinList 
     * @param {Number} totalCoinAmount 
     * @param {Number} totalCoinWeight 
     * @param {Array.<SheetDataValuablesGemDTO>} gemList 
     * @param {Number} totalGemWorth 
     * @param {Number} totalGemAmount 
     * @param {Number} totalGemWeight 
     */
    constructor(
        coinList = [],
        totalCoinAmount = 0,
        totalCoinWeight = 0,
        gemList = [],
        totalGemWorth = 0,
        totalGemAmount = 0,
        totalGemWeight = 0
    ) {
        this.coinList = coinList;
        this.totalCoinAmount = totalCoinAmount;
        this.totalCoinWeight = totalCoinWeight;
        this.gemList = gemList;
        this.totalGemWorth = totalGemWorth;
        this.totalGemAmount = totalGemAmount;
        this.totalGemWeight = totalGemWeight;
    }
}

class SheetDataValuablesCoinDTO {
    coinName;
    amount;
    weight;

    /**
     * @param {String} coinName 
     * @param {Number} amount 
     * @param {Number} weight 
     */
    constructor(
        coinName,
        amount = 0,
        weight = 0
    ) {
        this.coinName = coinName;
        this.amount = amount;
        this.weight = weight;
    }
}

class SheetDataValuablesCoinListDTO {
    static COIN_PLATINUM = 'platinum';
    static COIN_GOLD = 'gold';
    static COIN_SILVER = 'silver';
    static COIN_COPPER = 'copper';

    /** These properties contain the default values per coin type */
    static DEFAULT_PLATINUM = new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_PLATINUM);
    static DEFAULT_GOLD = new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_GOLD);
    static DEFAULT_SILVER = new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_SILVER);
    static DEFAULT_COPPER = new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_COPPER);

    platinum = SheetDataValuablesCoinListDTO.DEFAULT_PLATINUM;
    gold = SheetDataValuablesCoinListDTO.DEFAULT_GOLD;
    silver = SheetDataValuablesCoinListDTO.DEFAULT_SILVER;
    copper = SheetDataValuablesCoinListDTO.DEFAULT_COPPER;

    /**
     * @param {SheetDataValuablesCoinDTO} platinum  
     * @param {SheetDataValuablesCoinDTO} gold 
     * @param {SheetDataValuablesCoinDTO} silver 
     * @param {SheetDataValuablesCoinDTO} copper 
     */
    constructor(
        platinum,
        gold,
        silver,
        copper
    ) {
        if(platinum) {
            this.platinum = platinum;
        }
        if(gold) {
            this.gold = gold;
        }
        if(silver) {
            this.silver = silver;
        }
        if(copper) {
            this.copper = copper;
        }
    }
}

class SheetDataValuablesGemDTO {
    name;
    worth;
    amount;
    weight;

    /**
     * @param {String} name 
     * @param {Number} worth 
     * @param {Number} amount 
     * @param {Number} weight 
     */
    constructor(
        name,
        worth = 0,
        amount = 0,
        weight = 0
    ) {
        this.name = name;
        this.worth = worth;
        this.amount = amount;
        this.weight = weight;
    }
}

class SheetSectionValuables extends AbstractSheetHelper{
    parent;
    sectionValuablesCoin;
    sectionValuablesGem;

    FIELDNAME_COINS_TOTAL_AMOUNT = 'character-valuables-coins-total-amount';
    FIELDNAME_COINS_TOTAL_WEIGHT = 'character-valuables-coins-total-weight';
    FIELDNAME_GEMS_TOTAL_WORTH = 'character-valuables-gems-total-worth';
    FIELDNAME_GEMS_TOTAL_AMOUNT = 'character-valuables-gems-total-amount';
    FIELDNAME_GEMS_TOTAL_WEIGHT = 'character-valuables-gems-total-weight';

    FIELDNAME_GEMS_INDEX = 'character-valuables-gems-id[]';
    FIELDID_GEMS_SUM_ROW = 'character-valuables-gems-sum-row';

    ELEMENTID_GEMS_CELL_ID = 'character-valuables-gems-cell-id[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_GEMS_CELL_NAME = 'character-valuables-gems-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_GEMS_CELL_WORTH = 'character-valuables-gems-cell-worth[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_GEMS_CELL_AMOUNT = 'character-valuables-gems-cell-amount[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_GEMS_CELL_WEIGHT = 'character-valuables-gems-cell-weight[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_GEMS_CELL_ICON = 'character-valuables-gems-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionValuablesCoin = new SheetSectionValuablesCoin(this);
        this.sectionValuablesGem = new SheetSectionValuablesGem(this);
    }

    /**
     * Returns all data of section "valuables"
     * 
     * @returns {SheetDataValuablesDTO}
     */
    getData() {
        return new SheetDataValuablesDTO(
            this.getCoinList(),
            this.getTotalCoinAmount(),
            this.getTotalCoinWeight(),
            this.getGems(),
            this.getTotalGemsWorth(),
            this.getTotalGemsAmount(),
            this.getTotalGemsWeight()
        );
    }

    /**
     * Sets all data of section "valuables"
     * 
     * @param {SheetDataValuablesDTO} data 
     */
    setData(data) {
        this.setCoinList(data.coinList);
        this.setTotalCoinAmount(data.totalCoinAmount);
        this.setTotalCoinWeight(data.totalCoinWeight);
        this.setGems(data.gemList);
        this.setTotalGemsWorth(data.totalGemWorth);
        this.setTotalGemsAmount(data.totalGemAmount);
        this.setTotalGemsWeight(data.totalGemWeight);
    }


    /**
     * @returns {SheetDataValuablesCoinListDTO}
     */
    getCoinList() {
        let coinList = new SheetDataValuablesCoinListDTO();
        let keys = Object.keys(coinList);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            coinList[key] = this.sectionValuablesCoin.getData(key);
        }
        return coinList;
    }

    /**
     * @param {SheetDataValuablesCoinListDTO} coinList 
     */
    setCoinList(coinList) {
        let keys = Object.keys(coinList);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this.sectionValuablesCoin.setData(key, coinList[key]);
        }
    }


    /**
     * @returns {Number}
     */
    getTotalCoinAmount() {
        return this.getElementValueByName(this.FIELDNAME_COINS_TOTAL_AMOUNT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTotalCoinAmount(value) {
        this.setElementValueByName(this.FIELDNAME_COINS_TOTAL_AMOUNT, value);
    }


    /**
     * @returns {Number}
     */
    getTotalCoinWeight() {
        return this.getElementValueByName(this.FIELDNAME_COINS_TOTAL_WEIGHT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTotalCoinWeight(value) {
        this.setElementValueByName(this.FIELDNAME_COINS_TOTAL_WEIGHT, value);
    }


    /**
     * @returns {Array.<SheetDataValuablesGemDTO>}
     */
    getGems() {
        let gemList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_GEMS_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let gemData = this.sectionValuablesGem.getData(index);
            gemList.push(gemData);
        }
        return gemList;
    }

    /**
     * Setting a list of gems
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataValuablesGemDTO>} gemList 
     */
    setGems(gemList) {
        this.removeAllGems();

        for (let i = 0; i < gemList.length; i++) {
            let gemData = gemList[i];
            this.addGem(gemData.name, gemData.worth, gemData.amount, gemData.weight);
        }
    }


    /**
     * @returns {Number}
     */
    getTotalGemsWorth() {
        return this.getElementValueByName(this.FIELDNAME_GEMS_TOTAL_WORTH, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTotalGemsWorth(value) {
        this.setElementValueByName(this.FIELDNAME_GEMS_TOTAL_WORTH, value);
    }


    /**
     * @returns {Number}
     */
    getTotalGemsAmount() {
        return this.getElementValueByName(this.FIELDNAME_GEMS_TOTAL_AMOUNT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTotalGemsAmount(value) {
        this.setElementValueByName(this.FIELDNAME_GEMS_TOTAL_AMOUNT, value);
    }


    /**
     * @returns {Number}
     */
    getTotalGemsWeight() {
        return this.getElementValueByName(this.FIELDNAME_GEMS_TOTAL_WEIGHT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTotalGemsWeight(value) {
        this.setElementValueByName(this.FIELDNAME_GEMS_TOTAL_WEIGHT, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllGems() {
        debug.log("SheetSectionValuables.removeAllGems");

        let indexes = this.getIndexes(this.FIELDNAME_GEMS_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeGem(indexes[i]);
        }
    }

    /**
     * @param {Number} gemIndex 
     */
    removeGem(gemIndex) {
        debug.log("SheetSectionValuables.removeGem");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_GEMS_CELL_ID, gemIndex),
            this.setIndexToString(this.ELEMENTID_GEMS_CELL_NAME, gemIndex),
            this.setIndexToString(this.ELEMENTID_GEMS_CELL_WORTH, gemIndex),
            this.setIndexToString(this.ELEMENTID_GEMS_CELL_AMOUNT, gemIndex),
            this.setIndexToString(this.ELEMENTID_GEMS_CELL_WEIGHT, gemIndex),
            this.setIndexToString(this.ELEMENTID_GEMS_CELL_ICON, gemIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {String} name 
     * @param {Number} worth 
     * @param {Number} amount 
     * @param {Number} weight 
     */
    addGem(name = '', worth = 0, amount = 0, weight = 0) {
        debug.log("SheetSectionValuables.addGem");

        let gemIndex = this.determineNextIndex(this.FIELDNAME_GEMS_INDEX);
        
        let newGemHtmlString = ' \
        <div id="character-valuables-gems-cell-id[' + gemIndex + ']" class="grid-item-label" style="grid-column-end: span 1;"> \
            <input name="character-valuables-gems-id[]" type="hidden" value="' + gemIndex + '"> \
        </div> \
        <div id="character-valuables-gems-cell-name[' + gemIndex + ']" class="grid-item-data" style="grid-column-end: span 2;"> \
            <input name="character-valuables-gems-name[' + gemIndex + ']" class="field-data gems" type="text" value="' + name + '"></input> \
        </div> \
        <div id="character-valuables-gems-cell-worth[' + gemIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-valuables-gems-worth[' + gemIndex + ']" class="field-data-worth" type="number" step="0.1" value="' + worth + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionValuables.sumGemsWorth();"></input> \
        </div> \
        <div id="character-valuables-gems-cell-amount[' + gemIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-valuables-gems-amount[' + gemIndex + ']" class="field-data-amount" type="number" value="' + amount + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionValuables.sumGemsAmount();"></input> \
        </div> \
        <div id="character-valuables-gems-cell-weight[' + gemIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-valuables-gems-weight[' + gemIndex + ']" class="field-data-short" type="number" step="0.1" value="' + weight + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionValuables.sumGemsWeight();"></input> \
        </div> \
        <div id="character-valuables-gems-cell-icon[' + gemIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <div id="character-valuables-gems-icon[' + gemIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionValuables.removeGem(' + gemIndex + ');">-</div> \
        </div> \
        ';
        let newGemHtmlDocument = new DOMParser().parseFromString(newGemHtmlString, "text/html");
        let newGemHtmlCollection = newGemHtmlDocument.body.children;
        let characterGemAddRow = this.getElementById(this.FIELDID_GEMS_SUM_ROW);
        characterGemAddRow.before(...newGemHtmlCollection);
        
        this.sumGemsWorth();
        this.sumGemsAmount();
        this.sumGemsWeight();
    }

    /**
     * @param {String} coinName 
     */
    calculateCoinWeight(coinName) {
        debug.log("SheetSectionValuables.calculateCoinWeight");

        let amount = this.sectionValuablesCoin.getAmount(coinName);
        let weight = Math.floor((amount / 50) * 10) / 10;
        this.sectionValuablesCoin.setWeight(coinName, weight);
    }

    sumCoinsAmount() {
        debug.log("SheetSectionValuables.sumCoinsAmount");

        let platinum = this.sectionValuablesCoin.getAmount(SheetDataValuablesCoinListDTO.COIN_PLATINUM);
        let gold = this.sectionValuablesCoin.getAmount(SheetDataValuablesCoinListDTO.COIN_GOLD);
        let silver = this.sectionValuablesCoin.getAmount(SheetDataValuablesCoinListDTO.COIN_SILVER);
        let copper = this.sectionValuablesCoin.getAmount(SheetDataValuablesCoinListDTO.COIN_COPPER);
        let sum = platinum + gold + silver + copper;
        this.setTotalCoinAmount(sum);
    }

    sumCoinsWeight() {
        debug.log("SheetSectionValuables.sumCoinsWeight");

        let platinum = this.sectionValuablesCoin.getWeight(SheetDataValuablesCoinListDTO.COIN_PLATINUM);
        let gold = this.sectionValuablesCoin.getWeight(SheetDataValuablesCoinListDTO.COIN_GOLD);
        let silver = this.sectionValuablesCoin.getWeight(SheetDataValuablesCoinListDTO.COIN_SILVER);
        let copper = this.sectionValuablesCoin.getWeight(SheetDataValuablesCoinListDTO.COIN_COPPER);
        let sum = Math.floor((platinum + gold + silver + copper) * 10) / 10;
        this.setTotalCoinWeight(sum);

        this.parent.sectionCarrying.setWeight(SheetDataCarryingWeightsDTO.COINS, sum);
    }

    sumGemsWorth() {
        debug.log("SheetSectionValuables.sumGemsWorth");

        let worthSum = 0;
        let indexes = this.getIndexes(this.FIELDNAME_GEMS_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let worth = this.sectionValuablesGem.getWorth(index);
            worthSum += worth;
        }
        worthSum = Math.floor(worthSum * 10) / 10;
        this.setTotalGemsWorth(worthSum);
    }

    sumGemsAmount() {
        debug.log("SheetSectionValuables.sumGemsAmount");

        let amountSum = 0;
        let indexes = this.getIndexes(this.FIELDNAME_GEMS_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let amount = this.sectionValuablesGem.getAmount(index);
            amountSum += amount;
        }
        this.setTotalGemsAmount(amountSum);
    }
    
    sumGemsWeight() {
        debug.log("SheetSectionValuables.sumGemsWeight");

        let weightSum = 0;
        let indexes = this.getIndexes(this.FIELDNAME_GEMS_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let weight = this.sectionValuablesGem.getWeight(index);
            weightSum += weight;
        }
        weightSum = Math.floor(weightSum * 10) / 10;
        this.setTotalGemsWeight(weightSum);

        this.parent.sectionCarrying.setWeight(SheetDataCarryingWeightsDTO.GEMS, weightSum);
    }
}

class SheetSectionValuablesCoin extends AbstractSheetHelper{
    parent;

    COIN_PLACEHOLDER = '%coinName%';

    FIELDNAME_AMOUNT = 'character-valuables-coins-' + this.COIN_PLACEHOLDER + '-amount';
    FIELDNAME_WEIGHT = 'character-valuables-coins-' + this.COIN_PLACEHOLDER + '-weight';

    /**
     * @param {SheetSectionValuables} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Sets the coinName into e.g. a fieldname string
     * Replaces the placeholder '%coinName%'
     * 
     * @param {String} string 
     * @param {String} coinName 
     * @returns {String}
     */
    setCoinNameToString(string, coinName) {
        return string.replaceAll(this.COIN_PLACEHOLDER, coinName)
    }

    /**
     * Returns all data of one coin of section "valuables"
     * 
     * @param {String} coinName 
     * @returns {SheetDataValuablesCoinDTO}
     */
    getData(coinName) {
        return new SheetDataValuablesCoinDTO(
            coinName,
            this.getAmount(coinName),
            this.getWeight(coinName)
        );
    }

    /**
     * Sets all data of one coin of section "valuables"
     * 
     * @param {String} coinName 
     * @param {SheetDataValuablesCoinDTO} data 
     */
    setData(coinName, data) {
        this.setAmount(coinName, data.amount);
        this.setWeight(coinName, data.weight);
    }


    /**
     * @param {String} coinName 
     * @returns {Number}
     */
    getAmount(coinName) {
        let fieldname = this.setCoinNameToString(this.FIELDNAME_AMOUNT, coinName);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} coinName 
     * @param {Number} value 
     */
    setAmount(coinName, value) {
        let fieldname = this.setCoinNameToString(this.FIELDNAME_AMOUNT, coinName);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {String} coinName 
     * @returns {Number}
     */
    getWeight(coinName) {
        let fieldname = this.setCoinNameToString(this.FIELDNAME_WEIGHT, coinName);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} coinName 
     * @param {Number} value 
     */
    setWeight(coinName, value) {
        let fieldname = this.setCoinNameToString(this.FIELDNAME_WEIGHT, coinName);

        this.setElementValueByName(fieldname, value);
    }
}


class SheetSectionValuablesGem extends AbstractSheetHelper {
    parent;

    FIELDNAME_NAME = 'character-valuables-gems-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_WORTH = 'character-valuables-gems-worth[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_AMOUNT = 'character-valuables-gems-amount[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_WEIGHT = 'character-valuables-gems-weight[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionValuables} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one gem of section "valuables"
     * 
     * @param {Number} index 
     * @returns {SheetDataValuablesGemDTO}
     */
    getData(index) {
        return new SheetDataValuablesGemDTO(
            this.getName(index),
            this.getWorth(index),
            this.getAmount(index),
            this.getWeight(index)
        );
    }

    /**
     * Sets all data of one gem of section "valuables"
     * 
     * @param {Number} index 
     * @param {SheetDataValuablesGemDTO} data 
     */
    setData(index, data) {
        this.setName(index, data.name);
        this.setWorth(index, data.worth);
        this.setAmount(index, data.amount);
        this.setWeight(index, data.weight);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getName(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_NAME, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setName(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_NAME, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getWorth(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_WORTH, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setWorth(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_WORTH, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getAmount(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_AMOUNT, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setAmount(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_AMOUNT, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getWeight(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_WEIGHT, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setWeight(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_WEIGHT, index);

        this.setElementValueByName(fieldname, value);
    }
}