import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer_bar">
      <div className="footer_copyrt">
				<h3 className="ft_title">CUSTOMER CENTER</h3>
				<div className="ft_box">
					<strong>2010-0609</strong>
					<p>CALL : 10:00~12:00 / 13:00~17:00<br />(주말 및 공휴일은 쉽니다.)</p>
				</div>	{/** ft_box end */}
				<div className="shopInfo">
					<ul className="ft_menu">
						<li><a href="#">이용안내 | </a></li>
						<li><a href="#"> 이용약관 | </a></li>
						<li><a href="#"> 개인정보 처리방침</a></li>
					</ul>
					<address className="info">
						<span>법인명. ㈜리싸이프로</span><br />
						<span>사업자등록번호. 098-76-54321</span><br />
						<span>주소. 서울특별시 서초구 리싸이프로대로 17길 08</span><br />
						<span>통신판매업신고번호. 2010-서울강남-2010609호</span><br />
						<span>개인정보보호책임자. 주영아</span>< br/>
						<span>대표자. 곽현지</span><br />
						<span>E-MAIL. recypro@jww.co.kr</span><br />
						<span>고객님은 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한 PG 사의<br />
						 구매안전서비스를 이용하실 수 있습니다.</span><br />
					</address>
				</div>
				<ul className="ft_pay">
					<li><a href="#"></a><p>현금영수증 가맹점</p></li>
					<li><a href="#"></a><p>구매안전서비스</p></li>
					<li><a href="#"></a><p>상품배송<br />우체국택배</p></li>
				</ul>
      </div>
    </div>
  );
};

export default Footer;