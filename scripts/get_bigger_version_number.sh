if [[ $1 == $2 ]]
    then echo $1
    exit 0
fi

# replaces "." with " " and therefore forming array of identifiers (-> numbers inbetween dots)
IDENTIFIERS_VERSION_1=(${1//./ })
IDENTIFIERS_VERSION_2=(${2//./ })

# TODO: this won't work for comparing versions that have different length
if [[ ${#IDENTIFIERS_VERSION_1} -ne ${#IDENTIFIERS_VERSION_2} ]]; then
    exit 1
fi

AMOUNT_OF_IDENTIFIERS=${#IDENTIFIERS_VERSION_1[@]}

# return if one version number has a higher identifier that the other
for ((i = 0; i<$AMOUNT_OF_IDENTIFIERS; i++)); do
    if (( ${IDENTIFIERS_VERSION_1[$i]} > ${IDENTIFIERS_VERSION_2[$i]} )); then
        echo $1
        exit 0

    elif (( ${IDENTIFIERS_VERSION_2[$i]} > ${IDENTIFIERS_VERSION_1[$i]} )); then
        echo $2
        exit 0
    fi
done

exit 1