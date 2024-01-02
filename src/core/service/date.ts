import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { Locale } from 'date-fns';

export const formattedData = (date?: string) => {
    if (!date)
        return undefined;

    const parsedDate = parseISO(date);
    return format(parsedDate, "d MMMM, HH:mm", { locale: ruLocale as unknown as Locale });
}
