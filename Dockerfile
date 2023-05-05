FROM 169942020521.dkr.ecr.eu-west-2.amazonaws.com/base/node-16:alpine-builder
FROM 169942020521.dkr.ecr.eu-west-2.amazonaws.com/base/node-16:alpine-runtime

# Maintainer
LABEL maintainer="Parental Advisory"

EXPOSE 3000
CMD ["./dist/server.js"]