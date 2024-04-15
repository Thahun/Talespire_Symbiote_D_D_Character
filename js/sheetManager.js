class SheetData {
    sheetVersion
    basic;
    appearance;
    classes;
    attributes;
    rescues;
    attacks;
    weapons;
    combatManeuvers;
    initiative;
    inspiration;
    armors;
    hitpoints;
    movement;
    carrying;
    abilities;
    stances;
    maneuvers;
    magicians;
    spells;
    skills;
    valuables;
    equipments;
    familiars;
    story;
    contacts;
    notes;
    diceSets;

    /**
     * @param {String} sheetVersion
     * @param {SheetDataBasicDTO} basic 
     * @param {SheetDataAppearanceDTO} appearance
     * @param {SheetDataClassesDTO} classes
     * @param {SheetDataAttributesDTO} attributes
     * @param {SheetDataRescuesDTO} rescues
     * @param {SheetDataAttacksDTO} attacks
     * @param {SheetDataWeaponsDTO} weapons
     * @param {SheetDataCombatManeuversDTO} combatManeuvers
     * @param {SheetDataInitiativeDTO} initiative
     * @param {SheetDataInspirationDTO} inspiration
     * @param {SheetDataArmorsDTO} armors
     * @param {SheetDataHitpointsDTO} hitpoints
     * @param {SheetDataMovementDTO} movement
     * @param {SheetDataCarryingDTO} carrying
     * @param {SheetDataAbilitiesDTO} abilities
     * @param {SheetDataStancesDTO} stances
     * @param {SheetDataManeuversDTO} maneuvers
     * @param {SheetDataMagiciansDTO} magicians
     * @param {SheetDataSpellsDTO} spells
     * @param {SheetDataSkillsDTO} skills
     * @param {SheetDataValuablesDTO} valuables
     * @param {SheetDataEquipmentsDTO} equipments
     * @param {SheetDataFamiliarsDTO} familiars
     * @param {SheetDataStoryDTO} story
     * @param {SheetDataContactsDTO} contacts
     * @param {SheetDataNotesDTO} notes
     * @param {SheetDataDiceSetsDTO} diceSets
     */
    constructor(
        sheetVersion,
        basic,
        appearance,
        classes,
        attributes,
        rescues,
        attacks,
        weapons,
        combatManeuvers,
        initiative,
        inspiration,
        armors,
        hitpoints,
        movement,
        carrying,
        abilities,
        stances,
        maneuvers,
        magicians,
        spells,
        skills,
        valuables,
        equipments,
        familiars,
        story,
        contacts,
        notes,
        diceSets
    ) {
        this.sheetVersion = sheetVersion;
        this.basic = basic;
        this.appearance = appearance;
        this.classes = classes;
        this.attributes = attributes;
        this.rescues = rescues;
        this.attacks = attacks;
        this.weapons = weapons;
        this.combatManeuvers = combatManeuvers;
        this.initiative = initiative;
        this.inspiration = inspiration;
        this.armors = armors;
        this.hitpoints = hitpoints;
        this.movement = movement;
        this.carrying = carrying;
        this.abilities = abilities;
        this.stances = stances;
        this.maneuvers = maneuvers;
        this.magicians = magicians;
        this.spells = spells;
        this.skills = skills;
        this.valuables = valuables;
        this.equipments = equipments;
        this.familiars = familiars;
        this.story = story;
        this.contacts = contacts;
        this.notes = notes;
        this.diceSets = diceSets;
    }
}

class SheetManager {
    checkPenaltyHelper;

    sectionBasic;
    sectionAppearance;
    sectionClasses;
    sectionAttributes;
    sectionRescues;
    sectionAttacks;
    sectionWeapons;
    sectionCombatManeuvers;
    sectionInitiative;
    sectionInspiration;
    sectionArmors;
    sectionHitpoints;
    sectionMovement;
    sectionCarrying;
    sectionAbilities;
    sectionStances;
    sectionManeuvers;
    sectionMagicians;
    sectionSpells;
    sectionSkills;
    sectionValuables;
    sectionEquipments;
    sectionFamiliars;
    sectionStory;
    sectionContacts;
    sectionNotes;
    sectionDiceSets;

    FIELDID_IDENTIFIER = 'character-identifier';
    FIELDID_VERSION = 'character-version';

    constructor() {
        debug.log("Sheet class loaded");

        this.checkPenaltyHelper = new CheckPenaltyHelper(this);

        this.sectionBasic = new SheetSectionBasic(this);
        this.sectionAppearance = new SheetSectionAppearance(this);
        this.sectionClasses = new SheetSectionClasses(this);
        this.sectionAttributes = new SheetSectionAttributes(this);
        this.sectionRescues = new SheetSectionRescues(this);
        this.sectionAttacks = new SheetSectionAttacks(this);
        this.sectionWeapons = new SheetSectionWeapons(this);
        this.sectionCombatManeuvers = new SheetSectionCombatManeuvers(this);
        this.sectionInitiative = new SheetSectionInitiative(this);
        this.sectionInspiration = new SheetSectionInspiration(this);
        this.sectionArmors = new SheetSectionArmors(this);
        this.sectionHitpoints = new SheetSectionHitpoints(this);
        this.sectionMovement = new SheetSectionMovement(this);
        this.sectionCarrying = new SheetSectionCarrying(this);
        this.sectionAbilities = new SheetSectionAbilities(this);
        this.sectionStances = new SheetSectionStances(this);
        this.sectionManeuvers = new SheetSectionManeuvers(this);
        this.sectionMagicians = new SheetSectionMagicians(this);
        this.sectionSpells = new SheetSectionSpells(this);
        this.sectionSkills = new SheetSectionSkills(this);
        this.sectionValuables = new SheetSectionValuables(this);
        this.sectionEquipments = new SheetSectionEquipments(this);
        this.sectionFamiliars = new SheetSectionFamiliars(this);
        this.sectionStory = new SheetSectionStory(this);
        this.sectionContacts = new SheetSectionContacts(this);
        this.sectionNotes = new SheetSectionNotes(this);
        this.sectionDiceSets = new SheetSectionDiceSets(this);
    }

    /**
     * Prevents setting a numeric input to a value lower than 0
     * Must be placed first in "onchange" event
     *
     * @param {HTMLElement} element 
     */
    static preventNegativeValue(element) {
        debug.log("SheetManager.preventNegativeValue");

        if(element.value == '' || Number(element.value) < 0) {
            element.value = 0;
        }
    }

    /**
     * @returns {String}
     */
    getIdentifier() {
        let element = document.getElementById(this.FIELDID_IDENTIFIER);

        return element.value;
    }

    /**
     * @param {String}
     */
    setIdentifier(identifier) {
        let element = document.getElementById(this.FIELDID_IDENTIFIER);

        element.value = identifier;
    }

    /**
     * @returns {String}
     */
    getSheetVersion() {
        let element = document.getElementById(this.FIELDID_VERSION);

        return element.value;
    }

    /**
     * @param {String}
     */
    setSheetVersion(version) {
        let element = document.getElementById(this.FIELDID_VERSION);

        element.value = version;
    }

