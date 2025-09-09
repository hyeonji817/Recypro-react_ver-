import "./customer_privacy.css"; 
import { useEffect, useState } from "react";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Customer_Privacy = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // 렌더링 직후 isReady를 true로 설정
    setIsReady(true);
  }, []);

  // 준비 안 됐을 때는 아무것도 렌더링하지 않음
  if (!isReady) return null;

  return (
    <div className="csPrivacy_wrapper">
      <div className="csPrivacy_Header">
        <Header_loginOK />
      </div>
      <div className="csPrivacy_Content">
        <div className="csPrivacyBody">
          <h2 className="subtitle">개인정보처리방침</h2>
          <div id="contentWrapper">
            <div id="contentWrap">
              <div id="content">
                <div className="inner">
                  <div id="privacy">
                    <p>&nbsp;</p>
                    <p>시행일 : 2024년 08월 21일 <br /><br /></p>
                    <dt id="cont1">주식회사 바이와이제이 개인정보 처리방침</dt>
                    <dd className="first">
                      주식회사 바이와이제이(이하 “회사”)에서 운영하고 있는 &quotROLAROLA&quot은 고객의 개인정보를 소중하게 생각하고, 고객의 개인정보를 보호하기 위하여 항상 최선을 다하고 있습니다.<br />
                      회사는 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』(이하 “정보통신망법”) 및 『개인정보보호법』 등 개인정보 보호법 등 정보통신서비스 제공자가 준수하여야 할 관련 법령상의 개인정보 보호규정을 지키며, <br />
                      관련 법령에 따른 개인정보 처리방침을 정하여 이를 회사 홈페이지에 공개하여 고객이 언제나 용이하게 열람할 수 있도록 하고 있습니다.<br /><br />
                      회사는 정부의 법률 및 지침 변경 등에 따라 수시로 개인정보 처리방침을 변경 할 수 있고, 이에 따른 개인정보 처리방침은 회사가 제공하는 웹/모바일웹/모바일 앱 서비스에 적용되며, 지속적인 개선을 위하여 필요한 절차를 정하고 있습니다.<br />
                      회사는 개인정보처리방침을 통하여 이용자의 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 회사가 어떠한 조치를 취하는지 알려 드립니다. 
                    </dd>
                    <p></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>

                    <ol className="cont">
                      <li><a href="#cont1"><b>1. 수집하는 개인정보 항목 및 이용목적</b></a></li>
                      <li><a href="#cont2"><b>2. 개인정보의 보유 및 이용기간</b></a></li>
                      <li><a href="#cont3"><b>3. 개인정보의 파기절차 및 방법</b></a></li>
                      <li><a href="#cont4"><b>4. 개인정보의 제3자 제공</b></a></li>
                      <li><a href="#cont5"><b>5. 개인정보처리 업무위탁</b></a></li>
                      <li><a href="#cont6"><b>6. 이용자 및 법정대리인의 권리와 그 행사방법</b></a></li>
                      <li><a href="#cont7"><b>7. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</b></a></li>
                      <li><a href="#cont8"><b>8. 이용자의 권리와 의무</b></a></li>
                      <li><a href="#cont9"><b>9. 개인정보의 기술적ㆍ관리적 보호대책</b></a></li>
                      <li><a href="#cont10"><b>10. 개인정보 보호책임자 및 이용자 고충처리</b></a></li>
                      <li><a href="#cont11"><b>11. 개인정보 처리방침의 고지 의무</b></a></li>
                    </ol>

                    <dl>
                      <dt id="cont1">1. 수집하는 개인정보 항목 및 이용목적</dt>
                        <dd className="first">
                          회사가 운영하는 쇼핑몰 브랜드 &quotROLAROLA&quot은 회원가입, 원활한 상품주문, 대금결제, 물품 배송 등을 위해 아래와 같은 개인 정보를 수집하고 있습니다. ‘개인정보’란 생존하는 개인에 관한 정보로서 성명, 전화번호 등 개인을 식별할 수 있는
                          정보(당해 정보만으로는 특정 개인을 알아볼 수 없는 경우에도 다른 정보와 용이하게 결합하여 알아볼 수 있는 것을 포함)를 말합니다.
                        </dd>
                        <dd>
                          <table cellSpacing={0} cellPadding={0}>
                            <tbody>
                              <tr>
                                <td colSpan={5}>
                                  <p>
                                    <strong>[개인정보 항목 및 이용목적]</strong>
                                    <strong> </strong>
                                  </p>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan={2}>
                                  <p>
                                    <strong>구분 </strong>
                                  </p>
                                </td>
                                <td width={353} colSpan={2}>
                                  <p>
                                    <strong>수집항목 </strong>
                                  </p>
                                </td>
                                <td width={126}>
                                  <p>
                                    <strong>이용목적 </strong>
                                  </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={37} rowSpan="9">
                                  <p>회원 </p>
                                </td>
                                <td width={84} rowSpan={2}>
                                  <p>개인회원 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>이름, 아이디, 비밀번호, 비밀번호 질문과 답변, 휴대전화번호, 이메일주소 </p>
                                </td>
                                <td className="left" width={126} rowSpan={2}>
                                  <p>[필수] 회원가입 및 이용자 식별, 회원관리, 서비스 이용 및 민원상담/신고 등 원활한 의사소통 경로 확보, 불량 회원의 부정이용 방지와비인가 사용 방지<br />
                                  <br />
                                  [선택] 맞춤형 상품추천 등 마케팅활용 및 광고성 정보전달 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={39}><p>선택 </p></td>
                                <td className="left" width={315}>
                                  <p>주소, 생년월일, 일반전화, SMS/이메일 수신여부 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84} rowSpan={2}><p>네이버회원 </p></td>
                                <td width="39"><p>필수 </p></td>
                                <td className="left" width={315}>
                                  <p>프로필 정보(프로필명, 닉네임, 성명)</p>
                                </td>
                                <td className="left" width={126} rowSpan={6}>
                                  <p>간편로그인 연결을 통한 서비스 내 고객 식별,회원관리 및 서비스 제공 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={39}>
                                  <p>선택 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>휴대전화번호 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84} rowSpan={2}>
                                  <p>카카오회원 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>프로필 정보(프로필명, 닉네임, 성명)</p>
                                </td>
                              </tr>

                              <tr>
                                <td width={39}>
                                  <p>선택 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>휴대전화번호 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84} rowSpan={2}>
                                  <p>애플회원 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>프로필 정보(프로필명, 닉네임, 성명)</p>
                                </td>
                              </tr>

                              <tr>
                                <td width={39}>
                                  <p>선택 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>휴대전화번호 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84}>
                                  <p>휴대폰 인증 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>명의자 성명, 나이, 성별 </p>
                                </td>
                                <td className="left" width={126}>
                                  <p>휴대폰 인증을 통한 본인확인 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={37} rowSpan={2}><p>주문 </p></td>
                                <td width={84}>
                                  <p>개인회원 구매 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>주문자 정보(이름, 휴대전화번호, 주소)<br />
                                  수취자 정보(이름, 휴대전화번호, 주소) </p>
                                </td>
                                <td className="left" width={126} rowSpan={2}>
                                  <p>주문상품의 결제/물품 배송 및 상담처리서비스 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84}>
                                  <p>비회원 구매 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>주문자 및 배송지 정보(이름, 주소, 일반전화번호, 휴대전화번호, 이메일 주소,<br />
                                  주문조회 비밀번호) </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={37} rowSpan={12}>
                                  <p>결제 </p>
                                </td>
                                <td width={84} rowSpan={2}>
                                  <p>무통장 입금<br />
                                  (가상계좌)</p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>입금자 이름, 은행명 </p>
                                </td>
                                <td className="left" width={126} rowSpan={2}>
                                  <p>현금영수증 발급 처리 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={39}><p>선택 </p></td>
                                <td className="left" width={315}><p>현금영수증 발급정보 (휴대전화번호, 현금영수증발행번호) </p></td>
                              </tr>

                              <tr>
                                <td width={84}>
                                  <p>카드결제, 에스크로 서비스(실시간 계좌이체), 가상계좌 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>주문자 정보(성명, 주소, 이메일주소, 휴대전화번호, 주문번호, 가장계좌번호)</p>
                                </td>
                                <td className="left" width={126} rowSpan={7}>
                                  <p>상품 주문/결제 서비스 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84} rowSpan={2}>
                                  <p>휴대폰 결제 </p>
                                </td>
                                <td width={39}>
                                  <p>필수</p>
                                </td>
                                <td className="left" width={315}>
                                  <p>주문자 정보(통신사, 아이디, 휴대전화번호, 생년월일, 성별, IP, 주문번호 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={39}>
                                  <p>선택 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>이메일주소 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84} rowSpan={2}>
                                  <p>네이버페이 간편결제 (모바일 해당)</p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>주문번호, 승인번호, 배송지주소 </p>
                                </td>
                              </tr>

                              <tr>
                                <td className="left" width={353} colSpan={2}>
                                  <p>비회원 결제 서비스일 경우 구매자정보는 네이버페이 페이지를 통해 결제 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84}>
                                  <p>페이코 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>아이디, 주문번호 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84}>
                                  <p>토스페이 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>아이디, 주문번호 </p>
                                </td>
                              </tr>

                              <tr>
                                <td width={84}>
                                  <p>환불 </p>
                                </td>
                                <td width={39}>
                                  <p>필수 </p>
                                </td>
                                <td className="left" width={315}>
                                  <p>환불 계좌정보(입금자명, 은행명, 계좌번호)</p>
                                </td>
                                <td className="left" width={126}>
                                  <p>주문상품의 환불처리 </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <p>&nbsp;</p>
                          <p>서비스  이용 또는 사업 처리 과정에서 아래와 같은 정보들이 생성되어 자동 수집될 수 있습니다.</p>
                          <table cellPadding={0} cellSpacing={0}>
                            <tbody>
                              <tr>
                                <td width={"15%"}><p><strong>구분</strong></p></td>
                                <td width={"53%"}><p><strong>수집항목</strong></p></td>
                                <td width={"32%"}><p><strong>이용목적</strong></p></td>
                              </tr>

                              <tr>
                                <td width={"15%"}><p>자동 수집</p></td>
                                <td width={"53%"}><p>서비스 이용기록,접속로그,쿠키,접속IP정보,결제기록</p></td>
                                <td width={"32%"}><p>서비스 이용</p></td>
                              </tr>
                            </tbody>
                          </table>

                          <p>&nbsp;</p>
                          <p><br />
                            회사는 모바일 앱 서비스 제공을 위하여 이용자의 모바일 앱 내 정보 및 기능 중 아래의 사항에 대해 접근합니다. 필수 접근항목은 앱 설치시 또는 최초 실행 시 필수와 선택 접근항목에 안내 및 동의를 받으며, 
                            선택 접근항목은 해당 서비스 최초 이용 시 별도 동의를 받습니다. 선택 접근항목의 경우 OS버전에 따라 동의 받는 방법이 다를 수 있으나, 거부로 인한 기본 서비스 이용에는 제한이 없습니다
                          </p>
                        </dd>

                        <dd>
                          <table cellSpacing={0} cellPadding={0}>
                            <tbody>
                              <tr>
                                <td width={"100%"} colSpan={3}>
                                  <p><strong>접근 항목, 목적</strong><strong> </strong></p>
                                </td>
                              </tr>
                              <tr>
                                <td width={"15%"}><p><strong>구분 </strong></p></td>
                                <td width={"25%"}><p><strong>접근항목 </strong></p></td>
                                <td width={"59%"}><p><strong>접근목적 </strong></p></td>
                              </tr>
                              <tr>
                                <td width={"15%"}><p>필수접근 </p></td>
                                <td width={"25%"}><p>기기ID(기기정보)</p></td>
                                <td width={"59%"}><p>앱서비스 최적화 및 오류 확인 등 기능 개선 </p></td>
                              </tr>
                              <tr>
                                <td width={"15%"} rowSpan={2}><p>선택접근 </p></td>
                                <td width={"25%"}><p>기기ID(기기정보)</p></td>
                                <td width={"59%"} rowSpan={2}><p>1:1 문의하기, 상품리뷰 작성 시 사진    첨부 </p></td>
                              </tr>
                              <tr>
                                <td width={"25%"}><p>사진/카메라 </p></td>
                              </tr>
                            </tbody>
                          </table>
                          <br />※ 접근권한에 대한 자세한 사항은 각 앱에서 제공하는 설정화면 등을 통해 확인하실 수 있습니다. <br />
                          ※ 모바일 기기 및 앱의 설정기능을 통해 접근권한을 설정하실 수 있으며, 일부 OS버전에 따라 권한설정이 불가능 할 수도 있습니다.<br /><br />
                          [개인정보 수집방법]<br />
                          1) 홈페이지를 통한 회원가입(웹/앱 어플리케이션 포함)<br />
                          2) 생성정보 수집 툴을 위한 자동 수집<br />
                          3) 기타 수집방법과 유사한 방법<br /><br /><br /><br /><br />
                        </dd>
                      </dl>

                      <dl>
                        <dt id="cont2">2. 개인정보의 보유 및 이용기간</dt>
                        <dd className="first">
                          회사가 운영하는 쇼핑몰 브랜드 &quotROLAROLA&quot은 고객님의 개인정보 보유 및 이용기간은 서비스 이용계약 체결(회원가입) 
                          시점부터 서비스이용 계약해지(탈퇴신청, 회원제명) 시점까지이며, 
                          개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 아래와 같이 관계 법령의 규정에 
                          의하여 거래 관련 권리의무 관계확인 등의 이유로 개인정보를 보존할 필요가 있는 경우, 
                          관계법령에서 정한 일정기간 동안 회원정보를 보관합니다.
                        </dd>
                        <dd>
                          1) 온라인/앱 서비스 제공을 위해 수집한 회원가입 정보 : 서비스이용 계약해지(탈퇴신청 및 회원제명)<br />
                          2) 관련 법령에 의한 개인정보 보유
                          <p></p>
                          <table cellSpacing={0} cellPadding={0}>
                            <tbody>
                              <tr>
                                <td><p><strong>관련 법률 </strong></p></td>
                                <td><p><strong>보유항목 </strong></p></td>
                                <td><p><strong>보유기간 </strong></p></td>
                              </tr>

                              <tr>
                                <td rowSpan={4}><p>전자상거래 등에서의 소비자보호에 관한 법률 </p></td>
                                <td><p>표시 &quot광고에 관한 기록 </p></td>
                                <td><p>6개월 </p></td>
                              </tr>

                              <tr>
                                <td><p>계약 또는 청약철회 등에 관한 기록 </p></td>
                                <td><p>5년 </p></td>
                              </tr>

                              <tr>
                                <td><p>대금결제 및 재화등의 공급에 관한 기록 </p></td>
                                <td><p>5년 </p></td>
                              </tr>

                              <tr>
                                <td><p>소비자의 불만 또는 분쟁 처리에 관한 기록 </p></td>
                                <td><p>3년 </p></td>
                              </tr>

                              <tr>
                                <td><p>통신비밀보호법 </p></td>
                                <td><p>컴퓨터통신 및 인터넷 로그기록자료, 접속지 추적자료 </p></td>
                                <td><p>3개월 </p></td>
                              </tr>
                            </tbody>
                          </table>
                          <p></p>
          
                          <br />3) 비회원  고객 개인 정보 수집 <br />
                          - ROLAROLA은 비회원 고객의 상품 구매 및 이와  관련된 서비스 (예: 환불, 교환 등 포함), 배송 및 대금 결제, 주문 내역 조회 등을 위하여 필요한 최소한의 개인 정보만을 수집, 이용하고 있습니다.
                          <br />입력하신 정보는 수집 시 안내한 목적  외에는 다른 어떠한 용도로도 사용되지 않습니다.<p></p>
                          <p>- 보유 항목 : 구매자 정보 (이름, 연락처, 이메일) , 수취인 정보 (이름, 연락처, 주소), 서비스 이용 과정이나 사업 처리 과정에서 생성되는 정보<br />(서비스이용기록, 접속로그, 쿠키, 접속IP정보, 결제기록)</p>
                          <p>- 보유 기간 : 주문일로 부터 90일까지<br />(필요 시 전자상거래 등에서의 소비자 보호에 관한 법률 등 관계 법률에 의해 보존할 필요가 있는 경우 일정기간 보존)</p>
                          <br />
                        </dd>
                      <dt>&nbsp;</dt>
                      <dd><br /><br /></dd>
                    </dl>

                    <dl>
                      <dt id="cont3">3. 개인정보의 파기절차 및 방법</dt>
                      <dd className="first">
                        회사가 운영하는 쇼핑몰 브랜드 &quotROLAROLA&quot은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 
                        지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.<br /><br /><br />
                        <b>[파기절차]</b><br />
                        고객님의 개인정보는 원칙적으로 개인정보 수집 및 이용목적이 달성되면 지체없이 파기합니다.<br />
                        고객님이 서비스 이용 등을 위해 입력하신 회원정보는 목적이 달성된 후 별도의 DB로 옮겨져 회사 내부 방침 및 
                        기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 보관된 후 파기됩니다.<br />
                        별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다. <p></p><br />
                    
                        <b>[파기방법]</b><br />
                        - 회원 탈퇴 클릭 즉시 시스템 상 자동적으로 회원 DB에서 복구되지 않는 방법으로 파기됩니다. <br />
                        - 전자적 파일 형태로 저장된 개인정보는 복구 및 재생할 수 없는 기술적 방법을 사용하여 완전하게 삭제합니다.<br />
                        - 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다. <br /><br /><br /><br /><br /><br />
                      </dd>
                    </dl>

                    <dl>
                      <dt id="cont4">4. 개인정보의 제3자 제공</dt>
                      <dd>회사가 운영하는 쇼핑몰 브랜드 &quotROLAROLA&quot은 고객님의 개인정보를 
                        「1. 개인정보의 수집범위 및 이용목적」에서 고지한 범위 내에서 사용하며, 
                        고객님의 사전 동의 없이 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 
                        제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.   <br />
                        
                        1) 고객님이 사전에 공개하거나 제3자 제공에 동의한 경우
                        2) 법령에 의하거나, 수사, 조사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관 및 감독당국의 요구가 있는 경우
                        3) 재화 등의 거래에 따른 대금정산을 위하여 필요한 경우
                        4) 법률의 규정 또는 관계 법률에 의하여 필요한 불가피한 사유가 있는 경우
                        5) 영업의 이동 및 합병 등

                        ※ 회사는 영업의 양도 등에 관한 사유가 발생하여 고객님의 개인정보 이전이 필요한 경우, 
                        관계법률에서 규정한 절차와 방법에 따라 개인정보 이전에 관한 사실 등을 사전에 고지하며, 
                        고객님에게는 개인정보 이전에 관한 동의 철회권을 부여 합니다.
                        <br /><br /><br /><br /><br />
                      </dd>
                    </dl>

                    <dl>
                      <dt id="cont5">5. 개인정보처리 업무위탁</dt>
                      <dd className="first">
                        회사가 운영하는 쇼핑몰 브랜드 &quotROLAROLA&quot은 서비스 향상을 위해 관계법령에 따라 회원의 동의를 얻거나 
                        관련 사항을 공개 또는 고지 후 회원의 개인정보를 외부에 위탁하여 처리하고 있습니다. 
                        ROLAROLA의 개인정보처리 수탁자와 그 업무의 내용은 다음과 같습니다.  <br />
                    </dd>
                    <dd>
                      <table cellSpacing={0} cellPadding={0}>
                        <tbody>
                          <tr>
                            <td width={300}>
                              <p><strong>수탁자</strong></p>
                            </td>
                            <td width={700}>
                              <p><strong>위탁업무내용</strong></p>
                            </td>
                          </tr>
                          <tr>
                            <td height={55} className="left"><p>㈜위사</p></td>
                            <td rowSpan={2} className="left">
                              <p>쇼핑몰 호스팅 서비스의 시스템 제공 및 부가·제휴서비스 제공<br />
                                고객정보DB시스템운영 (전산 아웃소싱)<br />
                                주문정보 및 재고관리 서비스<br />
                                080 수신거부 서비스
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td height={44} className="left">㈜두손씨앤아이</td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜케이지이니시스 </p></td>
                            <td className="left"><p>전자지급결제대행서비스 및 간편 결제 서비스</p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜카카오페이 </p></td>
                            <td rowSpan={5} className="left"><p>간편결제 서비스 </p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>엔에이치엔페이코㈜</p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>네이버㈜</p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜케이에스넷</p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜비바리퍼블리카</p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>NHN한국사이버결제㈜ </p></td>
                            <td className="left"><p>휴대폰 본인인증 서비스 </p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜드림시큐리티</p></td>
                            <td className="left">휴대폰 본인인증 서비스</td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜이아이씨엔</p></td>
                            <td className="left"><p>고객전화 녹취서버 유지보수</p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜세종텔레콤</p></td>
                            <td className="left"><p>안심번호 서비스, 위탁항목 : 수취인 전화번호</p></td>
                          </tr>

                          <tr>
                            <td className="left">(주)크리마 </td>
                            <td className="left">
                              <p>장바구니 리마인딩, 리타겟팅 서비스 <br />
                                고객  마일리지 및 후기, 리뷰 솔루션 유지보수 관리
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜루나소프트</p></td>
                            <td className="left">
                              <p>정보성메시지 발송 및 톡 기반 상담 서비스 제공<br />
                                카카오톡 알림톡 및 네이버 알림 서비스<br />
                                개인정보제공처 - 주식회사 카카오, 네이버㈜<br />
                                위탁 업무 내용   네이버, 카카오 알림 서비스 제공<br />
                                보유기간   회원 탈퇴 시 혹은 법정 보유기간
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td className="left"><p>㈜인비토</p></td>
                            <td className="left"><p>SMS/LMS 메시지 전송 서비스</p></td>
                          </tr>

                          <tr>
                            <td className="left"><p>인라이플 ㈜ - 모비튠</p></td>
                            <td className="left">
                              <p>
                                - 위탁 업무 내용 : 이용자의 취향 및 관심분야의 파악, 서비스 이용 분석 등을 통한 
                                타겟 마케팅 및 개인 맞춤 서비스 제공<br />
                                - 위탁 항목 : 이름, 나이, 성별, 이메일, 전화번호, 주문자명, 주문자 연락처<br />
                                - 보유기간 : 서비스 가입 또는 최초 주문일로부터 동의한 보유기간까지
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td className="left"><p>인라이플 ㈜ - 아이센드</p></td>
                            <td className="left">
                              <p>
                                - 위탁 업무 내용 : SMS, LMS, MMS, 알림톡, 친구톡 발송<br />
                                - 위탁 항목 : 이름, 전화번호<br />
                                - 보유기간 : 서비스 가입 또는 최초 주문일로부터 동의한 보유기간까지
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td className="left"><p>CJ대한통운 택배(대행 : 박스오피스)</p></td>
                            <td className="left">
                              <p>
                                주문상품 배송 서비스, 상품 배송정보 DB(이름, 전화번호, 휴대폰번호, 주소)
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    <br /><br />
                    </dd>
                  <dt>&nbsp;</dt>
                  <dd><br /></dd>
                </dl>

                <dl>
                  <dt id="cont6">6. 이용자 및 법정대리인의 권리와 그 행사방법</dt>
                  <dd className="first">회사는 이용자의 권리를 보장하기 위해 개인정보의 열람ㆍ정정 또는 동의철회 방법을 개인정보의 수집방법보다 
                    쉽게 할 수 있도록 절차를 마련하고 있습니다. 고객님(또는 법정대리인)은 언제든지 고객님의 개인정보를 열람하거나 
                    수정 할 수 있으며, 회원탈퇴 절차를 통하여 개인정보 이용에 대한 동의를 철회할 수 있습니다.<br />
                    고객님은 언제든지 등록되어 있는 회원정보를 열람하거나 정정하실 수 있습니다. 회원정보의 열람 및 정정은 아래를 참고하여 
                    직접 열람 및 정정을 처리할 수 있습니다. 회사는 관련된 상담 및 문의처리를 위해 개인정보 보호책임자 등 담당부서에 연락하시면 
                    지체없이 조치하겠습니다.
                  </dd>
                  <dd>
                    [ 개인정보의 열람 및 정정 범위 ]
                    <ol>
                      <li>
                        - 회사가 보유 및 이용하고 있는 이용자의 개인정보
                      </li>
                      <li>
                        - 개인정보 수집, 이용 등의 동의 현황
                      </li>
                    </ol>
                  </dd>
                  <dd>
                  [ 회원탈퇴 ]
                    <ol>
                      <li>
                        - 조회 및 수정 : 로그인 후 마이페이지 &gt; profile(회원정보 관리)  <br />
                        - 삭제 및 회원탈퇴 : 로그인 후 마이페이지 &gt; profile(회원정보 관리) &gt; 회원탈퇴<br />
                        - 동의철회(이메일/SMS수신) : 로그인 후 마이페이지 &gt; profile(회원정보 관리) &gt; 회원정보 수정<br />
                        - 간편회원의 경우 자사몰 아이디와는 별개임에 따라 간편회원으로 로그인 한 후 회원탈퇴 진행해주셔야 합니다.<br />
                      </li>
                    </ol>
                  </dd>

                  <dd>
                    이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 개인정보를 이용하지 않습니다.
                    <br /><br />
                    단, 아래의 경우에는 열람을 제한하거나 거절할 수 있으며, 그 사유는 아래와 같습니다.  <br />
                    1) 법률에 따라 열람 등이 금지되거나 제한되는 경우 <br />
                    2) 다른 사람의 생명 및 신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우 <br />
                    3) 오로지 회사를 해할 목적으로 요구하거나, 반복적 또는 악의적으로 요구하는 등 회사의 업무 수행에 중대한 지장을 초래하는 경우 <br />
                    4) 기타 열람을 제한하거나 거절하는 것이 객관적으로 타당한 경우<br /><br /><br /><br />
                  </dd>
                </dl>

                <dl>
                  <dt id="cont7">7. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</dt>
                  <dd>
                    회사는 이용자(접속자)의 정보를 수시로 저장하고 찾아내는 ‘쿠키(cookie)’ 등을 사용합니다.<br />
                    “쿠키(cookie)”란 회사의 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 
                    고객님의 컴퓨터 하드디스크에 저장됩니다. 회사는 다음과 같은 목적을 위해 쿠키를 사용합니다.<br /><br />
                    <b>[쿠키 등 사용 목적]</b><br />
                    - 회사가 수집한 고객님의 쿠키정보는 회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 
                    파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공 등의 
                    목적을 위해 사용됩니다. <br />

                    <b>[쿠키 설정 거부 방법]</b><br />
                    - 고객님은 쿠키 설치에 대한 선택권을 가지고 있습니다. 고객님은 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 
                    허용/거부하거나, 쿠키가 저장될 때마다 확인을 거치도록 할 수 있습니다. <br /><br />
                    1) 설정방법<br />
                    - Internet Explorer : 웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 &gt; 고급 &gt; 쿠키 허용여부 선택<br />
                    - Chrome : 웹 브라우저 상단의 도구 &gt; 설정 &gt; 고급 &gt; 개인정보 및 보안 &gt; 콘텐츠 설정 &gt; 쿠키<br />
                    단, 쿠키의 저장을 거부할 경우 일부 서비스의 이용에 제한이 생길 수 있습니다. <br /><br /><br /><br />
                  </dd>
                </dl>

                <dl>
                  <dt id="cont8">8. 이용자의 권리와 의무</dt>
                  <dd>
                    ① 고객님의 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방해 주시기 바랍니다. 
                    부정확한 정보 입력으로 인해 발생하는 사고의 책임은 고객님께 있으며 타인의 정보를 무단으로 사용하는 등 
                    허위정보를 입력하면 회원자격이 상실과 함께 개인정보에 관한 법률에 의거하여 처벌될 수 있습니다.<br />

                    ② 고객님은 자신의 개인정보를 보호할 의무가 있으며, 본인의 부주의 등으로 개인정보가 유출되어 발생한 문제에 대해서는 
                    일체의 책임을 지지 않습니다.<br />

                    ③ 고객님은 개인정보를 보호받을 권리와 함께 자신을 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 지니고 있습니다. 
                    아이디, 비밀번호(Password)를 포함한 고객님의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 
                    훼손하지 않도록 유의해 주십시오.<br />

                    ④ 고객님은 “정보통신망 이용촉진 및 정보보호 등에 관한 법률”, “개인정보 보호법” 등 기타 개인정보에 관한 법률을 준수하여야 
                    하며, 이와 같은 책임을 다하지 못하고 타인의 정보를 훼손할 때에는 관련 법률에 의하여 처벌받을 수 있습니다.<br /><br /><br /><br />
                  </dd>
                </dl>

                <dl>
                  <dt id="cont9">9. 개인정보의 기술적ㆍ관리적 보호대책</dt>
                  <dd className="first">
                    회사는 고객님의 개인정보를 보호함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 
                    아래와 같은 기술적, 관리적 보호대책을 강구하고 있습니다.
                  </dd>
                  <dd>
                    [기술적 보호대책]
                    <ol>
                      <li>
                        - 고객님의 개인정보는 비밀번호에 의해 보호되며, 파일 및 전송 데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 
                        중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.<br />
                        - 회사는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 
                        백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우<br />
                        백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다.<br />
                        - 회사는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치(SSL 등)를 채택하고 있습니다.<br />
                        </li><li>
                      </li>
                    </ol>
                  </dd>

                  <dd>
                    [관리적 보호대책]
                    <ol>
                      <li>
                        - 회사는 회원님의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다. 
                        개인정보 처리자는 담당자로 한정하여 최소화하고 있으며, 퇴직 및 직무변경 등 인사이동이 있는 경우 
                        지체없이 권한을 변경, 말소하여 개인정보 접근권한을 통제하고 있습니다.<br />
                        - 개인정보를 처리하는 직원을 대상으로 새로운 보안 기술 습득 및 개인정보 보호 의무 등에 관해 정기적인 사내 교육을 
                        실시하고 있습니다.<br />
                        - 입사 시 개인정보 관련 취급자의 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보처리방침에 대한 
                        이행사항 및 직원의 준수여부를 감사하기 위한 내부절차를 마련하고 있습니다.<br />
                        - 개인정보 관련 취급자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후 
                        개인정보 사고에 대한 책임을 명확화하고 있습니다.<br />
                        - 개인정보와 일반 데이터를 혼합하여 보관하지 않고 별도로 분리하여 보관하고 있습니다.<br />
                        - 전산실 및 자료 보관실 등을 특별 보호구역으로 설정하여 출입을 통제하고 있습니다.<br />
                        - 회사는 이용자 본인의 부주의 또는 인터넷상의 문제로 인해 발생한 개인정보 유출문제에 대해 고의, 과실이 없을 경우 
                        책임을 지지 아니합니다. 회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의 ID 와 비밀번호를 적절하게 
                        관리하고 여기에 대한 책임을 져야 합니다.<br />
                      </li>
                    </ol>
                  </dd>

                  <dd>
                    [기타 보호대책]
                    <ol>
                      <li>
                        - 회사는 장기간 서비스 미이용자의 개인정보보호를 위하여 휴면회원(최근 12개월 또는 회원이 직접 선택한 년도 동안 
                        서비스를 이용하지 아니한 회원)의 개인정보를 다른 이용자의 정보와 분리하여 저장, 관리<br />
                        - 회사는 휴면회원의 개인정보 분리 저장 및 관리 1개월 전에 해당 이용자에게 회원자격 상실에 대한 안내문을 통지하며, 
                        안내문에서 정한 기한 내에 답변이 없을 경우 회원자격을 상실시킬 수 있습니다.<br /><br /><br /><br />
                      </li>
                    </ol>
                  </dd>
                </dl>

                <dl>
                  <dt id="cont10">10. 개인정보 보호책임자 및 이용자 고충처리</dt>
                  <dd className="first">
                    회사가 운영하는 쇼핑몰 브랜드 &quotROLAROLA&quot은 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 
                    아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.
                  </dd>
                  <dd>
                    고객서비스담당 부서 : <strong>CS고객센터</strong>
                    <ul>
                      <li>전화번호 : <strong>1544-3224</strong></li>
                      <li>이메일 : <strong>purplerose@naver.com</strong></li>
                    </ul>
                  </dd>
                  <dd>
                    개인정보 보호책임자 성명 : <strong>주영아</strong>
                    <ul>
                      <li>전화번호 : <strong>1544-3224</strong></li>
                      <li>이메일 : <strong>purplerose@naver.com</strong></li>
                    </ul>
                  </dd>
                  <dd>
                    개인정보 담당자 성명 : <strong>조원우</strong>
                    <ul>
                      <li>전화번호 : <strong>1544-3224</strong></li>
                      <li>이메일 : <strong>wununu@naver.com</strong></li>
                    </ul>
                  </dd>
                  <dd>
                    (2) 개인정보관리담당자
                    <ul>
                      <li>- 이 름 : <strong>장명승</strong></li>
                      <li>- 소속 및 직위 : <strong>운영팀장</strong></li>
                      <li>- 전 화 : <strong>1544-7729</strong></li>
                      <li>- 이메일 : <strong>victory625@naver.com</strong></li>
                    </ul>
                  </dd>

                  <dd>
                    고객님께서는 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 고객서비스 담당부서, 개인정보 보호책임자 
                    혹은 담당자에게 신고하실 수 있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.<br /><br />
                    기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br /><br />
                    ① 개인정보 분쟁조정위원회 (www.kopico.go.kr/ 국번없이 1833-6666)<br />
                    ② 개인정보 침해신고센터 (www.privacy.kisa.or.kr/ 국번없이 118)<br />
                    ③ 경찰청 사이버안전국 (cyberbureau.police.go.kr/ 국번없이 182)<br />
                    ④ 대검찰청 사이버수사과 (www.spo.go.kr/ 국번없이 1480)<br /><br /><br /><br />
                  </dd>
                  <dl>
                    <dt id="cont11">11. 개인정보 처리방침의 고지 의무</dt>
                    <dd className="first">
                      법령, 정책 또는 보안기술 등의 변경에 따라 현 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 시에는 개정되는 개인정보처리방침을 시행하기 최소 30일 전에 홈페이지 등을 통해 공지하겠습니다.
                    </dd>
                    <dd className="first">
                      본 방침은 <strong>2024년 08월 21일</strong>부터 시행됩니다.
                    </dd>
                    <br />
                    <br />
                    <br />
                  </dl>
                </dl>
              </div>
            </div>
          </div>
        <hr />
      </div>
    </div>
  </div>
</div>
      <div className="csPrivacy_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Customer_Privacy;