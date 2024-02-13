function getRandomNumberUtil(ceil) {
    return Math.floor(Math.random() * (ceil - 1 + 1)) + 1;
}

module.exports = getRandomNumberUtil