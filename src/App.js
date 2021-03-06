import React, { Component } from 'react';

import CardList  from './components/card-list/card-list.component';
import { SearchBox } from './components/serach-box/search-box.component';

import './App.css';


class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({monsters: users}));
  }
  
  render() {
    const { monsters, searchField } = this.state; // const monsters = this.state.monsters and const searchFiled = this.state.searchField
    let searchName = 'name';
    let searchText = null;
    let filterdMonsters = null;
    searchText = searchField.toLocaleLowerCase();
    searchText.includes("@") ? searchName = 'email': searchName = 'name';

    if (searchName === 'name') {
       filterdMonsters = monsters.filter(monster => 
        monster.name.toLowerCase().includes(searchField.toLowerCase())
      )
    }else{
       filterdMonsters = monsters.filter(monster => 
        monster.email.toLowerCase().includes(searchField.toLowerCase())
      )
    }
    return (
      <div className='App'>
        <SearchBox
          placeholder='search monsters' 
          handleChange = {e => this.setState({ searchField: e.target.value})}
        />
        <CardList monsters = {filterdMonsters} />       
      </div>
    );
  }
}

export default App;

