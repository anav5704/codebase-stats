const ignorePaths = ["node_modules", "package-lock.json"]

export const isValid = (path: string): boolean => {
    if (path.startsWith(".")) return false
    if (path.endsWith(".png")) return false
    if (path.endsWith(".jpg")) return false
    if (path.endsWith(".webp")) return false
    if (ignorePaths.includes(path)) return false
    return true
}