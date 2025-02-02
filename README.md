# D&D Character

This symbiote enables you to manage your D&D characters directly in Talespire.
So there's no need anymore to use an external spreadsheet in parallel.

## Features
- Creating, modifying, persistig and loading your characters
- Exporting a character as well as importing a character
- Automatic updates of related stats, like the race modifiers added to attributes
- Rolling dices for your character directly from the symbiote so no need to manually pick your dices
- "Other" modifiers can be added/removed, named and de-/activated where ever needed
- Weapons, armor and equipment can be marked as active or inactive (worn/carried or not)
- Maneuvers and skills can be marked as e.g. prepared or used

## Installation
1. Download the repository as an archive
2. Extract it to your Talespire Symbiote folder, e.g. `C:\Users\<USERNAME>\AppData\LocalLow\BouncyRock Entertainment\TaleSpire\Symbiotes\`
3. If not yet done, [activate Symbiotes in Talespire](https://symbiote-docs.talespire.com/user_docs.html)
4. Open the side panel, when you're on a campaign map and start creating your character

## Usage
See [introduction](doc/INTRODUCTION.md)

### Future Features
- Extend Weapon "Attack", by "other" modifiers or
- Add further named attack sets (e.g. for chars with more than one attack)
    - Dropdown at Weapons to pick the desired attack set
    - Some Feats like the following allow to use other attributes for attacks: https://www.d20pfsrd.com/feats/combat-feats/weapon-finesse-combat/

- Enable to add custom skills in addition to the selected skillGroup

- Add further armor slots (head, gloves, chest, trouser, boots) in addition to general body

- Enable to add further equipment slots (like additional bags)

- zu den Zauberdetails hinzufügen
    - V (= verbal), G (= Geste), M (= Material), F Fokus (bleibt), GF Göttlicher Fokus und EP Erfahrungspunkte (Checkboxen) + Text Feld bei Material und Fokus
    - Zauberreichweite als Dropdown
    - Wirkdauer
    - Wirkungsbereich
    - Schadenswürfel als Input mit Icon
    - Angriffswurf: Kommt total auf den Zauber an. Manche Zauber keine Probe ( magic missle) andere Zauber dann ranged touch. Dann ist es Standard fernkampf aber der Gegner hat sehr wenig Rüstung) hat der Gegner keine spell resistente Abwehr dann muss er einen rettungswurf machen. Wenn doch dann musst du vorher ne Probe machen die resi zu überwinden. Die ist dann zauberstufe + casterlvl + caster Attribut mod.
    - Link to open in browser

- Extract datatables to json files (see manifestHelper.js how to load them)

- Implement a PDF export for offline usage (PDF by LaTex)

- Get languages from translation files instead of being hardcoded

- Trigger throwing initiative dices by chat message from GM ?

- Paginagion to open multiple characters in parallel (for GMs)

- Provide a way to add new classes to the dropdown

- Dropdowns to pick maneuvers
    - Provide a way to add new maneuvers to the dropdown

- Dropdowns to pick spells
    - Provide a way to add new spells to the dropdown