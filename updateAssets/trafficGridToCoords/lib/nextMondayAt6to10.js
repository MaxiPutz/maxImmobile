

export function getNextMonday() {
    const now = new Date()
    const nextMonday = new Date(now.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7)))
    nextMonday.setHours(6, 0, 0, 0) // Set the time to 06:00

return nextMonday
}





export function getSecoundMondayOnAugust() {
    const now = new Date();
    let year = now.getFullYear();
    const augustFirst = new Date(year, 7, 1); // August is month 7 (0-indexed)
    const firstMonday = new Date(augustFirst.setDate(augustFirst.getDate() + ((1 + 7 - augustFirst.getDay()) % 7)));
    const secondMonday = new Date(firstMonday.setDate(firstMonday.getDate() + 7)); // Add 7 days to get the second Monday
    secondMonday.setHours(6, 0, 0, 0); // Set the time to 06:00

    // Check if the current date is past the calculated second Monday in August
    if (now > secondMonday) {
        year += 1; // Move to the next year
        const nextAugustFirst = new Date(year, 7, 1);
        const nextFirstMonday = new Date(nextAugustFirst.setDate(nextAugustFirst.getDate() + ((1 + 7 - nextAugustFirst.getDay()) % 7)));
        const nextSecondMonday = new Date(nextFirstMonday.setDate(nextFirstMonday.getDate() + 7));
        nextSecondMonday.setHours(6, 0, 0, 0); // Set the time to 06:00
        return nextSecondMonday;
    }

    return secondMonday;
}
