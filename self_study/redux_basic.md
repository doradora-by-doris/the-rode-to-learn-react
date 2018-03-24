## 리덕스 기본 개념


참고 사이트

- [redux.js.org 한글 번역](https://deminoth.github.io/redux/)  
- [redus.js.org](https://redux.js.org/introduction)  
- [리덕스(Redux)를 왜 쓸까? 그리고 리덕스를 편하게 사용하기 위한 발악 (i)](https://velopert.com/3528)  
- [당신에게 Redux는 필요 없을지도 모릅니다](https://medium.com/@Dev_Bono/%EB%8B%B9%EC%8B%A0%EC%97%90%EA%B2%8C-redux%EB%8A%94-%ED%95%84%EC%9A%94-%EC%97%86%EC%9D%84%EC%A7%80%EB%8F%84-%EB%AA%A8%EB%A6%85%EB%8B%88%EB%8B%A4-b88dcd175754)

<br>

### 리덕스란?

자바스크립트 앱을 위한 예측 가능한 상태 컨테이너. 자바스크립트와만 쓰일 수도, 리액트나 다른 라이브러리와 함께 쓰일 수도 있다.

<br>

### 리덕스 기본 용어

- **스토어(store)**: 앱의 상태를 보관하는 곳. 스토어 안의 객체트리에 앱의 모든 상태가 저장됨.  
- **액션(action)**: 내부 상태를 변경할 때 사용. **무언가 일어난다**는 사실을 알려줌. 액션 객체는 필수적으로 어떤 형태의 액션이 실행될지 나타내는 `type` 속성(보통 문자열 상수)을 가짐. **액션 생성자** 함수를 통해 액션을 만든다(액션을 리턴함).  
- **리듀서(reducer)**: 액션이 어떻게 상태를 변경하는지에 대한 서술이 있음. 리듀서 함수 순수 함소로, `state`와 `action` 파라미터를 받고 상태를 변경하여 리턴한다.

<br>

### 리덕스의 세 가지 원칙

1. 앱의 모든 상태는 하나의 스토어 안에 하나의 객체 트리 구조로 저장됨
2. 상태는 읽기 전용. 상태 변화는 액션 객체를 통해서만
3. 변화는 리듀서(순수 함수)로 작성되어야 함.

<br>


### 리덕스의 데이터 흐름

리덕스 아키텍쳐는 **일방향 데이터 흐름**에 따라 전개 된다. 리덕스 앱에서 데이터들의 생명주기는 다음과 같다.

1. `store.dispatch(action)` 호출. 액션은 무엇이 일어날지 기술하는 보통의 오브젝트이다.  

``` jsx
 { type: 'LIKE_ARTICLE', articleId: 42 }
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
 { type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

<br>

2. 리덕스 스토어가 리듀서 함수들을 호출  

``` jsx
 // 현재 어플리케이션의 상태
 let previousState = {
   visibleTodoFilter: 'SHOW_ALL',
   todos: [
     {
       text: 'Read the docs.',
       complete: false
     }
   ]
 }
 
 // 수행할 액션
 let action = {
   type: 'ADD_TODO',
   text: 'Understand the flow.'
 }
 
 // 리듀서가 다음 상태를 리턴
 let nextState = todoApp(previousState, action)
```

<br>

3. 루트 리듀서가 각 리듀서의 출력을 합쳐 하나의 상태 트리로 만든다. Redux는 루트 리듀서를 각각이 상태 트리의 가지 하나씩을 다루는 함수들로 나눌 수 있도록 `combineReducers()` 헬퍼 함수를 제공. 여러 리듀서를 하나의 리듀서로 합쳐줌.   

``` jsx
 function todos(state = [], action) {
   // Somehow calculate it...
   return nextState
 }
 
 function visibleTodoFilter(state = 'SHOW_ALL', action) {
   // Somehow calculate it...
   return nextState
 }
 
 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 })
```
 
 <br>

4. 리덕스 스토어가 루트 리듀서가 리턴한 상태 트리를 저장

<br>

### 리액트 애플리케이션에서 리덕스가 필요한 경우?

부모 컴포넌트에서 모든 상태를 관리하고 아래로 내려주는 방법이 직관적이고 편하다. (`ref`를 사용하여 컴포넌트끼리 소통할 수도 있지만 권장되지 않음)

그러나 앱의 규모가 커지면 최상위 컴포넌트 하나에서 상태 관리를 하기 힘들어 진다. 이 때 리덕스를 쓰면 컴포넌트 바깥에서 상태 관리가 가능하다.


<br>

### 리액트에서 리덕스 사용하기

- **presentational 컴포넌트**: 어떻게 보여질지(마크업, 스타일)에 관한 컴포넌트. 데이터를 읽고 변경하기 위해 `props` 사용. 리덕스와 연관 없음.  
- **container 컴포넌트**: 어떻게 동작할지(데이터를 불러오고 상태를 변경)에 대한 컴포넌트. 테이터를 읽고 변강하기 위해 리덕스 사용.

#### 리덕스 설치

리액트 어플리케이션 안에 리덕스와 바인딩 설치:

```
$ yarn add redux react-redux
```