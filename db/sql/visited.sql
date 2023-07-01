create table visited(
    user_id uuid,
    location_id uuid,
    visited_timestamp timestamp default current_timestamp not null,
    foreign key(user_id) references users(id) on delete set null,
    foreign key(location_id) references locations(id) on delete set null
);