    /**
     * Returns all current sheet data
     * 
     * @returns {SheetData}
     */
    getData() {
        debug.log("SheetManager.getData");

        return new SheetData(
            this.getSheetVersion(),
            this.sectionBasic.getData(),
            this.sectionAppearance.getData(),
            this.sectionClasses.getData(),
            this.sectionAttributes.getData(),
            this.sectionRescues.getData(),
            this.sectionAttacks.getData(),
            this.sectionWeapons.getData(),
            this.sectionCombatManeuvers.getData(),
            this.sectionInitiative.getData(),
            this.sectionInspiration.getData(),
            this.sectionArmors.getData(),
            this.sectionHitpoints.getData(),
            this.sectionMovement.getData(),
            this.sectionCarrying.getData(),
            this.sectionAbilities.getData(),
            this.sectionStances.getData(),
            this.sectionManeuvers.getData(),
            this.sectionMagicians.getData(),
            this.sectionSpells.getData(),
            this.sectionSkills.getData(),
            this.sectionValuables.getData(),
            this.sectionEquipments.getData(),
            this.sectionFamiliars.getData(),
            this.sectionStory.getData(),
            this.sectionContacts.getData(),
            this.sectionNotes.getData(),
            this.sectionDiceSets.getData()
        );
    }

    /**
     * Set all sheet data
     * 
     * @param {SheetData} data 
     */
    setData(data) {
        debug.log("SheetManager.setData");

        this.setSheetVersion(data.sheetVersion);
        this.sectionBasic.setData(data.basic);
        this.sectionAppearance.setData(data.appearance);
        this.sectionClasses.setData(data.classes);
        this.sectionSkills.setData(data.skills); //Required early to be available for later sections inheritance
        this.sectionAttributes.setData(data.attributes);
        this.sectionRescues.setData(data.rescues);
        this.sectionAttacks.setData(data.attacks);
        this.sectionWeapons.setData(data.weapons);
        this.sectionCombatManeuvers.setData(data.combatManeuvers);
        this.sectionInitiative.setData(data.initiative);
        this.sectionInspiration.setData(data.inspiration);
        this.sectionArmors.setData(data.armors);
        this.sectionHitpoints.setData(data.hitpoints);
        this.sectionMovement.setData(data.movement);
        this.sectionCarrying.setData(data.carrying);
        this.sectionAbilities.setData(data.abilities);
        this.sectionStances.setData(data.stances);
        this.sectionManeuvers.setData(data.maneuvers);
        this.sectionMagicians.setData(data.magicians);
        this.sectionSpells.setData(data.spells);
        this.sectionValuables.setData(data.valuables);
        this.sectionEquipments.setData(data.equipments);
        this.sectionFamiliars.setData(data.familiars);
        this.sectionStory.setData(data.story);
        this.sectionContacts.setData(data.contacts);
        this.sectionNotes.setData(data.notes);
        this.sectionDiceSets.setData(data.diceSets);
    }

    /**
     * Remove all information from the current sheet for a new character
     */
    clearAll() {
        debug.log("SheetManager.clearAll");
        
        error.hide();

        let emptyData = new SheetData(
            characterManager.version,
            new SheetDataBasicDTO('', '', new SheetDataBasicRaceDTO(0, CharacterDataTables.getClassById(0).name), '', 0, 0, '', '', ''),
            new SheetDataAppearanceDTO('', 0, 0, 0, 0, new SheetDataAppearanceSizeCategoryDTO(0, CharacterDataTables.getSizeCategoryById(0).name), 0, '', ''),
            new SheetDataClassesDTO([], 0),
            new SheetDataAttributesDTO(
                new SheetDataAttributesAttributeDTO(0, 0, {}, 0, 0, 0, 0),
                new SheetDataAttributesAttributeDTO(0, 0, {}, 0, 0, 0, 0),
                new SheetDataAttributesAttributeDTO(0, 0, {}, 0, 0, 0, 0),
                new SheetDataAttributesAttributeDTO(0, 0, {}, 0, 0, 0, 0),
                new SheetDataAttributesAttributeDTO(0, 0, {}, 0, 0, 0, 0),
                new SheetDataAttributesAttributeDTO(0, 0, {}, 0, 0, 0, 0)
            ),
            new SheetDataRescuesDTO(
                new SheetDataRescuesRescueDTO(0, {}, 0, 0, 0, 0, []),
                new SheetDataRescuesRescueDTO(0, {}, 0, 0, 0, 0, []),
                new SheetDataRescuesRescueDTO(0, {}, 0, 0, 0, 0, []),
                ''
            ),
            new SheetDataAttacksDTO(
                new SheetDataAttacksAttackDTO(0, 0, 0, 0, 0, []),
                new SheetDataAttacksAttackDTO(0, 0, 0, 0, 0, [])
            ),
            new SheetDataWeaponsDTO([]),
            new SheetDataCombatManeuversDTO(
                new SheetDataCombatManeuversManeuverDTO(SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE, 0, 0, 0, 0, 0, 0, []),
                new SheetDataCombatManeuversManeuverDTO(SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE, 0, 0, 0, 0, 0, 0, [])
            ),
            new SheetDataInitiativeDTO(0, 0, 0, 0, []),
            new SheetDataInspirationDTO(0, 0),
            new SheetDataArmorsDTO(0, 0, 0, 0, 0, [], 0, 0, '', []),
            new SheetDataHitpointsDTO(0, 0, [], 0, 0, 0, 0, [], 0, [], 0, ''),
            new SheetDataMovementDTO(0, [], 0, false, 0, 0, 0, 0, 0, 0, 0, 0),
            new SheetDataCarryingDTO(new SheetDataCarryingStageListDTO(), 0, 0, 0, [], 0),
            new SheetDataAbilitiesDTO([]),
            new SheetDataStancesDTO([], 0),
            new SheetDataManeuversDTO([], 0, 0),
            new SheetDataMagiciansDTO([]),
            new SheetDataSpellsDTO([]),
            new SheetDataSkillsDTO(0, 0, 0, 0, [], new SheetDataSkillsSkillGroupDTO(0, CharacterDataTables.getSkillGroupById(0).name), null),
            new SheetDataValuablesDTO(new SheetDataValuablesCoinListDTO(), 0, 0, [], 0, 0, 0),
            new SheetDataEquipmentsDTO(new SheetDataEquipmentsLocationListDTO()),
            new SheetDataFamiliarsDTO([]),
            new SheetDataStoryDTO(''),
            new SheetDataContactsDTO([]),
            new SheetDataNotesDTO(''),
            new SheetDataDiceSetsDTO([])
        );

        this.setIdentifier(null);
        this.setData(emptyData);
    }

