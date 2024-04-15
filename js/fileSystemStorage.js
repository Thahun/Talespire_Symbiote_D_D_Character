class FileSystemStorage {
    inputFilePickerImport;
    buttonCharacterImport;

    constructor() {
        debug.log("FileSystemStorage class loaded")
        this.inputFilePickerImport = document.getElementById("filePickerImport");
        this.buttonCharacterImport = document.getElementById("characterImport");
        this.init();
    }

    init() { 
        this.buttonCharacterImport.addEventListener(
            "click",
            (e) => {
                if (this.inputFilePickerImport) {
                    info.show("Menü zur Datei-Auswahl öffnet sich im Hintergrund!");
                    this.inputFilePickerImport.click();
                }
            },
            false,
        );
        this.inputFilePickerImport.addEventListener(
            "change",
            (e) => {
                e.stopPropagation();
                this.importData();

            }
        );
    }

    async importData() {
        debug.log("FileSystemStorage.importData");
        const [file] = this.inputFilePickerImport.files;
    
        if (file) {
            let fileContent = await file.text();
            characterManager.importCharacter(fileContent);
        }
        this.inputFilePickerImport.value = null;
        info.hide();
    }
}