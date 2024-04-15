class SheetDataArmorsDTO {
    total;
    base;
    activeArmor;
    activeShield;
    other;
    otherModifiers;
    touch;
    wrongFoot;
    description;
    armorList;

    /**
     * @param {Number} total 
     * @param {Number} base 
     * @param {Number} activeArmor 
     * @param {Number} activeShield 
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     * @param {Number} touch 
     * @param {Number} wrongFoot 
     * @param {String} description 
     * @param {Array.<SheetDataArmorsArmorDTO>} armorList
     */
    constructor(
        total,
        base,
        activeArmor,
        activeShield,
        other,
        otherModifiers,
        touch,
        wrongFoot,
        description,
        armorList
    ) {
        //Set default modifiers
        if(!otherModifiers || otherModifiers.length == 0) {
            let sheetDataArmorsOtherModifier_Dexterity = new SheetDataOtherModifierDTO(true, 'Geschicklichkeit', 0, false, true, true, true);
            let sheetDataArmorsOtherModifier_Size = new SheetDataOtherModifierDTO(true, 'Größe', 0, false, true, true, true);
            let sheetDataArmorsOtherModifier_Natural = new SheetDataOtherModifierDTO(true, 'Natürlich', 0, false, true, true);
            let sheetDataArmorsOtherModifier_Dodge = new SheetDataOtherModifierDTO(true, 'Ausweichen', 0, false, true, true);
            let sheetDataArmorsOtherModifier_Deflection = new SheetDataOtherModifierDTO(true, 'Ablenkung', 0, false, true, true);
            let sheetDataArmorsOtherModifier_UnHoly = new SheetDataOtherModifierDTO(true, 'Un-/Heilig', 0, false, true, true);
            let sheetDataArmorsOtherModifier_Luck = new SheetDataOtherModifierDTO(true, 'Glück', 0, false, true, true);
            let sheetDataArmorsOtherModifier_Reinforcement = new SheetDataOtherModifierDTO(true, 'Moral', 0, false, true, true);
            
            other = 0;
            otherModifiers = [
                sheetDataArmorsOtherModifier_Dexterity,
                sheetDataArmorsOtherModifier_Size,
                sheetDataArmorsOtherModifier_Natural,
                sheetDataArmorsOtherModifier_Dodge,
                sheetDataArmorsOtherModifier_Deflection,
                sheetDataArmorsOtherModifier_UnHoly,
                sheetDataArmorsOtherModifier_Luck,
                sheetDataArmorsOtherModifier_Reinforcement
            ];
        }

        this.total = total;
        this.base = base;
        this.activeArmor = activeArmor;
        this.activeShield = activeShield;
        this.other = other;
        this.otherModifiers = otherModifiers;
        this.touch = touch;
        this.wrongFoot = wrongFoot;
        this.description = description;
        this.armorList = armorList;
    }
}

class SheetDataArmorsArmorDTO {
    type;
    active;
    name;
    style;
    description;
    armorClass;
    armorPenalty;
    maxDexterity;
    arcaneSpellFailureChance;

    /**
     * @param {String} type 
     * @param {Boolean} active 
     * @param {String} name 
     * @param {SheetSectionArmorsArmorStyleDTO|String} style 
     * @param {String} description 
     * @param {Number} armorClass 
     * @param {Number} armorPenalty 
     * @param {Number} maxDexterity 
     * @param {Number} arcaneSpellFailureChance 
     */
    constructor(
        type,
        active,
        name,
        style,
        description,
        armorClass,
        armorPenalty,
        maxDexterity,
        arcaneSpellFailureChance
    ) {
        this.type = type;
        this.active = active;
        this.name = name;
        this.style = style;
        this.description = description;
        this.armorClass = armorClass;
        this.armorPenalty = armorPenalty;
        this.maxDexterity = maxDexterity;
        this.arcaneSpellFailureChance = arcaneSpellFailureChance;
    }
}

class SheetSectionArmorsArmorStyleDTO {
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

class SheetSectionArmors extends AbstractSheetHelper{
    parent;
    /** @type {OtherModifiers} otherModifiers */
    otherModifiers;
    sectionArmorsArmor;

    static ARMOR_TYPE_BODY = 'body';
    static ARMOR_TYPE_SHIELD = 'shield';

    ARMOR_ICON_BODY = 'assets/armor_body_a6a6a6.png';
    ARMOR_ICON_SHIELD = 'assets/armor_shield_a6a6a6.png';