    prepareDummyData() {
        debug.log("prepareDummyData");

        // ######### Section: Basic
        let sheetDataBasicRace = new SheetDataBasicRaceDTO(4/*, 'Drow'*/);

        let sheetDataBasic = new SheetDataBasicDTO(
            'Nendra Sturmbart',
            'Christian',
            sheetDataBasicRace,
            'Unbekannt',
            6500,
            14000,
            'Neutral',
            '-',
            'Handelssprache, Zwergisch, Elfisch'
        );


        // ######### Section: Appearance
        let sheetDataAppearanceSizeCategory = new SheetDataAppearanceSizeCategoryDTO(5/*, 'Mittel'*/);

        let sheetDataAppearance = new SheetDataAppearanceDTO(
            'Weiblich',
            55,
            0,
            55,
            1.72,
            sheetDataAppearanceSizeCategory,
            57,
            'Gelb',
            'Weiß'
        );


        // ######### Section: Classes
        let sheetDataClassesClassClass_1 = new SheetDataClassesClassClassDTO(29/*, 'Schwertmeister'*/);
        let sheetDataClassesClassClass_2 = new SheetDataClassesClassClassDTO(4/*, 'Hexenmeister'*/); //ToDo, nur zum testen, muss entfernt werden

        let sheetDataClassesClass_1 = new SheetDataClassesClassDTO(5, sheetDataClassesClassClass_1);
        let sheetDataClassesClass_2 = new SheetDataClassesClassDTO(2, sheetDataClassesClassClass_2); //ToDo, nur zum testen, muss entfernt werden

        let sheetDataClasses = new SheetDataClassesDTO([sheetDataClassesClass_1, sheetDataClassesClass_2], 7);


        // ######### Section: Attributes
        let sheetDataAttributesAttribute_Strength = new SheetDataAttributesAttributeDTO(16,16,{},3,0,0,0);
        let sheetDataAttributesAttribute_Dexterity = new SheetDataAttributesAttributeDTO(17,19,{},4,0,0,2);
        let sheetDataAttributesAttribute_Constitution = new SheetDataAttributesAttributeDTO(14,12,{},1,0,0,-2);
        let sheetDataAttributesAttribute_Intelligence = new SheetDataAttributesAttributeDTO(13,14,{},2,1,0,0);
        let sheetDataAttributesAttribute_Wisdom = new SheetDataAttributesAttributeDTO(17,17,{},3,0,0,0);
        let sheetDataAttributesAttribute_Charisma = new SheetDataAttributesAttributeDTO(16,18,{},4,0,0,2);

        let sheetDataAttributes = new SheetDataAttributesDTO(
            sheetDataAttributesAttribute_Strength,
            sheetDataAttributesAttribute_Dexterity,
            sheetDataAttributesAttribute_Constitution,
            sheetDataAttributesAttribute_Intelligence,
            sheetDataAttributesAttribute_Wisdom,
            sheetDataAttributesAttribute_Charisma
        );


        // ######### Section: Rescues
        let sheetDataRescuesRescueOtherModifier_RaceAbilityAgainstMagic = new SheetDataOtherModifierDTO(false, 'Rassenfähigkeit gegen Verzaubern', 2);
        let sheetDataRescuesRescueOtherModifier_Dunkelzahn = new SheetDataOtherModifierDTO(true, 'Dunkelzahn', 1);
        
        let sheetDataRescuesRescue_Reflex = new SheetDataRescuesRescueDTO(6,{},4,4,0,0,[sheetDataRescuesRescueOtherModifier_RaceAbilityAgainstMagic, sheetDataRescuesRescueOtherModifier_Dunkelzahn]);
        let sheetDataRescuesRescue_Will = new SheetDataRescuesRescueDTO(8,{},4,3,0,0,[sheetDataRescuesRescueOtherModifier_RaceAbilityAgainstMagic, sheetDataRescuesRescueOtherModifier_Dunkelzahn]);
        let sheetDataRescuesRescue_fortitude = new SheetDataRescuesRescueDTO(3,{},1,1,0,0,[sheetDataRescuesRescueOtherModifier_RaceAbilityAgainstMagic, sheetDataRescuesRescueOtherModifier_Dunkelzahn]);

        let sheetDataRescues = new SheetDataRescuesDTO(
            sheetDataRescuesRescue_Reflex,
            sheetDataRescuesRescue_Will,
            sheetDataRescuesRescue_fortitude,
            '+2 Rettungswurf gegen Verzaubern'
        );


        // ######### Section: Attacks
        let sheetDataAttacksAttackOtherModifier_RaceBonus = new SheetDataOtherModifierDTO(true, 'RassenBonus', 1);
        let sheetDataAttacksAttackOtherModifier_TwoWeaponFighting = new SheetDataOtherModifierDTO(false, 'Two-Weapon Fighting', -2);
        let sheetDataAttacksAttackOtherModifier_WeaponFocus = new SheetDataOtherModifierDTO(true, 'Weapon Focus (Shadow Hand)', 1);
        let sheetDataAttacksAttackOtherModifier_Dunkelzahn = new SheetDataOtherModifierDTO(true, 'Dunkelzahn', 1);

        let sheetDataAttacksAttack_Close = new SheetDataAttacksAttackDTO(10,4,3,0,3,[sheetDataAttacksAttackOtherModifier_RaceBonus, sheetDataAttacksAttackOtherModifier_TwoWeaponFighting, sheetDataAttacksAttackOtherModifier_WeaponFocus, sheetDataAttacksAttackOtherModifier_Dunkelzahn]);
        let sheetDataAttacksAttack_Distance = new SheetDataAttacksAttackDTO(8,4,4,0,0,[]);

        let sheetDataAttacks = new SheetDataAttacksDTO(
            sheetDataAttacksAttack_Close,
            sheetDataAttacksAttack_Distance
        );


        // ######### Section: Weapons
        let sheetDataWeaponsAmmo_Komposit_Kurzbogen = new SheetDataWeaponsAmmoDTO(
            20,
            20,
            'Pfeil'
        );

        let sheetDataWeaponsWeapon_Dunkelzahn = new SheetDataWeaponsWeaponDTO(
            SheetSectionAttacks.ATTACK_TYPE_CLOSE,
            true,
            'Dunkelzahn',
            'Mythril-Kurzschwert (Stich)',
            '+3 (Stärke)            +3 (Insightful Strike)            +3 (Underdark)            +1 (WeaponFocus) (+1 Angriff/Schaden, im Underdark +3) magisch, leuchtet, +1 auf alle Rettungswürf, ermöglicht es böses zu spüren im Umkreis von 30m (Update: Auch ohne die Waffe in der Hand zu halten), +2d6 Schaden gegen Böse, enthält Silber → Vampire können nicht regenerieren  (Drowforged)',
            'Mittel',
            0,
            2,
            9,
            '1W6',
            '19-20/x2',
            null
        );
        let sheetDataWeaponsWeapon_Komposit_Kurzbogen = new SheetDataWeaponsWeaponDTO(
            SheetSectionAttacks.ATTACK_TYPE_DISTANCE,
            false,
            'Komposit Kurzbogen',
            'Stich',
            '',
            'Mittel',
            70,
            2,
            7,
            '1W6',
            'x3',
            sheetDataWeaponsAmmo_Komposit_Kurzbogen
        );
        let sheetDataWeaponsWeapon_KytonArmor = new SheetDataWeaponsWeaponDTO(
            SheetSectionAttacks.ATTACK_TYPE_CLOSE,
            true,
            'Kyton Rüstung Kettenglieder',
            'Stich',
            'Wenn du sie aktivierst, führt eine der fünf baumelnden Ketten einen Nahkampfangriff (mit deinem Grundangriffsbonus) gegen eine benachbarte Kreatur deiner Wahl aus. Die Kette verursacht 1d6 Punkte Hiebschaden (kein Str-Bonus auf Schaden) und wird wie eine magische Waffe mit einem Verbesserungsbonus behandelt, der dem Verbesserungsbonus (2) der Rüstung auf AC entspricht.',
            'Klein',
            0,
            0,
            9,
            '1W6+2',
            '',
            null
        );

        let sheetDataWeapons = new SheetDataWeaponsDTO([
            sheetDataWeaponsWeapon_Dunkelzahn,
            sheetDataWeaponsWeapon_Komposit_Kurzbogen,
            sheetDataWeaponsWeapon_KytonArmor
        ]);


        // ######### Section: CombatManeuvers
        let sheetDataCombatManeuversOtherModifier_Stuned = new SheetDataOtherModifierDTO(false, 'Betäubter Gegner', 4, false, false, true, true);
        let sheetDataCombatManeuversOtherModifier_FlatFooted = new SheetDataOtherModifierDTO(false, 'Niedergeschlagen', -4, false, false, true, true);
        let sheetDataCombatManeuversOtherModifier_AC_Dodge = new SheetDataOtherModifierDTO(true, 'Rüstung: Ausweichen', 4, false, true, true, true);
        let sheetDataCombatManeuversOtherModifier_AC_Deflection = new SheetDataOtherModifierDTO(true, 'Rüstung: Ablenken', 4, false, true, true, true);
        let sheetDataCombatManeuversOtherModifier_AC_Sacred  = new SheetDataOtherModifierDTO(true, 'Rüstung: Un-/Heilig', 4, false, true, true, true);
        let sheetDataCombatManeuversOtherModifier_AC_Luck = new SheetDataOtherModifierDTO(true, 'Rüstung: Glück', 4, false, true, true, true);
        let sheetDataCombatManeuversOtherModifier_AC_Morale = new SheetDataOtherModifierDTO(true, 'Rüstung: Moral', 4, false, true, true, true);
        
        let sheetDataCombatManeuversOtherModifier_RaceBonus = new SheetDataOtherModifierDTO(true, 'RassenBonus', 1);
        let sheetDataCombatManeuversOtherModifier_TwoWeaponFighting = new SheetDataOtherModifierDTO(false, 'Two-Weapon Fighting', -2);
        let sheetDataCombatManeuversOtherModifier_WeaponFocus = new SheetDataOtherModifierDTO(false, 'Weapon Focus (Shadow Hand)', 1);
        let sheetDataCombatManeuversOtherModifier_Dunkelzahn = new SheetDataOtherModifierDTO(false, 'Dunkelzahn', 1);

        let sheetDataCombatManeuvers_Offensive = new SheetDataCombatManeuversManeuverDTO(SheetSectionCombatManeuvers.COMBAT_TYPE_OFFENSIVE,7,4,3,4,0,1,
            [
                sheetDataCombatManeuversOtherModifier_Stuned,

                sheetDataCombatManeuversOtherModifier_RaceBonus,
                sheetDataCombatManeuversOtherModifier_TwoWeaponFighting,
                sheetDataCombatManeuversOtherModifier_WeaponFocus,
                sheetDataCombatManeuversOtherModifier_Dunkelzahn
            ]
        );
        let sheetDataCombatManeuvers_Defensive = new SheetDataCombatManeuversManeuverDTO(SheetSectionCombatManeuvers.COMBAT_TYPE_DEFENSIVE,7,4,3,4,0,1,
            [
                sheetDataCombatManeuversOtherModifier_FlatFooted,
                sheetDataCombatManeuversOtherModifier_AC_Dodge,
                sheetDataCombatManeuversOtherModifier_AC_Deflection,
                sheetDataCombatManeuversOtherModifier_AC_Sacred,
                sheetDataCombatManeuversOtherModifier_AC_Luck,
                sheetDataCombatManeuversOtherModifier_AC_Morale,

                sheetDataCombatManeuversOtherModifier_RaceBonus,
                sheetDataCombatManeuversOtherModifier_TwoWeaponFighting,
                sheetDataCombatManeuversOtherModifier_WeaponFocus,
                sheetDataCombatManeuversOtherModifier_Dunkelzahn
            ]
        );

        let sheetDataCombatManeuvers = new SheetDataCombatManeuversDTO(
            sheetDataCombatManeuvers_Offensive,
            sheetDataCombatManeuvers_Defensive
        );


        // ######### Section: Initiative
        let sheetDataInitiativeOtherModifier_ClassBonus = new SheetDataOtherModifierDTO(true, 'Schwertmeister Level 5 (Quick to act Stufe 2)', 2);
        let sheetDataInitiativeOtherModifier_RingOfBattle = new SheetDataOtherModifierDTO(true, 'Ring of Battle', 2);

        let sheetDataInitiative = new SheetDataInitiativeDTO(8,4,0,4,[sheetDataInitiativeOtherModifier_ClassBonus, sheetDataInitiativeOtherModifier_RingOfBattle]);


        // ######### Section: Inspiration
        let sheetDataInspiration = new SheetDataInspirationDTO(2,3);
        

        // ######### Section: Armors
        let sheetDataArmorsOtherModifier_Dexterity = new SheetDataOtherModifierDTO(true, 'Geschicklichkeit', 4, false, true, true, true);
        let sheetDataArmorsOtherModifier_Size = new SheetDataOtherModifierDTO(true, 'Größe', 0, false, true, true, true);
        let sheetDataArmorsOtherModifier_Natural = new SheetDataOtherModifierDTO(true, 'Natürlich', 1, false, true, true);
        let sheetDataArmorsOtherModifier_Dodge = new SheetDataOtherModifierDTO(true, 'Ausweichen', 1, false, true, true);
        let sheetDataArmorsOtherModifier_Deflection = new SheetDataOtherModifierDTO(true, 'Ablenkung', 0, false, true, true);
        let sheetDataArmorsOtherModifier_UnHoly = new SheetDataOtherModifierDTO(true, 'Un-/Heilig', 0, false, true, true);
        let sheetDataArmorsOtherModifier_Luck = new SheetDataOtherModifierDTO(true, 'Glück', 0, false, true, true);
        let sheetDataArmorsOtherModifier_Moral = new SheetDataOtherModifierDTO(true, 'Moral', 0, false, true, true);
        let sheetDataArmorsOtherModifier_RaceBonus = new SheetDataOtherModifierDTO(true, 'Rassenbonus (Weisheits Modifikator)', 3);
        
        let sheetDataArmorsOtherModifier_List = [
            sheetDataArmorsOtherModifier_Dexterity,
            sheetDataArmorsOtherModifier_Size,
            sheetDataArmorsOtherModifier_Natural,
            sheetDataArmorsOtherModifier_Dodge,
            sheetDataArmorsOtherModifier_Deflection,
            sheetDataArmorsOtherModifier_UnHoly,
            sheetDataArmorsOtherModifier_Luck,
            sheetDataArmorsOtherModifier_Moral,
            sheetDataArmorsOtherModifier_RaceBonus,
        ];

        let sheetDataArmorsArmor_BeschlagenesLeder = new SheetDataArmorsArmorDTO(
            SheetSectionArmors.ARMOR_TYPE_BODY,
            false,
            'Beschlagenes Leder (Meisterlich)',
            new SheetSectionArmorsArmorStyleDTO(1, 'Leichte Rüstung'),
            '',
            3,
            0,
            5,
            15
        );

        let sheetDataArmorsArmor_KytonArmor = new SheetDataArmorsArmorDTO(
            SheetSectionArmors.ARMOR_TYPE_BODY,
            true,
            'Kyton Rüstung',
            new SheetSectionArmorsArmorStyleDTO(1, 'Leichte Rüstung'),
            '- Diese Rüstung aus schwarzen Kettengliedern ist offensichtlich stark beansprucht worden: Fünf lange Kettenstücke, an denen hässlich aussehende Widerhaken und kleine Klingen befestigt sind, haben sich gelöst und baumeln nun frei von der Unterseite des Bruststücks. \
            - Diese Rüstung funktioniert wie ein +1 Mithralhemd. Wenn du sie aktivierst, führt eine der fünf baumelnden Ketten einen Nahkampfangriff (mit deinem Grundangriffsbonus) gegen eine benachbarte Kreatur deiner Wahl aus. Die Kette verursacht 1d6 Punkte Hiebschaden (kein Str-Bonus auf Schaden) und wird wie eine magische Waffe mit einem Verbesserungsbonus behandelt, der dem Verbesserungsbonus (2) der Rüstung auf AC entspricht.',
            5,
            0,
            5,
            10
        );

        let sheetDataArmors_List = [
            sheetDataArmorsArmor_BeschlagenesLeder,
            sheetDataArmorsArmor_KytonArmor
        ];

        let sheetDataArmors = new SheetDataArmorsDTO(23,10,5,0,8,sheetDataArmorsOtherModifier_List, 18,19,'6 + Level = 11 Spellresistence, Sonstige = WeisheitsMod', sheetDataArmors_List);


        // ######### Section: Hitpoints
            let sheetDataHitpointsInjuriesModifier_D4 = new SheetDataBaseModifierDTO(0, 'D4', 0);
            let sheetDataHitpointsInjuriesModifier_D6 = new SheetDataBaseModifierDTO(1, 'D6', 0);
            let sheetDataHitpointsInjuriesModifier_D8 = new SheetDataBaseModifierDTO(2, 'D8', 40);
            let sheetDataHitpointsInjuriesModifier_D10 = new SheetDataBaseModifierDTO(3, 'D10', 0);
            let sheetDataHitpointsInjuriesModifier_D12 = new SheetDataBaseModifierDTO(4, 'D12', 0);
            
            let baseModifiers = [
                sheetDataHitpointsInjuriesModifier_D4,
                sheetDataHitpointsInjuriesModifier_D6,
                sheetDataHitpointsInjuriesModifier_D8,
                sheetDataHitpointsInjuriesModifier_D10,
                sheetDataHitpointsInjuriesModifier_D12
            ];

            let sheetDataHitpointsInjuriesModifier_Regular = new SheetDataOtherModifierDTO(true, 'Allgemeiner Schaden', 16, false, true, true);
            
            let injuriesModifier = [
                sheetDataHitpointsInjuriesModifier_Regular
            ];

        let sheetDataHitpoints = new SheetDataHitpointsDTO(45,40,baseModifiers,5,1,5,0,{},16,injuriesModifier,29,'');


        // ######### Section: Movement
        let sheetDataMovement = new SheetDataMovementDTO(0, [], 9, false, 9, 4.5, 18, 9, 4, 36, 36, 0);


        // ######### Section: Carrying
        let sheetDataCarryingStage_light = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_LIGHT, true, 0, 76, SheetDataCarryingStageListDTO.LIGHT_MAX_DEXTERITY, SheetDataCarryingStageListDTO.LIGHT_CHECK_PENALTY, SheetDataCarryingStageListDTO.LIGHT_RUNNING_MULTIPLIER);
        let sheetDataCarryingStage_medium = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_MEDIUM, false, 77, 153, SheetDataCarryingStageListDTO.MEDIUM_MAX_DEXTERITY, SheetDataCarryingStageListDTO.MEDIUM_CHECK_PENALTY, SheetDataCarryingStageListDTO.MEDIUM_RUNNING_MULTIPLIER);
        let sheetDataCarryingStage_heavy = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_HEAVY, false, 154, 230, SheetDataCarryingStageListDTO.HEAVY_MAX_DEXTERITY, SheetDataCarryingStageListDTO.HEAVY_CHECK_PENALTY, SheetDataCarryingStageListDTO.HEAVY_RUNNING_MULTIPLIER);
        let sheetDataCarryingStage_overload = new SheetDataCarryingStageDTO(SheetDataCarryingStageListDTO.STAGE_OVERLOAD, false, 231, SheetDataCarryingStageListDTO.DEFAULT_OVERLOAD_MAX, SheetDataCarryingStageListDTO.OVERLOAD_MAX_DEXTERITY, SheetDataCarryingStageListDTO.OVERLOAD_CHECK_PENALTY, SheetDataCarryingStageListDTO.OVERLOAD_RUNNING_MULTIPLIER);

        let sheetDataCarryingStageList = new SheetDataCarryingStageListDTO(sheetDataCarryingStage_light, sheetDataCarryingStage_medium, sheetDataCarryingStage_heavy, sheetDataCarryingStage_overload);
        let sheetDataCarryingWeights = new SheetDataCarryingWeightsDTO(3, 0, 37, 8, 20.5, 0);
        let sheetDataCarrying = new SheetDataCarryingDTO(sheetDataCarryingStageList, 230, 460, 1150, sheetDataCarryingWeights, 68.5);


        // ######### Section: Abilities
        let sheetDataAbilitiesAbility_1 = new SheetDataAbilitiesAbilityDTO('Two-Weapon Fighting', '-2 Angriff auf beide Waffen');
        let sheetDataAbilitiesAbility_2 = new SheetDataAbilitiesAbilityDTO('Dodge', '+1 AC (ArmorCheck)');
        let sheetDataAbilitiesAbility_3 = new SheetDataAbilitiesAbilityDTO('Rapid Assault', 'In the first round of combat, your melee attacks deal an extra 1d6 points of damage.');
        let sheetDataAbilitiesAbility_4 = new SheetDataAbilitiesAbilityDTO('Sudden Recovery', 'Once per day as a swift action, you can instantly recover an expended maneuver. It is now ready again.');
        let sheetDataAbilitiesAbility_5 = new SheetDataAbilitiesAbilityDTO('Vital Recovery', 'When you recover one or more expended maneuvers, you heal 3 points of damage + 1 point per character level. You can gain this benefit only once per encounter.');
        let sheetDataAbilitiesAbility_6 = new SheetDataAbilitiesAbilityDTO('Weapon Focus (Shadow Hand)', '+1 bonus on attack rolls with: dagger, short sword, sai, siangham, unarmed strike, and spiked chain.');
        let sheetDataAbilitiesAbility_7 = new SheetDataAbilitiesAbilityDTO('Insightful Strike (Tiger Claw)', 'Schaden + Weisheitsmodifikator (aktuell: 3) bei Strikes');
        let sheetDataAbilitiesAbility_8 = new SheetDataAbilitiesAbilityDTO('Dunkelsicht (120 ft.)', '');
        let sheetDataAbilitiesAbility_9 = new SheetDataAbilitiesAbilityDTO('Light Blindness', '1 Runde Blind, wenn geblendet');
        let sheetDataAbilitiesAbility_10 = new SheetDataAbilitiesAbilityDTO('Two-Weapon Defence', 'When wielding a double weapon or two weapons (not including natural weapons or unarmed strikes), you gain a +1 shield bonus to your AC. When you are fighting defensively or using the total defense action, this shield bonus increases to +2.');
        let sheetDataAbilities = new SheetDataAbilitiesDTO([
            sheetDataAbilitiesAbility_1,
            sheetDataAbilitiesAbility_2,
            sheetDataAbilitiesAbility_3,
            sheetDataAbilitiesAbility_4,
            sheetDataAbilitiesAbility_5,
            sheetDataAbilitiesAbility_6,
            sheetDataAbilitiesAbility_7,
            sheetDataAbilitiesAbility_8,
            sheetDataAbilitiesAbility_9,
            sheetDataAbilitiesAbility_10
        ]);


        // ######### Section: Stances
        let sheetDataStancesStance_1 = new SheetDataStancesStanceDTO(true, 'Island of Blades', 'Level 1 - You and allies flank all adjacent foes');
        let sheetDataStancesStance_2 = new SheetDataStancesStanceDTO(false, 'Stonefoot Stance', 'Level 1 - +2 bonus on Strength checks, +2 bonus to AC (ArmorCheck) against larger foes.');
        let sheetDataStancesStance_3 = new SheetDataStancesStanceDTO(false, 'Dance of the Spider', 'Level 3 - You climb walls like a spider..');
        
        let sheetDataStances = new SheetDataStancesDTO(
            [
                sheetDataStancesStance_1,
                sheetDataStancesStance_2,
                sheetDataStancesStance_3
            ],
            3
        );


        // ######### Section: Maneuvers
        let sheetDataManeuversManeuverState_Default = new SheetDataManeuversManeuverStateDTO(0, '-');
        let sheetDataManeuversManeuverState_Prepared = new SheetDataManeuversManeuverStateDTO(1, 'Vorbereitet');

        let sheetDataManeuversManeuver_1 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Default, 'Strike - Clinging Shadow Strike', 'Clinging Shadow Strike', '', 'Level 1 - Foe suffers 20% miss chance on attacks.');
        let sheetDataManeuversManeuver_2 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Default, 'Strike - Shadow Blade Technique', 'Shadow Blade Technique', '', 'Level 1 - Roll two attacks, use lower result to deal bonus cold damage.');
        let sheetDataManeuversManeuver_3 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Prepared, 'Boost - Burning Blade', ' Burning Blade', '1D6+5', 'Level 1 - Deal 1d6 fire + 1/initiator level.');
        let sheetDataManeuversManeuver_4 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Default, 'Boost - Distracting Ember', 'Distracting Ember', '', 'Level 1 - Fire elemental appears, flanks enemy.');
        let sheetDataManeuversManeuver_5 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Prepared, 'Strike - Wolf Fang Strike', 'Wolf Fang Strike', '', 'Level 1 - Attack with two weapons.');
        let sheetDataManeuversManeuver_6 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Default, 'Strike - Blistering Flourish', 'Blistering Flourish', '', 'Level 1 - Dazzle creatures around you.');
        let sheetDataManeuversManeuver_7 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Prepared, 'Strike - Stone Bones', 'Stone Bones', '', 'Level 1 - Gain DR 5/adamantine.');
        let sheetDataManeuversManeuver_8 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Prepared, 'Strike - Mountain Hammer', ' Mountain Hammer', '2D6', 'Level 2 - Deal +2d6 damage, overcome DR and hardness.');
        let sheetDataManeuversManeuver_9 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Prepared, 'Strike - Claw at the Moon', 'Claw at the Moon', '2D6', 'Level 2 - Make Jump check, deal +2d6 damage.');
        let sheetDataManeuversManeuver_10 = new SheetDataManeuversManeuverDTO(sheetDataManeuversManeuverState_Prepared, 'Strike - Shadow Garrote', 'Shadow Garrote', '5D6', 'Level 2 - Ranged touch attack deals 5d6 points of damage.');
        
        let sheetDataManeuvers = new SheetDataManeuversDTO(
            [
                sheetDataManeuversManeuver_1,
                sheetDataManeuversManeuver_2,
                sheetDataManeuversManeuver_3,
                sheetDataManeuversManeuver_4,
                sheetDataManeuversManeuver_5,
                sheetDataManeuversManeuver_6,
                sheetDataManeuversManeuver_7,
                sheetDataManeuversManeuver_8,
                sheetDataManeuversManeuver_9,
                sheetDataManeuversManeuver_10
            ],
            11,
            6
        );
        
        
        // ######### Section: Magicians
        let sheetDataMagiciansMagicianClass_Arcanist = new SheetDataMagiciansMagicianClassDTO(24, 'Arkanist', 15);
        
        let sheetDataMagiciansMagicianAttribute_Intelligence = new SheetDataMagiciansMagicianAttributeDTO(4, 'IN', 14, 7);
        
        let sheetDataMagiciansMagicianGrade_0 = new SheetDataMagiciansMagicianGradeDTO(0, 4, 4, 9, 10, 17);
        let sheetDataMagiciansMagicianGrade_1 = new SheetDataMagiciansMagicianGradeDTO(1, 4, 4, 5, 11, 18);
        let sheetDataMagiciansMagicianGrade_2 = new SheetDataMagiciansMagicianGradeDTO(2, 4, 4, 5, 12, 19);
        let sheetDataMagiciansMagicianGrade_3 = new SheetDataMagiciansMagicianGradeDTO(3, 4, 4, 4, 13, 20);
        let sheetDataMagiciansMagicianGrade_4 = new SheetDataMagiciansMagicianGradeDTO(4, 4, 4, 4, 14, 21);
        let sheetDataMagiciansMagicianGrade_5 = new SheetDataMagiciansMagicianGradeDTO(5, 4, 4, 4, 15, 22);
        let sheetDataMagiciansMagicianGrade_6 = new SheetDataMagiciansMagicianGradeDTO(6, 4, 4, 3, 16, 23);
        let sheetDataMagiciansMagicianGrade_7 = new SheetDataMagiciansMagicianGradeDTO(7, 3, 3, 2, 17, 24);
        let sheetDataMagiciansMagicianGrade_8 = new SheetDataMagiciansMagicianGradeDTO(8, 0, 0, 0, 18, 25);
        let sheetDataMagiciansMagicianGrade_9 = new SheetDataMagiciansMagicianGradeDTO(9, 0, 0, 0, 19, 26);

        let sheetDataMagiciansMagician_Arcanist = new SheetDataMagiciansMagicianDTO(
            sheetDataMagiciansMagicianClass_Arcanist,
            sheetDataMagiciansMagicianAttribute_Intelligence,
            '',
            [
                sheetDataMagiciansMagicianGrade_0,
                sheetDataMagiciansMagicianGrade_1,
                sheetDataMagiciansMagicianGrade_2,
                sheetDataMagiciansMagicianGrade_3,
                sheetDataMagiciansMagicianGrade_4,
                sheetDataMagiciansMagicianGrade_5,
                sheetDataMagiciansMagicianGrade_6,
                sheetDataMagiciansMagicianGrade_7,
                sheetDataMagiciansMagicianGrade_8,
                sheetDataMagiciansMagicianGrade_9
            ]
        );

        let sheetDataMagicians = new SheetDataMagiciansDTO([sheetDataMagiciansMagician_Arcanist]);

        
        // ######### Section: Spells
        let sheetDataSpellsSpellState_Default = new SheetDataSpellsSpellStateDTO(0, '-');
        let sheetDataSpellsSpellState_Prepared = new SheetDataSpellsSpellStateDTO(1, 'Vorbereitet');

        let sheetDataSpellsSpellClass_Arcanist = new SheetDataSpellsSpellClassDTO(24, 'Arkanist');

        let sheetDataSpellsSpell_1 = new SheetDataSpellsSpellDTO(0, sheetDataSpellsSpellState_Prepared, sheetDataSpellsSpellClass_Arcanist, 'Detect Magic', 'Detects spells and magic items within 60 ft.');
        let sheetDataSpellsSpell_2 = new SheetDataSpellsSpellDTO(0, sheetDataSpellsSpellState_Prepared, sheetDataSpellsSpellClass_Arcanist, 'Resistance', 'Subject gains +1 on saving throws.');
        let sheetDataSpellsSpell_3 = new SheetDataSpellsSpellDTO(1, sheetDataSpellsSpellState_Prepared, sheetDataSpellsSpellClass_Arcanist, 'Shield', 'Invisible disc gives +4 to AC, blocks magic missiles.');
        let sheetDataSpellsSpell_4 = new SheetDataSpellsSpellDTO(1, sheetDataSpellsSpellState_Prepared, sheetDataSpellsSpellClass_Arcanist, 'Mage Armor', 'Gives subject +4 armor bonus. (Spellmastry)');
        let sheetDataSpellsSpell_5 = new SheetDataSpellsSpellDTO(1, sheetDataSpellsSpellState_Default, sheetDataSpellsSpellClass_Arcanist, 'Comprehend Languages', 'You understand all spoken and written languages.');
        let sheetDataSpellsSpell_6 = new SheetDataSpellsSpellDTO(2, sheetDataSpellsSpellState_Default, sheetDataSpellsSpellClass_Arcanist, 'Darkness', '20-ft. radius of supernatural shadow.');
        let sheetDataSpellsSpell_7 = new SheetDataSpellsSpellDTO(2, sheetDataSpellsSpellState_Prepared, sheetDataSpellsSpellClass_Arcanist, 'Mirror Image', 'Creates decoy duplicates of you (1d4 +1 per three levels, max 8).');
        
        let sheetDataSpells = new SheetDataSpellsDTO(
            [
                sheetDataSpellsSpell_1,
                sheetDataSpellsSpell_2,
                sheetDataSpellsSpell_3,
                sheetDataSpellsSpell_4,
                sheetDataSpellsSpell_5,
                sheetDataSpellsSpell_6,
                sheetDataSpellsSpell_7,
            ]
        );


        // ######### Section: Skills
        //let sheetDataSkillsSkillGroup = new SheetDataSkillsSkillGroupDTO(0, '-');
        let sheetDataSkillsSkillGroup = new SheetDataSkillsSkillGroupDTO(2, 'Open Gaming Network');

        let sheetDataSkillsLevelModifier_1 = new SheetDataOtherModifierDTO(true, 'Level 1', 7);
        let sheetDataSkillsLevelModifier_2 = new SheetDataOtherModifierDTO(true, 'Level 2', 7);
        let sheetDataSkillsLevelModifier_3 = new SheetDataOtherModifierDTO(true, 'Level 3', 7);
        let sheetDataSkillsLevelModifier_4 = new SheetDataOtherModifierDTO(true, 'Level 4', 8);
        let sheetDataSkillsLevelModifier_5 = new SheetDataOtherModifierDTO(true, 'Level 5', 8);

        let sheetDataSkillsSkillAttribute_Strength = new SheetSectionSkillsSkillAttributeDTO(1, 'ST', 3);
        let sheetDataSkillsSkillAttribute_Dexterity = new SheetSectionSkillsSkillAttributeDTO(2, 'GE', 4);
        let sheetDataSkillsSkillAttribute_Constitution = new SheetSectionSkillsSkillAttributeDTO(3, 'KO', 1);
        let sheetDataSkillsSkillAttribute_Intelligence = new SheetSectionSkillsSkillAttributeDTO(4, 'IN', 2);
        let sheetDataSkillsSkillAttribute_Wisdom = new SheetSectionSkillsSkillAttributeDTO(5, 'WE', 3);
        let sheetDataSkillsSkillAttribute_Charisma = new SheetSectionSkillsSkillAttributeDTO(6, 'CH', 4);

        let sheetDataSkillsSkill_Akrobatik = new SheetDataSkillsSkillDTO(44, true, 12, {}, sheetDataSkillsSkillAttribute_Dexterity, 5, 0, []);
        let sheetDataSkillsSkill_Auftreten = new SheetDataSkillsSkillDTO(2, false, 4, {}, sheetDataSkillsSkillAttribute_Charisma, 3, 0, []);
        let sheetDataSkillsSkill_Einschüchtern = new SheetDataSkillsSkillDTO(8, true, 12, {}, sheetDataSkillsSkillAttribute_Charisma, 5, 0, []);
        let sheetDataSkillsSkill_Heilkunde = new SheetDataSkillsSkillDTO(14, true, 11, {}, sheetDataSkillsSkillAttribute_Wisdom, 5, 0, []);
        let sheetDataSkillsSkill_Wahrnehmung = new SheetDataSkillsSkillDTO(61, true, 10, {}, sheetDataSkillsSkillAttribute_Wisdom, 3, 2, [
            new SheetDataOtherModifierDTO(true, 'Rassenbonus', 2)
        ]);

        let sheetDataSkills = new SheetDataSkillsDTO(69, 69, 32, 37,
            [
                sheetDataSkillsLevelModifier_1,
                sheetDataSkillsLevelModifier_2,
                sheetDataSkillsLevelModifier_3,
                sheetDataSkillsLevelModifier_4,
                sheetDataSkillsLevelModifier_5
            ],
            sheetDataSkillsSkillGroup,
            [
                sheetDataSkillsSkill_Akrobatik,
                sheetDataSkillsSkill_Auftreten,
                sheetDataSkillsSkill_Einschüchtern,
                sheetDataSkillsSkill_Heilkunde,
                sheetDataSkillsSkill_Wahrnehmung
            ]
        );


        // ######### Section: Valuables
        let sheetDataValuables = new SheetDataValuablesDTO(
            new SheetDataValuablesCoinListDTO(
                new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_PLATINUM, 0, 0),
                new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_GOLD, 103, 2),
                new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_SILVER, 0, 0),
                new SheetDataValuablesCoinDTO(SheetDataValuablesCoinListDTO.COIN_COPPER, 50, 1)
            ),
            153,
            3,
            [],
            0,
            0,
            0
        );


        // ######### Section: Equipments
        let sheetDataEquipmentsItem_1 = new SheetDataEquipmentsItemDTO(
            true,
            'Beschlagenes Leder (Meisterlich)',
            '',
            175,
            1,
            20
        );
        let sheetDataEquipmentsItem_2 = new SheetDataEquipmentsItemDTO(
            true,
            'Amulet of Natural Armor',
            'Natural Armor +1',
            2000,
            1,
            0
        );
        let sheetDataEquipmentsItem_3 = new SheetDataEquipmentsItemDTO(
            false,
            'Reisekleidung',
            '',
            1,
            1,
            5
        );
        let sheetDataEquipmentsItem_4 = new SheetDataEquipmentsItemDTO(
            true,
            'Kyton Rüstung',
            '',
            13100,
            1,
            12
        );
        let sheetDataEquipmentsItem_5 = new SheetDataEquipmentsItemDTO(
            true,
            'Ring of Battle',
            '3 Ladungen am Tag, 1 Ladung: extra move: 2 Ladungen: extra Standard: 3 Ladungen: extra Full-round',
            12000,
            1,
            0
        );
        let sheetDataEquipmentsItem_6 = new SheetDataEquipmentsItemDTO(
            true,
            'Handschuhe des glücklichen Schlags',
            'Einmal am Tag einen Angriffswurf wiederholen',
            2000,
            1,
            0
        );
        let sheetDataEquipmentsItem_7 = new SheetDataEquipmentsItemDTO(
            true,
            'Belt of hidden pouches',
            'Inhalt: Kiste mit Schätzen der Vettel, 8 Liter Trank zum entsteinern in verschiedenen Fläschchen, diverese Ausrüstungsgegenstände (Kurzschwert, Schlafsack, Rationen, Wasserschlauch, Fackeln, Kleidung für Kalte Tage, Fischernetz, Seil, Thief-Tools)',
            50000,
            1,
            0
        );
        let sheetDataEquipmentsItem_8 = new SheetDataEquipmentsItemDTO(
            true,
            'Holzpflock',
            '',
            0,
            1,
            0
        );
        let sheetDataEquipmentsLocation_Body = new SheetDataEquipmentsLocationDTO(
            SheetDataEquipmentsLocationListDTO.LOCATION_BODY,
            [
                sheetDataEquipmentsItem_1,
                sheetDataEquipmentsItem_2,
                sheetDataEquipmentsItem_3,
                sheetDataEquipmentsItem_4,
                sheetDataEquipmentsItem_5,
                sheetDataEquipmentsItem_6,
            ],
            29275,
            5,
            32
        );
        let sheetDataEquipmentsLocation_Belt = new SheetDataEquipmentsLocationDTO(
            SheetDataEquipmentsLocationListDTO.LOCATION_BELT,
            [
                sheetDataEquipmentsItem_7,
                sheetDataEquipmentsItem_8,
            ],
            50000,
            2,
            0
        );
        let sheetDataEquipmentsLocationList = new SheetDataEquipmentsLocationListDTO(
            sheetDataEquipmentsLocation_Body,
            sheetDataEquipmentsLocation_Belt,
            null,
            null
        );
        let sheetDataEquipments = new SheetDataEquipmentsDTO(sheetDataEquipmentsLocationList);


        // ######### Section: Familiars
        let sheetDataFamiliarsFamiliar_Rabe = new SheetDataFamiliarsFamiliarDTO('Untoter Rabe', '+2 Zauberkunde, Spricht Dämonisch (Abyssal)');

        let sheetDataFamiliars = new SheetDataFamiliarsDTO([
            sheetDataFamiliarsFamiliar_Rabe
        ]);


        // ######### Section: Story
        let sheetDataStory = new SheetDataStoryDTO('\
            Nendra wurde als Säugling am Ende des Krieges von einem Zwerg aufgenommen. Sie ist eine Kriegsweise die noch nie Kontakt zu Anderen ihrer eigenen Art hatte, wodurch sie sich auch nicht mit deren Gebräuche auskennt. Stattdessen wurde sie von Barin Sturmbart (Frau Kelda die blinde Schmiedin), wie ein Zwerg aufgezogen und ausgebildet.\
            Dadurch hat sie auch eine hohe Affinität zu Höhlen, dem Schwertkampf und Tavernen. Sie ist eigentlich immer gut gelaunt, es sei denn jemand macht Witze über Zwerge, dann sollte derjenige laufen so schnell er kann, oder ein geübter Kämpfer sein. Man mag es dumm oder mutig nennen, aber sie fürchtet keinen Kampf, auch nicht gegen evtl. stärkere Gegner. Wann immer sie kann, erkundet sie die Umgebung um das Dorf herum und auch die Schmiede ist ihr nicht fremd, doch Hausarbeit oder Landwirtschaft treiben sie in die Flucht.\
        ');


        // ######### Section: Contacts
        let sheetDataContactsContact_Kelda = new SheetDataContactsContactDTO('Kelda Sturmbart', 'Ziehmutter und blinde Schmiedin');
        let sheetDataContactsContact_Barin = new SheetDataContactsContactDTO('Barin Sturmbart', 'Ziehvater');
        let sheetDataContactsContact_Arturiel = new SheetDataContactsContactDTO('Arturiel', 'Einer der Gründer unseres Dorfes');

        let sheetDataContacts = new SheetDataContactsDTO([
            sheetDataContactsContact_Kelda,
            sheetDataContactsContact_Barin,
            sheetDataContactsContact_Arturiel
        ]);


        // ######### Section: Notes
        let sheetDataNotes = new SheetDataNotesDTO('\
            Jaxon (Max)\
            Lyra Caelwyn (Miri)\
            Tabrem (Ephraim)\
            Timbel (Lutz)\
        ');


        // ######### Section: DiceSets
        let sheetDataDiceSets = new SheetDataDiceSetsDTO([
            new SheetDataDiceSetsDiceSetDTO('TestSet', 'Mehr Infos', 'D6+2W8'),
        ]);


        // ######### All sections together
        let sheetData = new SheetData(
            characterManager.version,
            sheetDataBasic,
            sheetDataAppearance,
            sheetDataClasses,
            sheetDataAttributes,
            sheetDataRescues,
            sheetDataAttacks,
            sheetDataWeapons,
            sheetDataCombatManeuvers,
            sheetDataInitiative,
            sheetDataInspiration,
            sheetDataArmors,
            sheetDataHitpoints,
            sheetDataMovement,
            sheetDataCarrying,
            sheetDataAbilities,
            sheetDataStances,
            sheetDataManeuvers,
            sheetDataMagicians,
            sheetDataSpells,
            sheetDataSkills,
            sheetDataValuables,
            sheetDataEquipments,
            sheetDataFamiliars,
            sheetDataStory,
            sheetDataContacts,
            sheetDataNotes,
            sheetDataDiceSets
        );

        return sheetData;
    }

    importDummyData() {
        debug.log("importDummyData");

        let sheetData = this.prepareDummyData();
        this.setIdentifier('oneToRuleThemAll');
        this.setData(sheetData);
    }
}