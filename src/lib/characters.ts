export function getRandomAlphabetExceptX() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const validLetters = alphabet.replace("x", ""); // Remove 'x' from the alphabet

  const randomIndex = Math.floor(Math.random() * validLetters.length);
  return validLetters[randomIndex];
}
