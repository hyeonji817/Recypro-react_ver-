import "./View.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const View = () => {
  return (
    <div className="View_wrapper">
      <div className="View_Header">
        <Header_loginOK />
      </div>
      <div className="container">
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th colSpan="3">게시판 글 보기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="View_title">글 제목</td>
                <td colSpan="2">상품 재구매하고 싶네요!</td>
              </tr>
              <tr>
                <td className="View_user">작성자</td>
                <td colSpan="2">witch0817</td>
              </tr>
              <tr>
                <td className="View_date">작성일자</td>
                <td colSpan="2">2024-11-24 15:40</td>
              </tr>
              <tr>
                <td>글 내용</td>
                <td className="View_content" colSpan="2">디자인이 예쁜데다, 실용성도 좋아서 다시 재구매하고 싶어요!</td>
              </tr>
            </tbody>
          </table>
          <div className="View_button">
            <Button 
              type={"ViewList"}
              text={"목록"}
            />{/* 차후에 a 태그로 변경하고 버튼형으로 전환할 예정 */}
            <form name="ViewModify" id="ViewModify" method="post">
              <a>
                <Button 
                  type={"View_Modify"}
                  text={"수정"}
                />
              </a>
            </form>
            <Button 
              type={"View_declare"}
              text={"신고하기"}
              className="View_declare"
            />
            <Button 
              type={"View_delete"}
              text={"삭제하기"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;