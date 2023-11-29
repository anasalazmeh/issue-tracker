import Pagniation from "./components/Pagniation";

export default function Home({searchParams}:{searchParams:{page:string}}) {
  return (
    <Pagniation itemCount={100} pageSize={20} currentPage={parseInt(searchParams.page)|| 1}/>
  )
}
