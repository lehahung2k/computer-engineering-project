create table EventsMng(
	eventId int not null AUTO_INCREMENT,
    eventCode varchar(45) not null unique,
    eventName varchar(45) not null,
    isActivate int not null,
    eventDescription text,
    startTime datetime not null,
    endTime datetime not null,
    eventImg blob,
    
    primary key (eventId, eventCode)
);

create table Tenants(
    tenantId int not null AUTO_INCREMENT,
    tenantCode varchar(255) not null unique,
    companyName varchar(255) not null,
    tenantAddress varchar(255),
    website varchar(255),
    contactName varchar(255),
    contactPhone varchar(255),
    contactEmail varchar(255),

    primary key(tenantId, tenantCode)
);

create table Accounts(
    userId int not null AUTO_INCREMENT,
    username varchar(255) not null unique,
    passwd varchar(255) not null,
    fullName varchar(255) not null,
    phoneNumber varchar(15) not null,
    email varchar(255) not null,
    active int,
    role varchar(255) not null,
    tenantCode varchar(255) not null,
    companyName varchar(255),

    primary key (userId, username),
    index (tenantCode),
    foreign key (tenantCode) references Tenants(tenantCode)
);

create table TenantsToEvent (
    id int not null AUTO_INCREMENT,
    tenantCode varchar(255) not null,
    eventCode varchar(45) not null unique,

    primary key (id),
    foreign key (tenantCode) references Tenants(tenantCode),
    foreign key (eventCode) references EventsMng(eventCode)
);

create table Guests(
	guestId int not null AUTO_INCREMENT,
    guestCode varchar(45) not null,
    guestDescription text,
    frontImg blob,
    backImg blob,
    
    primary key (guestId)
);

create table PointOfCheckin (
	pointId int not null AUTO_INCREMENT,
    pointCode varchar(45) not null unique,
    pointName varchar(255) not null,
    pointNote text,
    eventCode varchar(45) not null,
    username varchar(255) not null,
    
    primary key (pointId),
    foreign key (eventCode) references EventsMng(eventCode),
    foreign key (username) references Accounts(username)
);
create table Transactions(
	tranId int not null AUTO_INCREMENT,
    pointCode varchar(45) not null,
    guestCode varchar(45) not null,
    createTime datetime,
    note text,
    
    primary key (tranId),
    foreign key (pointCode) references PointOfCheckin(pointCode)
);
