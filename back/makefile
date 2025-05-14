image := backend-flask
container := backend-flask-container

build: 
	docker build -t $(image) .
run:
	docker run -d -p 8080:8080 --name $(container) $(image)

rm:
	docker rm -f $(container)

super:
	docker rm -f $(container); \
	docker build -t $(image) . && \
	docker run -d -p 8080:8080 --name $(container) $(image)
#docker exec -it $(container) bash