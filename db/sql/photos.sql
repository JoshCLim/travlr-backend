create table photos (
    id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid,
    url text not null,
    food boolean,
    nature boolean,
    adventure boolean,
    culture boolean,
    exercise boolean,
    tourist_hotspot boolean,
    cozy boolean,
    family boolean,
    wildlife boolean,
    primary key (id),
    foreign key(user_id) references users(id) on delete set null
);