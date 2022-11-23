create table eventsMng(
	eventId int not null AUTO_INCREMENT,
    eventCode varchar(45) not null,
    eventName varchar(45) not null,
    isActivate int not null,
    eventDescription text,
    startDate datetime,
    endDate datetime,
    startTime datetime,
    endTime datetime,
    
    primary key (eventId, eventCode)
);

create table tenant(
    tenantId int not null AUTO_INCREMENT,
    tenantCode varchar(255) not null,
    companyName varchar(255) not null,
    tenantAddress varchar(255) not null,
    website varchar(255),
    contactName varchar(255) not null,
    contactPhone varchar(255) not null,
    contactEmail varchar(255) not null,

    primary key(tenantId, tenantCode)
);

create table account(
    userId int not null AUTO_INCREMENT,
    username varchar(255) not null,
    passwd varchar(255) not null,
    fullName varchar(255) not null,
    phoneNumber varchar(15) not null,
    email varchar(255) not null,
    active int,
    role varchar(255) not null,
    tenantCode varchar(255) not null,
    companyName varchar(255) not null,

    primary key (userId, username),
    foreign key (tenantCode) references tenant(tenantCode)
);

create table client_info(
	client_id int not null AUTO_INCREMENT,
    client_code varchar(45) not null,
    client_description text not null,
    client_img_f blob not null,
    client_img_b blob not null,
    
    primary key (client_id, client_code)
);

create table point_checkin (
	point_id int not null AUTO_INCREMENT,
    event_code int not null,
    point_name varchar(45) not null,
    
    primary key (point_id),
    foreign key (event_code) references events_mng(event_code)
);
create table transactions(
	tran_id int not null AUTO_INCREMENT,
    event_id int not null,
    client_code int not null,
    create_time datetime,
    note text,
    
    primary key (tranId),
    foreign key (eventId) references eventsMng(eventId),
    foreign key (clientCode) references clientInfo(clientCode)
);
