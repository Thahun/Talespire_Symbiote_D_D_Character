class SectionHelper {
    static STATE_OPEN = 1;
    static STATE_CLOSE = 0;

    static CLASSNAME_SECTION_OPEN = 'section-open';
    static CLASSNAME_SECTION_CLOSE = 'section-close';
    static CLASSNAME_SECTION_BODY = 'section-body';
    static CLASSNAME_SUBSECTION_BODY = 'sub-section-body';

    /**
     * Returns the first element found by classname, inside provided element or document, or NULL
     * 
     * @param {String} className 
     * @param {HTMLElement|null} element 
     * @returns {HTMLElement}
     */
    static getElementByClassName(className, parentElement = document) {
        let element = parentElement.getElementsByClassName(className)[0];
        if(!element) {
            return null;
        }
        return element;
    }

    /**
     * @param {HTMLElement} element
     * @param {Boolean} subSection
     */
    static toggleSection(element, subSection = false) {
        let currentState = this.determineSectionState(element);
        if(currentState == this.STATE_OPEN) {
            this.setSectionState(this.STATE_CLOSE, element, subSection);
        } else {
            this.setSectionState(this.STATE_OPEN, element, subSection);
        }
    }

    /**
     * @param {String} state 
     * @param {HTMLElement} element
     * @param {Boolean} subSection
     */
    static setSectionState(state, element, subSection = false) {
        let sectionBody = this.getElementByClassName((subSection ? this.CLASSNAME_SUBSECTION_BODY : this.CLASSNAME_SECTION_BODY), element);
        let openIcon = this.getElementByClassName(this.CLASSNAME_SECTION_OPEN, element);
        let closeIcon = this.getElementByClassName(this.CLASSNAME_SECTION_CLOSE, element);
        
        switch(state) {
            case this.STATE_CLOSE:
                sectionBody.style.display = 'none';
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            break;
            case this.STATE_OPEN:
                sectionBody.style.display = 'block';
                openIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            break;
        }
    }

    /**
     * Determine if section is open(1) or closed(0)
     * 
     * @param {HTMLElement} element
     * @returns {Number}
     */
    static determineSectionState(element) {
        let openIcon = this.getElementByClassName(this.CLASSNAME_SECTION_OPEN, element);
        if(openIcon.style.display == 'none') {
            return this.STATE_OPEN;
        } else {
            return this.STATE_CLOSE;
        }
    }
}