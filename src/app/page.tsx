import Card from "@/Component/Card/Card";

interface Datas{
  title:string,
  id:number
}

export default async function Home() {

  const resp = await fetch('https://api.sampleapis.com/coffee/hot');
  const datas:Datas[] = await resp.json();

  return (
    <div className="">
      
      <Card></Card>

      {/* {datas.map((data) => <li key={data.id}>{data.title}</li> )} */}

      {/* <div>
        {datas.map((data:any) => <Card key={data.id}></Card>)}
      </div> */}

    </div>
  );
}
