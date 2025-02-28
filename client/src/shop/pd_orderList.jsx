import "./pd_orderList.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const pd_orderList = () => {
  return (
    <div className="pd_orderList_wrapper">
      <div className="Pd_orderList_Header">
        <Header_loginOK />
      </div>
      <div className="Order_list">
        <h2 className="pd_order_title">주문내역 정보</h2>
        <table className="table bg-light text-center" border={1}>
          <thead>
            <tr className="text-muted">
              <th>아이디명</th>
              <th>사용자 이름</th>
              <th>물품명</th>
              <th>배송일</th>
              <th>배송국가</th>
              <th>주소</th>
              <th>주문번호</th>
              <th>리뷰작성</th>
              <th>반품신청</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>guswl0817</th>
              <th>곽현지</th>
              <th>유기농 설거지 비누</th>
              <th>2024.11.19</th>
              <th>대한민국</th>
              <th>관악구</th>
              <th>1</th>
              <th>
                <span className="review">
                  <Button 
                    text={"리뷰작성"}
                    type={"pdOrder_review"}
                  />
                </span>
              </th>
              <th>
                <span className="return">
                  <Button 
                    text={"물품 반품신청"}
                    type={"pdOrder_return"}
                  />
                </span>
              </th>
            </tr>
            <tr>
              <th>guswl0817</th>
              <th>곽현지</th>
              <th>면 비누망</th>
              <th>2024.11.19</th>
              <th>대한민국</th>
              <th>관악구</th>
              <th>2</th>
              <th>
                <span className="review">
                  <Button 
                    text={"리뷰작성"}
                    type={"pdOrder_review"}
                  />
                </span>
              </th>
              <th>
                <span className="return">
                  <Button 
                    text={"물품 반품신청"}
                    type={"pdOrder_return"}
                  />
                </span>
              </th>
            </tr><tr>
              <th>guswl0817</th>
              <th>곽현지</th>
              <th>손목 터널증후군 운동</th>
              <th>2024.11.19</th>
              <th>대한민국</th>
              <th>관악구</th>
              <th>3</th>
              <th>
                <span className="review">
                  <Button 
                    text={"리뷰작성"}
                    type={"pdOrder_review"}
                  />
                </span>
              </th>
              <th>
                <span className="return">
                  <Button 
                    text={"물품 반품신청"}
                    type={"pdOrder_return"}
                  />
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pd_order_button">
        <Button 
          text={"뒤로가기"}
          type={"pdOrder_back"}
        />
      </div>
    </div>
  );
};

export default pd_orderList;