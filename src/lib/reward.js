var util = require('util');

// Resource names
const resources = [
  'Neural Sensors',
  'Orokin Cell',
  'Neurodes',
  'Alloy Plate',
  'Circuits',
  'Control Module',
  'Ferrite',
  'Gallium',
  'Morphics',
  'Nano Spores',
  'Oxium',
  'Rubedo',
  'Salvage',
  'Plastids',
  'Polymer Bundle',
  'Argon Crystal',
  'Cryotic',
  'Oxium',
  'Tellurium'
];

// Aura names
const auras = [
  'Corrosive Projection',
  'Dead Eye',
  'Enemy Radar',
  'Energy Siphon',
  'Infested Impedance',
  'Physique',
  'Pistol Scavenger',
  'Rejuvenation',
  'Rifle Scavenger',
  'Shield Disruption',
  'Shotgun Scavenger',
  'Sniper Scavenger',
  'Speed Holster',
  'Sprint Boost',
  'Steel Charge'
];

// Nightmare mod names
const nightmare = [
  'Accelerated Blast',
  'Blaze',
  'Constitution',
  'Focus Energy',
  'Fortitude',
  'Hammer Shot',
  'Ice Storm',
  'Rending Strike',
  'Stunning Speed',
  'Wildfire',
  'Animal Instinct',
  'Armored Agility',
  'Seeking Fury'
];

/**
 * Create a new reward instance
 *
 * @constructor
 * @param {object} data Reward data
 */
var Reward = function(data) {
  this.items = data.items;
  this.countedItems = data.countedItems;
  this.credits = data.credits || null;
}

// Possible reward types
Reward.TYPES = {
  HELMET: 'helmet',
  SKIN: 'skin',
  WEAPON: 'weapon',
  VOID_KEY: 'voidKey',
  NITAIN: 'nitain',
  AURA: 'aura',
  RESOURCE: 'resource',
  NIGHTMARE_MOD: 'nightmareMod',
  CLANTECH: 'clantech',
  OTHER: 'other'
}

/**
 * Return a string representation of this reward
 *
 * @return {string} This reward in string format
 */
Reward.prototype.toString = function() {
  var tokens = [];

  for(var i in this.items) {
    tokens.push(this.items[i]);
  }

  for(var i in this.countedItems) {
    tokens.push(util.format('%d %s', this.countedItems[i].ItemCount,
				this.countedItems[i].ItemType));
  }

  if(this.credits) {
    tokens.push(this.credits + ' credits');
  }
  return tokens.join(' + ');
}

Reward.prototype.getTypes = function() {
  var allItems = [].concat(this.items);

  for(var i in this.countedItems) {
    allItems.push(this.countedItems[i].ItemType);
  }

  return allItems.map(getItemType);
}

/**
 * Return the name of a reward type
 *
 * @param {string} item Item type
 *
 * @return {string} Name of the item type
 */
Reward.typeToString = function(type) {
  switch(type) {
    case Reward.TYPES.HELMET:
      return 'Alternative helmets';
    case Reward.TYPES.SKIN:
      return 'Weapon skins';
    case Reward.TYPES.WEAPON:
      return 'Weapons';
    case Reward.TYPES.VOID_KEY:
      return 'Void Keys';
    case Reward.TYPES.NITAIN:
      return 'Nitain Extract';
    case Reward.TYPES.AURA:
      return 'Auras';
    case Reward.TYPES.RESOURCE:
      return 'Resources';
    case Reward.TYPES.NIGHTMARE_MOD:
      return 'Nightmare Mods';
    case Reward.TYPES.CLANTECH:
      return 'ClanTech resources';
    case Reward.TYPES.OTHER:
      return 'Other rewards';
    default:
      return 'Unrecognized type';
  }
}

/**
 * Return the type of an item
 *
 * @param {string} item The item to be categorized
 *
 * @return {string} The item type
 */
function getItemType(item) {
  // Catch vauban parts before helmets (both can have 'helmet' in their name)
  if(/^vauban/i.test(item)) {
    return Reward.TYPES.OTHER;
  }
  else if(/skin/i.test(item)) {
    return Reward.TYPES.SKIN;
  }
  else if(/helmet/i.test(item)) {
    return Reward.TYPES.HELMET;
  }
  else if(/tower/i.test(item)) {
    return Reward.TYPES.VOID_KEY;
  }
  else if(/nitain/i.test(item)) {
    return Reward.TYPES.NITAIN;
  }
  // Skins have already been caught
  else if(/dagger/i.test(item) || /sword/i.test(item) ||
     /glaive/i.test(item)) {
    return Reward.TYPES.WEAPON;
  }
  else if(/fieldron/i.test(item) || /detonite/i.test(item) ||
	  /mutagen/i.test(item)) {
    return Reward.TYPES.CLANTECH;
  }
  else if(auras.indexOf(item) != -1) {
    return Reward.TYPES.AURA;
  }
  else if(resources.indexOf(item) != -1) {
    return Reward.TYPES.RESOURCE;
  }
  else if(nightmare.indexOf(item) != -1) {
    return Reward.TYPES.NIGHTMARE_MOD;
  }
  else {
    return Reward.TYPES.OTHER;
  }
}

module.exports = Reward;
