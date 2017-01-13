-- DELETE EXISTING DATA 	=	=	=	=	=	=	=	=	
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS vehicles_pk;
DROP SEQUENCE IF EXISTS users_pk;

-- CREATE SEQUENCES AND TABLES	=	=	=	=	=	=	=	
CREATE SEQUENCE public.users_pk
    INCREMENT 1
    START 1
    MINVALUE 1
;
CREATE SEQUENCE public.vehicles_pk
    INCREMENT 1
    START 1
    MINVALUE 1
;
CREATE TABLE public.users
(
	id integer NOT NULL DEFAULT nextval('users_pk'::regclass),
	firstname text,
	lastname text,
	email text,
	PRIMARY KEY (id)
);
CREATE TABLE public.vehicles
(
	id integer NOT NULL DEFAULT nextval('vehicles_pk'::regclass),
	make text,
	model text,
	year integer,
	ownerid integer,
	PRIMARY KEY (id),
	FOREIGN KEY (ownerid) REFERENCES users (id) 
);

-- INSERT TEST DATA =	=	=	=	=	=	=	=	=	=
INSERT INTO public.users (firstname, lastname, email) VALUES('John', 'Smith', 'John@Smith.com');
INSERT INTO public.users (firstname, lastname, email) VALUES('Dave', 'Davis', 'Dave@Davis.com');
INSERT INTO public.users (firstname, lastname, email) VALUES('Jane', 'Janis', 'Jane@Janis.com');


INSERT INTO public.vehicles (make, model, year, ownerid) VALUES('Toyota', 'Camry', 1991, 1);
INSERT INTO public.vehicles (make, model, year, ownerid) VALUES('Honda', 'Civic', 1995, 1);
INSERT INTO public.vehicles (make, model, year, ownerid) VALUES('Ford', 'Focus', 2005, 1);
INSERT INTO public.vehicles (make, model, year, ownerid) VALUES('Ford', 'Taurus', 2003, 2);
INSERT INTO public.vehicles (make, model, year, ownerid) VALUES('VW', 'Bug', 2010, 2);
INSERT INTO public.vehicles (make, model, year, ownerid) VALUES('Mini', 'Coup', 2013, 3);
