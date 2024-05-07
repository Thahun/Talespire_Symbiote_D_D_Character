class CharacterDataConverter extends AbstractConverter {
    /**
     * If there's nothing to convert, just use "ViewDataConverterToTarget" as the converter. It'll only increase the version
     */
    conversionDefinitions = [
        new ConversionDefinition('0.0.0', '0.1.0', 'SheetDataConverterToTarget'),
        new ConversionDefinition('0.1.0', '0.1.1', 'SheetDataConverterTo0_1_1'),
        new ConversionDefinition('0.1.1', '0.2.0', 'SheetDataConverterTo0_2_0'),
        new ConversionDefinition('0.2.0', '0.2.1', 'SheetDataConverterToTarget'),
        new ConversionDefinition('0.2.1', '0.3.0', 'SheetDataConverterToTarget'),
    ];

    /**
     * @param {SheetData} data 
     * @returns {SheetData}
     */
    convertToLatestVersion(data) {
        debug.log("CharacterDataConverter.convertToLatestVersion");

        return super.convertToLatestVersion(data, data.sheetVersion)
    }
}

converters.SheetDataConverterToTarget = class {
    /**
     * If there's nothing to convert, use this to just increase the version
     * 
     * @param {SheetData} data 
     * @param {String} targetVersion
     * @returns {SheetData}
     */
    convert(data, targetVersion) {
        debug.log("SheetDataConverterToTarget.convert");
        data.sheetVersion = targetVersion;

        return data;
    }
}

converters.SheetDataConverterTo0_1_1 = class {
    /**
     * @param {SheetData} data 
     * @returns {SheetData}
     */
    convert(data, targetVersion) {
        data.sheetVersion = targetVersion;
        
        data.movement.specialRoundFly = 0;

        return data;
    }
}

converters.SheetDataConverterTo0_2_0 = class {
    /**
     * @param {SheetData} data 
     * @returns {SheetData}
     */
    convert(data, targetVersion) {
        data.sheetVersion = targetVersion;

        data.familiars = new SheetDataFamiliarsDTO([]);

        return data;
    }
}