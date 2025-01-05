import { type MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Event Planning App" },
    { name: "description", content: "Use this app to plan events!" },
  ];
};

export default function Index() {
  const navigate = useNavigate()

  const handleCreateEvent = () => {
    navigate('/create')
  }

  return (
    <div>
      <h1>Event Planner!</h1>
      <button onClick={handleCreateEvent}>Create event</button>
    </div>
  );
}