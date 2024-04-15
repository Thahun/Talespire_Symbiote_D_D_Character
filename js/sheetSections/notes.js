class SheetDataNotesDTO {
    notes;

    /**
     * @param {String} notes 
     */
    constructor(
        notes
    ) {
        this.notes = notes;
    }
}

class SheetSectionNotes extends AbstractSheetHelper{
    parent;

    FIELDNAME_STORY = 'character-notes';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of section "notes"
     * 
     * @returns {SheetDataNotesDTO}
     */
    getData() {
        return new SheetDataNotesDTO(
            this.getNotes()
        );
    }

    /**
     * Sets all data of section "notes"
     * 
     * @param {SheetDataNotesDTO} data 
     */
    setData(data) {
        this.setNotes(data.notes);
    }


    /**
     * @returns {String}
     */
    getNotes() {
        return this.getElementValueByName(this.FIELDNAME_STORY);
    }

    /**
     * @param {String} value 
     */
    setNotes(value) {
        this.setElementValueByName(this.FIELDNAME_STORY, value);
    }
}