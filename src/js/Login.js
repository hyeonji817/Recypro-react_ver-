window.Kakao.init('18eb1e4319b12694d70014e147f4dbb3'); 

function kakaoLogin() {
    window.Kakao.Auth.login({
        scope: 'profile_nickname, profile_image, account_email', //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
        success: function(response) {
            console.log(response) // 로그인 성공하면 받아오는 데이터
            window.Kakao.API.request({ // 사용자 정보 가져오기 
                url: '/v2/user/me',
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    console.log(kakao_account)
                }
            });
            window.location.href='../01_main/loginOK.jsp';
            // window.location.href='/ex/kakao_login.html' //리다이렉트 되는 코드
        },
        fail: function(error) {
            console.log(error);
        }
    });
}

// 카카오톡 로그아웃
window.Kakao.init('18eb1e4319b12694d70014e147f4dbb3');
function kakaoLogout() {
	if (!Kakao.Auth.getAccessToken()) {
	    console.log('Not logged in.');
	    return;
    }
    Kakao.Auth.logout(function(response) {
		alert(response +' logout');
	    window.location.href='/'
    });
};

// 카카오톡 회원 탈퇴 (연결 끊기)
function secession() {
	Kakao.API.request({
    	url: '/v1/user/unlink',
    	success: function(response) {
    		console.log(response);
    		//callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
    		window.location.href='/'
    	},
    	fail: function(error) {
    		console.log('탈퇴 미완료')
    		console.log(error);
    	},
	});
};

Kakao.Auth.authorize({
  redirectUri: '../02_account/login.jsp',
  prompts: 'none',		// 간편 로그인 요청 시 prompts 파라미터 값을 none으로 지정
  scope: 'profile_nickname, profile_image, account_email',
  serviceTerms: 'account_email'		// 등록된 서비스 약관 중, 특정 서비스 약관을 지정해 동의받고자 할 때 사용, 
});