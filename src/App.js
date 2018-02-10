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

class App extends Component {
  render() {
    const helloWorld = {
      text: '리액트에 오신걸 환영합니다'
    };

    var first_username = 'Doris';
    var last_username = 'Kang';

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
    const robin = new Developer('Robin', 'Wieruch');
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
