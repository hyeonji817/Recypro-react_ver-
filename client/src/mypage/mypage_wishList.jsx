import "./mypage_wishList.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_WishList = () => {

  return (
    <div className="mpWishList_wrapper">
      <div className="mpWishList_Header">
        <Header_loginOK />  
      </div>     {/** mpWishList_Header end */}

      <div className="mpWishList_Content">
        <div className="mpWishList_body">
          <h2 className="subtitle">MY PAGE</h2>     {/** subtitle end */}

          <div className="mpWishList_top">
            <div className="customer_section">
              <div className="name"><strong>곽현지</strong>님은 MEMBER</div>      {/** name end */}

              <a href="#" className="my_edit">정보 수정하기</a>       {/** my_edit end */}

              <ul className="point_section"></ul>       {/** point_section end */}

              <ul className="mpWishList_tab"></ul>      {/** mpWishList_tab end */} 
            </div>     {/** customer_section end */}  
          </div>    {/**  mpWishList_top end */}  

          
        </div>     {/** mpWishList_body end */}
      </div>    {/** mpWishList_Content end */}

      <div className="mpWishList_Footer">
        <Footer />  
      </div>     {/** mpWishList_Footer end */}
    </div>      /** mpWishList_wrapper end */
  );
};

export default Mp_WishList;