create table photos (
    id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid not null,
    url text not null,
    food float,
    nature float,
    adventure float,
    culture float,
    exercise float,
    tourist_hotspot float,
    cozy float,
    family float,
    wildlife float,
    primary key (id),
    foreign key(user_id) references users(id) on delete set null
);