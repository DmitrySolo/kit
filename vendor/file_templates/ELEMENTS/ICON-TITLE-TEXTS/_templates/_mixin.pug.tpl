mixin <%= elementName %>(icon,title,text,classModifier)
    -if (!className) className =''
    li(class='<%elementName%>' data-qcontent=elements__ICON-TITLE-TEXTS__<%= elementName %>)
        .iconWrapper
            svg(class='<%elementName%> ' + classModifier)
                use(xlink:href="#" + icon)
        h5=title+':'
        span=text


