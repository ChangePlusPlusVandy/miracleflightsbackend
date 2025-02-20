// dateUtils.js

/**
 * Formats a date string (ISO 8601) to YYYY-MM-DD for Airtable.
 * Handles potential invalid date inputs.
 * @param {string} isoDateString - The date string in ISO 8601 format.
 * @returns {string|null} - The formatted date string (YYYY-MM-DD) or null if the input is invalid.
 */
function formatISODateForAirtable(isoDateString) {
  try {
    const date = new Date(isoDateString);
    return date.toISOString().slice(0, 10);
  } catch (error) {
    console.error('Invalid date:', isoDateString);
    return null; // Or handle the error as needed (e.g., throw an exception)
  }
}

export { formatISODateForAirtable };
