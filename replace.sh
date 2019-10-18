#! bin/bash
#sed -i '.original' -e 's/\<a\ href=\"http\:\/\/simon\.physics\.iastate\.edu\/PDF\/cv\.pdf\"\ target=\"_blank"\ \>\/\<embed\ src=\"files\/PDF\/cv\.pdf\"\ type=\"application\/pdf\"\ width=\"100\%\"\ target=\"\_blank"\/\>' 6879c75c_711a_48d0_b4b7_c7118d12a47b.html
sed -i ".original" -e "s|<a href="http://simon.physics.iastate.edu/PDF/cv.pdf" target="_blank" >|<embed src="files/PDF/cv.pdf" type="application/pdf" width="100%" target="_blank"\>|" 6879c75c_711a_48d0_b4b7_c7118d12a47b.html
