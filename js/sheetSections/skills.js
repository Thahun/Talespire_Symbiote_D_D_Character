class SheetDataSkillsDTO {
    current;
    max;
    initial;
    level;
    levelModifiers;
    skillGroup;
    skillList;

    /**
     * @param {Number} current 
     * @param {Number} max 
     * @param {Number} initial 
     * @param {Number} level 
     * @param {Array.<SheetDataOtherModifierDTO>} levelModifiers 
     * @param {SheetDataSkillsSkillGroupDTO} skillGroup 
     * @param {Array.<SheetDataSkillsSkillDTO>} skillList 
     */
    constructor(
        current,
        max,
        initial,
        level,
        levelModifiers,
        skillGroup,
        skillList = []
    ) {
        this.current = current;
        this.max = max;
        this.initial = initial;
        this.level = level;
        this.levelModifiers = levelModifiers;
        this.skillGroup = skillGroup;
        this.skillList = skillList;
    }
}

class SheetDataSkillsSkillGroupDTO {
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

class SheetDataSkillsSkillDTO {
    id;
    primary;
    total;
    penalty;
    attributeData;
    rank;
    other;
    otherModifiers;

    /**
     * @param {Number} id 
     * @param {Boolean} primary 
     * @param {Number} total 
     * @param {Object} penalty 
     * @param {SheetSectionSkillsSkillAttributeDTO} attributeData 
     * @param {Number} rank 
     * @param {Number} other 
     * @param {Array.<SheetDataOtherModifierDTO>} otherModifiers 
     */
    constructor(
        id,
        primary,
        total,
        penalty,
        attributeData,
        rank,
        other,
        otherModifiers
    ) {
        this.id = id;
        this.primary = primary;
        this.total = total;
        this.penalty = penalty;
        this.attributeData = attributeData;
        this.rank = rank;
        this.other = other;
        this.otherModifiers = otherModifiers;
    }
}

class SheetSectionSkillsSkillAttributeDTO {
    id;
    short;
    modifier;

    /**
     * @param {Number} id 
     * @param {String} short 
     * @param {Number} modifier 
     */
    constructor(
        id,
        short,
        modifier
    ) {
        this.id = id;
        this.short = short;
        this.modifier = modifier;
    }
}

class SheetSectionSkills extends AbstractSheetHelper{
    parent;
    sectionSkillsSkill;
    /** @type {OtherModifiers} levelModifiers */
    levelModifiers;

    FIELDID_SKILL_GROUP_SUBSECTION = 'character-skills-group-subsection';

    FIELDNAME_INDEX = 'character-skills-id[]';
    FIELDID_ADD_ROW = 'character-skills-add-row';

    FIELDNAME_CURRENT = 'character-skills-current';
    FIELDNAME_MAX = 'character-skills-max';
    FIELDNAME_INITIAL = 'character-skills-initial';
    FIELDNAME_LEVEL = 'character-skills-level';
    FIELDNAME_SKILL_GROUP = 'character-skills-group';
    FIELDID_SKILL_GROUP_OPTIONS = 'character-skills-group-options';

    LEVEL_MODIFIER_ID_PREFIX = this.FIELDNAME_LEVEL;

    FIELDNAME_LEVEL_INDEX = 'character-skills-level-id[]';
    FIELDID_LEVEL_ADD_ROW = 'character-skills-level-add-row';

