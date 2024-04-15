class SheetDataWeaponsDTO {
    weaponList;

    /**
     * @param {Array.<SheetDataWeaponsWeaponDTO>} weaponList
     */
    constructor(
        weaponList
    ) {
        this.weaponList = weaponList;
    }
}

class SheetDataWeaponsWeaponDTO {
    attackType;
    active;
    name;
    type;
    description;
    size;
    range;
    weight;
    attack;
    damage;
    critical;
    ammo;

    /**
     * @param {String} attackType 
     * @param {Boolean} active 
     * @param {String} name 
     * @param {String} type 
     * @param {String} description 
     * @param {String} size 
     * @param {Number} range 
     * @param {Number} weight 
     * @param {Number} attack 
     * @param {String} damage 
     * @param {String} critical 
     * @param {SheetDataWeaponsAmmoDTO} ammo 
     */
    constructor(
        attackType,
        active,
        name,
        type,
        description,
        size,
        range,
        weight,
        attack,
        damage,
        critical,
        ammo
    ) {
        this.attackType = attackType;
        this.active = active;
        this.name = name;
        this.type = type;
        this.description = description;
        this.size = size;
        this.range = range;
        this.weight = weight;
        this.attack = attack;
        this.damage = damage;
        this.critical = critical;
        this.ammo = ammo;
    }
}

class SheetDataWeaponsAmmoDTO {
    current;
    max;
    type;

    /**
     * @param {Number} current 
     * @param {Number} max 
     * @param {String} type 
     */
    constructor(
        current,
        max,
        type
    ) {
        this.current = current;
        this.max = max;
        this.type = type;
    }
}

class SheetSectionWeapons extends AbstractSheetHelper{
    parent;
    sectionWeaponsWeapon;

    WEAPON_ICON_CLOSE = 'assets/sword_a6a6a6.png';
    WEAPON_ICON_DISTANCE = 'assets/bow_a6a6a6.png';

    static FIELDNAME_INDEX = 'character-weapon-id[]';
    FIELDID_ADD_ROW = 'character-weapon-add';

