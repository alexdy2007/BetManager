#!/usr/bin/env bash


name='BetManagerTest'

gulp populate

echo $name

echo Dropping database ${name} if exists
if psql -lqt | cut -d \| -f 1 | grep -qw  ${name}; then
    echo Found and dropping ${name}
    dropdb ${name}
    sleep 1
else
    echo ${name} not found
    exit
fi

echo Creating database for ${name}
createdb ${name}

echo restoring db ${name}
pg_restore -Ft ./sql/${name}BackupSchema4.tar -U ayoung -d ${name}
echo Populating test db
psql ${name} < ./seeders/allSeeds.sql
echo PopulatingDB ${name} Task Done
