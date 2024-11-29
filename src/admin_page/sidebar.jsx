import { Link } from "react-router-dom"; 
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar_wrapper">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
		id="accordionSidebar">
        {/** Sidebar - Brand */}  
		<a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
			<div className="sidebar-brand-text mx-3">리싸이프로 Admin</div>
		</a>

		{/** Divider */}
		<hr className="sidebar-divider my-0" />

		{/** Nav Item - Dashboard */}
		<li className="nav-item active">
      <a className="nav-link" href="#">
        <span>Dashboard</span>
      </a>
		</li>

		{/** Divider */}
		<hr className="sidebar-divider" />

		{/** Heading */}
		<div className="sidebar-heading">Product</div>

		{/** Nav Item - Pages Collapse Menu */}
		{/** Product 상품 관련 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
			aria-expanded="true" aria-controls="collapseTwo"> 
        <span>Product</span>
			</a>
			<div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">product</h6>
					<a className="collapse-item" href="#">Product List</a> 
					<a className="collapse-item" href="#">Enroll Product</a>
				</div>
			</div>
		</li>

		{/** Nav Item - Utilities Collapse Menu */}
		{/** Order 주문 관련 조회 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
			aria-expanded="true" aria-controls="collapseUtilities">
        <span>Order</span>
			</a>
			<div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">Order</h6>
					<a className="collapse-item" href="#">Order Status</a> 
				</div>
			</div>
		</li>
		
		{/** 쿠폰 관련 조회 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
			aria-expanded="true" aria-controls="collapseUtilities">
        <span>Coupon</span>
			</a>
			<div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">Coupon</h6>
					<a className="collapse-item" href="#">Coupon Status</a> 
				</div>
			</div>
		</li>
		
		{/** 쿠폰 등록 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
			aria-expanded="true" aria-controls="collapseUtilities">
        <span>Coupon-Register</span>
			</a>
		</li>
		
		{/** 쿠폰 지급 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
			aria-expanded="true" aria-controls="collapseUtilities">
        <span>Giving-Coupon</span>
			</a>
		</li>

		{/** Divider */}
		<hr className="sidebar-divider">

		{/** Heading */}
		<div className="sidebar-heading">Board</div>
		
		{/** 게시판 관련 조회 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMember"
			aria-expanded="true" aria-controls="collapsePages"> 
        <span>Review</span>
			</a>
			<div id="collapseMember" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">Review</h6>
					<a className="collapse-item" href="#">Review List</a>
					<div className="collapse-divider"></div>
				</div>
			</div>
		</li>
		
		{/** 게시판 신고 조회 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMember"
			aria-expanded="true" aria-controls="collapsePages">
        <span>Review declare</span>
			</a>
			<div id="collapseMember" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">Review declare</h6>
					<a className="collapse-item" href="#">Review declare List</a>
					<div className="collapse-divider"></div>
				</div>
			</div>
		</li>
		
		{/** 공지사항 관련 조회 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMember"
			aria-expanded="true" aria-controls="collapsePages"> 
        <span>Notice</span>
			</a>
			<div id="collapseMember" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">Notice</h6>
					<a className="collapse-item" href="#">Notice List</a>
					<div className="collapse-divider"></div>
				</div>
			</div>
		</li>
		
		{/** 자주묻는질문 관련 조회 페이지 */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMember"
			aria-expanded="true" aria-controls="collapsePages"> 
        <span>Question</span>
			</a>
			<div id="collapseMember" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">Question</h6>
					<a className="collapse-item" href="#">Question List</a>
					<div className="collapse-divider"></div>
				</div>
			</div>
		</li>
		
		{/** 가입했던 사용자 관련 조회 페이지 */}
		{/** Nav Item - Pages Collapse Menu */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMember"
			aria-expanded="true" aria-controls="collapsePages"> 
        <span>Member</span>
			</a>
			<div id="collapseMember" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
				<div className="bg-white py-2 collapse-inner rounded">
					<h6 className="collapse-header">Member</h6>
					<a className="collapse-item" href="#">Member List</a>
					<div className="collapse-divider"></div>
				</div>
			</div>
		</li>

		{/** Divider */}
		<hr className="sidebar-divider d-none d-md-block">
		
		{/** Nav Item - Exit */}
		<li className="nav-item">
			<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMember"
			aria-expanded="true" aria-controls="collapsePages"> 
        <span>Exit</span>
			</a>
		</li>
      </hr>
      </hr>
      </ul>
	{/** End of Sidebar */}
    </div>
  );
};

export default Sidebar; 