class CheckPenaltyHelper extends AbstractSheetHelper {
    parent;

    static SOURCE_ARMOR = 'armor';
    static SOURCE_CARRYING = 'carrying';
    static SOURCE_WEIGHT = 'weight'

    /**
     * @param {SheetManager} parent 
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Sets check penalty by armor and weight
     * Impacting STR/DEX features (see CharacterDataTables.skills) and Rescue Checks
     * 
     * @param {String} source 
     * @param {Number} penalty 
     */
    setCheckPenalty(source, penalty) {
        debug.log("CheckPenaltyHelper.setCheckPenalty");

        let targets = [];
        switch(source) {
            case CheckPenaltyHelper.SOURCE_ARMOR:
            case CheckPenaltyHelper.SOURCE_CARRYING:
                targets.push(new GetterSetterCallbackDTO(this.parent.sectionRescues, 'getPenalty', [SheetSectionRescues.RESCUE_TYPE_REFLEX], 'setPenalty', [SheetSectionRescues.RESCUE_TYPE_REFLEX]));

                if(this.parent.sectionSkills.isSkillGroupSelected()) {
                    let skillGroupId = this.parent.sectionSkills.getSkillGroup().id;
                    let skills = CharacterDataTables.getSkills(skillGroupId, null, true);
                    for (let i = 0; i < skills.length; i++) {
                        let skillId = skills[i].id;
                        targets.push(new GetterSetterCallbackDTO(this.parent.sectionSkills.sectionSkillsSkill, 'getPenalty', [skillId], 'setPenalty', [skillId]));
                    }
                }
                break;
            case CheckPenaltyHelper.SOURCE_WEIGHT:
                //weight penalty on swimming
                if(this.parent.sectionSkills.isSkillGroupSelected()) {
                    let skillGroupId = this.parent.sectionSkills.getSkillGroup().id;
                    let skillGroupObj = CharacterDataTables.getSkillGroupById(skillGroupId);
                    let skillId = 31;

                    if(skillGroupObj.skills.includes(skillId)) {
                        targets.push(new GetterSetterCallbackDTO(this.parent.sectionSkills.sectionSkillsSkill, 'getPenalty', [skillId], 'setPenalty', [skillId]));
                    }
                }
                break;
        }

        for (let i = 0; i < targets.length; i++) {
            let modified = false;

            let callback = targets[i];
            let penaltyData = CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.getterMethod, callback.getterParameters));
            if(!penaltyData) {
                continue;
            }
            if(penalty != null && penalty >= 0) {
                if(penaltyData[source] != penalty) {
                    penaltyData[source] = penalty;
                    modified = true;
                }
            } else {
                if(source in penaltyData) {
                    delete penaltyData[source];
                    modified = true;
                }
            }
            
            if(modified) {
                let parameters = callback.setterParameters;
                parameters.push(penaltyData);
                CallbackHelper.executeCallback(new MethodCallbackDTO(callback.object, callback.setterMethod, parameters), false);
            }
        }
    }

    /**
     * @param {Object} penaltyList
     * @returns {Number}
     */
    calculateCheckPenalty(penaltyList) {
        debug.log("CheckPenaltyHelper.calculateCheckPenalty");

        let penalty = 0;
        let penalties = Object.values(penaltyList);
        for (let i = 0; i < penalties.length; i++) {
            penalty += Number(penalties[i]);
        }

        return penalty;
    }
}