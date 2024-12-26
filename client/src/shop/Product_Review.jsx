import "./Product_Review.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const Product_Review = () => {
  return (
    <div className="Product_Review_wrapper">
      <div className="PR_Header">
        <Header_loginOK />
      </div>
      <div className="title">
        <div className="title_main">
          <h1 className="display-3">상품 리뷰</h1>
        </div>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>상품명</th>
              <th>사용자 ID명</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5</td>
              <td>맘에 들어요</td>
              <td>토끼 커플텀블러-플라스틱 프리챌린지</td>
              <td>witch0817</td>
              <td>2024-11-21</td>
            </tr>
            <tr>
              <td>4</td>
              <td>굿</td>
              <td>손목 터널증후군 운동</td>
              <td>witch0817</td>
              <td>2024-11-21</td>
            </tr>
            <tr>
              <td>3</td>
              <td>엄청 예뻐요</td>
              <td>토끼 커플텀블러-플라스틱 프리챌린지</td>
              <td>witch0817</td>
              <td>2024-11-21</td>
            </tr>
            <tr>
              <td>2</td>
              <td>저한테 잘 맞아요</td>
              <td>유기농 설거지 비누</td>
              <td>witch0817</td>
              <td>2024-11-21</td>
            </tr>
            <tr>
              <td>1</td>
              <td>깔끔해서 좋아요</td>
              <td>강화 소창 수건-먼지 안 나는 무형광</td>
              <td>witch0817</td>
              <td>2024-11-21</td>
            </tr>
          </tbody>
        </table>
        <div className="PR_button">
          <Button 
            text={"상품 목록"}
            type={"PR_list"}
          />
        </div>
      </div>
    </div>
  );
};

export default Product_Review;