import "./mypage_cancelRefund.css"; 
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const API = "http://localhost:5003";
const formatWon = (value) => Number(value || 0).toLocaleString();
const imgUrl = (path) => {
  if (!path) return "https://www.rolarola.com/_image/_default/prd/noimg3.gif";
  if (String(path).startsWith("http")) return path;
  return `${API}/uploads/${String(path).replace(/^\.\//, "")}`;
};
const typeText = (type) => {
  if (type === "RETURN") return "반품 신청";
  if (type === "REFUND") return "환불 신청";
  return "주문취소 신청";
};

const Mp_CancelRefund = () => {
  const { order_id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestType = searchParams.get("type") || "CANCEL";

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);

  const [selected, setSelected] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 조회 API 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [cancelRes, summaryRes] = await Promise.all([
          axios.get(`${API}/api/mpCancel_Refund/${order_id}`, {
            withCredentials: true,
          }),
          axios.get(`${API}/api/mypage/summary`, {
            withCredentials: true,
          }),
        ]);

        setOrder(cancelRes.data.order);
        setItems(cancelRes.data.items || []);
        setSummary(summaryRes.data);

        const checkedMap = {};
        (cancelRes.data.items || []).forEach((item) => {
          checkedMap[item.order_item_id] = true;
        });
        setSelected(checkedMap);
      } catch (err) {
        console.error("[취소/반품 조회 실패]", err);
        setError(
          err.response?.data?.message || "취소/반품 신청 정보를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [order_id]);

  // 체크박스 제어함수 
  const toggleItem = (orderItemId) => {
    setSelected((prev) => ({
      ...prev,
      [orderItemId]: !prev[orderItemId],
    }));
  };

  // 신청접수 함수 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedItems = Object.entries(selected)
      .filter(([, checked]) => checked)
      .map(([id]) => id);

    if (selectedItems.length === 0) {
      alert("신청할 상품을 선택해주세요.");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("request_type", requestType);
    formData.append("title", title);
    formData.append("content", content);

    selectedItems.forEach((id) => {
      formData.append("selected_items", id);
    });

    if (file1) formData.append("upfile1", file1);
    if (file2) formData.append("upfile2", file2);

    try {
      const res = await axios.post(
        `${API}/api/mpCancel_Refund/${order_id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "신청이 접수되었습니다.");
      navigate(`/mypage/orders/${order_id}`);
    } catch (err) {
      console.error("[취소/반품 신청 실패]", err);
      alert(err.response?.data?.message || "신청 저장에 실패했습니다.");
    }
  };

  return (
    <div className="mpCancel_Refund_wrapper">
      <div className="mpCancel_Refund_Header">
        <Header_loginOK />  
      </div>      {/** mpCancel_Refund_Header end */}

      <div className="mpCancel_Refund_Content">
        <div className="mpCancel_Refund_body">
          <h2 className="subtitle">MY PAGE</h2>     {/** subtitle end */}

          <div className="mpCancel_Refund_top">
            <div className="customer_section">
              <div className="name"><strong>곽현지</strong>님은 MEMBER</div>      {/** name end */}

              <a href="#" className="my_edit">정보 수정하기</a>    {/** my_edit end */}

              <ul className="point_section">
                <li>
                  <a href="#"><strong>쿠폰</strong> 0 장</a>
                </li>
                <li>
                  <a href="#"><strong>적립금</strong> 0 원</a>
                </li>
                <li>
                  <a href="#"><strong>포인트</strong> 0 P</a>  
                </li>  
              </ul>     {/** point_section end */} 

              <ul className="mpCancel_Refund_tab">
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
              </ul>     {/** mpCancel_Refund_tab end */}
            </div>    {/** customer_section end */}  
          </div>     {/** mpCancel_Refund_top end */}

          <div id="counsel_write">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              style={{ margin: "0px", textAlign: "center" }}
            >
              <input type="hidden" name="exec_file" value="mypage/counsel.exe.php" />
              <input type="hidden" name="ono" value="20260430-0F8A9" />
              <input type="hidden" name="cate1" value="2" />
              <input type="hidden" name="cate2" value="14" />
              <input type="hidden" name="sbscr" value="N" />
              <input type="hidden" name="editor_code" value="counsel_temp_1777793953 " />

		          <fieldset>
			          <legend className="hidden">1:1문의 작성하기</legend>
			          <div>환불 신청
                  <input type="hidden" name="cate1" value="2" />
                  <input type="hidden" name="cate2" value="14" />
                </div>
			          <div>주문번호 : 20260430-0F8A9</div>
                <div>주문상품 : BASIC LINEN CARDIGAN PINK</div>
			
                <table className="tbl_col prd">
	                <caption className="hidden">상품선택</caption>
	                <colgroup>
		                <col style={{ width: "40px"}} /> 
		                <col style={{ width: "100px" }} />
		                <col />
		                <col style={{ width: "5%" }} />
		                <col style={{ width: "12%" }} />
		                <col style={{ width: "12%" }} />
		                <col style={{ width: "10%" }} />
	                </colgroup>
	          
                  <thead>
		                <tr>
			                <th></th>
			                <th colSpan="2">상품명</th>
			                <th>수량</th>
			                <th>주문금액</th>
			                <th>결제금액</th>
			                <th>상태</th>
		                </tr>
	                </thead>

	                <tbody>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <tr key={item.order_item_id}>
                          <td>
                            <input
                              type="checkbox"
                              name="selected_items"
                              value={item.order_item_id}
                              checked={!!selected[item.order_item_id]}
                              onChange={() => toggleItem(item.order_item_id)}
                            />
                          </td>

                          <td className="img">
                            <img src={imgUrl(item.filename)} alt={item.pname} />
                          </td>

                          <td className="tal">
                            {item.pname}
                            <br />
                            {item.option_label || "-"}
                          </td>

                          <td>{item.quantity}</td>
                          <td>{formatWon(item.unit_price)} 원</td>
                          <td>{formatWon(item.line_total)} 원</td>
                          <td>{order?.status === "PAID" ? "결제완료" : order?.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7}>신청 가능한 주문상품이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
			
			          <div>
				          <label htmlFor="counsel_title">제목</label>
				          <input type="text" name="title" id="counsel_title" className="form_input block" placeholder="제목" />
			          </div>
			          <div className="content">
				          <label htmlFor="counsel_cnt">문의내용</label>
				          <textarea
                    name="content"
                    id="counsel_cnt"
                    className="form_input block"
                    placeholder="문의내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
			          </div>
			          <div>
				          <label htmlFor="counsel_file1">첨부파일 1</label>
				          <input type="file" name="upfile1" id="counsel_file1" className="form_input block" />
			          </div>
			          <div>
				          <label htmlFor="counsel_file2">첨부파일 2</label>
				          <input type="file" name="upfile2" id="counsel_file2" className="form_input block" />
			          </div>	
		          </fieldset>

		          <div className="btn">
			          <span className="box_btn large w150"><input type="submit" value="확인" /></span>
			          <span className="box_btn large w150 white"><a href="/">취소</a></span>
		          </div>
	          </form>
          </div>        {/** #counsel_write end */}
        </div>      {/** mpCancel_Refund_body end */}  
      </div>     {/** mpCancel_Refund_Content end */}

      <div className="mpCancel_Refund_Footer">
        <Footer />  
      </div>      {/** mpCancel_Refund_Footer end */}
    </div>       /** mpCancel_Refund_wrapper end */
  );
};

export default Mp_CancelRefund;