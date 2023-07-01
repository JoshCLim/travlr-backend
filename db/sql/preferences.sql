create table preferences (
    id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid,
    food float not null default 0.0,
    nature float not null default 0.0,
    adventure float not null default 0.0,
    culture float not null default 0.0,
    exercise float not null default 0.0,
    tourist_hotspot float not null default 0.0,
    cozy float not null default 0.0,
    family float not null default 0.0,
    wildlife float not null default 0.0,
    near_cbd float not null default 0.0,
    disabled_accessibility float not null default 0.0,
    primary key (id),
    foreign key(user_id) references users(id) on delete set null
);