    ELEMENTID_WEAPON_SECTION = 'character-weapon[' + this.INDEX_PLACEHOLDER + ']';
    
    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionWeaponsWeapon = new SheetSectionWeaponsWeapon(this);
    }

    /**
     * Returns all data of section "weapons"
     * 
     * @returns {SheetDataWeaponsDTO}
     */
    getData() {
        return new SheetDataWeaponsDTO(
            this.getWeapons()
        );
    }

    /**
     * Sets all data of section "weapons"
     * 
     * @param {SheetDataWeaponsDTO} data 
     */
    setData(data) {
        this.setWeapons(data.weaponList);
    }


    /**
     * @returns {Array.<SheetDataWeaponsWeaponDTO>}
     */
    getWeapons() {
        let weaponList = []; 
        let indexes = this.getIndexes(SheetSectionWeapons.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let weaponData = this.sectionWeaponsWeapon.getData(index);
            weaponList.push(weaponData);
        }
        return weaponList;
    }

    /**
     * Setting a list of weapons
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataWeaponsWeaponDTO>} weaponList 
     */
    setWeapons(weaponList) {
        this.removeAllWeapons();

        for (let i = 0; i < weaponList.length; i++) {
            let weaponData = weaponList[i];
            this.addWeapon(
                weaponData.attackType,
                weaponData.active,
                weaponData.name,
                weaponData.type,
                weaponData.description,
                weaponData.size,
                weaponData.range,
                weaponData.weight,
                weaponData.attack,
                weaponData.damage,
                weaponData.critical,
                (weaponData.ammo ? weaponData.ammo.current : null),
                (weaponData.ammo ? weaponData.ammo.max : null),
                (weaponData.ammo ? weaponData.ammo.type : null)
            );
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {String} attackType 
     * @returns {String}
     */
    determinWeaponIconByAttackType(attackType) {
        debug.log("SheetSectionWeapons.determinWeaponIconByAttackType");

        let weaponIcon = '';
        switch(attackType) {
            case SheetSectionAttacks.ATTACK_TYPE_CLOSE:
                weaponIcon = this.WEAPON_ICON_CLOSE;
            break;
            case SheetSectionAttacks.ATTACK_TYPE_DISTANCE:
                weaponIcon = this.WEAPON_ICON_DISTANCE;
            break;
        }

        return weaponIcon;
    }

    removeAllWeapons() {
        debug.log("SheetSectionWeapons.removeAllWeapons");

        let indexes = this.getIndexes(SheetSectionWeapons.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeWeapon(indexes[i]);
        }
    }

    /**
     * @param {Number} weaponIndex 
     */
    removeWeapon(weaponIndex) {
        debug.log("SheetSectionWeapons.removeWeapon");

        let elementId = this.setIndexToString(this.ELEMENTID_WEAPON_SECTION, weaponIndex);
        this.removeElementById(elementId);
    }

    /**
     * @param {String} attackType 
     * @param {Boolean} active 
     * @param {String} name 
     * @param {String} type 
     * @param {String} description 
     * @param {String} size 
     * @param {Number} range 
     * @param {Number} weight 
     * @param {Number} attack 
     * @param {String} damage 
     * @param {String} critical 
     * @param {Number} ammoCurrent 
     * @param {Number} ammoMax 
     * @param {String} ammoType 
     */
    addWeapon(attackType, active = this.STATE_INACTIVE, name = '', type = '', description = '', size = '', range = 0, weight = 0, attack = 0, damage = '', critical = '', ammoCurrent = 0, ammoMax = 0, ammoType = '') {
        debug.log("SheetSectionWeapons.addWeapon");

        let weaponIndex = this.determineNextIndex(SheetSectionWeapons.FIELDNAME_INDEX);

        let stateClass = this.getStateCssClassByState(active);

        let gridTemplateRows = '';
        let ammoHtmlString = '';
        if(attackType == SheetSectionAttacks.ATTACK_TYPE_DISTANCE) {
            gridTemplateRows = ' style="grid-template-rows: 1.3rem 1.3rem 1.3rem 1.3rem 1.3rem 1.3rem 1.3rem 1.3rem 0.5em;"';
            ammoHtmlString = ' \
            <div class="grid-item-label" style="grid-column-end: span 2;"> \
                <label>Munition</label> \
            </div> \
            <div class="grid-item-data" style="grid-column-end: span 3;"> \
                <div class="subtext"> \
                    <input name="character-weapon-ammo-current[' + weaponIndex + ']" class="field-data-short" type="number" value="' + ammoCurrent + '" onchange="SheetManager.preventNegativeValue(this);"></input><br /> \
                    <label>Aktuell</label> \
                </div> \
                <span class="field-data-text standard-font" style="float: left;">&nbsp;/&nbsp;</span> \
                <div class="subtext"> \
                    <input name="character-weapon-ammo-max[' + weaponIndex + ']" class="field-data-short" type="number" value="' + ammoMax + '" onchange="SheetManager.preventNegativeValue(this);"></input><br /> \
                    <label>Maximal</label> \
                </div> \
                <span class="field-data-text standard-font" style="float: left;">&nbsp;</span> \
                <div class="subtext"> \
                    <input name="character-weapon-ammo-type[' + weaponIndex + ']" class="field-data-medium" type="text" value="' + ammoType + '"></input><br /> \
                    <label>Art</label> \
                </div> \
            </div> \
            \
            <div class="grid-item-blank" style="grid-column-end: span 10;">&nbsp;</div> \
            \
            ';
        }

        let weaponIcon = this.determinWeaponIconByAttackType(attackType);

        let currentAttack = this.parent.sectionAttacks.getTotal(attackType);
        if(currentAttack) {
            attack = currentAttack;
        }

        let newWeaponHtmlString = ' \
        <div id="character-weapon[' + weaponIndex + ']" class="sub-section"> \
            <div class="sub-section-header" onclick="SectionHelper.toggleSection(this.parentElement, true);"> \
                <div class="character-weapon-state" onclick="sheetManager.sectionWeapons.sectionWeaponsWeapon.toggleState(' + weaponIndex + '); event.stopPropagation();"> \
                    <div class="' + stateClass + '"> \
                        <input name="character-weapon-active[' + weaponIndex + ']" type="hidden" value="' + (active ? 'true' : 'false') + '"> \
                    </div> \
                </div> \
                <span class="sub-section-header-icon"> \
                    <img id="character-weapon-icon[' + weaponIndex + ']" src="' + weaponIcon + '" class="weaponIcon"> \
                </span> \
                <span id="character-weapon-title[' + weaponIndex + ']" class="sub-section-title">' + name + '</span> \
                <div class="section-open" style="display: none;">▼</div> \
                <div class="section-close" style="display: block;">▲</div> \
            </div> \
            <div class="sub-section-body" style="display: block;"> \
                <input name="character-weapon-id[]" type="hidden" value="' + weaponIndex + '"> \
                <input name="character-weapon-attack-type[' + weaponIndex + ']" type="hidden" value="' + attackType + '"> \
                <div class="section-grid-container"' + gridTemplateRows + '> \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Name</label> \
                    </div> \
                    <div class="grid-item-data" style="grid-column-end: span 3;"> \
                        <input name="character-weapon-name[' + weaponIndex + ']" type="text" value="' + name + '" oninput="sheetManager.sectionWeapons.sectionWeaponsWeapon.setTitle(' + weaponIndex + ', this.value)"></input> \
                    </div> \
                    <div class="grid-item-header-label" style="grid-column-end: span 5;"> \
                        <label>Besondere Eigenschaften</label> \
                    </div> \
                    \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Art</label> \
                    </div> \
                    <div class="grid-item-data" style="grid-column-end: span 3;"> \
                        <input name="character-weapon-type[' + weaponIndex + ']" type="text" value="' + type + '"></input> \
                    </div> \
                    <div class="grid-item" style="grid-area: 2 / 6 / span 7 / span 5;"> \
                        <textarea name="character-weapon-description[' + weaponIndex + ']" style="height: 12.4em; width: 15.2em;">' + description + '</textarea> \
                    </div> \
                    \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Größe</label> \
                    </div> \
                    <div class="grid-item-data" style="grid-column-end: span 3;"> \
                        <input name="character-weapon-size[' + weaponIndex + ']" type="text" value="' + size + '"></input> \
                    </div> \
                    \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Reichweite</label> \
                    </div> \
                    <div class="grid-item-data align-left" style="grid-column-end: span 3;"> \
                        <input name="character-weapon-range[' + weaponIndex + ']" class="field-data-short" type="number" step="0.1" value="' + range + '" onchange="SheetManager.preventNegativeValue(this);"></input> \
                    </div> \
                    \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Gewicht</label> \
                    </div> \
                    <div class="grid-item-data align-left" style="grid-column-end: span 3;"> \
                        <input name="character-weapon-weight[' + weaponIndex + ']" class="field-data-short" type="number" step="0.1" value="' + weight + '" onchange="SheetManager.preventNegativeValue(this);"></input> \
                    </div> \
                    \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Angriff</label> \
                    </div> \
                    <div class="grid-item-data align-left" style="grid-column-end: span 2;"> \
                        <input name="character-weapon-attack[' + weaponIndex + ']" class="field-data-short" type="number" value="' + attack + '" readonly></input> \
                    </div> \
                    <div class="grid-item" style="grid-column-end: span 1;"> \
                        <i class="icon-dice ts-icon-d20 ts-icon-small" onclick="DiceHelper.rollDice(\'&quot;\' + sheetManager.sectionWeapons.sectionWeaponsWeapon.getName(' + weaponIndex + ') + \'&quot; Angriff\', new MethodCallbackDTO(sheetManager.sectionWeapons.sectionWeaponsWeapon, \'getAttack\', [' + weaponIndex + ']));"></i> \
                    </div> \
                    \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Schaden</label> \
                    </div> \
                    <div class="grid-item-data" style="grid-column-end: span 2;"> \
                        <input name="character-weapon-damage[' + weaponIndex + ']" type="text" value="' + damage + '" onchange="DiceHelper.isValidDiceString(this.value);"></input> \
                    </div> \
                    <div class="grid-item" style="grid-column-end: span 1;"> \
                        <i class="icon-dice ts-icon-d20 ts-icon-small" onclick="DiceHelper.rollDice(\'&quot;\' + sheetManager.sectionWeapons.sectionWeaponsWeapon.getName(' + weaponIndex + ') + \'&quot; Schaden\', null, new MethodCallbackDTO(sheetManager.sectionWeapons.sectionWeaponsWeapon, \'getDamage\', [' + weaponIndex + ']));"></i> \
                    </div> \
                    ' + ammoHtmlString + ' \
                    <div class="grid-item-label" style="grid-column-end: span 2;"> \
                        <label>Kritisch</label> \
                    </div> \
                    <div class="grid-item-data" style="grid-column-end: span 1;"> \
                        <input name="character-weapon-critical[' + weaponIndex + ']" class="field-data-medium" type="text" value="' + critical + '"></input> \
                    </div> \
                    <div class="grid-item" style="grid-column-end: span 2; text-align: center;"> \
                        <div class="icon-center"> \
                            <i class="icon-trash" onclick="sheetManager.sectionWeapons.removeWeapon(' + weaponIndex + ');"></i> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
        ';
        let newWeaponHtmlDocument = new DOMParser().parseFromString(newWeaponHtmlString, "text/html");
        let newWeaponHtmlCollection = newWeaponHtmlDocument.body.children;
        let characterWeaponAdd = document.getElementById(this.FIELDID_ADD_ROW);
        characterWeaponAdd.before(...newWeaponHtmlCollection);
    }
    

    /**
     * @param {String} attackType 
     * @returns {Array.<Number>}
     */
    getWeaponIndexesByAttackType(attackType) {
        debug.log("SheetSectionWeapons.getWeaponIndexesByAttackType");

        let filteredIndexes = []; 
        let indexes = this.getIndexes(SheetSectionWeapons.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(this.sectionWeaponsWeapon.getAttackType(index) == attackType) {
                filteredIndexes.push(index);
            }
        }

        return filteredIndexes;
    }


    /**
     * @param {String} attackType 
     * @param {Number} attack 
     */
    setAttackByAttackType(attackType, attack) {
        debug.log("SheetSectionWeapons.setAttackByAttackType");
        
        let indexes = this.getWeaponIndexesByAttackType(attackType);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];

            this.sectionWeaponsWeapon.setAttack(index, attack);
        }
    }
}


