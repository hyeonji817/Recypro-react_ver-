import "./customer_notice.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";
import home from "../assets/shop/home.png";

const customer_notice = () => {
	return (
		<div className="customer_notice_wrapper">
			<div className="cn_Header">
				<Header_loginOK />
			</div>

			{/** 제목 */}
			<div className="cn_title">
				<div className="container">
					<h1 className="display-3">고객센터 - 공지사항</h1>
				</div>
			</div>

			{/** 사이드 경로 */}
			<div className="side_path">
				<div className="home_icon">
					<img src={home} />
				</div>
				<span className="sub_path">
					home &gt; 고객센터 &gt; 공지사항
				</span>
			</div>

			{/** 검색 영역 */}
			<div className="cont-search">
				<div className="search_bar">
					<form name="frm_search" role="search" method="get" className="search-form">
						<input type="search" className="search-field" placeholder="" value="" name="findStr" />
						<input type="submit" name="btnFind" className="search-submit" value="검색" />
						<input type="hidden" name="nowPage" value="" size="10" />
						<input type="hidden" name="serial" size="10" />
						<input type="hidden" name="search" value="select" />
					</form>
				</div>
			</div>
			
			{/** 고객센터 - 공지사항 리스트 */}
			<table className="table" border="1">
				<thead>
					<tr>
						<th className="notice_num">번호</th>
						<th className="notice_title">제목</th>
						<th className="notice_user">작성자</th>
						<th className="notice_date">작성일</th>
						<th className="notice_view">조회하기</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="notice_num2">1</td>
						<td className="notice_title2">리싸이프로 이용 가이드(구매 전 필독★)</td>
						<td className="notice_user2">admin</td>
						<td className="notice_date2">2024.11.25</td>
						<td className="notice_view2">1</td>
					</tr>
					<tr>
						<td className="notice_num2">2</td>
						<td className="notice_title2">사이즈 교환 1회 무료서비스 실시</td>
						<td className="notice_user2">admin</td>
						<td className="notice_date2">2024.11.25</td>
						<td className="notice_view2">2</td>
					</tr>
					<tr>
						<td className="notice_num2">3</td>
						<td className="notice_title2">새벽배송 배송 시간  및 지역 변경</td>
						<td className="notice_user2">admin</td>
						<td className="notice_date2">2024.11.25</td>
						<td className="notice_view2">3</td>
					</tr>
				</tbody>
			</table>

			{/** 버튼 영역 */}
			<div className="policy_button">
				<Button 
					type={"customer_notice"}
					text={"고객센터 홈"}
				/>
			</div>
		</div>
	);
};

export default customer_notice;