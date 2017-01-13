SELECT v.id, v.make, v.model, v.year, v.ownerid FROM vehicles v
JOIN users u ON u.id=v.ownerid
WHERE LOWER(u.firstname) LIKE LOWER($1);