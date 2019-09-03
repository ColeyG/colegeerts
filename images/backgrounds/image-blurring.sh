for D in `find ./*.png -type f`
do
    convert ${D} -blur 0x8 -fill black -colorize 30% blurred/${D}
    echo ${D}
done

for D in `find ./*.jpg -type f`
do
    convert ${D} -blur 0x8 -fill black -colorize 30% blurred/${D}
    echo ${D}
done

for D in `find ./*.jpeg -type f`
do
    convert ${D} -blur 0x8 -fill black -colorize 30% blurred/${D}
    echo ${D}
done
