import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import "./mypage_q&a.css";

const INQUIRY_API =
  (import.meta.env.VITE_API_URL || "") + "/api/mypage/product-inquiries";
const REQUEST_OPTIONS = {
  withCredentials: true,
};
const INITIAL_FORM = {
  title: "",
  content: "",
  is_secret: false,
  product_table: "",
  product_id: "",
};

const MpQA = () => {
  // 회원 정보와 문의 목록
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    items: [],
    total: 0,
    page: 1,
    pages: 1,
  });
  const [filter, setFilter] = useState({
    status: "all",
    search: "",
    page: 1,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);

  // 문의 상세 및 작성 폼
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [productSearch, setProductSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [productError, setProductError] = useState("");
  const [searchingProducts, setSearchingProducts] = useState(false);

  // 중복 제출과 이전 검색 응답 방지
  const mutationLock = useRef(false);
  const listRequestId = useRef(0);
  const productRequestId = useRef(0);

  const getErrorMessage = useCallback((error) => {
    if (error.response?.status === 401) setUnauthorized(true);
    return (
      error.response?.data?.message ||
      "요청에 실패했습니다. 다시 시도해 주세요."
    );
  }, []);

  useEffect(() => {
    const c = new AbortController();
    axios
      .get((import.meta.env.VITE_API_URL || "") + "/api/mypage", {
        ...REQUEST_OPTIONS,
        signal: c.signal,
      })
      .then(({ data }) => setUser(data))
      .catch(() => {});
    return () => c.abort();
  }, []);
  useEffect(() => {
    const c = new AbortController();
    const request = ++listRequestId.current;
    setLoading(true);
    setError("");
    axios
      .get(INQUIRY_API, {
        ...REQUEST_OPTIONS,
        params: filter,
        signal: c.signal,
      })
      .then(({ data }) => {
        if (request === listRequestId.current) {
          setData(data);
          setExpandedId(null);
        }
      })
      .catch((err) => {
        if (!c.signal.aborted) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!c.signal.aborted) setLoading(false);
      });
    return () => c.abort();
  }, [filter, refreshKey, getErrorMessage]);

  // 상품 검색 → 문의 저장 → 문의 삭제
  async function handleProductSearch(e) {
    e.preventDefault();
    const current = ++productRequestId.current;
    setSearchingProducts(true);
    setProductError("");
    setProducts([]);
    try {
      const { data } = await axios.get(INQUIRY_API + "/products", {
        ...REQUEST_OPTIONS,
        params: {
          search: productSearch,
        },
      });
      if (current === productRequestId.current) {
        setProducts(data);
        if (!data.length) setProductError("검색된 상품이 없습니다.");
      }
    } catch (err) {
      if (current === productRequestId.current)
        setProductError(getErrorMessage(err));
    } finally {
      if (current === productRequestId.current) setSearchingProducts(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (mutationLock.current) return;
    mutationLock.current = true;
    setBusy(true);
    setNotice("");
    try {
      const response = form.inquiry_id
        ? await axios.put(
            INQUIRY_API + "/" + form.inquiry_id,
            form,
            REQUEST_OPTIONS,
          )
        : await axios.post(INQUIRY_API, form, REQUEST_OPTIONS);
      setNotice(response.data.message);
      setForm(null);
      setProducts([]);
      setFilter((f) => ({
        ...f,
        page: 1,
      }));
      setRefreshKey((n) => n + 1);
    } catch (err) {
      setNotice(getErrorMessage(err));
    } finally {
      mutationLock.current = false;
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (
      mutationLock.current ||
      !window.confirm(
        "이 상품문의를 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.",
      )
    )
      return;
    mutationLock.current = true;
    setBusy(true);
    setNotice("");
    try {
      const { data } = await axios.delete(
        INQUIRY_API + "/" + id,
        REQUEST_OPTIONS,
      );
      setNotice(data.message);
      setRefreshKey((n) => n + 1);
      if (form?.inquiry_id === id) setForm(null);
    } catch (err) {
      setNotice(getErrorMessage(err));
    } finally {
      mutationLock.current = false;
      setBusy(false);
    }
  }

  function openEditor(item) {
    setNotice("");
    setForm(
      item
        ? {
            ...item,
            is_secret: Boolean(item.is_secret),
          }
        : {
            ...INITIAL_FORM,
          },
    );
    setProductSearch("");
    setProducts([]);
    setProductError("");
    productRequestId.current++;
    setSearchingProducts(false);
  }

  return (
    <div className="mpQA_wrapper">
      <div className="mpQA_Header">
        <Header_loginOK />
      </div>
      <div className="mpQA_Content">
        <div className="mpQA_body">
          <h2 className="subtitle">MY PAGE</h2>
          <div className="mpQA_top">
            <div className="customer_section">
              <div className="name">
                <strong>{user.name || user.id || "회원"}</strong>님은{" "}
                {user.grade || "MEMBER"}
              </div>{" "}
              {/** name end */}
              <ul className="mpQA_tab">
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
                  <a href="/mypage_mileage" className="tab_title">
                    MILEAGE
                    <br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_deposit" className="tab_title">
                    DEPOSITS
                    <br />
                    <strong className="tab_sub">예치금</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_specialMileage" className="tab_title">
                    SECRET MILEAGE
                    <br />
                    <strong className="tab_sub">스페셜 적립금</strong>
                  </a>
                </li>
                <li>
                  <a
                    href="/mypage_qa"
                    aria-current="page"
                    className="tab_title"
                  >
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
          </div>{" "}
          {/**  mpQA_top end */}
          <section className="qa-section" aria-labelledby="qa-title">
            <div className="qa-heading">
              <h3 id="qa-title">내 상품문의</h3>
              <button
                onClick={() => openEditor(null)}
                disabled={busy || unauthorized}
              >
                상품문의 작성
              </button>
            </div>
            <p className="qa-guide">
              작성하신 상품문의와 답변을 확인할 수 있습니다. 답변 대기 중인
              문의만 수정할 수 있습니다.
            </p>
            {notice && (
              <p role="status" className="qa-message">
                {notice}
              </p>
            )}
            {unauthorized && (
              <p role="alert">
                로그인 후 이용해 주세요. <Link to="/login">로그인하기</Link>
              </p>
            )}
            {form && !unauthorized && (
              <div className="qa-editor">
                <h4>{form.inquiry_id ? "상품문의 수정" : "상품문의 작성"}</h4>
                {!form.inquiry_id && (
                  <>
                    <form onSubmit={handleProductSearch} className="qa-search">
                      <label htmlFor="qa-product-search">상품명 검색</label>
                      <input
                        id="qa-product-search"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        minLength={2}
                        maxLength={100}
                        required
                        placeholder="상품명을 2자 이상 입력하세요"
                      />
                      <button disabled={searchingProducts || busy}>검색</button>
                    </form>
                    {productError && <p role="status">{productError}</p>}
                    {products.length > 0 && (
                      <label>
                        상품 선택
                        <select
                          value={form.product_table + "|" + form.product_id}
                          onChange={(e) => {
                            const [product_table, product_id] =
                              e.target.value.split("|");
                            setForm((f) => ({
                              ...f,
                              product_table,
                              product_id,
                            }));
                          }}
                        >
                          <option value="|">상품을 선택하세요</option>
                          {products.map((p) => (
                            <option
                              key={p.product_table + "|" + p.product_id}
                              value={p.product_table + "|" + p.product_id}
                            >
                              {p.pname}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </>
                )}
                {form.inquiry_id && <p>상품: {form.product_name}</p>}
                <form onSubmit={handleSave}>
                  <label>
                    제목
                    <input
                      autoFocus
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          title: e.target.value,
                        }))
                      }
                      required
                      maxLength={100}
                    />
                  </label>
                  <label>
                    문의 내용
                    <textarea
                      value={form.content}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          content: e.target.value,
                        }))
                      }
                      required
                      maxLength={5000}
                      rows={7}
                    />
                  </label>
                  <small>
                    {form.content.length.toLocaleString()} / 5,000자 ·
                    개인정보는 입력하지 마세요.
                  </small>
                  <label className="qa-checkbox">
                    <input
                      type="checkbox"
                      checked={form.is_secret}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          is_secret: e.target.checked,
                        }))
                      }
                    />
                    비밀글로 작성
                  </label>
                  <div className="qa-actions">
                    <button
                      disabled={busy || (!form.inquiry_id && !form.product_id)}
                    >
                      {busy ? "처리 중…" : "저장"}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setForm(null)}
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            )}
            <form
              className="qa-search"
              onSubmit={(e) => {
                e.preventDefault();
                setFilter((f) => ({
                  ...f,
                  search: search.trim(),
                  page: 1,
                }));
              }}
            >
              <label htmlFor="qa-status">답변 상태</label>
              <select
                id="qa-status"
                value={filter.status}
                onChange={(e) =>
                  setFilter((f) => ({
                    ...f,
                    status: e.target.value,
                    page: 1,
                  }))
                }
              >
                <option value="all">전체</option>
                <option value="waiting">답변 대기</option>
                <option value="answered">답변 완료</option>
              </select>
              <label className="qa-sr-only" htmlFor="qa-search">
                상품명 또는 문의 제목
              </label>
              <input
                id="qa-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                maxLength={100}
                placeholder="상품명 또는 문의 제목"
              />
              <button>검색</button>
            </form>
            {loading ? (
              <p className="qa-empty" role="status">
                상품문의를 불러오는 중입니다.
              </p>
            ) : error ? (
              <div className="qa-empty" role="alert">
                {error}{" "}
                <button onClick={() => setRefreshKey((n) => n + 1)}>
                  다시 조회
                </button>
              </div>
            ) : (
              <>
                <p className="qa-count">총 {data.total.toLocaleString()}건</p>
                <div className="qa-table-scroll">
                  <table className="qa-table">
                    <caption className="qa-sr-only">내 상품문의 목록</caption>
                    <thead>
                      <tr>
                        <th scope="col">번호</th>
                        <th scope="col">상품 / 문의 제목</th>
                        <th scope="col">작성일</th>
                        <th scope="col">답변 상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!data.items.length && (
                        <tr>
                          <td colSpan={4} className="qa-empty">
                            {filter.search || filter.status !== "all"
                              ? "검색 조건에 맞는 문의가 없습니다."
                              : "등록한 상품문의가 없습니다."}
                          </td>
                        </tr>
                      )}
                      {data.items.map((item, index) => (
                        <Fragment key={item.inquiry_id}>
                          <tr>
                            <td>{data.total - (data.page - 1) * 10 - index}</td>
                            <td className="qa-subject">
                              <span>{item.product_name}</span>
                              <button
                                aria-expanded={expandedId === item.inquiry_id}
                                aria-controls={"qa-detail-" + item.inquiry_id}
                                onClick={() =>
                                  setExpandedId(
                                    expandedId === item.inquiry_id
                                      ? null
                                      : item.inquiry_id,
                                  )
                                }
                              >
                                {item.is_secret ? "🔒 " : ""}
                                {item.title}
                              </button>
                            </td>
                            <td>{String(item.created_at).slice(0, 10)}</td>
                            <td>
                              <span
                                className={
                                  item.answer === null
                                    ? "qa-waiting"
                                    : "qa-answered"
                                }
                              >
                                {item.answer === null
                                  ? "답변 대기"
                                  : "답변 완료"}
                              </span>
                            </td>
                          </tr>
                          <tr
                            id={"qa-detail-" + item.inquiry_id}
                            hidden={expandedId !== item.inquiry_id}
                          >
                            <td colSpan={4} className="qa-detail">
                              <p className="qa-content">
                                <strong>Q.</strong> {item.content}
                              </p>
                              <div className="qa-answer">
                                <strong>A.</strong>
                                <p>
                                  {item.answer ??
                                    "아직 등록된 답변이 없습니다. 확인 후 답변드리겠습니다."}
                                </p>
                                {item.answered_at && (
                                  <small>
                                    답변일{" "}
                                    {String(item.answered_at).slice(0, 10)}
                                  </small>
                                )}
                              </div>
                              <div className="qa-actions">
                                <Link
                                  to={
                                    "/" +
                                    item.product_table +
                                    "/" +
                                    encodeURIComponent(item.product_id)
                                  }
                                >
                                  상품 보기
                                </Link>
                                {item.answer === null && (
                                  <button
                                    disabled={busy}
                                    onClick={() => openEditor(item)}
                                  >
                                    수정
                                  </button>
                                )}
                                <button
                                  disabled={busy}
                                  onClick={() => handleDelete(item.inquiry_id)}
                                >
                                  삭제
                                </button>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav className="qa-pagination" aria-label="문의 목록 페이지">
                  <button
                    disabled={data.page <= 1}
                    onClick={() =>
                      setFilter((f) => ({
                        ...f,
                        page: data.page - 1,
                      }))
                    }
                  >
                    이전
                  </button>
                  <span aria-current="page">
                    {data.page} / {data.pages}
                  </span>
                  <button
                    disabled={data.page >= data.pages}
                    onClick={() =>
                      setFilter((f) => ({
                        ...f,
                        page: data.page + 1,
                      }))
                    }
                  >
                    다음
                  </button>
                </nav>
              </>
            )}
          </section>
        </div>
      </div>
      <div className="mpQA_Footer">
        <Footer />
      </div>
    </div>
  );
};
export default MpQA;
