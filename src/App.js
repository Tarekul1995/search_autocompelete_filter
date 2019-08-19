import React,{useEffect,useState} from 'react';
import { ListGroup,Container,Row,Col,FormControl } from "react-bootstrap";
import Downshift from 'downshift'
import matchSorter from 'match-sorter'
import axios from "axios";


function App() {

  const [users,setUser] = useState([]);
  const getMatchUser = value => value ? matchSorter(users,value,{keys:['name','username']}) : users

  useEffect(()=>{
    const fetchUser = async () =>{
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUser(res.data)
    }
    fetchUser()
  },[])  

  return (
  <Container>
    <Row>
      <Col></Col>
      <Col>
      <Downshift itemToString={(item)=>item ? item.name : ''}>
        {
          ({getInputProps,highlightedIndex,getMenuProps,isOpen,getItemProps,inputValue})=>(
            <div>
              <FormControl {...getInputProps()} type="text" placeholder="Search" className="mr-sm-2 mt-5" />
              <ListGroup {...getMenuProps({
                style:{
                  maxHeight:200,
                  overflowY:'scroll'
                }
              })}>
                {
                  isOpen ? getMatchUser(inputValue).map((user,index)=>(
                    <ListGroup.Item {...getItemProps({
                      item:user,key:user.id,style:{
                        backgroundColor:
                          index === highlightedIndex ? '#6682E7' : null,
                      },
                    })}>{user.name}({user.username})</ListGroup.Item>
                  )) : null
                }
              </ListGroup>
            </div>
          )
        }
      </Downshift>
      </Col>
      <Col></Col>
    </Row>
  </Container>
  );
}

export default App;
