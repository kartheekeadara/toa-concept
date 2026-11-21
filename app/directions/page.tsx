import { redirect } from "next/navigation";

/** Directions now open Google Maps directly; this path scrolls to Visit. */
export default function DirectionsPage() {
  redirect("/#visit");
}