class SheetSectionWeaponsWeapon extends AbstractSheetHelper {
    parent;
    sectionWeaponsAmmo;

    FIELDNAME_ICON = 'character-weapon-icon[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_TITLE = 'character-weapon-title[' + this.INDEX_PLACEHOLDER + ']';
    
    FIELDNAME_ATTACK_TYPE = 'character-weapon-attack-type[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ACTIVE = 'character-weapon-active[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_NAME = 'character-weapon-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_TYPE = 'character-weapon-type[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DESCRIPTION = 'character-weapon-description[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_SIZE = 'character-weapon-size[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_RANGE = 'character-weapon-range[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_WEIGHT = 'character-weapon-weight[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_ATTACK = 'character-weapon-attack[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DAMAGE = 'character-weapon-damage[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_CRITICAL = 'character-weapon-critical[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionWeapons} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionWeaponsAmmo = new SheetSectionWeaponsAmmo();
    }

    /**
     * Returns all data of one weapon of section "weapons"
     * 
     * @param {Number} index 
     * @returns {SheetDataWeaponsWeaponDTO}
     */
    getData(index) {
        return new SheetDataWeaponsWeaponDTO(
            this.getAttackType(index),
            this.getActive(index),
            this.getName(index),
            this.getType(index),
            this.getDescription(index),
            this.getSize(index),
            this.getRange(index),
            this.getWeight(index),
            this.getAttack(index),
            this.getDamage(index),
            this.getCritical(index),
            this.getAmmo(index)
        );
    }

    /**
     * Sets all data of one weapon of section "weapons"
     * 
     * @param {Number} index 
     * @param {SheetDataWeaponsWeaponDTO} data 
     */
    setData(index, data) {
        this.setAttackType(index, data.attackType);
        this.setActive(index, data.active);
        this.setName(index, data.name);
        this.setType(index, data.type);
        this.setDescription(index, data.description);
        this.setSize(index, data.size);
        this.setRange(index, data.range);
        this.setWeight(index, data.weight);
        this.setAttack(index, data.attack);
        this.setDamage(index, data.damage);
        this.setCritical(index, data.critical);
        this.setAmmo(index, data.ammo);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getAttackType(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTACK_TYPE, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setAttackType(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTACK_TYPE, index);

        this.setElementValueByName(fieldname, value);

        this.setIconByAttackType(index, value);
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
     * @returns {String}
     */
    getSize(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_SIZE, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setSize(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_SIZE, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getRange(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_RANGE, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setRange(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_RANGE, index);

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


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getAttack(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTACK, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setAttack(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_ATTACK, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getDamage(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DAMAGE, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setDamage(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DAMAGE, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {String}
     */
    getCritical(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CRITICAL, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setCritical(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CRITICAL, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {String|null}
     */
    getAmmo(index) {
        if(this.getAttackType(index) == SheetSectionAttacks.ATTACK_TYPE_DISTANCE) {
            return this.sectionWeaponsAmmo.getData(index);
        }

        return null;
    }

    /**
     * @param {Number} index 
     * @param {SheetDataWeaponsAmmoDTO|null} value 
     */
    setAmmo(index, value) {
        if(this.getAttackType(index) == SheetSectionAttacks.ATTACK_TYPE_DISTANCE) {
            this.sectionWeaponsAmmo.setData(index, value);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    /**
     * @param {Number} index 
     * @param {String} attackType 
     */
    setIconByAttackType(index, attackType) {
        let weaponIcon = this.parent.determinWeaponIconByAttackType(attackType);

        let fieldname = this.setIndexToString(this.FIELDNAME_ICON, index);
        let element = this.getElementById(fieldname);
        element.src = weaponIcon;
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
        debug.log("SheetSectionWeaponsWeapon.toggleState");

        let currentState = this.getActive(index);
        let newState = null;

        if(currentState == this.STATE_ACTIVE) {
            newState = this.STATE_INACTIVE;
        } else {
            newState = this.STATE_ACTIVE;
        }

        this.setActive(index, newState);
    }
}


class SheetSectionWeaponsAmmo extends AbstractSheetHelper {
    FIELDNAME_CURRENT = 'character-weapon-ammo-current[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_MAX = 'character-weapon-ammo-max[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_TYPE = 'character-weapon-ammo-type[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * Returns ammo data of one weapon of section "weapons"
     * 
     * @param {Number} index 
     * @returns {SheetDataWeaponsAmmoDTO}
     */
    getData(index) {
        return new SheetDataWeaponsAmmoDTO(
            this.getCurrent(index),
            this.getMax(index),
            this.getType(index)
        );
    }

    /**
     * Sets ammo data of one weapon of section "weapons"
     * 
     * @param {Number} index 
     * @param {SheetDataWeaponsAmmoDTO} data 
     */
    setData(index, data) {
        this.setCurrent(index, data.current);
        this.setMax(index, data.max);
        this.setType(index, data.type);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getCurrent(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CURRENT, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setCurrent(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_CURRENT, index);

        this.setElementValueByName(fieldname, value);
    }


    /**
     * @param {Number} index 
     * @returns {Number}
     */
    getMax(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_MAX, index);

        return this.getElementValueByName(fieldname, this.DATA_TYPE_NUMBER);
    }

    /**
     * @param {Number} index 
     * @param {Number} value 
     */
    setMax(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_MAX, index);

        this.setElementValueByName(fieldname, value);
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
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */
}