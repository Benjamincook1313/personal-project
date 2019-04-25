insert into req_appt(first_name, last_name)
values($1, $2) 
returning id;
