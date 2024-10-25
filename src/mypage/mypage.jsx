import { useParams } from "react-router-dom";

const Mypage = () => {
  const params = useParams();
  console.log(params);

  return <div>Mypage</div>;
};

export default Mypage;