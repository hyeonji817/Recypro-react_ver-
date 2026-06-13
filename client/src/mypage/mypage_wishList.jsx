import "./mypage_wishList.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_WishList = () => {

  return (
    <div className="mpWishList_wrapper">
      <div className="mpWishList_Header">
        <Header_loginOK />  
      </div>     {/** mpWishList_Header end */}

      <div className="mpWishList_Content"></div>    {/** mpWishList_Content end */}

      <div className="mpWishList_Footer">
        <Footer />  
      </div>     {/** mpWishList_Footer end */}
    </div>      /** mpWishList_wrapper end */
  );
};

export default Mp_WishList;