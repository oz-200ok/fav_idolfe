import { useState } from "react"

type T_Schedule = 'munsley' | 'weekly'| 'yearly';

export default function Schedule () {
    const [scheduleType, setScheduleType] = useState<T_Schedule>('munsley')

    return (
        <div>
            {scheduleType}
        </div>
    )
}