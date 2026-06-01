import "./mypage_orderChange.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_OrderChange = () => {

  return (
    <div className="mpOrder_Change_wrapper">
      <div className="mpOrder_Change_Header">
        <Header_loginOK />  
      </div>     {/** mpOrder_Change_Header end */}

      <div className="mpOrder_Change_Content">
        <div className="mpOrder_Change_body">
          <h2 className="subtitle">MY PAGE</h2>      {/** subtitle end */}  

          <div className="mpOrder_Change_top">
            <div className="customer_section">
              <div className="name">
                <strong>곽현지</strong>님은 MEMBER  
              </div>      {/** name end */}

              <a href="#" className="my_edit">
                정보 수정하기
              </a>      {/** my_edit end */}

              <ul className="point_section">
                <li>
                  <a href="#">
                    <strong>쿠폰</strong> 0 장
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>적립금</strong> 0 원
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>포인트</strong> 0 P
                  </a>
                </li>
              </ul>     {/** point_section end */}

            </div>    {/** customer_section end */}  
          </div>    {/** mpOrder_Change_top end */}
        </div>     {/** mpOrder_Change_body end */}  
      </div>    {/** mpOrder_Change_Content end */}

      <div className="mpOrder_Change_Footer">
        <Footer />  
      </div>     {/** mpOrder_Change_Footer end */}
    </div>      /** mpOrder_Change_wrapper end */
  );
};

export default Mp_OrderChange;