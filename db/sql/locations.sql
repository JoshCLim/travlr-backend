create table locations (
    id uuid DEFAULT uuid_generate_v4 (),
    name text not null,
    photo_url uuid not null,
    coordinates point not null,
    food float,
    nature float,
    adventure float,
    culture float,
    exercise float,
    tourist_hotspot float,
    cozy float,
    family float,
    wildlife float,
    primary key (id)
);