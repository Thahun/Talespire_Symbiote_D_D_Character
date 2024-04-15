class ConversionDefinition {
    minVersion;
    targetVersion;
    converter;

    /**
     * @param {String} minVersion 
     * @param {String} targetVersion 
     * @param {String} converter 
     */
    constructor(
        minVersion,
        targetVersion,
        converter
    ) {
        this.minVersion = minVersion;
        this.targetVersion = targetVersion;
        this.converter = converter;
    }
}

var converters = {};

class AbstractConverter {
    parent;

    /**
     * @param {CharacterManager} parent 
     */
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * @param {String} version 
     * @returns {Boolean}
     */
    isCurrentVersion(version) {
        return this.parent.version == version;
    }

    /**
     * Convert the given object to the latest version
     * 
     * @param {SheetData|ViewDTO} data 
     * @param {String} version 
     * @returns {SheetData|ViewDTO}
     */
    convertToLatestVersion(data, version) {
        debug.log("AbstractConverter.convertToLatestVersion");
        if(!this.isCurrentVersion(version)) {
            let conversionSteps = this.determineConversionSteps(version);
            for (let i = 0; i < conversionSteps.length; i++) {
                const conversionStep = conversionSteps[i];
                let converter = new converters[conversionStep.converter]();
                converter.convert(data);
            }
        }

        return data;
    }

    /**
     * @param {String} currentVersion 
     * @returns {Array.<ConversionDefinition>}
     */
    determineConversionSteps(currentVersion) {
        debug.log("AbstractConverter.determineConversionSteps");

        currentVersion = new VersionSegments(currentVersion);
        /** @type {Array.<ConversionDefinition>} conversionSteps */
        let conversionSteps = [];
        this.conversionDefinitions.forEach(conversionDefinition => {
            let targetVersion = new VersionSegments(conversionDefinition.targetVersion);
            if(
                targetVersion.mayor > currentVersion.mayor
                || (targetVersion.mayor == currentVersion.mayor && targetVersion.minor > currentVersion.minor)
                || (targetVersion.mayor == currentVersion.mayor && targetVersion.minor == currentVersion.minor && targetVersion.hotfix > currentVersion.hotfix)
            ) {
                conversionSteps.push(conversionDefinition);
            }
        });

        return conversionSteps;
    }
}