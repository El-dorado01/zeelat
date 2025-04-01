export const formatRelativeDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const isSameDay = (date1: Date, date2: Date) =>
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    let prefix: string;
    if (isSameDay(date, now)) {
        prefix = 'Today';
    } else if (isSameDay(date, yesterday)) {
        prefix = 'Yesterday';
    } else {
        prefix = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return `${prefix}, ${time}`;
};
