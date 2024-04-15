class SheetDataOtherModifierDTO {
    active;
    reason;
    modifier;
    removeable;
    activeReadonly;
    reasonReadonly;
    modifierReadonly;

    /**
     * @param {Boolean} active 
     * @param {String} reason 
     * @param {Number} modifier 
     * @param {Boolean} removeable 
     * @param {Boolean} activeReadonly 
     * @param {Boolean} reasonReadonly 
     * @param {Boolean} modifierReadonly 
     */
    constructor(
        active,
        reason,
        modifier,
        removeable = true,
        activeReadonly = false,
        reasonReadonly = false,
        modifierReadonly = false
    ) {
        this.active = active;
        this.reason = reason;
        this.modifier = modifier;
        this.removeable = removeable;
        this.activeReadonly = activeReadonly;
        this.reasonReadonly = reasonReadonly;
        this.modifierReadonly = modifierReadonly;
    }
}

class OtherModifiers extends AbstractSheetHelper {
    parent;
    idPrefix;
    sumSetterCallback;

    FIELDNAME_INDEX = '-id[]';
    FIELDNAME_ACTIVE = '-active[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_REASON = '-reason[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_MODIFIER = '-modifier[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ICON = '-icon[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_REMOVEABLE = '-removeable[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ACTIVE_READONLY = '-active-readonly[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_REASON_READONLY = '-reason-readonly[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_MODIFIER_READONLY = '-modifier-readonly[' + this.INDEX_PLACEHOLDER + ']';
    
    ELEMENTID_ADD_ROW = '-add-row';

    ELEMENTID_CELL_ACTIVE = '-cell-active[' + this.INDEX_PLACEHOLDER + ']'
    ELEMENTID_CELL_REASON = '-cell-reason[' + this.INDEX_PLACEHOLDER + ']'
    ELEMENTID_CELL_MODIFIER = '-cell-modifier[' + this.INDEX_PLACEHOLDER + ']'
    ELEMENTID_CELL_ICON = '-cell-icon[' + this.INDEX_PLACEHOLDER + ']'

    /**
     * @param {Object} parent 
     * @param {String} idPrefix 
     * @param {String} sumSetterCallback 
     */
    constructor(parent, idPrefix, sumSetterCallback) {
        super();
        this.parent = parent;
        this.idPrefix = idPrefix;
        this.sumSetterCallback = sumSetterCallback;
    }

    /**
     * Returns all otherModifiers
     * 
     * @returns {Array.<SheetDataOtherModifierDTO>}
     */
    getDataList() {
        let list = []; 
        let indexes = this.getIndexes(this.idPrefix + this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let data = this.getData(indexes[i])
            list.push(data);
        }
        return list;
    }

    /**
     * @param {Array.<SheetDataOtherModifierDTO>} list 
     */
    setDataList(list) {
        this.removeAllOtherModifiers();

        for (let i = 0; i < list.length; i++) {
            let data = list[i];
            this.addOtherModifier(i, data.active, data.reason, data.modifier, data.removeable, data.activeReadonly, data.reasonReadonly, data.modifierReadonly);
        }
    }

    /**
     * Returns all data of one otherModifier
     * 
     * @param {Number} index 
     * @returns {SheetDataOtherModifierDTO}
    */
    getData(index) {
        return new SheetDataOtherModifierDTO(
            this.getActive(index),
            this.getReason(index),
            this.getModifier(index),
            this.getRemoveable(index),
            this.getActiveReadonly(index),
            this.getReasonReadonly(index),
            this.getModifierReadonly(index)
        );
    }

    /**
     * Sets all data of one otherModifier
     * 
     * @param {Number} index 
     * @param {SheetDataOtherModifierDTO} data 
     */
    setData(index, data) {
        this.setActive(index, data.active);
        this.setReason(index, data.reason);
        this.setModifier(index, data.modifier);
        this.setRemoveable(index, data.removeable);
        this.setActiveReadonly(index, data.activeReadonly);
        this.setReasonReadonly(index, data.reasonReadonly);
        this.setModifierReadonly(index, data.modifierReadonly);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getActive(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_ACTIVE, index);

        return this.getElementCheckedStateByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setActive(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_ACTIVE, index);

        this.setElementCheckedStateByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getReason(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REASON, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setReason(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REASON, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getModifier(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_MODIFIER, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setModifier(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_MODIFIER, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getRemoveable(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REMOVEABLE, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setRemoveable(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REMOVEABLE, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getActiveReadonly(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_ACTIVE_READONLY, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setActiveReadonly(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_ACTIVE_READONLY, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getReasonReadonly(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REASON_READONLY, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setReasonReadonly(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_REASON_READONLY, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getModifierReadonly(index) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_MODIFIER_READONLY, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setModifierReadonly(index, value) {
        let fieldname = this.setIndexToString(this.idPrefix + this.FIELDNAME_MODIFIER_READONLY, index);

        this.setElementValueByName(fieldname, value);
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllOtherModifiers() {
        let indexes = this.getIndexes(this.idPrefix + this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeOtherModifier(indexes[i]);
        }
    }

    /**
     * @param {Number} index
     */
    removeOtherModifier(index) {
        let elementIds = [
            this.setIndexToString(this.idPrefix + this.ELEMENTID_CELL_ACTIVE, index),
            this.setIndexToString(this.idPrefix + this.ELEMENTID_CELL_REASON, index),
            this.setIndexToString(this.idPrefix + this.ELEMENTID_CELL_MODIFIER, index),
            this.setIndexToString(this.idPrefix + this.ELEMENTID_CELL_ICON, index)
        ];
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }

        this.sumOtherModifiers();
    }

    /**
     * @param {Number} index 
     * @param {Boolean} active 
     * @param {String} reason 
     * @param {Number} modifier 
     * @param {Boolean} removeable 
     * @param {Boolean} reasonReadonly 
     * @param {Boolean} modifierReadonly 
     */
    addOtherModifier(index=null, active=true, reason='', modifier=0, removeable = true, activeReadonly = false, reasonReadonly = false, modifierReadonly = false) {
        if(index == null) {
            index = this.determineNextIndex(this.idPrefix + this.FIELDNAME_INDEX);
        }

        let newOtherModifierHtmlString = ' \
            <div id="' + this.idPrefix + '-cell-active[' + index + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="' + this.idPrefix + '-active[' + index + ']" type="checkbox" value="true" ' + (active ? 'checked' : '') + ' ' + (activeReadonly ? 'disabled' : '') + '></input> \
                <input name="' + this.idPrefix + '-active-readonly[' + index + ']" type="hidden" value="' + activeReadonly + '"> \
            </div> \
            <div id="' + this.idPrefix + '-cell-reason[' + index + ']" class="' + (!reasonReadonly ? 'grid-item-data' : 'grid-item-label' ) + '" style="grid-column-end: span 1;"> \
                <input name="' + this.idPrefix + '-id[]" type="hidden" value="' + index + '"> \
                <input name="' + this.idPrefix + '-reason-readonly[' + index + ']" type="hidden" value="' + reasonReadonly + '"> \
                ' + (
                    !reasonReadonly 
                    ? '<input name="' + this.idPrefix + '-reason[' + index + ']" class="field-data-larger" type="text" value="' + reason + '" ' + (reasonReadonly ? 'readonly' : '') + '></input>'
                    : '<input name="' + this.idPrefix + '-reason[' + index + ']" type="hidden" value="' + reason + '"></input><label>' + reason + '</label>'
                ) + ' \
            </div> \
            <div id="' + this.idPrefix + '-cell-modifier[' + index + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="' + this.idPrefix + '-modifier-readonly[' + index + ']" type="hidden" value="' + modifierReadonly + '"> \
                <input name="' + this.idPrefix + '-modifier[' + index + ']" class="field-data-short" type="number" value="' + modifier + '" ' + (modifierReadonly ? 'readonly' : '') + '></input> \
            </div> \
            <div id="' + this.idPrefix + '-cell-icon[' + index + ']" class="grid-item" style="grid-column-end: span 1;"> \
                <input name="' + this.idPrefix + '-removeable[' + index + ']" type="hidden" value="' + removeable + '"> \
                ' + (removeable ? '<div id="' + this.idPrefix + '-icon[' + index + ']" class="addRemoveIcon">-</div>' : '') + ' \
            </div> \
        ';
        let newOtherModifierHtmlDocument = new DOMParser().parseFromString(newOtherModifierHtmlString, "text/html");
        let newOtherModifierHtmlCollection = newOtherModifierHtmlDocument.body.children;
        let otherModifierAddRow = this.getElementById(this.idPrefix + this.ELEMENTID_ADD_ROW);
        otherModifierAddRow.before(...newOtherModifierHtmlCollection);

        let modifierElement = this.getElementByName(this.idPrefix + this.setIndexToString(this.FIELDNAME_MODIFIER, index));
        this.addEvent(modifierElement, new MethodCallbackDTO(this, 'sumOtherModifiers'));

        let activeElement = this.getElementByName(this.idPrefix + this.setIndexToString(this.FIELDNAME_ACTIVE, index));
        this.addEvent(activeElement, new MethodCallbackDTO(this, 'sumOtherModifiers'));
        
        if(removeable) {
            let iconElement = this.getElementById(this.idPrefix + this.setIndexToString(this.FIELDNAME_ICON, index));
            this.addEvent(iconElement, new MethodCallbackDTO(this, 'removeOtherModifier', [index]), 'click');
        }

        this.sumOtherModifiers();
    }

    sumOtherModifiers() {
        let sum = 0;
        let indexes = this.getIndexes(this.idPrefix + this.FIELDNAME_INDEX);
        for(let i = 0;i < indexes.length; i++)
        {
            let index = indexes[i];
            if (this.getActive(index)) {
                let modifier = this.getModifier(index);
                sum += modifier;
            }
        }
        
        this.parent[this.sumSetterCallback](this.idPrefix, sum);
    }

    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    indexExists(index) {
        let indexes = this.getIndexes(this.idPrefix + this.FIELDNAME_INDEX);
        for(let i = 0;i < indexes.length; i++)
        {
            if(indexes[i] == index) {
                return true;
            }
        }

        return false;
    }
}