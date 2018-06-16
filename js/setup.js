'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var FAMILY_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var createRandomElement = function (elementsArray) {
  return elementsArray[Math.floor(Math.random() * elementsArray.length)];
};

var createCharacter = function () {
  var character = {
    name: createRandomElement(NAMES),
    familyName: createRandomElement(FAMILY_NAMES),
    coatColor: createRandomElement(COAT_COLORS),
    eyesColor: createRandomElement(EYES_COLORS)
  };
  return character;
};

var generateCharacters = function (count) {
  var characters = [];
  for (var i = 0; i < count; i++) {
    characters.push(createCharacter());
  }
  return characters;
};

var renderCharacters = function (characters) {
  for (var i = 0; i < characters.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = characters[i].name + ' ' + characters[i].familyName;
    wizardElement.querySelector('.wizard-coat').style.fill = characters[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = characters[i].eyesColor;
    similarListElement.appendChild(wizardElement);
  }
};

renderCharacters(generateCharacters(4));
