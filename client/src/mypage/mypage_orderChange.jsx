import "./mypage_orderChange.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Mp_OrderChange = () => {
  const { order_id } = useParams();
  const navigate = useNavigate(); 
  
  const [order, setOrder] = useState(null); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 

  const [upfile1, setUpfile1] = useState(null);
  const [upfile2, setUpfile2] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5003/api/mypage/order-change/${order_id}`,
          { withCredentials: true }
        );

        setOrder(res.data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return; 
        }

        alert(err.response?.data?.message || "주문 정보를 불러오지 못했습니다.");
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder(); 
  }, [order_id, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("문의내용을 입력해주세요.");
      return; 
    }

    try {
      setSubmitting(true); 

      const formData = new FormData(); 
      formData.append("order_id", order.order_id);
      formData.append("title", title);
      formData.append("content", content); 

      if (upfile1) formData.append("upfile1", upfile1);
      if (upfile2) formData.append("upfile2", upfile2);

      console.log("[OrderChange] order_id:", order_id);
      console.log(
        "[OrderChange] 요청 URL:",
        `http://localhost:5003/api/mypage/order-change/${order_id}`
      );

      await axios.post("http://localhost:5003/api/mypage/order-change",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("주문변경 신청이 접수되었습니다.");
      navigate("/orders");
    } catch (err) {
      console.error(err); 
      alert(err.response?.data?.message || "주문변경 신청에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mpOrder_Change_wrapper">
        <div className="mpOrder_Change_Header">
          <Header_loginOK />
        </div>
        <div className="mpOrder_Change_Content">
          <div className="mpOrder_Change_body">
            <h2 className="subtitle">MY PAGE</h2>
            <p>주문 정보를 불러오는 중입니다.</p>
          </div>
        </div>
        <div className="mpOrder_Change_Footer">
          <Footer />
        </div>
      </div>
    );
  }

  const productNames = 
  order?.items?.map((item) => {
    const option = item.option_label ? ` (${item.option_label})` : "";
    return `${item.pname}${option} / ${item.quantity}개`;
  }) || [];

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
                <strong>{order?.user_id}</strong>님은 MEMBER  
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

              <ul className="mpOrder_Change_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER
                    <br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="tab_title">
                    WISH LIST
                    <br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="/coupons" className="tab_title">
                    COUPON
                    <br />
                    <strong className="tab_sub">쿠폰</strong>
                  </a>
                </li>
                <li>
                  <a href="/mileage" className="tab_title">
                    MILEAGE
                    <br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="/deposits" className="tab_title">
                    DEPOSITS
                    <br />
                    <strong className="tab_sub">예치금</strong>
                  </a>
                </li>
                <li>
                  <a href="/special-mileage" className="tab_title">
                    SECRET MILEAGE
                    <br />
                    <strong className="tab_sub">스페셜 적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    Q&amp;A
                    <br />
                    <strong className="tab_sub">내 상품문의</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    MYBOARD
                    <br />
                    <strong className="tab_sub">내 상품평</strong>
                  </a>
                </li>
                <li>
                  <a href="/withdraw" className="tab_title">
                    WITHDRAW
                    <br />
                    <strong className="tab_sub">회원 탈퇴</strong>
                  </a>
                </li>  
              </ul>      {/** mpOrder_Change_tab end */}
            </div>    {/** customer_section end */}  
          </div>    {/** mpOrder_Change_top end */}

          <div id="counsel_write">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{ margin: "0px", textAlign: "center" }}
          >
              <input type="hidden" name="order_id" value={order?.order_id || ""} />

		          <fieldset>
			          <legend className="hidden">1:1문의 작성하기</legend>
			          <div>주문 변경</div>
			          <div>주문번호 : {order?.order_no || order?.order_id}</div>
                <div>주문상품 : {productNames.length > 0 ? productNames.join(", ") : "-"}</div>
			
			          <div>
				          <label htmlFor="counsel_title">제목</label>
				          <input
                    type="text"
                    name="title"
                    id="counsel_title"
                    className="form_input block"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
			          </div>
			          <div className="content">
				          <label htmlFor="counsel_cnt" className="counsel_cnt">문의내용</label>
				          <textarea
                    name="content"
                    id="counsel_cnt"
                    className="form_input block"
                    placeholder="문의내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
			          </div>
			          <div>
				          <label htmlFor="counsel_file1">첨부파일 1</label>
				          <input
                    type="file"
                    name="upfile1"
                    id="counsel_file1"
                    className="form_input block"
                    onChange={(e) => setUpfile1(e.target.files[0])}
                  />
			          </div>
			          <div>
				          <label htmlFor="counsel_file2">첨부파일 2</label>
				          <input
                    type="file"
                    name="upfile2"
                    id="counsel_file2"
                    className="form_input block"
                    onChange={(e) => setUpfile2(e.target.files[0])}
                  />
			          </div>	
		          </fieldset>

		          <div className="btn">
                <span className="box_btn large w150">
                  <input
                    type="submit"
                    value={submitting ? "처리중..." : "확인"}
                    disabled={submitting}
                  />
                </span>

                <span className="box_btn large w150 white">
                  <a href="/orders">취소</a>
                </span>
		          </div>
	          </form>
    
          </div>      {/** #counsel_write end */}
        </div>     {/** mpOrder_Change_body end */}  
      </div>    {/** mpOrder_Change_Content end */}

      <div className="mpOrder_Change_Footer">
        <Footer />  
      </div>     {/** mpOrder_Change_Footer end */}
    </div>      /** mpOrder_Change_wrapper end */
  );
};

export default Mp_OrderChange;