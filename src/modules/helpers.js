exports.randomTitle = function() {
  const titles = [
    "Foobar is coming home",
    "Foobar is not here",
    "Foobar is alone"
  ];

  const randomInt = getRandomIntInclusive(0, titles.length - 1);

  return titles[randomInt];
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
