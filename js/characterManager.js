class CharacterDTO {
    identifier;
    sheetData;
    viewData;

    /**
     * @param {String} identifier 
     * @param {SheetData} sheetData 
     * @param {ViewDTO} viewData 
     */
    constructor(
        identifier,
        sheetData,
        viewData
    ) {
        this.identifier = identifier;
        this.sheetData = sheetData;
        this.viewData = viewData;
    }
}

class CharacterRecordDTO {
    identifier;
    sheetVersion;
    viewVersion;
    player;
    name;

    /**
     * @param {String} identifier 
     * @param {String} sheetVersion 
     * @param {String} viewVersion 
     * @param {String} player 
     * @param {String} name 
     */
    constructor(
        identifier,
        sheetVersion,
        viewVersion,
        player,
        name
    ) {
        this.identifier = identifier;
        this.sheetVersion = sheetVersion;
        this.viewVersion = viewVersion;
        this.player = player;
        this.name = name;
    }
}

class CharacterManager extends AbstractSheetHelper {
    initState = false;

    storage;
    manifestHelper;
    characterDataValidator;
    characterDataConverter;
    viewDataConverter;

    /**
     * @type {String}
     */
    version;
    /**
     * @type {Array.<CharacterRecordDTO>}
     */
    availableCharacters = [];
    ELEMENTID_MENU = 'character-menu';

    FIELDNAME_INDEX = 'character-list-id[]';
    FIELDID_ADD_ROW = 'character-list-add-row';

