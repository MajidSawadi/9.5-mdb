import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";
import { ClipLoader } from "react-spinners";


function HomePage() {
 //const [movies, setMovies] = useState([]);
   
   const [searchInput, setSearchInput] = useState("");
   const [query, setQuery] = useState("");
   const [errorMessage] = useState("");
  const { movies, loading } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
    const totalPage = 3;
  const limit = 10;
    const [pageNum, setPageNum] = useState(1);

      const history = useHistory();
const handleClickMovie = (movieId) => {
  history.push(`/movies/${movieId}`);
};

const handleSearchInputChange = (e) => {
  setSearchInput(e.target.value);

 

};
  
   const handleSubmit = (e) => {
     e.preventDefault();
     setQuery(searchInput);
   };
  
  useEffect(() => {
    dispatch(movieActions.getAll(pageNum, limit, query));
  }, [dispatch, pageNum, limit, query]);
  const idxs = 3;
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">IMDB</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <SearchForm
            loading={loading}
            searchInput={searchInput}
            handleSearchChange={handleSearchInputChange}
            handleSubmit={handleSubmit}
          />
          <hr />
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPage}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : (
            <ul className="list-unstyled d-flex flex-wrap justify-content-between">
              {movies.map((m) => (
                <li key={m.id} onClick={() => handleClickMovie(m.id)}>
                  <Card
                    style={{
                      width: "12rem",
                      height: "27rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1250&q=80"
                    />
                    <Card.Body>
                      <Card.Title>{m.title}</Card.Title>
                      <Card.Text>@{m.genre}</Card.Text>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export { HomePage };
