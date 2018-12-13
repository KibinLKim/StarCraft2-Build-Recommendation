//Site
var http = require('http');
var fs = require('fs');
var jsdom = require('jsdom');
//var $ = require('jquery');
var path=require('path');
//Site end
var express=require('express');
var app=express();
var router=require('./router/main')(app);
var bodyParser=require('body-parser');
var querystring=require('querystring');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Site
app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname,'/node_modules')));

app.get('/', function(req,res){
  fs.readFile('index.ejs',function(err,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

app.get('/recommend', function(req,res,next){
  fs.readFile('index.ejs',function(err,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

app.get('/imgs',function(req,res){
  fs.readFile('logoIMG.jpg',function(err,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});
//Site end

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server=app.listen(3000,function(){
  console.log("Express server has started on port 3000");

  });//app listen �L

//
/*
var readline=require('readline');//�Է¹ޱ� ���� ���
var r=readline.createInterface({input:process.stdin,output:process.stdout});//Ű���� ����� ����
var rtfw1="http://www.rankedftw.com/search/?name=";//rtfw���� �⺻ �˻� url
var rtfw2="http://www.rankedftw.com/player/"//rtfw ��ȣ ��� Ư�� �÷��̾� �˻� url
var league='silver_2';
var region='KR';
//
var cheerio=require('cheerio');//cheerio��� ���
var request=require('request');//request��� ���
var fs=require('fs');//���Ͻý��� ���
//
//request 1 variable
var username='';//username���ڿ� ����
var userleague='';//userleague ���ڿ� ����
var userregion='';//userregion ���ڿ� ����
var usernumber='';//usernumber ���ڿ� ����
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
var momentum;//�⼼
var terran_proficiency;//�׶� ���õ�
var zerg_proficiency;//���� ���õ�
var protoss_proficiency;//�����佺 ���õ�
var primary_race;//�� ����
var win_rate;//���� ��ü �·�

var myrace;//�� ����
var enemyrace;//��� ����
var recommend;//��õ����(�/Ÿ�̹�/����)
//

r.question("�м��� ���ϴ� ���̵� �Է��ϼ��� : ",function(answer){//question�޼ҵ忡�� callback�Լ� ����
  //question�� ���� ���� ����� �ȵȴ�.
  console.log("r.question processing");//callback�Լ��� �̺�Ʈ�� ���� �� ����Ǵ� �Լ��̴�. answer�� �˻��� ���ϴ� ���̵� ����ִ�.
  rtfw1=rtfw1+answer;//�˻� url ����
  console.log(rtfw1);//�׽�Ʈ�� : �˻� url Ȯ��
//
request(rtfw1,(error,response,body)=>{//rtfw url �ҷ����� request 1
  if(error){throw error};//����ó��
  console.log("request 1 processing");
  let $ = cheerio.load(body);//rtfw�� body�̴�. $�� jquery������� htmlŽ��
    $('ul').find('a').each(function(index,elem){//ul �±� �Ʒ� a�±׸� ã�´�.
        username=$(this).find('.name').text().trim();//nameŬ������ ã�� ���黩�� �ؽ�Ʈȭ
        userleague=$(this).find('.league').text().trim();//leagueŬ������ ã�� ���黩�� �ؽ�Ʈȭ
        userregion=$(this).find('.region').text().trim();//regionŬ������ ã�� ���黩�� �ؽ�Ʈȭ
        if((username===answer)&&(userregion===region)){//���� ���� ���� ����-���״� �׸����� ��
        console.log(`${username}`);//�׽�Ʈ�� : �������� ���
        console.log(`${userregion}`);//�׽�Ʈ�� : �������� ���
        var usernumber=$(this).toString().slice(29,43);//rtfw���� ����ϴ� ����ڹ�ȣ�� ���ڿ��� �˳��� �ڸ�
        var localindex1=usernumber.search('/');//ù��° ������ �߰��ϴ� �ε��� ����
        usernumber=usernumber.slice(localindex1+1);//�պκ� ������ �ڸ���.
        var localindex2=usernumber.search('/')-localindex1+1;//�ι�° ������ �߰��ϴ� �ε��� ����
        usernumber=usernumber.slice(0,localindex2);//�޺κ� ������ �ڸ���.
        console.log(`${usernumber}`);//�׽�Ʈ�� : �����ѹ� ���
        if(rtfw2.length>33){//�ϳ��� �پ�������
          rtfw2=rtfw2;//�ƹ��͵� ���Ѵ�.
        }else{//�׷����ʰ� �ƹ��͵� �Ⱥپ�������
          rtfw2=rtfw2+usernumber+'/';//rtfw2 url����
        }
        console.log(rtfw2);//�׽�Ʈ�� : rtfw2 ���
  }//�̸��������׺�if����
  });//ul a find�� ����

  var profileID='';
  request(rtfw2,(error,response,body)=>{//rtfw2 url �ҷ����� request 2
    if(error){throw error};//����ó��
    console.log('request2 processing');//�׽�Ʈ�� : request2 ���࿩�� ���
    let $ = cheerio.load(body);//rtfw2�� body�̴�. $�� jquery������� htmlŽ��
    $('.content').find('.bnet-link').each(function(index,elem){//content Ŭ���� ���� bnet-linkŬ������ �����ϴ� ��Ҹ� ã�´�.
      profileID=$(this).toString().slice(62,72);//����� �ϴ� profileID�� �����Ͽ� �յڷ� ������ �ڸ���.
      var localindex3=profileID.search('/');//ù��° ������ �߰��ϴ� �ε��� ����
      profileID=profileID.slice(localindex3+1);//�պκ� ������ �ڸ���.
      var localindex4=profileID.search('/')-localindex3;//�ι�° ������ �߰��ϴ� �ε��� ����
      profileID=profileID.slice(0,localindex4);//�޺κ� ������ �ڸ���.
      console.log(`${profileID}`);//�׽�Ʈ�� : profileID ���
      //profileID=encodeURI(encodeURIComponent(profileID));//�ѱ�ó����
    });//a bnetlink ����
//console.log(`${profileID}`);//�׽�Ʈ�� : profileID ���

var match_history_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/"//��ġ�����丮 url �պκ�
var match_history_2="/matches?access_token=US0q3wV6W1fIYZmRnEBbNvUrRHYZhwANIi"//��ġ�����丮 url �޺κ�
var match_history_url=match_history_1+profileID+match_history_2;//��ġ�����丮 url ����
console.log(match_history_url);//�׽�Ʈ�� : ��ġ�����丮 url ���

request(match_history_url,(error,response,body)=>{//match history request request 3
  if(error){throw error};//����ó��
  console.log('request3 processing');//�׽�Ʈ�� : request �۵����� ���

var obj1=JSON.parse(body);//request ����� JSON object�� ��ȯ
//console.log(obj.matches [0].map);//�׽�Ʈ�� : �ϳ��� ����
$(obj1.matches).each(function(index,match){//body���� ������ �迭��� match��� �ε��� ���
  if(match.type=='1v1'){//���Ÿ���� 1��1�� ��쿡�� �����ִ�.
    console.log(index+":::",match.decision,match.map);//�ε����� ����, �� ǥ��
};//if 1v1 ����
});//each function ����

var ladder_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/"
var ladder_2="/ladders?access_token=US0q3wV6W1fIYZmRnEBbNvUrRHYZhwANIi";
var ladder_url=ladder_1+profileID+ladder_2;
console.log(ladder_url);
request(ladder_url,(error,response,body)=>{//ladder request request 4
  if(error){throw error};
  console.log('request4 processing');
  var obj2=JSON.parse(body);//request ����� JSON object�� ��ȯ
//  console.log(obj2.currentSeason [2].ladder[0].wins);//�׽�Ʈ�� : �ϳ��� ����
  var wins=obj2.currentSeason[2].ladder[0].wins;
  var losses=obj2.currentSeason[2].ladder[0].losses;
win_rate=wins/(wins+losses);
    //console.log(wins);
    //console.log(losses);
    //console.log(win_rate);

var profile_1="https://kr.api.blizzard.com/sc2/legacy/profile/3/1/";
var profile_2="?access_token=US0q3wV6W1fIYZmRnEBbNvUrRHYZhwANIi";
var profile_url=profile_1+profileID+profile_2;
console.log(profile_url);
request(profile_url,(error,response,body)=>{//profile request request 5
  if(error){throw error};
  console.log('request5 processing');
  var obj3=JSON.parse(body);//request ����� JSON object�� ��ȯ
  //console.log(obj2.currentSeason [1].ladder[0].wins);//�׽�Ʈ�� : �ϳ��� ����
primary_race=obj3.career.primaryRace;
    //console.log(primary_race);
  var terran_level=obj3.swarmLevels.terran.level;
  var zerg_level=obj3.swarmLevels.zerg.level;
  var protoss_level=obj3.swarmLevels.protoss.level;

      //console.log(terran_level);
      //console.log(zerg_level);
      //console.log(protoss_level);

//build recommend algorithm
var matchresults=[];//��ġ��� ���� �迭 ����
var momentum_win=0;//�ֱ� 10��� �� �¼� �ʱ�ȭ
for (var i=0;i<25;i++){//��ġ�����丮�� �ִ� 25��
  if(obj1.matches[i].type=='1v1'){//1v1���� �����ִ�.
  matchresults.push(obj1.matches[i].decision);//�迭 ���� ��� ����
  if((matchresults.length<11)&&(obj1.matches[i].decision=='Win')){//�ֱ� 10��⿡�� �¸��� ���
    momentum_win=momentum_win+1;//�� �¼��� ī��Ʈ�Ѵ�.
  }//if length11 ����
}//obj1 1v1 ����
}//for i 25 ����
//console.log(matchresults);//�׽�Ʈ�� : matchresults ���
//console.log(momentum_win);//�׽�Ʈ�� : momentum_win ���
if(momentum_win>=7){//7�� �̻��̸� ��¼�
momentum='��¼�';
}
if((momentum_win<7)&&(momentum_win>=4)){//4���̻� 7�¹̸��̸� ��ü
momentum='��ü��';
}
if(momentum_win<4){//4�� �̸��̸� �϶���
momentum='�϶���';
}
//console.log(momentum);//�׽�Ʈ�� : �⼼ ���

if(terran_level<50){//�׶� ���� 50 �ȵǸ�
  terran_proficiency='�������'//�׶� �������
} else{
  terran_proficiency='������'
}
if(zerg_level<50){//���� ���� 50 �ȵǸ�
  zerg_proficiency='�������'//���� �������
} else{
  zerg_proficiency='������'
}
if(protoss_level<50){//�����佺 ���� 50 �ȵǸ�
  protoss_proficiency='�������'//�����佺 �������
} else{
  protoss_proficiency='������'
}
//
//system message part
console.log("�ֱ� 10��� �м� ��� ���� ���� '"+momentum+"'�Դϴ�.");
console.log("���� �׶� '"+terran_proficiency+"'�Դϴ�.");
console.log("���� ���� '"+zerg_proficiency+"'�Դϴ�.");
console.log("���� �����佺 '"+protoss_proficiency+"'�Դϴ�.");
console.log("����� �� ������ '"+primary_race+"'�Դϴ�.");
console.log("����� �̹� ���� ��ü �·��� '"+win_rate+"'�Դϴ�.");
//
//build recommend command

//

console.log('request5 done');
});//request5����
console.log('request4 done');
});//request4����
console.log('request3 done');
});//request3����
console.log('request2 done');
});//request2����
console.log('request1 done');
});//request1 ����

console.log('r.question done');
//console.log(terran_level);
r.close()//�ݵ�� close�� ����� �Ѵ�.����� �� ���� �Ŀ�.
});//r.question ��
*/
