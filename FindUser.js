var readline=require('readline');//입력받기 위한 모듈
var r=readline.createInterface({input:process.stdin,output:process.stdout});//키보드 입출력 정의
var rtfw="http://www.rankedftw.com/search/?name=";//rtfw에서 기본 검색 url
var league='silver_2';
var region='KR';
//
var cheerio=require('cheerio');//cheerio모듈 사용
var request=require('request');//request모듈 사용
var fs=require('fs');//파일시스템 사용
//
//var client=require('cheerio-httpcli');
//var param={};
//var urltype=require('url');
//
r.question("분석을 원하는 아이디를 입력하세요 : ",function(answer){//question메소드에서 callback함수 생성
  console.log("입력완료! 분석중...");//callback함수란 이벤트가 왔을 때 실행되는 함수이다. answer에 검색을 원하는 아이디가 담겨있다.
  rtfw=rtfw+answer;//검색 url 구성
  console.log(rtfw);//검색 url 확인
  //
  //client.fetch(rtfw,param,function(err,$,res){
    //if(err){console.log(err);return;}
  //  var src=$(this).attr('src');
  //  src=urltype.resolve(url,src);
    //var filename=urltype.parse(src).pathname;
  //  fname=savedir+'/'+fname.replace(/[^a-zA-Z0-9\.]+/g, '_');
  //  request(src).pipe(fs.createWriteStream(fname));
  //});
  //
//  var parsing_html=fs.readFile(rtfw,'utf8',(err,data)=>{//html reading fs 사용
//err? console.log(err) : console.log('okay cheerio!');//에러나면 에러출력, 이외엔 okay 메시지
request(rtfw,(error,response,body)=>{//rtfw url 불러오기
  if(error){throw error};//에러처리
  let $ = cheerio.load(body);//rtfw가 body이다. $로 jquery방식으로 html탐색
  try{//try_catch구문
    let username='';//username문자열 선언
    let userleague='';//userleague 문자열 선언
    let userregion='';//userregion 문자열 선언
    let usernumber='';//usernumber 문자열 선언
    $('ul').find('a').each(function(index,elem){//ul 태그 아래 a태그를 찾는다.
        username=$(this).find('.name').text().trim();//name클래스를 찾아 공백빼고 텍스트화
        userleague=$(this).find('.league').text().trim();//league클래스를 찾아 공백빼고 텍스트화
        userregion=$(this).find('.region').text().trim();//region클래스를 찾아 공백빼고 텍스트화
        if((username===answer)&&(userregion===region)){//아직 리그 구현 안함-리그는 그림으로 비교
        console.log(`${username}`);//테스트용 : 유저네임 출력
        console.log(`${userregion}`);//테스트용 : 유저리전 출력
        var localnumber=$(this).toString().slice(29,43);//rtfw에서 사용하는 사용자번호를 문자열로 넉넉히 자름
        var localindex1=localnumber.search('/');//첫번째 슬레시 발견하는 인덱스 검출
        localnumber=localnumber.slice(localindex1+1);//앞부분 슬래시 자른다.
        var localindex2=localnumber.search('/')-localindex1+1;//두번째 슬레시 발견하는 인덱스 검출
        localnumber=localnumber.slice(0,localindex2);//뒷부분 슬래시 자른다.
        console.log(`${localnumber}`);//테스트용 : 로컬넘버 출력

        }


    });
  }catch(error){
    console.error(error);
  }
});

//  });//parsing_html 끝
  //

  r.close()//반드시 close를 해줘야 한다.사용이 다 끝난 후에.
});//r.question 끝
