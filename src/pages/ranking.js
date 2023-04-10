import styled from "styled-components";
import { useState } from "react";
import background from "../imgs/w2.jpg";
import { Header } from "../components/header";
import filme from "../imgs/entretenimentos/filmes.jpg";
import { RankingItem } from "../components/popular/rankingItem";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useEffect } from "react";
import {
  getAllCategories,
  getEntertainmentById,
  getRanking,
} from "../services";

export function Ranking() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [filter, setFilter] = useState("score");
  const [entertainmentList, setEntertainmentList] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);

  useEffect(() => {
    getRanking(userData.token).then((res) => {
      setScoreList(res.data.highestRated);
      setViewList(res.data.mostViewed);
      setTimeout(()=>{setFilter("views")}, 500)
      setTimeout(()=>{setFilter("score")}, 1000)
    });
  }, []);

  useEffect(() => {
    getAllCategories(userData.token).then((res) => {
      setcategoryList(res.data);
      getScoreList()
    });
  }, []);

  useEffect(() => {
    if (scoreList.length !== 0 && viewList.length !== 0) {
      if (filter === "score") {
        setEntertainmentList([])
        getScoreList()
      }
      if(filter === "views") {
        setEntertainmentList([])
        getViewList()
      }
    }
  }, [filter, scoreList, viewList]);

  function getScoreList() {
    let copyList = entertainmentList;
    if(copyList.length > 0){
      copyList.length=0
    }
        scoreList.forEach((item) => {
          getEntertainmentById(userData.token, item.entertainmentId).then(
            (res) => {
              copyList.push(res.data);
            }
          );
        });
        if(copyList.length > 10){
          copyList.length=10
        }
        setEntertainmentList(copyList);

  }

  function getViewList() {
    let copyList = entertainmentList;
    if(copyList.length > 0){
      copyList.length=0
    }
        viewList.forEach((item) => {
          getEntertainmentById(userData.token, item.entertainmentId).then(
            (res) => {
              copyList.push(res.data);
            }
          );
        });
        if(copyList.length > 10){
          copyList.length=10
        }
        setEntertainmentList(copyList);
  }

  function getStars(grade) {
    if (grade === 10) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 9) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStarHalfAlt className="star5" />
        </>
      );
    }
    if (grade === 8) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 7) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStarHalfAlt className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 6) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 5) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStarHalfAlt className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 4) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 3) {
      return (
        <>
          <FaStar className="star1" />
          <FaStarHalfAlt className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 2) {
      return (
        <>
          <FaStar className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
    if (grade === 1) {
      return (
        <>
          <FaStarHalfAlt className="star1" />
          <FaStar className="star2" />
          <FaStar className="star3" />
          <FaStar className="star4" />
          <FaStar className="star5" />
        </>
      );
    }
  }

  return (
    <Container filter={filter}>
      <Header />
      <div className="board">
        <h2>Os Mais Populares</h2>
        <div className="filter">
          <button onClick={() => setFilter("score")}>Nota Mais Alta</button>
          <button onClick={() => setFilter("views")}>Mais Vistos</button>
        </div>
        <div className="list">
          {entertainmentList.map((e, i) => (
            <RankingItem>
              <span>{i + 1}°</span>
              <div className="img">
                <img src={e.imageUrl} alt="filme" />
              </div>
              <div className="informations">
                <h3>{e.name}</h3>
                <div className="categories">
                {categoryList[e.category1Id - 1]?.name !==
                      undefined ? (
                        <div className="category">
                          {categoryList[e.category1Id - 1]?.name}
                        </div>
                      ) : (
                        ""
                      )}
                {categoryList[e.category2Id - 1]?.name !==
                      undefined ? (
                        <div className="category">
                          {categoryList[e.category2Id - 1]?.name}
                        </div>
                      ) : (
                        ""
                      )}
                {categoryList[e.category3Id - 1]?.name !==
                      undefined ? (
                        <div className="category">
                          {categoryList[e.category3Id - 1]?.name}
                        </div>
                      ) : (
                        ""
                      )}
                </div>
                <Stars grade={filter === "score" ? (scoreList[i]?._avg.grade) : 0}>
                  {filter === "score" ? getStars(scoreList[i]?._avg.grade) : ""}
                  {filter === "views" ? <p>Views: {viewList[i]?._count.entertainmentId}</p> : ""}
                </Stars>
              </div>
            </RankingItem>
          ))}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  width: 100vw;
  height: 100%;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  .board {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: white;
    width: 35%;
    height: 78%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 35%;
    margin-right: 35%;
    margin-bottom: 1%;
    animation-duration: 1s;
    animation-name: fadeInDown;
    margin-bottom: 10%;
    @media (max-width: 614px) {
      width: 90%;
      height: 75%;
      margin-right: 5%;
      margin-left: 5%;
      margin-top: 6%;
    }
    @keyframes fadeInDown {
      0% {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      100% {
        opacity: 1;
        transform: none;
      }
    }
    .list {
      width: 95%;
      overflow: auto;
      overflow-x: hidden;
      margin-bottom: 30px;
      ::-webkit-scrollbar {
        border-radius: 50px;
        width: 10px;
        background: transparent;
        border-top-right-radius: 50px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: darkblue;
        border-radius: 50px;
      }
      ::-webkit-scrollbar-track-piece {
        height: 80%;
      }
    }
    h2 {
      color: darkblue;
      font-size: 30px;
      @media (max-width: 614px) {
        font-size: 6vw;
      }
    }
    .filter {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 30px;
      @media (max-width: 614px) {
        width: 80%;
        margin-bottom: 5%;
      }
      button {
        transition: 1s;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        border: thin;
        border-radius: 10px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        @media (max-width: 614px) {
          font-size: 3.8vw;
        }
        :nth-child(1) {
          background-color: ${(props) =>
            props.filter === "score" ? "darkblue" : "ligthblue"};
          color: ${(props) => (props.filter === "score" ? "white" : "black")};
        }
        :nth-child(2) {
          background-color: ${(props) =>
            props.filter === "views" ? "darkblue" : "ligthblue"};
          color: ${(props) => (props.filter === "views" ? "white" : "black")};
        }
      }
    }
  }
`;

const Stars = styled.div`
  font-size: 2vw;
  color: grey;
  display: flex;
  align-items: center;
  @media (max-width: 614px) {
    font-size: 6vw;
  }
  .star1 {
    color: ${props => props.grade >= 1 ? "#faab00" : "gray"};
  }
  .star2 {
    color: ${props => props.grade > 2 ? "#faab00" : "gray"};
  }
  .star3 {
    color: ${props => props.grade > 4 ? "#faab00" : "gray"};
  }
  .star4 {
    color: ${props => props.grade > 6 ? "#faab00" : "gray"};
  }
  .star5 {
    color: ${props => props.grade > 8 ? "#faab00" : "gray"};
  }
`;
