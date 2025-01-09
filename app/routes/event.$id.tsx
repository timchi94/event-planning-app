import { supabase } from "~/supabase.server"
import { useLoaderData } from "@remix-run/react"

interface Event {
    event_id: string
    created_by: number
    title: string
    description: string
    date: string
    location: string
}

export const loader = async ({ params }: { params: { id: string } }) => {
    const { data, error } = await supabase
        .from("events")
        .select('event_id, created_by, title, description, date, location')
        .eq('event_id', params.id)

    if (error) {
        return Response.json({ Error: 'Error fetching event details from database' }, { status: 500 })
    }

    return new Response(JSON.stringify(data[0]), {
        headers: { "Content-Type": "application/json" }
    })
}

const EventDetails = () => {
    const event = useLoaderData<Event>()

    return (
        <div>
            <h1 className="text-xl">{event.title}</h1>
        </div>
    )
}

export default EventDetails