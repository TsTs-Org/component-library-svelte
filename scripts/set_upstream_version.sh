SCRIPT_DIR=$(dirname "$0")

LOKAL_VERSION=$(/bin/sh $SCRIPT_DIR/get_local_version.sh)
UPSTREAM_VERSION=$(/bin/sh $SCRIPT_DIR/get_upstream_version.sh)

BIGGER_VERSION_NUMBER=$(/bin/sh $SCRIPT_DIR/get_bigger_version_number.sh $LOKAL_VERSION $UPSTREAM_VERSION)

if [[ "$LOKAL_VERSION" == "$UPSTREAM_VERSION" || "$BIGGER_VERSION_NUMBER" == "$UPSTREAM_VERSION" ]]; then
    npm version patch
fi

# otherwise manual override appeared and the version from package.json should be used
# therefore the version doesn't need to be changed