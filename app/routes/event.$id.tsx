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
        <div className="bg-pinkPrimary">
            <div className="py-8 mx-8 min-h-screen md:py-12 md:mx-12 xl:w-desktop xl:mx-auto">
                <h1 className="text-4xl font-bold pb-4 text-grayPrimary font-serif md:text-5xl md:pb-8">{event.title}</h1>
            </div>
        </div>
    )
}

export default EventDetails