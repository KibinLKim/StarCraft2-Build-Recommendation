/*
var fs = require('fs');//파일 시스템
var readline=require('readline')//readline 모듈
var file = 'target.txt';//파일은 타겟.텍스트이다.
var r=readline.createInterface({
  input:process.stdin, output:process.stdout
});//입출력 정의



fs.open(file, 'r+', function(err,fd){//파일을 읽쓰 모드로 열고 없으면 에러발생
  if (err) throw err;
  console.log('target open complete');//열고 출력
  r.question("검색을 원하는 아이디를 입력하세요 : ",function(input){
    console.log("입력완료",input);
    r.close()
    fs.writeFile('target.txt',input,'utf8',function(error){
      console.log('writing done')
    })
  })
})
*/
