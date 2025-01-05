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
        <div>
            <h1>New Event</h1>
            <Form method='post'>
                <div>
                    <label htmlFor="title">Event Title: </label>
                    <input type="text" name="title" id="title" />
                </div>
                <div>
                    <label htmlFor="description">Event Description: </label>
                    <input type="text" name="description" id="description" />
                </div>
                <div>
                    <label htmlFor="date">Event Date: </label>
                    <input type="date" name="date" id="date" />
                </div>
                <button type="submit">Create!</button>
            </Form>
        </div>
    )
}

export default CreateEvent