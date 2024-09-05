import { getAllItems } from "./actions";
import ItemCard from "./_components/items-card";

export default async function Home() {
  const items = await getAllItems();

  return(
    <main>
      
    </main>
  )
}