'use strict';

var setupBlock = document.querySelector('.setup');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var FAMILY_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

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

var renderCharacter = function (character) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = character.name + ' ' + character.familyName;
  wizardElement.querySelector('.wizard-coat').style.fill = character.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = character.eyesColor;
  return wizardElement;
};

var characters = generateCharacters(4);

var fragment = document.createDocumentFragment();
for (var i = 0; i < characters.length; i++) {
  fragment.appendChild(renderCharacter(characters[i]));
}
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

var openSetup = function () {
  setupBlock.classList.remove('hidden');
  document.removeEventListener('keydown', onSetupOpenEnterClick);
  document.addEventListener('keydown', onSetupEscClick);
  document.addEventListener('keydown', onSetupEnterClick);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);
};

var closeSetup = function () {
  setupBlock.classList.add('hidden');
  document.addEventListener('keydown', onSetupOpenEnterClick);
  document.removeEventListener('keydown', onSetupEscClick);
  document.removeEventListener('keydown', onSetupEnterClick);
  wizardCoat.removeEventListener('click', onWizardCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  wizardFireball.removeEventListener('click', onWizardFireballClick);
};

var onSetupOpenClick = function () {
  openSetup();
};
setupOpen.addEventListener('click', onSetupOpenClick);

var onSetupCloseClick = function () {
  closeSetup();
};
setupClose.addEventListener('click', onSetupCloseClick);

var onSetupOpenEnterClick = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && document.activeElement === setupOpen) {
    openSetup();
  }
};
document.addEventListener('keydown', onSetupOpenEnterClick);

var onSetupEscClick = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    closeSetup();
  }
};

var onSetupEnterClick = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && document.activeElement === setupClose) {
    closeSetup();
  }
};

var changeWizardCoat = function () {
  var color = createRandomElement(COAT_COLORS);
  wizardCoat.style.fill = color;
  document.querySelector('input[name="coat-color"]').value = color;
};

var changeWizardEyes = function () {
  var color = createRandomElement(EYES_COLORS);
  wizardEyes.style.fill = color;
  document.querySelector('input[name="eyes-color"]').value = color;
};

var changeWizardFireball = function () {
  var color = createRandomElement(FIREBALL_COLORS);
  wizardFireball.style.background = color;
  document.querySelector('input[name="fireball-color"]').value = color;
};

var onWizardCoatClick = function () {
  changeWizardCoat();
};

var onWizardEyesClick = function () {
  changeWizardEyes();
};

var onWizardFireballClick = function () {
  changeWizardFireball();
};
