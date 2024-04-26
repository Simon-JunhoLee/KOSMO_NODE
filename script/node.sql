use nodedb;
create table users(
	uid varchar(20) not null primary key,
    upass varchar(200) not null,
    uname varchar(100) not null,
    udate datetime default now()
);
insert into users (uid, upass, uname) 
values('blue', 'pass', '김블루');
insert into users (uid, upass, uname) 
values('sky', 'gksmf', '강하늘');
insert into users (uid, upass, uname) 
values('purple', 'vjvmf', '박보라');

select * from users;
select * from users where uid = 'blue';

create table posts(
	pid int auto_increment primary key,
    title varchar(500) not null,
    contents text,
    writer varchar(20) not null,
    pdate datetime default now(),
    foreign key(writer) references users(uid)
);

desc posts;
insert into posts(title, contents, writer)
values('블로그 누적 1,000만 조회수 후기', '2024.02.12에 블로그의 누적 조회수가 1,000만이 되었다. 전체글은 585개가 되었다. 2015.1.31에 첫 글을 작성했으니, 약 9년만에 1,000만이 되었다. 예전에는 6개월에 100만씩 증가했다면, 요즘은 7개월에 100만씩 증가하고 있다. 아무래도 기술 문제를 해결한 사례보다는 현재의 내 생각을 계속 정리하다보니 구글...', 'blue');
insert into posts(title, contents, writer)
values('[JAVA] 자바 컬렉션', '사용할 수는 있겠지만, 알고리즘의 속도와 안정성에 있어 자바 언어 개발진들이 수십년에 걸쳐 JVM(자바 가상 머신)에 최적화시켜 개량해왔기 때문에, 만일 자바 프로그래밍에서 자료 구조를 사용할 일이 있다면 Collectoin Framework를 가져와 사용하면 된다. 컬렉션 프레임워크 장점 자바만의 컬렉션 프레임워크의...', 'purple');
insert into posts(title, contents, writer)
values('Node의 모듈', 'Node.js에서 모듈이란? 프로그래밍에서 가장 기본적이 개념이 바로 모듈인데요! 프로그램을 작은 기능 단위로 쪼개고 파일 형태로 저장해 놓은 것을 모듈이라고 한답니다. ➡️즉, 이렇게 기능별로 만들어 놓은 함수를 모듈이라고 해요. CommonJS 모듈 시스템과 ES 모듈 시스템 자바스크립트에는 두가지의 모듈 시스템이...', 'sky');
insert into posts(title, contents, writer)
values('리액트 컴파일러 (React Compiler) 알아보기', '이 문서는 React Compiler가 무엇인지 알아보기 위해 여러 자료들을 수집해서 정리해 놓은 것입니다. React Compiler가 무엇인지 궁금하신 분들에게 도움이 되었으면 합니다. React Compiler 소식 많은 사람들이 React Compiler는 React 19에 등장할 것이라고 예상했습니다. 하지만 리액트 팀의 Joe Savona는 React...', 'purple');
insert into posts(title, contents, writer)
values('점심 메뉴 추천 모음', '만한 음식이 없다고 느껴지는 걸까요? 여러분의 고민을 해결해 드리고자 한식, 중식, 일식, 분식, 패스트푸드, 샐러드 등 다양하게 안내해 드리겠습니다. 점심메뉴 추천 모음-한식, 면, 분식, 패스트푸드, 다이어트 점심메뉴 추천 한식 점심 메뉴 추천 한국인이라면 뭐니 뭐니 해도 한식을 선호합니다. 많은 분들이 아침...', 'purple');
insert into posts(title, contents, writer)
values('[서울금천구/가산디지털단지역] 가산회식 장소추천 고기맛집 "육뜸 가디역" 주차, 메뉴추천', '회식 장소로 이만한 곳이 또 없겠죠~? ​ 가산디지털단지삼겹살 육뜸 육겹살 맛 가산디지털단지삼겹살 육뜸은 우선 고기와 곁들여먹을 다양한 소스와, 김치, 마늘...계란찜이었어요 고깃집에서 먹는 계란찜은 언제나 사랑입니다 ...♥ 가디회식 장소추천 육뜸 물비빔냉면 7,000원 ​ 위에서 메뉴 소개를 드리면서 말씀드렸던...', 'blue');

select * from posts order by pdate desc;

insert into posts(title, contents, writer)
select title, contents, writer from posts;

delete from posts where pid > 200;

select count(*) from posts;