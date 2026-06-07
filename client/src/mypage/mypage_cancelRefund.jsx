import "./mypage_cancelRefund.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_CancelRefund = () => {

  return (
    <div className="mpCancel_Refund_wrapper">
      <div className="mpCancel_Refund_Header">
        <Header_loginOK />  
      </div>      {/** mpCancel_Refund_Header end */}

      <div className="mpCancel_Refund_Content">
        <div className="mpCancel_Refund_body">
          <h2 className="subtitle">MY PAGE</h2>     {/** subtitle end */}

          <div className="mpCancel_Refund_top">
            <div className="customer_section">
              <div className="name"><strong>곽현지</strong>님은 MEMBER</div>      {/** name end */}

              <a href="#" className="my_edit">정보 수정하기</a>    {/** my_edit end */}

              <ul className="point_section">
                <li>
                  <a href="#"><strong>쿠폰</strong> 0 장</a>
                </li>
                <li>
                  <a href="#"><strong>적립금</strong> 0 원</a>
                </li>
                <li>
                  <a href="#"><strong>포인트</strong> 0 P</a>  
                </li>  
              </ul>     {/** point_section end */} 

              <ul className="mpCancel_Refund_tab"></ul>     {/** mpCancel_Refund_tab end */}
            </div>    {/** customer_section end */}  
          </div>     {/** mpCancel_Refund_top end */}
        </div>      {/** mpCancel_Refund_body end */}  
      </div>     {/** mpCancel_Refund_Content end */}

      <div className="mpCancel_Refund_Footer">
        <Footer />  
      </div>      {/** mpCancel_Refund_Footer end */}
    </div>       /** mpCancel_Refund_wrapper end */
  );
};

export default Mp_CancelRefund;