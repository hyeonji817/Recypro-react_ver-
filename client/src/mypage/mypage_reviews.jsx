import ReviewRewardInfo from "./ReviewRewardInfo";
import useMemberGrade from "./useMemberGrade";
import { useEffect, useState } from "react";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import "./Mypage.css";
import "./mypage_reviews.css";

const API = import.meta.env.VITE_API_URL || "";
const menus = [
  ["ORDER", "주문내역", "/orders"],
  ["WISH LIST", "관심상품", "/mypage_wishList"],
  ["COUPON", "쿠폰", "/mypage_coupon"],
  ["MILEAGE", "적립금", "/mypage_mileage"],
  ["DEPOSITS", "예치금", "/deposits"],
  ["SECRET MILEAGE", "스페셜 적립금", "/mypage_specialMileage"],
  ["Q&A", "내 상품문의", "/mypage_q%26a"],
  ["MYBOARD", "내 상품평", "/mypage_reviews"],
  ["WITHDRAW", "회원 탈퇴", "/withdraw"],
];
const media = (value) => {
  if (!value) return "";
  const path = String(value);
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return `${API}${path}`;
  return `${API}/uploads/${path.replace(/^\.\//, "")}`;
};

export default function MyReviews() {
  const memberGrade = useMemberGrade();
  const [writing, setWriting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [summary, setSummary] = useState({});
  const [data, setData] = useState({ written: [], available: [] });
  const [tab, setTab] = useState("available");
  const [sort, setSort] = useState("oldest");
  const [expanded, setExpanded] = useState([]);
  const [policy, setPolicy] = useState(false);
  const [state, setState] = useState("loading");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const get = async (path) => {
      const response = await fetch(`${API}/api/mypage/${path}`, {
        credentials: "include",
        signal: controller.signal,
      });
      if (!response.ok)
        throw new Error(response.status === 401 ? "login" : "error");
      return response.json();
    };
    setState("loading");
    Promise.all([get("summary"), get("reviews")])
      .then(([info, reviews]) => {
        setSummary(info);
        setData(reviews);
        setState("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError")
          setState(error.message === "login" ? "login" : "error");
      });
    return () => controller.abort();
  }, [retry]);
  const submitReview = async (event) => {
    event.preventDefault();
    if (saving) return;
    const values = new FormData(event.currentTarget);
    setSaving(true);
    setFormError("");
    try {
      const payload=new FormData();payload.set('order_item_id',writing.order_item_id);payload.set('rv_rating',values.get('rating'));payload.set('rv_title',values.get('content'));for(const photo of values.getAll('photos'))if(photo.size)payload.append('photos',photo);
      const response=await fetch(API+'/api/mypage/reviews',{method:'POST',credentials:'include',body:payload});
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "등록에 실패했습니다.");
      alert(result.message || "리뷰와 적립금이 등록되었습니다.");
      setWriting(null);
      setTab("written");
      setSort("newest");
      setRetry((previous) => previous + 1);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSaving(false);
    }
  };
  const user = summary.user || {};
  const items = [...data[tab]].sort((a, b) => {
    const delta =
      new Date(a.date || a.created_at || 0) -
      new Date(b.date || b.created_at || 0);
    return sort === "oldest" ? delta : -delta;
  });
  const toggle = (index) =>
    setExpanded((previous) =>
      previous.includes(index)
        ? previous.filter((i) => i !== index)
        : [...previous, index],
    );
  return (
    <div className="Mypage_wrapper my-reviews">
      <Header_loginOK />
      <main id="mypage_Content">
        <div className="mypage_body">
          <h2 className="subtitle">MY PAGE</h2>
          <div className="mypage_top">
            <div className="customer_section">
              <div className="name">
                <strong>{user.name || user.id || "회원"}</strong>님은{" "}
                {memberGrade.grade || (memberGrade.error ? "등급 조회 불가" : "등급 조회 중")}
              </div>
              <a href="/edit" className="my_edit">
                정보 수정하기
              </a>
              <ul className="point_section">
                <li>
                  <a href="/mypage_coupon">
                    <strong>쿠폰</strong> {summary.counts?.coupons || 0} 장
                  </a>
                </li>
                <li>
                  <a href="/mypage_mileage">
                    <strong>적립금</strong>{" "}
                    {Number(summary.money?.mileage || 0).toLocaleString()} 원
                  </a>
                </li>
                <li>
                  <a href="/points">
                    <strong>포인트</strong>{" "}
                    {Number(summary.money?.points || 0).toLocaleString()} P
                  </a>
                </li>
              </ul>
              <ul className="my_page_tab">
                {menus.map(([title, label, href]) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="tab_title"
                      aria-current={title === "MYBOARD" ? "page" : undefined}
                    >
                      {title}
                      <br />
                      <strong className="tab_sub">{label}</strong>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <section className="reviews-section" aria-label="내 상품평">
            <div className="reviews-policy">
              <button onClick={() => setPolicy(!policy)} aria-expanded={policy}>
                ⓘ 리뷰 운영방식
              </button>
            </div>
            {policy && (
              <div className="reviews-policy-text">
                구매한 상품의 리뷰를 작성할 수 있습니다. 리뷰 수정 또는 삭제는
                고객센터로 문의해 주세요.
              </div>
            )}
            <ReviewRewardInfo />
            <div className="reviews-tabs" role="tablist" aria-label="리뷰 구분">
              {[
                ["available", "작성 가능한 리뷰"],
                ["written", "내가 작성한 리뷰"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  id={`tab-${key}`}
                  role="tab"
                  aria-selected={tab === key}
                  aria-controls="reviews-panel"
                  onClick={() => {
                    setTab(key);
                    setExpanded([]);
                    setSort(key === "available" ? "oldest" : "newest");
                  }}
                >
                  {label} <span>{data[key].length}</span>
                </button>
              ))}
            </div>
            <div
              id="reviews-panel"
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              tabIndex={0}
            >
              {tab === "available" && (
                <div className="reviews-sort">
                  <select
                    aria-label="구매 순서"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="oldest">과거 구매순</option>
                    <option value="newest">최근 구매순</option>
                  </select>
                </div>
              )}
              {state === "loading" ? (
                <p className="reviews-empty" role="status">
                  리뷰를 불러오는 중입니다.
                </p>
              ) : state === "login" ? (
                <p className="reviews-empty">
                  <a href="/login">로그인 후 내 상품평을 확인해 주세요.</a>
                </p>
              ) : state === "error" ? (
                <div className="reviews-empty" role="alert">
                  리뷰를 불러오지 못했습니다.{" "}
                  <button onClick={() => setRetry(retry + 1)}>다시 시도</button>
                </div>
              ) : !items.length ? (
                <p className="reviews-empty">
                  {tab === "available"
                    ? "작성할 리뷰가 없습니다."
                    : "아직 작성한 리뷰가 없습니다."}
                </p>
              ) : (
                items.map((item, index) => (
                  <article className="review-card" key={`${tab}-${index}`}>
                    <div className="review-product">
                      {item.filename ? (
                        <img
                          src={media(item.filename)}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="review-placeholder" aria-hidden="true">
                          R
                        </span>
                      )}
                      <div>
                        <h3>{item.pname}</h3>
                        <p>
                          {tab === "written" ? (
                            <>
                              <span className="review-pink">★</span>{" "}
                              {Number(item.rv_rating || 0).toFixed(1)}{" "}
                              <span className="review-meta">내 평점</span>
                            </>
                          ) : (
                            <span className="review-meta">
                              구매일{" "}
                              {new Date(item.created_at).toLocaleDateString(
                                "ko-KR",
                              )}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    {item.option_label && (
                      <p className="review-option">
                        <span>상품 옵션</span> {item.option_label}
                      </p>
                    )}
                    {tab === "written" ? (
                      <>
                        <div
                          className="review-stars"
                          aria-label={`5점 만점에 ${item.rv_rating}점`}
                        >
                          {"★".repeat(
                            Math.max(
                              0,
                              Math.min(
                                5,
                                Math.round(Number(item.rv_rating) || 0),
                              ),
                            ),
                          )}
                          {"☆".repeat(
                            5 -
                              Math.max(
                                0,
                                Math.min(
                                  5,
                                  Math.round(Number(item.rv_rating) || 0),
                                ),
                              ),
                          )}
                        </div>
                        <p
                          id={`review-content-${index}`}
                          className={`review-content ${expanded.includes(index) ? "is-expanded" : ""}`}
                        >
                          {item.rv_title}
                        </p>
                        {(item.images || (item.image ? [item.image] : [])).map((image,photoIndex)=><button key={image} type="button" className="review-photo" aria-label={`리뷰 사진 ${photoIndex+1} 크게 보기`} onClick={()=>toggle(`photo-${index}-${photoIndex}`)}><img className={expanded.includes(`photo-${index}-${photoIndex}`)?"is-large":""} src={media(image)} alt={`${item.pname} 구매 후기 ${photoIndex+1}`}/></button>)}
                        {item.reward_amount!=null&&<p>리뷰 적립금 {Number(item.reward_amount).toLocaleString()}원</p>}
                        <button
                          className="review-more"
                          aria-expanded={expanded.includes(index)}
                          aria-controls={`review-content-${index}`}
                          onClick={() => toggle(index)}
                        >
                          {expanded.includes(index)
                            ? "리뷰 접기"
                            : "리뷰 더보기"}
                        </button>
                        <p className="review-notice">
                          ⓘ 리뷰 수정 또는 삭제를 원할 경우,{" "}
                          <a href="/customerQA">고객센터</a>로 문의해 주세요.
                        </p>
                      </>
                    ) : (
                      <button
                        className="review-write"
                        onClick={() => {
                          setWriting(item);
                          setFormError("");
                        }}
                      >
                        리뷰 작성
                      </button>
                    )}
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      {writing && (
        <div className="review-compose">
          <form onSubmit={submitReview} aria-label="상품평 작성">
            <h3>리뷰 작성</h3>
            <p>{writing.pname}</p>
            <label>
              별점
              <select name="rating" defaultValue="5">
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value}점
                  </option>
                ))}
              </select>
            </label>
            <label>
              리뷰 내용
              <textarea
                autoFocus
                name="content"
                required
                maxLength={1000}
                rows={5}
                placeholder="구매하신 상품은 어떠셨나요?"
              />
            </label>
            <label>사진 첨부 (선택)<input type="file" name="photos" accept="image/jpeg,image/png,image/webp" multiple disabled={saving}/></label><p>장당 5MB, 최대 3장 · 텍스트 500원 / 사진 포함 1,500원</p>
            {formError && <p role="alert">{formError}</p>}
            <div>
              <button
                type="button"
                disabled={saving}
                onClick={() => setWriting(null)}
              >
                취소
              </button>
              <button disabled={saving}>
                {saving ? "등록 중…" : "리뷰 등록"}
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}
