export interface BookingActivity {
    id: string
    bookingId: string
    customerName: string
    serviceType: string
    dateTime: string
    status: 'Confirmed' | 'Pending' | 'Cancelled'
    amount: string
}

export const STAT_CARDS_DATA = [
    {
        id: 'existing-users',
        title: 'Existing Users',
        value: '5.653',
        trend: { value: '40% vs last month', direction: 'up' as const },
        chartData: [30, 45, 100, 65, 80, 50],
        highlightIndex: 2,
        colorScheme: 'blue' as const,
    },
    {
        id: 'new-users',
        title: 'New Users',
        value: '1600',
        trend: { value: '15% vs last month', direction: 'up' as const },
        chartData: [30, 65, 80, 50, 100, 55],
        highlightIndex: 4,
        colorScheme: 'green' as const,
    },
    {
        id: 'total-bookings',
        title: 'Total Bookings',
        value: '54,200',
        trend: { value: '10% vs last month', direction: 'down' as const },
        chartData: [35, 55, 75, 100, 85, 50],
        highlightIndex: 3,
        colorScheme: 'amber' as const,
    },
]
export const MOCK_ACTIVITIES: BookingActivity[] = [
    {
        id: '1',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
    {
        id: '2',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
    {
        id: '3',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
    {
        id: '4',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
    {
        id: '5',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
    {
        id: '6',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
    {
        id: '7',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
    {
        id: '8',
        bookingId: 'BK-10234',
        customerName: 'Jonnuel Doe',
        serviceType: 'Event Center',
        dateTime: 'Feb 2, 2025, 5:00 PM',
        status: 'Confirmed',
        amount: '$10,000',
    },
]