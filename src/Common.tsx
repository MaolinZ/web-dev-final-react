export const truncate = (str: string, limit: number = 32) => {
    return str.slice(0, limit) +
        (str.length > limit ? "..." : "")
}
