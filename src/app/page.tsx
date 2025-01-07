import Login from "@/Pages/Login/Login";
import Card from "@/Component/Card/Card";
import ForgotPass from "@/Pages/Login/ForgotPass";
import Otp from "@/Pages/Login/Otp";
import ResetPass from "@/Pages/Login/ResetPass";
import Register from "@/Pages/Register/Register";
import Navbar from "@/Component/Navbar/Navbar";

interface Datas{
  title:string,
  id:number
}

export default async function Home() {

  const resp = await fetch('https://api.sampleapis.com/coffee/hot');
  const datas:Datas[] = await resp.json();

  return (
    <div className="">
      <Navbar></Navbar>
      <Card></Card>
      
      <Login></Login>
      <ForgotPass></ForgotPass>
      <Otp></Otp>
      <ResetPass></ResetPass>
      <Register></Register>

      {/* {datas.map((data) => <li key={data.id}>{data.title}</li> )} */}

      <div>
        {datas.map((data) => <Card key={data.id}></Card>)}
      </div>

    </div>
  );
}
