##base image are pushed from GCR
FROM alpine
RUN apk update && \
	apk --no-cache add nodejs && \
    apk --no-cache add npm 
#set the environment
ENV NODE_ENV=production
ENV APP=/home/user_service
ENV LOG_DIR=/service-logs
WORKDIR $APP
COPY ["src", "./"]
#copy the ssh key file for shared module
# RUN mkdir -p /root/.ssh
# COPY ./.ssh /root/.ssh
# RUN ls /root/.ssh
RUN mkdir -p ${LOG_DIR}/logs && \
    touch ${LOG_DIR}/logs/access.log ${LOG_DIR}/logs/app.log && \
	chmod 777 ${LOG_DIR}/logs/access.log ${LOG_DIR}/logs/app.log 
RUN apk --no-cache add --virtual builds-deps build-base python && npm install && apk del builds-deps
RUN npm install --production 
#port expose on 9000 inside the container


#Copy env file
COPY ./setup/*.env ${APP}
COPY ./setup/setup.sh ${APP}
RUN chmod 0755 setup.sh

#port expose on 9000 inside the container
EXPOSE 9000

ENTRYPOINT ["./setup.sh"]
