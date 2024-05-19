if [ $# -ne 3 ]; then
    echo $#
    echo "     "
    echo "     "
    echo "Usage: $1 <channel name> <sequence> <version>"
    exit 1
fi

export PATH=../$PWD/bin:$PATH

./deployOrg1_JavaScript.sh  $1 $2 $3

./deployOrg2_JavaScript.sh  $1 $2 $3

./deployOrg3_JavaScript.sh  $1 $2 $3