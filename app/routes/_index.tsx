import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Event Planning App" },
    { name: "description", content: "Use this app to plan events!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Event Planner!</h1>
    </div>
  );
}