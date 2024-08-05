export function convertEpochToISO(epoch: number): string {
  const date = new Date(epoch * 1000) // Convert seconds to milliseconds
  const isoString = date.toISOString() // Get ISO 8601 string in UTC timezone
  return isoString
}

export function capitalizeWords(input: string): string {
  return input
    .split(" ") // Split the string into words
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ) // Capitalize first letter and lower the rest
    .join(" "); // Join the words back into a single string
}
