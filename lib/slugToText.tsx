export function slugToText(slug) {
    // Replace hyphens with spaces and capitalize each word
    return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
