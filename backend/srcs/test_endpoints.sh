#/bin/sh

# curl -X POST \
# 	-H "Content-Type: application/json" \
# 	-d '{"content": "WEBVTT 1 00:00:02.460 --> 00:00:05.460 it really is the perfect candidate for a", "language": "Frensh"}' http://127.0.0.1:8000/api/translate


curl -X POST \
	-H "Content-Type: application/json" \
	-d '{"prompt": ""}' http://127.0.0.1:8000/api/review