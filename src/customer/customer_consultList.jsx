import "./customer_consultList.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const customer_consultList = () => {
  return (
    <div className="consultList_wrapper">
      <div className="consultList_Header">
        <Header_loginOK />
      </div>
      {/** 제목 */}
      <div className="consultList_title">
        <div className="container">
          <h1 className="display-3">문의글 목록</h1>
        </div>
      </div>

      {/** 문의글 목록 영역 */}
      <table className="table" border="1">
        <thead>
          <tr>
            <th className="consultList_num">번호</th>
            <th className="consultList_title2">제목</th>
            <th className="consultList_date">작성날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr className="light">
            <td className="consultList_num2">1</td>
            <td className="consultList_title2-2">상품 배송이 늦어요..ㅠㅠ 언제 도착하시나요?ㅠㅠ</td>
            <td className="consultList_date2">2025.11.26</td>
          </tr>
          <tr className="light">
            <td className="consultList_num2">2</td>
            <td className="consultList_title2-2">물건 변상 요청합니다. 손상된 채로 들어왔네요</td>
            <td className="consultList_date2">2024.11.26</td>
          </tr>
        </tbody>
      </table>

      {/** 버튼 영역 */}
      <div className="consultList_button">
        <Button 
          type={"consultList_button"}
          text={"고객센터 홈"}
        />
      </div>
    </div>
  );
};

export default customer_consultList;