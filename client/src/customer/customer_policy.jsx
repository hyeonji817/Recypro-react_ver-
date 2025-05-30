import "./customer_policy.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";
import home from "../assets/shop/home.png";

const customer_notice = () => {
  return (
    <div className="customer_policy_wrapper">
      <div className="cp_Header">
        <Header_loginOK />
      </div>
      <div className="cp_title">
        <div className="container">
          <h1 className="display-3">운영정책</h1>
        </div>
      </div>
      <div className="side_path">
        <div className="home_icon">
          <img src={home} />
        </div>
        <span className="sub_path">
          home &gt; 고객센터 &gt; 공지사항
        </span>
      </div>
      {/** 제1조 (목적) */}
      <div className="first_policy">
        <h2>제1조 (목적)</h2>
		    <p>
			이 약관은 리싸이프로 회사(전자상거래 사업자)가 운영하는 리싸이프로 사이버 몰(이하 &quot;몰&quot;이라 한다)에서 제공하는 인터넷 관련 서비스 <br />
			(이하 &quot;서비스&quot;라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리,의무 및 책임사항을 규정함을 목적으로 합니다. <br />
			※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다」
		    </p>
      </div>

      {/** 제2조 (정의) */}
      <div className="second_policy">
        <h2>제2조 (정의)</h2>
		    <p>
			  ① &quot;몰&quot; 이란 리싸이프로 회사가 재화 또는 용역(이하 &quot;재화 등&quot;이라 함)을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화 등을 <br />
			  거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다. <br /><br />
			
			  ② &quot;이용자&quot;란 &quot;몰&quot;에 접속하여 이 약관에 따라 &quot;몰&quot;이 제공하는 서비스를 받는 회원 및 비회원을 말합니다. <br /><br />
			
			  ③ &quot;회원&quot;이라 함은 &quot;몰&quot;에 개인정보를 제공하여 회원등록을 한 자로서, &quot;몰&quot;의 정보를 지속적으로 제공받으며, &quot;몰&quot;이 제공하는 서비스를 계속적으 <br />
			  로 이용할 수 있는 자를 말합니다. <br /><br />
			
			  ④ &quot;비회원&quot;이라 함은 회원에 가입하지 않고 &quot;몰&quot;이 제공하는 서비스를 이용하는 자를 말합니다. 
		    </p>
      </div>

      {/** 제3조 (약관동의 등등) */}
      <div className="third_policy">
        <h2>제3조 (약관동의 명시와 설명 및 개정)</h2>
		    <p>
			    ① &quot;몰&quot;은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호,모사전송번호,전 
			    자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 &quot;몰&quot;의 초기 서비스화면(전면)에 게시합니 
			    다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다. <br /><br />
			
			    ② &quot;몰&quot;은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회,배송책임,환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 
			    있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다. <br /><br />
			
			    ③ &quot;몰&quot;은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 방문 
			    판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. <br /><br />
			
			    ④ &quot;몰&quot;이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일이전부터 적용일자 전일까 
			    지 공지합니다.다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 `&quot`몰`&quot`은 개 
			    정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. <br /><br />
			
			    ⑤ &quot;몰&quot;이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전 
			    의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기 
			    간내에 &quot;몰&quot;에 송신하여 &quot;몰&quot;의 동의를 받은 경우에는 개정약관 조항이 적용됩니다. <br /><br />
			
			    ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의소비자보호에관한법률, 약관의규제등에관한법률, 공정거래위 
			    원회가 정하는 전자상거래등에서의소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
		    </p>
      </div>

      {/** 제4조 (서비스 제공 등) */}
      <div className="fourth_policy">
        <h2>제4조 (서비스의 제공 및 변경)</h2>
		    <p>
			    ① &quot;몰&quot;은 다음과 같은 업무를 수행합니다. <br />
			      1. 재화 등에 대한 정보 제공 및 구매계약의 체결 <br />
			      2. 구매계약이 체결된 재화 등의 배송 <br />
			      3. 기타 &quot;몰&quot;이 정하는 업무 <br /><br />
			 
			    ② &quot;몰&quot;은 재화 등의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 등의 내용을 변경할 수 있습니다. 
			    이 경우에는 변경된 재화 등의 내용 및 제공일자를 명시하여 현재의 재화 등의 내용을 게시한 곳에 즉시 공지합니다. <br /><br />
			
			    ③ &quot;몰&quot;이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화 등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 
			    그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다. <br /><br /> 
			
			    ④ 전항의 경우 &quot;몰&quot;은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, &quot;몰&quot;이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
		    </p>
      </div>

      {/** 제5조 (서비스 중단) */}
      <div className="fifth_policy">
        <h2>제5조 (서비스의 중단)</h2>
		    <p>
			    ① &quot;몰&quot;은 컴퓨터 등 정보통신설비의 보수점검,교체 및 고장, 
			    통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. <br /><br />
			
			    ② &quot;몰&quot;은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 
			    단, &quot;몰&quot;이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다. <br /><br />
			
			    ③ 사업종목의 전환, 사업의 포기, 업체간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 &quot;몰&quot;은 제8조에 정한 방법으로 
			    이용자에게 통지하고 당초 &quot;몰&quot;에서 제시한 조건에 따라 소비자에게 보상합니다. 
			    다만, &quot;몰&quot;이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 &quot;몰&quot;에서 통용되는 
			    통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.
		    </p>
      </div>

      {/** 제6조 (회원가입) */}
      <div className="sixth_policy">
        <h2>제6조 (회원가입)</h2>
		    <p>
			    ① 이용자는 &quot;몰&quot;이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다. <br /><br />
			
			    ② &quot;몰&quot;은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로 등록합니다. <br />
			      1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 
			      다만 제7조제3항에 의한 회원자격 상실후 3년이 경과한 자로서 &quot;몰&quot;의 회원재가입 승낙을 얻은 경우에는 예외로 한다. <br />
			      2. 등록 내용에 허위, 기재누락, 오기가 있는 경우 <br />
			      3. 기타 회원으로 등록하는 것이 &quot;몰&quot;의 기술상 현저히 지장이 있다고 판단되는 경우 <br /><br />
			 
			    ③ 회원가입계약의 성립시기는 &quot;몰&quot;의 승낙이 회원에게 도달한 시점으로 합니다. <br /><br />
			
			    ④ 회원은 제15조제1항에 의한 등록사항에 변경이 있는 경우, 즉시 전자우편 기타 방법으로 &quot;몰&quot;에 대하여 그 변경사항을 알려야 합니다.  
		    </p>
      </div>

      {/** 제7조 (회원탈퇴 등) */}
      <div className="seventh_policy">
        <h2>제7조 (회원탈퇴 및 자격 상실 등)</h2>
		    <p>
			    ① 회원은 &quot;몰&quot;에 언제든지 탈퇴를 요청할 수 있으며 &quot;몰&quot;은 즉시 회원탈퇴를 처리합니다. 
			    단, 회원탈퇴 시 적립금 등 회원으로서의 모든 혜택은 소멸됩니다. <br /><br />
			
			    ② 회원이 다음 각 호의 사유에 해당하는 경우, &quot;몰&quot;은 회원자격을 제한 및 정지(1년간 회원자격 중지)시킬 수 있습니다. <br />
			      1. 가입 신청 시에 허위 내용 등록하거나 타인의 정보를 도용한 경우 <br />
			      2. &quot;몰&quot;을 이용하여 구입한 재화 등의 대금, 기타 &quot;몰&quot; 이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우 <br />
			      3. 다른 사람의 &quot;몰&quot;이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우 <br />
			      4. 법률 위반과 &quot;몰&quot;의 이용약관등 금지사항을 어긴 경우 <br />
			      5. &quot;몰&quot;의 건전한 경영과 서비스 운영을 방해하는 경우 <br />
			      6. &quot;몰&quot;에 대한 근거 없는 허위의 사실을 유포하여 &quot;몰&quot;의 명예를 실추시키는 경우 <br />
			      7. 구입한 상품, 서비스에 하자가 없음에도 일부 사용 후 부당한 반품을 요청하거나 상습적인 취소, 반품으로 &quot;몰&quot;의 업무를 방해하는 경우 <br />
			      8. 상품평(Q&A, 게시글 포함)의 불량글 신고로 인해 임의삭제 및 게시중단 조치를 3회 이상 반복하여 받은 경우 <br />
			      9. &quot;몰&quot;의 직원에게 폭언, 협박, 성희롱으로 업무 운영을 방해하는 경우 <br />
			      10. 소비자원이 고시한 소비자분쟁해결기준을 초과하는 과도한 보상을 상습적으로 요청하는 경우 <br />
			      11. 재판매 목적으로 재화 등을 중복 구매 하는 등 거래질서를 방해하는 경우 <br />
			      12. 반품 상품의 반품비를 지급하지 않으려는 목적으로 고의적 제품손상후 반품하시는 악성 구매고객 <br />
			      13. 회원이 위법, 불법 혹은 부정한 목적으로 본 서비스를 사용하였다고, &quot;몰&quot;이 객관적 자료에 의거 합리적으로 판단했을 경우 <br /><br />
			 
			    ③ &quot;몰&quot;이 회원 자격을 제한 및 정지(1년간 회원자격 중지)시킨 후, 
			    동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 &quot;몰&quot;의 회원자격을 상실시킬 수 있습니다. <br /><br />
			
			    ④ &quot;몰&quot;이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 
			    이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.
		    </p>
      </div>

      {/** 제8조 (회원 통지) */}
      <div className="eighth_policy">
        <h2>제8조 (회원에 대한 통지)</h2>
		    <p>
			    ① &quot;몰&quot;이 회원에 대한 통지를 하는 경우, 회원이 &quot;몰&quot;과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다. <br /><br />
			
			    ② &quot;몰&quot;은 불특정다수 회원에 대한 통지의 경우 1주일이상 &quot;몰&quot; 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 
			    다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다. 
		    </p>
      </div>

      {/** 제9조 (구매신청) */}
      <div className="nineth_policy">
        <h2>제9조 (구매신청)</h2>
		    <p>
        &quot;몰&quot;이용자는 &quot;몰&quot;상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, &quot;몰&quot;은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. 
			    단, 회원인 경우 제2호 내지 제4호의 적용을 제외할 수 있습니다. <br /><br />
			
			    ① 재화 등의 검색 및 선택 <br /><br />
			
			    ② 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력 <br /><br />
			
			    ③ 약관내용, 청약철회권이 제한되는 서비스, 배송료,설치비 등의 비용부담과 관련한 내용에 대한 확인 <br /><br />
			
			    ④ 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭) <br /><br />
			
			    ⑤ 재화 등의 구매신청 및 이에 관한 확인 또는 &quot;몰&quot;의 확인에 대한 동의 <br /><br />
			
			    ⑥ 결제방법의 선택
		    </p>
      </div>

      {/** 제10조 (계약 성립) */}
      <div className="tenth_policy">
          <h2>제10조 (계약의 성립)</h2>
		    <p>
			    ① &quot;몰&quot;은 제9조와 같은 구매신청에 대하여 다음 각호에 해당하면 승낙하지 않을 수 있습니다. 
			    다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다. <br />
			      1. 신청 내용에 허위, 기재누락, 오기가 있는 경우 <br />
			      2. 미성년자가 담배, 주류등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우 <br />
			      3. 기타 구매신청에 승낙하는 것이 &quot;몰&quot; 기술상 현저히 지장이 있다고 판단하는 경우 <br /><br />
			 
			    ② &quot;몰&quot;의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다. <br /><br />
			
			    ③ &quot;몰&quot;의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소등에 관한 정보등을 포함하여야 합니다. <br /><br />
		    </p>
      </div>

      <div className="policy_button">
        <Button 
          type={"customer_policy"}
          text={"고객센터 홈"}
        />
      </div>
    </div>
  );
};

export default customer_notice;