FROM 416670754337.dkr.ecr.eu-west-2.amazonaws.com/ci-node-build-20

# Maintainer
LABEL maintainer="Parental Advisory"

EXPOSE 3000
CMD ["./dist/server.js"]
