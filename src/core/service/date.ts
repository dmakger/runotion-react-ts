import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';


export const formattedData = (date?: string) => {
    if (!date)
        return undefined
    const parsedDate = parseISO(date);
    return format(parsedDate, "d MMMM, HH:mm", { locale: ruLocale });
}