class ViewDataConverter extends AbstractConverter {
    /**
     * If there's nothing to convert, just use "ViewDataConverterToTarget" as the converter. It'll only increase the version
     */
    conversionDefinitions = [
        new ConversionDefinition('0.0.0', '0.1.0', 'ViewDataConverterToTarget'),
        new ConversionDefinition('0.1.0', '0.1.1', 'ViewDataConverterToTarget'),
        new ConversionDefinition('0.1.1', '0.2.0', 'ViewDataConverterTo0_2_0'),
        new ConversionDefinition('0.2.0', '0.2.1', 'ViewDataConverterToTarget'),
        new ConversionDefinition('0.2.1', '0.3.0', 'ViewDataConverterToTarget'),
        new ConversionDefinition('0.3.0', '0.3.1', 'ViewDataConverterToTarget'),
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

converters.ViewDataConverterToTarget = class {
    /**
     * If there's nothing to convert, use this to just increase the version
     * 
     * @param {ViewDTO} data 
     * @param {String} targetVersion 
     * @returns {ViewDTO}
     */
    convert(data, targetVersion) {
        debug.log("ViewDataConverterToTarget.convert");
        data.viewVersion = targetVersion;

        return data;
    }
}

converters.ViewDataConverterTo0_2_0 = class {
    /**
     * @param {ViewDTO} data 
     * @param {String} targetVersion 
     * @returns {ViewDTO}
     */
    convert(data, targetVersion) {
        data.viewVersion = targetVersion;
        
        data.sectionList.push(new ViewSectionDTO('section-familiars', SectionHelper.STATE_CLOSE));

        return data;
    }
}