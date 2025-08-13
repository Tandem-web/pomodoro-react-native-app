export const formatTime = (seconds: number): string => {
    const totalMinutes = Math.floor(seconds / 60);

    if (totalMinutes < 60) {
        return `${totalMinutes} min`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${hours} h ${remainingMinutes} min`;
};
