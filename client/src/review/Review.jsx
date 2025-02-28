import "./Review.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const Review = () => {
  return (
    <div className="Review_wrapper">
      <div className="Review_Header">
        <Header_loginOK />
      </div>
      <div className="container">
        <div className="Review_title">
          <div className="title_main">
            <h1 className="display-3">게시판</h1>
          </div>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th className="review_num">번호</th>
                <th className="review_title">제목</th>
                <th className="review_user">작성자</th>
                <th className="review_date">작성일</th>
                <th className="review_inquiry">조회하기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>단골될게요!</td>
                <td>guswl0817</td>
                <td>2024-11-23 16:56</td>
                <td>
                  <a href="#" className="btn btn-info">조회하기</a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>좋아요</td>
                <td>guswl0817</td>
                <td>2024-11-23 16:57</td>
                <td>
                  <a href="#" className="btn btn-info">조회하기</a>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>단골되고 싶어요!</td>
                <td>guswl0817</td>
                <td>2024-11-23 16:58</td>
                <td>
                  <a href="#" className="btn btn-info">조회하기</a>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>상품 재구매하고 싶어요!</td>
                <td>guswl0817</td>
                <td>2024-11-23 17:10</td>
                <td>
                  <a href="#" className="btn btn-info">조회하기</a>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>안녕하세요</td>
                <td>guswl0817</td>
                <td>2024-11-23 17:11</td>
                <td>
                  <a href="#" className="btn btn-info">조회하기</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="Review_button">
          <Button 
            type={"reviewWrite"}
            text={"작성하기"}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;