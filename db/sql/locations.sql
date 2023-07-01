create table locations (
    id uuid DEFAULT uuid_generate_v4 (),
    name text not null,
    photo_url text not null,
    coordinates point not null,
    food float not null default 0.0,
    nature float not null default 0.0,
    adventure float not null default 0.0,
    culture float not null default 0.0,
    exercise float not null default 0.0,
    tourist_hotspot float not null default 0.0,
    cozy float not null default 0.0,
    family float not null default 0.0,
    wildlife float not null default 0.0,
    cbd float not null default 0.0,
    disabled_accessibility float not null default 0.0,
    primary key (id)
);