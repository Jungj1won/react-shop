import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import shoebg from './img/bg.png';
import {useState} from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom';

// boostrap 써도 커스텀 가능함
// 길고 복잡한건 다른 js 파일에 빼둘 수 있음 
// 페이지 이동도와주는 useNavigate()
function App() {


  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); 
  console.log(data.length);
  return (
    <div className="App">

      

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
          <Link to = "/">홈</Link>
          <Link to = "/detail">상세페이지</Link>
          </Nav> 
        </Container>
      </Navbar>

      <div className = "main-bg" style={{backgroundImage : 'url('+shoebg+')'}}></div>

      
      

      <Routes>
        <Route path = "/" element = {
          <div className="container">
            <div className="row">
              <Shoe shoes = {shoes} ></Shoe>
            </div>
          </div> }/>
        <Route path = "/detail/:id" element = {<Detail shoes = {shoes}/>}/>
      </Routes>


      
    </div>
  );
}

export default App;
// html에서 src 폴더의 이미지 넣을 땐 style backgroundImage : 'url()' 
// html 에서 public 폴더의 이미지 사용할 땐 그냥 이미지경로 쓰면 됨
// nested routes 언제씀 ? 여러 유사한 페이지 필요할 때 \
// 쓰면 뒤로가기 버튼 이용 가능
// 페이지 이동이 쉬움 (UI 스위치 조작 쉬움)
function Shoe(props) {
  return(
    data.map(function(a, i){
      return (
        <div className="col-md-4" key={i}>
          <img src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`} width = '80%'/>
          <h4>{props.shoes[i].title}</h4>
          <p>{props.shoes[i].price}</p>
        </div>
    )}
  )
  )
}

// 리액트 안쓰면 html 따로 만들고 href 써서 넘기기
// 리액트는 SPA 여서 하나만 씀
// 1. 컴포넌트 만들어서 상세페이지 내용 채움
// 2. 누가 /detail 접속하면 그 컴포넌트 보여줌
// 길기 때문에 라이브러리 씀 react-router-dom 

function Detail(props) {

  let {id} = useParams();
  let found = props.shoes.find(el=>el.id == id);
  console.log(found);
  console.log(typeof(id));
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src= {`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{found.title}</h4>
          <p>{found.content}</p>
          <p>{found.price}</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  )
}