    ELEMENTID_CELL_NAME = 'character-list-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_PLAYER = 'character-list-cell-player[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_VERSION_SHEET = 'character-list-cell-version-sheet[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_VERSION_VIEW = 'character-list-cell-version-view[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICONS = 'character-list-cell-icons[' + this.INDEX_PLACEHOLDER + ']';

    ELEMENTID_CHARACTER_EXPORT = 'character-export';
    ELEMENTID_CHARACTER_EXPORT_NAME = 'character-export-name';
    ELEMENTID_CHARACTER_EXPORT_DATA = 'character-export-data';

    ELEMENTID_APP_NAME = 'app-name';
    ELEMENTID_APP_VERSION = 'app-version-number';
    ELEMENTID_APP_AUTHORS = 'app-author-names';

    /**
     * @param {StorageService} storage 
     */
    constructor(storage) {
        debug.log("CharacterManager class loaded");
        super();

        this.storage = storage;
        this.manifestHelper = new ManifestHelper(this);

        this.init();
    }

    async init() {
        debug.log("CharacterManager.init");

        let retriesDelaySeconds = 1;
        let retriesMax = 10;
        let retries = retriesMax;
        while(retries > 0 && !symbioteStorage.isInit()) {
            debug.log("Character.init waiting for SymbioteStorage.init");
            retries--;
            await sleep(retriesDelaySeconds * 100);
        }
        if (!symbioteStorage.isInit()) {
            throw new SyntaxError("Failed to init SymbioteStorage within " + (retriesMax * retriesDelaySeconds) + " seconds!");
        }

        this.version = this.manifestHelper.fetchKey(ManifestHelper.KEY_VERSION);
        this.showAppInfo();

        this.characterDataValidator = new CharacterDataValidator(this);
        this.characterDataConverter = new CharacterDataConverter(this);
        this.viewDataConverter = new ViewDataConverter(this);

        this.initState = true;
    }

    isInit() {
        return this.initState;
    }

    showAppInfo() {
        debug.log("CharacterManager.showAppInfo");
        
        let elementName = this.getElementById(this.ELEMENTID_APP_NAME);
        elementName.innerText = this.manifestHelper.fetchKey(ManifestHelper.KEY_NAME);
        let elementVersion = this.getElementById(this.ELEMENTID_APP_VERSION);
        elementVersion.innerText = this.version;
        let elementAuthors = this.getElementById(this.ELEMENTID_APP_AUTHORS);
        let authors = this.manifestHelper.fetchKey(ManifestHelper.KEY_AUTHORS);
        elementAuthors.innerText = authors.join(', ');
    }

    /**
     * Load the list of available characters
     */
    loadCharacterList() {
        debug.log("CharacterManager.loadCharacterList");

        let characterSet = this.storage.getStorageAsObject();
        this.availableCharacters = [];

        const keys = Object.keys(characterSet);
        if(keys.length > 0) {

            keys.forEach((identifier, index) => {
                /**
                 * @type {CharacterDTO} character
                 */
                let character = characterSet[identifier];
                let record = new CharacterRecordDTO(
                    character.identifier,
                    character.sheetData.sheetVersion,
                    character.viewData.viewVersion,
                    character.sheetData.basic.player,
                    character.sheetData.basic.name
                );
                this.availableCharacters.push(record);
            });
        }

        this.printCharacterList();
    }

    printCharacterList() {
        debug.log("CharacterManager.printCharacterList");

        this.removeAllCharacterListRows();

        for (let i = 0; i < this.availableCharacters.length; i++) {
            const availableCharacter = this.availableCharacters[i];
            this.addCharacterListRow(availableCharacter);
        }
    }
    
    removeAllCharacterListRows() {
        debug.log("CharacterManager.removeAllCharacterListRows");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX, this.DATA_TYPE_STRING);
        for (let i = 0; i < indexes.length; i++) {
            this.removeCharacterListRow(indexes[i]);
        }
    }

    /**
     * @param {String} characterIdentifier 
     */
    removeCharacterListRow(characterIdentifier ) {
        debug.log("CharacterManager.removeCharacterListRow");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_NAME, characterIdentifier),
            this.setIndexToString(this.ELEMENTID_CELL_PLAYER, characterIdentifier),
            this.setIndexToString(this.ELEMENTID_CELL_VERSION_SHEET, characterIdentifier),
            this.setIndexToString(this.ELEMENTID_CELL_VERSION_VIEW, characterIdentifier),
            this.setIndexToString(this.ELEMENTID_CELL_ICONS, characterIdentifier)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {CharacterRecordDTO} availableCharacter 
     */
    addCharacterListRow(availableCharacter) {
        debug.log("CharacterManager.addCharacterListRow");

        let buttons = '';
        if(this.characterDataConverter.isCurrentVersion(availableCharacter.sheetVersion) && this.viewDataConverter.isCurrentVersion(availableCharacter.viewVersion)) {
            buttons = ' \
                <button class="ts-icon-play character-list-icon" type="button" onclick="characterManager.loadCharacter(\'' + availableCharacter.identifier + '\');" /> \
                <button class="ts-icon-copy character-list-icon" type="button" onclick="characterManager.copyCharacter(\'' + availableCharacter.identifier + '\');" /> \
            ';
        } else {
            buttons = ' \
                <button class="ts-icon-chevron-up character-list-icon" type="button" onclick="characterManager.convertCharacter(\'' + availableCharacter.identifier + '\');" /> \
            ';
        }
        buttons += ' \
            <button class="ts-icon-trash character-list-icon" type="button" onclick="characterManager.deleteCharacter(\'' + availableCharacter.identifier + '\');" /> \
            <button class="ts-icon-character-arrow-up character-list-icon" type="button" onclick="characterManager.exportCharacter(\'' + availableCharacter.identifier + '\');" /> \
        ';

        let newCharacterListRow = ' \
        <div id="character-list-cell-name[' + availableCharacter.identifier + ']" class="grid-item-data align-left" style="grid-column-end: span 3;"> \
            <input name="character-list-id[]" type="hidden" value="' + availableCharacter.identifier + '"> \
            <label>' + availableCharacter.name + '</label> \
        </div> \
        <div id="character-list-cell-player[' + availableCharacter.identifier + ']" class="grid-item-data align-left" style="grid-column-end: span 3;"> \
            <label>' + availableCharacter.player + '</label> \
        </div> \
        <div id="character-list-cell-version-sheet[' + availableCharacter.identifier + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <label>' + availableCharacter.sheetVersion + '</label> \
        </div> \
        <div id="character-list-cell-version-view[' + availableCharacter.identifier + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
            <label>' + availableCharacter.viewVersion + '</label> \
        </div> \
        <div id="character-list-cell-icons[' + availableCharacter.identifier + ']" class="grid-item" style="grid-column-end: span 2;"> \
            ' + buttons + ' \
        </div> \
        ';
        let newCharacterListHtmlDocument = new DOMParser().parseFromString(newCharacterListRow, "text/html");
        let newCharacterListHtmlCollection = newCharacterListHtmlDocument.body.children;
        let characterListAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        characterListAddRow.before(...newCharacterListHtmlCollection);
    }

    /**
     * Convert the persisted character data to the current version
     * 
     * @param {String} identifier 
     */
    convertCharacter(identifier) {
        debug.log("CharacterManager.convertCharacter");
        error.hide();
        
        let characterData = storageService.getStorageElement(identifier);

        if(!this.characterDataConverter.isCurrentVersion(characterData.sheetData.sheetVersion)) {
            characterData.sheetData = this.characterDataConverter.convertToLatestVersion(characterData.sheetData);
        }
        if(!this.viewDataConverter.isCurrentVersion(characterData.viewData.viewVersion)) {
            characterData.viewData = this.viewDataConverter.convertToLatestVersion(characterData.viewData);
        }

        this.storage.setStorageElement(identifier, characterData);
        symbioteStorage.persist();

        this.loadCharacterList();
    }

    /**
     * @param {String} identifier 
     */
    loadCharacter(identifier) {
        debug.log("CharacterManager.loadCharacter");
        error.hide();

        let character = storageService.getStorageElement(identifier);
        if(!this.characterDataConverter.isCurrentVersion(character.sheetData.sheetVersion) || !this.viewDataConverter.isCurrentVersion(character.viewData.viewVersion)) {
            error.show('Character can\'t be loaded due to an outdated version. It needs to be converted first.');
            return;
        }

        sheetManager.clearAll();
        sheetManager.setIdentifier(character.identifier);
        sheetManager.setData(character.sheetData);
        viewManager.setViewStates(character.viewData);

        SectionHelper.toggleSection(this.getElementById(this.ELEMENTID_MENU)); 
    }

    /**
     * @param {String} identifier 
     */
    copyCharacter(identifier) {
        debug.log("CharacterManager.copyCharacter");
        error.hide();

        sheetManager.clearAll();
        let character = storageService.getStorageElement(identifier);
        character = storageService.convertToObject(storageService.convertToString(character)); //Clone the object
        character.sheetData.basic.name = '';
        character.sheetData.basic.player = '';
        sheetManager.setData(character.sheetData);

        viewManager.setDefaultView();

        SectionHelper.toggleSection(this.getElementById(this.ELEMENTID_MENU)); 
    }

    /**
     * @param {String} identifier 
     */
    deleteCharacter(identifier) {
        debug.log("CharacterManager.deleteCharacter");
        error.hide();

        this.storage.removeStorageElement(identifier);
        this.loadCharacterList();
        symbioteStorage.persist();
    }

    /**
     * Export character data as JSON string
     * 
     * @param {String} identifier 
     */
    exportCharacter(identifier) {
        debug.log("CharacterManager.exportCharacter");
        error.hide();

        let character = storageService.getStorageElement(identifier);
        let characterString = storageService.convertToString(character.sheetData);

        let exportSection = this.getElementById(this.ELEMENTID_CHARACTER_EXPORT);
        exportSection.style.display = 'block';
        let exportNameObject = this.getElementById(this.ELEMENTID_CHARACTER_EXPORT_NAME);
        exportNameObject.textContent = character.sheetData.basic.name;
        let exportDataObject = this.getElementById(this.ELEMENTID_CHARACTER_EXPORT_DATA);
        exportDataObject.textContent = characterString;
    }

    copyExportData() {
        debug.log("CharacterManager.copyExportData");
        error.hide();

        let exportDataObject = this.getElementById(this.ELEMENTID_CHARACTER_EXPORT_DATA);

        TS.system.clipboard.setText(exportDataObject.textContent);
    }

    closeExportSection() {
        debug.log("CharacterManager.closeExportSection");
        error.hide();

        let exportSection = this.getElementById(this.ELEMENTID_CHARACTER_EXPORT);
        exportSection.style.display = 'none';
        let exportNameObject = this.getElementById(this.ELEMENTID_CHARACTER_EXPORT_NAME);
        exportNameObject.textContent = '';
        let exportDataObject = this.getElementById(this.ELEMENTID_CHARACTER_EXPORT_DATA);
        exportDataObject.textContent = '';
    }

    newCharacter() {
        debug.log("CharacterManager.importCharacter");
        error.hide();

        sheetManager.clearAll();
        viewManager.setDefaultView();

        SectionHelper.toggleSection(document.getElementById('character-menu'));
    }

    /**
     * Import character data as JSON string
     * 
     * @param {String} importString 
     */
    importCharacter(importString) {
        debug.log("CharacterManager.importCharacter");
        error.hide();
        SectionHelper.toggleSection(this.getElementById(this.ELEMENTID_MENU));

        /**
         * @type {SheetData} data
         */
        let data = null;
        try {
            data = JSON.parse(importString);
        } catch (e) {
            error.show("Failed to convert imported String to Object: " + e.message);
            throw new Error("Failed to convert imported String to Object: " + e.message);
        }

        try {
            this.characterDataValidator.validateImportData(data);
            if(!this.characterDataConverter.isCurrentVersion(data.sheetVersion)) {
                data = this.characterDataConverter.convertToLatestVersion(data);
            }

            let identifier = this.generateIdentifierFromCharacterData(data);
            sheetManager.setIdentifier(identifier);
            sheetManager.setData(data);

            viewManager.setDefaultView();
        } catch(e) {
            console.log(e);
            error.show("Fehler beim importieren der Charakterdaten!\n" + e.message)
        }
    }

    /**
     * Persist current character data from form as JSON string to symbioteStorage
     */
    persistCurrent() {
        debug.log("CharacterManager.persistCurrent");
        error.hide();

        let identifier = sheetManager.getIdentifier();
        let sheetData = sheetManager.getData();
        if(!identifier) {
            identifier = this.generateIdentifierFromCharacterData(sheetData);
        }
        debug.log('Identifier: ', identifier);
        
        let viewData = viewManager.getViewStates();
        let characterData = new CharacterDTO(identifier, sheetData, viewData);
        this.storage.setStorageElement(identifier, characterData);
        symbioteStorage.persist();

        this.loadCharacterList();
    }

    /**
     * Generate unique identifier from sheet data
     * 
     * @param {SheetData} sheetData 
     */
    generateIdentifierFromCharacterData(sheetData) {
        let name = sheetData.basic.name;
        let player = sheetData.basic.player;
        let keyBase = name + player;
        let identifier = keyBase.hashCode().toString(16);

        return identifier;
    }
}