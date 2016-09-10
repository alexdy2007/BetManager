#!/usr/bin/env bash


export NODE_ENV=test
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

rm ./sql/backups/${name}.sql
rm ./sql/backups/${name}.tar

pg_dump BetManager -s > ./sql/backups/${name}.sql
pg_dump -Ft BetManager -s > ./sql/backups/${name}.tar


echo restoring db ${name}
pg_restore -Ft ./sql/backups/${name}.tar -U ayoung -d ${name}
echo Populating test db
psql ${name} < ./seeders/allSeeds.sql
echo PopulatingDB ${name} Task Done
