import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import axios from "axios";
import cart_del from "../assets/cart_del.png"; 
import cart_wish from "../assets/cart_wish.png";

const CDN = (path) => `http://localhost:5003/uploads/${String(path || "").replace(/^\.\//,'')}`;

const Cart = () => {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate(); 
	const totalQty = rows.reduce((s, r) => s + (r.cart_quantity || 0), 0);
	const totalPay = rows.reduce((s, r) => s + (r.total_price || 0), 0);
	const totalMileage = rows.reduce((s, r) => s + (r.mileage || 0), 0);
	const [checked, setChecked] = useState({});
	
	const toggle = (id) => setChecked(prev => ({...prev, [id]: !prev[id]}));
	const goOrderAll = () => navigate("/orderList?all=1");
	const goOrderSelected = () => {
		const ids = Object.entries(checked).filter(([,v])=>v).map(([id])=>id);
		if (ids.length === 0) return alert("선택된 상품이 없습니다.");
		navigate(`/orderList?cart_ids=${ids.join(",")}`);
	};

	const handleOrderSelected = () => {
		const selectedIds = rows.filter(r => r.checked).map(r => r.cart_id);
		if (!selectedIds.length) return alert("선택된 상품이 없습니다.");
		navigate(`/order2?ids=${selectedIds.join(",")}`);
	};

	// 장바구니 조회
	const fetchCart = async () => {
		try {
			const { data } = await axios.get("http://localhost:5003/api/cart", { withCredentials: true });
      setRows(data || []);
		} catch (e) {
			console.error(e);
      alert(e?.response?.data?.message || "장바구니 조회 중 오류");
		} finally {
			setLoading(false);
		}
	};

	// 수량변경 이벤트 기능 
	const updateQty = async (row, nextQty) => {
    if (nextQty < 1) return;
    try {
      await axios.put(`http://localhost:5003/api/cart/${row.cart_id}/qty`,
        { qty: nextQty, unitPrice: row.unit_price },
        { withCredentials: true }
      );
      fetchCart();
    } catch (e) {
      console.error(e);
      alert("수량 변경 실패");
    }
  };

	const removeItem = async (row) => {
		try {
      await axios.delete(`http://localhost:5003/api/cart/${row.cart_id}`, { withCredentials: true });
      fetchCart();
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
	};

	if (loading) return <div className="cart_wrap">Loading...</div>;

  return (
    <div className="cart_wrap">
      <div className="cart_Header">
        <Header_loginOK />
      </div>
      <div id="cart_Content">   
		    <div className="cart_body">   {/** 구 클래스명 : cntbody */}
		      {/** 서브 타이틀 텍스트(일반페이지) 사용자코드 */}
          <h2 className="subtitle">SHOPPING CART</h2>
		        {/** //서브 타이틀 텍스트(일반페이지) 사용자코드 */}
		        {/** 서브 타이틀 텍스트(게시판) 사용자코드 */}
		        {/** //서브 타이틀 텍스트(게시판) 사용자코드 */}
		        {/** 마이페이지 메뉴 */}
		        {/** //마이페이지 메뉴 */}
          <div id="cart">
	          <form name="cartFrm" method="post" style={{ margin: 0 }}>
							<ul className="cart_step tar">
								<li className="first"><span>01.</span> 장바구니</li>			{/** first end */}
								<li>02</li>
								<li>03</li>
							</ul>			{/** cart_step tar end */}

							<table className="cart_tbl_col prd">
								<caption className="hidden">장바구니</caption>
	              <colgroup>
		              <col style={{ width: "5%" }} />
		              <col style={{ width: "12%" }} />
		              <col />
		              <col style={{ width: "12%" }} />
		              <col style={{ width: "9%" }} />
		              <col style={{ width: "10%" }} />
		              <col style={{ width: "9%" }} />
		              <col style={{ width: "9%" }} />
		              <col style={{ width: "9%" }} />
	              </colgroup>

								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col" colSpan={2}>PRODUCT</th>
			              <th scope="col">PRICE</th>
			              <th scope="col">QTY</th>
			              <th scope="col">ADD PRICE</th>
			              <th scope="col">TOTAL PRICE</th>
			              <th scope="col">MILEAGE</th>
			              <th scope="col">WISH / DEL</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>		{/** cart_tbl_col prd end */}
						</form>
          </div>{/** cart end */}
		    </div>		{/** cart_body end */}
	    </div>		{/** cart_Content end */}
      <div className="cart_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;