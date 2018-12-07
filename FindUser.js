var readline=require('readline');//입력받기 위한 모듈
var r=readline.createInterface({input:process.stdin,output:process.stdout});//키보드 입출력 정의
var url="http://www.rankedftw.com/search/?name=";//rtfw에서 기본 검색 url
r.question("분석을 원하는 아이디를 입력하세요 : ",function(answer){//question메소드에서 callback함수 생성
  console.log("입력완료! 분석중...");//callback함수란 이벤트가 왔을 때 실행되는 함수이다. answer에 검색을 원하는 아이디가 담겨있다.
  url=url+answer;
  console.log(url);
  r.close()//반드시 close를 해줘야 한다.사용이 다 끝난 후에.
});
