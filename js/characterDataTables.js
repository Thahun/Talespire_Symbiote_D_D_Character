class CharacterDataTables {

    /**
     * propertyName must be equal to the attributes defined in sheet.js
     * e.g. SheetSectionAttributes.ATTRIBUTE_STRENGTH
     */
    static attributes = [
        {'id':1, 'name':'Stärke', 'short':'ST', 'propertyName':'strength'},
        {'id':2, 'name':'Geschicklichkeit', 'short':'GE', 'propertyName':'dexterity'},
        {'id':3, 'name':'Konstitution', 'short':'KO', 'propertyName':'constitution'},
        {'id':4, 'name':'Intelligenz', 'short':'IN', 'propertyName':'intelligence'},
        {'id':5, 'name':'Weisheit', 'short':'WE', 'propertyName':'wisdom'},
        {'id':6, 'name':'Charisma', 'short':'CH', 'propertyName':'charisma'},
    ];

    /**
     * min and max in cm
     * see https://www.d20pfsrd.com/basics-ability-scores/glossary/#size
     */
    static sizeCategories = [
        {'id':0, 'name':'-', 'min':0, 'max':0},
        {'id':1, 'name':'Fein', 'min':0, 'max':15},
        {'id':2, 'name':'Zierlich', 'min':16, 'max':30},
        {'id':3, 'name':'Winzig', 'min':31, 'max':60},
        {'id':4, 'name':'Klein', 'min':61, 'max':121},
        {'id':5, 'name':'Mittel', 'min':122, 'max':243},
        {'id':6, 'name':'Groß', 'min':244, 'max':487},
        {'id':7, 'name':'Riesig', 'min':488, 'max':975},
        {'id':8, 'name':'Gigantisch', 'min':975, 'max':1950},
        {'id':9, 'name':'Kolossal', 'min':1951, 'max':100000},
    ];

    /**
     * see https://www.d20pfsrd.com/basics-ability-scores/glossary/#size
     */
    static sizeCategoryModifiers = [
        {'sizeCategoryId':1, 'default':8, 'fly':8, 'stealth':16, 'cmb':-8, 'cmd':-8},
        {'sizeCategoryId':2, 'default':4, 'fly':6, 'stealth':12, 'cmb':-4, 'cmd':-4},
        {'sizeCategoryId':3, 'default':2, 'fly':4, 'stealth':8, 'cmb':-2, 'cmd':-2},
        {'sizeCategoryId':4, 'default':1, 'fly':2, 'stealth':4, 'cmb':-1, 'cmd':-1},
        {'sizeCategoryId':5, 'default':0, 'fly':0, 'stealth':0, 'cmb':0, 'cmd':0},
        {'sizeCategoryId':6, 'default':-1, 'fly':-2, 'stealth':-4, 'cmb':1, 'cmd':1},
        {'sizeCategoryId':7, 'default':-2, 'fly':-4, 'stealth':-8, 'cmb':2, 'cmd':2},
        {'sizeCategoryId':8, 'default':-4, 'fly':-6, 'stealth':-12, 'cmb':4, 'cmd':4},
        {'sizeCategoryId':9, 'default':-8, 'fly':-8, 'stealth':-16, 'cmb':8, 'cmd':8},
    ];

    static races = [
        {'id':1, 'name':'Goldzwerg', 'sizeCategoryId': 5},
        {'id':2, 'name':'Grauzwerg', 'sizeCategoryId': 5},
        {'id':3, 'name':'Schildzwerg', 'sizeCategoryId': 5},
        {'id':4, 'name':'Drow', 'sizeCategoryId': 5},
        {'id':5, 'name':'Mondelf', 'sizeCategoryId': 5},
        {'id':6, 'name':'Sonnenelf', 'sizeCategoryId': 5},
        {'id':7, 'name':'Wildelf', 'sizeCategoryId': 5},
        {'id':8, 'name':'Waldelf', 'sizeCategoryId': 5},
        {'id':9, 'name':'Tiefengnom', 'sizeCategoryId': 4},
        {'id':10, 'name':'Felsgnom', 'sizeCategoryId': 4},
        {'id':11, 'name':'Geisterhafter Halbling', 'sizeCategoryId': 4},
        {'id':12, 'name':'Leichtfuß Halbling', 'sizeCategoryId': 4},
        {'id':13, 'name':'Beherzter Halbling', 'sizeCategoryId': 4},
        {'id':14, 'name':'Aasimar', 'sizeCategoryId': 5},
        {'id':15, 'name':'Luftgenasi', 'sizeCategoryId': 5},
        {'id':16, 'name':'Feuergenasi', 'sizeCategoryId': 5},
        {'id':17, 'name':'Wassergenasi', 'sizeCategoryId': 5},
        {'id':18, 'name':'Erdgenasi', 'sizeCategoryId': 5},
        {'id':19, 'name':'Tiefling', 'sizeCategoryId': 5},
        {'id':20, 'name':'Halbelf', 'sizeCategoryId': 5},
        {'id':21, 'name':'Mensch', 'sizeCategoryId': 5},
        {'id':22, 'name':'Halbork', 'sizeCategoryId': 5},
        {'id':23, 'name':'Halbdrache (Sonnenelf)', 'sizeCategoryId': 5}, //https://www.d20pfsrd.com/bestiary/monster-listings/templates/half-dragon/
        {'id':24, 'name':'Dragonkin', 'sizeCategoryId': 5}, //https://www.d20pfsrd.com/races/3rd-party-races/kobold-press/dragonkin/
    ];

    static raceBonuses = [
        {'raceId':1, 'strength': 0, 'dexterity':-2, 'constitution':2, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':6, 'ecl':0},
        {'raceId':2, 'strength': 0, 'dexterity':0, 'constitution':2, 'intelligence':0, 'wisdom':0, 'charisma':-4, 'gbr':6, 'ecl':2},
        {'raceId':3, 'strength': 0, 'dexterity':0, 'constitution':2, 'intelligence':0, 'wisdom':0, 'charisma':-2, 'gbr':6, 'ecl':0},
        {'raceId':4, 'strength': 0, 'dexterity':2, 'constitution':-2, 'intelligence':0, 'wisdom':0, 'charisma':2, 'gbr':9, 'ecl':2},
        {'raceId':5, 'strength': 0, 'dexterity':2, 'constitution':-2, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':9, 'ecl':0},
        {'raceId':6, 'strength': 0, 'dexterity':0, 'constitution':-2, 'intelligence':2, 'wisdom':0, 'charisma':0, 'gbr':9, 'ecl':0},
        {'raceId':7, 'strength': 0, 'dexterity':2, 'constitution':0, 'intelligence':-2, 'wisdom':0, 'charisma':0, 'gbr':9, 'ecl':0},
        {'raceId':8, 'strength': 2, 'dexterity':2, 'constitution':-2, 'intelligence':-2, 'wisdom':0, 'charisma':-2, 'gbr':9, 'ecl':0},
        {'raceId':9, 'strength': -2, 'dexterity':2, 'constitution':0, 'intelligence':0, 'wisdom':2, 'charisma':-4, 'gbr':6, 'ecl':3},
        {'raceId':10, 'strength': -2, 'dexterity':0, 'constitution':2, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':6, 'ecl':0},
        {'raceId':11, 'strength': -2, 'dexterity':2, 'constitution':0, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':6, 'ecl':0},
        {'raceId':12, 'strength': -2, 'dexterity':2, 'constitution':0, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':6, 'ecl':0},
        {'raceId':13, 'strength': -2, 'dexterity':2, 'constitution':0, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':6, 'ecl':0},
        {'raceId':14, 'strength': 0, 'dexterity':0, 'constitution':0, 'intelligence':0, 'wisdom':2, 'charisma':2, 'gbr':9, 'ecl':1},
        {'raceId':15, 'strength': 0, 'dexterity':2, 'constitution':0, 'intelligence':2, 'wisdom':-2, 'charisma':-2, 'gbr':9, 'ecl':1},
        {'raceId':16, 'strength': 0, 'dexterity':0, 'constitution':0, 'intelligence':2, 'wisdom':0, 'charisma':-2, 'gbr':9, 'ecl':1},
        {'raceId':17, 'strength': 0, 'dexterity':0, 'constitution':2, 'intelligence':0, 'wisdom':0, 'charisma':-2, 'gbr':9, 'ecl':1},
        {'raceId':18, 'strength': 2, 'dexterity':0, 'constitution':2, 'intelligence':0, 'wisdom':-2, 'charisma':-2, 'gbr':9, 'ecl':1},
        {'raceId':19, 'strength': 0, 'dexterity':2, 'constitution':0, 'intelligence':2, 'wisdom':0, 'charisma':-2, 'gbr':9, 'ecl':1},
        {'raceId':20, 'strength': 0, 'dexterity':0, 'constitution':0, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':9, 'ecl':0},
        {'raceId':21, 'strength': 0, 'dexterity':0, 'constitution':0, 'intelligence':0, 'wisdom':0, 'charisma':0, 'gbr':9, 'ecl':0},
        {'raceId':22, 'strength': 2, 'dexterity':0, 'constitution':0, 'intelligence':-2, 'wisdom':0, 'charisma':-2, 'gbr':9, 'ecl':0},
        {'raceId':23, 'strength': 8, 'dexterity':0, 'constitution':4, 'intelligence':4, 'wisdom':0, 'charisma':2, 'gbr':9, 'ecl':0},
        {'raceId':24, 'strength': -2, 'dexterity':2, 'constitution':0, 'intelligence':0, 'wisdom':0, 'charisma':2, 'gbr':9, 'ecl':0},
    ];

    static classCategories = [
        {'id':1, 'name':'Hauptklassen'},
        {'id':2, 'name':'Basisklassen'},
        {'id':3, 'name':'Hybrid-Klassen'},
        {'id':4, 'name':'Okulte-Klassen'},
        {'id':5, 'name':'Alternative-Klassen'},
        {'id':6, 'name':'Prestigeklassen'},
    ];

    static classes = [
        {'id':0, 'name':'-', 'classCategoryId':1, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':1, 'name':'Barbar', 'classCategoryId':1, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':2, 'name':'Barde', 'classCategoryId':1, 'isMagician': true, 'spellCastingAttributeId': 6},
        {'id':3, 'name':'Druide', 'classCategoryId':1, 'isMagician': true, 'spellCastingAttributeId': 5},
        {'id':4, 'name':'Hexenmeister', 'classCategoryId':1, 'isMagician': true, 'spellCastingAttributeId': 6},
        {'id':5, 'name':'Kämpfer', 'classCategoryId':1, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':6, 'name':'Kleriker', 'classCategoryId':1, 'isMagician': true, 'spellCastingAttributeId': 5},
        {'id':7, 'name':'Magier', 'classCategoryId':1, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':8, 'name':'Mönch', 'classCategoryId':1, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':9, 'name':'Paladin', 'classCategoryId':1, 'isMagician': true, 'spellCastingAttributeId': 6},
        {'id':10, 'name':'Schurke', 'classCategoryId':1, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':11, 'name':'Waldläufer', 'classCategoryId':1, 'isMagician': true, 'spellCastingAttributeId': 5},
        
        {'id':12, 'name':'Alchemist', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':13, 'name':'Beschwörer', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':14, 'name':'Hexe', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':15, 'name':'Inquisitor', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':16, 'name':'Kavallerist', 'classCategoryId':2, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':17, 'name':'Omdura', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':18, 'name':'Orakel', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':19, 'name':'Revolverheld', 'classCategoryId':2, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':20, 'name':'Shifter', 'classCategoryId':2, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':21, 'name':'Vampirjäger', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':22, 'name':'Vigilante', 'classCategoryId':2, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':23, 'name':'Zauberer', 'classCategoryId':2, 'isMagician': true, 'spellCastingAttributeId': 6},

        {'id':24, 'name':'Arkanist', 'classCategoryId':3, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':25, 'name':'Bloodrager', 'classCategoryId':3, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':26, 'name':'Ermittler', 'classCategoryId':3, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':27, 'name':'Jäger', 'classCategoryId':3, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':28, 'name':'Schamane', 'classCategoryId':3, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':29, 'name':'Schwertmeister', 'classCategoryId':3, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':30, 'name':'Skalde', 'classCategoryId':3, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':31, 'name':'Slayer', 'classCategoryId':3, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':32, 'name':'Swashbuckler', 'classCategoryId':3, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':33, 'name':'Warpriest', 'classCategoryId':3, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':34, 'name':'Zänker', 'classCategoryId':3, 'isMagician': false, 'spellCastingAttributeId': null},

        {'id':35, 'name':'Kineticist', 'classCategoryId':4, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':36, 'name':'Medium', 'classCategoryId':4, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':37, 'name':'Mesmerist', 'classCategoryId':4, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':38, 'name':'Occultist', 'classCategoryId':4, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':39, 'name':'Psychic', 'classCategoryId':4, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':40, 'name':'Spiritualist', 'classCategoryId':4, 'isMagician': true, 'spellCastingAttributeId': 4},

        {'id':41, 'name':'Antipaladin', 'classCategoryId':5, 'isMagician': true, 'spellCastingAttributeId': 4},
        {'id':42, 'name':'Ninja', 'classCategoryId':5, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':43, 'name':'Samurai', 'classCategoryId':5, 'isMagician': false, 'spellCastingAttributeId': null},

        {'id':44, 'name':'Arkaner Betrüger', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':45, 'name':'Arkaner Bogenschütze', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':46, 'name':'Assassine', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':47, 'name':'Drachenjünger', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':48, 'name':'Duellant', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':49, 'name':'Kundschafter-Chronist', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':50, 'name':'Mystischer Ritter', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':51, 'name':'Mystischer Theurg', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':52, 'name':'Schattentänzer', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},
        {'id':53, 'name':'Wissenshüter', 'classCategoryId':6, 'isMagician': false, 'spellCastingAttributeId': null},

    ];

    static armorTypes = [
        {'id':0, 'name':'-', 'armorMalus':0},
        {'id':1, 'name':'Leichte Rüstung', 'armorMalus':0},
        {'id':2, 'name':'Mittelschwere Rüstung', 'armorMalus':-3},
        {'id':3, 'name':'Schwere Rüstung', 'armorMalus':-3},
    ];

    static carryingLimits = [
        {'id':0, 'strength':0, 'light':0, 'medium':0, 'heavy':0, 'lift':0, 'hoist':0, 'pull':0},
        {'id':1, 'strength':1, 'light':3, 'medium':6, 'heavy':10, 'lift':10, 'hoist':20, 'pull':50},
        {'id':2, 'strength':2, 'light':6, 'medium':13, 'heavy':20, 'lift':20, 'hoist':40, 'pull':100},
        {'id':3, 'strength':3, 'light':10, 'medium':20, 'heavy':30, 'lift':30, 'hoist':60, 'pull':150},
        {'id':4, 'strength':4, 'light':13, 'medium':26, 'heavy':40, 'lift':40, 'hoist':80, 'pull':200},
        {'id':5, 'strength':5, 'light':16, 'medium':33, 'heavy':50, 'lift':50, 'hoist':100, 'pull':250},
        {'id':6, 'strength':6, 'light':20, 'medium':40, 'heavy':60, 'lift':60, 'hoist':120, 'pull':300},
        {'id':7, 'strength':7, 'light':23, 'medium':46, 'heavy':70, 'lift':70, 'hoist':140, 'pull':350},
        {'id':8, 'strength':8, 'light':26, 'medium':53, 'heavy':80, 'lift':80, 'hoist':160, 'pull':400},
        {'id':9, 'strength':9, 'light':30, 'medium':60, 'heavy':90, 'lift':90, 'hoist':180, 'pull':450},
        {'id':10, 'strength':10, 'light':33, 'medium':66, 'heavy':100, 'lift':100, 'hoist':200, 'pull':500},
        {'id':11, 'strength':11, 'light':38, 'medium':76, 'heavy':115, 'lift':115, 'hoist':230, 'pull':575},
        {'id':12, 'strength':12, 'light':43, 'medium':86, 'heavy':130, 'lift':130, 'hoist':260, 'pull':650},
        {'id':13, 'strength':13, 'light':50, 'medium':100, 'heavy':150, 'lift':150, 'hoist':300, 'pull':750},
        {'id':14, 'strength':14, 'light':58, 'medium':116, 'heavy':175, 'lift':175, 'hoist':350, 'pull':875},
        {'id':15, 'strength':15, 'light':66, 'medium':133, 'heavy':200, 'lift':200, 'hoist':400, 'pull':1000},
        {'id':16, 'strength':16, 'light':76, 'medium':153, 'heavy':230, 'lift':230, 'hoist':460, 'pull':1150},
        {'id':17, 'strength':17, 'light':86, 'medium':173, 'heavy':260, 'lift':260, 'hoist':520, 'pull':1300},
        {'id':18, 'strength':18, 'light':100, 'medium':200, 'heavy':300, 'lift':300, 'hoist':600, 'pull':1500},
        {'id':19, 'strength':19, 'light':116, 'medium':233, 'heavy':350, 'lift':350, 'hoist':700, 'pull':1750},
        {'id':20, 'strength':20, 'light':133, 'medium':266, 'heavy':400, 'lift':400, 'hoist':800, 'pull':2000},
        {'id':21, 'strength':21, 'light':153, 'medium':306, 'heavy':460, 'lift':460, 'hoist':920, 'pull':2300},
        {'id':22, 'strength':22, 'light':173, 'medium':346, 'heavy':520, 'lift':520, 'hoist':1040, 'pull':2600},
        {'id':23, 'strength':23, 'light':200, 'medium':400, 'heavy':600, 'lift':600, 'hoist':1200, 'pull':3000},
        {'id':24, 'strength':24, 'light':233, 'medium':466, 'heavy':700, 'lift':700, 'hoist':1400, 'pull':3500},
        {'id':25, 'strength':25, 'light':266, 'medium':533, 'heavy':800, 'lift':800, 'hoist':1600, 'pull':4000},
        {'id':26, 'strength':26, 'light':306, 'medium':613, 'heavy':920, 'lift':920, 'hoist':1840, 'pull':4600},
        {'id':27, 'strength':27, 'light':346, 'medium':693, 'heavy':1040, 'lift':1040, 'hoist':2080, 'pull':5200},
        {'id':28, 'strength':28, 'light':400, 'medium':800, 'heavy':1200, 'lift':1200, 'hoist':2400, 'pull':6000},
        {'id':29, 'strength':29, 'light':466, 'medium':933, 'heavy':1400, 'lift':1400, 'hoist':2800, 'pull':7000},
    ];

    static maneuverStates = [
        {'id':0, 'name':'-', 'color': null},
        {'id':1, 'name':'Vorbereitet', 'color': '#e6e600'},
        {'id':2, 'name':'Aktiv', 'color': '#00a800'},
        {'id':3, 'name':'Verbraucht', 'color': '#b30000'},
    ];

    static spellStates = [
        {'id':0, 'name':'-', 'color': null},
        {'id':1, 'name':'Vorbereitet', 'color': '#e6e600'},
        {'id':2, 'name':'Aktiv', 'color': '#00a800'},
        {'id':3, 'name':'Verbraucht', 'color': '#b30000'},
    ];

    static skillGroups = [
        {'id':0, 'name':'-', 'skills':[]},
        {'id':1, 'name':'Standard', 'skills':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,49]},
        {'id':2, 'name':'Open Gaming Network', 'skills':[44,28,6,16,46,7,47,48,10,49,23,14,8,50,51,52,53,54,55,56,57,58,59,60,61,2,5,27,24,36,42,64,65,31,21,43]},
        {'id':3, 'name':'Consolidated Skills', 'skills':[44,66,67,68,69,61,2,70,71,42,64,65,43]},
    ];

    static skills = [, , , 
        {'id':1, 'name':'Alchemie', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Alchemie
        {'id':2, 'name':'Auftreten', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // Performance
        {'id':3, 'name':'Ausspähen', 'attributeId':4, 'checkPenalty':false, 'untrained':true}, // Gather Information
        {'id':4, 'name':'Balancieren', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Balance
        {'id':5, 'name':'Beruf', 'attributeId':5, 'checkPenalty':false, 'untrained':false}, // Profession
        {'id':6, 'name':'Bluffen', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // Bluff
        {'id':7, 'name':'Diplomatie', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // Diplomacy
        {'id':8, 'name':'Einschüchtern', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // Intimidate
        {'id':9, 'name':'Entdecken', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // Spot
        {'id':10, 'name':'Entfesselung', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Escape Artist
        {'id':11, 'name':'Fälschen', 'attributeId':4, 'checkPenalty':false, 'untrained':true}, // Forgery
        {'id':12, 'name':'Gefühl für Tiere', 'attributeId':6, 'checkPenalty':false, 'untrained':false}, // 
        {'id':13, 'name':'Handwerk', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // Craft (WE)
        {'id':14, 'name':'Heilkunde', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // Heal
        {'id':15, 'name':'Informationen', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // 
        {'id':16, 'name':'Klettern', 'attributeId':1, 'checkPenalty':true, 'untrained':true}, // Climb
        {'id':17, 'name':'Konzentration', 'attributeId':3, 'checkPenalty':false, 'untrained':true}, // Concentration
        {'id':18, 'name':'Lauschen', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // Listen
        {'id':19, 'name':'Leise bewegen', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Move Silently
        {'id':20, 'name':'Lippen lesen', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // 
        {'id':21, 'name':'Magischen Gegenstand benutzen', 'attributeId':6, 'checkPenalty':false, 'untrained':false}, // Use Magic Device
        {'id':22, 'name':'Mechanismus ausschalten', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Disable Device (INT)
        {'id':23, 'name':'Mit Tieren umgehen', 'attributeId':6, 'checkPenalty':false, 'untrained':false}, // Handle Animal
        {'id':24, 'name':'Motiv erkennen', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // Sense Motive
        {'id':25, 'name':'Naturkunde', 'attributeId':5, 'checkPenalty':false, 'untrained':false}, // Survival
        {'id':26, 'name':'Orientierungssinn', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // 
        {'id':27, 'name':'Reiten', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Ride
        {'id':28, 'name':'Schätzen', 'attributeId':4, 'checkPenalty':false, 'untrained':true}, // Appraise
        {'id':29, 'name':'Schloss öffnen', 'attributeId':2, 'checkPenalty':false, 'untrained':false}, // Open Lock
        {'id':30, 'name':'Schrift entschlüsseln', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Decipher Script
        {'id':31, 'name':'Schwimmen', 'attributeId':1, 'checkPenalty':false, 'untrained':true}, // Swim ### -1 malus per 5 weight
        {'id':32, 'name':'Seil benutzen', 'attributeId':2, 'checkPenalty':false, 'untrained':true}, // Use Rope
        {'id':33, 'name':'Sprache sprechen', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Speak Language
        {'id':34, 'name':'Springen', 'attributeId':1, 'checkPenalty':true, 'untrained':true}, // Jump
        {'id':35, 'name':'Suchen', 'attributeId':4, 'checkPenalty':false, 'untrained':true}, // Search
        {'id':36, 'name':'Taschendieb', 'attributeId':2, 'checkPenalty':true, 'untrained':false}, // Sleight of Hand
        {'id':37, 'name':'Turnen', 'attributeId':2, 'checkPenalty':true, 'untrained':false}, // Tumble
        {'id':38, 'name':'Verkleiden', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // Disguise
        {'id':39, 'name':'Verstecken', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Hide
        {'id':40, 'name':'Verstecke Andeutung', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // 
        {'id':41, 'name':'Wissen', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge
        {'id':42, 'name':'Zauberkunde', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Spellcraft
        {'id':43, 'name':'Wissen (Kampfkunst)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Martial Lore (Tome of Battle)

        {'id':44, 'name':'Akrobatik', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Acrobatics
        {'id':46, 'name':'Handwerk', 'attributeId':4, 'checkPenalty':false, 'untrained':true}, // Craft (Int)
        {'id':47, 'name':'Mechanismus ausschalten', 'attributeId':2, 'checkPenalty':true, 'untrained':false}, // Disable Device (GE)
        {'id':48, 'name':'Täuschung', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // Disguise
        {'id':49, 'name':'Fliegen', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Fly
        {'id':50, 'name':'Wissen (Arkane Künste)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (arcana)
        {'id':51, 'name':'Wissen (Kerkerkunde)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (dungeoneering)
        {'id':52, 'name':'Wissen (Ingenieurwesen)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (engineering)
        {'id':53, 'name':'Wissen (Geographie)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (geography)
        {'id':54, 'name':'Wissen (Geschichte)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (history)
        {'id':55, 'name':'Wissen (Regional)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (local)
        {'id':56, 'name':'Wissen (Natur)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (nature)
        {'id':57, 'name':'Wissen (Adel)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (nobility)
        {'id':58, 'name':'Wissen (Ebenen)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (planes)
        {'id':59, 'name':'Wissen (Religion)', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Knowledge (religion)
        {'id':60, 'name':'Sprachen', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Linguistics
        {'id':61, 'name':'Wahrnehmung', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // Perception
        {'id':64, 'name':'Heimlichkeit', 'attributeId':2, 'checkPenalty':true, 'untrained':true}, // Stealth
        {'id':65, 'name':'Überlebenskunst', 'attributeId':5, 'checkPenalty':false, 'untrained':true}, // Survival
        
        {'id':66, 'name':'Athletik', 'attributeId':1, 'checkPenalty':true, 'untrained':true}, // Athletics
        {'id':67, 'name':'Finesse', 'attributeId':2, 'checkPenalty':true, 'untrained':false}, // Finesse
        {'id':68, 'name':'Einfluss', 'attributeId':6, 'checkPenalty':false, 'untrained':true}, // Influence
        {'id':69, 'name':'Naturkunde', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Nature
        {'id':70, 'name':'Religion', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Religion
        {'id':71, 'name':'Gesellschaft', 'attributeId':4, 'checkPenalty':false, 'untrained':false}, // Society
    ];

    /**
     * @returns {Array}
     */
    static getAttributes() {
        return this.attributes;
    }

    /**
     * @param {Number} id 
     * @returns {String|null}
     */
    static getAttributeById(id) {
        let match = this.attributes.filter(attribute => {
            return attribute.id === id;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {String} propertyName 
     * @returns {Object|null}
     */
    static getAttributeByPropertyName(propertyName) {
        let match = this.attributes.filter(attribute => {
            return attribute.propertyName === propertyName;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @returns {Array}
     */
    static getSizeCategories() {
        return this.sizeCategories;
    }

    /**
     * @param {Number} sizeCategoryId 
     * @returns {Object|null}
     */
    static getSizeCategoryById(sizeCategoryId) {
        let match = this.sizeCategories.filter(sizeCategory => {
            return sizeCategory.id === sizeCategoryId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Number} sizeCategoryId 
     * @returns {Object|null}
     */
    static getSizeCategoryModifiersById(sizeCategoryId) {
        let match = this.sizeCategoryModifiers.filter(sizeCategoryModifiers => {
            return sizeCategoryModifiers.sizeCategoryId === sizeCategoryId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }
    
    /**
     * @param {Boolean} sorted 
     * @returns {Array}
     */
    static getRaces(sorted=false) {
        if (sorted) {
            let races = this.races;
            races.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            return races;
        }

        return this.races;
    }

    /**
     * @param {Number} raceId 
     * @returns {Object|null}
     */
    static getRaceById(raceId) {
        let match = this.races.filter(race => {
            return race.id === raceId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Number} raceId 
     * @returns {Object|null}
     */
    static getRaceBonusById(raceId) {
        let match = this.raceBonuses.filter(raceBonus => {
            return raceBonus.raceId === raceId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    static getClassCategories() {
        return this.classCategories;
    }

    /**
     * @param {Number} filterByCategorieId 
     * @param {Boolean} filterByMagician 
     * @param {Boolean} sortedAlphabetic 
     * @param {Boolean} sortedByCategory 
     * @returns {Array}
     */
    static getClasses(filterByCategorieId=null, filterByMagician=null, sortedAlphabetic=false, sortedByCategory=false) {
        let classes = [];
        if (filterByCategorieId || filterByMagician) {
            for(let i = 0;i < this.classes.length; i++)
            {
                if (filterByCategorieId && this.classes[i].classCategoryId != filterByCategorieId) {
                    continue;
                }
                if (filterByMagician && this.classes[i].isMagician != filterByMagician) {
                    continue;
                }
                classes.push(this.classes[i]);
            }
        } else {
            classes = this.classes;
        }

        if (sortedAlphabetic || sortedByCategory) {
            classes.sort(function (a, b) {
                let keyA = null;
                let keyB = null;
                if (sortedAlphabetic && sortedByCategory) {
                    keyA = [a.classCategoryId, a.name];
                    keyB = [b.classCategoryId, b.name];
                } else if (sortedByCategory) {
                    keyA = a.classCategoryId;
                    keyB = b.classCategoryId;
                } else if (sortedAlphabetic) {
                    keyA = a.name;
                    keyB = b.name;
                }

                if (keyA < keyB) {
                    return -1;
                }
                if (keyA > keyB) {
                    return 1;
                }
                return 0;
            });
        }

        return classes;
    }

    /**
     * @param {Number} classId 
     * @returns {Object|null}
     */
    static getClassById(classId) {
        let match = this.classes.filter(classObj => {
            return classObj.id === classId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Boolean} sorted 
     * @returns {Array}
     */
    static getArmorTypes(sorted=false) {
        if (sorted) {
            let armorTypes = this.armorTypes;
            armorTypes.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            return armorTypes;
        }

        return this.armorTypes;
    }

    /**
     * @param {Number} typeId 
     * @returns {Object|null}
     */
    static getArmorTypeById(typeId) {
        let match = this.armorTypes.filter(armorType => {
            return armorType.id === typeId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Boolean} sorted 
     * @returns {Array}
     */
    static getCarryingLimits(sorted=false) {
        if (sorted) {
            let carryingLimits = this.carryingLimits;
            carryingLimits.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            return carryingLimits;
        }

        return this.carryingLimits;
    }

    /**
     * @param {Number} id 
     * @returns {Object|null}
     */
    static getCarryingLimitById(id) {
        let match = this.carryingLimits.filter(carryingLimit => {
            return carryingLimit.id === id;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Number} strength 
     * @returns {Object|null}
     */
    static getCarryingLimitByStrength(strength) {
        let match = this.carryingLimits.filter(carryingLimit => {
            return carryingLimit.strength === strength;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Boolean} sorted 
     * @returns {Array}
     */
    static getManeuverStates(sorted=false) {
        if (sorted) {
            let maneuverStates = this.maneuverStates;
            maneuverStates.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            return maneuverStates;
        }

        return this.maneuverStates;
    }

    /**
     * @param {Number} stateId 
     * @returns {Object|null}
     */
    static getManeuverStateById(stateId) {
        let match = this.maneuverStates.filter(maneuverState => {
            return maneuverState.id === stateId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Boolean} sorted 
     * @returns {Array}
     */
    static getSpellStates(sorted=false) {
        if (sorted) {
            let spellStates = this.spellStates;
            spellStates.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            return spellStates;
        }

        return this.spellStates;
    }

    /**
     * @param {Number} stateId 
     * @returns {Object|null}
     */
    static getSpellStateById(stateId) {
        let match = this.spellStates.filter(spellState => {
            return spellState.id === stateId;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }
    
    /**
     * @param {Boolean} sorted 
     * @returns {Array}
     */
    static getSkillGroups(sorted=false) {
        let skillGroups = this.skillGroups;

        if (sorted) {
            skillGroups.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }

        return skillGroups;
    }

    /**
     * @param {Number} id 
     * @returns {Object|null}
     */
    static getSkillGroupById(id) {
        let match = this.skillGroups.filter(skillGroup => {
            return skillGroup.id === id;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }

    /**
     * @param {Number} skillGroupId 
     * @param {Number} filterByAttributeId 
     * @param {Boolean} filterByCheckPenalty 
     * @param {Boolean} sorted 
     * @returns {Array}
     */
    static getSkills(skillGroupId, filterByAttributeId=null, filterByCheckPenalty=true, sorted=false) {
        let potentialSkills = [];
        let skillGroupObj = this.getSkillGroupById(skillGroupId);
        for(let i = 0;i < skillGroupObj.skills.length; i++) {
            let skillId = skillGroupObj.skills[i];
            potentialSkills.push(this.getSkillById(skillId));
        }
        
        let skills = [];
        if (filterByAttributeId || filterByCheckPenalty) {
            for(let i = 0;i < potentialSkills.length; i++)
            {
                if (filterByAttributeId && potentialSkills[i].attributeId != filterByAttributeId) {
                    continue;
                }
                if (filterByCheckPenalty && potentialSkills[i].checkPenalty != filterByCheckPenalty) {
                    continue;
                }
                skills.push(potentialSkills[i]);
            }
        } else {
            skills = potentialSkills;
        }

        if (sorted) {
            skills.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }

        return skills;
    }

    /**
     * @param {Number} id 
     * @returns {Object|null}
     */
    static getSkillById(id) {
        let match = this.skills.filter(skill => {
            return skill.id === id;
        });

        if(!match[0]) {
            return null;
        }
        return match[0];
    }
}