# Description:
#   Display mission info at the user's request
#
# Dependencies:
#   None
#
# Configuration:
#   MONGODB_URL - MongoDB url
#
# Commands:
#   hubot tutorial focus - Display link to focus tutorial video
#   hubot profile <warframe> - Display link to profile video for specified warframe
#
# Author:
#   nspacestd
#   aliasfalse
util = require('util')
md = require('hubot-markdown')

dsUtil = require('./lib/_utils.js')

module.exports = (robot) ->
  robot.respond /tutorial(.+)/, (res) ->
    tutorial = res.match[1]
    focusReg = /\sfocus/
    if focusReg.test tutorial
      res.send "#{md.codeMulti}#{md.linkBegin}Warframe Focus#{md.linkMid}https://www.youtube.com/watch?v=IMltFZ97oXc#{md.linkEnd}#{md.blockEnd}"
    else
      res.send "#{md.codeMulti}Apologies, Operator, there is no such tutorial registered in my system.#{md.blockEnd}"
      
  robot.respond /profile\s?(.+)/, (res) ->
    warframe = res.match[1]
    profileFormat = "#{md.codeMulti}#{md.linkBegin}Warframe Profile | %s#{md.linkMid}%s#{md.linkEnd}#{md.blockEnd}"
    
    profiles =
      ash :
        regex : "ash(\sprime)?",
        name : "Ash",
        url : "https://youtu.be/wOakp4nbIzw"
      atlas:
        regex : "atlas",
        name : "Atlas",
        url : "https://youtu.be/oiLFg1dPum4"
      banshee:
        regex : "banshee",
        name : "Banshee",
        url : "https://youtu.be/pJz7ZB0RLhY"
      chroma:
        regex : "chroma",
        name : "Chroma",
        url : "https://youtu.be/tseneCFkq24"
      banshee:
        regex : "ember(\sprime)?",
        name : "Ember",
        url : "https://youtu.be/MdM8nUNOASg"
      equinox:
        regex : "equinox",
        name : "Equinox",
        url : "https://youtu.be/Ln-VsCtDVBU"
      excalibur :
        regex : "excalibur(\sprime)?",
        name : "Excalibur",
        url : "https://youtu.be/II8Up3NnZpI"
      frost:
        regex : "frost(\sprime)?",
        name : "Frost",
        url : "https://youtu.be/tecVALgPOFg"
      hydroid:
        regex : "hydroid",
        name : "Hydroid",
        url : "https://youtu.be/z2BHfrR3ikE"
      inaros : 
        regex : "inaros",
        name : "Inarosr",
        url : "https://youtu.be/vYi1ETSjrFM"
      ivara:
        regex : "ivara",
        name : "Ivara",
        url : "https://youtu.be/22RpqR-nCCA"
      limbo:
        regex : "limbo",
        name : "Limbo",
        url : "https://youtu.be/e6VKmuZjrH4"
      loki:
        regex : "loki(\sprime)?",
        name : "Loki",
        url : "https://youtu.be/VXsg-rMTvAM"
      mag:
        regex : "mag(\sprime)?",
        name : "Mag",
        url : "https://youtu.be/TS05wxbrNts"
      mesa:
        regex : "mesa",
        name : "Mesa",
        url : "https://youtu.be/29nFicujxn4"
      mirage:
        regex : "mirage",
        name : "Mirage",
        url : "https://youtu.be/3U8mcBd6yE0"
      nekros:
        regex : "nekros",
        name : "Nekros",
        url : "https://youtu.be/rOO5vS0BpoQ"
      nezha:
        regex : "nezha",
        name : "Nezha",
        url : "https://youtu.be/sPkSgfenxfo"
      nova:
        regex : "nova(\sprime)?",
        name : "Nova",
        url : "https://youtu.be/TxJMDv4dYIU"
      nyx:
        regex : "nyx(\sprime)?",
        name : "Nyx",
        url : "https://youtu.be/JoyQo38BZf4"
      oberon:
        regex : "oberon",
        name : "Oberon",
        url : "https://youtu.be/yAc1tXpH6Ns"
      rhino:
        regex : "rhino(\sprime)?",
        name : "Rhino",
        url : "https://youtu.be/24wDtcTwGvc"
      saryn:
        regex : "saryn(\sprime)?",
        name : "Saryn",
        url : "https://youtu.be/f0Ufldkykko"
      trinity:
        regex : "trinity(\sprime)?",
        name : "Trinity",
        url : "https://youtu.be/1dm7pNIHANo"
      valkyr:
        regex : "valkyr",
        name : "Valkyr",
        url : "https://youtu.be/K-jH6mP37_k"
      vauban:
        regex : "vauban(\sprime)?",
        name : "Vauban",
        url : "https://youtu.be"
      volt:
        regex : "volt(\sprime)?",
        name : "Volt",
        url : "https://youtu.be/ccQ9456TTuo"
      wukong:
        regex : "wukong",
        name : "Wukong",
        url : "https://youtu.be/7n4bjy0PbxY"
      zephyr:
        regex : "zephyr",
        name : "Zephyr",
        url : "https://youtu.be/KurbStEIqrQ"
        
    for profile of profiles
      robot.logger.debug profiles[profile].regex
      robot.logger.debug profiles[profile].name
      robot.logger.debug profiles[profile].url
      if new RegExp(profiles[profile].regex).test(warframe)
        res.send util.format "#{md.codeMulti}#{md.linkBegin}Warframe Profile | %s#{md.linkMid}%s#{md.linkEnd}#{md.blockEnd}", profiles[profile].name, profiles[profile].url
        return;
    
    res.send "#{md.codeMulti}Apologies, Operator, there is no such Warframe profile registered in my system.#{md.blockEnd}"