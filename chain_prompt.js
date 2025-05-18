/**
 * Converts a string to kebab-case.
 * - Replaces spaces, underscores, and camelCase boundaries with hyphens.
 * - Trims leading/trailing whitespace.
 * - Normalizes multiple consecutive separators to a single hyphen.
 * - Converts all letters to lowercase.
 * - Returns an empty string for null/undefined/non-string input.
 * - Throws TypeError if input is not a string.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The kebab-case version of the input.
 * @throws {TypeError} If input is not a string.
 */
function toKebabCase(str) {
    if (str == null) return '';
    if (typeof str !== 'string') throw new TypeError('Input must be a string');

    // Trim whitespace
    let result = str.trim();

    // Handle camelCase: insert hyphen before uppercase letters (not at start)
    result = result.replace(/([a-z0-9])([A-Z])/g, '$1-$2');

    // Replace spaces and underscores with hyphens
    result = result.replace(/[\s_]+/g, '-');

    // Normalize multiple consecutive hyphens to a single hyphen
    result = result.replace(/-+/g, '-');

    // Convert to lowercase
    result = result.toLowerCase();

    // Remove leading/trailing hyphens (if any)
    result = result.replace(/^-+|-+$/g, '');

    return result;
}

// Usage examples:
console.log(toKebabCase("Hello World_test"));      // "hello-world-test"
console.log(toKebabCase("  Hello__World  "));      // "hello-world"
console.log(toKebabCase("helloWorldAgain"));       // "hello-world-again"
console.log(toKebabCase(null));                    // ""
console.log(toKebabCase(123));                     // Throws TypeError