> 참고 사이트

- [reactjs.org - State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly)
- [함수형 setState가 리액트(React)의 미래이다](https://www.vobour.com/%ED%95%A8%EC%88%98%ED%98%95-setstate%EA%B0%80-%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%98-%EB%AF%B8%EB%9E%98%EC%9D%B4%EB%8B%A4-functiona)


<br>

## 상태를 알맞게 사용하기 위해 알아야 할 것들

### 상태를 직접 수정하지 말라

`this.state`를 어싸인 할 수 있는 곳은 생성자밖에 없다. `setState()`를 사용하자:

``` jsx
// 틀린 방식. 컴퍼넌트를 재 렌더링 하지 않는다.
this.state.comment = 'Hello';

// 제대로된 방식
this.setState({comment: 'Hello'});
```

<br>

###  상태 업데이트는 머지된다

`setState()`를 부르면, 리액트는 내가 준 옵젝트를 현재 상태로 머지한다. 예를 들어 상태가 몇몇 독립적인 변수들을 가진다고 하자:

``` jsx
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

이 변수들은 분리된 `setState()` 을 사용해 독립적으로 업데이트할 수 있다:

``` jsx
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

`this.setState({comments})`는 `this.state.posts`는 그대로 두면서 `this.state.comments`를 대체한다.

<br>

#### 주의점 

하나의 함수 내에서 여러 개의 `setState()`를 호출하는 경우를 생각해보자. `setState()`가 호출될 때마다 매번 옵젝트를 전달하고 리액트가 그를 머지한다. 따라서 옵제트 중 하나에 동일한 키가 포함되어 있으면, 그 키가 있는 마지막 옵제트의 키 값이 저장된다.

`score`를 원래 값보다 2 늘리기 위해 `increaseScoreby2()`라는 함수를 만들었다고 하자:

``` jsx
increaseScoreBy2 () {
  this.setState({
    score : this.state.score + 1
  });
  this.setState({
    score : this.state.score + 1
  });
}
```

리액트는 `setState()`를 호출할 때마다 상태를 즉시 업데이트 하지 않고, 모든 옵젝트를 하나로 결합한 후 새로 만든 옵젝트로 `setState()`를 한 번만 수행한다. 따라서 `increaseScoreBy2()` 함수의 최종 결과는 2가 아닌 1이다.

이를 해결할 수 있는 방법은 좀 있다가 밑에서.

<br>

###  상태 업데이트는 비동기적일 수 있다

리액트는 성능을 위해 여러 개의 `setState()`를 하나의 업데이트로 불러 배치(다른 말로, 단일 배치 방식으로 작업)할 수도 있다. 즉, `this.props`와 `this.state`가 비동기적으로 업데이트될 수 있기 때문에, 이후(_next_)의 상태를 계산할 때 이 값들에 의존해서는 안된다. 

예를 들어 이 코드는 `counter`를 업데이트하는 데 실패할 수 있다:

``` jsx
// 틀림
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

해결책을 알아보자.

<br>

### 해결책 - 함수형 `setState()` 사용

옵젝트가 아닌 **함수**를 받는 `setState()` 폼을 사용하자. 이 함수는 이후(_next_)의 상태를 계산하고 그 값을 리턴해준다. 

앞서 `counter`를 업데이트 하는 코드를 고쳐보자. 이전 상태(_state_), 그리고 업데이트가 적용된 시점의 props를 각각 첫번째와 두번째 파라미터로 받는다:

``` jsx
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

화살표 함수를 사용하지 않고 표현하면 다음과 같다:

``` jsx
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

<br>

같은 식으로, 앞서 보았던 `score`를 2 늘리는 함수를 다시 짜보면 다음과 같다:

``` jsx
increaseScoreBy2(){
  this.setState(function(prevState){
    return{
      score: prevState.score + 1
    };
  });
  this.setState(function(prevState){
    return{
      score: prevState.score + 1
    };
  });
}
```

[CodePen](https://codepen.io/mrscobbler/pen/JEoEgN?editors=0010)에서 전체 코드와 데모를 참고. 각각 잘못된 것, 잘 된 것이다.

<br>

#### 컴포넌트 클래스 외부에 상태 업데이트 로직 선언

함수형 `setState()`의 강점을 이용해보자. 컴포넌트 클래스 밖에 상태 업데이트 로직을 정의하는 것이다. 그리고 그것을 컴포넌트 클래스 안에서 부르자.

위에 `increaseScoreBy2()`를 다시 짜보자:

``` jsx
// 컴포넌트 클래스 외부
function increaseScore(prevState){
  return {
    score : prevState.score + 1
  }
}
...

  // 컴포넌트 클래스 내부
  handleIncreaseScore(){
    this.setState(increaseScore)
    this.setState(increaseScore)
  }

```