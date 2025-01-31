import { Form, useActionData, useNavigate } from "@remix-run/react"

import letter from '../assets/letter-opening.gif'
import { supabase } from "~/supabase.server"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

interface Event {
    event_id: string
    created_by: number
    title: string
    description: string
    date: string
    location: string
}

interface ActionData {
    error?: string
    newEvent?: Event
}

export const loader = async () => {
    return true
    //TODO is this necessary? how do we fix this loader function so that it is more effective
}

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const { title, description, date, location } = Object.fromEntries(formData) as {
        title: string
        description: string
        date: string
        location: string
    }

    if (!title || !description || !date || !location) {
        return Response.json({ Error: "Title, description, date, and location of event are required" }, { status: 405 })
    }

    const newEvent = {
        event_id: uuidv4(),
        created_by: 1,
        // TODO user id needs to be programmatically determines based on cookies?
        title,
        description,
        date,
        location
    }

    const { error } = await supabase
        .from('events')
        .insert(newEvent)

    if (error) {
        return Response.json({ Error: 'Error inserting event into database' }, { status: 500 })
    }

    return Response.json({ newEvent }, { status: 201 })
}

const CreateEvent = () => {
    const actionData = useActionData<ActionData>()
    const navigate = useNavigate()

    useEffect(() => {
        if (actionData?.newEvent) {
            navigate(`/event/${actionData.newEvent.event_id}`)
        }
    }, [actionData])

    return (
        <div className="bg-greenPrimary">
            <div className="py-8 mx-8 min-h-screen md:py-12 md:mx-12 xl:w-desktop xl:mx-auto">
                <h1 className="text-4xl font-bold pb-4 text-grayPrimary font-serif md:text-5xl md:pb-8">New Event</h1>
                <div className="md:flex md:gap-8 md:items-start md:justify-between">
            <Form method='post' className="md:flex-grow">
                        <div className="flex flex-col gap-1 py-4 md:gap-2">
                            <label htmlFor="title" className="text-grayPrimary md:text-lg">Event Title: </label>
                            <input type="text" name="title" id="title" className="p-2 rounded-xl outline-none text-sm md:text-lg md:p-4" placeholder="Tim's Birthday Party" />
                        </div>
                        <div className="flex flex-col gap-1 py-4 md:gap-2">
                            <label htmlFor="description" className="text-grayPrimary md:text-lg">Event Description: </label>
                            <textarea name="description" id="description" className="p-2 rounded-xl outline-none text-sm h-20 align-top resize-none md:text-lg md:p-4 md:h-40" placeholder="Beer tasting at local microbrewery..."></textarea>
                        </div>
                        <div className="flex flex-col gap-1 py-4 md:gap-2">
                            <label htmlFor="date" className="text-grayPrimary md:text-lg">Event Date: </label>
                            <input type="date" name="date" id="date" className="p-2 rounded-xl outline-none text-sm md:text-lg md:p-4" />
                        </div>
                        <div className="flex flex-col gap-1 py-4 md:gap-2">
                            <label htmlFor="location" className="text-grayPrimary md:text-lg">Event Location: </label>
                            <input type="text" name="location" id="location" className="p-2 rounded-xl outline-none text-sm md:text-lg md:p-4" />
                        </div>
                        <div className="flex items-center justify-center py-8">
                            <button type="submit" className="text-grayPrimary bg-gray-200 py-2 px-4 rounded-2xl hover:cursor-pointer hover:bg-grayPrimary hover:text-graySecondary text-xl font-serif md:text-3xl md:py-4 md:px-8">Create!</button>
                        </div>
                    </Form>
                    <div className="w-full flex justify-center md:w-2/5">
                        <img src={letter} alt='Gif of pink envelope opening and invitation letter popping out' className="w-full max-w-[20rem] max-h-[20rem]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent