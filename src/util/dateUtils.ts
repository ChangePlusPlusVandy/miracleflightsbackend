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

/**
 * Formats a date string to YYYY-MM-DD based on local time rather than UTC.
 *
 * @param dateInput
 * @returns
 */
function formatLocalDate(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  // Format in local time: YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export { formatISODateForAirtable, formatLocalDate };
