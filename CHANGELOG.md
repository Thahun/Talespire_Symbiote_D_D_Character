# Changelog
## 0.3.1
- Fixed view converter

## 0.3.0
- Change storage from "TS.localStorage.campaign" to "TS.localStorage.global" to enable char preparation and usage across different campaigns
- Simplyfied the definition of validators and converters for versions without real changes in data structure

## 0.2.1
- Bugfix: Running multiplier and carrying penalties got lost when persisting
- Bugfix: Armors closed when de-/activating them
- Added: Race "Dragonkin"
- Update: Default state of char select changed to "open"

## 0.2.0
- Added: A section for familiars.

## 0.1.1
- Added: A field to set special movement for "fly". As distance/speed of fly depends on how a character gains fly, it's not calculated and by that a manual value, not reduces when overloaded. But following rules the lift limit should be still applied.