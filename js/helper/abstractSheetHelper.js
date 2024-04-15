class AbstractSheetHelper {
    DATA_TYPE_BOOLEAN = 'Boolean';
    DATA_TYPE_NUMBER = 'Number';
    DATA_TYPE_STRING = 'String';

    STATE_ACTIVE = true;
    STATE_INACTIVE = false;

    STATE_ACTIVE_CLASSNAME = 'active';
    STATE_INACTIVE_CLASSNAME = 'inactive';

    INDEX_PLACEHOLDER = '%index%';

    COLOR_CODE_RED = '#a80000';

    /**
     * Sets the index into e.g. a fieldname string
     * Replaces the placeholder '%index%'
     * 
     * @param {String} string 
     * @param {Number} index 
     * @returns {String}
     */
    setIndexToString(string, index) {
        return string.replaceAll(this.INDEX_PLACEHOLDER, index)
    }

    /**
     * @param {String} elementId 
     * @returns {HTMLElement}
     */
    getElementById(elementId) {
        let element = document.getElementById(elementId);
        if(!element) {
            return null;
        }

        return element;
    }

    /**
     * Returns always the first element found by name or NULL
     * 
     * @param {String} inputName 
     * @returns {HTMLElement}
     */
    getElementByName(inputName) {
        let element = document.getElementsByName(inputName)[0];
        if(!element) {
            return null;
        }
        return element;
    }

    /**
     * Returns the (type casted) value of the first element found by name or NULL
     * 
     * @param {String} inputName 
     * @param {String} castToType 
     * @returns {Any|null}
     */
    getElementValueByName(inputName, castToType = null) {
        let element = this.getElementByName(inputName);
        if(!element) {
            //console.log('Element doesn\'t exist: ' + inputName);
            return null;
        }

        switch(castToType) {
            case this.DATA_TYPE_BOOLEAN:
                let value = false;
                if(element.value === true || element.value === 'true' || element.value === 1) {
                    value = true;
                }
                return value;
            case this.DATA_TYPE_NUMBER:
                return Number(element.value);
            case this.DATA_TYPE_STRING:
                return String(element.value);
            default:
                return element.value;
        }     
    }

    /**
     * Set the value of the first element found by name
     * If id is provided it'll be set to dataset.id
     * 
     * @param {String} inputName 
     * @param {Any} value 
     * @param {Number|null} value 
     */
    setElementValueByName(inputName, value, id = null) {
        let element = this.getElementByName(inputName);
        if(!element) {
            console.log('Element doesn\'t exist: ' + inputName);
        }
        
        if(id != null) {
            element.dataset.id = id;
        }
        let oldValue = element.value;
        if(oldValue != value) {
            element.value = value;
            
            var event = new Event('change');
            element.dispatchEvent(event);
        }
    }

    /**
     * Returns the checked state of the first element found by name or NULL
     * 
     * @param {String} inputName 
     * @returns {Boolean|null}
     */
    getElementCheckedStateByName(inputName) {
        let element = this.getElementByName(inputName);
        if(!element) {
            return null;
        }

        return element.checked;
    }

    /**
     * Set the checked state of the first element found by name or NULL
     * 
     * @param {String} inputName 
     * @param {Boolean} active 
     */
    setElementCheckedStateByName(inputName, active = true) {
        let element = this.getElementByName(inputName);
        element.checked = active;

        if(typeof element.onchange === 'function') {
            element.onchange();
        }
    }


    /**
     * Set the color of an element
     * e.g. to mark it red in case of invalid values
     * 
     * @param {String} inputName 
     * @param {String} colorCode 
     */
    setElementColorByName(inputName, colorCode = null) {
        let element = this.getElementByName(inputName);
        element.style.color = colorCode;
    }

    /**
     * Remove an HTMLElement by it's id
     * 
     * @param {String} elementId 
     */
    removeElementById(elementId) {
        let element = this.getElementById(elementId);
        if(element) {
            element.remove();
        }
    }

    /**
     * @param {Boolean} state 
     * @returns {String}
     */
    getStateCssClassByState(state) {
        switch(state) {
            case this.STATE_ACTIVE: return this.STATE_ACTIVE_CLASSNAME;
            case this.STATE_INACTIVE: return this.STATE_INACTIVE_CLASSNAME;
            default: error.show('Invalid state "' + state + '"!');
        }
    }

    /**
     * Get a list of all used indexes by fieldname
     * Default data type is {Number}
     * 
     * @param {String} fieldName 
     * @param {String} castToType 
     * @returns {Array.<Boolean|Number|String>}
     */
    getIndexes(fieldName, castToType = this.DATA_TYPE_NUMBER) {
        let indexes = [];
        let elements = document.getElementsByName(fieldName);
        for (let i = 0; i < elements.length; i++) {
            let index = elements[i].value;
            switch(castToType) {
                case this.DATA_TYPE_BOOLEAN:
                    if(index === true || index === 'true' || index === 1) {
                        index = true;
                    } else {
                        index = false;
                    }
                    break;
                case this.DATA_TYPE_NUMBER:
                    index = Number(index);
                    break;
                case this.DATA_TYPE_STRING:
                    index = String(index);
                    break;
            }
            indexes.push(index);
        }

        return indexes;
    }

    /**
     * Determine the next available index
     * 
     * @param {String} fieldName 
     * @returns {Number}
     */
    determineNextIndex(fieldName) {
        let lastIndex = 0;
        let indexes = this.getIndexes(fieldName)
        for(let i = 0;i < indexes.length; i++) {
            let index = indexes[i];
            if(index > lastIndex) {
                lastIndex = index;
            }
        }
        return lastIndex + 1;
    }

    /**
     * @param {String} optionsContainerId 
     * @param {Array.<{key: Number, value: String}>} options
     */
    createDropdown(optionsContainerId, options) {
        let dropdownOptionsElement = this.getElementById(optionsContainerId);
        Dropdown.addOptions(dropdownOptionsElement, options);
    }

    /**
     * Adds an eventListener with a callback function
     * 
     * @param {HTMLElement} element 
     * @param {MethodCallbackDTO} callback
     * @param {String|null} eventType 
     */
    addEvent(element, callback, eventType = 'change') {
        callback.object[callback.method] = callback.object[callback.method].bind(this);
        element.addEventListener(
            eventType,
            function() {
                callback.object[callback.method](...callback.parameters);  
            },
            false
        );
    }
}