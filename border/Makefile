
# Addons mozilla, cf. : https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions

PGF=$(subst \,/,$(subst C:\,/c/,$(PROGRAMFILES)))
PATH:=${PATH}:${PGF}/Inkscape/bin

ICO_DIR=icons
SIZES=16 24 32 48 64 96 128 256
png_list=$(foreach i, ${SIZES},${ICO_DIR}/border-${i}.png)

all :
	@echo ${png_list}

# Build all "${ICO_DIR}/border-*.png" from the one and only "border.svg"
${png_list} : border.svg
	@echo ${png_list}
	@mkdir -p ${ICO_DIR}
	inkscape -w $(subst -,,$(subst ${ICO_DIR}/$(+:.svg=),,$(@:.png=))) $+ -o $@


clean :
	rm -f ${png_list}

