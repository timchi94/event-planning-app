import EventDetails from "~/components/EventDetails"
import { useState } from "react"

const EventDetailsPage = () => {
    const [isHost, setIsHost] = useState(false)

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <div className="bg-greenPrimary">
            <EventDetails />
            {isHost && (
                <p className="text-grayPrimary md:text-lg hover:cursor-pointer underline">To invite people to this event copy the link to this event <span className="underline hover:cursor-auto" onClick={copyLink}>HERE</span> and share with guests</p>
            )}
        </div>
    )
}

export default EventDetailsPage