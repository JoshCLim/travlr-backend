#!/bin/bash

createdb travlr;

psql -U postgres -d travlr -f /sql/extensions.sql;
psql -U postgres -d travlr -f /sql/users.sql;
psql -U postgres -d travlr -f /sql/locations.sql;
psql -U postgres -d travlr -f /sql/preferences.sql;
psql -U postgres -d travlr -f /sql/photos.sql;
psql -U postgres -d travlr -f /sql/visited.sql;
psql -U postgres -d travlr -f /sql/init-admin.sql;