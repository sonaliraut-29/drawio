import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";

/**
 * @description This UI Component for Pagination
 * This component should use for Pagination
 */

export const Pagination = ({
  totalCount,
  limitValue,
  handlePageClick,
  currentPage,
}) => {
  const pageCountValue = Math.floor(totalCount / limitValue);
  const totalPageCount = pageCountValue;
  const pageCount = totalPageCount === 1 ? 2 : totalPageCount;
  const [activepage, setactivePage] = useState(currentPage);

  useEffect(() => {
    setactivePage(currentPage - 1);
  }, [currentPage]);

  return (
    <React.Fragment>
      <Row>
        <Col
          sm={9}
          lg={12}
          xs={12}
          className="d-sm-block d-md-block d-lg-block d-xl-block mx-auto"
        >
          <div className="mealPlanPagination">
            <div>
              {totalCount > limitValue && (
                <ReactPaginate
                  previousLabel={<span className="icon-Leftarrow" />}
                  nextLabel={<span className="icon-Rightarrow" />}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  forcePage={activepage}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Pagination;
