export const truncate = (str: string, limit: number = 30) => {
    return str.slice(0, limit) +
        (str.length > limit ? "..." : "")
}
