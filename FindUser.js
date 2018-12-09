var readline=require('readline');//입력받기 위한 모듈
var r=readline.createInterface({input:process.stdin,output:process.stdout});//키보드 입출력 정의
var rtfw1="http://www.rankedftw.com/search/?name=";//rtfw에서 기본 검색 url
var rtfw2="http://www.rankedftw.com/player/"
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
//class MatchHistory{
//  @SerializedName("matches")
//  public List<Matches> matches;
//class Matches{
//  @SerializedName("map")
//  public String map;
//  @SerializedName("type")
//  public String type;
//  @SerializedName("decision")
//  public String decision;
//}
//}

r.question("분석을 원하는 아이디를 입력하세요 : ",function(answer){//question메소드에서 callback함수 생성
  console.log("입력완료! 분석중...");//callback함수란 이벤트가 왔을 때 실행되는 함수이다. answer에 검색을 원하는 아이디가 담겨있다.
  rtfw1=rtfw1+answer;//검색 url 구성
  console.log(rtfw1);//테스트용 : 검색 url 확인
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
var username='';//username문자열 선언
var userleague='';//userleague 문자열 선언
var userregion='';//userregion 문자열 선언
var usernumber='';//usernumber 문자열 선언
request(rtfw1,(error,response,body)=>{//rtfw url 불러오기
  if(error){throw error};//에러처리
  let $ = cheerio.load(body);//rtfw가 body이다. $로 jquery방식으로 html탐색
//  try{//try_catch구문
    //let username='';//username문자열 선언
    //let userleague='';//userleague 문자열 선언
    //let userregion='';//userregion 문자열 선언
    //let usernumber='';//usernumber 문자열 선언
    $('ul').find('a').each(function(index,elem){//ul 태그 아래 a태그를 찾는다.
        username=$(this).find('.name').text().trim();//name클래스를 찾아 공백빼고 텍스트화
        userleague=$(this).find('.league').text().trim();//league클래스를 찾아 공백빼고 텍스트화
        userregion=$(this).find('.region').text().trim();//region클래스를 찾아 공백빼고 텍스트화
        if((username===answer)&&(userregion===region)){//아직 리그 구현 안함-리그는 그림으로 비교
        console.log(`${username}`);//테스트용 : 유저네임 출력
        console.log(`${userregion}`);//테스트용 : 유저리전 출력
        var usernumber=$(this).toString().slice(29,43);//rtfw에서 사용하는 사용자번호를 문자열로 넉넉히 자름
        var localindex1=usernumber.search('/');//첫번째 슬레시 발견하는 인덱스 검출
        usernumber=usernumber.slice(localindex1+1);//앞부분 슬래시 자른다.
        var localindex2=usernumber.search('/')-localindex1+1;//두번째 슬레시 발견하는 인덱스 검출
        usernumber=usernumber.slice(0,localindex2);//뒷부분 슬래시 자른다.
        console.log(`${usernumber}`);//테스트용 : 유저넘버 출력
        if(rtfw2.length>33){//하나라도 붙어있으면
          rtfw2=rtfw2;//아무것도 안한다.
        }else{//그렇지않고 아무것도 안붙어있으면
          rtfw2=rtfw2+usernumber+'/';//rtfw2 url갱신
        }
        console.log(rtfw2);//테스트용 : rtfw2 출력
  }//이름서버리그비교if종료
  });//ul a find문 종료

  var profileID='';
  request(rtfw2,(error,response,body)=>{//rtfw2 url 불러오기
    if(error){throw error};//에러처리
    console.log('request2 processing');//테스트용 : request2 실행여부 출력
    let $ = cheerio.load(body);//rtfw2가 body이다. $로 jquery방식으로 html탐색
    $('.content').find('.bnet-link').each(function(index,elem){//content 클래스 안의 bnet-link클래스를 포함하는 요소를 찾는다.
      profileID=$(this).toString().slice(62,72);//얻고자 하는 profileID를 포함하여 앞뒤로 적당히 자른다.
      var localindex3=profileID.search('/');//첫번째 슬레시 발견하는 인덱스 검출
      profileID=profileID.slice(localindex3+1);//앞부분 슬래시 자른다.
      var localindex4=profileID.search('/')-localindex3;//두번째 슬레시 발견하는 인덱스 검출
      profileID=profileID.slice(0,localindex4);//뒷부분 슬래시 자른다.
      console.log(`${profileID}`);//테스트용 : profileID 출력
    });//a bnetlink 종료
//console.log(`${profileID}`);//테스트용 : profileID 출력

var match_history_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/"
var match_history_2="/matches?access_token=US0q3wV6W1fIYZmRnEBbNvUrRHYZhwANIi"
var match_history_url=match_history_1+profileID+match_history_2;
console.log(match_history_url);
request(match_history_url,(error,response,body)=>{
  if(error){throw error};
  console.log('request3-1 processing');
  //console.log(body); //테스트용: response body 출력
  //JsonParser jsonParser=new JsonParser();
  //JsonObject jsonObject=(JsonObject) jsonParser.parse(json);
  //JsonObject matches=(JsonObject) jsonObject.get("matches");
  //System.out.print(matches.get("map"));

//MatchHistory matchhistory=new Gson().fromJson(json,MatchHistory.class);
//for(MatchHistory.Matches matches : matchhistory.matches){
//  System.out.println(matches.map);
//  System.out.println(matches.type);
//  System.out.println(matches.decision);
//}

var obj1=JSON.parse(body);//request 결과를 JSON object로 변환
//console.log(obj.matches [0].map);//테스트용 : 하나에 접근
$(obj1.matches).each(function(index,match){//body에서 각각의 배열요소 match들과 인덱스 사용
  if(match.type=='1v1'){//경기타입이 1대1인 경우에만 관심있다.
    console.log(index+":::",match.decision,match.map);//인덱스와 승패, 맵 표시
};//if 1v1 종료
});//each function 종료
//var jsonstring=JSON.stringify(body);//json형식의 string으로 변환
//console.log(jsonstring);//테스트용 : jsontext에 바디가 적절히 들어가는지 검사

});//request3-1종료
var ladder_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/"
var ladder_2="/ladders?access_token=US0q3wV6W1fIYZmRnEBbNvUrRHYZhwANIi";
var ladder_url=ladder_1+profileID+ladder_2;
console.log(ladder_url);
request(ladder_url,(error,response,body)=>{
  if(error){throw error};
  console.log('request3-2 processing');
  var obj2=JSON.parse(body);//request 결과를 JSON object로 변환
  //console.log(obj2.currentSeason [1].ladder[0].wins);//테스트용 : 하나에 접근
  var wins=obj2.currentSeason[1].ladder[0].wins;
  var losses=obj2.currentSeason[1].ladder[0].losses;
  var winrate=wins/(wins+losses);
    console.log(wins);
    console.log(losses);
    console.log(winrate);
});//request3-2종료

var profile_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/";
var profile_2="?access_token=US0q3wV6W1fIYZmRnEBbNvUrRHYZhwANIi";
var profile_url=profile_1+profileID+profile_2;
console.log(profile_url);
request(profile_url,(error,response,body)=>{
  if(error){throw error};
  console.log('request3-3 processing');
  var obj3=JSON.parse(body);//request 결과를 JSON object로 변환
  //console.log(obj2.currentSeason [1].ladder[0].wins);//테스트용 : 하나에 접근
  var primary_race=obj3.career.primaryRace;
    console.log(primary_race);
  var terran_level=obj3.swarmLevels.terran.level;
  var zerg_level=obj3.swarmLevels.zerg.level;
  var protoss_level=obj3.swarmLevels.protoss.level;
      console.log(terran_level);
      console.log(zerg_level);
      console.log(protoss_level);
});//request3-3종료

});//request2종료
//  }catch(error){
//    console.error(error);
//  }//try_catch구문 종료
});//request1 종료

//  });//parsing_html 끝
  //

  r.close()//반드시 close를 해줘야 한다.사용이 다 끝난 후에.
});//r.question 끝
