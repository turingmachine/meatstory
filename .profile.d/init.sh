export MONGO_URL="`echo $VCAP_SERVICES | egrep -o 'mongodb:[^"]+' | head -1`"
