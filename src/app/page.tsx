import axios from "axios";
import Card from "@/Component/Card/Card";

export default async function Home() {
  let datas = [];

  try {
    const resp = await axios.get('https://dummyjson.com/products');
    datas = resp.data.products;

  } catch (error) {
    console.error("Error fetching coffee data:", error);
  }

  return (
    <div>
      home page
    </div>
  );
}
