#!/bin/bash

usage="$(basename "$0") recreateDN.sh dbname [-h]

where:
    -h  show this help text
    -dbname name of db to recreate"



echo HERE2

databaseName=$1
echo ${databaseName}

echo Creating backup sql and tar schema for ${databaseName}
pg_dump ${databaseName} -s > ../sql/${databaseName}BackupSchema1.sql
pg_dump -Ft ${databaseName} -s > ../sql/${databaseName}BackupSchema1.tar

echo Dropping database ${databaseName} if exists
if psql -lqt | cut -d \| -f 1 | grep -qw  databaseName; then
    echo Found and dropping ${databaseName}
    dropdb databaseName
else
    echo ${databaseName} not found
    return
fi

echo Creating database for ${databaseName}
createdb databaseName

echo Restoring ${databaseName}
if [ ! -f ../sql/${databaseName}BackupSchema1.tar ]; then
    echo "../sql/${databaseName}BackupSchema1.tar not found! waiting till created"
    sleep 4
fi
if [ ! -f ../sql/${databaseName}BackupSchema1.tar ]; then
    echo "../sql/${databaseName}BackupSchema1.tar not found! ending"
fi

pg_restore -Ft ../sql/${databaseName}BackupSchema1.tar -U ayoung -d databaseName
echo Finished restoring ${databaseName}

echo PopulatingDB ${databaseName}
sleep 2
psql databaseName < ../seeders/allSeeds.sql
echo PopulatingDB ${databaseName} Task Done
