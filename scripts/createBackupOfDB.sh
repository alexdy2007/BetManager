#!/usr/bin/env bash


name=$1


if [ "${name}" == 'BetManager' ]; then
    echo Can not store over main db BetManager
    return
fi

echo Dropping database ${name} if exists
if psql -lqt | cut -d \| -f 1 | grep -qw  ${name}; then
    echo Found and dropping ${name}
    dropdb ${name}
    sleep 1
else
    echo ${name} not found
fi

pg_dump BetManager -s > ../sql/backups/${name}.sql
pg_dump -Ft BetManager -s > ../sql/backups/${name}.tar
echo backup ${name} with name created