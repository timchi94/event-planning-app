import { ProfileIcon } from "~/components/profileIcon"
import { supabase } from "~/supabase.server"
import { useLoaderData } from "@remix-run/react"

interface Users {
    name: string
    picture: string | null
}

interface Invitees {
    guest_id: number
    confirmation: boolean
    guests: { guest_name: string }
}

interface Event {
    event_id: string
    created_by: number
    title: string
    description: string
    date: string
    location: string
    users: Users
    invitees: Invitees[]
}

export const loader = async ({ params }: { params: { id: string } }) => {
    const { data, error } = await supabase
        .from("events")
        .select(`event_id,
            created_by,
            title,
            description,
            date,
            location,
            users (name, picture),
            invitees (
            guest_id,
            confirmation,
            guests (guest_name))`)
        .eq('event_id', params.id)
    console.log(data)

    if (error) {
        return Response.json({ Error: 'Error fetching event details from database' }, { status: 500 })
    }

    return new Response(JSON.stringify(data[0]), {
        headers: { "Content-Type": "application/json" }
    })
}

const EventDetails = () => {
    const event = useLoaderData<Event>()

    function formatDate(dateString: string) {
        const date = new Date(dateString)
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
    }

    return (
        <div className="bg-pinkPrimary">
            <div className="py-8 mx-8 min-h-screen md:py-12 md:mx-12 xl:w-desktop xl:mx-auto">
                <h1 className="text-4xl font-bold pb-4 text-grayPrimary font-serif md:text-5xl md:pb-8">{event.title}</h1>
                <div className="flex flex-col gap-4 py-4">
                    <p className="text-grayPrimary text-lg md:text-xl font-bold">{formatDate(event.date)}</p>
                    <p className="text-grayPrimary md:text-lg">{event.description}</p>
                    <p className="text-grayPrimary md:text-lg">Find us at <a href={`https://www.google.com/maps?q=${event.location}`} className="underline">{event.location}</a></p>
                    <div className="flex items-center">
                        <p className="text-grayPrimary md:text-lg min-w-24 md:min-w-32">Organizer</p>
                        <div className="bg-greenPrimary rounded-full w-8 h-8 md:h-10 md:w-10 overflow-hidden" >
                            {event.users.picture ? (
                                <img className="w-8 h-8 md:h-10 md:w-10" src={event.users.picture} />
                            ) : (
                                <ProfileIcon style={'w-8 h-8 md:h-10 md:w-10'} />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="text-grayPrimary md:text-lg min-w-24 md:min-w-32">Attendees</p>
                        {event.invitees.map((invitee) => (
                            <div className="bg-greenPrimary rounded-full w-8 h-8 md:h-10 md:w-10 flex items-center justify-center" >
                                <p className="text-grayPrimary">{invitee.guests.guest_name[0].toUpperCase()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails