import "./Product_write.css";
import Button from "../pages/Button";

const Product_write = () => {
  return (
    <div className="Product_write_wrapper">
      <div className="title">
        <div className="container">
          <h1 className="display-3">상품 리뷰</h1>
        </div>
      </div>
      <div className="review">
        <div className="row" id="review_write">
          <form>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th colSpan="2">상품 리뷰쓰기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    
                  </td>
                </tr>
                <tr>
                  <td>
                    <input className="form-control" placeholder="유기농 설거지 비누" name="pd_productId" readOnly/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input className="form-control" placeholder="글 제목" name="pd_reviewTitle"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <textarea className="form-control" placeholder="글 내용" name="pd_reviewContent"></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="submit">
              <Button 
                className="btn btn-default pull-right"
                text={"글쓰기"}
                type={"pdWrite"}
              />
              <Button 
                text={"뒤로가기"}
                type={"pdWrite_back"}
              />
              <Button 
                text={"수정하기"}
                type={"pdWrite_modify"}
              />
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product_write;