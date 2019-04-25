create table req_appt(
    id serial primary key,
    first_name varchar(180),
    last_name varchar(180)
);

create table req_info(
    req_info_id serial,
    req_id int references req_appt(id),
    email varchar,
    phone varchar(15),
    time_to_call varchar(100)
);

create table admins(
    user_id serial primary key,
    username varchar(100),
    password text
);

create table about_post(
    about_id serial,
    title varchar(180),
    image_url text,
    info text
);

create table service_post(
	service_id serial,
    title varchar(180),
    image_url text,
    info text
);

create table info_post(
    info_id serial,
    title varchar(180),
    image_url text,
    info text
);