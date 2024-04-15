class StorageService {
    /**
     * Dynamic Set of {CharacterDTO}
     * 
     * {
     *   'charKey1': {CharacterDTO},
     *   'charKey2': {CharacterDTO},
     *   'charKey3': {CharacterDTO}
     * }
     */
    storage;

    /**
     * @param {Object} storage 
     */
    constructor(
        storage = {}
    ) {
        this.storage = storage;
    }

    /**
     * @return {String} 
     */
    getStorageAsString() {
        return this.convertToString(this.storage);
    }

    /**
     * @param {String} data 
     */
    setStorageAsString(data) {
        data = this.convertToObject(data);
        this.validateStorageObject(data);
        this.storage = data;
    }


    /**
     * @return {Object} 
     */
    getStorageAsObject() {
        return this.storage;
    }

    /**
     * @param {Object} data 
     */
    setStorageAsObject(data) {
        this.validateStorageObject(data);
        this.storage = data;
    }


    /**
     * @param {String} key 
     * @return {CharacterDTO} 
     */
    getStorageElement(key) {
        if(!this.keyExists(key)) {
            error.show("Storage key '" + key + "' doesn't exist!");
            throw new Error("Storage key '" + key + "' doesn't exist!");
        }
        return this.storage[key];
    }

    /**
     * If the key already exists, it'll be overwritten, otherwise a new key will be created
     * 
     * @param {String} key 
     * @param {CharacterDTO} data 
     */
    setStorageElement(key, data) {
        this.validateStorageElement(data);
        this.storage[key] = data;
    }

    /**
     * If the key already exists, it'll be overwritten, otherwise a new key will be created
     * 
     * @param {String} key 
     */
    removeStorageElement(key) {
        delete this.storage[key];
    }


    /**
     * @param {Object} data 
     * @return {String} 
     */
    convertToString(data) {
        try {
            return JSON.stringify(data);
        } catch (e) {
            error.show("Failed to convert storage Object to String: " + e.message);
            throw new Error("Failed to convert storage Object to String: " + e.message);
        }
    }

    /**
     * @param {String} data 
     * @return {Object} 
     */
    convertToObject(data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            error.show("Failed to convert storage String to Object: " + e.message);
            throw new Error("Failed to convert storage String to Object: " + e.message);
        }
    }

    /**
     * @param {Object} data 
     */
    validateStorageObject(data) {
        if(!data || typeof data !== 'object' || Array.isArray(data)){
            error.show("Invalid storage object: Not an Object.");
            console.log("Invalid storage object: Not an Object.", data);
            throw new Error("Invalid storage object: Not an Object.");
        }

        let objectKeys = Object.keys(data);
        if(objectKeys.length > 0) {
            for (let i = 0; i < objectKeys.length; i++) {
                let key = objectKeys[i];
                let element = data[key];
                try {
                    this.validateStorageElement(element);
                } catch (e) {
                    error.show("Invalid storage object: Element at key '" + key + "' isn't of type {CharacterDTO}.");
                    console.log("Invalid storage object: Element at key '" + key + "' isn't of type {CharacterDTO}.", data[key]);
                    throw new Error("Invalid storage object: Element at key '" + key + "' isn't of type {CharacterDTO}.");
                }
            }
        }
    }

    /**
     * @param {Object} element
     */
    validateStorageElement(element) {
        if(!element instanceof CharacterDTO) {
            error.show("Element isn't of type {CharacterDTO}.");
            console.log("Element isn't of type {CharacterDTO}.", element);
            throw new Error("Element isn't of type {CharacterDTO}.");
        }
    }

    /**
     * @param {String} key 
     * @returns {Boolean}
     */
    keyExists(key) {
        return Object.hasOwn(this.storage, key);
    }
}