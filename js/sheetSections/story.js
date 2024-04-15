class SheetDataStoryDTO {
    story;

    /**
     * @param {String} story 
     */
    constructor(
        story
    ) {
        this.story = story;
    }
}

class SheetSectionStory extends AbstractSheetHelper{
    parent;

    FIELDNAME_STORY = 'character-story';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of section "story"
     * 
     * @returns {SheetDataStoryDTO}
     */
    getData() {
        return new SheetDataStoryDTO(
            this.getStory()
        );
    }

    /**
     * Sets all data of section "story"
     * 
     * @param {SheetDataStoryDTO} data 
     */
    setData(data) {
        this.setStory(data.story);
    }


    /**
     * @returns {String}
     */
    getStory() {
        return this.getElementValueByName(this.FIELDNAME_STORY);
    }

    /**
     * @param {String} value 
     */
    setStory(value) {
        this.setElementValueByName(this.FIELDNAME_STORY, value);
    }
}