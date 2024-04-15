const sleep = ms => new Promise(r => setTimeout(r, ms));

class DebugBox {
    divDebug;
    preDebugLog;
    active;

    constructor(active = false) {
        this.divDebug = document.getElementById("debug");
        this.preDebugLog = document.getElementById("debug-log");
        this.active = active;
        this.log("Debug class loaded");
    }

    log(msg) {
        if(this.active == false) {
            return;
        }
        this.showDebugLog()
        let currentLog = this.preDebugLog.textContent;
        let newLog;
        if(currentLog == "") {
            newLog = msg;
        } else {
            newLog = currentLog + "\n" + msg;
        }
        this.preDebugLog.textContent = newLog;
    }

    showDebugLog() {
        this.divDebug.style.display = "block";
    }

    hideDebugLog() {
        this.divDebug.style.display = "none";
    }

    toggleSection(element) {
        debug.log("Debug.toggleSection");
        let currentState = this.determineSectionState(element);
        let sectionBody = element.parentElement.getElementsByClassName("debug-log")[0];
        let openIcon = element.getElementsByClassName("debug-open")[0];
        let closeIcon = element.getElementsByClassName("debug-close")[0];
        if(currentState == 1) {
            sectionBody.style.display = 'none';
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            sectionBody.style.display = 'block';
            openIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        }
    }

    /**
     * Determine if section is open(1) or closed(0)
     * 
     * @param {*} element 
     * @returns int
     */
    determineSectionState(element) {
        debug.log("Debug.determineSectionState");
        let openIcon = element.getElementsByClassName("debug-open")[0];
        if(openIcon.style.display == 'none') {
            return 1;
        } else {
            return 0;
        }
    }
}

class ErrorBox {
    divError;
    preErrorMessage;

    constructor() {
        this.divError = document.getElementById("error");
        this.preErrorMessage = document.getElementById("error-message");
        debug.log("Error class loaded");
    }

    show(msg) {
        this.divError.style.display = "block";
        this.preErrorMessage.textContent = msg;
    }

    hide() {
        this.divError.style.display = "none";
        this.preErrorMessage.textContent = "";
    }
}

class InfoBox {
    divInfo;
    spanInfoMessage;

    constructor() {
        this.divInfo = document.getElementById("info");
        this.spanInfoMessage = document.getElementById("info-message");
        debug.log("Info class loaded");
    }

    show(msg) {
        this.divInfo.style.display = "block";
        this.spanInfoMessage.textContent = msg;
    }

    hide() {
        this.divInfo.style.display = "none";
        this.spanInfoMessage.textContent = "";
    }
}

class Expand {

    /**
     * @param {HTMLElement} element 
     */
    static toggleExpand(element) {
        debug.log("Expand.toggleExpand");

        let expandContainer = this.getExpandContainer(element);
        let expandContent = expandContainer.querySelector('div[class^="expand-content"]');
        let openIcon = expandContainer.querySelector('div[class="expand-open"]');
        let closeIcon = expandContainer.querySelector('div[class="expand-close"]');
        if (!expandContent.style.display || expandContent.style.display == 'none') {
            expandContent.style.display = 'block';
            openIcon.style.display = 'none';
            closeIcon.style.display = 'inline-block';
        } else {
            expandContent.style.display = 'none';
            openIcon.style.display = 'inline-block';
            closeIcon.style.display = 'none';
        }
    }

    /**
     * @param {HTMLElement} element 
     */
    static getExpandContainer(element) {
        debug.log("Expand.getExpandContainer");

        let expandContainer;
        if (elementHasClassname(element, 'expand-open') || elementHasClassname(element, 'expand-close')) {
            expandContainer = element.parentElement;
        }
        return expandContainer;
    }

