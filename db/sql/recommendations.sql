create table recommendations(
    id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid not null,
    location_ids text[],
    recommended_time timestamp default current_timestamp,
    primary key (id),
    foreign key(user_id) references users(id) on delete set null
);