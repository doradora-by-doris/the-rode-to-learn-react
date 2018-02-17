import React, { Component } from 'react';
import './App.css';

class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName() {
    return this.firstname + ' ' + this.lastname;
  }
}

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const helloWorld = {
      text: '리액트에 오신걸 환영합니다'
    };

    var first_username = 'Doris';
    var last_username = 'Kang';

    const robin = new Developer('Robin', 'Wieruch');

    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <h2>{helloWorld.text}</h2>
        <h5>This is {first_username} {last_username}.</h5>
        {list.map(item => 
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title} </a>
            </span>
            <span>{item.author} </span>
            <span>{item.num_comments} </span>
            <span>{item.points}</span>
          </div>
        )}
        <span>{robin.getName()}</span>

        {this.state.list.map(item =>{
          const onHandleDismiss = () =>
            this.onDismiss(item.objectID);
            return(
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={onHandleDismiss}
                type="button">
                dismiss
              </button>
              <button
                onClick={() => console.log(item.objectID)}
                type="button">
                inline
              </button>

            </span>
          </div>);
        }
          
        )}
        <h3>Chapter2</h3>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
          Search
          </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      
      </div>

    );

  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
<div>
  {list.filter(isSearched(pattern)).map(item =>
    <div key={item.objectID} className="table-row">
      <span style={largeColumn}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={midColumn}>{item.author}</span>
      <span style={smallColumn}>{item.num_comments}</span>
      <span style={smallColumn}>{item.points}</span>
      <span style={smallColumn}>
        <Button 
        onClick={() => onDismiss(item.objectID)}
        className="button-inline"
        >
          Dismiss
        </Button>
      </span>
    </div>
  )}
</div>


class Button extends Component {
  render() {
    const {
      onClick,
      className='',
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

export default App;