    /**
     * @param {HTMLElement} element 
     */
    static markUsedExpand(element) {
        debug.log("Expand.markUsedExpand");

        const expandClass = 'expand';
        const usedClass = 'used';

        let expandElement = element.parentNode;
        for (let i = 0; i < 3; i++) {
            expandElement = expandElement.parentNode;
            
            if (elementHasClassname(expandElement, expandClass)) {
                if(element.value.trim() == '') {
                    expandElement.classList.remove(usedClass);
                } else {
                    expandElement.classList.add(usedClass);
                }
                break;
            }
        }
    }
}

class Dropdown {
    /**
     * @param Object dropdownOptionsElement 
     * @param Array options [{'key':123, 'value':'Label'}, ...]
     */
    static addOptions(dropdownOptionsElement, options) {
        debug.log("Dropdown.addOptions");
        let newOptionsHtmlString = '';
        for(let i = 0;i < options.length; i++) {
            newOptionsHtmlString += ' \
                <a class="dropdown-option" style="color:' + (options[i].color ? options[i].color : 'inherit') + ';" data-dropdown-option-value="' + options[i].key + '" onClick="Dropdown.selectDropdownValue(this);">' + options[i].value + '</a> \
            ';
        }

        let newOptionsHtmlDocument = new DOMParser().parseFromString(newOptionsHtmlString, "text/html");
        let newOptionsHtmlCollection = newOptionsHtmlDocument.body.children;
        
        while(newOptionsHtmlCollection.length > 0) {
            dropdownOptionsElement.appendChild(newOptionsHtmlCollection[0]);
        }

        let dropdownInputName = dropdownOptionsElement.id.replace('-options', '');;
        this.markSelectedOption(dropdownInputName);
    }

    /**
     * Requires the options to be generated before, as well as the current value to be set
     * 
     * @param {String} dropdownInputName
     * @param {HTMLElement} dropdownInputElement
     */
    static markSelectedOption(dropdownInputName, dropdownInputElement = null) {
        debug.log("Dropdown.markSelectedOption");
        if(!dropdownInputElement) {
            dropdownInputElement = document.getElementsByName(dropdownInputName)[0];
        }
        let selectedValue = dropdownInputElement.dataset.id;
        let dropdownContainer = dropdownInputElement.parentElement;
        let dropdownOptionsContainerId = dropdownInputName + '-options';
        let dropdownOptionsContainer = getChildElementById(dropdownContainer, dropdownOptionsContainerId);
        let optionElements = dropdownOptionsContainer.children;
        let removed = false;
        let added = false;
        for (let i = 0; i < optionElements.length; i++) {
            let optionElement = optionElements[i];
            if(elementHasClassname(optionElement, 'dropdown-option-selected')) {
                optionElement.classList.remove('dropdown-option-selected');
                removed = true;
            }
            if(optionElement.dataset.dropdownOptionValue == selectedValue) {
                optionElement.classList.add('dropdown-option-selected');
                dropdownInputElement.style.color = optionElement.style.color;
                added = true;
            }

            if(removed && added) {
                break;
            }
        }
    }

