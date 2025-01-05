Event Planner
(similar to partiful)

Stack:
Remix
Typescript
MUI

Express?
Python
Flask

Vercel
MongoDB/Supabase

Front-End
Register/Login
As a logged in user - Make an event (set date, set location, set theme?, set title, set description, dress code?) 
(connect theme to AI image generator - depending on admin selection will change background of the event)
As a logged in user (admin for event) - Invite friends (email, messages, whatsapp?) - friends don’t need to login
As a user - View event details
As a user - RSVP to event

Back-End 
Login Profiles
Session storage(JWT)
URL encoder (generator function)
User roles (event specific)
Routes (create event, delete event, invite, create profile, API endpoints for social media)
Event Storage


Pages:
- login/register
- homepage (if logged in can create an event, if not logged in -- prompted to create an account before creating an event)
- create event page
    - create/uuid
- event details page (unique id for event) - admin can edit/share event from this page, invitees can rsvp from this page
    - event/uuid
- profile (view past events, view upcoming events) -- if logged in only
    - profile/uuid