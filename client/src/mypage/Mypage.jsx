import React, { useEffect, useState } from "react";
import "./Mypage.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mypage = () => {
	const [mypageData, setMypageData] = useState(null);
	const [userId, setUserId] = useState(null); // 이걸 추가해야 합니다!

	useEffect(() => {
		// 세션에서 사용자 ID 가져오기
		fetch("/api/mypage", { credentials: "include" })
			.then((res) => res.json())
			.then((data) => {
				if (data.id) {
					setUserId(data.id); // userId 상태에 저장
				}
			})
			.catch((err) => console.error("유저 정보 불러오기 실패:", err));
	}, []);
	
	useEffect(() => {
		if (userId) {
			fetch(`/api/mypage/${userId}`)
				.then((res) => res.json())
				.then((mypageData) => {
					setMypageData(mypageData);
				})
				.catch((err) => console.error("마이페이지 정보 불러오기 실패:", err));
		}
	}, [userId]);
	

  return (
    <div className="Mypage_wrapper">
      <div className="mypage_Header">
        <Header_loginOK />
      </div>
      <div id="mypage_Content">   {/** 구 클래스명 : cnt */}
		    <div className="mypage_body">   {/** 구 클래스명 : cntbody */}
		      {/** 서브 타이틀 텍스트(일반페이지) 사용자코드 */}	
          <h2 className="subtitle">MY PAGE</h2>
		        {/** //서브 타이틀 텍스트(일반페이지) 사용자코드 */}
		        {/** 서브 타이틀 텍스트(게시판) 사용자코드 */}
		        {/** //서브 타이틀 텍스트(게시판) 사용자코드 */}
		        {/** 마이페이지 메뉴 */}
		        {/** 마이페이지 메뉴 */}
            <div className="mypage_top">
	            <div className="customer_section">
		            <div className="name"><strong>곽현지</strong>님은 MEMBER</div>
	            	<a href="#" className="my_edit">정보 수정하기</a>
		            <ul className="point_section">
			            <li><a href="#"><strong>쿠폰</strong> 5 장</a></li>
			            <li><a href="#"><strong>적립금</strong> 2,000 원</a></li>
			            <li><a href="#"><strong>포인트</strong> 0 P</a></li>
		            </ul>

		            <ul className="my_page_tab">
			            <li>
				            <a href="#" className="tab_title">
					            ORDER<br />
					            <strong className="tab_sub">주문내역</strong>
				            </a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            WISH LIST<br />
					            <strong className="tab_sub">관심상품</strong>
				            </a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            COUPON<br />
					            <strong className="tab_sub">쿠폰</strong>
				            </a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            MILEAGE<br />
					            <strong className="tab_sub">적립금</strong>
				            </a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            DEPOSITS<br />
					            <strong className="tab_sub"></strong>
				            </a>
				            <a href="#" className="tab_sub">예치금</a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            SECRET MILEAGE<br />
					            <strong className="tab_sub"></strong>
				            </a>
				            <a href="#" className="tab_sub">스페셜 적립금</a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            Q&amp;A<br />
					            <strong className="tab_sub">내 상품문의</strong>
				            </a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            MYBOARD<br />
					            <strong className="tab_sub">내 상품평</strong>
				            </a>
			            </li>
			            <li>
				            <a href="#" className="tab_title">
					            WITHDRAW<br />
					            <strong className="tab_sub">회원 탈퇴</strong>
				            </a>
			            </li>
		            </ul>
	            </div>
            </div>
            {/** //마이페이지 메뉴 */}
		        {/** //마이페이지 메뉴 */}

            <div id="mypage">
	            <div className="my_order">
                <p className="empty">주문내역이 존재하지 않습니다.</p>
		            <p>* 주문번호를 클릭하시면 주문정보를 확인하실 수 있습니다.</p>
	            </div>
            </div>{/** mkt script '애널리언스' scr_bottom start */}
		      </div>
	      </div>
      <div className="mypage_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Mypage;