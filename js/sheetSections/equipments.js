class SheetDataEquipmentsDTO {
    locationList;

    /**
     * @param {SheetDataEquipmentsLocationListDTO} locationList 
     */
    constructor(
        locationList = new SheetDataEquipmentsLocationListDTO()
    ) {
        if(locationList) {
            this.locationList = locationList;
        }
    }
}

class SheetDataEquipmentsLocationDTO {
    location;
    itemList;
    totalWorth;
    totalAmount;
    totalWeight;

    /**
     * @param {String} location 
     * @param {Array.<SheetDataEquipmentsItemDTO>} itemList 
     * @param {Number} totalWorth 
     * @param {Number} totalAmount 
     * @param {Number} totalWeight 
     */
    constructor(
        location,
        itemList = [],
        totalWorth = 0,
        totalAmount = 0,
        totalWeight = 0
    ) {
        this.location = location;
        this.itemList = itemList;
        this.totalWorth = totalWorth;
        this.totalAmount = totalAmount;
        this.totalWeight = totalWeight;
    }
}

class SheetDataEquipmentsLocationListDTO {
    static LOCATION_BODY = 'body';
    static LOCATION_BELT = 'belt';
    static LOCATION_BACKPACK = 'backpack';
    static LOCATION_MAGIC_BAG = 'magicBag';

    /** These properties contain the default values per coin type */
    static DEFAULT_BODY = new SheetDataEquipmentsLocationDTO(SheetDataEquipmentsLocationListDTO.LOCATION_BODY);
    static DEFAULT_BELT = new SheetDataEquipmentsLocationDTO(SheetDataEquipmentsLocationListDTO.LOCATION_BELT);
    static DEFAULT_BACKPACK = new SheetDataEquipmentsLocationDTO(SheetDataEquipmentsLocationListDTO.LOCATION_BACKPACK);
    static DEFAULT_MAGIC_BAG = new SheetDataEquipmentsLocationDTO(SheetDataEquipmentsLocationListDTO.LOCATION_MAGIC_BAG);

    body = SheetDataEquipmentsLocationListDTO.DEFAULT_BODY;
    belt = SheetDataEquipmentsLocationListDTO.DEFAULT_BELT;
    backpack = SheetDataEquipmentsLocationListDTO.DEFAULT_BACKPACK;
    magicBag = SheetDataEquipmentsLocationListDTO.DEFAULT_MAGIC_BAG;

    /**
     * @param {SheetDataEquipmentsLocationDTO} body  
     * @param {SheetDataEquipmentsLocationDTO} belt 
     * @param {SheetDataEquipmentsLocationDTO} backpack 
     * @param {SheetDataEquipmentsLocationDTO} magicBag 
     */
    constructor(
        body,
        belt,
        backpack,
        magicBag
    ) {
        if(body) {
            this.body = body;
        }
        if(belt) {
            this.belt = belt;
        }
        if(backpack) {
            this.backpack = backpack;
        }
        if(magicBag) {
            this.magicBag = magicBag;
        }
    }
}

class SheetDataEquipmentsItemDTO {
    active;
    name;
    description;
    worth;
    amount;
    weight;

    /**
     * @param {Boolean} active 
     * @param {String} name 
     * @param {String} description 
     * @param {Number} worth 
     * @param {Number} amount 
     * @param {Number} weight 
     */
    constructor(
        active,
        name,
        description,
        worth = 0,
        amount = 0,
        weight = 0
    ) {
        this.active = active;
        this.name = name;
        this.description = description;
        this.worth = worth;
        this.amount = amount;
        this.weight = weight;
    }
}

class SheetSectionEquipments extends AbstractSheetHelper{
    parent;
    sectionEquipmentsLocations;

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionEquipmentsLocations = new SheetSectionEquipmentsLocations(this);
    }

    /**
     * Returns all data of section "equipments"
     * 
     * @returns {SheetDataEquipmentsDTO}
     */
    getData() {
        return new SheetDataEquipmentsDTO(
            this.getLocationList()
        );
    }

    /**
     * Sets all data of section "equipments"
     * 
     * @param {SheetDataEquipmentsDTO} data 
     */
    setData(data) {
        this.setLocationList(data.locationList);
    }


    /**
     * @returns {SheetDataEquipmentsLocationListDTO}
     */
    getLocationList() {
        let locationList = new SheetDataEquipmentsLocationListDTO();
        let keys = Object.keys(locationList);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            locationList[key] = this.sectionEquipmentsLocations.getData(key);
        }
        return locationList;
    }

    /**
     * @param {SheetDataEquipmentsLocationListDTO} locationList 
     */
    setLocationList(locationList) {
        let keys = Object.keys(locationList);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this.sectionEquipmentsLocations.setData(key, locationList[key]);
        }
    }
}

