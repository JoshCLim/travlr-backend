create table filters (
    id uuid DEFAULT uuid_generate_v4 (),
    num_travellers integer,
    accessibility boolean,
    public_transport boolean,
    driving boolean,
    intensity boolean,
    primary key (id),
    foreign key(id) references users(id) on delete set null
);