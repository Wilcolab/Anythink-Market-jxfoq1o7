/**
 * Converts a given string to a dot-separated, lowercased format.
 *
 * The function performs the following transformations:
 * - Trims leading and trailing whitespace from the input.
 * - Removes any leading digits, non-word characters, or underscores.
 * - Splits the string into words by detecting camelCase boundaries and any sequence of non-alphanumeric characters.
 * - Converts all words to lowercase.
 * - Joins the words using dots ('.') as separators.
 *
 * @param {string} input - The string to be converted.
 * @returns {string} The dot-separated, lowercased version of the input string.
 * @throws {TypeError} Throws if the input is not a string.
 *
 * @example
 * toCamelCase('  HelloWorld_test-case  '); // Returns 'hello.world.test.case'
 * @example
 * toCamelCase('123_fooBar'); // Returns 'foo.bar'
 */
function toCamelCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    // Trim whitespace
    let str = input.trim();

    // Remove leading digits and any separators after them
    str = str.replace(/^[\d\W_]+/, '');

    // Split by any sequence of non-alphanumeric characters or camelCase boundaries
    const words = str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Split camelCase
        .split(/[^a-zA-Z0-9]+|[\s]+/)
        .filter(Boolean);

    // Lowercase all words and join with dots
    return words.map(w => w.toLowerCase()).join('.');
}
