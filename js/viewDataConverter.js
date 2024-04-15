class ViewDataConverter extends AbstractConverter {
    conversionDefinitions = [
        new ConversionDefinition('0.0.0', '0.1.0', 'ViewDataConverterTo0_1_0'),
        new ConversionDefinition('0.1.0', '0.1.1', 'ViewDataConverterTo0_1_1'),
        new ConversionDefinition('0.1.1', '0.2.0', 'ViewDataConverterTo0_2_0'),
        new ConversionDefinition('0.2.0', '0.2.1', 'ViewDataConverterTo0_2_1'),
    ];

    /**
     * @param {ViewDTO} data 
     * @returns {ViewDTO}
     */
    convertToLatestVersion(data) {
        debug.log("ViewDataConverter.convertToLatestVersion");

        return super.convertToLatestVersion(data, data.viewVersion)
    }
}

converters.ViewDataConverterTo0_1_0 = class {
    /**
     * This is just an example
     * 
     * @param {ViewDTO} data 
     * @returns {ViewDTO}
     */
    convert(data) {
        debug.log("ViewDataConverterTo0_1_0.convert");

        data.viewVersion = '0.1.0';

        return data;
    }
}

converters.ViewDataConverterTo0_1_1 = class {
    /**
     * Conversion from v0.1.0 to v0.1.1
     * 
     * @param {ViewDTO} data 
     * @returns {ViewDTO}
     */
    convert(data) {
        debug.log("ViewDataConverterTo0_1_1.convert");

        data.viewVersion = '0.1.1';

        return data;
    }
}

converters.ViewDataConverterTo0_2_0 = class {
    /**
     * Conversion from v0.1.1 to v0.2.0
     * 
     * @param {ViewDTO} data 
     * @returns {ViewDTO}
     */
    convert(data) {
        debug.log("ViewDataConverterTo0_2_0.convert");

        data.viewVersion = '0.2.0';
        data.sectionList.push(new ViewSectionDTO('section-familiars', SectionHelper.STATE_CLOSE));

        return data;
    }
}

converters.ViewDataConverterTo0_2_1 = class {
    /**
     * Conversion from v0.2.0 to v0.2.1
     * 
     * @param {ViewDTO} data 
     * @returns {ViewDTO}
     */
    convert(data) {
        debug.log("ViewDataConverterTo0_2_1.convert");

        data.viewVersion = '0.2.1';

        return data;
    }
}