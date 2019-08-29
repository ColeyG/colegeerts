for D in `find . -type d`
do
    convert D -blur 0x8 -fill black -colorize 30% blurred/D
done


