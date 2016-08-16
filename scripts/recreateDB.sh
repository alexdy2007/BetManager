#!/bin/bash

usage="$(basename "$0") recreateDN.sh dbname [-h]

where:
    -h  show this help text
    -dbname name of db to recreate"

#
#
db=$1
echo ${db}
#
#echo Creating backup sql and tar schema for ${db}
#pg_dump ${db} -s > ../sql/${db}BackupSchema1.sql
#pg_dump -Ft ${db} -s > ../sql/${db}BackupSchema1.tar
#
echo Dropping database ${db} if exists
if psql -lqt | cut -d \| -f 1 | grep -qw  db; then
    echo Found and dropping ${db}
    dropdb ${db}
    sleep 1
else
    echo ${db} not found
    return
fi


echo Creating database for ${db}
createdb ${db}

sleep 1

echo Restoring ${db}
if [ ! -f ../sql/${db}BackupSchema3.tar ]; then
    echo "../sql/${db}BackupSchema1.tar not found! waiting till created"
    sleep 4
fi
if [ ! -f ../sql/${db}BackupSchema3.tar ]; then
    echo "../sql/${db}BackupSchema1.tar not found! ending"
fi

pg_restore -Ft ../sql/${db}BackupSchema1.tar -U ayoung -d ${db}
echo Finished restoring ${db}

echo PopulatingDB ${db}
psql ${db} < ../seeders/allSeeds.sql
echo PopulatingDB ${db} Task Done
