import Pagniation from "./components/Pagniation";

export default function Home() {
  return (
    <Pagniation itemCount={100} pageSize={20} currentPage={1}/>
  )
}
