class CharacterDataConverter extends AbstractConverter {
    conversionDefinitions = [
        new ConversionDefinition('0.0.0', '0.1.0', 'SheetDataConverterTo0_1_0'),
        new ConversionDefinition('0.1.0', '0.1.1', 'SheetDataConverterTo0_1_1'),
        new ConversionDefinition('0.1.1', '0.2.0', 'SheetDataConverterTo0_2_0'),
        new ConversionDefinition('0.2.0', '0.2.1', 'SheetDataConverterTo0_2_1'),
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

converters.SheetDataConverterTo0_1_0 = class {
    /**
     * This is just an example
     * 
     * @param {SheetData} data 
     * @returns {SheetData}
     */
    convert(data) {
        debug.log("SheetDataConverterTo0_1_0.convert");

        data.sheetVersion = '0.1.0';

        return data;
    }
}

converters.SheetDataConverterTo0_1_1 = class {
    /**
     * Conversion from v0.1.0 to v0.1.1
     * 
     * @param {SheetData} data 
     * @returns {SheetData}
     */
    convert(data) {
        debug.log("SheetDataConverterTo0_1_1.convert");

        data.sheetVersion = '0.1.1';
        data.movement.specialRoundFly = 0;

        return data;
    }
}

converters.SheetDataConverterTo0_2_0 = class {
    /**
     * Conversion from v0.1.1 to v0.2.0
     * 
     * @param {SheetData} data 
     * @returns {SheetData}
     */
    convert(data) {
        debug.log("SheetDataConverterTo0_2_0.convert");

        data.sheetVersion = '0.2.0';
        data.familiars = new SheetDataFamiliarsDTO([]);

        return data;
    }
}

converters.SheetDataConverterTo0_2_1 = class {
    /**
     * Conversion from v0.2.0 to v0.2.1
     * 
     * @param {SheetData} data 
     * @returns {SheetData}
     */
    convert(data) {
        debug.log("SheetDataConverterTo0_2_1.convert");

        data.sheetVersion = '0.2.1';

        return data;
    }
}