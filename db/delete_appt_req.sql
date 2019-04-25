delete from req_info
where req_id = $1;

delete from req_appt
where id = $1;

select * from req_appt ra
join req_info ri on ra.id = ri.req_id;