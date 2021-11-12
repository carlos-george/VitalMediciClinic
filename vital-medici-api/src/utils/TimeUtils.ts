const convertHourToMinutes = (time: string) => {
    const [hour, minutes] = time.split(':').map(Number);

    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
};

const convertMinutesToHour = (time: string | Number) => {
    const minutes = Number(time);

    const realmin = minutes % 60;
    const realMinFormated = realmin < 10 ? "0" + realmin : realmin;
    const hours = Math.floor(minutes / 60);

    return `${hours}:${realMinFormated}`;
};

export { convertHourToMinutes, convertMinutesToHour }