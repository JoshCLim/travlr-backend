create table filters (
    id uuid DEFAULT uuid_generate_v4 (),
    num_travellers integer,
    accessibility float,
    public_transport float,
    driving float,
    intensity float,
    primary key (id),
    foreign key(id) references users(id) on delete set null
);