    FIELDNAME_TOTAL = 'character-armor-total';
    FIELDNAME_BASE = 'character-armor-base';
    FIELDNAME_ACTIVE_ARMOR = 'character-armor-active-armor';
    FIELDNAME_ACTIVE_SHIELD = 'character-armor-active-shield';
    FIELDNAME_OTHER = 'character-armor-other';
    FIELDNAME_TOUCH = 'character-armor-touch';
    FIELDNAME_WRONG_FOOT = 'character-armor-wrong-foot';
    FIELDNAME_DESCRIPTION = 'character-armor-description';

    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;
    static OTHER_MODIFIER_INDEX_DEXTERITY = 0;
    static OTHER_MODIFIER_INDEX_SIZE = 1;
    static OTHER_MODIFIER_INDEX_NATURAL = 2;
    static OTHER_MODIFIER_INDEX_DODGE = 3;
    static OTHER_MODIFIER_INDEX_DEFLECTION = 4;
    static OTHER_MODIFIER_INDEX_UNHOLY = 5;
    static OTHER_MODIFIER_INDEX_LUCK = 6;
    static OTHER_MODIFIER_INDEX_MORAL = 7;

    FIELDNAME_OTHER_INDEX = 'character-armor-other-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-armor-other-add-row';

    static FIELDNAME_INDEX = 'character-armor-id[]';
    FIELDID_ADD_ROW = 'character-armor-add';

    ELEMENTID_ARMOR_SECTION = 'character-armor[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.otherModifiers = new OtherModifiers(this, this.OTHER_MODIFIER_ID_PREFIX, 'setOtherModifierByFieldName');
        this.sectionArmorsArmor = new SheetSectionArmorsArmor(this);
    }

    /**
     * Returns all data of section "armors"
     * 
     * @returns {SheetDataArmorsDTO}
     */
    getData() {
        return new SheetDataArmorsDTO(
            this.getTotal(),
            this.getBase(),
            this.getActiveArmor(),
            this.getActiveShield(),
            this.getOther(),
            this.otherModifiers.getDataList(),
            this.getTouch(),
            this.getWrongFoot(),
            this.getDescription(),
            this.getArmors()
        );
    }

    /**
     * Sets all data of section "armors"
     * 
     * @param {SheetDataArmorsDTO} data 
     */
    setData(data) {
        this.setTotal(data.total);
        this.setBase(data.base);
        this.setActiveArmor(data.activeArmor);
        this.setActiveShield(data.activeShield);
        this.setOther(data.other);
        this.otherModifiers.setDataList(data.otherModifiers);
        this.setTouch(data.touch);
        this.setWrongFoot(data.wrongFoot);
        this.setDescription(data.description);
        this.setArmors(data.armorList);
    }


