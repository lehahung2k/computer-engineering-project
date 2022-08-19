create table events_mng(
	event_id int not null,
    event_code varchar(45) not null,
    event_name varchar(45) not null,
    is_active int not null,
    event_description text,
    start_date date,
    end_date date,
    start_time datetime,
    end_time datetime,
    
    primary key (event_id, event_code)
);

create table client_info(
	client_id int not null,
    client_code varchar(45) not null,
    client_description text not null,
    client_img_f blob not null,
    client_img_b blob not null,
    
    primary key (client_id)
);

create table point_checkin (
	point_id int not null,
    event_id int not null,
    point_name varchar(45) not null,
    
    primary key (point_id),
    foreign key (event_id) references events_mng(event_id)
);
create table transactions(
	tran_id int not null,
    event_id int not null,
    client_id int not null,
    create_time datetime,
    note text,
    
    primary key (tran_id),
    foreign key (event_id) references events_mng(event_id),
    foreign key (client_id) references client_info(client_id)
);