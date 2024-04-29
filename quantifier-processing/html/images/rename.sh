for i in $1/* ;
#do mv "$i" "${i/RP/}";
#do mv "$i" "${i/98/87}";
#do mv "$i" "${i/109/98}";
do cp "$i" "${i/RP/}";
done
