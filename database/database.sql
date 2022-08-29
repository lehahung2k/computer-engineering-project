create table events_mng(
	event_id int not null AUTO_INCREMENT,
    event_code varchar(45) not null,
    event_name varchar(45) not null,
    is_active int not null,
    event_description text,
    start_date datetime,
    end_date datetime,
    start_time datetime,
    end_time datetime,
    
    primary key (event_id, event_code)
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
    
    primary key (tran_id),
    foreign key (event_id) references events_mng(event_id),
    foreign key (client_code) references client_info(client_code)
);

create table users(
    user_id int not null AUTO_INCREMENT,
    username varchar(255) not null,
    passwd varchar(255) not null,
    fullName varchar(255) not null,
    active int,
    role int not null,
    companyName varchar(255) not null,
    phoneNumber varchar(15) not null,

    primary key (user_id)
);