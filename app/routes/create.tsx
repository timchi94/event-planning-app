import { Form } from "@remix-run/react"
import { createEvent } from "server"
import letter from '../assets/letter-opening.gif'

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
        <div className="bg-green-100">
            <div className="py-8 mx-8 min-h-screen md:py-12 md:mx-12 xl:w-desktop xl:mx-auto">
                <h1 className="text-4xl font-bold pb-4 text-gray-800 font-serif md:text-5xl md:pb-8">New Event</h1>
                <div className="md:flex md:gap-8 md:items-start md:justify-between">
                    <Form method='post' className="md:flex-grow">
                        <div className="flex flex-col gap-1 py-4">
                            <label htmlFor="title" className="text-gray-800 md:text-lg">Event Title: </label>
                            <input type="text" name="title" id="title" className="py-2 px-2 rounded-xl outline-none text-sm md:text-lg" placeholder="Tim's Birthday Party" />
                        </div>
                        <div className="flex flex-col gap-1 py-4">
                            <label htmlFor="description" className="text-gray-800 md:text-lg">Event Description: </label>
                            <textarea name="description" id="description" className="py-2 px-2 rounded-xl outline-none text-sm h-20 align-top resize-none md:text-lg" placeholder="Beer tasting at local microbrewery..."></textarea>
                        </div>
                        <div className="flex flex-col gap-1 py-4">
                            <label htmlFor="date" className="text-gray-800 md:text-lg">Event Date: </label>
                            <input type="date" name="date" id="date" className="py-2 px-2 rounded-xl outline-none text-sm md:text-lg" />
                        </div>
                        <div className="flex items-center justify-center py-8">
                            <button type="submit" className="text-gray-800 bg-gray-200 py-2 px-4 rounded-2xl hover:cursor-pointer hover:bg-gray-800 hover:text-gray-200 text-xl font-serif md:text-3xl">Create!</button>
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