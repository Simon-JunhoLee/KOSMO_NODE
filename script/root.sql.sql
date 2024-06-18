create database nodedb;
create user node identified by 'pass';
-- nodedb의 모든 권한을 node에게 부여
grant all privileges on nodedb.* to node@'%';

create database jspdb;
create user jsp identified by 'pass';
-- jspdb의 모든 권한을 jsp에게 부여
grant all privileges on jspdb.* to jsp@'%';

create database haksadb;
create user haksa identified by 'pass';
grant all privileges on haksadb.* to haksa@'%';

create database shopdb;
create user shop identified by 'pass';
grant all privileges on shopdb.* to shop@'%';

create database reactdb;
create user react identified by 'pass';
grant all privileges on reactdb.* to react@'%';


