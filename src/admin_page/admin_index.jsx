import "./admin_index.css";
import Button from "../pages/Button";
import Sidebar from "./sidebar";

const admin_index = () => {
  return (
    <div className="adminIndex_wrapper">
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-cloumn">
          <Sidebar />
          <div id="content">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-black-800"
              style={{ top: "12%", marginTop: "2%", marginLeft: "5%", fontWeight: "700" }}
            >Admin</h1>
    		    </div>

            {/** card section */}
            <section>
              <div className="container-fluid">
			          <div className="row">
				          <div className="col-lg-9 ml-auto">
					          <div className="row pt-5 mt-3 mb-5">
						          <div className="col-sm-6 p-2">
							          <div className="card card-common">
								          <div className="card-body">
									          <div className="d-flex justify-content-between">
										          <i className="fas fa-shopping-cart fa-3x text-warning"></i>
										          <div className="text-right text-secondary">
											          <h5>Sales</h5>
											          <h3>$135,000</h3>
										          </div>
									          </div>
								        </div>
								        <div className="card-footer text-secondary">
									        <i className="fas fa-sync mr-3"></i>
									        <span>Updated Now</span>
								        </div>
							      </div>
						    </div>
						    <div className="col-sm-6 p-2">
							    <div className="card">
								    <div className="card-body">
									    <div className="d-flex justify-content-between">
										    <i className="fas fa-money-bill-alt fa-3x text-success"></i>
										    <div className="text-right text-secondary">
											    <h5>Expenses</h5>
											    <h3>$151,680</h3>
										    </div>
									    </div>
								    </div>
								    <div className="card-footer text-secondary">
									    <i className="fas fa-sync mr-3"></i>
									    <span>Updated Now</span>
								    </div>
							    </div>
						    </div>
						    <div className="col-sm-6 p-2">
							    <div className="card">
								    <div className="card-body">
									    <div className="d-flex justify-content-between">
										    <i className="fas fa-users fa-3x text-info"></i>
										    <div className="text-right text-secondary">
											    <h5>Users</h5>
											    <h3>$15,000</h3>
										    </div>
									    </div>
								    </div>
								    <div className="card-footer text-secondary">
									    <i className="fas fa-sync mr-3"></i>
									    <span>Updated Now</span>
								    </div>
							    </div>
						    </div>
						    <div className="col-sm-6 p-2">
							    <div className="card">
								    <div className="card-body">
									    <div className="d-flex justify-content-between">
										    <i className="fas fa-chart-line fa-3x text-info"></i>
										    <div className="text-right text-secondary">
											    <h5>Visitors</h5>
											    <h3>$45,000</h3>
										    </div>
									    </div>
								    </div>
								    <div className="card-footer text-secondary">
									    <i className="fas fa-sync mr-3"></i>
									    <span>Updated Now</span>
								    </div>
							    </div>
						    </div>
					    </div>
				    </div>
			    </div>
		    </div>
        {/** 각 현황 끝 */}

        {/** 막대 진행바 만들기 */}
        <div className="container-fluid">
			    <div className="row">
				    <div className="col-xl-10 col-lg-9 col-md-8 ml-auto" style={{ margin: "0 auto", left: "22%"}}>
					    <div className="row mb-4">
						    {/** 막대 진행바 (progress bar) */}
						    <div className="col-xl-6 col-12">
							    <div className="bg-dark text-white p-4 rounded">
								    <h4 className="mb-4">웹 브라우저 진행상태</h4>
								    {/** progress item */}
								    <h6 className="mb-3">구글 크롬</h6>
								    <div className="progress mb-4" style={{ height: "20px" }}>
									    <div className="progress-bar progress-bar-striped font-weight-bold bg-danger" style={{ width: "91%" }}>91%</div>
								    </div>
								
								    {/** progress item2 */}
								    <h6 className="mb-3">모질라 파이어폭스</h6>
								    <div className="progress mb-4" style={{ height: "20px" }}>
									    <div className="progress-bar progress-bar-striped font-weight-bold bg-success" style={{ width: "84%" }}>84%</div>
								    </div>
								
								    {/** progress item3 */}
								    <h6 className="mb-3">iOS 사파리</h6>
								    <div className="progress mb-4" style={{ height: "20px" }}>
									    <div className="progress-bar progress-bar-striped font-weight-bold bg-primary" style={{ width: "76%" }}>76%</div>
								    </div>
								
								    {/** progress item4 */}
								    <h6 className="mb-3">모질라 파이어폭스</h6>
								    <div className="progress mb-4" style={{ height: "20px" }}>
									    <div className="progress-bar progress-bar-striped font-weight-bold bg-warning" style={{ width: "34%" }}>34%</div>
								    </div>
							    </div>
						    </div>
						  <div className="col-xl-6 col-12"></div>
					  </div>
				  </div>
			  </div>
		  </div>
      {/** 막대 진행바 끝 */}
      </section>

          </div>
        </div>
      </div>

    {/** adminIndex_wrapper 끝 */}
    </div>
  );
};

export default admin_index;