import "./write.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const write = () => {
  return (
    <div className="write_wrapper">
      <div className="write_Header">
        <Header_loginOK />
      </div>
      <div className="container">
        <div className="row" id="Write">
          <form method="post">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th colSpan="2">게시판 글쓰기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="user_write">
                    <input type="text" className="form-control" placeholder="글 제목" name="reviewTitle" maxLength="50" />
                  </td>
                </tr>
                <tr>
                  <td className="user_content">
                    <textarea className="form-control" placeholder="글 내용" name="reviewContent" />
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="submit">
              <Button 
                text={"글쓰기"}
                type={"Write"}
              />
              <Button 
                text={"취소하기"}
                type={"write_back"}
              />
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default write;