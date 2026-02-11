artifact_name       := sic-code-web

.PHONY: all
all: build

.PHONY: clean
clean:
	rm -f ./$(artifact_name)-*.zip
	rm -rf ./dist
	rm -rf ./build-*
	rm -f ./build.log

package-install:
	npm install

.PHONY: build
build:	package-install lint
	npm run build

.PHONY: lint
lint:
	npm run lint

.PHONY: security-check
security-check:
	npm audit

.PHONY: dependency-check
dependency-check:
	npm audit

.PHONY: test
test: test-unit

.PHONY: test-unit
test-unit:
	npm run test

.PHONY: package
package: build
ifndef version
	$(error No version given. Aborting)
endif
	$(info Packaging version: $(version))
	$(eval tmpdir := $(shell mktemp -d build-XXXXXXXXXX))
	$(info Using tmpdir: $(tmpdir))
	cp -r ./dist $(tmpdir)
	cp -r ./package.json $(tmpdir)
	cp -r ./package-lock.json $(tmpdir)
	cd $(tmpdir) && npm install --production
	rm $(tmpdir)/package.json $(tmpdir)/package-lock.json
	cd $(tmpdir) && zip -r ../$(artifact_name)-$(version).zip .
	rm -rf $(tmpdir)

.PHONY: sonar
sonar: test
	npm run analyse-code
