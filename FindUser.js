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
request(rtfw,(error,response,body)=>{
  if(error){throw error};
  let $ = cheerio.load(body);//rtfw가 body이다. $로 jquery방식으로 html탐색
  try{
    let username='';
    let userleague='';
    let userregion='';
    let usernumber='';
    $('ul').find('a').each(function(index,elem){
        username=$(this).find('.name').text().trim();
        userleague=$(this).find('.league').text().trim();
        userregion=$(this).find('.region').text().trim();
        if((username===answer)&&(userregion===region)){//아직 리그 구현 안함
        console.log(`${username}`);
        console.log(`${userregion}`);
        //usernumber=$("a[href^='/player/']").text().trim();
        usernumber=$(this).toString().slice(29,40);
        console.log(`${usernumber}`);
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
