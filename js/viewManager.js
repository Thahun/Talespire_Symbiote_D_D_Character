class ViewDTO {
    viewVersion;
    sectionList;
    subSectionList;

    /**
     * @param {String} viewVersion
     * @param {Array.<ViewSectionDTO>} sectionList 
     * @param {Array.<ViewSectionDTO>} subSectionList 
     */
    constructor(
        viewVersion,
        sectionList = [],
        subSectionList = []
    ) {
        this.viewVersion = viewVersion;
        this.sectionList = sectionList;
        this.subSectionList = subSectionList;
    }
}

class ViewSectionDTO {
    name;
    state;

    /**
     * @param {String} name 
     * @param {Number} state 
     */
    constructor(
        name,
        state
    ) {
        this.name = name;
        this.state = state;
    }
}

class ViewManager extends AbstractSheetHelper {
    SECTION_BASIC = 'section-basic';
    SECTION_APPEARANCE = 'section-appearance';
    SECTION_CLASSES = 'section-classes';
    SECTION_ATTRIBUTES = 'section-attributes';
    SECTION_RESCUE = 'section-rescue';
    SECTION_ATTACK = 'section-attack';
    SECTION_WEAPONS = 'section-weapons';
    SECTION_COMBAT = 'section-combat';
    SECTION_INITIATIVE = 'section-initiative';
    SECTION_INSPIRATION = 'section-inspiration';
    SECTION_ARMORS = 'section-armors';
    SECTION_HITPOINTS = 'section-hitpoints';
    SECTION_MOVEMENT = 'section-movement';
    SECTION_CARRYING = 'section-carrying';
    SECTION_ABILITIES = 'section-abilities';
    SECTION_MANEUVERS = 'section-maneuvers';
    SECTION_SPELLS = 'section-spells';
    SECTION_SKILLS = 'section-skills';
    SECTION_VALUABLES = 'section-valuables';
    SECTION_EQUIPMENTS = 'section-equipments';
    SECTION_FAMILIARS = 'section-familiars';
    SECTION_STORY = 'section-story';
    SECTION_CONTACTS = 'section-contacts';
    SECTION_NOTES = 'section-notes';
    SECTION_DICE_SETS = 'section-dice-sets';

    SUB_SECTION_WEAPON = 'character-weapon[' + this.INDEX_PLACEHOLDER + ']';
    SUB_SECTION_ARMOR = 'character-armor[' + this.INDEX_PLACEHOLDER + ']';
    SUB_SECTION_MAGICIAN = 'character-magician-class-details[' + this.INDEX_PLACEHOLDER + ']';

    sectionNames = [
        this.SECTION_BASIC,
        this.SECTION_APPEARANCE,
        this.SECTION_CLASSES,
        this.SECTION_ATTRIBUTES,
        this.SECTION_RESCUE,
        this.SECTION_ATTACK,
        this.SECTION_WEAPONS,
        this.SECTION_COMBAT,
        this.SECTION_INITIATIVE,
        this.SECTION_INSPIRATION,
        this.SECTION_ARMORS,
        this.SECTION_HITPOINTS,
        this.SECTION_MOVEMENT,
        this.SECTION_CARRYING,
        this.SECTION_ABILITIES,
        this.SECTION_MANEUVERS,
        this.SECTION_SPELLS,
        this.SECTION_SKILLS,
        this.SECTION_VALUABLES,
        this.SECTION_EQUIPMENTS,
        this.SECTION_FAMILIARS,
        this.SECTION_STORY,
        this.SECTION_CONTACTS,
        this.SECTION_NOTES,
        this.SECTION_DICE_SETS,
    ];

    subSectionNames = {};

    FIELDID_VERSION = 'view-version';
    
    constructor() {
        super();

        this.defineSubSectionNames();
    }

