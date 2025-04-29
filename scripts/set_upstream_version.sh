SCRIPT_DIR=$(dirname "$0")

LOCAL_VERSION=$(/bin/sh $SCRIPT_DIR/get_local_version.sh)
UPSTREAM_VERSION=$(/bin/sh $SCRIPT_DIR/get_upstream_version.sh)

BIGGER_VERSION_NUMBER=$(/bin/sh $SCRIPT_DIR/get_bigger_version_number.sh $LOCAL_VERSION $UPSTREAM_VERSION)

if [[ "$LOCAL_VERSION" == "$UPSTREAM_VERSION" ]]; then
    npm version patch --git-tag-version false
    echo "Version from upstream and package.json are equal. Using bumped version."

elif [[ "$BIGGER_VERSION_NUMBER" == "$UPSTREAM_VERSION" ]]; then
    npm version $UPSTREAM_VERSION --git-tag-version false
    npm version patch --git-tag-version false

    echo "Version from upstream was most recent. Using bumped upstream version."

else 
    echo "Version from package.json was most recent. Using version from package.json."
fi