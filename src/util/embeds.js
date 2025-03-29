const { EmbedBuilder } = require('discord.js');
const c = require('./constants');

function warning_msg(message) {
    return new EmbedBuilder()
      .setColor(c.COLOUR_YELLOW)
      .setAuthor({
        name: `${message}`,
    });
}

function error_msg(message) {
    return new EmbedBuilder()
      .setColor(c.COLOUR_RED)
      .setAuthor({
        name: `${message}`,
    });
}

function addedToQueue_msg(title, author, length, requester, thumbnail) {
  return new EmbedBuilder()
    .setColor(c.COLOUR_GREEN)
    .setTitle(title)
    .addFields([
      {
        name: "Author",
        value: `${author}`,
        inline: true,
      },
      {
        name: "Length",
        value: `${length}`,
        inline: true,
      },
      {
        name: "Requester",
        value: `${requester}`,
        inline: true,
      }
    ])
    .setThumbnail(thumbnail);
}

function genshinCharacter_msg(character) {

  let colour = '';
  switch(character.elementType) {
    case c.GENSHIN_ELEMENT_PYRO:
      colour = c.COLOUR_RED;
      break;
    case c.GENSHIN_ELEMENT_CRYO:
      colour = c.COLOUR_WHITE;
      break;
    case c.GENSHIN_ELEMENT_ELECTRO:
      colour = c.COLOUR_PURPLE;
      break;
    case c.GENSHIN_ELEMENT_DENDRO:
      colour = c.COLOUR_GREEN;
      break;
    case c.GENSHIN_ELEMENT_HYDRO:
      colour = c.COLOUR_BLUE;
      break;
    case c.GENSHIN_ELEMENT_ANEMO:
      colour = c.COLOUR_DARK_GREEN;
      break;
    case c.GENSHIN_ELEMENT_GEO:
      colour = c.COLOUR_ORANGE;
      break;
    default:
      colour = c.COLOUR_BLACK;
      break;
  }

  // needs checking 'cause of the travellers
  const birthday = character.birthday === '' ? ' ' : character.birthday;
  const region = character.region === '' ? ' ' : character.region;
  const title = character.title === '' ? ' ' : character.title;
  const affiliation = character.affiliation === '' ? ' ' : character.affiliation;
  
  let image = character.images.cover1;
  if (typeof character.images.mihoyo_icon === 'undefined')
    image = character.images.mihoyo_sideIcon;

  return new EmbedBuilder()
    .setColor(colour)
    .setAuthor({ name: character.name, iconURL: character.images.mihoyo_sideIcon })
    .setDescription(character.description)
    .addFields(
      { name: 'Element', value: character.elementText, inline: true },
      { name: 'Rarity', value: character.rarity + ' star', inline: true },
      { name: 'Weapon', value: character.weaponText, inline: true },
      { name: ' ', value: ' ', inline: false },
      { name: 'Gender', value: character.gender, inline: true },
      { name: 'Birthday', value: birthday, inline: true },
      { name: 'Region', value: region, inline: true },
      { name: ' ', value: ' ', inline: false },
      { name: 'Title', value: title, inline: true },
      { name: 'Affiliation', value: affiliation, inline: true },
      { name: 'Constellation', value: character.constellation, inline: true },
    )
    .setImage(image)
}

function wuwaCharacter_msg(character) {
  let colour = '';
  switch(character.attribute) {
    case 'Fusion':
      colour = c.WUWA_FUSION_COLOUR;
      break;
    case 'Glacio':
      colour = c.WUWA_GLACIO_COLOUR;
      break;
    case 'Aero':
      colour = c.WUWA_AERO_COLOUR;
      break;
    case 'Electro':
      colour = c.WUWA_ELECTRO_COLOUR;
      break;
    case 'Spectro':
      colour = c.WUWA_SPECTRO_COLOUR;
      break;
    case 'Havoc':
      colour = c.WUWA_HAVOC_COLOUR;
      break;
    default:
      colour = "000000";
      break;
  }

  return new EmbedBuilder()
    .setColor(colour)
    .setAuthor({ name: character.name.en, iconURL: character.images.icon })
    .setDescription(character.quote)
    .addFields(
      { name: 'Attribute', value: character.attribute, inline: true },
      { name: 'Rarity', value: character.rarity + ' star', inline: true },
      { name: 'Weapon', value: character.weapon, inline: true },
      { name: ' ', value: ' ', inline: false },
      { name: 'Gender', value: character.gender, inline: true },
      { name: 'Birthday', value: character.birthday, inline: true },
      { name: 'Region', value: character.nation, inline: true },
      { name: ' ', value: ' ', inline: false },
      { name: 'Title', value: character.title, inline: true },
      { name: 'Affiliation', value: character.affiliations[0], inline: true },
      { name: 'Release Date', value: character.releaseDate, inline: true },
    )
    .setImage(character.images.characterSheet)
}

module.exports = {
  warning_msg,
  error_msg,
  addedToQueue_msg,
  genshinCharacter_msg,
  wuwaCharacter_msg,
};