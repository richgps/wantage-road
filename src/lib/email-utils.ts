// Simple email obfuscation to help prevent harvesting by bots
export const obfuscateEmail = (email: string): { display: string; mailto: string } => {
  // Replace @ and . with HTML entities for display
  const display = email.replace("@", " [at] ").replace(/\./g, " [dot] ")

  // For the mailto link, encode each character to make it harder for bots to parse
  const mailto = email
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("")

  return { display, mailto }
}
