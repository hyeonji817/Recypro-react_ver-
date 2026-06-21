import "./mypage_orderRequest.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Mp_OrderRequest = () => {
  const { order_id } = useParams(); 
  const navigate = useNavigate(); 

  const [user, setUser] = useState(null); 
  const [order, setOrder] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 

  const [upfile1, setUpfile1] = useState(null); 
  const [upfile2, setUpfile2] = useState(null); 

  const [loading, setLoading] = useState(true); 
  const [submitting, setSubmitting] = useState(false); 
  const [error, setError] = useState(""); 

  const productText = useMemo(() => {
    const items = order?.items || [];

    if (items.length === 0) {
      return "";
    }

    if (items.length === 1) {
      return items[0].pname;
    }

    return `${items[0].pname} 외 ${items.length - 1}건`;
  }, [order]);

  useEffect(() => {
    const fetchOrderRequestInfo = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:5003/api/mpOrder_Request/${order_id}`,
          {
            withCredentials: true,
          }
        );

        setUser(res.data.user);
        setOrder(res.data.order);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "주문문의 정보를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    if (order_id) {
      fetchOrderRequestInfo();
    }
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
      formData.append("order_id", order_id);
      formData.append("title", title);
      formData.append("content", content);

      if (upfile1) {
        formData.append("upfile1", upfile1);
      }

      if (upfile2) {
        formData.append("upfile2", upfile2);
      }

      await axios.post(
        "http://localhost:5003/api/mpOrder_Request",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("주문문의가 등록되었습니다.");
      navigate("/orders");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "주문문의 등록 중 오류가 발생했습니다."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mpOrder_Request_wrapper">
        <div className="mpOrder_Request_Header">
          <Header_loginOK />
        </div>

        <div className="mpOrder_Request_Content">
          <div className="mpOrder_Request_body">
            <h2 className="subtitle">MY PAGE</h2>
            <div className="order_request">불러오는 중...</div>
          </div>
        </div>

        <div className="mpOrder_Request_Footer">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="mpOrder_Request_wrapper">
      <div className="mpOrder_Request_Header">
        <Header_loginOK />
      </div>

      <div className="mpOrder_Request_Content">
        <div className="mpOrder_Request_body">
          <h2 className="subtitle">MY PAGE</h2>

          <div className="mpOrder_Request_top">
            <div className="customer_section">
              <div className="name">
                <strong>{user?.name || user?.id}</strong>님은{" "}
                {user?.grade || "MEMBER"}
              </div>

              <a href="#" className="my_edit">
                정보 수정하기
              </a>

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
              </ul>

              <ul className="mpOrder_Request_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER
                    <br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_wishList" className="tab_title">
                    WISH LIST
                    <br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_coupon" className="tab_title">
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
              </ul>
            </div>
          </div>

          <div className="order_request" id="counsel_write">
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="order_id" value={order_id} />
              <input type="hidden" name="exec_file" value="" />
              <input type="hidden" name="ono" value={order?.order_no || ""} />
              <input type="hidden" name="cate1" value="1" />
              <input type="hidden" name="cate2" value="2" />
              <input type="hidden" name="sbscr" value="N" />
              <input type="hidden" name="editor_code" value="" />

              <fieldset>
                <legend className="hidden">1:1문의 작성하기</legend>

                <div>
                  주문 문의
                  <input type="hidden" name="cate1" value="1" />
                  <input type="hidden" name="cate2" value="2" />
                </div>

                <div>주문번호 : {order?.order_no || order?.order_id}</div>
                <div>주문상품 : {productText}</div>

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
                  <label htmlFor="counsel_cnt">문의내용</label>
                  <textarea
                    name="content"
                    id="counsel_cnt"
                    className="form_input block counsel_textarea"
                    placeholder="문의내용을 입력하세요."
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
                    onChange={(e) => setUpfile1(e.target.files?.[0] || null)}
                  />
                </div>

                <div>
                  <label htmlFor="counsel_file2">첨부파일 2</label>
                  <input
                    type="file"
                    name="upfile2"
                    id="counsel_file2"
                    className="form_input block"
                    onChange={(e) => setUpfile2(e.target.files?.[0] || null)}
                  />
                </div>
              </fieldset>

              <div className="btn">
                <span className="box_btn large w150">
                  <input
                    type="submit"
                    value={submitting ? "등록 중..." : "확인"}
                    disabled={submitting}
                  />
                </span>

                <span className="box_btn large w150 white">
                  <a href="/mypage/orders">취소</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mpOrder_Request_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Mp_OrderRequest;