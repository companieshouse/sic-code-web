FROM 169942020521.dkr.ecr.eu-west-1.amazonaws.com/base/node:14-alpine-builder
FROM 169942020521.dkr.ecr.eu-west-1.amazonaws.com/base/node:14-alpine-runtime

# Maintainer
LABEL maintainer="Parental Advisory"

EXPOSE 3000
CMD ["./dist/server.js"]