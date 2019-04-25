update about_post
set title = $2, image_url = $3, info = $4
where about_id = $1;

select * from about_post;