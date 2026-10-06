import { format } from 'date-fns';

// Post dates are calendar days ("2026-10-05", stored as midnight UTC). Build
// the Date from its parts so readers west of UTC don't see the previous day.
export default function formatDate(date: string) {
    const [year, month, day] = date.slice(0, 10).split('-').map(Number);
    return format(new Date(year, month - 1, day), 'LLLL d, yyyy')
}
