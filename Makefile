default :
	java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js kave.js --js_output_file kave-min.js
	upload.py -vfs

folders :
	upload.py -vs

test :
	python2.6 uploadtests.py

profile :
	python2.6 -m cProfile -s cumulative uploadtests.py
