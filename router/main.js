module.exports = function(app,fs)
{
     app.get('/',function(req,res){
res.render('index',{top: '상대 정보를 입력해 주세요.',
ejs_momentum: ' ',
ejs_terran_proficiency: ' ',
ejs_zerg_proficiency: ' ',
ejs_protoss_proficiency: ' ',
ejs_primary_race: ' ',
ejs_win_rate: ' ',
ejs_recommend_build_1: ' ',
ejs_recommend_build_2: ' '});
});

app.get('/recommend',function(req,res,next){


        var readline=require('readline');//입력받기 위한 모듈
        var r=readline.createInterface({input:process.stdin,output:process.stdout});//키보드 입출력 정의
        var rtfw1="http://www.rankedftw.com/search/?name=";//rtfw에서 기본 검색 url
        var rtfw2="http://www.rankedftw.com/player/"//rtfw 번호 기반 특정 플레이어 검색 url

        //
        var cheerio=require('cheerio');//cheerio모듈 사용
        var request=require('request');//request모듈 사용
        var fs=require('fs');//파일시스템 사용
        //
        //request 1 variable
        var username='';//username문자열 선언
        var userleague='';//userleague 문자열 선언
        var userregion='';//userregion 문자열 선언
        var usernumber='';//usernumber 문자열 선언
        //
        //request 2 variable

        //
        //request 3-1 variable

        //
        //request 3-2 variable

        //
        //request 3-3 variable

        //
        //system message

        //
        //delivering variable
        var momentum;//기세
        var terran_proficiency;//테란 숙련도
        var zerg_proficiency;//저그 숙련도
        var protoss_proficiency;//프로토스 숙련도
        var primary_race;//주 종족
        var win_rate;//시즌 전체 승률

        var region;//서버
        var league;//리그
        var myrace;//내 종족
        var enemyrace;//상대 종족
        var enemyname;//상대 이름

        var recommend;//추천빌드(운영/타이밍/올인)
        //
//var answer=req.getParameter("name");
region=req.query.region;
league=req.query.league;
myrace=req.query.myRace;
enemyrace=req.query.enemyRace;
enemyname=req.query.enemyName;

console.log("query"+enemyname);


//        r.question("분석을 원하는 아이디를 입력하세요 : ",function(answer){//question메소드에서 callback함수 생성
          //question은 에러 제어 만들면 안된다.
          console.log("r.question processing");//callback함수란 이벤트가 왔을 때 실행되는 함수이다. answer에 검색을 원하는 아이디가 담겨있다.
          rtfw1=rtfw1+enemyname;//검색 url 구성
          console.log(rtfw1);//테스트용 : 검색 url 확인
        //
        request(rtfw1,(error,response,body)=>{//rtfw url 불러오기 request 1
          if(error){throw error};//에러처리
          console.log("request 1 processing");
          console.log(body);
          let $ = cheerio.load(body);//rtfw가 body이다. $로 jquery방식으로 html탐색
            $('ul').find('a').each(function(index,elem){//ul 태그 아래 a태그를 찾는다.
                username=$(this).find('.name').text().trim();//name클래스를 찾아 공백빼고 텍스트화
                userleague=$(this).find('.league').text().trim();//league클래스를 찾아 공백빼고 텍스트화
                userregion=$(this).find('.region').text().trim();//region클래스를 찾아 공백빼고 텍스트화
                if((username===enemyname)&&(userregion===region)){//아직 리그 구현 안함-리그는 그림으로 비교
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
          request(rtfw2,(error,response,body)=>{//rtfw2 url 불러오기 request 2
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
              //profileID=encodeURI(encodeURIComponent(profileID));//한글처리부
            });//a bnetlink 종료
        //console.log(`${profileID}`);//테스트용 : profileID 출력

        var match_history_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/"//매치히스토리 url 앞부분
        var match_history_2="/matches?access_token=USCbkLNyTur6a4bb27UdHIfTeH6wlA68HY"//매치히스토리 url 뒷부분
        var match_history_url=match_history_1+profileID+match_history_2;//매치히스토리 url 구성
        console.log(match_history_url);//테스트용 : 매치히스토리 url 출력

        request(match_history_url,(error,response,body)=>{//match history request request 3
          if(error){throw error};//에러처리
          console.log('request3 processing');//테스트용 : request 작동여부 출력

        var obj1=JSON.parse(body);//request 결과를 JSON objerct로 변환
        //console.log(obj.matches [0].map);//테스트용 : 하나에 접근
        $(obj1.matches).each(function(index,match){//body에서 각각의 배열요소 match들과 인덱스 사용
          if(match.type=='1v1'){//경기타입이 1대1인 경우에만 관심있다.
            console.log(index+":::",match.decision,match.map);//인덱스와 승패, 맵 표시
        };//if 1v1 종료
        });//each function 종료

        var ladder_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/"
        var ladder_2="/ladders?access_token=USCbkLNyTur6a4bb27UdHIfTeH6wlA68HY";
        var ladder_url=ladder_1+profileID+ladder_2;
        console.log(ladder_url);
        request(ladder_url,(error,response,body)=>{//ladder request request 4
          if(error){throw error};
          console.log('request4 processing');
          var obj2=JSON.parse(body);//request 결과를 JSON object로 변환
          //console.log(body);
        //  console.log(obj2.currentSeason [2].ladder[0].wins);//테스트용 : 하나에 접근
          var wins=obj2.currentSeason[3].ladder[0].wins;
          var losses=obj2.currentSeason[3].ladder[0].losses;
        win_rate=wins/(wins+losses);
            //console.log(wins);
            //console.log(losses);
            //console.log(win_rate);

        var profile_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/";
        var profile_2="?access_token=USCbkLNyTur6a4bb27UdHIfTeH6wlA68HY";
        var profile_url=profile_1+profileID+profile_2;
        console.log(profile_url);
        request(profile_url,(error,response,body)=>{//profile request request 5
          if(error){throw error};
          console.log('request5 processing');
          //console.log(body);
          var obj3=JSON.parse(body);//request 결과를 JSON object로 변환
          //console.log(obj2.currentSeason [1].ladder[0].wins);//테스트용 : 하나에 접근
        primary_race=obj3.career.primaryRace;
            //console.log(primary_race);
          var terran_level=obj3.swarmLevels.terran.level;
          var zerg_level=obj3.swarmLevels.zerg.level;
          var protoss_level=obj3.swarmLevels.protoss.level;

              //console.log(terran_level);
              //console.log(zerg_level);
              //console.log(protoss_level);

        //build recommend algorithm
        var matchresults=[];//매치결과 담을 배열 선언
        var momentum_win=0;//최근 10경기 중 승수 초기화
        for (var i=0;i<25;i++){//매치히스토리는 최대 25개
          if(obj1.matches[i].type=='1v1'){//1v1에만 관심있다.
          matchresults.push(obj1.matches[i].decision);//배열 끝에 결과 삽입
          if((matchresults.length<11)&&(obj1.matches[i].decision=='Win')){//최근 10경기에서 승리한 경우
            momentum_win=momentum_win+1;//그 승수를 카운트한다.
          }//if length11 종료
        }//obj1 1v1 종료
        }//for i 25 종료
        //console.log(matchresults);//테스트용 : matchresults 출력
        //console.log(momentum_win);//테스트용 : momentum_win 출력
        if(momentum_win>=7){//7승 이상이면 상승세
        momentum='상승세';
        }
        if((momentum_win<7)&&(momentum_win>=4)){//4승이상 7승미만이면 정체
        momentum='정체중';
        }
        if(momentum_win<4){//4승 미만이면 하락세
        momentum='하락세';
        }
        //console.log(momentum);//테스트용 : 기세 출력

        if(terran_level<50){//테란 레벨 50 안되면
          terran_proficiency='비숙련자'//테란 비숙련자
        } else{
          terran_proficiency='숙련자'
        }
        if(zerg_level<50){//저그 레벨 50 안되면
          zerg_proficiency='비숙련자'//저그 비숙련자
        } else{
          zerg_proficiency='숙련자'
        }
        if(protoss_level<50){//프로토스 레벨 50 안되면
          protoss_proficiency='비숙련자'//프로토스 비숙련자
        } else{
          protoss_proficiency='숙련자'
        }
        //
        //system message part
        var system_message_momentum="최근 10경기 분석 결과 현재 상대는 '"+momentum+"'입니다.";
        var system_message_terran_proficiency="상대는 테란 '"+terran_proficiency+"'입니다.";
        var system_message_zerg_proficiency="상대는 저그 '"+zerg_proficiency+"'입니다.";
        var system_message_protoss_proficiency="상대는 프로토스 '"+protoss_proficiency+"'입니다.";
        var system_message_primary_race="상대의 주 종족은 '"+primary_race+"'입니다.";
        var system_message_win_rate="상대의 이번 시즌 전체 승률은 '"+win_rate+"'입니다.";

        //var system_message=system_message_momentum+system_message_terran_proficiency+system_message_zerg_proficiency+system_message_protoss_proficiency+system_message_primary_race+system_message_win_rate;

        console.log("최근 10경기 분석 결과 현재 상대는 '"+momentum+"'입니다.");
        console.log("상대는 테란 '"+terran_proficiency+"'입니다.");
        console.log("상대는 저그 '"+zerg_proficiency+"'입니다.");
        console.log("상대는 프로토스 '"+protoss_proficiency+"'입니다.");
        console.log("상대의 주 종족은 '"+primary_race+"'입니다.");
        console.log("상대의 이번 시즌 전체 승률은 '"+win_rate+"'입니다.");
        //
js_momentum="최근 10경기 분석 결과 현재 상대는 '"+momentum+"'입니다.";
js_terran_proficiency="상대는 테란 '"+terran_proficiency+"'입니다.";
js_zerg_proficiency="상대는 저그 '"+zerg_proficiency+"'입니다.";
js_protoss_proficiency="상대는 프로토스 '"+protoss_proficiency+"'입니다.";
js_primary_race="상대의 주 종족은 '"+primary_race+"'입니다.";
js_win_rate="상대의 이번 시즌 전체 승률은 '"+win_rate+"'입니다.";

var js_recommend_build_1;
var js_recommend_build_2;

var build_address_1='./';
var build_address_2='./';

var strategy;
if((myrace=='protoss')&&(enemyrace=='protoss')){
if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
  strategy='Economic';
}else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
  strategy='AllIn';
}else{
  strategy='TimingAttack';
}
}else if((myrace=='protoss')&&(enemyrace=='terran')){
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}else if((myrace=='protoss')&&(enemyrace=='zerg')){
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}else if((myrace=='terran')&&(enemyrace=='protoss')){
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}else if((myrace=='terran')&&(enemyrace=='terran')){
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}else if((myrace=='terran')&&(enemyrace=='zerg')){
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}else if((myrace=='zerg')&&(enemyrace=='protoss')){
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}else if((myrace=='zerg')&&(enemyrace=='terran')){
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}else{//저저전
  if(momentum=='하락세'||protoss_proficiency=='비숙련자'){
    strategy='Economic';
  }else if(momentum=='상승세'||protoss_proficiency=='숙련자'){
    strategy='AllIn';
  }else{
    strategy='TimingAttack';
  }
}

var myrace_inbuild;
if(myrace=='protoss'){
 myrace_inbuild='P';
}else if(myrace=='terran'){
 myrace_inbuild='T';
}else{
 myrace_inbuild='Z';
}

var enemyrace_inbuild;
if(enemyrace=='protoss'){
 enemyrace_inbuild='P';
}else if(enemyrace=='terran'){
 enemyrace_inbuild='T';
}else{
 enemyrace_inbuild='Z';
}

build_address_1=build_address_1+myrace_inbuild+'v'+enemyrace_inbuild+'/'+strategy+'/'+myrace_inbuild+'v'+enemyrace_inbuild+'_'+strategy+'1.txt';
build_address_2=build_address_2+myrace_inbuild+'v'+enemyrace_inbuild+'/'+strategy+'/'+myrace_inbuild+'v'+enemyrace_inbuild+'_'+strategy+'2.txt';
console.log(build_address_1);
js_recommend_build_1 = fs.readFileSync(build_address_1, 'utf8').toString().split("\n");
js_recommend_build_2 = fs.readFileSync(build_address_2, 'utf8').toString().split("\n");

//경로는 app.js기준

res.render('index',{top: '분석 결과',
ejs_momentum: js_momentum,
ejs_terran_proficiency: js_terran_proficiency,
ejs_zerg_proficiency: js_zerg_proficiency,
ejs_protoss_proficiency: js_protoss_proficiency,
ejs_primary_race: js_primary_race,
ejs_win_rate: js_win_rate,
ejs_recommend_build_1: js_recommend_build_1,
ejs_recommend_build_2: js_recommend_build_2});



        //build recommend command

        //

        console.log('request5 done');
        });//request5종료
        console.log('request4 done');
        });//request4종료
        console.log('request3 done');
        });//request3종료
        console.log('request2 done');
        });//request2종료
        console.log('request1 done');
        });//request1 종료

        console.log('r.question done');
        //console.log(terran_level);
//        r.close()//반드시 close를 해줘야 한다.사용이 다 끝난 후에.
//        });//r.question 끝





      });


}
