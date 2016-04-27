var util = require('util');
var dsUtil = require('./_utils.js');

var sortieData = require('./sortieData.json');

/**
 * Create a new sortie instance
 *
 * @constructor
 * @param {object} data Sorie data
 */
var Sorties = function (data) {
  this.expiry = new Date(1000 * data.Expiry.sec);
  this.variants = [];
  for (var index = 0; index < data.Variants.length; index++){
    try {
      var sortie = new Sortie(data.Variants[index]);
      this.variants.push(sortie);
    } catch (err) {
      console.log(err);
      console.log(sortie.boss);
    }
  }
  this.boss = this.variants[0].boss
}

/**
 * Returns a string representation of this sortie object
 * 
 * @return (string) The new string object
 */
Sorties.prototype.toString = function () {
  if(this.isExpired()){
    return 'None'
  }
  var sortieString = util.format('%s%s', 
    dsUtil.codeMulti, 
    this.boss);

  sortieString += util.format(': ends in %s%s', this.getETAString(),
                              dsUtil.doubleReturn);
  this.variants.forEach(function(sortie, i) {
    sortieString += util.format('%s (%s) %s%s',
                                sortie.planet,
                                sortie.missionType,
                                sortie.modifier,
                                dsUtil.lineEnd);
  })
  sortieString +=dsUtil.blockEnd;
  return sortieString;
}

/**
 * Return a string containing the sortie's ETA
 *
 * @return {string} The new string object
 */
Sorties.prototype.getETAString = function() {
  return dsUtil.timeDeltaToString(this.expiry.getTime() - Date.now());
}

/** Returns true if the sortie has expired, false otherwise
 *
 * @return {boolean} Expired-ness of the sortie
 */
Sorties.prototype.isExpired = function() {
  return this.expiry.getTime() < Date.now()
}

/** Returns sortie boss
 *
 * @return {string} Name of sortie boss
 */
Sorties.prototype.getBoss = function() {
  return this.variants[0].boss;
}

var Sortie = function(data) {
  try{
    if(!data)
    {
      return;
    }
    this.boss = sortieData.endStates[data.bossIndex].bossName;
    var region =  sortieData.endStates[data.bossIndex].regions[data.regionIndex];
    this.planet = region.name;
    this.missionType = region.missions[data.missionIndex];
    this.modifier = sortieData.modifiers[data.modifierIndex];
  } catch (err) {
    console.log(JSON.stringify(data));
    console.log(err);
  } finally {
    return;
  }
}

module.exports = Sorties;
