create table locations (
    id uuid DEFAULT uuid_generate_v4 (),
    url uuid not null,
    food boolean,
    nature boolean,
    adventure boolean,
    culture boolean,
    exercise boolean,
    tourist_hotspot boolean,
    cozy boolean,
    family boolean,
    wildlife boolean,
    primary key (id)
);