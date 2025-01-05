export interface Event {
    title: string
    description: string
    date: string
}

export const createEvent = (event: Event) => {
    // make call to db to create event
    return true
}