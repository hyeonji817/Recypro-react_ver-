import React, { useEffect, useState } from "react";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const mp_Orders = () => {
  return (
    <div className="mpOrders_wrapper">
      <div className="mpOrders_Header">
        <Header_loginOK />  
      </div>     {/** mpOrders_Header end */}

      <div className="mpOrders_Content"></div>    {/** mpOrders_Content end */}

      <div className="mpOrders_Footer">
        <Footer />
      </div>     {/** mpOrders_Footer end */}
    </div>    /** mpOrders_wrapper end */
  );
};

export default mp_Orders;
