insert into admins(username, password)
values($1, $2)
returning *;