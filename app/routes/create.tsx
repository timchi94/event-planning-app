import { Form } from "@remix-run/react"
import { createEvent } from "server"

export const loader = async () => {
    return true
}

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const { title, description, date } = Object.fromEntries(formData) as {
        title: string
        description: string
        date: string
    }
    if (!title || !description || !date) {
        return Response.json({ Error: "Title, description and date of event are required" })
    }
    const newEvent = {
        title,
        description,
        date
    }
    createEvent(newEvent)
    console.log('success')
    return Response.json({ newEvent }, { status: 200 })
}

const CreateEvent = () => {
    return (
        <div className="p-8 w-screen min-h-screen bg-yellow-200">
            <h1 className="text-2xl font-bold pb-4 text-gray-800">New Event</h1>
            <Form method='post'>
                <div className="flex flex-col gap-1 py-4">
                    <label htmlFor="title" className="text-gray-800">Event Title: </label>
                    <input type="text" name="title" id="title" className="py-2 px-2 rounded-xl outline-none text-sm" placeholder="Tim's Birthday Party" />
                </div>
                <div className="flex flex-col gap-1 py-4">
                    <label htmlFor="description" className="text-gray-800">Event Description: </label>
                    <textarea name="description" id="description" className="py-2 px-2 rounded-xl outline-none text-sm h-20 align-top resize-none" placeholder="Beer tasting at local microbrewery..."></textarea>
                </div>
                <div className="flex flex-col gap-1 py-4">
                    <label htmlFor="date" className="text-gray-800">Event Date: </label>
                    <input type="date" name="date" id="date" className="py-2 px-2 rounded-xl outline-none text-sm" />
                </div>
                <div className="flex items-center justify-center py-8">
                    <button type="submit" className="text-gray-800 bg-gray-200 py-2 px-4 rounded-2xl hover:cursor-pointer hover:bg-gray-800 hover:text-gray-200 text-3xl">Create!</button>
                </div>
            </Form>
        </div>
    )
}

export default CreateEvent