create database nodedb;
create user node identified by 'pass';
-- nodedb의 모든 권한을 node에게 부여
grant all privileges on nodedb.* to node@'%';