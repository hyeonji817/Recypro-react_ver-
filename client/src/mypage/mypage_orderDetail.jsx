import "./mypage_orderDetail.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_OrderDetail = () => {

  return (
    <div className="mpOrder_Detail_wrapper">
      <div className="mpOrder_Detail_Header">
        <Header_loginOK />  
      </div>     {/** mpOrder_Detail_Header end */}

      <div className="mpOrder_Detail_Content">
        <div className="mpOrder_Detail_body">
          <h2 className="subtitle">MY PAGE</h2>     {/** subtitle end */}

          <div className="mpOrder_Detail_top">
            <div className="customer_section">
              <div className="name"><strong>곽현지</strong>님은 MEMBER</div>
              <a href="#" className="my_edit">정보 수정하기</a>
              <ul className="point_section">
                <li><a href="#"><strong>쿠폰</strong> 5 장</a></li>
                <li><a href="#"><strong>적립금</strong> 1,600 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>  
              </ul>       {/** point_section end */}  

            </div>      {/** customer_section end */}  
          </div>    {/** mpOrder_Detail_top end */}  
        </div>     {/** mpOrder_Detail_body end */}  
      </div>    {/** mpOrder_Detail_Content end */}

      <div className="mpOrder_Detail_Footer">
        <Footer />
      </div>     {/** mpOrder_Detail_Footer end */}
    </div>        /** mpOrder_Detail_wrapper end */
  );
}; 

export default Mp_OrderDetail;