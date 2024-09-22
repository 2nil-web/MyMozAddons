
# Addons mozilla, cf. : https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions

PGF=$(subst \,/,$(subst C:\,/c/,$(PROGRAMFILES)))
PATH:=${PATH}:${PGF}/Inkscape/bin

ICONS_DIR=icons
png_list=${ICONS_DIR}/border-48.png ${ICONS_DIR}/border-96.png ${ICONS_DIR}/border-256.png

all : ${png_list}


# Build all "${ICONS_DIR}/border-*.png" from the one and only "border.svg"
${png_list} : border.svg
	@mkdir -p ${ICONS_DIR}
	inkscape -w $(subst -,,$(subst ${ICONS_DIR}/$(+:.svg=),,$(@:.png=))) $+ -o $@


clean :
	rm -f ${png_list}