    defineSubSectionNames() {
        this.subSectionNames[this.SUB_SECTION_WEAPON] = SheetSectionWeapons.FIELDNAME_INDEX;
        this.subSectionNames[this.SUB_SECTION_ARMOR] = SheetSectionArmors.FIELDNAME_INDEX;
        this.subSectionNames[this.SUB_SECTION_MAGICIAN] = SheetSectionMagicians.FIELDNAME_INDEX;
    }

    /**
     * Returns states of all sections
     * 
     * @returns {ViewDTO}
     */
    getViewStates() {
        return new ViewDTO(
            this.getViewVersion(),
            this.getSectionList(),
            this.getSubSectionList()
        );
    }

    /**
     * Sets states of all sections
     * 
     * @param {ViewDTO} data 
     */
    setViewStates(data) {
        this.setViewVersion(data.viewVersion);
        this.setSectionList(data.sectionList);
        this.setSubSectionList(data.subSectionList);
    }


    /**
     * @returns {String}
     */
    getViewVersion() {
        let element = document.getElementById(this.FIELDID_VERSION);

        return element.value;
    }

    /**
     * @param {String}
     */
    setViewVersion(version) {
        let element = document.getElementById(this.FIELDID_VERSION);

        element.value = version;
    }


    /**
     * @returns {Array.<ViewSectionDTO>}
     */
    getSectionList() {
        let sectionList = [];
        for (let i = 0; i < this.sectionNames.length; i++) {
            let sectionName = this.sectionNames[i];
            let sectionElement = this.getElementById(sectionName);
            let sectionState = SectionHelper.determineSectionState(sectionElement);

            sectionList.push(new ViewSectionDTO(sectionName, sectionState));
        }
        return sectionList;
    }

    /**
     * @param {Array.<ViewSectionDTO>} sectionList 
     */
    setSectionList(sectionList) {
        for (let i = 0; i < sectionList.length; i++) {
            let sectionData = sectionList[i];
            let element = this.getElementById(sectionData.name);
            SectionHelper.setSectionState(sectionData.state, element);
        }
    }


    /**
     * @returns {Array.<ViewSectionDTO>}
     */
    getSubSectionList() {
        let subSectionList = [];

        const keys = Object.keys(this.subSectionNames);
        if(keys.length > 0) {
            keys.forEach((key, index) => {
                let subSectionNameBase = key;
                let indexFieldName = this.subSectionNames[key];
                let indexes = this.getIndexes(indexFieldName);
                for (let i = 0; i < indexes.length; i++) {
                    let subSectionName = this.setIndexToString(subSectionNameBase, indexes[i]);
                    let sectionElement = this.getElementById(subSectionName);
                    let sectionState = SectionHelper.determineSectionState(sectionElement);
        
                    subSectionList.push(new ViewSectionDTO(subSectionName, sectionState));
                }
            });
        }
        return subSectionList;
    }

    /**
     * @param {Array.<ViewSectionDTO>} sectionList 
     */
    setSubSectionList(sectionList) {
        for (let i = 0; i < sectionList.length; i++) {
            let sectionData = sectionList[i];
            let element = this.getElementById(sectionData.name);
            SectionHelper.setSectionState(sectionData.state, element, true);
        }
    }

    /**
     * ################################
     * # View functions
     * ################################
     */

    setDefaultView() {
        debug.log("ViewManager.setDefaultView");
        
        this.setViewVersion(characterManager.version);
        this.closeAllSections();
        this.openSection(this.SECTION_BASIC);
    }

    closeAllSections() {
        for (let i = 0; i < this.sectionNames.length; i++) {
            let sectionName = this.sectionNames[i];
            let sectionElement = this.getElementById(sectionName);
            let sectionState = SectionHelper.determineSectionState(sectionElement);
            if(sectionState == SectionHelper.STATE_OPEN) {
                SectionHelper.toggleSection(sectionElement);
            }
        }
    }

    openSection(sectionName) {
        let sectionElement = this.getElementById(sectionName);
        let sectionState = SectionHelper.determineSectionState(sectionElement);
        if(sectionState == SectionHelper.STATE_CLOSE) {
            SectionHelper.toggleSection(sectionElement);
        }
    }
}