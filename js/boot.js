/**
 * @type {DebugBox} debug
 */
var debug;
/**
 * @type {InfoBox} info
 */
var info;
/**
 * @type {ErrorBox} error
 */
var error;
/**
 * @type {StorageService} storageService
 */
var storageService;
/**
 * @type {SymbioteStorage} symbioteStorage
 */
var symbioteStorage;
/**
 * @type {FileSystemStorage} fileSystemStorage
 */
var fileSystemStorage;
/**
 * @type {SheetManager} sheetManager
 */
var sheetManager;
/**
 * @type {ViewManager} sectionManager
 */
var viewManager;
/**
 * @type {CharacterManager} characterManager
 */
var characterManager;
/**
 * @type {CharacterDataValidator} characterDataValidator
 */
var characterDataValidator;

class BootLoader {
    initTimeout = 2000; //ms
    ELEMENTID_LOADING = 'loading';

    scripts = [
        {src: 'js/common.js', loaded: false},
        {src: 'js/storageService.js', loaded: false},
        {src: 'js/symbioteStorage.js', loaded: false},
        {src: 'js/fileSystemStorage.js', loaded: false},
        
        {src: 'js/helper/manifestHelper.js', loaded: false},
        {src: 'js/helper/callbackHelper.js', loaded: false},
        {src: 'js/helper/diceHelper.js', loaded: false},
        {src: 'js/helper/abstractSheetHelper.js', loaded: false},
        {src: 'js/helper/abstractConverter.js', loaded: false},
        {src: 'js/helper/sectionHelper.js', loaded: false},
        {src: 'js/helper/checkPenaltyHelper.js', loaded: false},
        {src: 'js/sheetSections/components/otherModifiers.js', loaded: false},

        {src: 'js/sheetSections/basic.js', loaded: false},
        {src: 'js/sheetSections/appearance.js', loaded: false},
        {src: 'js/sheetSections/classes.js', loaded: false},
        {src: 'js/sheetSections/attributes.js', loaded: false},
        {src: 'js/sheetSections/rescues.js', loaded: false},
        {src: 'js/sheetSections/attacks.js', loaded: false},
        {src: 'js/sheetSections/weapons.js', loaded: false},
        {src: 'js/sheetSections/combat.js', loaded: false},
        {src: 'js/sheetSections/initiative.js', loaded: false},
        {src: 'js/sheetSections/inspiration.js', loaded: false},
        {src: 'js/sheetSections/armors.js', loaded: false},
        {src: 'js/sheetSections/hitpoints.js', loaded: false},
        {src: 'js/sheetSections/movement.js', loaded: false},
        {src: 'js/sheetSections/carrying.js', loaded: false},
        {src: 'js/sheetSections/abilities.js', loaded: false},
        {src: 'js/sheetSections/stances.js', loaded: false},
        {src: 'js/sheetSections/maneuvers.js', loaded: false},
        {src: 'js/sheetSections/magicians.js', loaded: false},
        {src: 'js/sheetSections/spells.js', loaded: false},
        {src: 'js/sheetSections/skills.js', loaded: false},
        {src: 'js/sheetSections/valuables.js', loaded: false},
        {src: 'js/sheetSections/equipments.js', loaded: false},
        {src: 'js/sheetSections/familiars.js', loaded: false},
        {src: 'js/sheetSections/story.js', loaded: false},
        {src: 'js/sheetSections/contacts.js', loaded: false},
        {src: 'js/sheetSections/notes.js', loaded: false},
        {src: 'js/sheetSections/diceSets.js', loaded: false},

        {src: 'js/characterDataTables.js', loaded: false},
        {src: 'js/sheetManager.js', loaded: false},

        {src: 'js/characterDataValidator.js', loaded: false},
        {src: 'js/characterDataConverter.js', loaded: false},
        {src: 'js/characterManager.js', loaded: false},

        {src: 'js/viewDataConverter.js', loaded: false},
        {src: 'js/viewManager.js', loaded: false},
    ]

    allScriptsLoaded() {
        for (let index = 0; index < this.scripts.length; index++) {
            if(!this.scripts[index].loaded) {
                return false;
            }
        }
        return true;
    }

    boot() {
        console.log('Booting ...');

        this.loadScripts();
    }

    loadScripts() {
        for (let index = 0; index < this.scripts.length; index++) {
            this.loadScript(index, this.scripts[index].src);
        }
    }

    loadScript(index, src) {
        let script = document.createElement('script');
        this.onloadCallback[index] = this.onloadCallback.bind(this, index);
        script.addEventListener(
            'load',
            this.onloadCallback[index],
            false
        );
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    }

    onloadCallback(index, e) {
        this.scripts[index].loaded = true;
        //console.log(e.target.src + ' is loaded.');
        if(this.allScriptsLoaded()) {
            console.log('... booted');
            this.init();
        }
    }

    init() {
        console.log('Initializing ...');
        this.initCommon();
        this.initSymbiote();
        this.waitingForInit();
        console.log('... initialized');
    }

    initCommon() {
        debug = new DebugBox(/*true*/);
        info = new InfoBox();
        error = new ErrorBox();
    }

    initSymbiote() {
        storageService = new StorageService();
        symbioteStorage = new SymbioteStorage(storageService);
        fileSystemStorage = new FileSystemStorage();
        sheetManager = new SheetManager();
        viewManager = new ViewManager();
        characterManager = new CharacterManager(storageService);
    }

    async waitingForInit() {
        let timeout = Date.now() + this.initTimeout;

        while(!characterManager.isInit()) {
            debug.log("BootLoader.waitingForInit waiting for CharacterManager.init");
            if(Date.now() > timeout) {
                error.show('Timeout: Failed to initialze!');
                return;
            }
            await sleep(100);
        }

        console.log('Loading ...');
        characterManager.newCharacter();
        //Activate this for testing the frontend with data.
        //sheetManager.importDummyData();
        console.log('... loaded');

        this.hideLoadingPanel();
    }

    hideLoadingPanel() {
        debug.log("BootLoader.hideLoadingPanel");
        
        let element = document.getElementById(this.ELEMENTID_LOADING);
        element.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    try {
        let bootLoader = new BootLoader();
        bootLoader.boot();
    } catch(err) {
        console.error("Fehler beim Starten des Symbiote!\n" + err.message)
    }
});

