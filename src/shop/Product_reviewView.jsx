import "./Product_reviewView.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const Product_reviewView = () => {
  return (
    <div className="Product_reviewView_wrapper">
      <div className="Product_reviewView_Header">
        <Header_loginOK />
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th colSpan="3">상품리뷰 게시판 글 보기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="reviewView_title">글 제목</td>
              <td colSpan="2">굿</td>
            </tr>
            <tr>
              <td>작성자</td>
              <td colSpan="2">witch0817</td>
            </tr>
            <tr>
              <td>작성일자</td>
              <td colSpan="2">2024-11-21 21:41</td>
            </tr>
            <tr>
              <td>상품명</td>
              <td colSpan="2">손목 터널증후군 운동</td>
            </tr>
            <tr>
              <td>글 내용</td>
              <td colSpan="2" className="reviewView_content">재구매할께요</td>
            </tr>
          </tbody>
        </table>
        <div className="reviewView_button">
          <Button 
            text={"상품 리뷰목록"}
            type={"reviewView_list"}
            className="reviewView_list"
          />
          <Button 
            text={"삭제하기"}
            type={"reviewView_delete"}
            className="reviewView_delete"
          />
          <Button 
            text={"수정하기"}
            type={"reviewView_modify"}
            className="reviewView_modify"
          />
        </div>
      </div>
    </div>
  );
};

export default Product_reviewView;