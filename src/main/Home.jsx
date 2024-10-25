import { useSearchParams } from "react-router-dom"; // 임시로 작성, 검색기능 없으면 지울 예정

const Home = () => {
  const [params, setParams] = useSearchParams(); // 임시로 작성, 검색기능 없으면 지울 예정
  console.log(params.get("value"));

  return <div>Home</div>;
};

export default Home;