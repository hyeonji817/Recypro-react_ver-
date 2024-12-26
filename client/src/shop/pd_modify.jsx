import "./pd_modify.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const pd_modify = () => {
  return (
    <div className="pd_modify_wrapper">
      <div className="pdModify_Header">
        <Header_loginOK />
      </div>
      <div className="row">
        <form id="pd_form" name="pd_form">
          <table className="table table-striped">
            <thead>
              <tr>
                <th colSpan="2">상품리뷰 글 수정 양식</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" className="form-control" 
                  placeholder="글 제목" name="pd_reviewTitle"
                  maxLength="50" value={"굿"}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <textarea className="form-control" placeholder="글 내용" 
                  name="pd_reviewContent" maxLength="3000"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="pdModify_button">
            <Button 
              text={"수정하기"}
              type={"pdModify"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default pd_modify;