class SheetSectionEquipmentsLocations extends AbstractSheetHelper{
    parent;
    sectionEquipmentsItem;

    static LOCATION_PLACEHOLDER = '%location%';

    FIELDNAME_TOTAL_WORTH = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-total-worth';
    FIELDNAME_TOTAL_AMOUNT = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-total-amount';
    FIELDNAME_TOTAL_WEIGHT = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-total-weight';

    FIELDNAME_INDEX = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-id[]';
    FIELDID_SUM_ROW = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-sum-row';

    ELEMENTID_CELL_ID = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-cell-id[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_NAME = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_WORTH = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-cell-worth[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_AMOUNT = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-cell-amount[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_WEIGHT = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-cell-weight[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-cell-icon[' + this.INDEX_PLACEHOLDER + ']';


    /**
     * @param {SheetSectionEquipments} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionEquipmentsItem = new SheetSectionEquipmentsItem(this);
    }

    /**
     * Sets the location into e.g. a fieldname string
     * Replaces the placeholder '%location%'
     * 
     * @param {String} string 
     * @param {String} location 
     * @returns {String}
     */
    setLocationToString(string, location) {
        return string.replaceAll(SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER, location)
    }


    /**
     * Returns all data of one location of section "equipments"
     * 
     * @param {String} location 
     * @returns {SheetDataEquipmentsLocationDTO}
     */
    getData(location) {
        return new SheetDataEquipmentsLocationDTO(
            location,
            this.getItems(location),
            this.getTotalWorth(location),
            this.getTotalAmount(location),
            this.getTotalWeight(location)
        );
    }

    /**
     * Sets all data of one location of section "equipments"
     * 
     * @param {String} location 
     * @param {SheetDataEquipmentsLocationDTO} data 
     */
    setData(location, data) {
        this.setItems(location, data.itemList);
        this.setTotalWorth(location, data.totalWorth);
        this.setTotalAmount(location, data.totalAmount);
        this.setTotalWeight(location, data.totalWeight);
    }


    /**
     * @param {String} location 
     * @returns {Array.<SheetDataEquipmentsItemDTO>}
     */
    getItems(location) {
        let itemList = []; 
        let indexes = this.getIndexes(this.setLocationToString(this.FIELDNAME_INDEX, location));
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let itemData = this.sectionEquipmentsItem.getData(location, index);
            itemList.push(itemData);
        }
        return itemList;
    }

    /**
     * Setting a list of items
     * This means all other potentially already existing records will be removed first
     * 
     * @param {String} location 
     * @param {Array.<SheetDataEquipmentsItemDTO>} itemList 
     */
    setItems(location, itemList) {
        this.removeAllItems(location);
        for (let i = 0; i < itemList.length; i++) {
            let itemData = itemList[i];
            this.addItem(location, itemData.active, itemData.name, itemData.description, itemData.worth, itemData.amount, itemData.weight);
        }
    }


    /**
     * @param {String} location 
     * @returns {Number}
     */
    getTotalWorth(location) {
        let fieldname = this.setLocationToString(this.FIELDNAME_TOTAL_WORTH, location);
        
        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} location 
     * @param {Number} value 
     */
    setTotalWorth(location, value) {
        let fieldname = this.setLocationToString(this.FIELDNAME_TOTAL_WORTH, location);
        
        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {String} location 
     * @returns {Number}
     */
    getTotalAmount(location) {
        let fieldname = this.setLocationToString(this.FIELDNAME_TOTAL_AMOUNT, location);
        
        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} location 
     * @param {Number} value 
     */
    setTotalAmount(location, value) {
        let fieldname = this.setLocationToString(this.FIELDNAME_TOTAL_AMOUNT, location);
        
        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {String} location 
     * @returns {Number}
     */
    getTotalWeight(location) {
        let fieldname = this.setLocationToString(this.FIELDNAME_TOTAL_WEIGHT, location);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} location 
     * @param {Number} value 
     */
    setTotalWeight(location, value) {
        let fieldname = this.setLocationToString(this.FIELDNAME_TOTAL_WEIGHT, location);

        this.setElementValueByName(fieldname, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllItems(location) {
        debug.log("SheetSectionEquipmentsLocations.removeAllItems");

        let indexes = this.getIndexes(this.setLocationToString(this.FIELDNAME_INDEX, location));
        for (let i = 0; i < indexes.length; i++) {
            this.removeItem(location, indexes[i]);
        }
    }

    /**
     * @param {Number} itemIndex 
     */
    removeItem(location, itemIndex) {
        debug.log("SheetSectionEquipmentsLocations.removeItem");

        let elementIds = [
            this.setIndexToString(this.setLocationToString(this.ELEMENTID_CELL_ID, location), itemIndex),
            this.setIndexToString(this.setLocationToString(this.ELEMENTID_CELL_NAME, location), itemIndex),
            this.setIndexToString(this.setLocationToString(this.ELEMENTID_CELL_WORTH, location), itemIndex),
            this.setIndexToString(this.setLocationToString(this.ELEMENTID_CELL_AMOUNT, location), itemIndex),
            this.setIndexToString(this.setLocationToString(this.ELEMENTID_CELL_WEIGHT, location), itemIndex),
            this.setIndexToString(this.setLocationToString(this.ELEMENTID_CELL_ICON, location), itemIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }

        this.sumWorth(location);
        this.sumAmount(location);
        this.sumWeight(location);
    }
    
    /**
     * @param {String} location 
     * @param {Boolean} active 
     * @param {String} name 
     * @param {String} description 
     * @param {Number} worth 
     * @param {Number} amount 
     * @param {Number} weight 
     */
    addItem(location, active = this.STATE_INACTIVE, name = '', description = '', worth=0, amount=0, weight=0) {
        debug.log("SheetSectionEquipmentsLocations.addItem");

        let equipmentIndex = this.determineNextIndex(this.setLocationToString(this.FIELDNAME_INDEX, location));

        let stateClass = this.getStateCssClassByState(active);
        
        let newEquipmentHtmlString = ' \
        <div id="character-equipments-' + location + '-cell-id[' + equipmentIndex + ']" class="grid-item-label" style="grid-column-end: span 1;"> \
            <div class="character-equipments-state"  onclick="sheetManager.sectionEquipments.sectionEquipmentsLocations.sectionEquipmentsItem.toggleState(\'' + location + '\', ' + equipmentIndex + ');"> \
                <div class="' + stateClass + '"> \
                    <input name="character-equipments-' + location + '-active[' + equipmentIndex + ']" type="hidden" value="' + active + '"> \
                </div> \
            </div> \
            <input name="character-equipments-' + location + '-id[]" type="hidden" value="' + equipmentIndex + '"> \
        </div> \
        <div id="character-equipments-' + location + '-cell-name[' + equipmentIndex + ']" class="grid-item-data" style="grid-column-end: span 2;"> \
            <div class="expand"> \
                <input name="character-equipments-' + location + '-name[' + equipmentIndex + ']" class="field-data equipments" type="text" value="' + name + '"></input> \
                <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                <div id="character-equipments-' + location + '-expand[' + equipmentIndex + ']" class="expand-content left" style="max-height: 11em; width: 19em; margin-left: -0.2em; padding-bottom: 0.4em;"> \
                    <textarea name="character-equipments-' + location + '-description[' + equipmentIndex + ']" style="height: 10em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + description + '</textarea> \
                </div> \
            </div> \
        </div> \
        <div id="character-equipments-' + location + '-cell-worth[' + equipmentIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-equipments-' + location + '-worth[' + equipmentIndex + ']" class="field-data-worth" type="number" step="0.1" value="' + worth + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionEquipments.sectionEquipmentsLocations.sumWorth(\'' + location + '\');"></input> \
        </div> \
        <div id="character-equipments-' + location + '-cell-amount[' + equipmentIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-equipments-' + location + '-amount[' + equipmentIndex + ']" class="field-data-amount" type="number" value="' + amount + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionEquipments.sectionEquipmentsLocations.sumAmount(\'' + location + '\');"></input> \
        </div> \
        <div id="character-equipments-' + location + '-cell-weight[' + equipmentIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-equipments-' + location + '-weight[' + equipmentIndex + ']" class="field-data-short" type="number" step="0.1" value="' + weight + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionEquipments.sectionEquipmentsLocations.sumWeight(\'' + location + '\');"></input> \
        </div> \
        <div id="character-equipments-' + location + '-cell-icon[' + equipmentIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <div id="character-equipments-' + location + '-icon[' + equipmentIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionEquipments.sectionEquipmentsLocations.removeItem(\'' + location + '\', ' + equipmentIndex + ');">-</div> \
        </div> \
        ';
        let newEquipmentHtmlDocument = new DOMParser().parseFromString(newEquipmentHtmlString, "text/html");
        let newEquipmentHtmlCollection = newEquipmentHtmlDocument.body.children;
        let fieldname = this.setLocationToString(this.FIELDID_SUM_ROW, location);
        let characterEquipmentSumRow = document.getElementById(fieldname);
        characterEquipmentSumRow.before(...newEquipmentHtmlCollection);

        if(description.trim() != '') {
            let fieldname = this.setLocationToString(this.sectionEquipmentsItem.FIELDNAME_DESCRIPTION, location);
            fieldname = this.setIndexToString(fieldname, equipmentIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }

        this.sumWorth(location);
        this.sumAmount(location);
        this.sumWeight(location);
    }

    /**
     * @param {String} location 
     */
    sumWorth(location) {
        debug.log("SheetSectionEquipmentsLocations.sumWorth");

        let worthSum = 0;
        let fieldname = this.setLocationToString(this.FIELDNAME_INDEX, location);
        let indexes = this.getIndexes(fieldname);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionEquipmentsItem.getActive(location, index) == this.STATE_INACTIVE) {
                continue;
            }
            let worth = this.sectionEquipmentsItem.getWorth(location, index);
            worthSum += worth;
        }
        worthSum = Math.floor(worthSum * 10) / 10;
        this.setTotalWorth(location, worthSum);
    }

    /**
     * @param {String} location 
     */
    sumAmount(location) {
        debug.log("SheetSectionEquipmentsLocations.sumAmount");

        let amountSum = 0;
        let fieldname = this.setLocationToString(this.FIELDNAME_INDEX, location);
        let indexes = this.getIndexes(fieldname);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionEquipmentsItem.getActive(location, index) == this.STATE_INACTIVE) {
                continue;
            }
            let amount = this.sectionEquipmentsItem.getAmount(location, index);
            amountSum += amount;
        }
        this.setTotalAmount(location, amountSum);
    }
    
    /**
     * @param {String} location 
     */
    sumWeight(location) {
        debug.log("SheetSectionEquipmentsLocations.sumWeight");

        let weightSum = 0;
        let fieldname = this.setLocationToString(this.FIELDNAME_INDEX, location);
        let indexes = this.getIndexes(fieldname);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionEquipmentsItem.getActive(location, index) == this.STATE_INACTIVE) {
                continue;
            }
            let weight = this.sectionEquipmentsItem.getWeight(location, index);
            weightSum += weight;
        }
        weightSum = Math.floor(weightSum * 10) / 10;
        this.setTotalWeight(location, weightSum);

        switch(location) {
            case SheetDataEquipmentsLocationListDTO.LOCATION_BODY:
                this.parent.parent.sectionCarrying.setWeight(SheetDataCarryingWeightsDTO.BODY, weightSum);
                break;
            case SheetDataEquipmentsLocationListDTO.LOCATION_BELT:
                this.parent.parent.sectionCarrying.setWeight(SheetDataCarryingWeightsDTO.BELT, weightSum);
                break;
            case SheetDataEquipmentsLocationListDTO.LOCATION_BACKPACK:
                this.parent.parent.sectionCarrying.setWeight(SheetDataCarryingWeightsDTO.BACKPACK, weightSum);
                break;
            case SheetDataEquipmentsLocationListDTO.LOCATION_MAGIC_BAG:
                this.parent.parent.sectionCarrying.setWeight(SheetDataCarryingWeightsDTO.MAGICBAG, weightSum);
                break;
        }
    }
}


class SheetSectionEquipmentsItem extends AbstractSheetHelper {
    parent;

    FIELDNAME_ACTIVE = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-active[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_NAME = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DESCRIPTION = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-description[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_WORTH = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-worth[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_AMOUNT = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-amount[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_WEIGHT = 'character-equipments-' + SheetSectionEquipmentsLocations.LOCATION_PLACEHOLDER + '-weight[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionEquipmentsLocations} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one item of one location of section "equipments"
     * 
     * @param {String} location 
     * @param {Number} index 
     * @returns {SheetDataEquipmentsItemDTO}
     */
    getData(location, index) {
        return new SheetDataEquipmentsItemDTO(
            this.getActive(location, index),
            this.getName(location, index),
            this.getDescription(location, index),
            this.getWorth(location, index),
            this.getAmount(location, index),
            this.getWeight(location, index)
        );
    }

    /**
     * Sets all data of one item of one location of section "equipments"
     * 
     * @param {String} location 
     * @param {Number} index 
     * @param {SheetDataEquipmentsItemDTO} data 
     */
    setData(location, index, data) {
        this.setActive(location, index, data.active);
        this.setName(location, index, data.name);
        this.setDescription(location, index, data.description);
        this.setWorth(location, index, data.worth);
        this.setAmount(location, index, data.amount);
        this.setWeight(location, index, data.weight);
    }


    /**
     * @param {String} location 
     * @param {Number} index 
     * @returns {Boolean}
     */
    getActive(location, index) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_ACTIVE, location);
        fieldname = this.setIndexToString(fieldname, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {String} location 
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setActive(location, index, value) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_ACTIVE, location);
        fieldname = this.setIndexToString(fieldname, index);

        this.setElementValueByName(fieldname, value);

        let stateElement = this.getElementByName(fieldname);
        let stateIcon = stateElement.parentElement;
        stateIcon.className = this.getStateCssClassByState(value);
    }


    /**
     * @param {String} location 
     * @param {Number} index 
     * @returns {String}
     */
    getName(location, index) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_NAME, location);
        fieldname = this.setIndexToString(fieldname, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {String} location 
     * @param {Number} index 
     * @param {String} value 
     */
    setName(location, index, value) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_NAME, location);
        fieldname = this.setIndexToString(fieldname, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {String} location 
     * @param {Number} index 
     * @returns {String}
     */
    getDescription(location, index) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_DESCRIPTION, location);
        fieldname = this.setIndexToString(fieldname, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {String} location 
     * @param {Number} index 
     * @param {String} value 
     */
    setDescription(location, index, value) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_DESCRIPTION, location);
        fieldname = this.setIndexToString(fieldname, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {String} location 
     * @param {Number} index 
     * @returns {Number}
     */
    getWorth(location, index) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_WORTH, location);
        fieldname = this.setIndexToString(fieldname, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} location 
     * @param {Number} index 
     * @param {Number} value 
     */
    setWorth(location, index, value) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_WORTH, location);
        fieldname = this.setIndexToString(fieldname, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {String} location 
     * @param {Number} index 
     * @returns {Number}
     */
    getAmount(location, index) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_AMOUNT, location);
        fieldname = this.setIndexToString(fieldname, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} location 
     * @param {Number} index 
     * @param {Number} value 
     */
    setAmount(location, index, value) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_AMOUNT, location);
        fieldname = this.setIndexToString(fieldname, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {String} location 
     * @param {Number} index 
     * @returns {Number}
     */
    getWeight(location, index) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_WEIGHT, location);
        fieldname = this.setIndexToString(fieldname, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} location 
     * @param {Number} index 
     * @param {Number} value 
     */
    setWeight(location, index, value) {
        let fieldname = this.parent.setLocationToString(this.FIELDNAME_WEIGHT, location);
        fieldname = this.setIndexToString(fieldname, index);

        this.setElementValueByName(fieldname, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {String} location 
     * @param {Number} index
     */
    toggleState(location, index) {
        debug.log("SheetSectionEquipmentsItem.toggleState");

        let currentState = this.getActive(location, index);

        if(currentState == this.STATE_ACTIVE) {
            this.setActive(location, index, this.STATE_INACTIVE);
        } else {
            this.setActive(location, index, this.STATE_ACTIVE);
        }

        this.parent.sumWorth(location);
        this.parent.sumAmount(location);
        this.parent.sumWeight(location);
    }
}