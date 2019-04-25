update service_post
set title = $2, image_url = $3, info = $4
where service_id = $1;

select * from service_post;