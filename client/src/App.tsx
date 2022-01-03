import React from 'react';


function App() {
  return (
    <div>
      <header>
        <div>
          <div>현재 월 </div>
          <div> 모달 버튼</div>
        </div>
        <div>
          <div>추가 버튼</div>
          <div>편집 버튼</div>
        </div>
      </header>
      <section>
        <div>
          <div>
            <div>이번 달 소비</div>
          </div>
          <div>
            <div>소비 금액</div>
          </div>
          <ul>
            <li>소비내용 1</li>
            <li>소비내용 2</li>
          </ul>
        </div>
        <div>
          <div>
            <div>제목</div>
            <div>글자 버튼</div>
          </div>
          <div>
            달력
          </div>
          <div>
            <ul>
              <li>날짜 소비1</li>
              <li>날짜 소비2</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
