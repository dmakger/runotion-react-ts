import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

export const formattedData = (date?: string, defaultValue?: string) => {
    if (!date)
        return defaultValue;

    const parsedDate = parseISO(date);
    return format(parsedDate, "d MMMM, HH:mm", { locale: ru });
}
