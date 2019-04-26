update info_post
set title = $2, image_url = $3, info = $4
where info_id = $1;

select * from info_post;