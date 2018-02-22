> 참고 사이트

- [reactjs.org - State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down)

<br>

### 데이터는 아래로 흐른다

부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 상태형인지 혹은 비상태형인지 모른다. 또한, 그것들이 함수로 정의됐는지 아니면 클래스로 정의됐는지 신경쓰지 말아야 한다. 

이것은 상태가 로컬에서 혹은 캡슐화되어 불리는 이유다. 컴포넌트는 자신이 가지고 있거나 자신을 정의한 컴포넌트에만 접근 가능하다.

아래와 같은 코드가 있다고 하자. 1초마다 현재 시각을  뷰에 업데이트하는 `Clock` 컴퍼넌트다. 전체 코드와 결과물은 [여기](https://codepen.io/gaearon/pen/amqdNA?editors=0010)에서 볼 수 있음.

``` jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  ...

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

<br>

컴포넌트는 자식 컴포넌트에게 자신의 상태를 props 로서 전해내려줄 수 있다.

``` jsx
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

`FormattedDate` 컴포넌트를 새롭게 만들어서 다음과 같이 적용시킬 수도 있다.

``` jsx
<FormattedDate 
  date={this.state.date}
/>
```

`FormattedDate` 컴포넌트를 정의해보자. 이 컴포넌트는 자신의 props에서 `date`를 받는데, 그것이 `Clocks`의 상태에서 온건지 아니면 `Clock`의 props에서 온건지 아니면 직접 정의된 건지 모른다.  

``` jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

<br>

이는 보통 '탑 다운(위에서 아래로)', 혹은 ‘단방향’ 데이터 흐름이라고 불린다. 어떤 상태든 항상 특정 컴포넌트에 속해야 하며, 어떤 데이터든 (혹은 그 상태에서 비롯된 UI든) 트리에서 봤을 때 ‘아래’ 컴포넌트에만 영향을 줄 수 있다.

props의 폭포수로서 컴포넌트 트리를 생각해보면, 각각의 컴포넌트의 상태는 임의의 지점에서 합치는(그러나 아래로만 흐르는), 추가적인 물의 소스같은 것이다.

<br>

모든 컴포넌트들이 정말 분리되어있다는 것을 보기 위해, 세 개의 `<Clock>`을 렌더링한는 `App` 컴포넌트를 보자. 전체 코드와 실행 결과는 [여기](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)에서 볼 수 있다.

``` jsx
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
```
각각의 `Clock`은 자신만의 타이머를 셋팅하고 독립적으로 업데이트한다.

리액트 앱에서 컴포넌트가 상태형인가 비상태형인가에 대한 여부는, 시간이 지남에 따라 바뀔 수 있는 컴포넌트의 구현 디테일로 정해진다(In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time.)

비 상태형 컴포넌트를 상태형 컴포넌트 안에 쓸 도수 있고, 그 반대도 가능하다.