    /**
     * @param {HTMLElement} element 
     */
    static toggleDropdown(element) {
        debug.log("Dropdown.toggleDropdown");
        let dropdownContainer = this.getDropdownContainer(element);
        let dropdownContent = dropdownContainer.querySelector('div[class="dropdown-content"]');
        let openIcon = dropdownContainer.querySelector('div[class="dropdown-open"]');
        let closeIcon = dropdownContainer.querySelector('div[class="dropdown-close"]');
        if (!dropdownContent.style.display || dropdownContent.style.display == 'none') {
            dropdownContent.style.display = 'block';
            openIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            dropdownContent.style.display = 'none';
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    }

    /**
     * @param {HTMLElement} element 
     */
    static getDropdownContainer(element) {
        debug.log("Dropdown.getDropdownContainer");
        let dropdownContainer;
        if (elementHasClassname(element, 'dropdown')) {
            return element;
        } else if (elementHasClassname(element, 'dropdown-select')) {
            dropdownContainer = element.parentElement;
        } else if (elementHasClassname(element, 'dropdown-option')) {
            dropdownContainer = element.parentElement.parentElement;
        } else if (elementHasClassname(element, 'dropdown-open') || elementHasClassname(element, 'dropdown-close')) {
            dropdownContainer = element.parentElement;
        }
        return dropdownContainer;
    }

    /**
     * @param {HTMLElement} element 
     */
    static selectDropdownValue(element) {
        debug.log("Dropdown.selectDropdownValue");
        
        let dropdownValue = Number(element.dataset.dropdownOptionValue);
        let dropdownContainer = this.getDropdownContainer(element);
        let dropdownContainerId = dropdownContainer.getAttribute('id');
        let [dropdownContainerType, dropdownContainerTypeIndex] = this.determineDropdownContainerType(dropdownContainerId);
        switch (dropdownContainerType) {
            case 'character-race-dropdown':
                sheetManager.sectionBasic.setRace(dropdownValue);
                break;
            case 'character-class-dropdown':
                sheetManager.sectionClasses.sectionClassesClass.setClass(dropdownContainerTypeIndex, dropdownValue);
                break;
            case 'character-armor-style-dropdown':
                sheetManager.sectionArmors.sectionArmorsArmor.setStyle(dropdownContainerTypeIndex, dropdownValue);
                break;
            case 'character-maneuvers-state-dropdown':
                sheetManager.sectionManeuvers.sectionManeuversManeuver.setState(dropdownContainerTypeIndex, dropdownValue);
                break;
            case 'character-spells-state-dropdown':
                sheetManager.sectionSpells.sectionSpellsSpell.setState(dropdownContainerTypeIndex, dropdownValue);
                break;
            case 'character-spells-class-dropdown':
                sheetManager.sectionSpells.sectionSpellsSpell.setClass(dropdownContainerTypeIndex, dropdownValue);
                break;
            case 'character-skills-group-dropdown':
                sheetManager.sectionSkills.setSkillGroup(dropdownValue);
                break;
            default:
                error.show('Unhandled dropdown select of dropdownContainerType: ' + dropdownContainerType);
        }
        this.toggleDropdown(dropdownContainer);
    }

    /**
     * @param {String} dropdownContainerId 
     * @returns {<[dropdownContainerType: String, dropdownContainerTypeIndex: Number]>}
     */
    static determineDropdownContainerType(dropdownContainerId) {
        let indexStart = dropdownContainerId.indexOf("[");
        let dropdownContainerType = dropdownContainerId;
        let dropdownContainerTypeIndex = null;
        if(indexStart > 0) {
            let indexEnd = dropdownContainerId.indexOf("]");
            dropdownContainerType = dropdownContainerId.substring(0, indexStart);
            dropdownContainerTypeIndex = Number(dropdownContainerId.substring(indexStart + 1, indexEnd));
        }
        return [dropdownContainerType, dropdownContainerTypeIndex];
    }

}

class VersionSegments {
    mayor;
    minor;
    hotfix;

    /**
     * @param {String} version 
     */
    constructor(
        version
    ) {
        let versionSegments = version.split('.');
        this.mayor = versionSegments[0];
        this.minor = versionSegments[1];
        this.hotfix = versionSegments[2];
    }
}

/**
 * @param {HTMLElement} element 
 * @param {String} classname 
 * @returns {Boolean}
 */
function elementHasClassname(element, classname) {
    let classNames = element.className.split(' ');
    return classNames.includes(classname);
}

/**
 * @param {HTMLElement} element 
 * @param {String} id 
 * @returns {HTMLElement}
 */
function getChildElementById(element, id) {
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let childId = child.getAttribute('id');
        if(childId == id) {
            return child;
        }
    }
    return null;
}

/**
 * @param {HTMLElement} element 
 * @param {String} name 
 * @returns {HTMLElement}
 */
function getChildElementByName(element, name) {
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let childName = child.getAttribute('name');
        if(childName == name) {
            return child;
        }
    }
    return null;
}

String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }


function logSymbioteEvent(event) {
    console.log(event);
}