cat ./niftui/js/ui.nift.js ./niftui/js/utils.nift.js ./niftui/js/instance.nift.js ./niftui/js/route.nift.js ./niftui/js/property.nift.js ./niftui/js/node.nift.js ./niftui/js/component.nift.js | uglifyjs -m -c -o ./build/js/niftui.all.min.js