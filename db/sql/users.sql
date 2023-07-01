create table users (
    id uuid DEFAULT uuid_generate_v4 (),
    name text not null,
    email text unique not null,
    password_hash bytea not null,
    photo_id uuid,
    about text not null,
    invalidate_tokens_before timestamp not null,
    last_location point,
    primary key (id)
);