    /**
     * @returns {Number}
     */
    getTotal() {
        return this.getElementValueByName(this.FIELDNAME_TOTAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTotal(value) {
        this.setElementValueByName(this.FIELDNAME_TOTAL, value);
    }


    /**
     * @returns {Number}
     */
    getBase() {
        return this.getElementValueByName(this.FIELDNAME_BASE, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setBase(value) {
        this.setElementValueByName(this.FIELDNAME_BASE, value);
    }


    /**
     * @returns {Number}
     */
    getActiveArmor() {
        return this.getElementValueByName(this.FIELDNAME_ACTIVE_ARMOR, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setActiveArmor(value) {
        this.setElementValueByName(this.FIELDNAME_ACTIVE_ARMOR, value);
    }


    /**
     * @returns {Number}
     */
    getActiveShield() {
        return this.getElementValueByName(this.FIELDNAME_ACTIVE_SHIELD, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setActiveShield(value) {
        this.setElementValueByName(this.FIELDNAME_ACTIVE_SHIELD, value);
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
    getTouch() {
        return this.getElementValueByName(this.FIELDNAME_TOUCH, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setTouch(value) {
        this.setElementValueByName(this.FIELDNAME_TOUCH, value);
    }


    /**
     * @returns {Number}
     */
    getWrongFoot() {
        return this.getElementValueByName(this.FIELDNAME_WRONG_FOOT, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setWrongFoot(value) {
        this.setElementValueByName(this.FIELDNAME_WRONG_FOOT, value);
    }


    /**
     * @returns {Number}
     */
    getDescription() {
        return this.getElementValueByName(this.FIELDNAME_DESCRIPTION);
    }

    /**
     * @param {Number} value 
     */
    setDescription(value) {
        this.setElementValueByName(this.FIELDNAME_DESCRIPTION, value);
    }


    /**
     * @returns {Array.<SheetDataArmorsArmorDTO>}
     */
    getArmors() {
        let armorList = []; 
        let indexes = this.getIndexes(SheetSectionArmors.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let armorData = this.sectionArmorsArmor.getData(index);
            armorList.push(armorData);
        }
        return armorList;
    }

    /**
     * Setting a list of armors
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataArmorsArmorDTO>} armorList 
     */
    setArmors(armorList) {
        this.removeAllArmors();

        for (let i = 0; i < armorList.length; i++) {
            let armorData = armorList[i];
            this.addArmor(
                armorData.type,
                armorData.active,
                armorData.name,
                armorData.style,
                armorData.description,
                armorData.armorClass,
                armorData.armorPenalty,
                armorData.maxDexterity,
                armorData.arcaneSpellFailureChance
            );
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {String} armorType 
     * @returns {String}
     */
    determinArmorIconByArmorType(armorType) {
        debug.log("SheetSectionArmors.determinArmorIconByArmorType");

        let armorIcon = '';
        switch(armorType) {
            case SheetSectionArmors.ARMOR_TYPE_BODY:
                armorIcon = this.ARMOR_ICON_BODY;
            break;
            case SheetSectionArmors.ARMOR_TYPE_SHIELD:
                armorIcon = this.ARMOR_ICON_SHIELD;
            break;
        }

        return armorIcon;
    }

    removeAllArmors() {
        debug.log("SheetSectionArmors.removeAllArmors");

        let indexes = this.getIndexes(SheetSectionArmors.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeArmor(indexes[i]);
        }
    }

    /**
     * @param {Number} armorIndex 
     */
    removeArmor(armorIndex) {
        debug.log("SheetSectionArmors.removeArmor");

        this.sectionArmorsArmor.deactivateArmor(armorIndex);
        let elementId = this.setIndexToString(this.ELEMENTID_ARMOR_SECTION, armorIndex);
        this.removeElementById(elementId);
    }

    /**
     * @param {String} type 
     * @param {Boolean} active 
     * @param {String} name 
     * @param {SheetSectionArmorsArmorStyleDTO|String} style 
     * @param {String} description 
     * @param {Number} armorClass 
     * @param {Number} armorPenalty 
     * @param {Number} maxDexterity 
     * @param {Number} arcaneSpellFailureChance 
     */
    addArmor(type, active = this.STATE_INACTIVE, name = '', style = null, description = '', armorClass = 0, armorPenalty = 0, maxDexterity = 0, arcaneSpellFailureChance = 0) {
        debug.log("SheetSectionArmors.addArmor");

        let armorIndex = this.determineNextIndex(SheetSectionArmors.FIELDNAME_INDEX);

        let stateClass = this.getStateCssClassByState(active);

        let armorIcon = this.determinArmorIconByArmorType(type);

        let newArmorHtmlString = '';
        switch(type) {
            case SheetSectionArmors.ARMOR_TYPE_BODY:
                if(style == null) {
                    style = new SheetSectionArmorsArmorStyleDTO(0, '-');
                }
                newArmorHtmlString = ' \
                <div id="character-armor[' + armorIndex + ']" class="sub-section"> \
                    <div class="sub-section-header" onclick="SectionHelper.toggleSection(this.parentElement, true);"> \
                        <div class="character-armor-state" onclick="sheetManager.sectionArmors.sectionArmorsArmor.toggleState(' + armorIndex + '); event.stopPropagation();"> \
                            <div class="' + stateClass + '"> \
                                <input name="character-armor-active[' + armorIndex + ']" type="hidden" value="' + active + '"> \
                            </div> \
                        </div> \
                        <span class="sub-section-header-icon"> \
                            <img id="character-armor-icon[' + armorIndex + ']" src="' + armorIcon + '" class="armorIcon" /> \
                            <input name="character-armor-type[' + armorIndex + ']" type="hidden" value="' + SheetSectionArmors.ARMOR_TYPE_BODY + '"> \
                        </span> \
                        <span id="character-armor-title[' + armorIndex + ']" class="sub-section-title">' + name + '</span> \
                        <div class="section-open" style="display: none;">▼</div> \
                        <div class="section-close" style="display: block;">▲</div> \
                    </div> \
                    <div class="sub-section-body" style="display: block;"> \
                        <input name="character-armor-id[]" type="hidden" value="' + armorIndex + '"> \
                        <div class="section-grid-container"> \
                            <div class="grid-item-label" style="grid-column-end: span 2;"> \
                                <label>Name</label> \
                            </div> \
                            <div class="grid-item-data" style="grid-column-end: span 3;"> \
                                <input name="character-armor-name[' + armorIndex + ']" type="text" value="' + name + '" oninput="sheetManager.sectionArmors.sectionArmorsArmor.setTitle(' + armorIndex + ', this.value)"></input> \
                            </div> \
                            <div class="grid-item-header-label" style="grid-column-end: span 5;"> \
                                <label>Besondere Eigenschaften</label> \
                            </div> \
                            \
                            <div class="grid-item-label" style="grid-column-end: span 2;"> \
                                <label>Art</label> \
                            </div> \
                            <div id="character-armor-cell-style[' + armorIndex + ']" class="grid-item-data" style="grid-column-end: span 3;"> \
                                <div id="character-armor-style-dropdown[' + armorIndex + ']" class="dropdown"> \
                                    <input name="character-armor-style[' + armorIndex + ']" class="dropdown-select" data-id="' + style.id + '" value="' + style.name + '" readonly onclick="Dropdown.toggleDropdown(this);" onchange="Dropdown.markSelectedOption(this.name, this); sheetManager.updateMovement();"></input> \
                                    <div class="dropdown-open" style="display: block;" onclick="Dropdown.toggleDropdown(this);">▼</div> \
                                    <div class="dropdown-close" style="display: none;" onclick="Dropdown.toggleDropdown(this);">▲</div> \
                                    <div id="character-armor-style[' + armorIndex + ']-options" class="dropdown-content"></div> \
                                </div> \
                            </div> \
                            <div class="grid-item" style="grid-area: 2 / 6 / span 7 / span 5;"> \
                                <textarea name="character-armor-description[' + armorIndex + ']" style="height: 12em; width: 15.2em;">' + description + '</textarea> \
                            </div> \
                            \
                            <div class="grid-item-label" style="grid-column-end: span 3;"> \
                                <label>Rüstungsklasse</label> \
                            </div> \
                            <div class="grid-item-data align-left" style="grid-column-end: span 2;"> \
                                <input name="character-armor-class[' + armorIndex + ']" class="field-data-short" type="number" value="' + armorClass + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionArmors.setArmorClassByBody(' + armorIndex + ');"></input> \
                            </div> \
                            \
                            <div class="grid-item-label" style="grid-column-end: span 3;"> \
                                <label>Rüstungsmalus</label> \
                            </div> \
                            <div class="grid-item-data align-left" style="grid-column-end: span 2;"> \
                                <input name="character-armor-penalty[' + armorIndex + ']" class="field-data-short" type="number" value="' + armorPenalty + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionArmors.setCheckPenaltyByArmor(' + armorIndex + ');"></input> \
                            </div> \
                            \
                            <div class="grid-item-label" style="grid-column-end: span 3;"> \
                                <label>Max. Geschicklichkeit</label> \
                            </div> \
                            <div class="grid-item-data align-left" style="grid-column-end: span 2;"> \
                                <input name="character-armor-max-dexterity[' + armorIndex + ']" class="field-data-short" type="number" value="' + maxDexterity + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionArmors.setMaxDexterityByArmor(' + armorIndex + ');"></input> \
                            </div> \
                            \
                            <div class="grid-item-label" style="grid-column-end: span 3;"> \
                                <label>Arkaner Zauberpatzer</label> \
                            </div> \
                            <div class="grid-item-data align-left" style="grid-column-end: span 2;"> \
                                <input name="character-armor-arkane-blooper[' + armorIndex + ']" class="field-data-short" type="number" value="' + arcaneSpellFailureChance + '" onchange="SheetManager.preventNegativeValue(this);"></input> \
                                <span class="field-data-text standard-font">&nbsp;%&nbsp;</span> \
                            </div> \
                            \
                            <div class="grid-item" style="grid-column-end: span 5;"> \
                                <div class="icon-center"> \
                                    <i class="icon-trash" onclick="sheetManager.sectionArmors.removeArmor(' + armorIndex + ');"></i> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
                ';
            break;
            case SheetSectionArmors.ARMOR_TYPE_SHIELD:
                if(style == null) {
                    style = '';
                }
                newArmorHtmlString = ' \
                <div id="character-armor[' + armorIndex + ']" class="sub-section"> \
                    <div class="sub-section-header" onclick="SectionHelper.toggleSection(this.parentElement, true);"> \
                        <div class="character-armor-state" onclick="sheetManager.sectionArmors.sectionArmorsArmor.toggleState(' + armorIndex + '); event.stopPropagation();"> \
                            <div class="' + stateClass + '"> \
                                <input name="character-armor-active[' + armorIndex + ']" type="hidden" value="' + active + '"> \
                            </div> \
                        </div> \
                        <span class="sub-section-header-icon"> \
                            <img id="character-armor-icon[' + armorIndex + ']" src="' + armorIcon + '" class="armorIcon" /> \
                            <input name="character-armor-type[' + armorIndex + ']" type="hidden" value="' + SheetSectionArmors.ARMOR_TYPE_SHIELD + '"> \
                        </span> \
                        <span id="character-armor-title[' + armorIndex + ']" class="sub-section-title">' + name + '</span> \
                        <div class="section-open" style="display: none;">▼</div> \
                        <div class="section-close" style="display: block;">▲</div> \
                    </div> \
                    <div class="sub-section-body" style="display: block;"> \
                        <input name="character-armor-id[]" type="hidden" value="' + armorIndex + '"> \
                        <div class="section-grid-container"> \
                            <div class="grid-item-label" style="grid-column-end: span 2;"> \
                                <label>Name</label> \
                            </div> \
                            <div class="grid-item-data" style="grid-column-end: span 3;"> \
                                <input name="character-armor-name[' + armorIndex + ']" type="text" value="' + name + '" oninput="sheetManager.sectionArmors.sectionArmorsArmor.setTitle(' + armorIndex + ', this.value)"></input> \
                            </div> \
                            <div class="grid-item-header-label" style="grid-column-end: span 5;"> \
                                <label>Besondere Eigenschaften</label> \
                            </div> \
                            \
                            <div class="grid-item-label" style="grid-column-end: span 2;"> \
                                <label>Art</label> \
                            </div> \
                            <div class="grid-item-data" style="grid-column-end: span 3;"> \
                                <input name="character-armor-style[' + armorIndex + ']" type="text" value="' + style + '"></input> \
                            </div> \
                            <div class="grid-item" style="grid-area: 2 / 6 / span 7 / span 5;"> \
                                <textarea name="character-armor-description[' + armorIndex + ']" style="height: 12em; width: 15.2em;">' + description + '</textarea> \
                            </div> \
                            \
                            <div class="grid-item-label" style="grid-column-end: span 3;"> \
                                <label>Rüstungsklasse</label> \
                            </div> \
                            <div class="grid-item-data align-left" style="grid-column-end: span 2;"> \
                                <input name="character-armor-class[' + armorIndex + ']" class="field-data-short" type="number" value="' + armorClass + '" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionArmors.setArmorClassByShield(' + armorIndex + ');"></input> \
                            </div> \
                            \
                            <div class="grid-item" style="grid-column-end: span 5;"> \
                                <div class="icon-center"> \
                                    <i class="icon-trash" onclick="sheetManager.sectionArmors.removeArmor(' + armorIndex + ');"></i> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
                ';
            break;
        }

        let newArmorHtmlDocument = new DOMParser().parseFromString(newArmorHtmlString, "text/html");
        let newArmorHtmlCollection = newArmorHtmlDocument.body.children;
        let characterArmorAdd = document.getElementById(this.FIELDID_ADD_ROW);
        characterArmorAdd.before(...newArmorHtmlCollection);

        if(type == SheetSectionArmors.ARMOR_TYPE_BODY) {
            this.createStyleDropdown(armorIndex);
        }
    }

    /**
     * @param {Number} index 
     */
    createStyleDropdown(index) {
        debug.log("SheetSectionArmors.createStyleDropdown");

        let armorStyles = CharacterDataTables.getArmorTypes(true);
        let options = [];
        for(let i = 0;i < armorStyles.length; i++) {
            options.push({'key':armorStyles[i].id, 'value':armorStyles[i].name});
        }

        this.createDropdown(this.setIndexToString(this.sectionArmorsArmor.FIELDID_STYLE_OPTIONS, index), options);
    }

    /**
     * @param {String} searchArmorType 
     * @returns {Number|null}
     */
    findActiveArmorByType(searchArmorType) {
        debug.log("SheetSectionArmors.findActiveArmorByType");

        let indexes = this.getIndexes(SheetSectionArmors.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let armorIndex = indexes[i];
            let armorType = this.sectionArmorsArmor.getType(armorIndex);
            if(searchArmorType != armorType) {
                continue;
            }
            let armorState = this.sectionArmorsArmor.getActive(armorIndex);
            if(armorState == this.STATE_ACTIVE) {
                return armorIndex;
            }
        }

        return null;
    }
    
    /**
     * @param {Number} index 
     */
    setArmorClassByBody(index) {
        debug.log("SheetSectionArmors.setArmorClassByBody");

        if(!this.sectionArmorsArmor.getActive(index) == this.STATE_ACTIVE) {
            return;
        }
        this.setActiveArmor(this.sectionArmorsArmor.getClass(index));
    }

    resetArmorClassByBody() {
        debug.log("SheetSectionArmors.resetArmorClassByBody");

        this.setActiveArmor(0);
    }

    /**
     * @param {Number} index 
     */
    setArmorClassByShield(index) {
        debug.log("SheetSectionArmors.setArmorClassByShield");

        if(!this.sectionArmorsArmor.getActive(index) == this.STATE_ACTIVE) {
            return;
        }
        this.setActiveShield(this.sectionArmorsArmor.getClass(index));
    }

    resetArmorClassByShield() {
        debug.log("SheetSectionArmors.resetArmorClassByShield");

        this.setActiveShield(0);
    }

    /**
     * @param {Number|null} index 
     * @param {String|null} armorType 
     */
    setCheckPenaltyByArmor(index = null, armorType = null) {
        debug.log("SheetSectionArmors.setCheckPenaltyByArmor");

        if(!index) {
            index = this.findActiveArmorByType(armorType);
        }

        if(!this.sectionArmorsArmor.getActive(index) == this.STATE_ACTIVE) {
            return;
        }

        let checkPenalty = this.sectionArmorsArmor.getPenalty(index);
        if(checkPenalty < 0) {
            checkPenalty *= -1;
        }

        this.parent.checkPenaltyHelper.setCheckPenalty(CheckPenaltyHelper.SOURCE_ARMOR, checkPenalty);
    }

    resetCheckPenaltyByArmor() {
        debug.log("SheetSectionArmors.resetCheckPenaltyByArmor");

        this.parent.checkPenaltyHelper.setCheckPenalty(CheckPenaltyHelper.SOURCE_ARMOR, 0);
    }


    /**
     * @param {Number} index 
     */
    setMaxDexterityByArmor(index) {
        debug.log("SheetSectionArmors.setMaxDexterityByArmor");

        if(!this.sectionArmorsArmor.getActive(index) == this.STATE_ACTIVE) {
            return;
        }
        let maxDexterity = this.sectionArmorsArmor.getMaxDexterity(index);

        this.parent.sectionAttributes.setMaxAttributeModifier(SheetSectionAttributes.MAX_MODIFIER_REASON_ARMOR, SheetSectionAttributes.ATTRIBUTE_DEXTERITY, maxDexterity);
    }

    resetMaxDexterityByArmor() {
        debug.log("SheetSectionArmors.resetMaxDexterityByArmor");

        this.parent.sectionAttributes.setMaxAttributeModifier(SheetSectionAttributes.MAX_MODIFIER_REASON_ARMOR, SheetSectionAttributes.ATTRIBUTE_DEXTERITY, null);
    }

    sumArmor() {
        debug.log("SheetSectionArmors.sumArmor");

        let base = this.getBase();
        let activeArmor = this.getActiveArmor();
        let activeShield = this.getActiveShield();
        let other = this.getOther();
        let sum = base + activeArmor + activeShield + other;

        this.setTotal(sum);
        this.setArmorTouch(sum, activeArmor, activeShield);
        this.setArmorWrongFoot(sum);
    }

    /**
     * @param {Number} totalArmor
     * @param {Number} activeArmor
     * @param {Number} activeShield
     */
    setArmorTouch(totalArmor, activeArmor, activeShield) {
        debug.log("SheetSectionArmors.setArmorTouch");

        let sum = totalArmor - activeArmor - activeShield;
        this.setTouch(sum);
    }

    /**
     * @param {Number} totalArmor
     */
    setArmorWrongFoot(totalArmor) {
        debug.log("SheetSectionArmors.setArmorWrongFoot");

        let dexterity = this.otherModifiers.getModifier(SheetSectionArmors.OTHER_MODIFIER_INDEX_DEXTERITY);
        let dodge = this.otherModifiers.getModifier(SheetSectionArmors.OTHER_MODIFIER_INDEX_DODGE);
        let sum = totalArmor - dexterity - dodge;
        this.setWrongFoot(sum);
    }
}

class SheetSectionArmorsArmor extends AbstractSheetHelper {
    parent;

    FIELDNAME_ICON = 'character-armor-icon[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_TITLE = 'character-armor-title[' + this.INDEX_PLACEHOLDER + ']';
    
    FIELDNAME_TYPE = 'character-armor-type[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ACTIVE = 'character-armor-active[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_NAME = 'character-armor-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_STYLE = 'character-armor-style[' + this.INDEX_PLACEHOLDER + ']';
    FIELDID_STYLE_OPTIONS = 'character-armor-style[' + this.INDEX_PLACEHOLDER + ']-options';
    FIELDNAME_DESCRIPTION = 'character-armor-description[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_CLASS = 'character-armor-class[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_PENALTY = 'character-armor-penalty[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_MAX_DEXTERITY = 'character-armor-max-dexterity[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ARKANE_BLOOPER = 'character-armor-arkane-blooper[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_CHANCE_OF_FAILURE = 'character-armor-chance-of-failure[' + this.INDEX_PLACEHOLDER + ']';


    /**
     * @param {SheetSectionArmors} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one armor of section "armors"
     * 
     * @param {Number} index 
     * @returns {SheetDataArmorsArmorDTO}
     */
    getData(index) {
        return new SheetDataArmorsArmorDTO(
            this.getType(index),
            this.getActive(index),
            this.getName(index),
            (this.getType(index) == SheetSectionArmors.ARMOR_TYPE_SHIELD ? this.getStringStyle(index) : this.getStyle(index)),
            this.getDescription(index),
            this.getClass(index),
            this.getPenalty(index),
            this.getMaxDexterity(index),
            this.getArcaneSpellFailureChance(index)
        );
    }

    /**
     * Sets all data of one armor of section "armors"
     * 
     * @param {Number} index 
     * @param {SheetDataArmorsArmorDTO} data 
     */
    setData(index, data) {
        this.setType(index, data.type);
        this.setActive(index, data.active);
        this.setName(index, data.name);
        
        if(data.type == SheetSectionArmors.ARMOR_TYPE_SHIELD) {
            this.setStringStyle(index, data.style)
        } else {
            this.setStyle(index, data.style.id, data.style.name);
        }
        this.setDescription(index, data.description);
        this.setClass(index, data.armorClass);
        this.setPenalty(index, data.armorPenalty);
        this.setMaxDexterity(index, data.maxDexterity);
        this.setArcaneSpellFailureChance(index, data.arcaneSpellFailureChance);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getType(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_TYPE, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setType(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_TYPE, index);

        this.setElementValueByName(fieldname, value);

        this.setIconByArmorType(index, value);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getActive(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ACTIVE, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_BOOLEAN);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setActive(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ACTIVE, index);

        this.setElementValueByName(fieldname, value);

        let stateElement = this.getElementByName(fieldname);
        let stateIcon = stateElement.parentElement;
        stateIcon.className = this.getStateCssClassByState(value);
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
     * @returns {String}
     */
    getStringStyle(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_STYLE, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setStringStyle(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_STYLE, index);

        this.setElementValueByName(fieldname, value);
    }

    
    /**
     * @param {Number} index 
     * @returns {SheetSectionArmorsArmorStyleDTO}
     */
    getStyle(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_STYLE, index);
        let styleElement = this.getElementByName(fieldname);

        return new SheetSectionArmorsArmorStyleDTO(Number(styleElement.dataset.id), styleElement.value);
    }

    /**
     * If value isn't provided, it'll be determined by id
     * 
     * @param {Number} index 
     * @param {Number} id 
     * @param {String|null} value 
     */
    setStyle(index, id, value = null) {
        let fieldname = this.setIndexToString(this.FIELDNAME_STYLE, index);
        if(!value) {
            let styleObj = CharacterDataTables.getArmorTypeById(id);
            value = styleObj.name;
        }

        this.setElementValueByName(fieldname, value, id);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getDescription(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DESCRIPTION, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setDescription(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DESCRIPTION, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getClass(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setClass(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CLASS, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getPenalty(index) {
        if(this.getType(index) == SheetSectionArmors.ARMOR_TYPE_BODY) {
            let fieldname = this.setIndexToString(this.FIELDNAME_PENALTY, index);

            return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
        }

        return null;
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setPenalty(index, value) {
        if(this.getType(index) == SheetSectionArmors.ARMOR_TYPE_BODY) {
            let fieldname = this.setIndexToString(this.FIELDNAME_PENALTY, index);

            this.setElementValueByName(fieldname, value);
        }
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getMaxDexterity(index) {
        if(this.getType(index) == SheetSectionArmors.ARMOR_TYPE_BODY) {
            let fieldname = this.setIndexToString(this.FIELDNAME_MAX_DEXTERITY, index);

            return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
        }

        return null;
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setMaxDexterity(index, value) {
        if(this.getType(index) == SheetSectionArmors.ARMOR_TYPE_BODY) {
            let fieldname = this.setIndexToString(this.FIELDNAME_MAX_DEXTERITY, index);

            this.setElementValueByName(fieldname, value);
        }
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getArcaneSpellFailureChance(index) {
        if(this.getType(index) == SheetSectionArmors.ARMOR_TYPE_BODY) {
            let fieldname = this.setIndexToString(this.FIELDNAME_ARKANE_BLOOPER, index);

            return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
        }

        return null;
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setArcaneSpellFailureChance(index, value) {
        if(this.getType(index) == SheetSectionArmors.ARMOR_TYPE_BODY) {
            let fieldname = this.setIndexToString(this.FIELDNAME_ARKANE_BLOOPER, index);

            this.setElementValueByName(fieldname, value);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {Number} index 
     * @param {String} armorType 
     */
    setIconByArmorType(index, armorType) {
        let armorIcon = this.determinArmorIconByArmorType(armorType);

        let fieldname = this.setIndexToString(this.FIELDNAME_ICON, index);
        let element = this.getElementById(fieldname);
        element.src = armorIcon;
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setTitle(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_TITLE, index);
        let element = this.getElementById(fieldname);
        element.textContent = value;
    }

    /**
     * @param {Number} index
     */
    toggleState(index) {
        debug.log("SheetSectionArmorsArmor.toggleState");

        let currentState = this.getActive(index);
        let armorType = this.getType(index);

        if(currentState == this.STATE_ACTIVE) {
            this.deactivateArmor(index, armorType);
        } else {
            let activeArmorIndex = this.parent.findActiveArmorByType(armorType);
            if(activeArmorIndex) {
                this.deactivateArmor(activeArmorIndex, armorType);
            }
            this.activateArmor(index, armorType);
        }

        this.parent.parent.sectionMovement.updateMovement();
    }

    /**
     * @param {Number} index 
     * @param {String} armorType 
     */
    activateArmor(index, armorType = null) {
        debug.log("SheetSectionArmorsArmor.activateArmor");

        if(!armorType) {
            armorType = this.getType(index);
        }

        this.setActive(index, this.STATE_ACTIVE);

        switch(armorType) {
            case SheetSectionArmors.ARMOR_TYPE_BODY:
                this.parent.setArmorClassByBody(index);
                this.parent.setCheckPenaltyByArmor(index);
                this.parent.setMaxDexterityByArmor(index);
                break;
            case SheetSectionArmors.ARMOR_TYPE_SHIELD:
                this.parent.setArmorClassByShield(index);
                break;
        }
    }

    /**
     * @param {Number} index 
     * @param {String} armorType 
     */
    deactivateArmor(index, armorType = null) {
        debug.log("SheetSectionArmorsArmor.deactivateArmor");

        if(!armorType) {
            armorType = this.getType(index);
        }

        switch(armorType) {
            case SheetSectionArmors.ARMOR_TYPE_BODY:
                this.parent.resetArmorClassByBody();
                this.parent.resetCheckPenaltyByArmor();
                this.parent.resetMaxDexterityByArmor();
                break;
            case SheetSectionArmors.ARMOR_TYPE_SHIELD:
                this.parent.resetArmorClassByShield();
                break;
        }

        this.setActive(index, this.STATE_INACTIVE);
    }
}