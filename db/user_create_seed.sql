-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;

INSERT INTO public.users VALUES(1, 'John', 'Smith', 'John@Smith.com'),
INSERT INTO public.users VALUES(2, 'Dave', 'Davis', 'Dave@Davis.com'),
INSERT INTO public.users VALUES(3, 'Jane', 'Janis', 'Jane@Janis.com');