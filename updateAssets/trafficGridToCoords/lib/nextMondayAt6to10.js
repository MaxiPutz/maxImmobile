

export function getNextMonday() {
    const now = new Date()
    const nextMonday = new Date(now.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7)))
    nextMonday.setHours(6, 0, 0, 0) // Set the time to 06:00

return nextMonday
}