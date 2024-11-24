import "./modify.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const modify = () => {
  return (
    <div className="modify_wrapper">
      <div className="modify_Header">
        <Header_loginOK />
      </div>
      <div className="container">
        <div className="row">
          <form method="post">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th colSpan="2">게시판 글 수정</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" className="form-control"
								    placeholder="글 제목" name="reviewTitle" 
                    maxLength="50" value="단골될게요" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <textarea className="form-control" placeholder="글 내용"
									  name="reviewContent" maxLength="3000">
                      제가 마음에 드는 상품들 밖에 없어서 몇 년이고 단골되고 싶어요!
                    </textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="rvModify_button">
              <Button 
                type={"rvModify"}
                text={"수정하기"}
              />
              {/** 차후에 input 태그로 변경할 예정(기능 구현 시) */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default modify;