    ELEMENTID_CELL_ID = 'character-skills-cell-id[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_PRIMARY = 'character-skills-cell-primary[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_TOTAL = 'character-skills-cell-total[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_SPACE_A = 'character-skills-cell-space-a[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ATTRIBUTE = 'character-skills-cell-attribute[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_SPACE_B = 'character-skills-cell-space-b[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_RANK = 'character-skills-cell-rank[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_SPACE_C = 'character-skills-cell-space-c[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_OTHER = 'character-skills-cell-other[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-skills-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionSkillsSkill = new SheetSectionSkillsSkill(this);
        this.levelModifiers = new OtherModifiers(this, this.LEVEL_MODIFIER_ID_PREFIX, 'setLevelModifierByFieldName');

        this.createSkillGroupsDropdown();
    }

    /**
     * Returns all data of section "skills"
     * 
     * @returns {SheetDataSkillsDTO}
     */
    getData() {
        return new SheetDataSkillsDTO(
            this.getCurrent(),
            this.getMax(),
            this.getInitial(),
            this.getLevel(),
            this.levelModifiers.getDataList(),
            this.getSkillGroup(),
            this.getSkills()
        );
    }

    /**
     * Sets all data of section "skills"
     * 
     * @param {SheetDataSkillsDTO} data 
     */
    setData(data) {
        this.setCurrent(data.current);
        this.setMax(data.max);
        this.setInitial(data.initial);
        this.setLevel(data.level);
        this.levelModifiers.setDataList(data.levelModifiers);
        this.setSkillGroup(data.skillGroup.id, data.skillGroup.name);
        if(data.skillList && data.skillList.length != 0) {
            this.setSkills(data.skillList);
        } else {
            this.removeAllSkills();
        }
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


    /**
     * @returns {Number}
     */
    getInitial() {
        return this.getElementValueByName(this.FIELDNAME_INITIAL, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} value 
     */
    setInitial(value) {
        this.setElementValueByName(this.FIELDNAME_INITIAL, value);
    }


    /**
     * @returns {Number}
     */
    getLevel() {
        return this.getLevelModifierByFieldName(this.FIELDNAME_LEVEL);
    }

    /**
     * @param {Number} value 
     */
    setLevel(value) {
        this.setLevelModifierByFieldName(this.FIELDNAME_LEVEL, value);
    }


    /**
     * @param {String} fieldName 
     * @returns {Number}
     */
    getLevelModifierByFieldName(fieldName) {
        return this.getElementValueByName(fieldName, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {String} fieldName 
     * @param {Number} value 
     */
    setLevelModifierByFieldName(fieldName, value) {
        this.setElementValueByName(fieldName, value);
    }

    
    /**
     * @returns {SheetDataSkillsSkillGroupDTO}
     */
    getSkillGroup() {
        let skillGroupElement = this.getElementByName(this.FIELDNAME_SKILL_GROUP);

        return new SheetDataSkillsSkillGroupDTO(Number(skillGroupElement.dataset.id), skillGroupElement.value);
    }

    /**
     * If value isn't provided, it'll be determined by id
     * 
     * @param {Number} id 
     * @param {String|null} value 
     */
    setSkillGroup(id, value = null) {
        if(!value) {
            let skillGroupObj = CharacterDataTables.getSkillGroupById(id);
            value = skillGroupObj.name;
        }

        this.setElementValueByName(this.FIELDNAME_SKILL_GROUP, value, id);

        if(!this.isSkillGroupSelected()) {
            this.showSkillGroupSubSection();
            this.removeAllSkills();
        } else {
            this.hideSkillGroupSubSection();
            this.createSkills();
        }
    }


    /**
     * @returns {Array.<SheetDataSkillsSkillDTO>}
     */
    getSkills() {
        let skillList = []; 
        if(this.isSkillGroupSelected()) {
            let indexes = this.getIndexes(this.FIELDNAME_INDEX);
            for (let i = 0; i < indexes.length; i++) {
                let index = indexes[i];
                let skillData = this.sectionSkillsSkill.getData(index);
                skillList.push(skillData);
            }
        }
        return skillList;
    }

    /**
     * Setting a list of skills
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataSkillsSkillDTO>} skillList 
     */
    setSkills(skillList) {
        if(!this.isSkillGroupSelected()) {
            error.show('Unable to assign skill values, cause no skill group is yet selected.');
            return;
        }

        for (let i = 0; i < skillList.length; i++) {
            let skillData = skillList[i];
            this.sectionSkillsSkill.setData(skillData.id, skillData);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    createSkillGroupsDropdown() {
        debug.log("SheetSectionSkills.createSkillGroupsDropdown");

        let skillGroups = CharacterDataTables.getSkillGroups(false);
        let options = [];
        for(let i = 0;i < skillGroups.length; i++) {
            options.push({'key':skillGroups[i].id, 'value':skillGroups[i].name});
        }

        this.createDropdown(this.FIELDID_SKILL_GROUP_OPTIONS, options);
    }

    /**
     * @returns {Boolean}
     */
    isSkillGroupSelected() {
        debug.log("SheetSectionSkills.isSkillGroupSelected");

        let skillGroup = this.getSkillGroup();
        if(skillGroup.id == 0) {
            return false;
        }

        return true;
    }

    showSkillGroupSubSection() {
        debug.log("SheetSectionSkills.showSkillGroupSubSection");

        let element = this.getElementById(this.FIELDID_SKILL_GROUP_SUBSECTION);
        element.style.display = 'grid';
    }

    hideSkillGroupSubSection() {
        debug.log("SheetSectionSkills.hideSkillGroupSubSection");

        let element = this.getElementById(this.FIELDID_SKILL_GROUP_SUBSECTION);
        element.style.display = 'none';
    }

    determineMaximum() {
        debug.log("SheetSectionSkills.determineMaximum");

        let initial = this.getInitial();
        let levelUps = this.getLevel();

        let sum = initial + levelUps;

        this.setMax(sum);
    }

    createSkills() {
        debug.log("SheetSectionSkills.createSkills");

        this.removeAllSkills();

        if(!this.isSkillGroupSelected()) {
            return;
        }

        let skillGroupId = this.getSkillGroup().id;
        let skills = CharacterDataTables.getSkills(skillGroupId, null, null, true);
        for(let i = 0; i < skills.length; i++) {
            let attributeData = null;
            if(skills[i].attributeId) {
                let attributeObject = CharacterDataTables.getAttributeById(skills[i].attributeId);
                let attributeModifier = this.parent.sectionAttributes.getAttributeModifier(attributeObject.propertyName);
                attributeData = new SheetSectionSkillsSkillAttributeDTO(attributeObject.id, attributeObject.short, attributeModifier)
            }
            
            this.addSkill(skills[i].id, skills[i].name, attributeData, skills[i].checkPenalty);
        }

        // Trigger a sync of possible penalties
        this.parent.sectionArmors.setCheckPenaltyByArmor(null, SheetSectionArmors.ARMOR_TYPE_BODY);
        this.parent.sectionCarrying.setCheckPenaltyByCarrying();
    }

    removeAllSkills() {
        debug.log("SheetSectionSkills.removeAllSkills");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeSkill(indexes[i]);
        }
    }

    /**
     * @param {Number} index 
     */
    removeSkill(index) {
        debug.log("SheetSectionSkills.removeSkill");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_ID, index),
            this.setIndexToString(this.ELEMENTID_CELL_PRIMARY, index),
            this.setIndexToString(this.ELEMENTID_CELL_TOTAL, index),
            this.setIndexToString(this.ELEMENTID_CELL_SPACE_A, index),
            this.setIndexToString(this.ELEMENTID_CELL_ATTRIBUTE, index),
            this.setIndexToString(this.ELEMENTID_CELL_SPACE_B, index),
            this.setIndexToString(this.ELEMENTID_CELL_RANK, index),
            this.setIndexToString(this.ELEMENTID_CELL_SPACE_C, index),
            this.setIndexToString(this.ELEMENTID_CELL_OTHER, index),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, index)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {Number} id 
     * @param {String} name 
     * @param {SheetSectionSkillsSkillAttributeDTO|null} attributeData
     */
    addSkill(id, name, attributeData) {
        debug.log("SheetSectionSkills.addSkill");

        let skillName = name;
        if(attributeData) {
            skillName += ' (' + attributeData.short + ')';
        }

        let newSkillHtmlString = ' \
        <div id="character-skills-cell-id[' + id + ']" class="grid-item-label" style="grid-column-end: span 1;"> \
            <label class="max-width" style="width: 10em;">' + skillName + '</label> \
            <input name="character-skills-id[]" type="hidden" value="' + id + '"></input> \
        </div> \
        <div id="character-skills-cell-primary[' + id + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-skills-primary[' + id + ']" type="checkbox" value="true" onclick="sheetManager.sectionSkills.sumSkill(' + id + ');"></input> \
        </div> \
        <div id="character-skills-cell-total[' + id + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-skills-total[' + id + ']" class="field-data-short" type="number" value="0" readonly></input> \
            <input name="character-skills-penalty[' + id + ']" type="hidden" value="{}" onchange="sheetManager.sectionSkills.sumSkill(' + id + ');"></input> \
        </div> \
        <div id="character-skills-cell-space-a[' + id + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <span class="field-data-text standard-font">&nbsp;=&nbsp;</span> \
        </div> \
        <div id="character-skills-cell-attribute[' + id + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-skills-attribute-id[' + id + ']" type="hidden" value="' + (attributeData ? attributeData.id : '') + '"></input> \
            <input name="character-skills-attribute-modifier[' + id + ']" class="field-data-short" type="number" value="' + (attributeData ? attributeData.modifier : '') + '" onchange="sheetManager.sectionSkills.sumSkill(' + id + ');" readonly></input> \
        </div> \
        <div id="character-skills-cell-space-b[' + id + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <span class="field-data-text standard-font">&nbsp;+&nbsp;</span> \
        </div> \
        <div id="character-skills-cell-rank[' + id + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <input name="character-skills-rank[' + id + ']" class="field-data-short" type="number" value="0" onchange="SheetManager.preventNegativeValue(this); sheetManager.sectionSkills.sumSkill(' + id + '); sheetManager.sectionSkills.sumRanks(' + id + ');"></input> \
        </div> \
        <div id="character-skills-cell-space-c[' + id + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <span class="field-data-text standard-font">&nbsp;+&nbsp;</span> \
        </div> \
        <div id="character-skills-cell-other[' + id + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <div class="expand"> \
                <input name="character-skills-other[' + id + ']" class="field-data-short" type="number" value="0" onchange="sheetManager.sectionSkills.sumSkill(' + id + ');" readonly></input> \
                <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                <div id="character-skills-other[' + id + ']-expand" class="expand-content" style="margin-right: 0.1em;"> \
                    <div class="other-modifier-grid-container" style="grid-template-rows: 0.7rem"> \
                        <div class="grid-item-subtitel-label" style="grid-column-end: span 1;"> \
                            <label>Aktiv</label> \
                        </div> \
                        <div class="grid-item-subtitel-label" style="grid-column-end: span 1;"> \
                            <label>Ursache</label> \
                        </div> \
                        <div class="grid-item-subtitel-label" style="grid-column-end: span 1;"> \
                            <label>Modifikator</label> \
                        </div> \
                        <div class="grid-item" style="grid-column-end: span 1;"> \
                            &nbsp; \
                        </div> \
                        \
                        <div id="character-skills-other[' + id + ']-add-row" class="grid-item" style="grid-column-end: span 3;"> \
                            &nbsp; \
                        </div> \
                        <div class="grid-item" style="grid-column-end: span 1;"> \
                            <div class="addRemoveIcon" onclick="sheetManager.sectionSkills.sectionSkillsSkill.otherModifiers[' + id + '].addOtherModifier();">+</div> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
        <div id="character-skills-cell-icon[' + id + ']" class="grid-item" style="grid-column-end: span 1;"> \
            <i class="icon-dice ts-icon-d20 ts-icon-small" onclick="DiceHelper.rollDice(\'' + name + '\',  new MethodCallbackDTO(sheetManager.sectionSkills.sectionSkillsSkill, \'getTotal\', [' + id + ']));"></i> \
        </div> \
        ';
        let newSkillHtmlDocument = new DOMParser().parseFromString(newSkillHtmlString, "text/html");
        let newSkillHtmlCollection = newSkillHtmlDocument.body.children;
        let charackterSkillAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        charackterSkillAddRow.before(...newSkillHtmlCollection);

        let modifierIdPrefix = this.setIndexToString(this.sectionSkillsSkill.OTHER_MODIFIER_ID_PREFIX, id);
        this.sectionSkillsSkill.otherModifiers[id] = new OtherModifiers(this.sectionSkillsSkill, modifierIdPrefix, 'setOtherModifierByFieldName');
    }

    /**
     * @param {Number} skillId 
     */
    sumRanks(skillId) {
        debug.log("SheetSectionSkills.sumRanks");

        let sum = 0;
        let max = this.getMax();

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            sum += this.sectionSkillsSkill.getRank(index);
        }

        if(sum > max) {
            let oldRank = this.sectionSkillsSkill.getRank(skillId) - 1;
            this.sectionSkillsSkill.setRank(skillId, oldRank)
            info.show('Maximum von ' + max + ' Skills überschritten!');
            return;
        }

        this.setCurrent(sum);
    }

    /**
     * @param {Number} skillId 
     */
    sumSkill(skillId) {
        debug.log("SheetSectionSkills.sumSkill");

        let skillObj = CharacterDataTables.getSkillById(skillId);
        let skillData = this.sectionSkillsSkill.getData(skillId);
        let attributeData = skillData.attributeData;
        let rank = skillData.rank;
        let total = 0;
        if(rank > 0 || skillObj.untrained == true) {
            let other = this.sectionSkillsSkill.getOther(skillId);
            total = (attributeData ? attributeData.modifier : 0) + rank + other;
            if(skillData.primary == true && rank > 0) {
                total += this.sectionSkillsSkill.PRIMARY_SKILL_BONUS;
            }
            
            let totalFieldName = this.setIndexToString(this.sectionSkillsSkill.FIELDNAME_TOTAL, skillId);
            let penalty = this.parent.checkPenaltyHelper.calculateCheckPenalty(skillData.penalty);
            if(penalty != 0) {
                this.setElementColorByName(totalFieldName, this.COLOR_CODE_RED)
                total -= penalty;
            } else {
                this.setElementColorByName(totalFieldName)
            }
        }
        this.sectionSkillsSkill.setTotal(skillId, total);
    }

    /**
     * @param {Object} attribute 
     * @param {Number} modifierValue 
     */
    updateAttributeModifier(attribute, modifierValue) {
        debug.log("SheetSectionSkills.updateAttributeModifier");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionSkillsSkill.sectionSkillsSkillAttribute.getId(index) == attribute.id) {
                this.sectionSkillsSkill.sectionSkillsSkillAttribute.setModifier(index, modifierValue);
            }
        }
    }
}

class SheetSectionSkillsSkill extends AbstractSheetHelper{
    parent;
    sectionSkillsSkillAttribute;
    /** @type {Array.<OtherModifiers>} otherModifiers */
    otherModifiers = [];

    PRIMARY_SKILL_BONUS = 3;

    FIELDNAME_PRIMARY = 'character-skills-primary[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_TOTAL = 'character-skills-total[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_PENALTY = 'character-skills-penalty[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_RANK = 'character-skills-rank[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_OTHER = 'character-skills-other[' + this.INDEX_PLACEHOLDER + ']';

    OTHER_MODIFIER_ID_PREFIX = this.FIELDNAME_OTHER;

    FIELDNAME_OTHER_INDEX = 'character-skills-other[' + this.INDEX_PLACEHOLDER + ']-id[]';
    FIELDID_OTHER_ADD_ROW = 'character-skills-other[' + this.INDEX_PLACEHOLDER + ']-add-row';

    /**
     * @param {SheetSectionSkills} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionSkillsSkillAttribute = new SheetSectionSkillsSkillAttribute();
    }

    /**
     * Returns one skill of section "skills"
     * 
     * @param {Number} index 
     * @returns {SheetDataSkillsSkillDTO}
     */
    getData(index) {
        return new SheetDataSkillsSkillDTO(
            index,
            this.getPrimary(index),
            this.getTotal(index),
            this.getPenalty(index),
            this.getAttributeData(index),
            this.getRank(index),
            this.getOther(index),
            this.otherModifiers[index].getDataList(index),
        );
    }

    /**
     * Sets one skill of section "skills"
     * 
     * @param {Number} index 
     * @param {SheetDataSkillsSkillDTO} data 
     */
    setData(index, data) {
        this.setPrimary(index, data.primary);
        this.setTotal(index, data.total);
        this.setPenalty(index, data.penalty);
        this.setAttributeData(index, data.attributeData);
        this.setRank(index, data.rank);
        this.setOther(index, data.other);
        this.otherModifiers[index].setDataList(data.otherModifiers);
    }


    /**
     * @param {Number} index 
     * @returns {Boolean}
     */
    getPrimary(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_PRIMARY, index);

        return this.getElementCheckedStateByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {Boolean} value 
     */
    setPrimary(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_PRIMARY, index);

        this.setElementCheckedStateByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getTotal(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_TOTAL, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setTotal(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_TOTAL, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Object}
     */
    getPenalty(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_PENALTY, index);
        return JSON.parse(this.getElementValueByName(fieldname));
    }

    /**
     * @param {Number} index 
     * @param {Object} value 
     */
    setPenalty(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_PENALTY, index);
        this.setElementValueByName(fieldname, JSON.stringify(value));
    }


    /**
     * @param {Number} index 
     * @returns {SheetDataMagiciansMagicianAttributeDTO}
     */
    getAttributeData(index) {
        return this.sectionSkillsSkillAttribute.getData(index);
    }

    /**
     * @param {Number} index 
     * @param {SheetDataMagiciansMagicianAttributeDTO} data 
     */
    setAttributeData(index, data) {
        return this.sectionSkillsSkillAttribute.setData(index, data);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getRank(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_RANK, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setRank(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_RANK, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getOther(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_OTHER, index);

        return this.getOtherModifierByFieldName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setOther(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_OTHER, index);

        this.setOtherModifierByFieldName(fieldname, value);
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
}

class SheetSectionSkillsSkillAttribute extends AbstractSheetHelper {
    parent;

    FIELDNAME_ATTRIBUTE_ID = 'character-skills-attribute-id[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ATTRIBUTE_MODIFIER = 'character-skills-attribute-modifier[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionSkillsSkill} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns attribute data of one skill of section "skills"
     * 
     * @param {Number} index 
     * @returns {SheetSectionSkillsSkillAttributeDTO|null}
     */
    getData(index) {
        let id = this.getId(index);
        let attributeObject = CharacterDataTables.getAttributeById(id);
        return new SheetSectionSkillsSkillAttributeDTO(
            id,
            attributeObject.short,
            this.getModifier(index)
        );
    }

    /**
     * Set attribute data of one skill of section "skills"
     * 
     * @param {Number} index 
     * @param {SheetSectionSkillsSkillAttributeDTO}
     */
    setData(index, data) {
        this.setId(index, data.id),
        this.setModifier(index, data.modifier)
    }


    /**
     * @param {Number} index 
     * @returns {Number|null}
     */
    getId(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_ID, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setId(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_ID, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number|null}
     */
    getModifier(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_MODIFIER, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setModifier(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTRIBUTE_MODIFIER, index);

        this.setElementValueByName(fieldname, value);
    }
}