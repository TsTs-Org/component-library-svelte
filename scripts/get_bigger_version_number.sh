#!/bin/bash

# Check if both arguments are provided
if [[ -z "$1" || -z "$2" ]]; then
    echo "Usage: $0 version1 version2"
    exit 1
fi

# If versions are equal, print either one and exit
if [[ "$1" == "$2" ]]; then
    echo "$1"
    exit 0
fi

# Replace "." with space to split into array elements
IFS='.' read -r -a IDENTIFIERS_VERSION_1 <<< "$1"
IFS='.' read -r -a IDENTIFIERS_VERSION_2 <<< "$2"

# Determine the longest version length to compare all parts
MAX_LEN=${#IDENTIFIERS_VERSION_1[@]}
if [[ ${#IDENTIFIERS_VERSION_2[@]} -gt $MAX_LEN ]]; then
    MAX_LEN=${#IDENTIFIERS_VERSION_2[@]}
fi

# Compare each corresponding part
for ((i = 0; i < MAX_LEN; i++)); do
    # Default to 0 if index doesn't exist
    v1_part=${IDENTIFIERS_VERSION_1[i]:-0}
    v2_part=${IDENTIFIERS_VERSION_2[i]:-0}

    if (( v1_part > v2_part )); then
        echo "$1"
        exit 0
    elif (( v2_part > v1_part )); then
        echo "$2"
        exit 0
    fi
done

# If all parts equal after normalization
echo "$1"
exit 0
