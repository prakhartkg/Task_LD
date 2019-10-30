#!/bin/bash

MONGO_HOST=${MONGO_HOST-foo}
MDB_USER=${MDB_USER-foo}
MDB_PSWD=${MDB_PSWD-foo}
RS=${RS-foo}
LOGS=${LOGS-foo}

typeset -i rc=0
typeset -i sleep_increment=1

if [[ -f /home/bl_activity_stream/.env ]]; then
  sed -i 's/\(^MONGODB_URL=\).*/\1mongodb:\/\/'$MONGO_HOST'\/brightlab?replicaset='$RS'/' /home/bl_activity_stream/.env
  sed -i 's/\(^MONGODB_HOSTS=\).*/\1'"$MONGO_HOST"'/' /home/bl_research/src/.env
  sed -i 's/\(^MONGODB_USER=\).*/\1'"$MDB_USER"'/' /home/bl_activity_stream/.env
  sed -i 's/\(^MONGODB_PSWD=\).*/\1'"$MDB_PSWD"'/' /home/bl_activity_stream/.env
  sed -i 's/\(^REPLICA_SET=\).*/\1'"$RS"'/' /home/bl_activity_stream/.env
  sed -i 's/\(^LOG_PATH=\).*/\1\/'"$LOGS"'/' /home/bl_activity_stream/.env
fi

npm start