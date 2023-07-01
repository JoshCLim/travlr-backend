create table visited(
    user_id,
    location_id,
    visited_timetimestamp not null default current_timestamp,
    foreign key(user_id) references users(id) on delete set null,
    foreign key(id) references locations(id) on delete set null,
);