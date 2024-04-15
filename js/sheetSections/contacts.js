class SheetDataContactsDTO {
    contactList;

    /**
     * @param {Array.<SheetDataContactsContactDTO>} contactList 
     */
    constructor(
        contactList = []
    ) {
        this.contactList = contactList;
    }
}

class SheetDataContactsContactDTO {
    name;
    details;

    /**
     * @param {String} name 
     * @param {String} details 
     */
    constructor(
        name,
        details
    ) {
        this.name = name;
        this.details = details;
    }
}

class SheetSectionContacts extends AbstractSheetHelper{
    parent;
    sectionContactsContact;

    FIELDNAME_INDEX = 'character-contacts-id[]';
    FIELDID_ADD_ROW = 'character-contacts-add-row';

    ELEMENTID_CELL_NAME = 'character-contacts-cell-name[' + this.INDEX_PLACEHOLDER + ']';
    ELEMENTID_CELL_ICON = 'character-contacts-cell-icon[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
        this.sectionContactsContact = new SheetSectionContactsContact(this);
    }

    /**
     * Returns all data of section "contacts"
     * 
     * @returns {SheetDataContactsDTO}
     */
    getData() {
        return new SheetDataContactsDTO(
            this.getContacts()
        );
    }

    /**
     * Sets all data of section "contacts"
     * 
     * @param {SheetDataContactsDTO} data 
     */
    setData(data) {
        this.setContacts(data.contactList);
    }


    /**
     * @returns {Array.<SheetDataContactsContactDTO>}
     */
    getContacts() {
        let contactList = []; 
        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let contactData = this.sectionContactsContact.getData(index);
            contactList.push(contactData);
        }
        return contactList;
    }

    /**
     * Setting a list of contacts
     * This means all other potentially already existing records will be removed first
     * 
     * @param {Array.<SheetDataContactsContactDTO>} contactList 
     */
    setContacts(contactList) {
        this.removeAllContacts();

        for (let i = 0; i < contactList.length; i++) {
            let contactData = contactList[i];
            this.addContact(contactData.name, contactData.details);
        }
    }

    /**
     * ################################
     * # Sheet functions
     * ################################
     */

    removeAllContacts() {
        debug.log("SheetSectionContacts.removeAllContacts");

        let indexes = this.getIndexes(this.FIELDNAME_INDEX);
        for (let i = 0; i < indexes.length; i++) {
            this.removeContact(indexes[i]);
        }
    }

    /**
     * @param {Number} contactIndex 
     */
    removeContact(contactIndex) {
        debug.log("SheetSectionContacts.removeContact");

        let elementIds = [
            this.setIndexToString(this.ELEMENTID_CELL_NAME, contactIndex),
            this.setIndexToString(this.ELEMENTID_CELL_ICON, contactIndex)
        ];
        
        for(let i = 0;i < elementIds.length; i++)
        {
            this.removeElementById(elementIds[i]);
        }
    }

    /**
     * @param {String} name 
     * @param {String} details 
     */
    addContact(name = '', details = '') {
        debug.log("SheetSectionContacts.addContact");

        let contactIndex = this.determineNextIndex(this.FIELDNAME_INDEX);
        
        let newContactHtmlString = ' \
            <div id="character-contacts-cell-name[' + contactIndex + ']" class="grid-item-data" style="grid-column-end: span 1;"> \
                <input name="character-contacts-id[]" type="hidden" value="' + contactIndex + '"> \
                <div class="expand"> \
                    <input name="character-contacts-name[' + contactIndex + ']" class="field-data contacts" type="text" value="' + name + '"></input> \
                    <div class="expand-open" style="display: inline-block;" onclick="Expand.toggleExpand(this);">▼</div> \
                    <div class="expand-close" style="display: none;" onclick="Expand.toggleExpand(this);">▲</div> \
                    <div id="character-contacts-expand[' + contactIndex + ']" class="expand-content left single-field contacts"> \
                        <textarea name="character-contacts-details[' + contactIndex + ']" style="height: 4em; width: calc(100% - 6px);" onchange="Expand.markUsedExpand(this);">' + details + '</textarea> \
                    </div> \
                </div> \
            </div> \
            <div id="character-contacts-cell-icon[' + contactIndex + ']" class="grid-item" style="grid-column-end: span 1;"> \
                <div id="character-contacts-icon[' + contactIndex + ']" class="addRemoveIcon" onclick="sheetManager.sectionContacts.removeContact(' + contactIndex + ');">-</div> \
            </div> \
        ';
        let newContactHtmlDocument = new DOMParser().parseFromString(newContactHtmlString, "text/html");
        let newContactHtmlCollection = newContactHtmlDocument.body.children;
        let characterContactAddRow = this.getElementById(this.FIELDID_ADD_ROW);
        characterContactAddRow.before(...newContactHtmlCollection);
        
        if(details.trim() != '') {
            let fieldname = this.setIndexToString(this.sectionContactsContact.FIELDNAME_DETAILS, contactIndex);
            let detailsElement = this.getElementByName(fieldname);
            Expand.markUsedExpand(detailsElement);
        }
    }
}


class SheetSectionContactsContact extends AbstractSheetHelper {
    parent;

    FIELDNAME_NAME = 'character-contacts-name[' + this.INDEX_PLACEHOLDER + ']';
    FIELDNAME_DETAILS = 'character-contacts-details[' + this.INDEX_PLACEHOLDER + ']';

    /**
     * @param {SheetSectionContacts} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Returns all data of one contact of section "contacts"
     * 
     * @param {Number} index 
     * @returns {SheetDataContactsContactDTO}
     */
    getData(index) {
        return new SheetDataContactsContactDTO(
            this.getName(index),
            this.getDetails(index)
        );
    }

    /**
     * Sets all data of one contact of section "contacts"
     * 
     * @param {Number} index 
     * @param {SheetDataContactsContactDTO} data 
     */
    setData(index, data) {
        this.setName(index, data.name);
        this.setDetails(index, data.details);
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
    getDetails(index) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DETAILS, index);

        return this.getElementValueByName(fieldname);
    }

    /**
     * @param {Number} index 
     * @param {String} value 
     */
    setDetails(index, value) {
        let fieldname = this.setIndexToString(this.FIELDNAME_DETAILS, index);

        this.setElementValueByName(fieldname, value);
    }
}